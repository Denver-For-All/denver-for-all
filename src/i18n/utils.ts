import { atom } from 'nanostores';
import en from './en.json';
import es from './es.json';
import vi from './vi.json';
import zh from './zh.json';
import ar from './ar.json';
import am from './am.json';

export type Locale = 'en' | 'es' | 'vi' | 'zh' | 'ar' | 'am';

/**
 * Locale registry — the single source of truth for which languages the site
 * supports. Adding a language means: (1) add an entry here, (2) drop a
 * runtime dictionary at src/i18n/runtime/<code>.json, (3) register its
 * content collection in src/content/config.ts, and (4) run
 * `node scripts/translate/make-locale-routes.mjs` to generate its page routes.
 */
export interface LocaleMeta {
  /** BCP-47 language code, also used as the URL prefix (except the default). */
  code: Locale;
  /** Endonym shown in the language menu. */
  label: string;
  /** Short label shown in compact UI. */
  short: string;
  /** Text direction for <html dir>. */
  dir: 'ltr' | 'rtl';
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'es', label: 'Español', short: 'ES', dir: 'ltr' },
  { code: 'vi', label: 'Tiếng Việt', short: 'VI', dir: 'ltr' },
  { code: 'zh', label: '中文', short: '中文', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'AR', dir: 'rtl' },
  { code: 'am', label: 'አማርኛ', short: 'AM', dir: 'ltr' },
];

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_CODES = LOCALES.map((l) => l.code);

const localeByCode = new Map(LOCALES.map((l) => [l.code, l]));

/** Look up a locale's metadata (falls back to the default locale). */
export function getLocaleMeta(code: string): LocaleMeta {
  return localeByCode.get(code as Locale) ?? localeByCode.get(DEFAULT_LOCALE)!;
}

/** Text direction for a locale. */
export function getDir(code: string): 'ltr' | 'rtl' {
  return getLocaleMeta(code).dir;
}

/**
 * Detect the active locale from a pathname. The default locale is unprefixed;
 * every other locale lives under /<code>/.
 */
export function localeFromPath(pathname: string): Locale {
  for (const { code } of LOCALES) {
    if (code === DEFAULT_LOCALE) continue;
    if (pathname === `/${code}` || pathname.startsWith(`/${code}/`)) return code;
  }
  return DEFAULT_LOCALE;
}

/** Strip the locale prefix from a pathname, returning the canonical (English) path. */
export function stripLocale(pathname: string): string {
  const active = localeFromPath(pathname);
  if (active === DEFAULT_LOCALE) return pathname || '/';
  const stripped = pathname.replace(new RegExp(`^/${active}(/|$)`), '/');
  return stripped || '/';
}

/** Build the path to a canonical (English) path under a given locale. */
export function localizePath(canonicalPath: string, code: Locale): string {
  const path = canonicalPath || '/';
  if (code === DEFAULT_LOCALE) return path;
  if (path === '/') return `/${code}/`;
  return `/${code}${path}`;
}

const translations = { en, es, vi, zh, ar, am } as const;

export const locale = atom<Locale>('en');

export function t(key: string, lang?: Locale): string {
  const l = lang ?? locale.get();
  const keys = key.split('.');
  let value: Record<string, unknown> | string | undefined = translations[l] as Record<
    string,
    unknown
  >;
  for (const k of keys) {
    if (value == null || typeof value !== 'object') break;
    value = (value as Record<string, unknown>)[k] as Record<string, unknown> | string | undefined;
  }
  return (typeof value === 'string' ? value : undefined) ?? key;
}

export function getTranslations(lang: Locale) {
  return translations[lang];
}
