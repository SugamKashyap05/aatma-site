# Master Implementation Plan — AATMA Website
**Compiled:** 12 October 2026
**Purpose:** consolidate every source document, image, video and transcript into one plan for Kanban triage.
**Status:** PLANNING ONLY — no code written, no Kanban cards created.

---

## Part 0 — What we hold

### 0.1 Source documents (all in `documents/`, gitignored)

| # | File | Type | Read? | Primary value |
|---|---|---|---|---|
| D1 | **A BRIEF HISTORY OF AGAR.pdf** | 4 pp, text layer | ✅ **FULL** | AATMA's own history — the richest source |
| D2 | No. 20 eCF No. 237152…pdf | Gazette, 67 pp | ⚠️ Rule 2 only | WBI Rules 2022 — primary law |
| D3 | Assam ToF (SM) Rules, 2022.pdf | Gazette, 25 pp | ⚠️ Rule 2 only | ToF Rules 2022 — primary law |
| D4 | AATMA press note Rev.docx | 14 KB | ✅ | Press release text |
| D5 | AATMA to HCM.docx | 15 KB | ✅ | Letter to the CM |
| D6 | A brief note on Agar Trade.docx | 21 KB | ✅ | Trade overview |
| D7 | CamScanner 01-14-2023.pdf | 870 KB | ✅ | Press note scan |
| D8 | DocScanner 06-Oct-2026.pdf | 5.6 MB | ✅ | Latest client document |
| D9 | Agar.pdf | 449 MB, 31 pp | ⚠️ 34 lines only | AGAR book — image-only, no text layer |
| D10 | The Vibe Coding Blueprint.pdf | 128 KB | ✅ | Dev standards |

### 0.2 Newspaper clippings (3 read, 1 unread)

| # | Publication | Date | Headline | Status |
|---|---|---|---|---|
| N1 | The Assam Tribune | 18 Nov 2024 | "Prospects of Assam's agarwood industry" (PJ Vijayakar) | ✅ Full |
| N2 | The Assam Tribune | 2 Aug 2023 (p. 6) | "Wood-based industries: Winds of change soon" (PJ Vijayakar) | ✅ Full |
| N3 | Hindustan Times | 17 Jan 2023 | "AATMA thanks CM Sarma…" (HT Correspondent) | ✅ Full |
| N4 | *(4th WhatsApp image)* | — | — | ❌ **UNREAD** — vision 429 |

### 0.3 Videos and transcripts — **both complete**

| | v1 (Asom First) | v2 (News To Newsaxom) |
|---|---|---|
| Duration | 6:26 | 13:20 |
| Event | **Same press meet — 14 Jan 2023, Hojai** | Same |
| Assamese transcript | ✅ `TRANSCRIPT_…-2023-01-14.md` | ✅ `TRANSCRIPT_…-2023-01-14_v2.md` |
| **English** | ✅ `…-EN.md` | ✅ (combined file) |
| **Hindi** | ✅ `…-HI.md` | ✅ (combined file) |
| Contains a studio anchor? | **No** | **No** |

### 0.4 What the site already has — 6 routes

| Route | Component | Sections | Images |
|---|---|---|---|
| `/` | HomePage | Hero, AgarStory, About, Milestones, PressSection, Members, Contact | `mountain-*.avif` (hero parallax) |
| `/books` | BooksPage | Library + full-screen reader, 32 books | `books/covers/*` |
| `/press` | PressPage | PressSection, **PressReleaseArchive** (now wired), PressDownloads | — |
| `/history` | HistoryPage | **8 sections**, InteractiveTimeline (20 events, 6 eras) | **9 images** in `public/history/` |
| `/policy` | PolicyPage | **6 sections** — Rules, Comparison (24 rows), CITES, Registration, Platform, Provenance | — |
| `/research` | ResearchPage | 5 research sections + MicrobialDataViz (bar + donut) | 3 SVGs + 3 AI illustrations (avif/webp/png) |

**Shared components:** PageLayout, Navbar (mobile drawer + focus mgmt), InteractiveTimeline, BentoCard/Grid, Reveal, KineticGrid, ScrollManager, MediaCoverageTimeline, badge, button, timeline.

**Docs:** PRD, DESIGN_SYSTEM, ARCHITECTURE, CODE_STYLE, TESTING, DATABASE, SECURITY, AGENTS.md, README.

**Data:** `src/data/content.ts` (AATMA profile, milestones), `src/data/books.ts` (32 entries).

---

## Part 1 — What D1 (the history PDF) changes

This document is **the richest source we have received** and it targets the `/history` page, which is currently the thinnest relative to available material.

### Content that exists nowhere else

| New content | Currently on site? | Priority |
|---|---|---|
| *Sanchi paat* as writing material; Sankar Dev, Madhav Deb, Damudar Deb | Partial — mentioned, no depth | **High** |
| **3 founding fathers** (Anfar Ali, Samsul Islam, Binay Kumar Paul) | **No** | **High** |
| **Trade chronology 1905→Bombay** — Sylhet, Barpather, Karbi Anglong, Naga Hills, NEFA, Bhutan, Manipur, Silchar | Era thumbnails only | **High** |
| **Nov 2000 national seminar**, Dr. P.K. Hajra presiding | **No** — wrong date on timeline | **High** |
| **5,000 employment figure** at the Far East import peak | **No** | Medium |
| **AATMA–Assam Govt survey**: >1 crore trees in private cultivation | **No** | Medium |
| **26 June 2000 memorandum** to the CM | **No** | **High** |
| **Oct 2005 DFO denial** (Shri Siv Kumar, IFS) | **No** | **High** |
| **7 units ruined**, business flight to Meghalaya & overseas | **No** | **High** |
| **CCF(T) letter FGT39/WBI/Amand/SecondaryWBI/06 dt 01.03.2006** — CEC recommended, **Cabinet rejected** | **No** | **High** |
| **24 Aug 2016** meeting with Pramila Rani Brahma; **28 Oct 2016** NEDFi conference | **No** | **High** |
| **19 Jul 2021** delegation with Sirajuddin Ajmal MLA | **No** | **High** |
| Life-on-the-ground narrative (seizures, harassment, criminalisation) | Partial | Medium |

### ⚠️ Conflicts D1 introduces — must be resolved, not merged silently

| # | Conflict | Sources | Needs |
|---|---|---|---|
| **C1** | ~~Seminar date conflict~~ — **RESOLVED 12 Oct 2026.** Three **separate events in three separate years**, all three stay on the timeline as distinct entries: (a) **Nov 2000** national seminar, Dr. P.K. Hajra presiding, Administrative Staff College [D1 §6]; (b) **6–7 Jan 2004** Workshop on Agar Plantation and JFMCs, Rabindra Bhavan [D1 §7, site timeline]; (c) the Guwahati seminar referenced in the v2 transcript [transcript — date uncertain, verify before publishing] | D1, transcript v2, site | ✅ Closed |
| **C2** | "77 species" and "5 km from forest" — in both transcripts, in **neither gazette Rule 2**, in no clipping | transcripts | Gazette read (GATE B) |
| **C3** | Tree count: D1 says **>1 crore** private cultivation; Assam Tribune says **11.437 crore** outside forest | D1 §6, N1 | Both may be right (different scopes/years) — state both with dates |
| **C4** | Agar family: D1 says **Thymelaeaceae**; correct botanical family for *Aquilaria* is **Thymelaeaceae** ✓ — but verify against gazette wording | D1 §1 | Low |

---

## Part 2 — Pages we need

### Existing — to be extended

| Route | Action | Driver |
|---|---|---|
| `/history` | **Major expansion** — 8 → ~14 sections; add founding, chronology, critical era, achievement | **D1** |
| `/policy` | Add 62/74-day limits, LPC vs Certificate of Origin, hectare thresholds | D2, D3, N2 |
| `/research` | Add conservation section, market data, export quota | N1 |
| `/press` | Add press archive (3–4 clippings) + press-meet video feature | N1, N2, N3, v1, v2 |
| `/` | Timeline entry corrections; add AATMA survey figure | D1 |
| `/books` | Low priority — AGAR book already has extracted text | D9 |

### New routes — recommended

| Route | Why | Priority |
|---|---|---|
| **`/press-meet-2023`** | The client's explicit ask: post the video with full spoken context. Needs video + trilingual transcript. | **High** |
| **`/about`** | Currently a section on `/`. With 3 founders, leadership, and a 50-year story it deserves its own route. | Medium |
| **`/market`** | Market size, pricing, quota, trade statistics (N1). Could fold into `/research`. | Medium |

**Recommendation:** add `/press-meet-2023` (High), fold `/about` content into an expanded History page rather than a new route unless you want it prominent. Defer `/market` — fold into `/research`.

---

## Part 3 — Sections to add, by page

### `/history` — from 8 to ~14 sections

| # | New section | Source | Content |
|---|---|---|---|
| H1 | **Agar in Assamese culture** | D1 §1 | *Sanchi paat* writing; Sankar Dev, Madhav Deb, Damudar Deb; homestead ritual; *puja* article |
| H2 | **Founding of AATMA** | D1 §5 | 1975–76 impetus; 3 founders with "(L)" markers; Reg. No. 664 of 1978–79; 2000 reorganisation (Ataur Rahman, Jamal Uddin Choudhury) |
| H3 | **The early trade, 1905–1970** | D1 §3 | Full chronology as a visual journey — Sylhet → Barpather → Hojai → Jorhat/Sibsagar → NEFA/Bhutan → Manipur → Bombay |
| H4 | **Far East discovery & import era** | D1 §4 | Malaysia, Indonesia, Thailand, Cambodia; **5,000 employed**; re-export model |
| H5 | **National seminar, Nov 2000** | D1 §6 | Dr. P.K. Hajra; Administrative Staff College; commercial plantation spread to Assam, Nagaland, Tripura, Manipur; **>1 crore trees** |
| H6 | **The critical era, 2001–2016** | D1 §7 | 26 Jun 2000 memorandum · Oct 2005 DFO denial · 7 units ruined · flight to Meghalaya/overseas · CEC rec. 01.03.2006 **rejected by Cabinet** · 2005–2016 continued struggle |
| H7 | **The 2016 turning point** | D1 §7 | 24 Aug 2016 Humayun Chaudhury + Pramila Rani Brahma; 28 Oct 2016 NEDFi conference |
| H8 | **Achievement — 2022 Rules** | D1 §8 | 19 Jul 2021 Sirajuddin Ajmal MLA; 12 Jan 2023 enactment; consequences |
| H9 | **Life on the ground** | D1 §7 | The client's own paragraph on harassment and seizures — powerful, quotable |

### `/policy` — additions

| # | Section | Source |
|---|---|---|
| P1 | Registration time limits — **62 days** (secondary), **74 days** (primary) | N2 |
| P2 | **LPC (FORM- XXV)** vs **Certificate of Origin** — two different documents, currently conflated | D2 |
| P3 | Hectare thresholds — **10 ha** forest, **0.1 ha** plantation, **10 ha** captive plantation | D3 |
| P4 | Unit capacity thresholds — ≤500 / 501–1000 / 1001–2000 / >2000 kg or >20 vessels | D2 |

### `/research` — additions

| # | Section | Source |
|---|---|---|
| R1 | Conservation — IUCN critically endangered, CITES Appendix II, **NDF study by BSI, Feb 2024** | N1 |
| R2 | Market overview — 7.7% CAGR, $44.05bn → $64bn; pricing table | N1 |
| R3 | Export quota — **79%**, 1.194 lakh kg chips, 5,560 kg oil | N1 |
| R4 | Trade statistics 2017–2021 — 142 t imported, 141 t re-exported; 74% / 92% eastern share | N1 |

### `/press` — additions

| # | Section | Source |
|---|---|---|
| X1 | **Press archive** — 3 clippings with publication, date, byline, headline | N1, N2, N3 |
| X2 | **Press-meet feature** — video + trilingual transcript, syncable | v1, v2, N3 |
| X3 | The **English statement** as quotable AATMA text | v2 §9:34 |

---

## Part 4 — Charts to add

| # | Chart | Data | Source | Route |
|---|---|---|---|---|
| CH1 | **Timeline density chart** — events per era (1905–2026) | History timeline data | site | `/history` |
| CH2 | **Tree population by district** — bar chart, Golaghat 4.5 cr, Jorhat, Sivasagar, Karimganj, Cachar | N1 | `/research` |
| CH3 | **State comparison** — Assam 11.437 cr vs Tripura 1.515 cr | N1 | `/research` |
| CH4 | **Market growth** — $44.05bn (2023) → $64bn (2029), 7.7% CAGR | N1 | `/research` |
| CH5 | **Export quota split** — Assam 79% vs rest of India 21% | N1 | `/policy` |
| CH6 | **Trade flow 2017–21** — 142 t imported vs 141 t re-exported; eastern share 74%/92% | N1 | `/research` |
| CH7 | **Price ranges** — chips Rs 10k–3 lakh/kg; oil Rs 6k–17,500/tola | N1 | `/research` |
| CH8 | **Primary WBI decline** — 588 → 206 (−66%) | N2 | `/policy` |
| CH9 | **Advocacy timeline gantt** — 23 years, 5 governments, key representation dates | D1, v2 | `/history` |

**Chart approach:** SVG via the existing `MicrobialDataViz` pattern. All charts need a **"Source: <publication>, <date>"** label and, where the data is a press estimate rather than AATMA's own, an explicit marker.

---

## Part 5 — New SVG files

| # | File | Route | Purpose |
|---|---|---|---|
| S1 | `history/sanchi-paat-manuscript.svg` | `/history` | *Sanchi paat* as writing material — H1 |
| S2 | `history/trade-journey-map.svg` | `/history` | 1905→Bombay route map with 8 stops — H3 |
| S3 | `history/far-east-import-routes.svg` | `/history` | Malaysia/Indonesia/Thailand/Cambodia → Hojai — H4 |
| S4 | `history/advocacy-gantt.svg` | `/history` | 23-year, 5-government struggle — CH9 |
| S5 | `policy/lpc-vs-origin-flow.svg` | `/policy` | LPC (FORM- XXV) vs Certificate of Origin decision flow — P2 |
| S6 | `policy/registration-timeline.svg` | `/policy` | 62-day / 74-day processing windows — P1 |
| S7 | `research/tree-population-by-district.svg` | `/research` | CH2 |
| S8 | `research/market-growth.svg` | `/research` | CH4 |
| S9 | `research/export-quota.svg` | `/research` | CH5 |
| S10 | `research/trade-flow.svg` | `/research` | CH6 |
| S11 | `press-meet/press-meet-banner.svg` | `/press-meet-2023` | Reproduce the actual banner text |

**All SVG must:** use design tokens (`var(--color-…)`, no raw hex), carry `role="img"` + `aria-label`, and include a visible source citation.

---

## Part 6 — New images to create

| # | File | Route | Description | Method |
|---|---|---|---|---|
| I1 | `history/hero-banner-v2.jpg` | `/history` | Wider hero — *sanchi paat* + agarwood | MAI Image |
| I2 | `history/sanchi-paat-manuscript.jpg` | `/history` | Aged manuscript on bark | MAI Image |
| I3 | `history/founders-1976.jpg` | `/history` | Documentary-style 1976 Hojai office | MAI Image |
| I4 | `history/early-trade-route.jpg` | `/history` | Period river/road trade scene | MAI Image |
| I5 | `history/far-east-port.jpg` | `/history` | Import era, dockside, Southeast Asia | MAI Image |
| I6 | `history/seminar-2000.jpg` | `/history` | Conference hall, Administrative Staff College | MAI Image |
| I7 | `history/critical-era-hardship.jpg` | `/history` | Roadside seizure / checkpoint scene | MAI Image |
| I8 | `history/victory-2023.jpg` | `/history` | Gazette notification, celebratory | MAI Image |
| I9 | `research/conservation.jpg` | `/research` | Agar tree in habitat, wild | MAI Image |
| I10 | `research/market-perfumery.jpg` | `/research` | Perfumery / distillation | MAI Image |
| I11 | `press-meet/press-meet-2023-hero.jpg` | `/press-meet-2023` | The press meet itself | Frame grab from v1/v2 |
| I12 | `press-meet/aatma-head-office.jpg` | `/press-meet-2023` | Head office, Main Road Hojai | MAI Image |

**Method:** MAI Playground `mai-image-2-6-flash` (proven working). Convert each to **AVIF/WebP/PNG** with `<picture>` + `srcset`, and route all paths through `assetUrl()` for the GitHub Pages subpath.

**Frame grabs already available** (I11 candidates): `scratch/client_videos/frame_v1_*.png`, `frame_v2_*.png`.

---

## Part 7 — Gates and blockers

| Gate | What | Blocks |
|---|---|---|
| **GATE A** | Read N4 (4th WhatsApp image, 76 KB) — vision 429 | Final press-archive scope |
| **GATE B** | Finish gazette read — D2 pp. 620–682, D3 pp. 3–25 | "77 species", "5 km", 62/74-day re-sourcing |
| **GATE C** | Resolve conflicts C1–C4 | History timeline accuracy |
| **GATE D** | Confirm Speaker 2 = Ataur Rahman | Any named quote attribution |
| **GATE E** | Decide video hosting (125 MB total) | `/press-meet-2023` route |
| **GATE F** | Confirm *Thymelaeaceae* family wording | H1 botanical line |

---

## Part 8 — Recommended Kanban triage batches

### Batch A — History depth from D1 *(no gates)*
H1, H2, H3, H4, H5, H7, H8, H9 + S1, S2, S4 + I2, I3
**Highest value per card.** D1 is fully read; nothing blocks it.

### Batch B — Research content from N1 *(no gates)*
R1, R2, R3, R4 + CH2, CH3, CH4, CH5, CH6, CH7 + S7, S8, S9, S10 + I9, I10
**One source, nine deliverables.**

### Batch C — Policy precision from D2/D3/N2 *(Rule 2 verified)*
P1, P2, P3, P4 + S5, S6
Ship with newspaper citation for procedure, gazette for definitions.

### Batch D — Press & media *(GATE A)*
X1 + press archive section
Needs N4 read.

### Batch E — Press-meet video *(GATES D, E)*
X2, X3, `/press-meet-2023` route + S11, I11, I12
Needs speaker confirmation and hosting decision.

### Batch F — Close the gates *(no gates)*
GATE B gazette read, GATE A image read, GATE C conflict resolution
Run concurrently with A/B/C.

### Batch G — Charts *(depends on their sections)*
CH1, CH8, CH9 after A; CH2–CH7 after B.

---

## Part 9 — Effort and sequencing

| Batch | Cards | Gate | Parallel-safe |
|---|---|---|---|
| **A** — History depth | 13 | none | ✅ |
| **B** — Research content | 17 | none | ✅ |
| **C** — Policy precision | 6 | none | ✅ |
| **F** — Close the gates | 3 | none | ✅ |
| **D** — Press archive | 2 | A | ⏳ |
| **E** — Video feature | 5 | D, E | ⏳ |
| **G** — Charts | 9 | A, B | ⏳ |

**Recommended dispatch:** launch **A, B, C and F in parallel immediately** — 39 cards, zero gates. D and E follow once their gates close. G follows A and B.

**Fastest visible win:** Batch A section H2 (founding fathers) — nothing on the site has it, D1 is fully read, and it needs one image and no charts.

---

## Part 10 — Documentation status

| Document | Status |
|---|---|
| `docs/AGAR_HISTORY_SOURCE.md` | ✅ **NEW** — D1 fully extracted and structured |
| `docs/CLIENT_MATERIAL_RESEARCH.md` | ✅ Complete — all items 1–8 |
| `docs/IMPLEMENTATION_PLAN.md` | ✅ Superseded by this plan (kept for reference) |
| `docs/TRANSCRIPT_…-EN.md` / `-HI.md` | ✅ Complete — trilingual |
| `docs/PRD.md`, DESIGN_SYSTEM, ARCHITECTURE, CODE_STYLE, TESTING, DATABASE, SECURITY | ✅ Exist — **need updating once Batch A lands** |
| `docs/GAZETTE_RULES_SUMMARY.md` | ❌ Missing — blocked by GATE B |
| `docs/PRESS_ARCHIVE_INDEX.md` | ❌ Missing — blocked by GATE A |

---

## What I did not do

- **No code written.** Planning only, per your instruction.
- **No Kanban cards created.** This document is the input for triage.
- **N4 unread** (vision rate limit) — carried as GATE A, not guessed.
- **Gazette Rules 3+ unread** — carried as GATE B. Every claim here traces to either a gazette page I read, a named newspaper article, or the history PDF.
- **No speaker identity assumed.** Speaker 2 is very likely Ataur Rahman, but that stays inference until confirmed.
- **The 4 conflicts in Part 1 are flagged for your decision**, not silently reconciled.
