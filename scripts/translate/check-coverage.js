#!/usr/bin/env node
/**
 * check-coverage.js — Check translation coverage across all locales
 *
 * Compares what exists in the codebase against what should exist:
 * - Are all locale JSON files present? (src/i18n/<lang>.json)
 * - Do all locales have policy body translations? (src/content/policies-<lang>/)
 * - Are any policy bodies missing for existing locales?
 *
 * Exits with code 0 on success (warnings are OK), code 1 only on hard errors.
 * Designed for CI — outputs GitHub Actions annotations.
 *
 * Usage:
 *   node scripts/translate/check-coverage.js
 *   node scripts/translate/check-coverage.js --strict   # exit 1 on any warnings
 */

import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('../../', import.meta.url).pathname;
const SRC = join(ROOT, 'src');
const isCI = !!process.env.CI;
const isStrict = process.argv.includes('--strict');

const LOCALES = ['vi', 'zh', 'ar', 'am'];
const LOCALE_NAMES = { vi: 'Vietnamese', zh: 'Chinese', ar: 'Arabic', am: 'Amharic' };

let warnings = 0;
let errors = 0;

// ─── 1. Check locale JSON files ────────────────────────────────────────────

const enJson = JSON.parse(readFileSync(join(SRC, 'i18n/en.json'), 'utf8'));
const enKeyCount = countKeys(enJson);

for (const locale of LOCALES) {
  const jsonPath = join(SRC, `i18n/${locale}.json`);
  if (!existsSync(jsonPath)) {
    warn(`Missing UI strings: src/i18n/${locale}.json`, `No ${LOCALE_NAMES[locale]} UI translations found. Run the translation workflow to generate them, or English will be used as fallback.`);
    continue;
  }

  try {
    const localeJson = JSON.parse(readFileSync(jsonPath, 'utf8'));
    const localeKeyCount = countKeys(localeJson);
    if (localeKeyCount < enKeyCount) {
      warn(`Incomplete UI strings: src/i18n/${locale}.json (${localeKeyCount}/${enKeyCount} keys)`, `${LOCALE_NAMES[locale]} UI translations are missing ${enKeyCount - localeKeyCount} keys. English fallback will be used for missing keys.`);
    } else {
      ok(`src/i18n/${locale}.json: ${localeKeyCount} keys`);
    }
  } catch (err) {
    error(`Invalid JSON in src/i18n/${locale}.json: ${err.message}`);
  }
}

// ─── 2. Check policy body translations ─────────────────────────────────────

const enPolicies = readdirSync(join(SRC, 'content/policies'))
  .filter(f => f.endsWith('.md'))
  .sort();

for (const locale of LOCALES) {
  const policiesDir = join(SRC, `content/policies-${locale}`);
  if (!existsSync(policiesDir)) {
    warn(`Missing policy translations: src/content/policies-${locale}/`, `No ${LOCALE_NAMES[locale]} policy translations found. Run the translation workflow.`);
    continue;
  }

  const localePolicies = readdirSync(policiesDir)
    .filter(f => f.endsWith('.md'))
    .sort();

  // Ignore .gitkeep
  const realFiles = localePolicies.filter(f => f !== '.gitkeep');

  if (realFiles.length === 0) {
    warn(`Empty policy translations: src/content/policies-${locale}/`, `${LOCALE_NAMES[locale]} policy directory exists but has no translations.`);
    continue;
  }

  const missing = enPolicies.filter(f => !realFiles.includes(f));
  if (missing.length > 0) {
    warn(
      `Incomplete policy translations: src/content/policies-${locale}/ (${realFiles.length}/${enPolicies.length})`,
      `${LOCALE_NAMES[locale]} is missing ${missing.length} policy translations: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '...' : ''}`
    );
  } else {
    ok(`src/content/policies-${locale}/: ${realFiles.length} policies`);
  }
}

// ─── 3. Check policy frontmatter translations ──────────────────────────────

for (const locale of LOCALES) {
  const fmPath = join(SRC, `i18n/policy-meta-${locale}.json`);
  if (!existsSync(fmPath)) {
    warn(`Missing policy metadata: src/i18n/policy-meta-${locale}.json`, `No ${LOCALE_NAMES[locale]} policy titles/summaries found.`);
    continue;
  }

  try {
    const fm = JSON.parse(readFileSync(fmPath, 'utf8'));
    const fmCount = Object.keys(fm).length;
    if (fmCount < enPolicies.length) {
      warn(`Incomplete policy metadata: src/i18n/policy-meta-${locale}.json (${fmCount}/${enPolicies.length})`, `${LOCALE_NAMES[locale]} is missing metadata for ${enPolicies.length - fmCount} policies.`);
    } else {
      ok(`src/i18n/policy-meta-${locale}.json: ${fmCount} policies`);
    }
  } catch (err) {
    error(`Invalid JSON in src/i18n/policy-meta-${locale}.json: ${err.message}`);
  }
}

// ─── Summary ────────────────────────────────────────────────────────────────

console.log('\n──────────────────────────────────────');
console.log(`  Translation coverage: ${errors} errors, ${warnings} warnings`);
console.log('──────────────────────────────────────');

if (warnings > 0 && !isStrict) {
  console.log('  (Warnings are informational — English fallback will be used for missing translations)');
  console.log('  Use --strict to treat warnings as errors.');
}

if (errors > 0 || (isStrict && warnings > 0)) {
  process.exit(1);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}

function warn(title, detail) {
  warnings++;
  if (isCI) {
    console.log(`::warning title=${title}::${detail}`);
  } else {
    console.log(`  ⚠ ${title}`);
    console.log(`    ${detail}`);
  }
}

function error(msg) {
  errors++;
  if (isCI) {
    console.log(`::error::${msg}`);
  } else {
    console.log(`  ✗ ${msg}`);
  }
}

function countKeys(obj) {
  let count = 0;
  for (const v of Object.values(obj)) {
    if (typeof v === 'object' && v !== null) count += countKeys(v);
    else count++;
  }
  return count;
}
