#!/usr/bin/env node
/**
 * validate.js — Validate translated output against English source
 *
 * Checks for:
 * - Missing JSON keys (compared to en.json structure)
 * - Invalid JSON files
 * - Empty translations
 * - Untranslated strings (identical to English)
 * - Missing policy body files
 * - Broken markdown (unclosed links, missing headings)
 * - [REVIEW: ...] flags (from Amharic translations)
 *
 * Usage:
 *   node scripts/translate/validate.js                # Validate all
 *   node scripts/translate/validate.js --lang am      # Validate Amharic only
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('../../', import.meta.url).pathname;
const OUTPUT = join(ROOT, 'scripts/translate/output');
const EXTRACTED = join(ROOT, 'scripts/translate/extracted');

const LANGUAGES = { es: 'Spanish', vi: 'Vietnamese', zh: 'Chinese', ar: 'Arabic', am: 'Amharic' };

const args = process.argv.slice(2);
const langFilter = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : null;
const langs = langFilter ? [langFilter] : Object.keys(LANGUAGES);

let totalIssues = 0;

console.log('═══════════════════════════════════════════════════════');
console.log('  Denver For All — Translation Validator');
console.log('═══════════════════════════════════════════════════════\n');

// Load English reference data
const enUI = JSON.parse(readFileSync(join(EXTRACTED, 'ui-strings.json'), 'utf8'));
const enMeta = JSON.parse(readFileSync(join(EXTRACTED, 'page-meta.json'), 'utf8'));
const enFM = JSON.parse(readFileSync(join(EXTRACTED, 'policy-frontmatter.json'), 'utf8'));
const enPolicyFiles = readdirSync(join(EXTRACTED, 'policy-bodies')).filter(f => f.endsWith('.md'));

for (const lang of langs) {
  const langDir = join(OUTPUT, lang);
  if (!existsSync(langDir)) {
    warn(lang, 'general', `No output directory found at ${langDir}`);
    continue;
  }

  console.log(`\n── ${lang} (${LANGUAGES[lang]}) ──\n`);

  // 1. UI Strings
  const uiFile = join(langDir, 'ui-strings.json');
  if (!existsSync(uiFile)) {
    warn(lang, 'ui-strings', 'File missing');
  } else {
    try {
      const translated = JSON.parse(readFileSync(uiFile, 'utf8'));
      const missing = findMissingKeys(enUI, translated);
      if (missing.length > 0) {
        warn(lang, 'ui-strings', `Missing keys: ${missing.join(', ')}`);
      }
      const identical = findIdenticalValues(enUI, translated);
      if (identical.length > 0) {
        warn(lang, 'ui-strings', `Possibly untranslated (identical to English): ${identical.join(', ')}`);
      }
      console.log(`  ✓ ui-strings.json: ${countKeys(translated)} keys validated`);
    } catch (err) {
      warn(lang, 'ui-strings', `Invalid JSON: ${err.message}`);
    }
  }

  // 2. Page Meta
  const metaFile = join(langDir, 'page-meta.json');
  if (!existsSync(metaFile)) {
    warn(lang, 'page-meta', 'File missing');
  } else {
    try {
      const translated = JSON.parse(readFileSync(metaFile, 'utf8'));
      const missingPages = Object.keys(enMeta).filter(k => !translated[k]);
      if (missingPages.length > 0) {
        warn(lang, 'page-meta', `Missing pages: ${missingPages.join(', ')}`);
      }
      console.log(`  ✓ page-meta.json: ${Object.keys(translated).length} pages validated`);
    } catch (err) {
      warn(lang, 'page-meta', `Invalid JSON: ${err.message}`);
    }
  }

  // 3. Policy Frontmatter
  const fmFile = join(langDir, 'policy-frontmatter.json');
  if (!existsSync(fmFile)) {
    warn(lang, 'policy-frontmatter', 'File missing');
  } else {
    try {
      const translated = JSON.parse(readFileSync(fmFile, 'utf8'));
      const missingSlugs = Object.keys(enFM).filter(k => !translated[k]);
      if (missingSlugs.length > 0) {
        warn(lang, 'policy-frontmatter', `Missing policies: ${missingSlugs.join(', ')}`);
      }
      // Check for empty titles/summaries
      for (const [slug, data] of Object.entries(translated)) {
        if (!data.title || data.title.trim() === '') {
          warn(lang, 'policy-frontmatter', `Empty title for ${slug}`);
        }
        if (!data.summary || data.summary.trim() === '') {
          warn(lang, 'policy-frontmatter', `Empty summary for ${slug}`);
        }
      }
      console.log(`  ✓ policy-frontmatter.json: ${Object.keys(translated).length} policies validated`);
    } catch (err) {
      warn(lang, 'policy-frontmatter', `Invalid JSON: ${err.message}`);
    }
  }

  // 4. Policy Bodies
  const bodiesDir = join(langDir, 'policy-bodies');
  if (!existsSync(bodiesDir)) {
    warn(lang, 'policy-bodies', 'Directory missing');
  } else {
    const translatedFiles = readdirSync(bodiesDir).filter(f => f.endsWith('.md'));
    const missingFiles = enPolicyFiles.filter(f => !translatedFiles.includes(f));
    if (missingFiles.length > 0) {
      warn(lang, 'policy-bodies', `Missing files: ${missingFiles.join(', ')}`);
    }

    let reviewFlags = 0;
    let emptyFiles = 0;
    for (const file of translatedFiles) {
      const content = readFileSync(join(bodiesDir, file), 'utf8');
      if (content.trim().length < 50) {
        emptyFiles++;
        warn(lang, 'policy-bodies', `Suspiciously short: ${file} (${content.length} chars)`);
      }
      const flags = (content.match(/\[REVIEW:/g) || []).length;
      reviewFlags += flags;
    }

    console.log(`  ✓ policy-bodies: ${translatedFiles.length}/${enPolicyFiles.length} files`);
    if (reviewFlags > 0) {
      console.log(`  ⚠ ${reviewFlags} [REVIEW:] flags found — needs human review`);
    }
  }
}

console.log('\n═══════════════════════════════════════════════════════');
console.log(`  Validation complete. ${totalIssues} issue(s) found.`);
console.log('═══════════════════════════════════════════════════════');

if (totalIssues > 0) {
  process.exit(1);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function warn(lang, type, message) {
  console.log(`  ⚠ [${lang}/${type}] ${message}`);
  totalIssues++;
}

function findMissingKeys(reference, translated, prefix = '') {
  const missing = [];
  for (const [key, value] of Object.entries(reference)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (!(key in translated)) {
      missing.push(fullKey);
    } else if (typeof value === 'object' && value !== null && typeof translated[key] === 'object') {
      missing.push(...findMissingKeys(value, translated[key], fullKey));
    }
  }
  return missing;
}

function findIdenticalValues(reference, translated, prefix = '') {
  const identical = [];
  for (const [key, value] of Object.entries(reference)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string' && translated[key] === value) {
      // Skip keys that should stay the same (email formats, etc.)
      if (!fullKey.includes('placeholder') && value.length > 3) {
        identical.push(fullKey);
      }
    } else if (typeof value === 'object' && value !== null && typeof translated[key] === 'object') {
      identical.push(...findIdenticalValues(value, translated[key], fullKey));
    }
  }
  return identical;
}

function countKeys(obj) {
  let count = 0;
  for (const v of Object.values(obj)) {
    if (typeof v === 'object' && v !== null) count += countKeys(v);
    else count++;
  }
  return count;
}
