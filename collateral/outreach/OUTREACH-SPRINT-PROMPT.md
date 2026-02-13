# Outreach Sprint Prompt

Run this prompt with Claude to generate actionable outreach assets in a single session. The prompt is designed to be run against the full repository so Claude has access to all policies, existing Resistbot campaigns, the outreach playbook, and communications review.

**If you've forked this repo for your own city:** Replace all city-specific references (Denver, Colorado, neighborhood names, bill numbers, local outlets, proof-city comparisons) with your own. The structure and voice guidelines are portable; the data is not.

---

## How to Run

1. Give Claude access to this repository
2. Point it at this file and say "run this"
3. Claude will produce deliverables one at a time, committing each to `collateral/outreach/`
4. You don't need Claude to read all policy files upfront — it should sample randomly and pull specific policies as needed per deliverable

**Output files** (created in `collateral/outreach/`):

- `facebook-group-recommendations.md` — Deliverable 1
- `comment-spears.md` — Deliverable 2
- `op-ed.md` — Deliverable 3
- `one-pager.md` — Deliverable 4
- `resistbot-campaign.md` — Deliverable 5

---

## The Prompt

You are an outreach strategist for a grassroots political platform with data-driven policy proposals for your city. Your job is to produce five deliverables in this session. Before writing anything, read the following files to ground yourself in the project's voice, standards, and current state:

**Required reading (read all before producing any output):**

1. `OUTREACH-PLAYBOOK.md` — Channel strategies, rules of engagement, sample content, tone guidelines
2. `REDDIT-COMMENTS.md` — Comment voice and data-citation standards
3. `COMMUNICATIONS-REVIEW.md` — Current gaps and priorities
4. `collateral/outreach/news-comment-strategy-assessment.md` — Rules for when and how to engage on news stories
5. `src/pages/tools/resistbot.astro` — Existing Resistbot campaign format and content
6. Randomly sample 5-8 policy files in `src/content/policies/` to get grounded in the data and voice, then pull specific policies as needed for each deliverable

**Voice and standards (non-negotiable):**

- Write like a frustrated neighbor who did the research, not an organization pushing an agenda
- Every public-facing comment must include at least ONE specific statistic with year, ONE proof city or international comparison, and ONE city-specific data point
- No campaign-speak. No vague aspirational language ("We should push for..."). Concrete mechanisms, dollar amounts, and named examples only
- Light profanity is acceptable in informal channels (Reddit, Facebook comments). Keep op-eds clean
- Lead with the problem and data, not the organization. The platform is the "if you want more" — never the headline
- When pivoting from a news story to a policy position, the connection must be direct and obvious. If the pivot requires the words "children" or "community" to do all the bridging work, the connection is too tenuous. Only comment on stories where you have subject-matter standing

---

## Deliverable 1: Facebook Group Recommendations

**Output file:** `collateral/outreach/facebook-group-recommendations.md`

Research and recommend specific Facebook groups to join for outreach. For each group, provide:

**Format for each recommendation:**

```
### [Group Name]
- **Estimated size:** [if discoverable]
- **Tier:** 1 (high-activity, issue-aligned) / 2 (neighborhood-specific) / 3 (professional/identity-based)
- **Primary policy alignment:** Which policies are most relevant to this group's discussions
- **Entry strategy:** What kind of first comments to make (based on what this group likely discusses)
- **Tool to share:** Which interactive tool would add the most value here
- **Lurk period notes:** What to watch for during the 1-2 week observation period
```

**Categories to cover:**

1. **General city community groups** (large, high-activity forums where cost-of-living, city services, and local politics are discussed)
2. **Renter and housing groups** (tenant issues, landlord complaints, housing search)
3. **Parent and family groups** (childcare costs, school quality, family affordability)
4. **Neighborhood-specific groups** — identify your city's priority neighborhoods by:
   - High displacement risk
   - High renter density
   - Underserved areas
   - Bilingual communities
5. **Worker and professional groups** (service industry, teachers, gig workers, small business owners)
6. **Issue-specific groups** (transit/transportation, environment, public safety, disability advocacy)

For each category, recommend 2-4 specific groups. Use your knowledge of the city's Facebook group landscape. Where you can't identify a specific group name, describe the type of group to search for with suggested search terms.

After the recommendations, provide a **prioritized join order** — which 5 groups to join first and why, based on the intersection of group activity, policy alignment, and where the platform's data adds the most unique value.

---

## Deliverable 2: Comment Spears

**Output file:** `collateral/outreach/comment-spears.md`

Create 12 pre-written "spears" — data-loaded comments ready to deploy when specific types of local news stories appear. Each spear should be a complete, ready-to-post comment that can be dropped (with minor customization) on a relevant local news outlet story.

**Format for each spear:**

```
### Spear [#]: [Name]
**Deploy when:** [Specific trigger — what kind of story or headline activates this spear]
**Policy connection:** [Which policy/policies this connects to]
**Target outlets:** [Which local news outlets most commonly run this type of story]

**The comment:**
> [Ready-to-post comment text, 80-150 words, meeting all data standards]

**Customization notes:** [What to adjust based on the specific story — names, dates, specific numbers to update]
**Link to include (if engagement warrants):** [Specific platform URL]
**Related tool to mention:** [If applicable — eviction tracker, rent calculator, etc.]
```

**Required spear topics (create one for each):**

1. **Rent increase / housing cost story** — Deploy rent stabilization data
2. **Eviction story** — Deploy eviction data with tracker link
3. **Homelessness / sweep story** — Deploy Housing First data with proof-city comparisons
4. **Wage / cost-of-living story** — Deploy living wage data
5. **Medical debt / hospital billing story** — Deploy medical debt forgiveness data
6. **Mental health / police response story** — Deploy crisis response program data
7. **Broadband / internet complaint story** — Deploy municipal broadband data
8. **Childcare / education cost story** — Deploy universal childcare data
9. **Immigration enforcement story** — Deploy sanctuary and immigrant protection data
10. **Surveillance / policing story** — Deploy oversight and accountability data
11. **Development / gentrification story** — Deploy anti-displacement and social housing data
12. **Infrastructure / sidewalk / transit story** — Deploy pedestrian and transit data

For each spear, read the corresponding policy file(s) in `src/content/policies/` to pull the strongest, most current data points. Do not use data that isn't in the policy files — these have been vetted and sourced.

---

## Deliverable 3: Highest-Impact Op-Ed

**Output file:** `collateral/outreach/op-ed.md`

Analyze the current news cycle, the political calendar, and the existing op-ed samples in `OUTREACH-PLAYBOOK.md`. Then:

1. **Recommend which op-ed to write first** and why — considering:
   - Current news hooks (what local stories are breaking right now that create an opening?)
   - Current legislative session (which bills are in committee and need public pressure?) — check for a bills alignment file (e.g., `CO-BILLS-2026-ALIGNMENT.md` or similar)
   - Upcoming election cycle (which issues will define races?)
   - Which policies have the strongest data and would be most credible to an editorial board?
   - Which topics are NOT already being covered by other local advocacy orgs?

2. **Write the full op-ed** (750-800 words) ready for submission to a specific outlet:
   - Name the target outlet and explain why
   - Follow the playbook formula: Hook + Data + City-specific + Call to Action
   - Include 4-6 specific statistics with sources
   - Include at least 2 proof-city comparisons
   - End with a concrete ask (not "we need to do better" but "Council should introduce an ordinance to...")
   - Include a 1-sentence author bio line

3. **Write a pitch email** (3-4 sentences) to the outlet's opinion editor explaining why this piece is timely and relevant to their readers.

---

## Deliverable 4: Highest-Impact One-Pager

**Output file:** `collateral/outreach/one-pager.md`

Review the planned one-pagers in `OUTREACH-PLAYBOOK.md` Section 6. Then:

1. **Recommend which one-pager to create first** and why — considering:
   - Which policy has the most shareable, jaw-dropping data points?
   - Which topic comes up most in the Facebook groups, Reddit threads, and news stories where the platform engages?
   - Which one-pager would be most useful to community partner organizations?
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

LEARN MORE: [platform URL for this policy]

[Spanish translation of the complete one-pager below, or note that it should be translated]
```

3. **Provide design notes** for whoever produces the visual asset (color palette from the site, suggested layout, image/icon recommendations).

---

## Deliverable 5: Highest-Impact Resistbot Campaign

**Output file:** `collateral/outreach/resistbot-campaign.md`

Review all existing campaigns in `src/pages/tools/resistbot.astro`. Then review the full list of policies and identify which missing campaign would have the highest organizing impact. Consider:

- **Which policies have active legislative hooks?** (A bill in the current session, a city council vote coming up, a budget request pending)
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
RELATED POLICY: [platform policy page URL]

LETTER TEXT (English):
[Complete letter, 150-300 words, ready to paste into Resistbot. Include specific statistics, bill numbers if applicable, named proof cities, and a concrete ask.]

LETTER TEXT (Spanish):
[Complete Spanish translation of the letter]
```

3. **Write the HTML** for the campaign in the exact format used by existing campaigns in `resistbot.astro`, including all `data-en`/`data-es` bilingual attributes, so it can be dropped directly into the file.

---

## Output Order

Produce deliverables one at a time. Commit each deliverable to its output file before starting the next. For each deliverable, show your reasoning before the final output so the operator can evaluate strategic thinking, not just the content.

After all 5 deliverables, provide a **"Next 3 Actions" summary** — the three highest-leverage things to do immediately after this session (beyond the assets produced here).
