# Denver For All — Codebase Audit Plan
*Generated: 2026-02-21*

This document tracks the findings from a full codebase/platform audit and the implementation plan for addressing them. Work through items in order; commit after each.

---

## Policy Gaps

Six new policy documents to write, following the existing Markdown + Zod frontmatter format. Each needs: problem statement, proposed solution, evidence, local context, FAQs, funding sources, keyStats, and a matching Spanish stub in `policies-es/`.

| # | Slug | Category | Priority | Status |
|---|------|----------|----------|--------|
| P1 | `zoning-reform` | housing | High | [ ] |
| P2 | `short-term-rental-regulation` | housing | High | [ ] |
| P3 | `mental-health-crisis-response` | safety | High | [ ] |
| P4 | `ranked-choice-voting` | democracy | High | [ ] |
| P5 | `worker-cooperative-development` | economy | Medium | [ ] |
| P6 | `campaign-finance-reform` | democracy | Medium | [ ] |

### P1 — Zoning Reform & Land Use (`housing`)
Eliminate exclusionary single-family-only zoning, legalize ADUs citywide, remove minimum parking requirements near transit, and upzone major corridors. This is the foundational supply-side reform that makes every other housing policy more effective.

### P2 — Short-Term Rental Regulation (`housing`)
AirBnB/VRBO have removed thousands of Denver units from the long-term rental market. Restrict STRs to primary residences, cap investor-owned STR licenses, and create an enforcement fund from licensing fees.

### P3 — Mental Health Crisis Response (`safety`)
Fully fund and expand Denver's STAR (Support Team Assisted Response) program citywide. Route non-violent mental health 911 calls to civilian responders. End the practice of deploying armed officers to mental health crises.

### P4 — Ranked Choice Voting & Electoral Reform (`democracy`)
Implement ranked-choice voting for all city elections, end the runoff system, and create public campaign financing via small-dollar matching to amplify small donors over large ones.

### P5 — Worker Cooperative Development (`economy`)
Create a City co-op incubator, fund business-to-cooperative conversions (especially for retiring owners), and prioritize worker-owned businesses in city contracting.

### P6 — Campaign Finance Reform (`democracy`)
Concrete policy proposals: stricter LLC disclosure rules, lower contribution limits, small-dollar matching program for city elections. (Distinct from the money-in-politics tracking *tool* already in the platform.)

---

## UI/UX Improvements

| # | Item | Impact | Status |
|---|------|--------|--------|
| U1 | Policy search + category filter on `/platform` | High | [ ] |
| U2 | Dark mode (`prefers-color-scheme`) | High | [ ] |
| U3 | Custom `focus-visible` styles | Medium | [ ] |
| U4 | Print stylesheet for policy pages | Medium | [ ] |
| U5 | Policy status progress indicator on policy pages | Medium | [ ] |
| U6 | Dynamic `og:image` per policy (social sharing) | Low | [ ] |

### U1 — Policy Search + Category Filter
Add a filter bar to `/src/pages/platform/index.astro` so users can click a category chip to show only that category's policies, and type in a search box to filter by title/summary. All client-side, no backend needed.

### U2 — Dark Mode
Add `prefers-color-scheme: dark` media query to `src/styles/global.css` remapping the existing CSS custom properties. The variable system makes this straightforward.

### U3 — Custom `focus-visible` Styles
Add `:focus-visible` outline styles to `global.css` consistent with `--color-primary`. Improves keyboard nav UX and WCAG 2.1 AA compliance.

### U4 — Print Stylesheet
Add `@media print` block to `global.css` (or a dedicated `print.css`) that hides nav, footer, CTAs, and formats policy content cleanly for printing/PDF. Organizers need this.

### U5 — Policy Status Progress Indicator
Add a visual "Legislative Progress" component to policy detail pages showing the pipeline: Draft → Proposed → Committee → Vote → Passed. Driven by the existing `status` frontmatter field (extend with more granular `legislativeStatus` if needed).

### U6 — Dynamic OG Images
Generate per-policy Open Graph images so shares on Twitter/Facebook show the policy title and a key stat rather than a generic image. Can be done with Satori or a simple Cloudflare Worker approach.

---

## Implementation Order

1. [ ] P1 — Zoning Reform policy
2. [ ] P2 — Short-Term Rental Regulation policy
3. [ ] P3 — Mental Health Crisis Response policy
4. [ ] P4 — Ranked Choice Voting policy
5. [ ] P5 — Worker Cooperative Development policy
6. [ ] P6 — Campaign Finance Reform policy
7. [ ] U1 — Policy search + category filter
8. [ ] U2 — Dark mode
9. [ ] U3 — Focus-visible styles
10. [ ] U4 — Print stylesheet
11. [ ] U5 — Policy status progress indicator
12. [ ] U6 — Dynamic OG images
13. [ ] CI check: `npm run lint && npm run test && npm run build`
