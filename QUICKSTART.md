# Quickstart: Fork This for Your City

This platform was built to be reused. Whether you're a civic technologist who wants to spin up an instance or a grassroots organizer who needs a policy platform but isn't sure where to start — this guide is for you.

## Who This Is For

### Civic Technologists

You know your way around a terminal. You want a production-ready policy platform you can fork, rebrand, and deploy for your own city's movement. The entire stack runs on free-tier infrastructure (Cloudflare Pages + Workers, Resend, Google Forms). You can have a working site deployed in under an hour.

**Start at:** [Technical Setup](#technical-setup)

### Grassroots Organizers

You're building a campaign or coalition and need a professional web presence with real policy substance — not just a landing page. You don't need to be technical to use this. The policy content is plain Markdown files you can edit like a Google Doc. For the initial deployment, find a friendly developer (check your local [Code for America brigade](https://brigade.codeforamerica.org/), civic tech meetup, or DSA tech committee) and point them at this guide.

**Start at:** [What You Get](#what-you-get) to understand the platform, then hand off [Technical Setup](#technical-setup) to your tech volunteer.

---

## What You Get

Out of the box, this platform gives you:

| Feature | What It Does |
|---------|-------------|
| **49 policy pages** | Data-driven proposals with citations, organized by category. Edit the Markdown files in `src/content/policies/` to replace with your city's policies. |
| **48 Spanish translations** | Full policy translations in `src/content/policies-es/`, following i18n directory conventions. |
| **Eviction tracker** | Dashboard of eviction filings by landlord and neighborhood. Requires a local court data source. |
| **Campaign finance tool** | Follow the money — see who's funding your city council. Requires local campaign finance data. |
| **Data stories** | Scrollytelling visualizations for eviction data, sidewalk conditions, and money in politics. |
| **Candidate & mayoral trackers** | Questionnaire responses from council and mayoral candidates, published unedited. |
| **Rent calculator** | Interactive tool showing savings under proposed rent stabilization. |
| **Tenant rights chatbot** | 24/7 AI-powered know-your-rights in English and Spanish (via vAPI). |
| **State sponsor tracker** | Colorado legislators sponsoring bills aligned with the platform. |
| **Resistbot campaigns** | Pre-written letters to elected officials, one tap to send. |
| **Volunteer signup** | Google Forms integration for recruiting organizers. |
| **Candidate recruitment** | Application pipeline for progressive candidates. |
| **Newsletter** | Email capture via Resend (free tier). |
| **Bilingual support** | English/Spanish toggle with i18n framework ready for more languages. |

**Total annual cost:** $70–300 for a basic deployment (domain + optional AI chatbot). Hosting, email routing, newsletter, and forms are all free tier.

---

## Adapting the Content

The most important part isn't the code — it's making the policy content yours. Here's what to change:

### Policies (the core of the platform)

All 49 policies live in `src/content/policies/` as Markdown files. Each one looks like:

```markdown
---
title: "Rent Stabilization"
category: "housing"
status: "proposed"
summary: "Cap annual rent increases at 3% plus inflation..."
---

## The Problem
[Your local data and framing here]

## The Policy
[What specifically you're proposing]

## The Evidence
[Citations, data, comparable cities]
```

You don't need to start from scratch. Use Denver's policies as a template and swap in:
- Your city's housing data, wage data, demographic stats
- Your local laws and ordinances as the baseline
- Comparable policy wins from similar cities
- Local news citations and academic sources

### City-specific references

Search the codebase for "Denver" and replace with your city name. Key files:
- `src/layouts/Layout.astro` — site title, meta tags
- `src/pages/index.astro` — homepage copy
- `src/i18n/en.json` and `src/i18n/es.json` — UI strings
- `astro.config.mjs` — site URL

### Data tools

The eviction tracker and campaign finance tools need local data sources. Every city's court system and campaign finance disclosures work differently. See the `workers/` directory for the schema — you'll need to find your local equivalents:
- **Evictions:** County court records, often available via PACER or your county clerk's website
- **Campaign finance:** Your city/state's ethics commission or secretary of state filings

---

## Technical Setup

### Prerequisites

- Node.js 18+ (install via [nvm](https://github.com/nvm-sh/nvm))
- A [Cloudflare](https://cloudflare.com) account (free)
- Git

### 1. Fork and run locally

```bash
# Fork this repo on GitHub, then:
git clone https://github.com/YOUR-ORG/your-city-for-all.git
cd your-city-for-all
npm install
npm run dev
```

Site runs at `http://localhost:4321`.

### 2. Deploy to Cloudflare Pages

**Option A: Git integration (recommended)**

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click "Create a project" > "Connect to Git"
3. Select your forked repository
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click "Save and Deploy"

**Option B: CLI deploy**

```bash
npm run build
npx wrangler pages deploy dist --project-name=your-city-for-all
```

### 3. Domain and email

1. Register your domain through [Cloudflare Registrar](https://dash.cloudflare.com/domains) (~$10-12/year at cost)
2. Add it as a custom domain in your Pages project
3. Set up [Email Routing](https://developers.cloudflare.com/email-routing/) (free) to forward `info@`, `press@`, `legal@` to your real inbox

### 4. Newsletter (Resend)

1. Create a free account at [resend.com](https://resend.com)
2. Get your API key from [resend.com/api-keys](https://resend.com/api-keys)
3. Add `RESEND_API_KEY` to your Cloudflare Pages environment variables (see `.env.example`)
4. The subscribe endpoint at `functions/api/subscribe.ts` handles signups automatically

### 5. Volunteer and candidate forms (Google Forms)

Create two Google Forms:

**Volunteer signup:** Name, email, neighborhood, skills (canvassing, phone banking, social media, data/tech, legal, translation, event organizing)

**Candidate application:** Name, email, occupation, connection to your city, why they want to run, which office, willingness to reject corporate PAC money

Update the form URLs in:
- `src/pages/take-action.astro`
- `src/pages/run-for-denver.astro` (rename this page for your city)

### 6. Tenant rights chatbot (vAPI — optional)

1. Create account at [vapi.ai](https://vapi.ai)
2. Create English and Spanish assistants using configs in `/vapi/assistant-config.json`
3. Update `src/pages/tools/know-your-rights.astro` with your public key and assistant IDs
4. Estimated cost: $0.10–0.25/minute of voice calls

### 7. Data workers (Cloudflare Workers + D1 — optional)

For the eviction tracker and campaign finance tools:

```bash
# Example: eviction tracker
cd workers/eviction-scraper
npx wrangler d1 create eviction-tracker
# Update wrangler.toml with the database ID from output
npx wrangler d1 execute eviction-tracker --file=./schema.sql
npx wrangler deploy
```

Same pattern for `workers/campaign-finance`. After deploying, update the API URLs in the corresponding tool pages.

### 8. Spanish translations

All 49 policy documents have been translated into Spanish. Translations live in a separate directory (`src/content/policies-es/`) following i18n best practices for SEO and content management.

To add or update translations:

1. Create a Markdown file in `src/content/policies-es/` with the same filename as the English original
2. Use Claude, GPT, or Gemini with this prompt:
   > Translate to Spanish. Maintain markdown formatting. Use conversational but professional Latin American Spanish. Keep proper nouns, org names, and legal citations in English. Keep numbers and currency unchanged.
3. The i18n toggle handles language switching automatically

UI strings are managed in `src/i18n/en.json` and `src/i18n/es.json`.

---

## File Structure

```
src/
  components/        Reusable UI components (Astro + React)
  content/
    policies/        49 policy documents in English (Markdown) ← start here
    policies-es/     48 policy documents in Spanish (Markdown)
    config.ts        Content collection schema
  i18n/              Translation strings (en.json, es.json)
  layouts/           Page layouts
  pages/
    platform/        Policy platform pages
    tools/           Interactive tool pages (11 tools)
  styles/            Global CSS
  data/              Static data files (eviction stats, campaign finance, etc.)
functions/
  api/               Cloudflare Functions (newsletter subscribe endpoint)
workers/
  eviction-scraper/  Cloudflare Worker + D1 for court data
  campaign-finance/  Cloudflare Worker + D1 for finance data
vapi/                Voice assistant configuration
tests/               Test files (Vitest)
public/              Static assets
```

## Cost Summary

| Item | Annual Cost |
|------|------------|
| Domain | $10–12 |
| Cloudflare Pages + Workers | Free |
| Email routing | Free |
| Resend (transactional email) | Free tier |
| Google Forms | Free |
| vAPI chatbot (est. 20 calls/month) | $60–150 |
| **Total (without chatbot)** | **~$12** |
| **Total (with chatbot)** | **$70–162** |

## Questions?

Open an issue on this repository or see [CONTRIBUTING.md](CONTRIBUTING.md) for how to get involved.
