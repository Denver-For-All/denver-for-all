#!/usr/bin/env node
/**
 * hydrate-incoming.js — Pre-build hook that auto-hydrates translations
 *
 * Checks translations/incoming/ for any language directories containing
 * translation output. If found, runs hydrate.js against that directory.
 *
 * This runs automatically as part of `npm run build` via the prebuild script.
 * It's a no-op if translations/incoming/ is empty or only contains .gitkeep.
 */

import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { execFileSync } from 'child_process';

const ROOT = new URL('../../', import.meta.url).pathname;
const INCOMING = join(ROOT, 'translations/incoming');

if (!existsSync(INCOMING)) {
  process.exit(0);
}

const langs = readdirSync(INCOMING).filter(
  (f) => f !== '.gitkeep' && !f.startsWith('.')
);

if (langs.length === 0) {
  process.exit(0);
}

console.log(`\nFound incoming translations: ${langs.join(', ')}`);
console.log('Running hydration...\n');

try {
  execFileSync(
    process.execPath,
    [join(ROOT, 'scripts/translate/hydrate.js'), '--source', 'translations/incoming'],
    { stdio: 'inherit', cwd: ROOT }
  );
} catch (err) {
  console.error('Translation hydration failed:', err.message);
  process.exit(1);
}
