#!/usr/bin/env node
/**
 * translate.js — Batch translation runner for Denver For All
 *
 * Translates all extracted content using the Anthropic API (Claude Haiku 4.5).
 * Run extract-content.js first to generate the source material.
 *
 * Usage:
 *   # Translate everything for all 4 new languages:
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate/translate.js
 *
 *   # Translate a single language:
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate/translate.js --lang vi
 *
 *   # Translate only a specific content type:
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate/translate.js --lang zh --type ui-strings
 *
 *   # Dry run (show what would be translated without calling the API):
 *   node scripts/translate/translate.js --dry-run
 *
 * Options:
 *   --lang <code>    Only translate one language (vi, zh, ar, am)
 *   --type <type>    Only translate one content type:
 *                      ui-strings, page-meta, policy-frontmatter,
 *                      policy-bodies, grant-bodies
 *   --dry-run        Show translation plan without calling the API
 *   --concurrency N  Max concurrent API calls (default: 3)
 *
 * Environment:
 *   ANTHROPIC_API_KEY   Required (unless --dry-run)
 *
 * Output goes to: scripts/translate/output/<lang>/
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';

// ─── Config ─────────────────────────────────────────────────────────────────

const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 8192;
const API_URL = 'https://api.anthropic.com/v1/messages';

const LANGUAGES = {
  vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  zh: { name: 'Chinese (Simplified)', nativeName: '简体中文' },
  ar: { name: 'Arabic', nativeName: 'العربية' },
  am: { name: 'Amharic', nativeName: 'አማርኛ' },
};

const CONTENT_TYPES = [
  'ui-strings',
  'page-meta',
  'policy-frontmatter',
  'policy-bodies',
  'grant-bodies',
];

const ROOT = new URL('../../', import.meta.url).pathname;
const EXTRACTED = join(ROOT, 'scripts/translate/extracted');
const OUTPUT = join(ROOT, 'scripts/translate/output');
const PROMPTS = join(ROOT, 'scripts/translate/prompts');

// ─── CLI Args ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const langFilter = getArg('--lang');
const typeFilter = getArg('--type');
const dryRun = args.includes('--dry-run');
const ciMode = args.includes('--ci');
const concurrency = parseInt(getArg('--concurrency') || '3', 10);

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY && !dryRun) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is required.');
  console.error('Set it or use --dry-run to preview the translation plan.');
  process.exit(1);
}

// Validate filters
if (langFilter && !LANGUAGES[langFilter]) {
  console.error(`Error: Unknown language "${langFilter}". Valid: ${Object.keys(LANGUAGES).join(', ')}`);
  process.exit(1);
}
if (typeFilter && !CONTENT_TYPES.includes(typeFilter)) {
  console.error(`Error: Unknown type "${typeFilter}". Valid: ${CONTENT_TYPES.join(', ')}`);
  process.exit(1);
}

// ─── Load Prompts ───────────────────────────────────────────────────────────

const systemPrompt = readFileSync(join(PROMPTS, 'system.md'), 'utf8');

function loadLangPrompt(lang) {
  return readFileSync(join(PROMPTS, `${lang}.md`), 'utf8');
}

function loadTaskPrompt(task) {
  return readFileSync(join(PROMPTS, 'tasks', `${task}.md`), 'utf8');
}

// ─── API Call ───────────────────────────────────────────────────────────────

let apiCalls = 0;
let inputTokens = 0;
let outputTokens = 0;

async function translate(lang, taskType, content) {
  const langPrompt = loadLangPrompt(lang);
  const taskPrompt = loadTaskPrompt(taskType);

  const userMessage = `${langPrompt}\n\n${taskPrompt}\n\n---\n\n${content}`;

  if (dryRun) {
    const estimatedTokens = Math.ceil(userMessage.length / 4);
    console.log(`  [DRY RUN] Would call API: ~${estimatedTokens} input tokens`);
    return '[DRY RUN — no output]';
  }

  const body = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  };

  // Retry with exponential backoff
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });

      if (resp.status === 429 || resp.status >= 500) {
        const wait = Math.pow(2, attempt + 1) * 1000;
        console.log(`  ⏳ Rate limited/error (${resp.status}), retrying in ${wait / 1000}s...`);
        await sleep(wait);
        continue;
      }

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`API error ${resp.status}: ${errText}`);
      }

      const data = await resp.json();
      apiCalls++;
      inputTokens += data.usage?.input_tokens || 0;
      outputTokens += data.usage?.output_tokens || 0;

      return data.content[0].text;
    } catch (err) {
      if (attempt < 3) {
        const wait = Math.pow(2, attempt + 1) * 1000;
        console.log(`  ⏳ Error: ${err.message}, retrying in ${wait / 1000}s...`);
        await sleep(wait);
      } else {
        throw err;
      }
    }
  }
}

// ─── Translation Tasks ─────────────────────────────────────────────────────

async function translateUIStrings(lang) {
  const content = readFileSync(join(EXTRACTED, 'ui-strings.json'), 'utf8');
  const result = await translate(lang, 'ui-strings', content);
  const outDir = join(OUTPUT, lang);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'ui-strings.json'), result);
  return 1;
}

async function translatePageMeta(lang) {
  const content = readFileSync(join(EXTRACTED, 'page-meta.json'), 'utf8');
  const result = await translate(lang, 'page-meta', content);
  const outDir = join(OUTPUT, lang);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'page-meta.json'), result);
  return 1;
}

async function translatePolicyFrontmatter(lang) {
  const content = readFileSync(join(EXTRACTED, 'policy-frontmatter.json'), 'utf8');
  // This file can be large — split into chunks of ~10 policies if needed
  const policies = JSON.parse(content);
  const slugs = Object.keys(policies);

  const outDir = join(OUTPUT, lang);
  mkdirSync(outDir, { recursive: true });

  // If <= 15 policies, do it in one call. Otherwise chunk.
  const CHUNK_SIZE = 10;
  const allTranslated = {};
  let calls = 0;

  for (let i = 0; i < slugs.length; i += CHUNK_SIZE) {
    const chunk = {};
    for (const slug of slugs.slice(i, i + CHUNK_SIZE)) {
      chunk[slug] = policies[slug];
    }
    const chunkJson = JSON.stringify(chunk, null, 2);
    console.log(`  Translating policy frontmatter batch ${Math.floor(i / CHUNK_SIZE) + 1}/${Math.ceil(slugs.length / CHUNK_SIZE)}...`);
    const result = await translate(lang, 'policy-frontmatter', chunkJson);
    calls++;

    // Parse and merge
    try {
      const parsed = JSON.parse(result);
      Object.assign(allTranslated, parsed);
    } catch {
      // If JSON parse fails, save raw and flag
      console.warn(`  ⚠ Could not parse JSON for batch ${Math.floor(i / CHUNK_SIZE) + 1}. Saving raw output.`);
      writeFileSync(join(outDir, `policy-frontmatter-batch-${Math.floor(i / CHUNK_SIZE) + 1}-raw.txt`), result);
    }
  }

  writeFileSync(join(outDir, 'policy-frontmatter.json'), JSON.stringify(allTranslated, null, 2));
  return calls;
}

async function translatePolicyBodies(lang) {
  const bodiesDir = join(EXTRACTED, 'policy-bodies');
  const files = readdirSync(bodiesDir).filter(f => f.endsWith('.md'));
  const outDir = join(OUTPUT, lang, 'policy-bodies');
  mkdirSync(outDir, { recursive: true });

  let calls = 0;
  const batches = [];

  // Process in parallel batches
  for (let i = 0; i < files.length; i += concurrency) {
    const batch = files.slice(i, i + concurrency);
    const promises = batch.map(async (file) => {
      const slug = basename(file, '.md');
      const content = readFileSync(join(bodiesDir, file), 'utf8');
      console.log(`  Translating policy: ${slug} (${LANGUAGES[lang].name})...`);

      // For very long policies, the 8192 max_tokens might truncate.
      // Use a higher limit for body content.
      const result = await translate(lang, 'policy-body', content);
      writeFileSync(join(outDir, file), result);
      calls++;
    });
    await Promise.all(promises);
  }

  return calls;
}

async function translateGrantBodies(lang) {
  const bodiesDir = join(EXTRACTED, 'grant-bodies');
  if (!existsSync(bodiesDir)) return 0;
  const files = readdirSync(bodiesDir).filter(f => f.endsWith('.md'));
  const outDir = join(OUTPUT, lang, 'grant-bodies');
  mkdirSync(outDir, { recursive: true });

  let calls = 0;
  for (const file of files) {
    const slug = basename(file, '.md');
    const content = readFileSync(join(bodiesDir, file), 'utf8');
    console.log(`  Translating grant: ${slug} (${LANGUAGES[lang].name})...`);
    const result = await translate(lang, 'grant-body', content);
    writeFileSync(join(outDir, file), result);
    calls++;
  }

  return calls;
}

// ─── Orchestrator ───────────────────────────────────────────────────────────

const TASK_MAP = {
  'ui-strings': translateUIStrings,
  'page-meta': translatePageMeta,
  'policy-frontmatter': translatePolicyFrontmatter,
  'policy-bodies': translatePolicyBodies,
  'grant-bodies': translateGrantBodies,
};

async function main() {
  // Verify extracted content exists
  if (!existsSync(EXTRACTED)) {
    console.error('Error: Extracted content not found. Run extract-content.js first:');
    console.error('  node scripts/translate/extract-content.js');
    process.exit(1);
  }

  const langs = langFilter ? [langFilter] : Object.keys(LANGUAGES);
  const types = typeFilter ? [typeFilter] : CONTENT_TYPES;

  // Print plan
  console.log('═══════════════════════════════════════════════════════');
  console.log('  Denver For All — Translation Pipeline');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  Model:       ${MODEL}`);
  console.log(`  Languages:   ${langs.map(l => `${l} (${LANGUAGES[l].nativeName})`).join(', ')}`);
  console.log(`  Types:       ${types.join(', ')}`);
  console.log(`  Concurrency: ${concurrency}`);
  console.log(`  Mode:        ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log('═══════════════════════════════════════════════════════\n');

  const startTime = Date.now();
  let totalCalls = 0;
  let totalFailures = 0;
  const results = {};

  for (const lang of langs) {
    console.log(`\n── ${LANGUAGES[lang].name} (${LANGUAGES[lang].nativeName}) ──`);
    const langOutDir = join(OUTPUT, lang);
    mkdirSync(langOutDir, { recursive: true });
    results[lang] = {};

    for (const type of types) {
      console.log(`\n  → ${type}`);
      try {
        const calls = await TASK_MAP[type](lang);
        totalCalls += calls;
        results[lang][type] = { status: 'ok', calls };
        console.log(`  ✓ ${type} complete (${calls} API calls)`);
      } catch (err) {
        totalFailures++;
        results[lang][type] = { status: 'failed', error: err.message };
        console.error(`  ✗ ${type} FAILED: ${err.message}`);
        if (ciMode) {
          console.log(`::warning title=Translation failed: ${lang}/${type}::${err.message}`);
        }
        // Continue to next type — don't abort the whole run
      }
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  Translation complete!');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  API calls:     ${totalCalls}`);
  console.log(`  Failures:      ${totalFailures}`);
  console.log(`  Input tokens:  ${inputTokens.toLocaleString()}`);
  console.log(`  Output tokens: ${outputTokens.toLocaleString()}`);
  console.log(`  Elapsed:       ${elapsed}s`);
  console.log(`  Output:        ${OUTPUT}`);

  if (!dryRun) {
    // Rough cost estimate for Haiku 4.5 ($0.80/MTok input, $4/MTok output)
    const costIn = (inputTokens / 1_000_000) * 0.80;
    const costOut = (outputTokens / 1_000_000) * 4.00;
    console.log(`  Est. cost:     $${(costIn + costOut).toFixed(2)} (in: $${costIn.toFixed(2)}, out: $${costOut.toFixed(2)})`);
  }

  // Write machine-readable summary for CI
  if (ciMode) {
    const summary = {
      timestamp: new Date().toISOString(),
      model: MODEL,
      apiCalls: totalCalls,
      failures: totalFailures,
      inputTokens,
      outputTokens,
      elapsedSeconds: parseFloat(elapsed),
      results,
    };
    writeFileSync(join(OUTPUT, 'summary.json'), JSON.stringify(summary, null, 2));
    console.log(`\n  CI summary written to: ${join(OUTPUT, 'summary.json')}`);
  }

  console.log(`\n  Next steps:`);
  console.log(`  1. Review output in ${OUTPUT}/<lang>/`);
  console.log(`  2. Run: node scripts/translate/hydrate.js to place translations into the codebase`);
  console.log('═══════════════════════════════════════════════════════');

  // In CI, exit non-zero only if ALL translations failed
  if (ciMode && totalCalls === 0 && totalFailures > 0) {
    process.exit(1);
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getArg(name) {
  const idx = args.indexOf(name);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : null;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
