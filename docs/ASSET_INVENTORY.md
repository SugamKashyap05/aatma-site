# Asset Inventory — Complete List for Creation
**Compiled:** 12 October 2026
**Purpose:** the definitive list of every chart, image and SVG needed before any Kanban task is written.
**Method:** audited against the live codebase (`find public`, `find src`, route and component inspection) — counts below are the **true delta**, not a restatement of what exists.

> **Status note (18 October 2026):** This document is a planning snapshot compiled on 12 October 2026, not a live inventory. Use `docs/ACTIVE_ASSET_PROVENANCE_REGISTER.md` for the current rendered-image map; Phase 3 claim-source audit remains open until the independent route reviews are reconciled.


---

## What already exists — audited

| Category | Count | Location |
|---|---|---|
| Raster images (jpg) | **35** | 31 = AGAR book pages (`books/agar/pages/`), 2 = book covers, 1 = `history/cultural-significance.jpg`, 1 = `history/hero-banner.jpg` |
| Raster images (png) | **10** | 8 = `history/`, 3 formats × 3 = `research/` (shared count) |
| AI illustrations, 3 formats each | **9 files / 3 assets** | `public/research/` — avif + webp + png |
| Hero parallax layers | **28 files / 14 layers** | `src/assets/hero/mountain-1..14` × avif + webp |
| SVG files | **2** | `public/favicon.svg`, `public/icons.svg` — **neither is content** |
| Inline SVG charts | **2** | `MicrobialDataViz.tsx` — grouped bar + donut |
| Book cover images | **2** | `books/covers/` |
| PDFs | **2** | `press/` |

**Net position:** the site has **zero content SVGs** and **zero standalone chart files**. Both existing charts are inline React SVG inside `MicrobialDataViz.tsx`. Every asset below is genuinely new.

---

# PART 1 — IMAGES to create

## 1A. AI-generated (Microsoft MAI Playground, `mai-image-2-6-flash`)

**Output is always 1024×1024 square.** Crop or letterbox downstream for wide formats — asking for landscape in the prompt does not work.

### History page — `/history`

| # | File | Aspect | Description |
|---|---|---|---|
| **IMG-H01** | `history/sanchi-paat-manuscript.jpg` | square → wide crop | Aged *sanchi paat* bark manuscript with Assamese/Bengali script, warm lamplight, documentary |
| **IMG-H02** | `history/founders-1976.jpg` | square | Modest 1970s Hojai office meeting — wooden furniture, paper files, tungsten light. **Three figures**, documentary photo style |
| **IMG-H03** | `history/early-trade-sylhet.jpg` | square → wide | 1905–06 Sylhet riverbank agarwood extraction, period scene, painterly, no text |
| **IMG-H04** | `history/trade-journey-hojai.jpg` | square | Early Hojai distillation — cottage still, smoke, workers, warm earth tones |
| **IMG-H05** | `history/far-east-import.jpg` | square → wide | 1980s dockside import — crates, far-eastern port, humid light |
| **IMG-H06** | `history/seminar-2000.jpg` | square → wide | 2000 conference hall, long table, name cards, Assam Administrative Staff College |
| **IMG-H07** | `history/critical-era-hardship.jpg` | square | Roadside checkpoint scene — carts, crates, authority figures, overcast. Sombre, non-sensational |
| **IMG-H08** | `history/victory-2023.jpg` | square | Gazette notification page + agarwood/oil on desk, celebratory but restrained |
| **IMG-H09** | `history/nagaon-jorhat-district.jpg` | square | Present-day Upper Assam agar plantation — rows of young *Aquilaria*, homestead setting |
| **IMG-H10** | `history/aatma-formation-era.jpg` | square | 1976 AATMA founding — three men at a table with ledgers, banner-free |

### Research page — `/research`

| # | File | Aspect | Description |
|---|---|---|---|
| **IMG-R01** | `research/conservation-habitat.jpg` | square | Wild *Aquilaria* tree in Assam forest habitat, natural light, documentary |
| **IMG-R02** | `research/market-perfumery.jpg` | square | Agar oil distillation and perfumery — copper stills, glass vials, golden oil |
| **IMG-R03** | `research/plantation-growth.jpg` | square → wide | Agar plantation rows, saplings, farmer at work, daylight |

### Press-meet page — `/press-meet-2023`

| # | File | Aspect | Description |
|---|---|---|---|
| **IMG-P01** | `press-meet/aatma-head-office.jpg` | square → wide | AATMA head office, Main Road, Hojai — exterior, modest building, Main Road signage |

**AI-generated subtotal: 14 images**

## 1B. Frame grabs from the client videos (no generation needed)

Already extracted to `scratch/client_videos/`. To be selected, cropped and moved into `public/press-meet/`.

| # | File | Source | Description |
|---|---|---|---|
| **IMG-P02** | `press-meet/press-meet-hero.jpg` | `frame_v2_*.png` | Wide hero — press meet, mic bank, banner visible. **720p source** |
| **IMG-P03** | `press-meet/speakers-table.jpg` | `frame_v2_150s.png` | Speakers at table, 3 men, banner readable |
| **IMG-P04** | ~~`press-meet/banner-detail.jpg`~~ **removed** | `frame_v2_*` | Close crop of the PRESS MEET banner — withdrawn at the client's request: a 1280x240 strip in which the banner heading is cut off at both edges and only the tops of the speakers' heads are visible. File deleted from `public/press-meet/` and dropped from `PressMeetGallery`. |

**Frame-grab subtotal: 2 images** (source frames already on disk; IMG-P04 withdrawn at the client's request)

## 1C. Format pipeline — per AI-generated image

Each 1024×1024 PNG → **4 files**: cropped wide variant (where noted) + 3 formats.

| Format | Purpose |
|---|---|
| `.avif` | Primary, best compression |
| `.webp` | Broad fallback |
| `.png` | Universal fallback |
| wide crop (`.avif` + `.webp`) | Only for rows marked "→ wide" |

**File count for 14 AI images:** 14 × 3 (square) + 7 × 2 (wide crops) = **56 files, 21 distinct assets**
**Plus 3 frame grabs** = **59 new image files, 24 distinct assets**

All paths routed through `assetUrl()` and rendered inside `<picture>` + `srcset`.

---

# PART 2 — CHARTS to create

**Pattern:** follow the existing `MicrobialDataViz.tsx` approach — inline React SVG, `role="img"`, `aria-label` generated from the data, `prefers-reduced-motion` respected, **design tokens only, no raw hex**.

| # | Chart | Type | Route | Data source | Notes |
|---|---|---|---|---|---|
| **CH-01** | Tree population by district | Horizontal bar | `/research` | Assam Tribune, 18 Nov 2024 | Golaghat 4.5 cr, Jorhat, Sivasagar, Karimganj, Cachar |
| **CH-02** | Assam vs Tripura tree count | Comparative bar | `/research` | Assam Tribune, 18 Nov 2024 | 11.437 cr vs 1.515 cr |
| **CH-03** | Global agarwood market growth | Line / area | `/research` | Assam Tribune, 18 Nov 2024 | $44.05bn (2023) → $64bn (2029), 7.7% CAGR |
| **CH-04** | Assam export quota share | Donut | `/policy` | Assam Tribune, 18 Nov 2024 | 79% Assam vs 21% rest of India |
| **CH-05** | Trade flow 2017–2021 | Paired bar | `/research` | Assam Tribune, 18 Nov 2024 | 142 t imported vs 141 t re-exported; 74%/92% eastern share |
| **CH-06** | Primary WBI decline | Bar | `/policy` | Assam Tribune, 2 Aug 2023 | 588 → 206 (−66%) |
| **CH-07** | Agarwood price ranges | Range bar | `/research` | Assam Tribune, 18 Nov 2024 | Chips Rs 10k–3 lakh/kg; oil Rs 6k–17,500/tola |
| **CH-08** | Registration processing time | Timeline bar | `/policy` | Assam Tribune, 2 Aug 2023 | 62 days secondary, 74 days primary |
| **CH-09** | Advocacy timeline gantt | Gantt | `/history` | History PDF + transcripts | 23 years, 5 governments, key representation dates |
| **CH-10** | Unit capacity categories | Stepped bar | `/policy` | WBI Gazette Rule 2 | ≤500 / 501–1000 / 1001–2000 / >2000 kg |
| **CH-11** | Tree population growth | Stacked area | `/research` | History PDF + Assam Tribune | >1 crore (PDF) → 11.437 crore (2024) — **label both dates** |
| **CH-12** | Timeline event density | Bar by era | `/history` | Site's own timeline data | 20 events across 6 eras |

**Chart subtotal: 12 charts**

### Chart requirements — non-negotiable

1. **Every chart carries a visible source citation** naming publication and date.
2. **Press estimates must be labelled as such** — these are a journalist's 2024 figures, not AATMA's own research. CH-01 through CH-07 all need this.
3. **`aria-label` derived from the data**, not hardcoded — the exact defect fixed in `MicrobialDataViz.tsx`.
4. **`prefers-reduced-motion`** must gate any entrance animation.
5. **Sample/placeholder data never presented as real.** Where no source exists, label "Illustrative" — the AGAR book has no microbial data, so the existing research charts keep their disclaimer.

---

# PART 3 — SVG files to create

**All must use design tokens** (`var(--color-green-deep)`, `var(--color-gold)`, `var(--color-cream)`) — no raw hex, no `rgba()` hardcoded values. That is the exact CodeRabbit finding already fixed in `DESIGN_SYSTEM.md`.

| # | File | Route | Type | Purpose |
|---|---|---|---|---|
| **SVG-01** | `history/sanchi-paat-manuscript.svg` | `/history` | Illustration | *Sanchi paat* bark sheet with script, decorative |
| **SVG-02** | `history/trade-journey-map.svg` | `/history` | **Interactive map** | 1905→Bombay route — Sylhet, Barpather, Karbi Anglong, Naga Hills, NEFA, Bhutan, Manipur, Silchar, Bombay. 9 stops |
| **SVG-03** | `history/far-east-import-routes.svg` | `/history` | Diagram | Malaysia, Indonesia, Thailand, Cambodia → Hojai |
| **SVG-04** | `history/advocacy-gantt.svg` | `/history` | Diagram | 23-year struggle, 5 governments, key dates |
| **SVG-05** | `policy/lpc-vs-origin-flow.svg` | `/policy` | **Decision flow** | LPC (FORM- XXV) vs Certificate of Origin — two different documents, currently conflated |
| **SVG-06** | `policy/registration-timeline.svg` | `/policy` | Timeline | 62-day / 74-day processing windows, auto-advance behaviour |
| **SVG-07** | `research/cites-compliance-chain.svg` | `/research` | Flow | Forest permit → registration → CITES permit → export |
| **SVG-08** | `research/agar-plant-anatomy.svg` | `/research` | Illustration | *Aquilaria malaccensis* — resin formation, *sanchi* bark labelled |
| **SVG-09** | `press-meet/press-meet-banner.svg` | `/press-meet-2023` | Reproduction | The actual banner text, redrawn as vector |
| **SVG-10** | `history/governance-1976.svg` | `/history` | Org diagram | Founding structure — Anfar Ali, Samsul Islam, [REDACTED: AATMA member] |
| **SVG-11** | `research/agar-value-chain.svg` | `/research` | Flow | Cultivation → harvest → distillation → chips/oil → export |

**SVG subtotal: 11 files**

### SVG requirements — non-negotiable

1. **Design tokens only** — no raw hex anywhere.
2. **`role="img"` + `aria-label`** on every decorative SVG; **`aria-hidden="true"` + `focusable="false"`** where purely decorative.
3. **`prefers-reduced-motion`** gating on any animation.
4. **Accessible contrast** — text on dark green background, minimum 4.5:1.
5. **`aria-hidden` must carry an explicit value** (`aria-hidden="true"`, not bare `aria-hidden`).

---

# PART 4 — Consolidated totals

| Category | Count | Delivery |
|---|---|---|
| **AI-generated images** | **14** | MAI Playground, 1024×1024 |
| **Frame-grab images** | **3** | Extracted from client video, already on disk |
| **→ New image files on disk** | **59** | 56 from AI (3 formats × 14 + 7 wide crops) + 3 grabs |
| **Charts** | **12** | Inline React SVG, following `MicrobialDataViz` pattern |
| **SVG files** | **11** | Token-only, accessible |
| | | |
| **Total distinct assets to create** | **40** | 14 AI + 3 grabs + 12 charts + 11 SVGs |
| **Total files landing in the repo** | **70** | 59 images + 11 SVGs (charts are inline, not files) |

## Phase 4 reconciled implementation update — 18 October 2026

- Homepage hero: `src/features/home/HomePage.tsx` uses static `src/features/hero/AatmaHero.tsx`, with the client-supplied 1000×800 photo at `public/client-images/aatma-tree-plantation.jpg`. It renders within a bounded split frame (up to 576 px wide) and is not upscaled into a full-bleed desktop image. Caption/alt text are limited to visible rows of trees and a grassy path; species/location are not inferred.
- Background bundle: 40 responsive/crop variants are present (4 full-frame sizes plus 36 focal crops), each encoded as AVIF, WebP, and JPEG: 120 derivative files, plus one source JPEG and `manifest.json` (122 files total in the background directory).
- `ForestBackground` uses `<picture>` with small/mobile/tablet/desktop focal crops and `assetUrl("assets/backgrounds")`, rather than always using `FOREST_FULL[0]`. The Kaziranga source remains decorative-only and credited; the client photo is a separate homepage hero, not a replacement or a visual source claim.
- The retired parallax hero module (`ParallaxHero`) and its layer bundle remain in the repository but are not rendered on `/`. On 18 October 2026, 48 project-created raster illustrations (11,346,742 bytes) were moved out of `public/` into `docs/retired-project-illustrations/`, so they are not copied into the static site. Current active image routes, alts/captions and provenance are recorded in `docs/ACTIVE_ASSET_PROVENANCE_REGISTER.md`. The source-derived trade schematic and the approved, attributed Wikimedia background remain active; the older planning counts above are not a live inventory.


### By route (original planned distribution)

| Route | Images | Charts | SVGs |
|---|---|---|---|
| `/history` | 10 (+1 wide crops) | 2 | 5 |
| `/research` | 3 (+2 wide crops) | 6 | 3 |
| `/policy` | 0 | 3 | 2 |
| `/press-meet-2023` | 4 (1 AI + 3 grabs) | 0 | 1 |
| **Total** | **17 distinct** | **11** | **11** |

*(12 charts planned, 11 mapped — CH-12 timeline density folds into `/history` alongside CH-09)*

---

# PART 5 — Creation order

### Phase 1 — AI images (MAI Playground, one at a time)

14 prompts, submitted sequentially: generate → wait → save → convert to avif/webp/png → `<picture>` + `srcset`.

**Batch by route** so the page can be verified incrementally:
- **Batch 1:** IMG-H01 → H10 (10 history images)
- **Batch 2:** IMG-R01 → R03 (3 research images)
- **Batch 3:** IMG-P01 (1 press-meet image)

### Phase 2 — Frame grabs (no generation)

Select from the 8 frames already extracted, crop, convert, place.

### Phase 3 — SVGs

11 files. Can be written directly — no external tool. **Tokens only.**

### Phase 4 — Charts

12 inline React SVG components. **Data-driven `aria-label`, source citation on each, press-estimate labels.**

---

# PART 6 — Blockers before any of this

| Gate | What | Blocks |
|---|---|---|
| **GATE A** | Read the 4th WhatsApp image (76 KB) — vision still 429 | Final press-archive scope, **not** any asset above |
| **GATE B** | Finish gazette read — WBI pp. 620–682, ToF pp. 3–25 | CH-04, CH-08, SVG-05, SVG-06 accuracy |
| **GATE D** | Confirm Speaker 2 = [REDACTED: AATMA member] | Any named quote in `/press-meet-2023` |
| **GATE E** | Decide video hosting — 125 MB total, too large for git | `/press-meet-2023` route |

**No gate blocks image, SVG or frame-grab creation.** Only four charts and two SVGs depend on GATE B, and those can ship with newspaper citation in the interim.

**Resolved:** C1 — the three events are three separate events in three separate years (Nov 2000 seminar, Dec 2003/Jan 2004 workshop, and the ~2006 seminar referenced in the v2 transcript). All three stay on the timeline as distinct entries.

---

# Part 7 — What to hand the Kanban board

Once assets exist, each triage card should point at the **already-created file path**, e.g.:

> **Card:** "Add Founding of AATMA section to /history"
> **Assets ready:** `public/history/founders-1976.jpg`, `public/history/governance-1976.svg`, `docs/AGAR_HISTORY_SOURCE.md` §5
> **Acceptance:** section renders at 375px and ≥1280px, image loads with `assetUrl()`, no console errors, `npm run build` + `npm run lint` exit 0.

This is the pattern that avoids the false-completion history — **the asset exists on disk before the card is written**, and the card names the file it must use.
