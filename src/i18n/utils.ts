import { atom } from 'nanostores';
import en from './en.json';
import es from './es.json';

export type Locale = 'en' | 'es';

const translations = { en, es } as const;

export const locale = atom<Locale>('en');

export function t(key: string, lang?: Locale): string {
  const l = lang ?? locale.get();
  const keys = key.split('.');
  let value: any = translations[l];
  for (const k of keys) {
    value = value?.[k];
  }
  return (value as string) ?? key;
}

export function toggleLocale(): void {
  locale.set(locale.get() === 'en' ? 'es' : 'en');
}

export function getTranslations(lang: Locale) {
  return translations[lang];
}
