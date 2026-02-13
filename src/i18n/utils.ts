import { atom } from 'nanostores';
import en from './en.json';
import es from './es.json';

export type Locale = 'en' | 'es';

const translations = { en, es } as const;

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

export function toggleLocale(): void {
  locale.set(locale.get() === 'en' ? 'es' : 'en');
}

export function getTranslations(lang: Locale) {
  return translations[lang];
}
