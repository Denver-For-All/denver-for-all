# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Denver For All, please report it responsibly. **Do not open a public issue.**

Email **security@denverforall.org** with:

- A description of the vulnerability
- Steps to reproduce
- The potential impact
- Any suggested fix (optional)

We will acknowledge your report within 48 hours and work to address the issue promptly.

## Scope

This policy covers:

- The Denver For All website and its source code
- Cloudflare Workers (eviction scraper, campaign finance)
- API endpoints (newsletter subscription, etc.)
- Configuration files that may expose sensitive data

## What We Consider In Scope

- Cross-site scripting (XSS)
- Injection vulnerabilities
- Authentication or authorization flaws
- Exposure of sensitive data (API keys, credentials)
- Server-side request forgery
- Misconfigurations that expose user data

## What Is Out of Scope

- Denial of service attacks
- Social engineering
- Issues in third-party services we use (Cloudflare, vAPI, Resend) — report those to the respective vendors
- Issues requiring physical access

## Sensitive Data

This project handles minimal user data:

- Newsletter email addresses (managed by Resend)
- No user accounts or passwords
- No payment processing (donations handled by Open Collective)

API keys and secrets are stored in environment variables and are never committed to the repository. See `.env.example` for the template.

## Disclosure

We follow coordinated disclosure. Once a fix is deployed, we will:

1. Credit the reporter (unless they prefer anonymity)
2. Describe the vulnerability and fix in a GitHub advisory if applicable
