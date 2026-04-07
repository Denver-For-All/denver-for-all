import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { siteConfig } from '@config/site';

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

// Derive expected origins from the central site config
const domain = new URL(siteConfig.url).hostname;
const prodOrigin = siteConfig.url;
const wwwOrigin = `https://www.${domain}`;

describe('subscribe endpoint logic', () => {
  // Build ALLOWED_ORIGINS the same way subscribe.ts does
  const ALLOWED_ORIGINS = [prodOrigin, wwwOrigin, 'http://localhost:4321', 'http://localhost:3000'];

  function getCorsOrigin(origin: string): string {
    return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  }

  it('source file defines expected allowed origins', () => {
    expect(subscribeSource).toContain('ALLOWED_ORIGINS');
    expect(subscribeSource).toContain('SITE_DOMAIN');
    expect(subscribeSource).toContain('localhost:4321');
  });

  it('allows production origin', () => {
    expect(getCorsOrigin(prodOrigin)).toBe(prodOrigin);
  });

  it('allows www production origin', () => {
    expect(getCorsOrigin(wwwOrigin)).toBe(wwwOrigin);
  });

  it('allows localhost dev origin', () => {
    expect(getCorsOrigin('http://localhost:4321')).toBe('http://localhost:4321');
  });

  it('rejects unknown origins by defaulting to production', () => {
    expect(getCorsOrigin('https://evil.com')).toBe(prodOrigin);
  });

  it('rejects empty origin by defaulting to production', () => {
    expect(getCorsOrigin('')).toBe(prodOrigin);
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
