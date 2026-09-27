#!/usr/bin/env node
/**
 * Copy each English policy's References list into its translated bodies.
 *
 * References are cited as published (APA 7): author names, titles, and
 * publishers stay in the source's own language so readers can find them. The
 * English list in src/content/policies/<slug>.md is the single source of
 * truth; this script replaces the list under each locale's localized
 * References heading (appending the section if a translation lacks one).
 *
 * Idempotent. Run after editing any English References section:
 *   node scripts/translate/sync-references.mjs
 * tests/citations.test.ts fails if a translation drifts from English.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REFERENCE_HEADINGS as HEADINGS } from '../../src/markdown/rehype-references.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT = path.resolve(__dirname, '../../src/content');

/** Localized References headings per translated locale (first entry is canonical). */
export const REFERENCE_HEADINGS = Object.fromEntries(
  Object.entries(HEADINGS).filter(([locale]) => locale !== 'en'),
);

const LIST = /^(?:- [^\n]*\n?)+/;

/** Return the contiguous bullet list under `## <heading>`, or null. */
export function referenceList(content, headings = ['References']) {
  for (const heading of headings) {
    const idx = content.search(new RegExp(`^## ${heading}\\s*$`, 'm'));
    if (idx === -1) continue;
    const after = content.indexOf('\n', idx) + 1;
    const lead = content.slice(after).match(/^\n*/)[0].length;
    const list = content.slice(after + lead).match(LIST);
    return { heading: idx, start: after + lead, text: list ? list[0].replace(/\n$/, '') : '' };
  }
  return null;
}

function sync() {
  const slugs = fs
    .readdirSync(path.join(CONTENT, 'policies'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
  let changed = 0;
  for (const [locale, headings] of Object.entries(REFERENCE_HEADINGS)) {
    for (const slug of slugs) {
      const file = path.join(CONTENT, `policies-${locale}`, `${slug}.md`);
      if (!fs.existsSync(file)) continue;
      const english = referenceList(
        fs.readFileSync(path.join(CONTENT, 'policies', `${slug}.md`), 'utf-8'),
      );
      if (!english?.text) continue;
      const content = fs.readFileSync(file, 'utf-8');
      const current = referenceList(content, headings);
      let next;
      if (current) {
        // Also normalize older heading variants to the locale's canonical heading.
        next =
          content.slice(0, current.heading) +
          `## ${headings[0]}\n\n` +
          english.text +
          content.slice(current.start + current.text.length);
      } else {
        next = `${content.replace(/\s*$/, '')}\n\n## ${headings[0]}\n\n${english.text}\n`;
      }
      if (next !== content) {
        fs.writeFileSync(file, next);
        changed++;
      }
    }
  }
  console.log(`Synced references into ${changed} translated policy files.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) sync();
