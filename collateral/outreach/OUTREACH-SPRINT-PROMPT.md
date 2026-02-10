# Denver For All: Outreach Sprint Prompt

Run this prompt with Claude to generate actionable outreach assets in a single session. The prompt is designed to be run against the full repository so Claude has access to all 49 policies, 11 existing Resistbot campaigns, the outreach playbook, and communications review.

---

## The Prompt

Copy everything below this line and run it as a prompt with Claude (with access to this repository):

---

You are an outreach strategist for Denver For All, a grassroots political platform with 49 data-driven policy proposals for Denver. Your job is to produce five deliverables in this session. Before writing anything, read the following files to ground yourself in the project's voice, standards, and current state:

**Required reading (read all before producing any output):**
1. `OUTREACH-PLAYBOOK.md` — Channel strategies, rules of engagement, sample content, tone guidelines
2. `REDDIT-COMMENTS.md` — Comment voice and data-citation standards
3. `COMMUNICATIONS-REVIEW.md` — Current gaps and priorities
4. `collateral/outreach/news-comment-strategy-assessment.md` — Rules for when and how to engage on news stories
5. `src/pages/tools/resistbot.astro` — Existing Resistbot campaign format and content
6. All 49 policy files in `src/content/policies/` — The data and evidence you'll draw from

**Voice and standards (non-negotiable):**
- Write like a frustrated neighbor who did the research, not an organization pushing an agenda
- Every public-facing comment must include at least ONE specific statistic with year, ONE proof city or international comparison, and ONE Denver-specific data point
- No campaign-speak. No vague aspirational language ("We should push for..."). Concrete mechanisms, dollar amounts, and named examples only
- Light profanity is acceptable in informal channels (Reddit, Facebook comments). Keep op-eds clean
- Lead with the problem and data, not the organization. Denver For All is the "if you want more" — never the headline
- When pivoting from a news story to a policy position, the connection must be direct and obvious. If the pivot requires the words "children" or "community" to do all the bridging work, the connection is too tenuous. Only comment on stories where you have subject-matter standing (housing, wages, healthcare, infrastructure, public safety, immigration, education — in Denver)

---

## Deliverable 1: Facebook Group Recommendations

Research and recommend specific Facebook groups to join for Denver For All outreach. For each group, provide:

**Format for each recommendation:**

```
### [Group Name]
- **Estimated size:** [if discoverable]
- **Tier:** 1 (high-activity, issue-aligned) / 2 (neighborhood-specific) / 3 (professional/identity-based)
- **Primary policy alignment:** Which Denver For All policies are most relevant to this group's discussions
- **Entry strategy:** What kind of first comments to make (based on what this group likely discusses)
- **Tool to share:** Which Denver For All interactive tool would add the most value here (eviction tracker, rent calculator, sidewalk explorer, know your rights chatbot, etc.)
- **Lurk period notes:** What to watch for during the 1-2 week observation period
```

**Categories to cover:**
1. **General Denver community groups** (large, high-activity forums where cost-of-living, city services, and local politics are discussed)
2. **Renter and housing groups** (tenant issues, landlord complaints, housing search)
3. **Parent and family groups** (childcare costs, school quality, family affordability)
4. **Neighborhood-specific groups** for these priority areas:
   - High displacement: Globeville, Elyria-Swansea, RiNo, Sun Valley
   - High renter density: Capitol Hill, Baker, Barnum, Five Points
   - Underserved: Montbello, Green Valley Ranch, Far Northeast Denver
   - Bilingual communities: Westwood, Athmar Park, Southwest Denver
5. **Worker and professional groups** (service industry, teachers, gig workers, small business owners)
6. **Issue-specific groups** (transit/transportation, environment, public safety, disability advocacy)

For each category, recommend 2-4 specific groups. Use your knowledge of Denver's Facebook group landscape. Where you can't identify a specific group name, describe the type of group to search for with suggested search terms.

After the recommendations, provide a **prioritized join order** — which 5 groups to join first and why, based on the intersection of group activity, policy alignment, and where Denver For All's data adds the most unique value.

---

## Deliverable 2: Comment Spears

Create 12 pre-written "spears" — data-loaded comments ready to deploy when specific types of local news stories appear. Each spear should be a complete, ready-to-post comment that can be dropped (with minor customization) on a relevant Denver7, 9NEWS, CBS Colorado, Denver Post, or Denverite story.

**Format for each spear:**

```
### Spear [#]: [Name]
**Deploy when:** [Specific trigger — what kind of story or headline activates this spear]
**Policy connection:** [Which Denver For All policy/policies this connects to]
**Target outlets:** [Which local news outlets most commonly run this type of story]

**The comment:**
> [Ready-to-post comment text, 80-150 words, meeting all data standards]

**Customization notes:** [What to adjust based on the specific story — names, dates, specific numbers to update]
**Link to include (if engagement warrants):** [Specific denverforall.org URL]
**Related tool to mention:** [If applicable — eviction tracker, rent calculator, etc.]
```

**Required spear topics (create one for each):**

1. **Rent increase / housing cost story** — Deploy the rent stabilization data (85% increase since 2010, CRS 38-12-301, HB23-1115 killed by one vote, Vienna comparison)
2. **Eviction story** — Deploy eviction data (15,000+ filings in 2025, 72% above pre-pandemic, 90% of landlords have attorneys vs. 10% of tenants, link to eviction tracker)
3. **Homelessness / sweep story** — Deploy Housing First data ($40-60K/person/year emergency costs vs. $15-25K permanent housing, Finland 35% reduction, Houston 25,000+ housed)
4. **Wage / cost-of-living story** — Deploy living wage data (MIT calculator: $25-26/hr for family of four, $42-44/hr single parent, $7/hr gap, Denmark comparison)
5. **Medical debt / hospital billing story** — Deploy medical debt forgiveness data ($5M can forgive $100-500M, Toledo $240M for $1.6M, Denver Health sends patients to collections)
6. **Mental health / police response story** — Deploy STAR program data (Urban Institute: 16% arrest reduction, $237 per van vs. $1,011 per arrest, 23,000+ calls, only 45% of eligible calls covered)
7. **Broadband / internet complaint story** — Deploy municipal broadband data (85% voter approval 2018, Longmont $50/month gigabit, Fort Collins despite $150M Comcast opposition, 7 years of inaction)
8. **Childcare / education cost story** — Deploy universal childcare data (read `src/content/policies/universal-childcare.md` for specific data points, CCCAP coverage gaps, Colorado Pre-K 15hr/week limitation)
9. **Immigration enforcement story** — Deploy sanctuary and immigrant protection data (read immigration policy files, SB26-005, 30%+ Latino population, Flock/ICE 1,400 searches)
10. **Surveillance / policing story** — Deploy Flock camera and oversight data (12-0 council vote bypassed, $498,509 contract structured under threshold, 1,400+ ICE searches, SB26-071)
11. **Development / gentrification story** — Deploy anti-displacement and social housing data ($400-600K per subsidized unit, 15-30 year expiration, Vienna permanent model, corporate landlord consolidation)
12. **Infrastructure / sidewalk / transit story** — Deploy pedestrian and transit data (read `src/content/policies/pedestrian-infrastructure.md` and `src/content/policies/transportation.md`, 43% of sidewalks missing/deficient, link to sidewalk data explorer)

For each spear, read the corresponding policy file(s) in `src/content/policies/` to pull the strongest, most current data points. Do not use data that isn't in the policy files — these have been vetted and sourced.

---

## Deliverable 3: Highest-Impact Op-Ed

Analyze the current news cycle, Denver's political calendar, and the existing op-ed samples in `OUTREACH-PLAYBOOK.md` (broadband, medical debt, STAR program). Then:

1. **Recommend which op-ed to write first** and why — considering:
   - Current news hooks (what Denver stories are breaking right now that create an opening?)
   - 2026 Colorado legislative session (which bills from `CO-BILLS-2026-ALIGNMENT.md` are currently in committee and need public pressure?)
   - 2027 election cycle proximity (which issues will define mayoral and council races?)
   - Which policies have the strongest data and would be most credible to an editorial board?
   - Which topics are NOT already being covered by other Denver advocacy orgs?

2. **Write the full op-ed** (750-800 words) ready for submission to a specific outlet:
   - Name the target outlet and explain why
   - Follow the playbook formula: Hook + Data + Denver-specific + Call to Action
   - Include 4-6 specific statistics with sources
   - Include at least 2 proof-city comparisons
   - End with a concrete ask (not "we need to do better" but "Council should introduce an ordinance to...")
   - Include a 1-sentence author bio line

3. **Write a pitch email** (3-4 sentences) to the outlet's opinion editor explaining why this piece is timely and relevant to their readers.

---

## Deliverable 4: Highest-Impact One-Pager

Review the 6 planned one-pagers in `OUTREACH-PLAYBOOK.md` Section 6 (Social Housing, Rent Control, Living Wage, Municipal Broadband, Medical Debt, STAR Program). None have been created yet. Then:

1. **Recommend which one-pager to create first** and why — considering:
   - Which policy has the most shareable, jaw-dropping data points?
   - Which topic comes up most in the Facebook groups, Reddit threads, and news stories where Denver For All engages?
   - Which one-pager would be most useful to the community partner organizations listed in `collateral/outreach/` and in the playbook's Section 5?
   - Which has the clearest before/after proof-city comparison?

2. **Write the full one-pager content** following the spec in Section 6 of the playbook:

```
HEADLINE: [Problem in one sentence — large, bold, provocative]

THREE NUMBERS:
[Number 1] — [What it means in one line]
[Number 2] — [What it means in one line]
[Number 3] — [What it means in one line]

WHAT WE PROPOSE:
- [Bullet 1 — plain language, no jargon, specific mechanism]
- [Bullet 2]
- [Bullet 3]
- [Bullet 4 if needed]

WHAT OTHER CITIES DID:
[City 1]: [Result with specific number]
[City 2]: [Result with specific number]

WHO PAYS FOR IT:
[1-2 sentences on funding mechanism]

LEARN MORE: denverforall.org/platform/[policy-slug]

[Spanish translation of the complete one-pager below, or note that it should be translated]
```

3. **Provide design notes** for whoever produces the visual asset (color palette from the site, suggested layout, image/icon recommendations).

---

## Deliverable 5: Highest-Impact Resistbot Campaign

Review all 11 existing campaigns in `src/pages/tools/resistbot.astro`. Then review the full list of 49 policies and identify which missing campaign would have the highest organizing impact. Consider:

- **Which policies have active legislative hooks?** (A bill in the 2026 session, a city council vote coming up, a budget request pending)
- **Which policies have the most emotional resonance with the broadest audience?** (Medical debt, childcare costs, healthcare access affect nearly everyone)
- **Which campaigns would target officials who aren't already targeted by existing campaigns?** (Most existing campaigns target state legislators or the mayor. Are there gaps — city council, federal delegation, specific agencies?)
- **Which policies have the strongest data for a compelling letter?** (The letter needs to be persuasive in 150-300 words)

Then:

1. **Recommend which campaign to create** and why, with a brief analysis of the alternatives you considered.

2. **Write the complete campaign** in the exact format used in `resistbot.astro`:

```
CAMPAIGN TITLE (English): [Title]
CAMPAIGN TITLE (Spanish): [Title translated]
TARGET: [e.g., "state" (Governor + State Legislators), "mayor", "congress", etc.]
ICON: [Lucide icon name suggestion]
BADGE: [URGENT / 2026 SESSION / none]
RELATED POLICY: [denverforall.org policy page URL]

LETTER TEXT (English):
[Complete letter, 150-300 words, ready to paste into Resistbot. Include specific statistics, bill numbers if applicable, named proof cities, and a concrete ask.]

LETTER TEXT (Spanish):
[Complete Spanish translation of the letter]
```

3. **Write the HTML** for the campaign in the exact format used by existing campaigns in `resistbot.astro`, including all `data-en`/`data-es` bilingual attributes, so it can be dropped directly into the file.

---

## Output Order

Produce all 5 deliverables in order. For each deliverable, show your reasoning before the final output so I can evaluate your strategic thinking, not just the content.

After all 5 deliverables, provide a **"Next 3 Actions" summary** — the three highest-leverage things to do immediately after this session (beyond the assets produced here).
