import { describe, it, expect } from 'vitest';

describe('subscribe endpoint logic', () => {
  const ALLOWED_ORIGINS = [
    'https://denverforall.org',
    'https://www.denverforall.org',
    'http://localhost:4321',
    'http://localhost:3000',
  ];

  function getCorsOrigin(origin: string): string {
    return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  }

  it('allows production origin', () => {
    expect(getCorsOrigin('https://denverforall.org')).toBe('https://denverforall.org');
  });

  it('allows www production origin', () => {
    expect(getCorsOrigin('https://www.denverforall.org')).toBe('https://www.denverforall.org');
  });

  it('allows localhost dev origin', () => {
    expect(getCorsOrigin('http://localhost:4321')).toBe('http://localhost:4321');
  });

  it('rejects unknown origins by defaulting to production', () => {
    expect(getCorsOrigin('https://evil.com')).toBe('https://denverforall.org');
  });

  it('rejects empty origin by defaulting to production', () => {
    expect(getCorsOrigin('')).toBe('https://denverforall.org');
  });

  describe('email validation', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    it('accepts valid emails', () => {
      expect(emailRegex.test('user@example.com')).toBe(true);
      expect(emailRegex.test('test+tag@domain.org')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(emailRegex.test('')).toBe(false);
      expect(emailRegex.test('notanemail')).toBe(false);
      expect(emailRegex.test('@domain.com')).toBe(false);
      expect(emailRegex.test('user@')).toBe(false);
    });
  });
});
