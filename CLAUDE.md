# CLAUDE.md — Denver For All

## Project overview

Denver For All is a grassroots civic platform for economic justice in Denver. It combines 49 data-driven policy proposals, 11 interactive tools, organizing infrastructure, and bilingual (English/Spanish) support. Built with Astro, React, and TypeScript; deployed on Cloudflare Pages.

## Essential commands

```bash
npm install          # Install dependencies (Node 20, see .nvmrc)
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Production build (runs prebuild translation hydration first)
npm run test         # Run tests (Vitest)
npm run lint         # Lint with ESLint
npm run format:check # Check formatting (Prettier)
npm run format       # Auto-fix formatting
```

### CI pipeline (what must pass before merge)

The CI workflow (`.github/workflows/ci.yml`) runs on PRs to `main`:

1. `npm run format:check` — Prettier (non-blocking, generates report)
2. `npm run lint` — ESLint (must pass)
3. `npm run test` — Vitest (must pass)
4. `npm run build` — Astro build (must pass)
5. `node scripts/translate/check-coverage.js` — Translation coverage (must pass)

**Before submitting work, always run:** `npm run lint && npm run test && npm run build`

## Project structure

```
src/
  components/         Reusable UI components (Astro + React .tsx)
  content/
    policies/          49 English policy documents (Markdown with Zod schema)
    policies-es/       Spanish translations (empty frontmatter, slug must match English)
    grants/            Grant proposal documents
    config.ts          Astro content collection schemas
  i18n/                Translation strings (en.json, es.json)
  layouts/             Page layouts
  pages/
    platform/          Policy platform pages
    tools/             Interactive tool pages
  styles/              Global CSS
  data/                Static data files
functions/api/         Cloudflare Functions (newsletter endpoint)
workers/               Cloudflare Workers + D1 (eviction-scraper, campaign-finance)
scripts/translate/     Translation pipeline (extract, translate, hydrate, validate)
tests/                 Vitest test files
public/                Static assets
```

## Code conventions

- **Language:** TypeScript for all new code. JSX uses React (`jsxImportSource: react`).
- **Formatting:** Prettier — semi, singleQuote, trailingComma: all, printWidth: 100, tabWidth: 2.
- **Linting:** ESLint with `@typescript-eslint` and `eslint-plugin-astro`. `no-unused-vars` uses warn with `^_` pattern for ignored args.
- **Path aliases:** `@components/*`, `@layouts/*`, `@i18n/*`, `@styles/*` (see tsconfig.json).
- **Content schema:** Policy frontmatter is validated by Zod in `src/content/config.ts`. Categories: housing, labor, climate, health, safety, education, immigration, infrastructure, justice, democracy, economy, community.
- **i18n:** Default locale is `en`, supported locales: `en`, `es`. English routes are unprefixed; Spanish routes use `/es/` prefix.
- **Tests:** Vitest with `globals: true`, node environment. Test files go in `tests/**/*.test.ts`.

## Policy content rules

- All statistics must include the year of the data.
- Claims must be backed by citations in a References section.
- Policy documents should include: problem statement, proposed solution, evidence, local context, FAQs, and funding sources.
- Spanish translations in `policies-es/` must have empty `{}` frontmatter and the slug must match the English original.

## Environment variables

Only one env var for local dev: `RESEND_API_KEY` (for newsletter signup). Copy `.env.example` to `.env`. Never commit `.env` files.

## Claude Tasks integration

When working on multi-step tasks, use the task list to track progress. If the environment provides a `CLAUDE_CODE_TASK_LIST_ID`, use it for task coordination across sessions.

Key practices:
- Break complex work into discrete, trackable steps before starting.
- Mark each step in-progress before beginning, and completed immediately after finishing.
- If a step fails or is blocked, keep it in-progress and note the blocker.
- Run the full CI check (`npm run lint && npm run test && npm run build`) as a final step and track it explicitly.
