import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { REFERENCE_HEADINGS, referenceList } from '../scripts/translate/sync-references.mjs';

/**
 * House citation style: APA 7 author–date reference entries.
 *   Author. (Date). Title. Source. URL
 * Date is a year, a year range, "YYYY, Month[ Day]", or "n.d.". Legal sources (cases,
 * statutes, constitutions) keep legal citation form, as APA 7 §11 prescribes.
 */
const MONTHS =
  'January|February|March|April|May|June|July|August|September|October|November|December';
const DATE = `(?:(?:19|20)\\d\\d[a-z]?(?:[–-](?:19|20)?\\d\\d)?(?:, (?:${MONTHS}|amended (?:19|20)\\d\\d)(?: \\d{1,2}(?:[–-]\\d{1,2})?)?)?|n\\.d\\.)`;
const APA_ENTRY = new RegExp(`^- .+?\\. \\(${DATE}\\)\\. \\S`);
const TERMINATED = /[.)?!"”]$|https?:\/\/\S+$/;
const LEGAL_ENTRY = / v\. .*\d|Pub\. L\. No\.|U\.S\.C\.|C\.F\.R\.|\[\d{4}\] UKSC|§/;

const POLICIES_DIR = join(__dirname, '..', 'src', 'content', 'policies');

function references(content: string): string[] {
  const match = content.match(/\n## References\n+((?:- [^\n]*\n?)+)/);
  return match ? match[1].trim().split('\n') : [];
}

describe.each(readdirSync(POLICIES_DIR).filter((f) => f.endsWith('.md')))('%s', (file) => {
  const refs = references(readFileSync(join(POLICIES_DIR, file), 'utf-8'));

  it('has a References section with at least three sources', () => {
    expect(refs.length).toBeGreaterThanOrEqual(3);
  });

  it('formats every reference in APA 7 author–date style', () => {
    expect(refs.filter((r) => !APA_ENTRY.test(r) && !LEGAL_ENTRY.test(r))).toEqual([]);
  });

  it('ends every reference with terminal punctuation or a full URL', () => {
    expect(refs.filter((r) => !TERMINATED.test(r))).toEqual([]);
  });
});

describe('translated reference lists', () => {
  // Sources are cited as published, so every translation carries the English list verbatim.
  // Fix drift with: node scripts/translate/sync-references.mjs
  it.each(Object.entries(REFERENCE_HEADINGS))(
    'match English in policies-%s',
    (locale, headings) => {
      const drifted: string[] = [];
      for (const file of readdirSync(POLICIES_DIR).filter((f) => f.endsWith('.md'))) {
        const translated = join(POLICIES_DIR, '..', `policies-${locale}`, file);
        if (!existsSync(translated)) continue;
        const english = referenceList(readFileSync(join(POLICIES_DIR, file), 'utf-8'));
        const local = referenceList(readFileSync(translated, 'utf-8'), headings);
        if (english?.text !== local?.text) drifted.push(file);
      }
      expect(drifted).toEqual([]);
    },
  );
});
