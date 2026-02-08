# Contributing to Denver For All

Thank you for your interest in contributing to Denver For All. This project is a grassroots, open-source civic platform, and community contributions are essential to its mission.

## How to Contribute

### Reporting Issues

If you find a bug, factual error in policy content, broken link, or accessibility problem, please [open an issue](https://github.com/denver-for-all/denver-for-all/issues) with:

- A clear description of the problem
- Steps to reproduce (for bugs)
- The source or citation (for factual corrections)

### Suggesting Policy Updates

Policy documents live in `src/content/policies/`. If you want to suggest changes to policy content:

1. Open an issue describing the proposed change and supporting evidence
2. Include citations from reputable sources (government data, academic research, news reporting)
3. A maintainer will review and discuss before any changes are merged

All policy claims should be backed by verifiable data with year-stamped statistics.

### Code Contributions

1. Fork the repository
2. Create a feature branch from `main` (`git checkout -b feature/your-change`)
3. Make your changes
4. Run linting and tests:
   ```bash
   npm run lint
   npm run format:check
   npm run test
   ```
5. Commit with a clear message describing what and why
6. Open a pull request against `main`

### Areas Where Help Is Needed

- **Spanish translations** of full policy documents (currently only titles and summaries are translated)
- **Data sourcing** and citation verification
- **Accessibility** improvements (WCAG compliance, screen reader testing)
- **New interactive tools** for civic engagement
- **Design and UX** improvements
- **Forking guides** for other cities adapting the platform

### Translation Contributions

Translation files are in `src/i18n/`. UI strings are in `en.json` and `es.json`. Policy content translations should be added as frontmatter fields (`titleEs`, `summaryEs`) and eventually as full translated documents.

If you are a native Spanish speaker or professional translator and want to help translate full policy content, please open an issue or reach out to a maintainer.

## Development Setup

```bash
# Clone the repo
git clone https://github.com/denver-for-all/denver-for-all.git
cd denver-for-all

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

The dev server runs at `http://localhost:4321`. See [QUICKSTART.md](QUICKSTART.md) for full deployment and infrastructure setup.

## Code Standards

- TypeScript for all new code
- Follow existing patterns in the codebase
- Run `npm run format` before committing (Prettier)
- Run `npm run lint` to check for issues (ESLint)
- Add tests for new functionality where applicable

## Pull Request Guidelines

- Keep PRs focused on a single change
- Describe what the PR does and why
- Link to any related issues
- Ensure linting and tests pass
- Policy content changes require citations

## Content Guidelines

- All statistics must include the year of the data
- Claims must be backed by citations (linked in a References section)
- Policy documents should include: problem statement, proposed solution, evidence, local context, FAQs, and funding sources
- Language should be accessible to a general audience, not academic jargon

## Code of Conduct

All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inclusive experience for everyone.

## Questions?

Open an issue or join our Signal group (link on the website). Maintainers aim to respond to issues and PRs within a few days.
