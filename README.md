# Denver For All

A grassroots political platform and organizing toolkit for economic justice in Denver. Built with Astro, deployed on Cloudflare Pages.

## What This Is

Denver For All is an open-source campaign framework that combines:

- **49 data-driven policy proposals** across housing, labor, health, climate, public safety, education, and more
- **11 interactive tools** for holding power accountable — eviction tracker, campaign finance transparency, candidate questionnaires, data stories, rent calculator, tenant rights chatbot, and more
- **Organizing infrastructure** (volunteer signup, candidate recruitment, newsletter, Signal group, Resistbot petitions)
- **Bilingual support** (English/Spanish) with full policy translations using i18n directory structure

The platform is designed to be forked, adapted, and reused by movements in other cities.

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [React](https://react.dev/) - Interactive components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting (free tier)
- [Cloudflare Workers + D1](https://developers.cloudflare.com/workers/) - Serverless data tools
- [vAPI](https://vapi.ai/) - Voice AI for tenant rights chatbot
- [Resend](https://resend.com/) - Transactional email for newsletter signup
- [Recharts](https://recharts.org/) + [Scrollama](https://github.com/russellsamora/scrollama) - Data visualization and scrollytelling

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Requires Node.js 18+.

## Project Structure

```
src/
  components/        Reusable UI components (Astro + React)
  content/
    policies/        49 policy documents in English (Markdown)
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
  eviction-scraper/  Cloudflare Worker + D1 for court eviction data
  campaign-finance/  Cloudflare Worker + D1 for donation tracking
vapi/                Voice assistant configuration
tests/               Test files (Vitest)
collateral/          Campaign materials, outreach docs, fundraising
public/              Static assets
```

## Deployment

The site is designed for Cloudflare Pages with Git integration:

1. Connect your repository to Cloudflare Pages
2. Set framework preset to **Astro**, build command to `npm run build`, output directory to `dist`
3. Add your custom domain

For detailed setup instructions covering email routing, newsletter capture, Google Forms, vAPI chatbot, Cloudflare Workers, and Spanish translations, see [QUICKSTART.md](QUICKSTART.md).

## Interactive Tools

| Tool | Type | Description |
|------|------|-------------|
| **Eviction Tracker** | Data + Resources | Eviction data from Princeton Eviction Lab and Colorado Judicial Branch, plus tenant defense resources |
| **Eviction Crisis: By the Numbers** | Data Story | Scrollytelling visualization of the eviction surge, hardest-hit neighborhoods, and collapsing safety net |
| **Rent Control Calculator** | Interactive | Enter your rent and see savings under proposed rent stabilization, with shareable social graphics |
| **Follow the Money** | Data + Accountability | Council voting scorecard on progressive priorities with campaign contribution search links |
| **Know Your Rights** | AI-Powered | 24/7 tenant rights chatbot in English and Spanish via voice or chat |
| **Council Candidate Tracker** | 2027 Election | Same 10 questions sent to every City Council candidate — answers and silences published unedited |
| **Mayoral Tracker** | 2027 Election | 10 questions on executive power sent to every declared mayoral candidate |
| **Money in Denver Politics** | Data Story | Scrollytelling on outside spending, billionaire donors, real estate PACs, and the Fair Elections Fund |
| **Sidewalk Data Explorer** | Data Story | Scrollytelling on missing and deficient sidewalks, dangerous streets, and transit access gaps |
| **State Sponsor Tracker** | 2026 Session | Colorado General Assembly legislators sponsoring bills aligned with our platform |
| **Resistbot Campaigns** | Rapid Organizing | Pre-written letter templates to officials at every level of government, convertible to petitions |

Tools that require backend data (eviction tracker, campaign finance) use Cloudflare Workers with D1 databases. See `workers/` for schemas and deployment instructions.

## Forking for Your City

This platform is built to be adapted. To use it for a different city:

1. Fork the repository
2. Update policy content in `src/content/policies/` with your local data, laws, and proposals
3. Add translations in `src/content/policies-es/` (or your target language directory)
4. Update city-specific references in page templates
5. Replace Denver-specific data sources in Workers with your local equivalents
6. Update translations in `src/i18n/`

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get involved. Areas where help is needed:

- **Data sourcing** and citation verification for policy claims
- **Accessibility** improvements (WCAG compliance, screen reader testing)
- **New interactive tools** for civic engagement
- **Design** and UX improvements
- **Forking guides** for other cities adapting the platform

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## Governance

This project is governed by its maintainers with community input. See [GOVERNANCE.md](GOVERNANCE.md) for details on decision-making, roles, financial transparency, and succession planning.

## Security

To report a security vulnerability, see [SECURITY.md](SECURITY.md). Do not open a public issue for security reports.

## Annual Operating Cost

| Item | Cost |
|------|------|
| Domain | $10-12 |
| Cloudflare Pages hosting | Free |
| Cloudflare Workers (free tier) | Free |
| Email routing | Free |
| Resend (transactional email) | Free tier |
| vAPI tenant chatbot (est. 20 calls/month) | $60-150 |
| Claude API tokens (optional — policy research & analysis) | $0-4,800 |
| Resistbot amplification (optional — petition campaigns) | $0-4,800 |
| **Total (core)** | **$70-162/year** |
| **Total (with optional tools)** | **$70-9,762/year** |

## Support

Denver For All is funded entirely by grassroots donations. No corporate money. See exactly where every dollar goes on our [Open Collective](https://opencollective.com/denver-for-all).

## License

This project is licensed under the [MIT License](LICENSE). Policy content is public domain. Code and content are available for reuse by other movements and organizations.
