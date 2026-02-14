#!/usr/bin/env node
/**
 * extract-content.js
 *
 * Extracts all translatable content from the Denver For All codebase
 * into structured JSON files that can be fed to Claude Haiku 4.5 for translation.
 *
 * Output: scripts/translate/extracted/
 *   ├── ui-strings.json          (en.json keys — the UI layer)
 *   ├── page-meta.json           (SEO titles/descriptions for each page)
 *   ├── policy-frontmatter.json  (titles, summaries, keyStats for all 50 policies)
 *   ├── policy-bodies/           (one .md per policy — the big content)
 *   │   ├── housing-first.md
 *   │   └── ...
 *   └── grant-frontmatter.json   (titles, summaries for 6 grants)
 *
 * Usage: node scripts/translate/extract-content.js
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const ROOT = new URL('../../', import.meta.url).pathname;
const OUT = join(ROOT, 'scripts/translate/extracted');

mkdirSync(OUT, { recursive: true });
mkdirSync(join(OUT, 'policy-bodies'), { recursive: true });
mkdirSync(join(OUT, 'grant-bodies'), { recursive: true });

// ─── 1. UI Strings ──────────────────────────────────────────────────────────
const enJson = JSON.parse(readFileSync(join(ROOT, 'src/i18n/en.json'), 'utf8'));
writeFileSync(join(OUT, 'ui-strings.json'), JSON.stringify(enJson, null, 2));
console.log(`✓ Extracted UI strings (${countKeys(enJson)} keys)`);

// ─── 2. Page Meta ───────────────────────────────────────────────────────────
// Parse the TypeScript file to extract English page metadata
const pageMetaSrc = readFileSync(join(ROOT, 'src/i18n/page-meta.ts'), 'utf8');
const pageMeta = {};
// Match each page block:  key: { title: { en: '...' }, description: { en: '...' } }
const pageBlockRe = /(\w+):\s*\{[^}]*title:\s*\{\s*en:\s*'([^']+)'[^}]*\}[^}]*description:\s*\{\s*en:\s*'([^']+)'/g;
let m;
while ((m = pageBlockRe.exec(pageMetaSrc)) !== null) {
  pageMeta[m[1]] = { title: m[2], description: m[3] };
}
writeFileSync(join(OUT, 'page-meta.json'), JSON.stringify(pageMeta, null, 2));
console.log(`✓ Extracted page metadata (${Object.keys(pageMeta).length} pages)`);

// ─── 3. Policy Frontmatter ─────────────────────────────────────────────────
const policiesDir = join(ROOT, 'src/content/policies');
const policyFiles = readdirSync(policiesDir).filter(f => f.endsWith('.md'));
const policyFrontmatter = {};

for (const file of policyFiles) {
  const slug = basename(file, '.md');
  const raw = readFileSync(join(policiesDir, file), 'utf8');
  const fm = extractFrontmatter(raw);
  if (!fm) continue;

  const entry = {
    title: fm.title || '',
    summary: fm.summary || '',
  };

  // Extract keyStats if present
  if (fm.keyStats) {
    entry.keyStats = parseKeyStats(raw);
  }

  // Extract petition title if present
  if (fm.petition) {
    const petitionTitle = extractYamlField(raw, 'title', 'petition');
    if (petitionTitle) entry.petitionTitle = petitionTitle;
  }

  policyFrontmatter[slug] = entry;
}

writeFileSync(join(OUT, 'policy-frontmatter.json'), JSON.stringify(policyFrontmatter, null, 2));
console.log(`✓ Extracted policy frontmatter (${Object.keys(policyFrontmatter).length} policies)`);

// ─── 4. Policy Bodies ──────────────────────────────────────────────────────
let totalPolicyWords = 0;
for (const file of policyFiles) {
  const slug = basename(file, '.md');
  const raw = readFileSync(join(policiesDir, file), 'utf8');
  const body = extractBody(raw);
  writeFileSync(join(OUT, 'policy-bodies', `${slug}.md`), body);
  totalPolicyWords += body.split(/\s+/).length;
}
console.log(`✓ Extracted policy bodies (${policyFiles.length} files, ~${totalPolicyWords.toLocaleString()} words)`);

// ─── 5. Grant Frontmatter + Bodies ─────────────────────────────────────────
const grantsDir = join(ROOT, 'src/content/grants');
const grantFiles = readdirSync(grantsDir).filter(f => f.endsWith('.md'));
const grantFrontmatter = {};

for (const file of grantFiles) {
  const slug = basename(file, '.md');
  const raw = readFileSync(join(grantsDir, file), 'utf8');
  const fm = extractFrontmatter(raw);
  if (!fm) continue;

  grantFrontmatter[slug] = {
    title: fm.title || '',
    summary: fm.summary || '',
  };

  const body = extractBody(raw);
  writeFileSync(join(OUT, 'grant-bodies', `${slug}.md`), body);
}

writeFileSync(join(OUT, 'grant-frontmatter.json'), JSON.stringify(grantFrontmatter, null, 2));
console.log(`✓ Extracted grant frontmatter + bodies (${grantFiles.length} grants)`);

// ─── Summary ────────────────────────────────────────────────────────────────
console.log('\n── Extraction complete ──');
console.log(`Output directory: ${OUT}`);
console.log(`\nContent summary:`);
console.log(`  UI strings:          ${countKeys(enJson)} keys`);
console.log(`  Page metadata:       ${Object.keys(pageMeta).length} pages`);
console.log(`  Policy frontmatter:  ${Object.keys(policyFrontmatter).length} policies`);
console.log(`  Policy bodies:       ${policyFiles.length} files (~${totalPolicyWords.toLocaleString()} words)`);
console.log(`  Grant frontmatter:   ${Object.keys(grantFrontmatter).length} grants`);
console.log(`  Grant bodies:        ${grantFiles.length} files`);

// ─── Helpers ────────────────────────────────────────────────────────────────

function countKeys(obj, prefix = '') {
  let count = 0;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v !== null) {
      count += countKeys(v, prefix + k + '.');
    } else {
      count++;
    }
  }
  return count;
}

function extractFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  // Simple YAML-ish extraction for the fields we need
  const fm = {};
  const titleMatch = match[1].match(/^title:\s*['"](.+?)['"]\s*$/m);
  if (titleMatch) fm.title = titleMatch[1];
  const summaryMatch = match[1].match(/^summary:\s*['"](.+?)['"]\s*$/m);
  if (!summaryMatch) {
    // Try multi-line summary
    const multiMatch = match[1].match(/^summary:\s*['"](.+?)['"]$/ms);
    if (multiMatch) fm.summary = multiMatch[1].replace(/\n/g, ' ');
  } else {
    fm.summary = summaryMatch[1];
  }
  if (match[1].includes('keyStats:')) fm.keyStats = true;
  if (match[1].includes('petition:')) fm.petition = true;
  return fm;
}

function parseKeyStats(raw) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return [];
  const fm = fmMatch[1];
  const stats = [];
  // Split on "  - value:" to find each stat block
  const blocks = fm.split(/\n\s+-\s+value:/);
  for (let i = 1; i < blocks.length; i++) {
    const block = '  - value:' + blocks[i];
    const value = block.match(/value:\s*'([^']+)'/)?.[1] || '';
    const label = block.match(/\n\s+label:\s*'([^']+)'/)?.[1] || '';
    const context = block.match(/\n\s+context:\s*'([^']+)'/)?.[1] || '';
    const source = block.match(/\n\s+source:\s*'([^']+)'/)?.[1] || '';
    if (label) {
      const stat = { value, label };
      if (context) stat.context = context;
      if (source) stat.source = source;
      stats.push(stat);
    }
  }
  return stats;
}

function extractYamlField(raw, field, parentField) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;
  const fm = fmMatch[1];
  // Look for field nested under parent
  const parentIdx = fm.indexOf(parentField + ':');
  if (parentIdx === -1) return null;
  const afterParent = fm.slice(parentIdx);
  const re = new RegExp(`^\\s+${field}:\\s*'([^']+)'`, 'm');
  const match = afterParent.match(re);
  return match ? match[1] : null;
}

function extractBody(raw) {
  const parts = raw.split(/^---\n[\s\S]*?\n---\n*/m);
  return parts.length > 1 ? parts[1].trim() : raw;
}
