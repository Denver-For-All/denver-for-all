# Denver For All - Quickstart Guide

## Prerequisites

- Node.js 18+ (recommended: install via `nvm`)
- Cloudflare account (free tier is fine to start)
- Git

## 1. Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The site runs at `http://localhost:4321` in dev mode.

## 2. Buy Domain

1. Go to [Cloudflare Registrar](https://dash.cloudflare.com/domains)
2. Search for `denverforall.org`
3. Purchase (should be ~$10-12/year at-cost pricing)
4. Domain is automatically added to your Cloudflare account

## 3. Deploy to Cloudflare Pages

### Option A: Git integration (recommended)

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click "Create a project" > "Connect to Git"
3. Select this repository
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click "Save and Deploy"
6. After first deploy, go to "Custom domains" and add `denverforall.org`

### Option B: Direct upload

```bash
npm run build
npx wrangler pages deploy dist --project-name=denver-for-all
```

## 4. Set Up Email

Cloudflare Email Routing (free):

1. In Cloudflare dashboard, go to your domain > Email > Email Routing
2. Enable Email Routing
3. Add routing rules:
   - `info@denverforall.org` -> your personal email
   - `legal@denverforall.org` -> your personal email
   - `press@denverforall.org` -> your personal email
4. Verify your destination email address

For sending (not just receiving), set up a free Mailgun or SendGrid account.

## 5. Email Capture (Newsletter)

### EmailOctopus (recommended, free up to 2,500 subscribers)

1. Create account at [emailoctopus.com](https://emailoctopus.com)
2. Create a list called "Denver For All - Movement"
3. Get your form action URL from Lists > [your list] > Forms > Embedded form
4. Update `src/components/EmailCapture.astro`:
   - Replace `action="#"` with your EmailOctopus form URL
   - Update the `name` attributes to match their field names

### Alternative: Mailchimp (free up to 500 subscribers)

Same process, different URLs. EmailOctopus has a more generous free tier.

## 6. Google Forms (Volunteer + Candidate Applications)

### Volunteer Signup Form

Create a Google Form with these fields:
- Name
- Email
- Phone (optional)
- Neighborhood
- How would you like to help? (checkboxes):
  - Door-to-door canvassing
  - Phone banking
  - Social media / content creation
  - Data analysis / tech
  - Legal support
  - Translation (English/Spanish)
  - Event organizing
  - Other
- Anything else we should know? (paragraph)

### Run For Denver - Candidate Application

Create a Google Form with these fields:
- Name
- Email
- Phone
- Age range
- Current occupation
- Connection to Denver (how long, which neighborhood)
- Why do you want to run?
- Which office are you considering? (City Council / Mayor / Other)
- Have you been involved in organizing or activism?
- Are you willing to reject corporate PAC money?
- Anything else?

After creating forms, replace the `PLACEHOLDER` URLs in:
- `src/pages/take-action.astro` (volunteer form)
- `src/pages/run-for-denver.astro` (candidate form)

## 7. vAPI Setup (Tenant Rights Chatbot + Voice)

1. Create account at [vapi.ai](https://vapi.ai)
2. Get your **Public Key** from the dashboard
3. Create two assistants using the configs in `/vapi/assistant-config.json`:
   - One for English
   - One for Spanish
4. Note the **Assistant IDs** for both
5. Install the web SDK: `npm install @vapi-ai/web`
6. Update `src/pages/tools/know-your-rights.astro`:
   - Uncomment the script block at the bottom
   - Replace `YOUR_PUBLIC_KEY` with your vAPI public key
   - Replace `ENGLISH_ASSISTANT_ID` and `SPANISH_ASSISTANT_ID`
7. For phone access: purchase phone numbers in vAPI dashboard and link to assistants

Estimated cost: $0.10-0.25 per minute of voice calls.

## 8. Cloudflare Workers (Data Tools)

### Eviction Tracker

```bash
cd workers/eviction-scraper

# Create D1 database
npx wrangler d1 create eviction-tracker

# Copy the database ID from the output and update wrangler.toml

# Run schema
npx wrangler d1 execute eviction-tracker --file=./schema.sql

# Deploy worker
npx wrangler deploy
```

### Campaign Finance Tracker

```bash
cd workers/campaign-finance

# Create D1 database
npx wrangler d1 create campaign-finance

# Copy the database ID from the output and update wrangler.toml

# Run schema
npx wrangler d1 execute campaign-finance --file=./schema.sql

# Deploy worker
npx wrangler deploy
```

After deploying, update the API URLs in the tool pages to point to your worker URLs.

## 9. Spanish Translations

Policy documents need Spanish versions. Recommended workflow:

1. Export all `.md` files from `src/content/policies/`
2. Feed to Claude or Gemini with prompt:

```
Translate the following policy document to Spanish.
Maintain the same markdown formatting, headings, and structure.
Use conversational but professional Latin American Spanish
appropriate for a Denver audience.
Keep proper nouns, organization names, and legal citations in English.
Translate data table content but keep numbers and currency unchanged.
```

3. For each translated file, create a companion with `.es.md` extension
   or add the Spanish content to the existing file's frontmatter
4. The i18n toggle system will handle switching between languages

## 10. Signal Group

1. Create a Signal group: "Denver For All - Organizing"
2. Generate an invite link in Signal group settings
3. Update the Signal group link in `src/pages/take-action.astro`
   (replace the `#` href in the Signal group card)

## 11. Analytics (Optional)

### Plausible Analytics (privacy-focused, $9/month or self-host free)

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Add the script tag to `src/layouts/Layout.astro` in the `<head>`:

```html
<script defer data-domain="denverforall.org" src="https://plausible.io/js/script.js"></script>
```

### Cloudflare Web Analytics (free, built-in)

Already available in your Cloudflare dashboard if using Cloudflare Pages.

## Cost Summary

| Item | Monthly | Annual |
|------|---------|--------|
| Domain (denverforall.org) | - | $10-12 |
| Cloudflare Pages hosting | $0 | $0 |
| Cloudflare Workers (free tier) | $0 | $0 |
| Email routing | $0 | $0 |
| EmailOctopus (up to 2,500 subs) | $0 | $0 |
| Google Forms | $0 | $0 |
| vAPI (estimate, 100 calls/month) | $25-60 | $300-720 |
| Plausible Analytics (optional) | $9 | $108 |
| **Total** | **$25-70** | **$310-840** |

## File Structure Reference

```
src/
  components/        # Reusable UI components
  content/
    policies/        # Policy documents (markdown)
    config.ts        # Content collection schema
  i18n/              # Translation strings (en.json, es.json)
  layouts/           # Page layouts
  pages/             # Routes
    platform/        # Policy platform pages
    tools/           # Interactive tool pages
  styles/            # Global CSS
workers/
  eviction-scraper/  # Cloudflare Worker for court data
  campaign-finance/  # Cloudflare Worker for finance data
vapi/                # Voice assistant configuration
public/              # Static assets
```

## Ongoing Content Workflow

1. Write or update policy in `src/content/policies/[slug].md`
2. Policy automatically appears on platform index and gets its own page
3. Push to git - Cloudflare Pages auto-deploys
4. Share the direct URL on Reddit: `denverforall.org/platform/[slug]`
