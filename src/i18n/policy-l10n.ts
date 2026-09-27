/**
 * Localized policy metadata for the generated locales (vi, zh, ar, am).
 *
 * English and Spanish live in each policy's frontmatter (`title`/`titleEs`, etc.).
 * The other locales keep their translations in src/i18n/policy-meta-<code>.json,
 * keyed by policy id. Anything missing falls back to English, so partial
 * coverage is safe to ship.
 */
import type { Locale } from './utils';
import vi from './policy-meta-vi.json';
import zh from './policy-meta-zh.json';
import ar from './policy-meta-ar.json';
import am from './policy-meta-am.json';

export interface LocalizedStat {
  value?: string;
  label?: string;
  context?: string;
  source?: string;
}

/** Translatable text of one SMART goal; deadline and source stay canonical. */
export interface LocalizedGoal {
  goal?: string;
  metric?: string;
  baseline?: string;
  target?: string;
  owner?: string;
  precedent?: string;
}

export interface PolicyMetaEntry {
  title?: string;
  summary?: string;
  keyStats?: LocalizedStat[];
  smartGoals?: LocalizedGoal[];
}

export type PolicyMetaFile = Record<string, PolicyMetaEntry>;

export const POLICY_META: Partial<Record<Locale, PolicyMetaFile>> = {
  vi: vi as PolicyMetaFile,
  zh: zh as PolicyMetaFile,
  ar: ar as PolicyMetaFile,
  am: am as PolicyMetaFile,
};

interface StatLike {
  value: string;
  label: string;
  context?: string;
  source?: string;
}

interface GoalLike {
  goal: string;
  metric: string;
  baseline: string;
  target: string;
  owner: string;
  precedent: string;
}

interface PolicyLike<S extends StatLike, G extends GoalLike> {
  title: string;
  summary: string;
  keyStats?: S[];
  smartGoals: G[];
}

/**
 * Return the policy's display text in `lang`, merging translations over the
 * English frontmatter field by field.
 */
export function localizePolicy<S extends StatLike, G extends GoalLike>(
  id: string,
  data: PolicyLike<S, G>,
  lang: Locale,
) {
  const meta = POLICY_META[lang]?.[id] ?? {};
  // Match translated stats by their value, not position, so a stat added to the English
  // frontmatter later never borrows a neighbor's caption.
  const keyStats = (data.keyStats ?? []).map((stat) => {
    const loc = meta.keyStats?.find((s) => s.value === stat.value) ?? {};
    return {
      ...stat,
      label: loc.label || stat.label,
      context: loc.context || stat.context,
      source: loc.source || stat.source,
    };
  });
  const smartGoals = data.smartGoals.map((goal, i) => {
    const loc = meta.smartGoals?.[i] ?? {};
    return {
      ...goal,
      goal: loc.goal || goal.goal,
      metric: loc.metric || goal.metric,
      baseline: loc.baseline || goal.baseline,
      target: loc.target || goal.target,
      owner: loc.owner || goal.owner,
      precedent: loc.precedent || goal.precedent,
    };
  });
  return {
    title: meta.title || data.title,
    summary: meta.summary || data.summary,
    keyStats,
    smartGoals,
    translated: Boolean(POLICY_META[lang]?.[id]),
  };
}
