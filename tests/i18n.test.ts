import { describe, it, expect } from 'vitest';
import { t, locale, toggleLocale } from '../src/i18n/utils';

describe('i18n utilities', () => {
  it('returns English text by default', () => {
    locale.set('en');
    const result = t('nav.platform');
    expect(result).toBe('Platform');
  });

  it('returns Spanish text when locale is es', () => {
    locale.set('es');
    const result = t('nav.platform');
    expect(result).toBe('Plataforma');
  });

  it('returns the key when translation is missing', () => {
    locale.set('en');
    const result = t('nonexistent.key');
    expect(result).toBe('nonexistent.key');
  });

  it('toggleLocale switches between en and es', () => {
    locale.set('en');
    toggleLocale();
    expect(locale.get()).toBe('es');
    toggleLocale();
    expect(locale.get()).toBe('en');
  });

  it('handles nested keys correctly', () => {
    locale.set('en');
    const result = t('hero.title');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('accepts explicit locale parameter', () => {
    locale.set('en');
    const esResult = t('nav.platform', 'es');
    expect(esResult).toBe('Plataforma');
  });
});
