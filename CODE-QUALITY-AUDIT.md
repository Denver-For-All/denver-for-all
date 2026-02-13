# Denver For All — Code Quality Audit

**Date:** 2026-02-13
**Scope:** Full repository audit covering code quality, project structure, documentation, dependencies, testing, security, CI/CD, performance, and developer experience.

---

## Overall Summary

Denver For All is a well-structured Astro + React civic platform with strong documentation, thoughtful architecture, and a clear mission. The codebase is clean and readable, with good separation between content, components, data, and backend services. The main areas for improvement are: (1) massive page duplication from the English/Spanish parallel-file approach, (2) no CI/CD pipeline, (3) thin test coverage, (4) missing `Content-Security-Policy` header, and (5) several dependency hygiene items. For a grassroots project on a minimal budget, this is impressive work — the findings below are focused on taking it from good to production-hardened.

---

## Top 5 Priority Improvements

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| **1** | **Add a GitHub Actions CI pipeline** (lint, format check, build, test) | Prevents broken deployments, enforces quality on every PR | Low |
| **2** | **Eliminate en/es page duplication** — extract a shared component pattern or use Astro's i18n routing to generate Spanish pages from a single source | ~38 pages are near-identical copies; any bug fix or feature must be applied in 2 places | Medium |
| **3** | **Extract a generic `ScrollytellingWrapper` component** — the 3 scrollytelling components are identical except for the function name | Removes 100% structural duplication across 3 files | Low |
| **4** | **Add `Content-Security-Policy` header** and tighten security headers | CSP is the single most impactful missing security control | Low |
| **5** | **Expand test coverage** — add integration tests for the subscribe endpoint, workers, and at least one page render test | Current tests are pure-logic only; no integration or component tests exist | Medium |

---

## 1. Code Quality

**Status: Needs Work**

### Findings

#### Massive en/es page duplication (Critical)
- Every page under `src/pages/` is fully duplicated under `src/pages/es/`. There are **19 English pages** and **19 Spanish pages** (38 total `.astro` files).
- The Spanish pages are near-identical clones with the same structure, scripts, and styles — differing only in text strings and `data-es` attributes.
- The current approach uses a `data-es` attribute pattern where a Layout.astro inline script swaps text at runtime for Spanish pages. This means the English text is always present in the HTML source even on Spanish pages.
- Any bug fix or feature change must be applied to **both** the English and Spanish versions manually — a maintenance liability that will grow.

#### 3x scrollytelling component duplication
- `EvictionScrollytelling.tsx`, `CampaignFinanceScrollytelling.tsx`, and `SidewalkScrollytelling.tsx` are **100% structurally identical** (47-48 lines each). They differ only in:
  - The function name
  - Which `StickyVisualization` and `NarrativeSteps` they import
- All three use the same scrollama setup, same hooks, same JSX structure.

#### Minor type safety gaps
- Two `any` types in scrollytelling files: `let scroller: any` in `EvictionScrollytelling.tsx:12` and `CampaignFinanceScrollytelling.tsx:12`. The sidewalk version already uses a proper type: `{ setup: Function; resize: Function; destroy: Function }`.
- The `SidewalkScrollytelling.tsx` typing pattern should be adopted across all three (or better, extracted into the shared wrapper).

#### Shared utility placement
- `useLocale.ts` lives under `src/components/sidewalk-data/` but is imported by all three scrollytelling modules (eviction and campaign-finance import from `../sidewalk-data/useLocale`). Same for `styles.css`. These should live in a shared location.

#### Console statements in workers
- 8 `console.log`/`console.error` calls in `workers/eviction-scraper/src/index.ts` and `workers/campaign-finance/src/index.ts`. Acceptable for Workers (they log to Wrangler tail), but consider structured logging.

### Recommendations

1. **Extract `ScrollytellingWrapper`** — a generic component that accepts `StickyVisualization` and `NarrativeSteps` as props/children. ~30 minutes of work, eliminates 100 lines of duplication.
2. **Move `useLocale.ts` and `styles.css`** to `src/components/shared/` or `src/utils/`.
3. **Consolidate en/es pages** — investigate using Astro's `getStaticPaths()` with a locale parameter to generate both language versions from a single page template. This is the single highest-impact refactor in the entire codebase.
4. **Replace `any` types** with the proper scrollama type from the sidewalk component.

---

## 2. Project Structure

**Status: Good**

### Findings

- Clean, logical top-level organization: `src/`, `functions/`, `workers/`, `scripts/`, `vapi/`, `tests/`, `public/`, `collateral/`.
- Content collections (`policies`, `policies-es`, `grants`) are well-defined with Zod schemas in `src/content/config.ts`.
- The `collateral/` directory (fundraising, outreach, fiscal sponsorship docs) is unusual in a code repo but makes sense for a grassroots campaign — it's the organizational memory.
- `updates/` directory has only 2 files; consider whether this belongs in the repo or in a blog/CMS.
- Workers each have their own `wrangler.toml`, `src/`, and schema — properly isolated.
- Path aliases (`@components/*`, `@layouts/*`, `@i18n/*`, `@styles/*`) are configured in `tsconfig.json` but not used consistently in source files (most use relative imports).

### Recommendations

1. **Move shared scrollytelling utilities** (`useLocale.ts`, `styles.css`) out of `sidewalk-data/` into a shared location.
2. **Consider a `src/utils/` directory** for shared TypeScript utilities as the project grows.
3. **Use path aliases consistently** — they're configured but underutilized.

---

## 3. Documentation

**Status: Good**

### Findings

- **README.md** is excellent: clear purpose statement, tech stack, getting started, project structure, deployment, fork guide, cost breakdown, and contribution links. One of the better open-source READMEs.
- **QUICKSTART.md** is thorough and serves dual audiences (technologists and organizers) — a thoughtful touch.
- **CONTRIBUTING.md** covers reporting, code contributions, translation, code standards, PR guidelines, and content guidelines.
- **GOVERNANCE.md**, **SECURITY.md**, **CODE_OF_CONDUCT.md**, **LICENSE** — all present and well-written.
- **GitHub templates** for issues (bug report, feature request, translation, policy update) and PR template are in place.
- **FUNDING.yml** points to Open Collective.
- Inline code comments are minimal but sufficient — the code is generally self-documenting.
- The `scripts/send-questionnaires.js` has excellent inline documentation and usage examples.

### What's Missing

- **No CHANGELOG or release history.** The project is at `v0.1.0` with no tagged releases.
- **No architecture decision records (ADRs)** for choices like: why Astro, why parallel-file i18n instead of dynamic, why nanostores over other state management.
- **The `policies-es` collection schema is `z.object({})`** — an empty schema with no validation. The English collection has rich validation (title, summary, category, icon, order, etc.) but Spanish policies have none.
- **SECURITY.md references EmailOctopus** in the "out of scope" section, but the code uses Resend — inconsistency.

### Recommendations

1. **Fix the SECURITY.md inconsistency** — replace "EmailOctopus" references with "Resend".
2. **Add schema validation for `policies-es`** — mirror the English policy schema fields.
3. **Start a CHANGELOG** when cutting releases.
4. **Consider adding an ADR** for the i18n approach, since it's the biggest architectural question.

---

## 4. Dependencies

**Status: Needs Work**

### Findings

- **0 known vulnerabilities** (`npm audit` clean).
- **React 18.3** is pinned — React 19.2.4 is the latest. React 18 is fine for now, but React 19 has been stable for months.
- **nanostores `^0.11.0`** — latest is 1.1.0. The `@nanostores/react` package is at `0.8.x` with 1.0.0 available. These are minor version bumps behind.
- **Potentially unused dependencies** (flagged by depcheck, but may be used implicitly via Astro):
  - `@iconify-json/lucide` — used by `astro-icon` implicitly (not a direct import)
  - `@nanostores/react` — used in `.astro` files via the i18n system
  - `@vapi-ai/web` — used alongside `@vapi-ai/client-sdk-react` in the chatbot component
  - `react-dom` — required by `@astrojs/react` implicitly
- **ESLint version mismatch**: `package.json` specifies `eslint@^9.39.2` but `package-lock.json` resolved to ESLint 10.0.0, which broke `eslint-plugin-astro` compatibility (confirmed: `npm run lint` fails with `ERR_MODULE_NOT_FOUND`).
- All `devDependencies` are appropriate for the project.

### Recommendations

1. **Fix ESLint immediately** — pin to `eslint@^9` or update `eslint-plugin-astro` to a version compatible with ESLint 10. This is blocking the lint command.
2. **Upgrade nanostores** to 1.x when convenient (check for breaking changes).
3. **Plan React 19 migration** — evaluate when `@astrojs/react` and `recharts` fully support it.
4. **Add `engines` field to `package.json`** specifying Node.js version requirement (already documented as 18+ in README but not enforced).

---

## 5. Testing

**Status: Needs Work**

### Findings

- **3 test files**, all in `tests/`:
  - `i18n.test.ts` (6 tests) — tests locale switching, fallback keys, explicit locale param
  - `content.test.ts` (3 tests) — validates policy frontmatter fields, checks files aren't empty
  - `subscribe.test.ts` (5 tests) — tests CORS origin logic and email validation regex
- Tests are **well-written**: clear descriptions, good edge cases (empty origin, missing keys, invalid emails).
- **However, tests only cover pure logic** — no integration tests, no component rendering tests, no API endpoint tests.
- **Tests cannot currently run** — `vitest` is not installed (`node_modules` missing in this environment), and `npm run lint` is broken.
- The subscribe test **re-implements business logic** rather than testing the actual function — it copies the `getCorsOrigin` function and email regex instead of importing from `functions/api/subscribe.ts`.

### Critical paths lacking tests

| Path | Risk | Priority |
|------|------|----------|
| `functions/api/subscribe.ts` endpoint (actual HTTP handling) | Email collection is core functionality | High |
| Worker API handlers (eviction, campaign finance) | Data integrity for public dashboards | High |
| Content collection schema validation | Broken frontmatter breaks the build | Medium |
| i18n key completeness (nested keys, not just top-level) | Missing translations show raw keys to users | Medium |
| Page rendering / build success | Astro pages could fail silently | Medium |

### Recommendations

1. **Import actual logic in tests** instead of re-implementing — test the real `getCorsOrigin` and email regex from `subscribe.ts`.
2. **Add a build test** to CI: `npm run build` is the best integration test for an Astro site.
3. **Add worker handler tests** using Cloudflare's `miniflare` or `vitest` with mocked D1.
4. **Add deep i18n key comparison** — the current test only checks top-level keys; nested key mismatches would pass silently.
5. **Set a coverage target** (aim for 60% on utility code as a start).

---

## 6. Security

**Status: Needs Work**

### Findings

#### Good practices in place
- **No hardcoded secrets** anywhere in the codebase. API keys are loaded from environment variables.
- **`.env.example`** has placeholder values only (`re_your_api_key_here`).
- **`.gitignore`** properly excludes `.env`, `.env.*`, and `.dev.vars`.
- **CORS origin allowlist** in `subscribe.ts` and worker configs — properly restricts to known origins.
- **Email validation** on the subscribe endpoint (both format check and required field).
- **Parameterized SQL queries** in both workers — no SQL injection vectors.
- **Security headers** in `public/_headers`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `X-XSS-Protection`.
- **`Permissions-Policy`** correctly restricts camera/geolocation but allows microphone for the voice chatbot.
- **Input validation** with `Math.min()` bounds on limit/months parameters in worker APIs.

#### Issues found

1. **Missing `Content-Security-Policy` header** — this is the most impactful missing security control. Without CSP, XSS attacks could inject arbitrary scripts. A starter policy should allow scripts from `'self'`, fonts from Google, and vAPI's SDK.

2. **`innerHTML` usage in `rent-calculator.astro` (lines 247, 250)** — sets innerHTML with template literals containing `fmt(totalSavings)`. The `fmt()` function formats a number (from user input fields), so this is **low-risk** but still a code smell. Consider using `textContent` + DOM manipulation instead.

3. **`innerHTML` usage in `EmailCapture.astro` (lines 58-59)** — saves and restores `btn.innerHTML`. Low risk since it's restoring its own original content, not user input.

4. **Client-side locale redirect** (`Layout.astro:72-77`) — reads `localStorage` and does `window.location.replace()`. This is safe but could cause a flash of English content before redirect on Spanish-preferred users.

5. **Runtime text swap script** (`Layout.astro:109-126`) — iterates all `[data-es]` elements and replaces content with the `data-es` attribute value. Also prefixes all internal links with `/es`. This is the i18n mechanism — it works but means English text is briefly visible in the HTML before JavaScript runs (SEO and accessibility concern for Spanish pages).

6. **Worker CORS origin is a single `env.CORS_ORIGIN` string** — doesn't support multiple origins (e.g., `www.` + bare domain + localhost for dev). The subscribe function handles this better with an array.

7. **SECURITY.md mentions "EmailOctopus"** but the codebase uses Resend — potential confusion for security reporters.

### Recommendations

1. **Add a `Content-Security-Policy` header** to `public/_headers`. Start with a report-only policy:
   ```
   Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.vapi.ai; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.vapi.ai https://api.resend.com;
   ```
2. **Replace `innerHTML` with `textContent`** + `<strong>` element creation in rent calculator.
3. **Align worker CORS to use an array** like the subscribe function does.
4. **Fix SECURITY.md** — replace "EmailOctopus" with "Resend".

---

## 7. CI/CD & DevOps

**Status: Critical**

### Findings

- **No CI/CD pipeline exists.** There are no GitHub Actions workflows, no `.github/workflows/` directory. This is the single biggest DevOps gap.
- **No pre-commit hooks** — no husky, lint-staged, or similar. Formatting/linting relies entirely on developer discipline.
- **ESLint is broken** — `npm run lint` fails due to ESLint 10 / plugin incompatibility (see Dependencies section).
- **Prettier is configured** and has a `.prettierignore`. Format check is available via `npm run format:check`.
- **Wrangler config** (`wrangler.jsonc`) is minimal and correct for Cloudflare Pages static deployment.
- **Worker wrangler configs** have empty `database_id` fields (expected — filled after `wrangler d1 create`).
- **No deployment automation** — relies on Cloudflare Pages' Git integration (auto-deploy on push to main). This is fine for the main site but workers require manual `wrangler deploy`.
- **No staging environment** is mentioned.

### Recommendations

1. **Create `.github/workflows/ci.yml`** with:
   ```yaml
   on: [push, pull_request]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: 20 }
         - run: npm ci
         - run: npm run format:check
         - run: npm run lint
         - run: npm run build
         - run: npm run test
   ```
2. **Fix ESLint** first (prerequisite for CI).
3. **Add `lint-staged` + `husky`** for pre-commit formatting/linting.
4. **Consider a staging deploy** — Cloudflare Pages supports preview deployments on PRs automatically.
5. **Add worker deployment scripts** or document the manual `wrangler deploy` process for each worker.

---

## 8. Performance

**Status: Good**

### Findings

- **Astro's static-first architecture** is inherently performant — HTML is pre-rendered at build time.
- **`output: 'static'`** in `astro.config.mjs` — no server-side rendering overhead.
- **`scrollama` is dynamically imported** (`await import('scrollama')`) in all scrollytelling components — good code-splitting.
- **Google Fonts loaded with `preconnect`** — good practice.
- **Font loading: `display=swap`** — prevents invisible text during load.
- **Data files are TypeScript modules** (`src/data/*.ts`) — they're tree-shaken and bundled only where imported.
- **Static data approach** (eviction-stats, campaign-finance-stats, sidewalk-stats) is fine for infrequently-updated data, but means a rebuild is needed to update numbers.
- **`html-to-image` dependency** (for shareable stat cards) — this is a relatively heavy library (~50KB). Verify it's lazy-loaded.
- **OG images** are static PNGs in `public/og/` — good, no runtime generation.

### Potential concerns

1. **Large inline data**: `campaign-finance-stats.ts` is ~328 lines of static data. If this grows significantly (e.g., full contribution records), it should be fetched from the worker API instead of bundled.
2. **No image optimization** — `astro-icon` handles SVG icons, but the project doesn't use `@astrojs/image` for raster image optimization. Currently there are only OG images in `public/`, so this is minimal impact.
3. **`recharts` is a large dependency** (~300KB gzipped) — appropriate for the data visualization use case but worth noting that it's client-side JavaScript.

### Recommendations

1. **Lazy-load `html-to-image`** if not already done — use dynamic import like scrollama.
2. **Monitor `campaign-finance-stats.ts` size** — if it exceeds ~500 lines, consider splitting or fetching from the worker API.
3. **Add `@astrojs/image`** if/when raster images are added to pages.

---

## 9. Developer Experience

**Status: Good**

### Findings

#### Onboarding
- **Clone → install → dev** is straightforward: `npm install && npm run dev`. Documented in README and CONTRIBUTING.
- **`.env.example`** makes environment setup clear with only 1 variable needed for local dev.
- **Dev server at `localhost:4321`** (Astro default) — documented.
- **QUICKSTART.md** is unusually thorough for deployment and infrastructure setup.

#### Development workflow
- `npm run dev` — standard Astro dev server with HMR
- `npm run build` — static build
- `npm run lint` — **broken** (ESLint version issue)
- `npm run format` / `format:check` — working (Prettier)
- `npm run test` / `test:watch` — configured but requires `npm install` first

#### Friction points

1. **Broken linting** — `npm run lint` fails immediately. This is the #1 DX issue. A new contributor would encounter this on their first attempt to follow the CONTRIBUTING guide.
2. **No `node_modules` committed** (correct) but also **no `.nvmrc` or `engines` field** — no guarantee contributors use a compatible Node version.
3. **Workers are separate deployable units** with no monorepo tooling — developers need to `cd workers/eviction-scraper && wrangler deploy` manually. No top-level script wraps this.
4. **The `data-es` attribute pattern** for i18n is non-standard — new contributors won't understand why Spanish pages have the same English text in the HTML with `data-es` attributes. Needs documentation or replacement.
5. **`package.json` version is `0.1.0`** with no release process documented.

#### Good DX patterns
- Path aliases configured (though underused)
- Vitest in watch mode available (`npm run test:watch`)
- Prettier + ESLint (when working) configured with sensible defaults
- TypeScript strict mode via `astro/tsconfigs/strict`

### Recommendations

1. **Fix `npm run lint` immediately** — this blocks the contributing workflow.
2. **Add `.nvmrc`** with `20` (or `18`) to lock Node version.
3. **Add `engines` field** to `package.json`: `"engines": { "node": ">=18" }`.
4. **Add top-level scripts** for worker deployment: `"deploy:evictions": "cd workers/eviction-scraper && wrangler deploy"`.
5. **Document the `data-es` i18n pattern** in CONTRIBUTING.md or an ADR — or better yet, replace it with a proper i18n component pattern.

---

## Summary Table

| Area | Status | Key Issue |
|------|--------|-----------|
| Code Quality | Needs Work | Massive en/es page duplication; 3x scrollytelling duplication |
| Project Structure | Good | Clean and logical; shared utils misplaced |
| Documentation | Good | Excellent README/QUICKSTART; minor inconsistencies |
| Dependencies | Needs Work | ESLint broken; React/nanostores behind latest |
| Testing | Needs Work | Only 3 test files; no integration tests; tests re-implement logic |
| Security | Needs Work | No CSP header; minor innerHTML usage; good fundamentals |
| CI/CD & DevOps | Critical | No CI pipeline at all; no pre-commit hooks |
| Performance | Good | Strong static-first architecture; lazy loading in place |
| Developer Experience | Good | Clean onboarding; broken lint is the main friction |

---

## Appendix: File Counts

| Directory | Files | Notes |
|-----------|-------|-------|
| `src/pages/` | 38 | 19 en + 19 es (near-identical pairs) |
| `src/components/` | 20 | Mix of Astro + React |
| `src/content/policies/` | 49 | English policy Markdown |
| `src/content/policies-es/` | 48 | Spanish policy Markdown |
| `src/data/` | 3 | Static TypeScript data modules |
| `src/i18n/` | 3 | en.json, es.json, utils.ts |
| `functions/` | 1 | Newsletter subscribe endpoint |
| `workers/` | 2 services | Eviction scraper + campaign finance |
| `tests/` | 3 | i18n, content, subscribe |
| `scripts/` | 1 | Questionnaire sender |
| `vapi/` | 1 | Voice assistant config |
| `collateral/` | 19 | Organizational/outreach docs |
| Top-level docs | 10 | README, QUICKSTART, CONTRIBUTING, etc. |
