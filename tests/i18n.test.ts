import { describe, it, expect } from 'vitest';
import {
  t,
  locale,
  localeFromPath,
  localizePath,
  stripLocale,
  getDir,
  LOCALE_CODES,
} from '../src/i18n/utils';

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

  it('supports the six configured locales', () => {
    expect(LOCALE_CODES).toEqual(['en', 'es', 'vi', 'zh', 'ar', 'am']);
  });

  it('detects the active locale from a path prefix', () => {
    expect(localeFromPath('/')).toBe('en');
    expect(localeFromPath('/platform')).toBe('en');
    expect(localeFromPath('/es/platform')).toBe('es');
    expect(localeFromPath('/vi')).toBe('vi');
    expect(localeFromPath('/ar/tools/rent-calculator')).toBe('ar');
  });

  it('round-trips a path between localize and strip', () => {
    expect(localizePath('/platform', 'zh')).toBe('/zh/platform');
    expect(localizePath('/', 'zh')).toBe('/zh/');
    expect(localizePath('/platform', 'en')).toBe('/platform');
    expect(stripLocale('/zh/platform')).toBe('/platform');
    expect(stripLocale('/platform')).toBe('/platform');
  });

  it('marks Arabic as right-to-left and others left-to-right', () => {
    expect(getDir('ar')).toBe('rtl');
    expect(getDir('en')).toBe('ltr');
    expect(getDir('vi')).toBe('ltr');
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
