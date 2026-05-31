# Image generation prompts — Denver For All

These prompts regenerate the 13 category images in `public/og/` (`housing.png`,
`labor.png`, etc.) in a **single, cohesive stylized-illustration style** so the
platform stops looking like a grab-bag of AI stock art. They are tuned to the
Colorado-flag civic palette and to real Denver geography.

## How to use

1. Pick **one** model and generate all 13 images in the same session so the
   style stays consistent. Recommended latest-generation models:
   - **Midjourney v7** (best for cohesive illustration; use `--style raw`)
   - **Google Imagen 4** / **Flux 1.1 Pro** (strong vector/flat illustration)
   - **GPT-image-1** (OpenAI) or **Ideogram 3** (good if you ever need legible text)
2. Prepend the **Shared style block** to every per-image prompt.
3. Append the **Negative / avoid** block (or use the model's negative-prompt
   field) to suppress the uncanny-AI look.
4. Export at **1200 × 630 px** (1.91:1, the Open Graph ratio), PNG or WebP, and
   save over the existing filename in `public/og/`. Keep `default.png` as the
   generic social-share fallback.
5. After dropping them in, run `npm run build` and spot-check a few policy cards
   plus a social-share preview.

> **Consistency tip:** In Midjourney, generate the first image you're happy with,
> then reuse it as a style reference (`--sref <url>` or `--cref`) for the other
> twelve. In Flux/Imagen, keep the seed family and the full style block identical.

---

## Shared style block (prepend to every prompt)

```
Flat editorial vector illustration, clean geometric shapes, bold confident
linework, subtle grain texture, limited cohesive color palette of deep flag
blue (#00408b), bright azure (#2b86d8), warm capitol gold (#f2c14e), a single
accent of Colorado red (#c8102e), and soft off-white (#fafbfc); Rocky Mountain
Front Range silhouette and wide Colorado sky as a recurring motif; warm,
hopeful, community-forward mood; people of diverse ages and ethnicities shown
with dignity and agency; modern civic-poster / WPA-meets-contemporary aesthetic;
even diffused lighting, no harsh shadows; horizontal 1.91:1 composition with
clear focal point and breathing room; no text, no logos, no watermarks.
```

## Negative / avoid block

```
photorealistic, 3D render, hyperreal, uncanny faces, extra fingers, distorted
hands, melted features, garbled text, gibberish signage, stock-photo look,
lens flare, HDR, oversaturated neon, cluttered busy background, drop shadows,
glossy plastic, AI sheen, watermark, signature, frame, border.
```

---

## Per-image prompts

> Each line below is the **scene**. Final prompt = Shared style block + scene + Negative block.

### `housing.png` — Housing & Homelessness
```
A welcoming block of mixed-income Denver row houses and small apartment
buildings in brick and warm tones, neighbors of different ages talking on
front stoops and a shared community garden, the gold-domed Colorado Capitol
and Front Range mountains softly in the background.
```

### `labor.png` — Workers & Wages
```
A diverse group of Denver workers standing together with quiet confidence —
a transit operator, a nurse, a construction worker, a cook, a teacher —
in front of Union Station's clock tower, morning light, sense of solidarity
and fair pay.
```

### `health.png` — Healthcare
```
A bright neighborhood community health clinic with patients and a caregiver,
a parent holding a child, an older adult being supported, calm and reassuring,
Front Range mountains visible through large windows, medical care framed as a
right rather than a transaction.
```

### `climate.png` — Climate & Environment
```
A clear-skied Denver with the South Platte River greenway, leafy trees, rooftop
solar panels and a wind turbine on the horizon, people biking and walking,
the Rocky Mountains crisp and clean in the distance, optimistic green future.
```

### `safety.png` — Public Safety
```
Two unarmed community crisis responders in calm conversation with a resident on
a Denver sidewalk, warm body language, a neighborhood street with trees and a
light-rail line behind them, care-first public safety, de-escalation not force.
```

### `education.png` — Education
```
A vibrant public school / childcare scene with young children and an educator
reading together, parents at pickup, a colorful playground, the Front Range
behind the school building, joyful and equitable learning.
```

### `immigration.png` — Immigration
```
A warm welcome-center scene where Denver residents help newly arrived immigrant
families, sharing food and paperwork at a community table, flags subtle and
inclusive, multilingual welcome, dignity and belonging, mountains beyond.
```

### `infrastructure.png` — Infrastructure
```
Denver public infrastructure working for everyone: an RTD light-rail train,
a well-maintained sidewalk and protected bike lane, fiber/broadband lines,
people of all abilities moving through the city, Union Station and the Front
Range in the background.
```

### `justice.png` — Criminal Justice
```
A balanced, hopeful scene of community-based justice and reentry support in
Denver — a mentor and a young person, a community center, open hands and an
abstract motif of scales rebalancing toward fairness, warm and restorative,
not punitive.
```

### `democracy.png` — Democracy & Governance
```
Denver residents participating in local democracy: neighbors at a participatory
budgeting / town-hall meeting raising hands and voting, a ballot box, diverse
community members shaping decisions together, the gold-domed Capitol behind them.
```

### `economy.png` — Economy & Business
```
A thriving local Denver small-business street — a worker-owned cooperative
storefront, a public-banking branch, a farmers market, neighbors shopping and
exchanging, community wealth circulating locally, mountains at the end of the
street.
```

### `community.png` — Community & Culture
```
A joyful Denver block party / cultural festival in a neighborhood park, music,
shared food, art and murals, families and elders and kids of many backgrounds
celebrating together, string lights, the Front Range glowing at golden hour.
```

### `default.png` — Generic social-share fallback
```
An iconic stylized Denver skyline at the foot of the snow-capped Rocky Mountain
Front Range under a wide blue Colorado sky, the gold-domed Capitol and a
light-rail line, a diverse crowd of residents walking toward the city together,
optimistic civic mood, room at the top for a headline (leave negative space).
```
