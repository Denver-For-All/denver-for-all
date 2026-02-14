# Multi-Language Localization Research: Top 5 Denver Languages

**Date:** 2026-02-14
**Status:** Research / Recommendation

## Executive Summary

Denver's top 5 non-English languages are **Spanish, Vietnamese, Chinese, Arabic, and Amharic** (with Russian close behind). The City of Denver's own Language Access program under Executive Order 150 already identifies these same languages as priority languages for city services.

We recommend expanding Denver For All from 2 locales (en/es) to 6 locales (en/es/vi/zh/ar/am), but this requires a significant **architecture refactoring first** — the current `data-en`/`data-es` attribute pattern (1,491 hardcoded pairs across 40 files) and `titleEs`/`summaryEs` field naming don't scale beyond 2 languages.

The actual translation work can be largely offloaded to **Claude Haiku 4.5** for the 4 higher-resource languages (Spanish, Vietnamese, Chinese, Arabic) with high confidence, but **Amharic requires more caution** — it's a low-resource language where LLMs show a 12-20% performance gap vs. English. A human review pipeline with the Ethiopian Community Center would be essential.

---

## 1. Denver's Top 5 Non-English Languages

### Denver County Speaker Estimates

| Rank | Language | Denver County Speakers | Colorado Statewide | Denver Gov Priority? | Script |
|------|----------|----------------------|-------------------|---------------------|--------|
| 1 | **Spanish** | ~130,000+ (20%+) | 597,078 (11.9%) | Yes | Latin |
| 2 | **Vietnamese** | ~5,700+ (1.0%) | 19,074 (0.4%) | Yes | Latin (Vietnamese) |
| 3 | **Chinese** (Simplified/Traditional) | ~3,000+ (0.5%) | 23,904 (0.5%) | Yes | CJK |
| 4 | **Arabic** | ~2,400+ (0.4%) | 9,990 (0.2%) | Yes | Arabic (RTL) |
| 5 | **Amharic** | ~3,700 city / 30-50K metro | 13,264 (0.3%)* | Yes | Ge'ez (Ethiopic) |
| 6 | **Russian** | ~3,100 (0.5%) | 16,000 (0.3%) | Yes | Cyrillic |

*Census groups Amharic with Somali and other Afro-Asiatic languages. Community estimates for Amharic speakers are significantly higher.

**Source:** ACS 2009-2013 (Denver County via Census C16001), ACS 2017-2021 (Colorado statewide via Statistical Atlas), Denver Gov Executive Order 150 Language Access Program.

### Denver Government's Language Access Priorities

The City & County of Denver already mandates language access under **Executive Order 150** in these languages: Spanish, Vietnamese, Amharic, Chinese (Simplified), Arabic, Russian, French, Burmese, Nepali, Persian, Somali, and Pashto. Our top 5 aligns with their priorities exactly.

### Why These 5 (Not 6, Not 3)?

- **Spanish** is non-negotiable at 20%+ of Denver's population
- **Vietnamese** has the largest LEP (Limited English Proficiency) population in Denver after Spanish — many Vietnamese speakers have difficulty accessing city services
- **Chinese** is the 3rd most spoken non-English language statewide and Denver has a growing Chinese-speaking population
- **Arabic** serves multiple communities (Iraqi, Somali-origin, Sudanese, Lebanese) and is the city's 4th priority language
- **Amharic** serves one of the largest Ethiopian diasporas in the US, concentrated in the East Colfax/Aurora corridor, and is extremely underserved by existing civic platforms
- **Russian** is close behind but is well-served by existing government resources and has higher average English proficiency

---

## 2. Language-by-Language Assessment

### Spanish (es) — Already Implemented
- **Population:** ~200,000+ in Denver (28-32% of city)
- **Status:** Fully localized with 50 translated policies, complete UI, all page templates
- **LLM translation quality:** Excellent (high-resource language)
- **No additional work needed** except architecture refactoring

### Vietnamese (vi)
- **Population:** ~5,700 in Denver; 19,074 statewide
- **Script:** Latin-based with extensive diacritics (Vietnamese alphabet)
- **LLM translation quality:** Good — Vietnamese is a medium-resource language with solid LLM coverage
- **Technical notes:** Uses Latin script so minimal font/layout issues. Diacritics require proper UTF-8 handling (already in place). Text length is comparable to English.
- **Community relevance:** Highest LEP rate after Spanish in Denver. Many Vietnamese speakers are older refugees with limited English.

### Chinese Simplified (zh)
- **Population:** ~3,000 in Denver; 23,904 statewide
- **Script:** CJK (Chinese characters)
- **LLM translation quality:** Excellent — Chinese is a high-resource language
- **Technical notes:** CJK characters need appropriate font stack (system fonts generally sufficient). Text is typically shorter than English. Line-breaking rules differ (can break between any characters). May want to consider Traditional Chinese for Taiwanese community, but Simplified is the more common need.
- **Community relevance:** Growing population, includes students, tech workers, and immigrant families.

### Arabic (ar)
- **Population:** ~2,400 in Denver; 9,990 statewide; 42,000+ Arab ancestry in CO
- **Script:** Arabic (RTL — right-to-left)
- **LLM translation quality:** Good — Arabic is a medium-to-high-resource language
- **Technical notes:** **RTL is the biggest technical challenge.** Requires `dir="rtl"` on HTML elements, mirrored CSS layouts, bidirectional text handling. This is a significant frontend effort but well-documented in web standards. Modern CSS (`logical properties`, flexbox/grid direction) handles most of this.
- **Community relevance:** Serves Iraqi, Somali-origin, Sudanese, Lebanese, and other Arab communities. Denver has seen significant Iraqi refugee resettlement.

### Amharic (am)
- **Population:** ~3,700 city / 30,000-50,000 metro; 13,264 statewide (Census group)
- **Script:** Ge'ez (Ethiopic) — a unique abugida writing system
- **LLM translation quality:** Lower — Amharic is a low-resource language. Research shows a 12-20% performance gap vs English on frontier LLMs (GPT-4o, Claude). See Section 4.
- **Technical notes:** LTR direction (no RTL needed). Requires Ge'ez web font (Noto Sans Ethiopic, ~50KB). Characters are wider and taller than Latin — may need line-height and container width adjustments. Formal register required for civic content.
- **Community relevance:** One of the largest Ethiopian diasporas in the US. Very few civic platforms exist in Amharic — high impact per dollar spent.

---

## 3. Architecture Refactoring Plan

### Current State: Doesn't Scale

The current i18n implementation is tightly coupled to exactly 2 languages:

| Problem | Scope | Example |
|---------|-------|---------|
| `data-en` / `data-es` HTML attributes | **1,491 pairs across 40 files** | `<h1 data-en="Hello" data-es="Hola">` |
| `titleEs`, `summaryEs` frontmatter fields | **413 occurrences across 56 files** | Can't add `titleVi`, `titleZh`, `titleAr`, `titleAm` to every field |
| Hardcoded `'en' \| 'es'` type | **12 files** | `Locale = 'en' \| 'es'` |
| Binary language toggle | **1 component** | Flips between en/es only |
| Inline ternary conditionals | **12 files** | `isEs ? 'Hola' : 'Hello'` |
| Client-side swap script | **1 file** | Only swaps `[data-es]` attributes |
| Separate `/pages/es/` directory | **19 page files** | Would need /vi/, /zh/, /ar/, /am/ copies too |

### Proposed Refactoring: Translation-Key Architecture

Replace the attribute-pair pattern with a **translation key lookup system**:

#### A. Replace `data-en`/`data-es` with `data-t` keys

**Before (current):**
```html
<h1 data-en="Denver Belongs to All of Us" data-es="Denver Nos Pertenece a Todos">
  Denver Belongs to All of Us
</h1>
```

**After (proposed):**
```html
<h1 data-t="hero.headline">Denver Belongs to All of Us</h1>
```

The client-side swap script loads the appropriate JSON and replaces text by key. English remains the default/fallback in the HTML.

#### B. Expand JSON translation files

```
src/i18n/
├── en.json    (existing — becomes the canonical key source)
├── es.json    (existing — already mirrors en.json structure)
├── vi.json    (new)
├── zh.json    (new)
├── ar.json    (new)
└── am.json    (new)
```

#### C. Refactor content schema

**Before:**
```typescript
title: z.string(),
titleEs: z.string(),
summary: z.string(),
summaryEs: z.string(),
```

**After (Option — separate translation collections, extending existing pattern):**
```
content/
├── policies/        (English — canonical, keeps all metadata)
├── policies-es/     (Spanish body translations — already exists)
├── policies-vi/     (Vietnamese body translations)
├── policies-zh/     (Chinese body translations)
├── policies-ar/     (Arabic body translations)
└── policies-am/     (Amharic body translations)
```

For frontmatter strings (titles, summaries, stat labels), move to a single `translations` field:
```typescript
translations: z.record(z.string(), z.object({
  title: z.string(),
  summary: z.string(),
})).optional(),
```

Or keep frontmatter translations in the per-locale JSON files (simpler):
```json
// es.json
{
  "policies": {
    "housing-first": {
      "title": "Vivienda Primero...",
      "summary": "..."
    }
  }
}
```

#### D. Generalize Layout.astro swap script

**Before:**
```javascript
var els = document.querySelectorAll('[data-es]');
for (var i = 0; i < els.length; i++) {
  var t = els[i].getAttribute('data-es');
  if (t) els[i].textContent = t;
}
```

**After:**
```javascript
// Load translations for current locale and swap by key
var lang = document.documentElement.lang;
if (lang !== 'en') {
  fetch('/i18n/' + lang + '.json')
    .then(r => r.json())
    .then(function(t) {
      document.querySelectorAll('[data-t]').forEach(function(el) {
        var key = el.getAttribute('data-t');
        var val = key.split('.').reduce((o, k) => o?.[k], t);
        if (val) el.textContent = val;
      });
    });
}
```

#### E. Replace binary toggle with language selector

Replace the current en/es toggle button with a dropdown showing all available languages:
- English
- Español
- Tiếng Việt
- 中文
- العربية
- አማርኛ

#### F. Page template strategy

Instead of duplicating 19 page files per locale (which would mean 19 x 5 = 95 new files), use Astro's dynamic routing:

```
src/pages/
├── index.astro              (English — default locale, no prefix)
├── [locale]/index.astro     (All other locales via dynamic route)
├── platform/[slug].astro
├── [locale]/platform/[slug].astro
└── ...
```

This reduces duplication from 19 files per locale to ~1 dynamic route set.

### Refactoring Effort Estimate

| Task | Scope | Effort |
|------|-------|--------|
| New Locale type + config | 12 files | Low |
| Replace 1,491 `data-en`/`data-es` pairs with `data-t` keys | 40 files | **High** |
| Generalize Layout.astro swap script | 1 file | Low |
| Language selector component | 1 component | Low |
| Refactor inline ternaries to use `t()` | 12 files | Medium |
| Dynamic locale routing | ~19 page files | Medium |
| Content schema refactoring | config.ts + 50 policies | Medium |
| Arabic RTL support (CSS logical properties, `dir` attribute) | Layout + CSS | Medium |
| Ge'ez font integration | CSS + Layout | Low |
| CJK font/line-breaking | CSS | Low |

**The `data-es` → `data-t` migration is the biggest single task** but is highly mechanical and could be scripted.

---

## 4. AI Translation Strategy: Claude Haiku 4.5

### Cost Analysis

Using Claude Haiku 4.5 for translation is roughly **19x cheaper** than Sonnet/Opus and well-suited for bulk translation work.

**Content volume to translate (per language):**

| Content Type | Count | Approx. Words |
|-------------|-------|---------------|
| UI strings (JSON) | 80+ keys | ~500 words |
| Page metadata (SEO) | 6 pages | ~300 words |
| Policy frontmatter (titles, summaries, stats) | 50 policies | ~5,000 words |
| Policy body content (markdown) | 50 documents | ~75,000 words |
| Tool page content | 11 tools | ~5,000 words |
| **Total per language** | | **~85,000 words** |
| **Total for 4 new languages** | | **~340,000 words** |

At Haiku 4.5 pricing, translating all content for 4 languages would cost roughly a few dollars total.

### Quality Assessment by Language

| Language | LLM Quality | Confidence | Review Needed? |
|----------|------------|------------|----------------|
| **Spanish** (existing) | Excellent | Very High | Light review |
| **Vietnamese** | Good | High | Moderate review — check diacritics, formal register |
| **Chinese (Simplified)** | Excellent | Very High | Light review |
| **Arabic** | Good | High | Moderate review — check formal MSA vs dialect, RTL punctuation |
| **Amharic** | Fair | Medium | **Heavy review required** |

### Amharic-Specific Concerns

Research from multiple 2024-2025 papers (arXiv:2412.12417, AfroBench, SSA-COMET) shows:

- **GPT-4o and Claude are the best-performing LLMs** for Amharic, but both show a **12-20% absolute performance gap** compared to English
- Amharic is **least correlated** with other languages in benchmark performance due to its unique Ge'ez script and Semitic grammar
- **Dedicated MT systems** (like Google Translate) may actually outperform LLMs for Amharic translation in some scenarios
- The formal register needed for civic/political content adds additional complexity

**Recommendation for Amharic:** Use Claude Haiku 4.5 for initial drafts, but **every Amharic translation must be reviewed by a native speaker** before publishing. Partner with the Ethiopian Community Center for this review pipeline.

### Suggested Translation Prompt Template

```
You are translating a civic engagement platform for Denver, Colorado.
Translate the following content from English to {LANGUAGE}.

Guidelines:
- Use formal register appropriate for civic/political communication
- Preserve all markdown formatting, links, and HTML tags
- Keep proper nouns (Denver, Colorado, etc.) untranslated
- Keep numbers, currency amounts, and statistics as-is
- For policy terms, use the standard civic/legal terminology in {LANGUAGE}
- {LANGUAGE_SPECIFIC_NOTES}

Content to translate:
---
{CONTENT}
---
```

Language-specific notes:
- **Vietnamese:** Use formal Southern Vietnamese register. Preserve Vietnamese diacritical marks precisely.
- **Chinese:** Use Simplified Chinese. Use formal civic register (公文体).
- **Arabic:** Use Modern Standard Arabic (MSA), not dialect. Maintain proper RTL punctuation.
- **Amharic:** Use formal written Amharic. Use standard Ge'ez script. For technical/policy terms without direct Amharic equivalents, transliterate and provide explanation in parentheses.

### Batch Translation Workflow

1. **Extract** all translatable strings into a structured format (JSON keys, markdown files)
2. **Translate** via Claude Haiku 4.5 with the above prompt template
3. **Automated QA:** Check for missing keys, broken markdown/HTML, untranslated segments
4. **Human review:** Native speaker review (light for es/zh/vi, moderate for ar, heavy for am)
5. **Integration:** Place translated files in the appropriate locale directories
6. **Visual QA:** Check all pages for layout/overflow issues with new scripts

---

## 5. Should We Support All 5?

### Recommendation: Yes — phased rollout

| Phase | Languages | Scope | Why |
|-------|-----------|-------|-----|
| **Phase 0** | Architecture refactoring | Replace `data-es` pattern, generalize locale system | Required before any new language. Unblocks everything. |
| **Phase 1** | Vietnamese (vi) + Chinese (zh) | Full site | High LLM quality, Latin/system fonts, no RTL. Lowest technical risk. |
| **Phase 2** | Amharic (am) | Core pages first, then full | Ge'ez font needed. Translation needs human review. Start with community partnership. |
| **Phase 3** | Arabic (ar) | Full site | RTL support is the biggest technical lift. Do it last when the architecture is proven. |

### Why this order?

1. **Phase 0 (architecture)** is mandatory — can't add more languages without it
2. **Phase 1 (vi/zh)** validates the new architecture with minimal technical risk
3. **Phase 2 (am)** has the highest community impact per effort but needs the human review pipeline
4. **Phase 3 (ar)** requires RTL, which is the most significant CSS/layout change

### Alternative: Start with Amharic

If community impact is prioritized over technical ease, swap Phases 1 and 2. The Ethiopian community is more underserved than Vietnamese or Chinese communities (who have more existing translated resources). The architecture refactoring in Phase 0 makes any order equally feasible.

---

## 6. References

### Denver Demographics & Language Data
- [Denver Language Access Program (Executive Order 150)](https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Human-Rights-Community-Partnerships/Divisions/Immigrant-Refugee-Affairs/Language-Access) — City & County of Denver
- [Colorado State Language Data](https://www.migrationpolicy.org/data/state-profiles/state/language/CO) — Migration Policy Institute
- [Languages in Colorado](https://statisticalatlas.com/state/Colorado/Languages) — Statistical Atlas
- [Colorado's most popular languages spoken at home](https://www.axios.com/local/denver/2025/03/03/most-popular-languages-spoken-colorado) — Axios Denver
- [Colorado Office of New Americans Data](https://ona.colorado.gov/resources/data) — State of Colorado
- [Demographics of Denver](https://en.wikipedia.org/wiki/Demographics_of_Denver) — Wikipedia
- [Denver Hispanic Chamber Demographics](https://www.hispanicchamberdenver.com/demographics) — Hispanic Chamber of Commerce

### Ethiopian / Amharic Community
- [Ethiopians in Denver: Why So Many Have Come and Stayed](https://bucketlistcommunitycafe.com/ethiopians-in-denver-why-so-many-have-come-and-stayed/) — Bucket List Community Cafe
- [Ethiopians in Colorado](https://history.denverlibrary.org/news/western-history/ethiopians-colorado) — Denver Public Library Special Collections
- [Denver metro area home to 30,000 Ethiopians, Eritreans](https://www.denverpost.com/2013/07/25/denver-metro-area-home-to-30000-ethiopians-eritreans/) — Denver Post
- [Ethiopian Population by State](https://worldpopulationreview.com/state-rankings/ethiopian-population-by-state) — World Population Review
- [Colorado's Ethiopian and Indian communities food festivals](https://www.cpr.org/2023/08/03/food-festivals-ethiopian-indian-denver-colorado-springs/) — CPR News
- [Ethiopians in Colorado](https://www.colorado.edu/initiative/newscorps/2016/05/09/ethiopians-colorado) — CU Boulder News Corps
- [Church acts as community stronghold](https://www.colorado.edu/initiative/newscorps/2016/03/29/church-acts-community-stronghold-colorados-ethiopian-population) — CU Boulder News Corps
- [Amharic Most Commonly Spoken African Language in Eight U.S. States](http://www.tadias.com/05/15/2014/census-amharic-most-commonly-spoken-african-language-in-eight-u-s-states/) — Tadias Magazine

### LLM Translation Quality Research
- [Bridging the Gap: Enhancing LLM Performance for Low-Resource African Languages](https://arxiv.org/abs/2412.12417) — arXiv, Dec 2024
- [AfroBench: How Good are LLMs on African Languages](https://aclanthology.org/2025.findings-acl.976.pdf) — ACL 2025
- [Where Are We? Evaluating LLM Performance on African Languages](https://arxiv.org/html/2502.19582v1) — arXiv, Feb 2025
- [SSA-COMET: MT Evaluation for Under-Resourced African Languages](https://arxiv.org/html/2506.04557) — arXiv, 2025
- [Claude Multilingual Support](https://docs.anthropic.com/en/docs/build-with-claude/multilingual-support) — Anthropic Docs
