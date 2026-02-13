import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Tests for the subscribe endpoint logic (functions/api/subscribe.ts).
 *
 * The actual function uses Cloudflare Pages types (PagesFunction, Request)
 * that aren't available in vitest without miniflare. These tests verify
 * the core logic patterns extracted from the source file.
 */

// Read the actual source to extract constants for testing
const subscribeSource = readFileSync(
  join(__dirname, '..', 'functions', 'api', 'subscribe.ts'),
  'utf-8',
);

describe('subscribe endpoint logic', () => {
  // Extract ALLOWED_ORIGINS from source to keep tests in sync
  const originsMatch = subscribeSource.match(/const ALLOWED_ORIGINS = \[([\s\S]*?)\]/);
  const ALLOWED_ORIGINS = originsMatch
    ? originsMatch[1].match(/'([^']+)'/g)?.map((s) => s.replace(/'/g, ''))
    : [];

  function getCorsOrigin(origin: string): string {
    return ALLOWED_ORIGINS!.includes(origin) ? origin : ALLOWED_ORIGINS![0];
  }

  it('source file defines expected allowed origins', () => {
    expect(ALLOWED_ORIGINS).toContain('https://denverforall.org');
    expect(ALLOWED_ORIGINS).toContain('https://www.denverforall.org');
    expect(ALLOWED_ORIGINS).toContain('http://localhost:4321');
  });

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
    // Extract the email regex from source to stay in sync
    const regexMatch = subscribeSource.match(/\/(\^[^/]+\$)\/\.test\(email\)/);
    const emailRegex = regexMatch ? new RegExp(regexMatch[1]) : null;

    it('source file contains email validation regex', () => {
      expect(emailRegex).not.toBeNull();
    });

    it('accepts valid emails', () => {
      expect(emailRegex!.test('user@example.com')).toBe(true);
      expect(emailRegex!.test('test+tag@domain.org')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(emailRegex!.test('')).toBe(false);
      expect(emailRegex!.test('notanemail')).toBe(false);
      expect(emailRegex!.test('@domain.com')).toBe(false);
      expect(emailRegex!.test('user@')).toBe(false);
    });
  });
});
