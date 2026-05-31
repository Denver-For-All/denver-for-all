# Citation Standard — Denver For All

All Denver For All publications (policy documents, grant proposals, data stories, and
research notes) cite sources in **APA 7th edition** style. Consistent, verifiable
citations are how we show the thread of research behind every position — and how we
stay credible when opponents look for a reason to dismiss us.

This document is the single source of truth for how we format references. When in
doubt, match the patterns below.

## Core rules

1. **Every factual claim, statistic, or quotation is backed by a citation.** Statistics
   must include the year of the data (see `CLAUDE.md` → Policy content rules).
2. **Each policy document ends with a `## References` section** containing an
   alphabetized, APA-formatted reference list.
3. **In-text citations are parenthetical**: `(Author, Year)` or
   `(Organization, Year)` — e.g., `(Diamond et al., 2019)`,
   `(U.S. Census Bureau, 2022)`. For three or more authors, use the first author
   plus `et al.` from the first mention.
4. **Don't fabricate.** If you cannot identify the author, year, title, or publisher of
   a source, do not invent them. Cite what is verifiable, or describe the work in
   brackets (APA permits `[Working paper]`, `[Data set]`, `[Dashboard]` descriptions).
5. **Statutes and bills** are cited by their official designation (see below) — these
   are legal references, not APA author-date works, and may appear inline without a
   reference-list entry, though significant ones should also be listed.

## Reference-list formats by source type

Entries are listed alphabetically by author/organization. Italics are rendered in
Markdown with underscores (`_..._`).

**Journal article**

```
Diamond, R., McQuade, T., & Qian, F. (2019). The effects of rent control expansion on
tenants, landlords, and inequality: Evidence from San Francisco. _American Economic
Review, 109_(9), 3365–3394. https://doi.org/10.1257/aer.20181289
```

**Government / agency report (organization as author)**

```
U.S. Census Bureau. (2022). _Selected housing characteristics_ [American Community
Survey 1-year estimates, Denver County, CO]. https://data.census.gov
```

**City / municipal source**

```
City of Vancouver. (2023). _Empty Homes Tax annual report_.
https://vancouver.ca/home-property-development/empty-homes-tax.aspx
```

**News article**

```
Author, A. (2026, January 22). Headline of the article in sentence case. _Colorado
Politics_. https://www.coloradopolitics.com/...
```

When no individual byline is available, lead with the publication and date:
`Colorado Politics. (2026, January 22). Headline. https://...`

**Book**

```
Rothstein, R. (2017). _The color of law: A forgotten history of how our government
segregated America_. Liveright Publishing.
```

**Dashboard / dataset**

```
Colorado Judicial Branch. (2025). _Eviction filings dashboard (SB24-064)_ [Data set].
https://www.coloradojudicial.gov
```

## Statutes, constitutional provisions, and bills

These follow legal-citation conventions, not APA author-date:

- **Colorado Revised Statutes:** `Colo. Rev. Stat. § 38-12-301 (1981)` — in running
  prose the project also uses the readable form `CRS § 38-12-301`.
- **Constitutional provisions:** `Colo. Const. art. X, § 20` (TABOR).
- **Bills:** cite by chamber, number, and General Assembly session, e.g.
  `H.B. 26-1036, 75th Gen. Assemb., 2nd Reg. Sess. (Colo. 2026)`. The readable form
  `HB26-1036` is acceptable in prose and in the `relatedLegislation` frontmatter.
  Always include current status and a `leg.colorado.gov` link in `relatedLegislation`.

## Practical checklist before publishing

- [ ] Every statistic names its data year.
- [ ] Every non-obvious claim has an in-text citation.
- [ ] A `## References` section exists and is alphabetized.
- [ ] Each reference follows the matching format above.
- [ ] Bill statuses in `relatedLegislation` are current (re-verify against
      `leg.colorado.gov` each legislative session).
- [ ] No invented authors, titles, dates, or URLs.
