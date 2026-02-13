import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const POLICIES_DIR = join(__dirname, '..', 'src', 'content', 'policies');
const POLICIES_ES_DIR = join(__dirname, '..', 'src', 'content', 'policies-es');

describe('policy content', () => {
  const policyFiles = readdirSync(POLICIES_DIR).filter((f) => f.endsWith('.md'));

  it('has policy files', () => {
    expect(policyFiles.length).toBeGreaterThan(0);
  });

  it('all policy files have required frontmatter fields', () => {
    const requiredFields = ['title', 'summary', 'category', 'icon', 'order'];

    for (const file of policyFiles) {
      const content = readFileSync(join(POLICIES_DIR, file), 'utf-8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      expect(frontmatterMatch, `${file} should have frontmatter`).toBeTruthy();

      const frontmatter = frontmatterMatch![1];
      for (const field of requiredFields) {
        expect(
          frontmatter.includes(`${field}:`),
          `${file} should have '${field}' in frontmatter`,
        ).toBe(true);
      }
    }
  });

  it('no policy file is empty', () => {
    for (const file of policyFiles) {
      const content = readFileSync(join(POLICIES_DIR, file), 'utf-8');
      const body = content.replace(/^---[\s\S]*?---/, '').trim();
      expect(body.length, `${file} should have content after frontmatter`).toBeGreaterThan(0);
    }
  });
});

describe('Spanish policy translations', () => {
  const enFiles = readdirSync(POLICIES_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace('.md', ''));
  const esFiles = readdirSync(POLICIES_ES_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace('.md', ''));

  it('has Spanish policy translations', () => {
    expect(esFiles.length).toBeGreaterThan(0);
  });

  it('every English policy has a Spanish translation', () => {
    const missingTranslations = enFiles.filter((slug) => !esFiles.includes(slug));
    expect(
      missingTranslations,
      `Missing Spanish translations for: ${missingTranslations.join(', ')}`,
    ).toEqual([]);
  });

  it('no orphan Spanish translations without English originals', () => {
    const orphans = esFiles.filter((slug) => !enFiles.includes(slug));
    expect(
      orphans,
      `Orphan Spanish files without English originals: ${orphans.join(', ')}`,
    ).toEqual([]);
  });

  it('no Spanish policy file is empty', () => {
    for (const slug of esFiles) {
      const content = readFileSync(join(POLICIES_ES_DIR, `${slug}.md`), 'utf-8');
      const body = content.replace(/^---[\s\S]*?---/, '').trim();
      expect(body.length, `policies-es/${slug}.md should have content`).toBeGreaterThan(0);
    }
  });
});

describe('i18n translation files', () => {
  const en = JSON.parse(
    readFileSync(join(__dirname, '..', 'src', 'i18n', 'en.json'), 'utf-8'),
  );
  const es = JSON.parse(
    readFileSync(join(__dirname, '..', 'src', 'i18n', 'es.json'), 'utf-8'),
  );

  it('en.json and es.json have matching top-level keys', () => {
    const enKeys = Object.keys(en).sort();
    const esKeys = Object.keys(es).sort();
    expect(enKeys).toEqual(esKeys);
  });

  it('en.json and es.json have matching nested keys (deep comparison)', () => {
    function getAllKeys(obj: Record<string, unknown>, prefix = ''): string[] {
      const keys: string[] = [];
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          keys.push(...getAllKeys(value as Record<string, unknown>, fullKey));
        } else {
          keys.push(fullKey);
        }
      }
      return keys;
    }

    const enKeys = getAllKeys(en).sort();
    const esKeys = getAllKeys(es).sort();

    const missingInEs = enKeys.filter((k) => !esKeys.includes(k));
    const missingInEn = esKeys.filter((k) => !enKeys.includes(k));

    expect(
      missingInEs,
      `Keys in en.json missing from es.json: ${missingInEs.join(', ')}`,
    ).toEqual([]);
    expect(
      missingInEn,
      `Keys in es.json missing from en.json: ${missingInEn.join(', ')}`,
    ).toEqual([]);
  });

  it('no translation value is empty', () => {
    function checkValues(obj: Record<string, unknown>, path = '', lang = '') {
      for (const [key, value] of Object.entries(obj)) {
        const fullPath = path ? `${path}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          checkValues(value as Record<string, unknown>, fullPath, lang);
        } else if (typeof value === 'string') {
          expect(value.trim().length, `${lang}:${fullPath} should not be empty`).toBeGreaterThan(0);
        }
      }
    }

    checkValues(en, '', 'en');
    checkValues(es, '', 'es');
  });
});

describe('page metadata', () => {
  it('getPageMeta returns correct metadata for all pages', async () => {
    const { getPageMeta } = await import('../src/i18n/page-meta');

    const pages = ['home', 'about', 'platform', 'tools', 'takeAction', 'runForDenver'];
    for (const page of pages) {
      const en = getPageMeta(page, 'en');
      const es = getPageMeta(page, 'es');

      expect(en.title.length, `${page} EN title should not be empty`).toBeGreaterThan(0);
      expect(en.description.length, `${page} EN description should not be empty`).toBeGreaterThan(0);
      expect(es.title.length, `${page} ES title should not be empty`).toBeGreaterThan(0);
      expect(es.description.length, `${page} ES description should not be empty`).toBeGreaterThan(0);
      expect(en.title).not.toEqual(es.title);
    }
  });

  it('getPageMeta returns fallback for unknown pages', async () => {
    const { getPageMeta } = await import('../src/i18n/page-meta');
    const meta = getPageMeta('nonexistent', 'en');
    expect(meta.title).toBe('Denver For All');
  });
});
