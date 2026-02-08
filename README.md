# Denver For All

A grassroots political platform and organizing toolkit for economic justice in Denver. Built with Astro, deployed on Cloudflare Pages.

## What This Is

Denver For All is an open-source campaign framework that combines:

- **48 data-driven policy proposals** across housing, labor, health, climate, public safety, education, and more
- **Interactive tools** for holding power accountable (eviction tracker, campaign finance transparency, rent calculator, tenant rights chatbot)
- **Organizing infrastructure** (volunteer signup, candidate recruitment, newsletter, Signal group, Resistbot petitions)
- **Bilingual support** (English/Spanish)

The platform is designed to be forked, adapted, and reused by movements in other cities.

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [React](https://react.dev/) - Interactive components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting (free tier)
- [Cloudflare Workers + D1](https://developers.cloudflare.com/workers/) - Serverless data tools
- [vAPI](https://vapi.ai/) - Voice AI for tenant rights chatbot
- [EmailOctopus](https://emailoctopus.com/) - Newsletter (free tier)

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
  components/        Reusable UI components
  content/
    policies/        48 policy documents (Markdown)
    config.ts        Content collection schema
  i18n/              Translation strings (en.json, es.json)
  layouts/           Page layouts
  pages/
    platform/        Policy platform pages
    tools/           Interactive tool pages
  styles/            Global CSS
workers/
  eviction-scraper/  Cloudflare Worker + D1 for court eviction data
  campaign-finance/  Cloudflare Worker + D1 for donation tracking
vapi/                Voice assistant configuration
public/              Static assets
```

## Deployment

The site is designed for Cloudflare Pages with Git integration:

1. Connect your repository to Cloudflare Pages
2. Set framework preset to **Astro**, build command to `npm run build`, output directory to `dist`
3. Add your custom domain

For detailed setup instructions covering email routing, newsletter capture, Google Forms, vAPI chatbot, Cloudflare Workers, and Spanish translations, see [QUICKSTART.md](QUICKSTART.md).

## Interactive Tools

| Tool | Description |
|------|-------------|
| **Eviction Tracker** | Live dashboard of eviction filings by landlord and neighborhood |
| **Follow the Money** | Campaign finance transparency for Denver City Council |
| **Rent Calculator** | See savings under proposed rent stabilization |
| **Know Your Rights** | 24/7 tenant rights chatbot in English and Spanish |
| **Resistbot Campaigns** | Pre-written letters to elected officials |

Tools that require backend data (eviction tracker, campaign finance) use Cloudflare Workers with D1 databases. See `workers/` for schemas and deployment instructions.

## Forking for Your City

This platform is built to be adapted. To use it for a different city:

1. Fork the repository
2. Update policy content in `src/content/policies/` with your local data, laws, and proposals
3. Update city-specific references in page templates
4. Replace Denver-specific data sources in Workers with your local equivalents
5. Update translations in `src/i18n/`

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get involved. Areas where help is needed:

- **Spanish translations** of policy documents (currently English-only)
- **Data sourcing** and citation verification for policy claims
- **Accessibility** improvements
- **New interactive tools** for civic engagement
- **Design** and UX improvements

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
| EmailOctopus (up to 2,500 subscribers) | Free |
| Claude API tokens (policy research & analysis) | $1,200-4,800 |
| Resistbot amplification (petition campaigns) | $0-1,200 |
| vAPI tenant chatbot (est. 20 calls/month) | $60-150 |
| **Total** | **$1,270-6,162/year** |

## Support

Denver For All is funded entirely by grassroots donations. No corporate money. See exactly where every dollar goes on our [Open Collective](https://opencollective.com/denver-for-all).

## License

This project is licensed under the [MIT License](LICENSE). Policy content is public domain. Code and content are available for reuse by other movements and organizations.
