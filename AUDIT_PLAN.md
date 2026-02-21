# Denver For All — Codebase Audit Plan
*Generated: 2026-02-21 | Updated: 2026-02-21*

This document tracks the findings from a full codebase/platform audit and the implementation plan for addressing them.

---

## Policy Gaps — Round 1 (Completed)

All six high/medium-priority policies from the initial audit have been written, reviewed, and merged via PR #72.

| # | Slug | Category | Priority | Status |
|---|------|----------|----------|--------|
| P1 | `zoning-reform` | housing | High | ✅ Done |
| P2 | `short-term-rental-regulation` | housing | High | ✅ Done |
| P3 | `mental-health-crisis-response` | safety | High | ✅ Done |
| P4 | `ranked-choice-voting` | democracy | High | ✅ Done |
| P5 | `worker-cooperative-development` | economy | Medium | ✅ Done |
| P6 | `campaign-finance-reform` | democracy | Medium | ✅ Done |

---

## UI/UX Improvements (Completed)

All high/medium-priority UX improvements merged via PR #72. U6 (Dynamic OG images) was deferred — low priority, requires Satori or a Worker approach, and the generic OG image is acceptable for now.

| # | Item | Impact | Status |
|---|------|--------|--------|
| U1 | Policy search + category filter on `/platform` | High | ✅ Done |
| U2 | Dark mode (`prefers-color-scheme`) | High | ✅ Done |
| U3 | Custom `focus-visible` styles | Medium | ✅ Done |
| U4 | Print stylesheet for policy pages | Medium | ✅ Done |
| U5 | Policy status progress indicator on policy pages | Medium | ✅ Done |
| U6 | Dynamic `og:image` per policy (social sharing) | Low | ⏸ Deferred |

---

## Policy Gaps — Round 2 (Lower-Priority, From Original Issue)

Five additional policies that were mentioned in the original issue but not included in the first audit plan. These were skipped in round 1 because the top-6 were higher priority. Adding them now.

| # | Slug | Category | Priority | Status |
|---|------|----------|----------|--------|
| P7 | `anti-surveillance-facial-recognition-ban` | justice | Medium | [ ] |
| P8 | `consumer-financial-protection` | economy | Medium | [ ] |
| P9 | `anti-harassment-tenant-protections` | housing | Lower | [ ] |
| P10 | `green-jobs-just-transition` | climate | Lower | [ ] |
| P11 | `foster-care-child-welfare` | community | Lower | [ ] |

### P7 — Anti-Surveillance / Facial Recognition Ban (`justice`)
Denver has no ordinance restricting biometric surveillance or predictive policing technology. Cities across the country have banned facial recognition. A concrete ban on city use of facial recognition, license plate reader networks for civil matters, and algorithmic risk-scoring tools in criminal justice would make Denver a leader in digital civil liberties.

### P8 — Consumer Financial Protection (`economy`)
Payday lenders, rent-to-own schemes, and predatory auto loans cluster in Denver's lower-income and minority neighborhoods. A City-level consumer protection ordinance — tighter caps on APR, requirements for plain-language disclosures, and a municipal credit union expansion program — is distinct from the public banking policy and fills a gap in the economy category.

### P9 — Anti-Harassment Protections for Tenants (`housing`)
Landlord harassment — utility shutoffs, lockouts, nuisance inspections, threats, and constructive eviction — is distinct from rent control and from the Tenant Bill of Rights. Denver lacks a standalone anti-harassment ordinance with meaningful civil penalties and a private right of action.

### P10 — Green Jobs / Just Transition (`climate`)
The climate section addresses environmental policy but lacks a specific job-creation and workforce-transition component. A Green Jobs program would fund job training for fossil-fuel workers transitioning to clean energy, create apprenticeship programs in solar/weatherization/transit, and set local-hire requirements for publicly funded climate projects.

### P11 — Foster Care & Child Welfare Reform (`community`)
No existing policy addresses children in the foster care system. Denver's child welfare system is chronically underfunded, with high caseloads, poor outcomes for youth aging out of care, and a lack of culturally responsive services. This policy would address kinship care support, transition-age youth housing, and caseload reduction.

---

## Implementation Order (Round 2)

1. [ ] P7 — Anti-Surveillance / Facial Recognition Ban
2. [ ] P8 — Consumer Financial Protection
3. [ ] P9 — Anti-Harassment Tenant Protections
4. [ ] P10 — Green Jobs / Just Transition
5. [ ] P11 — Foster Care & Child Welfare Reform
6. [ ] CI check: `npm run lint && npm run test && npm run build`
