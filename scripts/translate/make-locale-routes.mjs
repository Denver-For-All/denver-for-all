#!/usr/bin/env node
/**
 * Generate per-locale page routes for the non-default locales.
 *
 * The site uses one physical page folder per locale (mirroring the long-
 * standing /es/ folder). This script materializes /vi, /zh, /ar, /am from the
 * canonical English pages under src/pages, adjusting:
 *   - relative import depth (pages move one directory deeper)
 *   - getPageMeta(page, 'en')  ->  getPageMeta(page, '<locale>')
 *   - the policy detail page renders the locale's translated body
 *     (collection policies-<locale>) with graceful fallback to English.
 *
 * Idempotent: existing generated locale folders are removed and rebuilt.
 * Run after adding a locale to src/i18n/utils.ts:
 *   node scripts/translate/make-locale-routes.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES = path.resolve(__dirname, '../../src/pages');

// Locales that get a generated route folder. Keep in sync with LOCALES in
// src/i18n/utils.ts (everything except the default 'en' and the hand-authored 'es').
const LOCALES = ['vi', 'zh', 'ar', 'am'];

const SKIP_TOP = new Set(['es', ...LOCALES]);

/** Recursively collect canonical English page files (top-level, no locale dirs). */
function collect(dir, rel = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (rel === '' && SKIP_TOP.has(entry.name)) continue;
      out.push(...collect(path.join(dir, entry.name), r));
    } else if (entry.name.endsWith('.astro')) {
      out.push(r);
    }
  }
  return out;
}

function transform(src, rel, locale) {
  let out = src;
  // Bump relative-import depth by one level (pages move into /<locale>/...).
  out = out.replace(/(\bfrom\s+['"])\.\.\//g, '$1../../');
  out = out.replace(/(\bimport\s+['"])\.\.\//g, '$1../../');
  // Localize page metadata lookups.
  out = out.replace(/getPageMeta\((['"][^'"]+['"]),\s*'en'\)/g, `getPageMeta($1, '${locale}')`);

  // Policy detail page: render the locale's translated body with English fallback.
  if (rel === 'platform/[slug].astro') {
    out = out.replace(
      /let ContentEs: \(typeof Content\) \| null = null;[\s\S]*?\n}\n/,
      `let ContentLoc: (typeof Content) | null = null;\n` +
        `try {\n` +
        `  const policyLoc = await getEntry('policies-${locale}', policy.slug);\n` +
        `  if (policyLoc) {\n` +
        `    const rendered = await policyLoc.render();\n` +
        `    ContentLoc = rendered.Content;\n` +
        `  }\n` +
        `} catch {\n` +
        `  // No ${locale} translation available for this policy\n` +
        `}\n` +
        `const Body = ContentLoc ?? Content;\n`,
    );
    out = out.replace(
      /<div class="policy-content" data-lang="en">\s*<Content \/>\s*<\/div>\s*\{ContentEs && \(\s*<div class="policy-content" data-lang="es">\s*<ContentEs \/>\s*<\/div>\s*\)\}/,
      `<div class="policy-content">\n        <Body />\n      </div>`,
    );
  }
  return out;
}

let written = 0;
for (const locale of LOCALES) {
  const target = path.join(PAGES, locale);
  fs.rmSync(target, { recursive: true, force: true });
  for (const rel of collect(PAGES)) {
    const src = fs.readFileSync(path.join(PAGES, rel), 'utf8');
    const out = transform(src, rel, locale);
    const dest = path.join(target, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, out);
    written++;
  }
  console.log(`  /${locale}: ${collect(PAGES).length} pages`);
}
console.log(`Generated ${written} locale page(s).`);
