# Translation Pipeline — Denver For All

Batch translation pipeline for expanding Denver For All from 2 locales (en/es) to 6 locales (en/es/vi/zh/ar/am).

## Overview

```
scripts/translate/
├── README.md              ← You are here
├── extract-content.js     ← Step 1: Extract translatable content
├── translate.js           ← Step 2: Translate via Gemini 2.0 Flash
├── hydrate.js             ← Step 3: Place translations into codebase
├── validate.js            ← Step 4: Validate translation output
├── prompts/
│   ├── system.md          ← System prompt (shared across all languages)
│   ├── vi.md              ← Vietnamese-specific instructions
│   ├── zh.md              ← Chinese (Simplified)-specific instructions
│   ├── ar.md              ← Arabic-specific instructions
│   ├── am.md              ← Amharic-specific instructions
│   └── tasks/
│       ├── ui-strings.md       ← Prompt for JSON UI translations
│       ├── page-meta.md        ← Prompt for SEO metadata
│       ├── policy-frontmatter.md ← Prompt for policy titles/summaries
│       ├── policy-body.md      ← Prompt for policy markdown content
│       └── grant-body.md       ← Prompt for grant proposal content
├── extracted/             ← (generated) Extracted English source content
└── output/                ← (generated) Translated output per language
```

## Quick Start

```bash
# Step 1: Extract all translatable content from the codebase
node scripts/translate/extract-content.js

# Step 2: Translate (requires GEMINI_API_KEY)
#   All languages:
GEMINI_API_KEY=... node scripts/translate/translate.js

#   Single language:
GEMINI_API_KEY=... node scripts/translate/translate.js --lang vi

#   Single content type:
GEMINI_API_KEY=... node scripts/translate/translate.js --lang zh --type ui-strings

#   Dry run (no API calls — shows plan and estimated tokens):
node scripts/translate/translate.js --dry-run

# Step 3: Validate the output
node scripts/translate/validate.js

# Step 4: Place translations into the codebase
node scripts/translate/hydrate.js
```

## Target Languages

| Code | Language | Script | LLM Quality | Notes |
|------|----------|--------|-------------|-------|
| `vi` | Vietnamese | Latin (diacritics) | Good | Check diacritical marks carefully |
| `zh` | Chinese (Simplified) | CJK | Excellent | Text will be more compact than English |
| `ar` | Arabic | Arabic (RTL) | Good | Uses MSA; RTL requires CSS work |
| `am` | Amharic | Ge'ez (Ethiopic) | Fair | **Needs heavy human review** |

## Cost Estimate

Using Gemini 2.0 Flash (`gemini-2.0-flash`) at $0.10/MTok input, $0.40/MTok output:

| Content | Per Language | 4 Languages |
|---------|-------------|-------------|
| UI strings (59 keys) | ~$0.001 | ~$0.004 |
| Page meta (6 pages) | ~$0.001 | ~$0.004 |
| Policy frontmatter (50 policies) | ~$0.006 | ~$0.024 |
| Policy bodies (50 docs, ~106K words) | ~$0.18 | ~$0.72 |
| Grant bodies (6 docs) | ~$0.02 | ~$0.08 |
| **Total** | **~$0.21** | **~$0.83** |

Total: **~252 API calls, estimated $0.50-1.00** for all 4 languages.

## Content Volume

Extracted from the codebase:

- **59** UI string keys (navigation, buttons, headings, form labels)
- **6** page metadata entries (SEO titles and descriptions)
- **50** policy documents with frontmatter (titles, summaries, key statistics)
- **50** policy body documents (~106,000 words of markdown)
- **6** grant proposals with frontmatter

## Detailed Steps

### 1. Extract (`extract-content.js`)

Pulls all translatable English content into structured files under `extracted/`:

```
extracted/
├── ui-strings.json          ← en.json mirror
├── page-meta.json           ← SEO titles/descriptions
├── policy-frontmatter.json  ← All 50 policy titles, summaries, keyStats
├── policy-bodies/           ← One .md per policy (the bulk of content)
│   ├── housing-first.md
│   └── ... (50 files)
├── grant-frontmatter.json
└── grant-bodies/
    └── ... (6 files)
```

### 2. Translate (`translate.js`)

Calls the Gemini API with carefully crafted prompts for each content type × language combination.

**Prompt structure:**
- **System prompt** (`prompts/system.md`): Base translation rules (formatting, proper nouns, etc.)
- **Language prompt** (`prompts/<lang>.md`): Language-specific register, terminology, script notes
- **Task prompt** (`prompts/tasks/<type>.md`): Content-type-specific instructions (JSON format, markdown rules)

**Options:**
- `--lang <code>`: Translate only one language
- `--type <type>`: Translate only one content type
- `--concurrency N`: Max parallel API calls (default: 3)
- `--dry-run`: Preview without calling the API

**Rate limiting:** Automatic retry with exponential backoff on 429/5xx errors.

**Output:**
```
output/
├── vi/
│   ├── ui-strings.json
│   ├── page-meta.json
│   ├── policy-frontmatter.json
│   └── policy-bodies/
│       └── ... (50 .md files)
├── zh/
│   └── ...
├── ar/
│   └── ...
└── am/
    └── ...
```

### 3. Validate (`validate.js`)

Checks translated output for:
- Missing JSON keys (compared to English source)
- Invalid JSON
- Empty or suspiciously short translations
- Untranslated strings (identical to English)
- Missing policy body files
- `[REVIEW:]` flags (Amharic translations may include these)

### 4. Hydrate (`hydrate.js`)

Places validated translations into the codebase:

| Translated Content | Destination |
|-------------------|-------------|
| UI strings | `src/i18n/<lang>.json` |
| Policy frontmatter | `src/i18n/policy-meta-<lang>.json` |
| Policy bodies | `src/content/policies-<lang>/<slug>.md` |
| Page meta | Prints snippets to add to `page-meta.ts` manually |

**Remaining manual steps after hydration:**
1. Update `src/i18n/utils.ts` — import new locale JSONs, expand `Locale` type
2. Update `src/i18n/page-meta.ts` — add new locale entries
3. Update `src/content/config.ts` — register new `policies-<lang>` collections
4. Human review of all Amharic translations

## Tips

### Translate incrementally
```bash
# Start with UI strings to test the pipeline
GEMINI_API_KEY=... node scripts/translate/translate.js --lang vi --type ui-strings

# Then do a few policy bodies to check quality
GEMINI_API_KEY=... node scripts/translate/translate.js --lang vi --type policy-bodies
```

### Re-extract after content changes
If policies are added or updated, re-run extraction before translating:
```bash
node scripts/translate/extract-content.js
```

### Amharic quality
The Amharic prompt instructs the model to add `[REVIEW: explanation]` flags for uncertain translations. The validation script counts these flags. **All Amharic output should be reviewed by a native speaker** before publishing — partner with the Ethiopian Community Center.
