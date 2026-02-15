#!/usr/bin/env node
/**
 * hydrate.js — Place translated content into the Denver For All codebase
 *
 * Takes the output from translate.js and writes it into the correct locations:
 *   - UI strings  → src/i18n/<lang>.json
 *   - Page meta   → merged into src/i18n/page-meta.ts (prints instructions)
 *   - Policy FM   → prints per-policy frontmatter fields to add
 *   - Policy body → src/content/policies-<lang>/<slug>.md
 *   - Grant body  → (informational — grants are English-only for now)
 *
 * Usage:
 *   node scripts/translate/hydrate.js               # Hydrate all languages
 *   node scripts/translate/hydrate.js --lang vi      # Hydrate only Vietnamese
 *   node scripts/translate/hydrate.js --dry-run      # Show what would be written
 *   node scripts/translate/hydrate.js --source translations/incoming  # Custom source dir
 *
 * This script is safe to run multiple times — it overwrites existing files.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = new URL('../../', import.meta.url).pathname;
const args = process.argv.slice(2);
const sourceArg = getArg('--source');
const OUTPUT = sourceArg ? resolve(ROOT, sourceArg) : join(ROOT, 'scripts/translate/output');
const SRC = join(ROOT, 'src');

const LANGUAGES = {
  es: 'Spanish',
  vi: 'Vietnamese',
  zh: 'Chinese (Simplified)',
  ar: 'Arabic',
  am: 'Amharic',
};

const langFilter = getArg('--lang');
const dryRun = args.includes('--dry-run');
const langs = langFilter ? [langFilter] : Object.keys(LANGUAGES);

let filesWritten = 0;

console.log('═══════════════════════════════════════════════════════');
console.log('  Denver For All — Hydrate Translations');
console.log(`  Source: ${OUTPUT}`);
console.log(`  Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
console.log('═══════════════════════════════════════════════════════\n');

for (const lang of langs) {
  const langDir = join(OUTPUT, lang);
  if (!existsSync(langDir)) {
    console.log(`⚠ No output found for ${lang} — skipping`);
    continue;
  }

  console.log(`\n── ${lang} (${LANGUAGES[lang]}) ──\n`);

  // 1. UI Strings → src/i18n/<lang>.json
  const uiFile = join(langDir, 'ui-strings.json');
  if (existsSync(uiFile)) {
    const dest = join(SRC, 'i18n', `${lang}.json`);
    const content = readFileSync(uiFile, 'utf8');

    // Validate it's valid JSON
    try {
      JSON.parse(content);
      write(dest, content);
      console.log(`  ✓ UI strings → ${rel(dest)}`);
    } catch {
      console.warn(`  ⚠ UI strings: invalid JSON, skipping. Check ${rel(uiFile)}`);
    }
  }

  // 2. Page Meta — can't auto-merge into TypeScript, so generate the snippet
  const metaFile = join(langDir, 'page-meta.json');
  if (existsSync(metaFile)) {
    const meta = JSON.parse(readFileSync(metaFile, 'utf8'));
    console.log(`  ℹ Page meta: Add the following to src/i18n/page-meta.ts for '${lang}':`);
    console.log(`    (Each page entry needs a '${lang}' key in title and description)\n`);

    for (const [page, { title, description }] of Object.entries(meta)) {
      console.log(`    ${page}: { ${lang}: '${title}' }  // description: '${description}'`);
    }
    console.log();
  }

  // 3. Policy Bodies → src/content/policies-<lang>/<slug>.md
  const policyBodiesDir = join(langDir, 'policy-bodies');
  if (existsSync(policyBodiesDir)) {
    const destDir = join(SRC, 'content', `policies-${lang}`);
    mkdirSync(destDir, { recursive: true });

    const files = readdirSync(policyBodiesDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const content = readFileSync(join(policyBodiesDir, file), 'utf8');
      // Wrap in empty frontmatter (matching policies-es pattern)
      const withFrontmatter = `---\n---\n\n${content}`;
      const dest = join(destDir, file);
      write(dest, withFrontmatter);
    }
    console.log(`  ✓ Policy bodies → ${rel(destDir)}/ (${files.length} files)`);
  }

  // 4. Policy Frontmatter — generate the JSON for reference
  const fmFile = join(langDir, 'policy-frontmatter.json');
  if (existsSync(fmFile)) {
    // Save to a reference file alongside the i18n JSONs
    const dest = join(SRC, 'i18n', `policy-meta-${lang}.json`);
    const content = readFileSync(fmFile, 'utf8');
    try {
      JSON.parse(content);
      write(dest, content);
      console.log(`  ✓ Policy frontmatter → ${rel(dest)}`);
    } catch {
      console.warn(`  ⚠ Policy frontmatter: invalid JSON, skipping`);
    }
  }

  // 5. Grant Bodies — informational
  const grantBodiesDir = join(langDir, 'grant-bodies');
  if (existsSync(grantBodiesDir)) {
    const files = readdirSync(grantBodiesDir).filter(f => f.endsWith('.md'));
    if (files.length > 0) {
      console.log(`  ℹ Grant bodies: ${files.length} translated grants available in ${rel(grantBodiesDir)}/`);
      console.log(`    (Grant translation is optional — these are technical government documents)`);
    }
  }
}

console.log('\n═══════════════════════════════════════════════════════');
console.log(`  Hydration complete! ${filesWritten} files written.`);
console.log('═══════════════════════════════════════════════════════');
console.log(`\n  Remaining manual steps:`);
console.log(`  1. Update src/i18n/utils.ts — add new locale imports and expand Locale type`);
console.log(`  2. Update src/i18n/page-meta.ts — add new locale entries (see output above)`);
console.log(`  3. Update src/content/config.ts — register new policies-<lang> collections`);
console.log(`  4. Review translations, especially Amharic (am), with native speakers`);

// ─── Helpers ────────────────────────────────────────────────────────────────

function write(path, content) {
  if (dryRun) {
    console.log(`    [DRY RUN] Would write: ${rel(path)}`);
  } else {
    writeFileSync(path, content);
  }
  filesWritten++;
}

function rel(path) {
  return path.replace(ROOT, '');
}

function getArg(name) {
  const idx = args.indexOf(name);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : null;
}
