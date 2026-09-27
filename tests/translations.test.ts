import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';

const ROOT = join(__dirname, '..');
const POLICIES_DIR = join(ROOT, 'src', 'content', 'policies');
const GENERATED_LOCALES = ['vi', 'zh', 'ar', 'am'] as const;
const GOAL_FIELDS = ['goal', 'metric', 'baseline', 'target', 'owner', 'precedent'] as const;

interface MetaEntry {
  title?: string;
  summary?: string;
  keyStats?: { label?: string }[];
  smartGoals?: Record<string, string>[];
}

function englishFrontmatter(slug: string): Record<string, unknown> {
  const content = readFileSync(join(POLICIES_DIR, `${slug}.md`), 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return load(match![1]) as Record<string, unknown>;
}

const slugs = readdirSync(POLICIES_DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''));

describe('translations/incoming', () => {
  // `npm run build` re-hydrates anything in translations/incoming over src/ on every build,
  // silently reverting edits to translated content. Hydrate once, then clear the directory.
  it('is empty so builds do not overwrite src translations', () => {
    const incoming = join(ROOT, 'translations', 'incoming');
    const entries = existsSync(incoming)
      ? readdirSync(incoming).filter((f) => !f.startsWith('.'))
      : [];
    expect(entries).toEqual([]);
  });
});

describe.each(GENERATED_LOCALES)('policy metadata (%s)', (lang) => {
  const meta = JSON.parse(
    readFileSync(join(ROOT, 'src', 'i18n', `policy-meta-${lang}.json`), 'utf-8'),
  ) as Record<string, MetaEntry>;

  it('has a translated title and summary for every policy', () => {
    const missing = slugs.filter((slug) => !meta[slug]?.title || !meta[slug]?.summary);
    expect(missing, `missing ${lang} title/summary`).toEqual([]);
  });

  it('translates every key stat and SMART goal', () => {
    for (const slug of slugs) {
      const fm = englishFrontmatter(slug);
      const stats = (fm.keyStats as { value: string }[] | undefined) ?? [];
      const goals = fm.smartGoals as unknown[];
      // Stats are matched by value at render time, so every English value needs a translation.
      expect(
        (meta[slug].keyStats ?? []).map((s) => (s as { value?: string }).value),
        `${lang} ${slug} keyStats`,
      ).toEqual(stats.map((s) => s.value));
      expect(meta[slug].smartGoals?.length ?? 0, `${lang} ${slug} smartGoals`).toBe(goals.length);
      for (const goal of meta[slug].smartGoals ?? []) {
        for (const field of GOAL_FIELDS) {
          expect(goal[field]?.trim().length, `${lang} ${slug} goal.${field}`).toBeGreaterThan(0);
        }
      }
    }
  });
});
