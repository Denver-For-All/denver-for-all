import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const POLICIES_DIR = join(__dirname, '..', 'src', 'content', 'policies');

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

describe('i18n translation files', () => {
  it('en.json and es.json have matching top-level keys', () => {
    const en = JSON.parse(
      readFileSync(join(__dirname, '..', 'src', 'i18n', 'en.json'), 'utf-8'),
    );
    const es = JSON.parse(
      readFileSync(join(__dirname, '..', 'src', 'i18n', 'es.json'), 'utf-8'),
    );

    const enKeys = Object.keys(en).sort();
    const esKeys = Object.keys(es).sort();

    expect(enKeys).toEqual(esKeys);
  });
});
