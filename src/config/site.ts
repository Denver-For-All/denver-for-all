/**
 * Central site configuration — the single file to edit when forking for another city.
 *
 * Every city-specific value that appears in layouts, components, page metadata,
 * or API functions should be sourced from (or documented in) this file.
 *
 * After forking, update the values below to match your city, then search the
 * codebase for any remaining references:
 *   grep -ri "denver" src/ functions/ workers/
 *
 * Some files that live outside the Astro build (Cloudflare Workers, wrangler.toml)
 * cannot import this config directly — those files contain a comment pointing here
 * so you know to update them in parallel.
 */

export const siteConfig = {
  // ── Branding ────────────────────────────────────────────────────────────────

  /** Canonical site URL (no trailing slash). Also set in astro.config.mjs. */
  url: 'https://denverforall.org',

  /** Site name in each supported locale */
  name: {
    en: 'Denver For All',
    es: 'Denver Para Todos',
  } as Record<string, string>,

  /** City name in each supported locale */
  city: {
    en: 'Denver',
    es: 'Denver',
  } as Record<string, string>,

  /** Short tagline */
  tagline: {
    en: 'Built by the people, for the people.',
    es: 'Hecho por el pueblo, para el pueblo.',
  } as Record<string, string>,

  /** Default meta description (home page / fallback) */
  description: {
    en: 'A movement for economic justice in Denver. Building a city where everyone can afford to live, work, and thrive.',
    es: 'Un movimiento por la justicia económica en Denver. Construyendo una ciudad donde todos puedan vivir, trabajar y prosperar.',
  } as Record<string, string>,

  // ── Contact & social ────────────────────────────────────────────────────────

  /** Primary contact email */
  email: 'info@denverforall.org',

  /** GitHub repository in owner/repo format */
  githubRepo: 'Denver-For-All/denver-for-all',

  /** External links (set to empty string to hide in footer) */
  links: {
    reddit: 'https://www.reddit.com/r/DenverForAll/',
    signal:
      'https://signal.group/#CjQKIDnsKXfjsfzF6z51cdXSTRKzZWxG71JNlmN-lawMNOkWEhAKQ8yueN1JU8E6RaRM6D8I',
    openCollective: 'https://opencollective.com/denver-for-all',
  },

  // ── Governance ──────────────────────────────────────────────────────────────

  /** Current mayor / city executive (used in policy action CTAs) */
  executive: {
    en: 'Mayor Johnston',
    es: 'Alcalde Johnston',
  } as Record<string, string>,
} as const;

/** Helper: get the site name for a locale (falls back to English) */
export function siteName(locale: string): string {
  return siteConfig.name[locale] ?? siteConfig.name.en;
}

/** Helper: get the site URL with an optional path */
export function siteUrl(path = ''): string {
  return `${siteConfig.url}${path}`;
}

export type SiteConfig = typeof siteConfig;
