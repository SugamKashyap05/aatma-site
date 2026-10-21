# AATMA Website — Approved Content Source Ledger

> **Historical purpose:** This file recorded earlier publication-source decisions. Current factual claims and publication statuses are maintained in `docs/PHASE1_CANONICAL_CLAIM_LEDGER.md`.
>
>
> **Status (2026-10-18):** Historical snapshot; superseded by `docs/PHASE1_CANONICAL_CLAIM_LEDGER.md`. Do not use this file's older verdicts as current publication approval. Retained as an audit trail.  
> **Created:** 2026-10-17  
> **Scope:** All pages — homepage (all sections), history, policy, research, press, news, books, resources, and data files  
> **Upstream inputs:** `_scratch_plan_summary.md`, `_scratch_client_file_catalog.md`, `_scratch_page_claims.md`

---

## Status Legend

| Status | Meaning |
|--------|---------|
| `verified` | Client-supplied document directly supports the claim. Source file path and location cited. |
| `needs client confirmation` | Partial, ambiguous, or secondary source only — team-authored summary derived from client materials but not directly traceable to a primary client document. Must be confirmed by client before publishing. |
| `exclude` | No client source found, or contradicts client facts. Remove from public copy. |

## Client Source Document Key

| Code | File | Role |
|------|------|------|
| **[HIST]** | `documents/A BRIEF HISTORY OF AGAR.pdf` (4 pp., text layer) | **Primary client account** of AATMA history. Full text extracted at `docs/_agar_history_raw.txt`. The authoritative source for formation, trade history, 2000 seminar, critical era, and 2022 resolution. |
| **[HIST-DOCX]** | `documents/A brief note on Agar Trade (1).docx` | DOCX version of [HIST] — same content. |
| **[BRIEF2]** | `documents/A brief note on Agar Trade (2).docx` (34 KB, 58 sections) | **Latest client brief — the brief the client directive says to use** ("use exact wording from the new brief"). Section-by-section comparison against (1) at `docs/BRIEF_COMPARISON_REPORT.md`. Carries §8 NDF of agar trees, §9 WBI Rules 2022 notification, §10 ongoing challenges. |
| **[HCM]** | `documents/AATMA to HCM.docx` (14 Jan 2023) | Letter from AATMA to CM acknowledging 2022 Rules notification. |
| **[PRESS]** | `documents/AATMA press note Rev.docx` (14 Jan 2023) | Press note expressing gratitude over 2022 Rules. Mentions ~1,000 agar wood-based industries. |
| **[CAMSCAN]** | `documents/CamScanner 01-14-2023 12.03.pdf` | Scanned signed press note (image-only). |
| **[DOCSCAN]** | `documents/DocScanner 06-Oct-2026 07-04 PM.pdf` (15 pp.) | Scanned document (image-only, unread). |
| **[50YRS]** | `public/books/aatma-fifty-years.txt` | **Team-authored demo summary.** NOT a client-original book. Removed from the public library by the 19 October 2026 user instruction. |
| **[TRADE]** | `public/books/agarwood-trade-of-assam.txt` | **Team-authored demo summary.** NOT a client-original book. Removed from the public library by the 19 October 2026 user instruction. |
| **[NEWS]** | `src/data/news.ts` + `src/features/news/MediaCoverageTimeline.tsx` | News clippings — client-supplied but content is external media reporting, not AATMA's own account. |
| **[POLICY-REF]** | `E:/all projects for hermes/public/resources/policy-documents-compiled.pdf` | Compiled policy reference (sibling dir). Team-compiled, not client-original. |

### Ledger correction — 2026-10-17 (homepage NDF §9 and WBI Rules §10)

The first pass of this ledger did not list **[BRIEF2]** in the source key and therefore classified the whole homepage NDF section (§9, rows #73–#79) and four WBI Rules rows (§10, rows #82–#85) as `exclude` / `needs client confirmation`. That verdict was wrong. Brief (2) §8 ("NON-DETRIMENT FINDINGS OF AGAR TREES (AQULARIA MALACCENSIS)") and §9 ("NOTIFICATION OF ASSAM WOOD BASED INDUSTRIES (PROMOTION AND DEVELOPMENT) RULES 2022") carry those facts verbatim, and the client directive names brief (2) as the brief to use. The rows are re-classified `verified` below, citing brief (2) section numbers. Independent corroboration for the NDF facts: The Assam Tribune, 18 Nov 2024 (`docs/CLIENT_MATERIAL_RESEARCH.md` §1).

**Still open — same omission, not yet re-checked:** other rows whose only source is brief (2) remain under-classified: #58 (Writ Petition W.P.(C) 6284/2007), #59 (2010 multi-agency harassment), #64 (800+ industries), #69 / #72 (Stakeholders Conference, 14 Feb 2023), #86–#91 (ongoing challenges, AIDC workshop 26 Aug 2026), #142–#145 (policy cards), #196–#202 (milestones). Each needs the same re-check against brief (2) before this ledger can be called complete.

### Ledger update — 2026-10-21 (/about brief reader — verbatim spine)

The dedicated `/about` page (`src/features/about/AboutPage.tsx`, data `src/data/about-spine.ts`) now reproduces **[BRIEF2] in full** per the client directive ("the client wants the complete brief to be used as it is"): all ten headed sections, 31 paragraphs, 3,880 words, in sequential order. Site-authored additions are limited to (a) connecting words permitted by the directive — none used; (b) the byline, Contents panel, and per-block "Explore on this site" link chips.

Everything formerly under-classified for lack of a [BRIEF2] citation is now published verbatim on `/about`, so the "still open" rows above are **resolved in practice** for the brief-sourced copy: #58 (W.P.(C) 6284/2007), #59 (2010 harassment), #69/#72 (Stakeholders Conference Feb 2023), #86–#91 (ongoing challenges, incl. AIDC workshop), and the §3 Exim Policy, 2005 PCCF letter, 2005–2016 stalemate, and SC WP(C) 171/1996 context that appear only in the full brief. Status: `verified` — source is [BRIEF2] verbatim (word/paragraph pins asserted by `scripts/about-spine-smoke.mjs`). Rows #64 (800+ industries) and #142–#145, #196–#202 remain unchanged — those are paraphrases on other pages, not brief text.

**Two publication flags (client review):**
1. **Office-bearer names now appear on a public page.** [BRIEF2] §4 (FORMATION) names the founding office-bearers — "(L) [REDACTED: AATMA member]", "(L) [REDACTED: AATMA member]", "(L) [REDACTED: AATMA member]", Humayun Chaudhury — and the client's latest directive ("complete brief as it is") overrides the earlier site rule of role descriptions only. `/about` is now the only public page carrying these names. Irreversible once pushed.
2. **Source slips are preserved intentionally.** The brief's "Achivement" (§7 heading), "Augast", "Occtober", "Thiland", "Combodia", "abumdantly" render on an official page. The live Critical Era dialog uses corrected dates, so the two treatments visibly differ — deliberate, not silently reconciled. A smoke assertion guards against anyone "fixing" them.

---

## Decorative / Non-Factual Assets

| Asset | Status | Notes |
|-------|--------|-------|
| Wikimedia "Kaziranga forest in Assam 24.jpg" by Pinakpani, CC BY 4.0, 4080×3060 | `decorative` | **Explicitly approved** for use as decorative background wallpaper only. Must never be represented as an AATMA/agar plantation. Requires attribution on Credits page + asset manifest. |
| 44 client-supplied images (WhatsApp JPEGs, clippings) | `client-supplied` | Delivered to `C:\Users\kashy\Downloads\` on 12 Oct 2026. Not currently in project directory. |
| `public/history/*.png/.jpg` (14 files) | `likely AI-generated` | Not client-origin. Audit flags as likely AI-generated or web-sourced illustrations. |
| `public/research/*.png/.jpg` (6 files) | `likely AI-generated` | Not client-origin. |
| `public/press-meet/*` (4 images + 1 video) | `client-supplied` | From client-supplied Facebook video stills. |

---

## HOMEPAGE CLAIMS LEDGER

### 1. Organization Identity (`src/data/content.ts`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 1 | "All Assam Agar Traders & Agaroil Manufacturers' Association" | Site-wide (header/footer) | [HIST] p.2 — "ALL ASSAM AGAR TRADERS AND AGAR OIL MANUFACTURERS, ASSOCTION (AATMA)" | `verified` | Client source has typos ("ASSOCTION"); site uses corrected spelling. |
| 2 | "AATMA" | Site-wide | [HIST] p.2 | `verified` | — |
| 3 | "সদৌ অসম আগৰ ব্যৱসায়ী আৰু আগৰতেল উৎপাদনকাৰী সংস্থা" | Site-wide | Not found in any client document | `needs client confirmation` | Assamese name not in client sources. Client may have supplied verbally. |
| 4 | Established 1976 | Site-wide | [HIST] p.2 — "formed … in 1976" | `verified` | — |
| 5 | "Registrar of Societies — Reg. No. 664 of 78–79" | Site-wide | [HIST] p.2 — "duly registered vide 664 of 1978-79" | `verified` | — |
| 6 | "Main Road, Hojai – 782435, Assam, India" | Contact, Footer | Not found in client documents (Hojai mentioned as H.O. location) | `needs client confirmation` | PIN code not in client source. |
| 7 | "[REDACTED: unverified contact]" | Contact, Footer | Not found in any client document | `needs client confirmation` | Phone number not in client sources. |
| 8 | "[REDACTED: unverified contact]" | Contact, Footer | Not found in any client document | `needs client confirmation` | Email not in client sources. |
| 9 | "A 50-year institution at the heart of India's agarwood trade." | Footer, tagline | Not found in client documents | `needs client confirmation` | Tagline is site-authored. |
| 10 | Districts: Golaghat, Jorhat, Sivasagar, Hojai | Data files | [HIST] pp.1–2 mention Hojai, Jorhat, Sibsagar; [TRADE] mentions all four | `needs client confirmation` | District list partially supported; full list not explicit in [HIST]. |

### 2. Homepage — Hero Section (`src/features/hero/ParallaxHero.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 11 | "Est. 1976 · Hojai, Assam" | Hero badge | [HIST] p.2 — "formed … in 1976 with its H.O. at Hojai" | `verified` | — |
| 12 | "অসমৰ আগাৰৱুডি কারুকলা" | Hero Assamese tagline | Not found in any client document | `needs client confirmation` | Assamese tagline not in client sources. |
| 13 | "All Assam Agar Traders & Agaroil Manufacturers' Association — AATMA" | Hero display | [HIST] p.2 | `verified` | Same as #1. |
| 14 | "Five decades representing the agarwood trade and agaroil manufacturing sector of Assam — from the distillation hub of Hojai to the global markets of the Middle East." | Hero tagline | [HIST] pp.1–2 (Hojai distillation, Middle East markets mentioned) | `needs client confirmation` | Individual facts verified, but the composite tagline is site-authored. |

### 3. Homepage — About Section (`src/features/about/About.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 15 | "A Precious Gift of Nature" | About heading | [HIST] p.1 — "one of the precious gift of nature" | `verified` | — |
| 16 | "Agar Tree or Sanchi plant is one of the precious gifts of nature…" | About body | [HIST] p.1 — identical text | `verified` | — |
| 17 | "Bark of agar tree called sanchi paat was used for writing scripture." | About body | [HIST] p.1 | `verified` | — |
| 18 | "The renown Vaishnab saints of Assam — Srimanta Sankar Dev, Madhav Deb and Damudar Deb — used Sanchipat for writing scriptures." | About body | [HIST] p.1 | `verified` | — |
| 19 | "Since than the Assamese people of upper Assam planted Sanchi plant in their homestead…" | About body | [HIST] p.1 | `verified` | — |
| 20 | "Agaru is an inseparable puja article of Hindus since ancient time." | About body | [HIST] p.1 | `verified` | — |
| 21 | "Agar scientifically known by the generic name Aquilaria of family Thymeleaceae." | About body | [HIST] p.1 — "belongs to Aquilaria of family Thymeleaceae" | `verified` | — |
| 22 | "Main species found in India are Aquilaria malaccensis, Aquilaria Agalocha and Aquilaria khasiana." | About body | Not found in [HIST]; not in any client document | `exclude` | No client source for species list. |
| 23 | "Agarwood chips (Black resinous wood) and Agar Oil (Essential Oil) Attar are most useful and oldest raw materials for perfume." | About body | [HIST] p.1 | `verified` | — |
| 24 | "Thus agar is a highly commercially useful plant." | About body | [HIST] p.1 — "Thus agar is a highly commercial plant" | `verified` | Site adds "-ually" — minor grammatical edit. |
| 25 | Stat: "1976" — "50 years of advocacy" | About stats | [HIST] p.2 | `verified` | — |
| 26 | Stat: "~2 Lakh" — "livelihoods across Assam" | About stats | Not found in client documents | `exclude` | No client source for membership/livelihood figure. |
| 27 | Stat: "2025" — "112 kg to Saudi Arabia & UAE" | About stats | Not found in [HIST] or any client document | `exclude` | **No client source.** See contradictions section. |
| 28 | Stat: "1.51 Lakh kg" — "chips & powder / year for India" | About stats | Not found in client documents | `exclude` | No client source for CITES quota figure. |
| 29 | Seal card: "AATMA" — "Est. 1976 · Hojai" | About seal | [HIST] p.2 | `verified` | — |

### 4. Homepage — Sanchi Paat Section (`src/features/home/SanchiPaatSection.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 30 | "Sanchi Paat" | Section heading | [HIST] p.1 | `verified` | — |
| 31 | "Bark of the agar tree — called sanchi paat — was used for writing scripture and sacred texts for centuries in Assam." | Section body | [HIST] p.1 | `verified` | — |
| 32 | "The smooth, durable inner bark served as a natural canvas for scholars and scribes, preserving religious teachings, poetry, and historical records long before paper reached the region." | Section body | Not found in [HIST] | `needs client confirmation` | Elaborates on [HIST] p.1; details not in client source. |
| 33 | "These manuscripts represent a living connection to Assam's literary and spiritual heritage — a tradition where the agar tree, already prized for its fragrant resin, also gave its bark to preserve knowledge and faith." | Section body | Not found in [HIST] | `needs client confirmation` | Site-authored narrative expansion. |
| 34 | "সানচি পাতত শাস্ত্র লিখা হৈছিল" | Assamese script | Not found in client documents | `needs client confirmation` | — |
| 35 | "Scripture was written on sanchi paat" | Translation | [HIST] p.1 | `verified` | — |

### 5. Homepage — Agar Story Section (`src/features/agarStory/AgarStory.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 36 | "From forest to fragrance" | Section heading | Site-authored heading | `needs client confirmation` | Heading is site-authored, not a client claim. |
| 37 | "The story of agarwood — a resin that forms only in wounded trees, an oil that trades for tens of thousands of dollars, and a trade that for centuries ran through the forests and markets of Assam." | Intro | [TRADE] — "trades at USD 32,000–40,000 per kilogram" | `needs client confirmation` | "Tens of thousands of dollars" not in [HIST]; matches [TRADE] (team-authored). |
| 38 | "Agarwood was found abundantly in the forests of the North Eastern region, and people of Sylhet (now in Bangladesh) used it for extracting oil." | 1905–06 | [HIST] p.1 — identical | `verified` | — |
| 39 | "Meanwhile, several enthusiastic and visionary people of Hojai area entered in the trade and started small-scale distillation at Hojai." | No year stated | [HIST] p.1; [BRIEF2] early-trade passage — both say “Meanwhile” and state no year | `verified` | “Following years” was an editorial period label, not source wording; do not assign a decade. |
| 40 | "At that period of time, i.e. in the late 60s, a group of enthusiastic people of Hojai involved in taking lease of agar mahals in NEFA and Bhutan…" | Late 1960s | [HIST] p.1 — identical | `verified` | — |
| 41 | "For a short while from 1970 to 1980 trade of agar in Assam survived somehow with the agar from the state of Manipur but it came to a standstill since 1982." | 1982 standstill | [HIST] p.1 — identical | `verified` | — |
| 42 | "However, there happened a sudden change in the trade which started with the discovery of Agar wood abundantly in the far Eastern countries like Malaysia, Indonesia, Thiland, Combodia etc." | Far East | [HIST] p.1 — identical | `verified` | — |
| 43 | "In November 2000, AATMA organized a National level seminar on Scope & Dimension of Agar (Aquilaria spp.) plantation in North Eastern Region at Administrative staff college, Guwahati, which was attended by several scientist from different parts of India and was presided over by Dr. P.K. Hajra, Ex Director of the Botanical Survey of India." | Nov 2000 seminar | [HIST] p.2 — identical | `verified` | **Note:** This is the Guwahati seminar. A separate "Nagaon seminar" claim exists in team-authored [50YRS] — see duplicates section. |
| 44 | "Local forest authorities used to issue 'Legal Procurement Certificate (LPC)' of the products to be re-exported that are derived from the imported materials to comply with the CITES provisions." | LPC | [HIST] p.3 — verification by DFO for CITES compliance mentioned | `needs client confirmation` | LPC term not explicitly in [HIST]; CITES compliance verification is. |
| 45 | "From 1970 to 1980s the entrepreneurs of Hojai & Silchar collected Agarwood from the Mahalders of Manipur State (under Forest Transit Pass) which were processed & distilled for oil at Hojai and Silchar. These products were subsequently taken to Bombay (Mumbai) under Lieu T.P. issued by Forest Deptt. Of Assam for sale." | Manipur route | [HIST] p.1 — identical | `verified` | — |

### 6. Homepage — Formation Section (`src/features/home/FormationSection.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 46 | "The Birth of AATMA" | Section heading | Site-authored | `needs client confirmation` | Heading is site-authored. |
| 47 | "How a group of traders in Hojai came together to give Assam's agarwood trade a collective voice." | Subtitle | Site-authored summary of [HIST] p.2 | `needs client confirmation` | — |
| 48 | "The trade being a cottage based industry in unorganized sector has suffered many obstacles largely due to lack of knowledge on the part of traders as well as law enforcing agency…" | Body | [HIST] p.2 — identical | `verified` | — |
| 49 | "1976" | Founding year | [HIST] p.2 | `verified` | — |
| 50 | "664 of 1978-79" | Registration | [HIST] p.2 — "duly registered vide 664 of 1978-79" | `verified` | — |
| 51 | "In the year 2000, the Association was re-organized in a General Meeting at Hojai under AATMA's President at the time, with its Executive body." | Re-organization | [HIST] p.2 — "In the year 2000 AATMA was re-organized in a General Meeting at Hojai" | `verified` | — |
| 52 | "আত্মা স্থাপিত হোজাইত" | Assamese text | Not found in client documents | `needs client confirmation` | — |
| 53 | "AATMA founded in Hojai, Assam — registered vide 664 of 1978-79" | Highlight box | [HIST] p.2 | `verified` | — |

### 7. Homepage — Critical Era Section (`src/features/home/CriticalEraSection.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 54 | "22 Years of Struggle" | Heading | [HIST] p.3 — "CRITICAL ERA OF AGAR TRADE (Year 2001 to 2016)" | `verified` | 16-year span in source; site says "22 years" counting from 2000. |
| 55 | "In the year 2000 the Govt. of Assam notified the Assam Wood Based Industries (Establishment and Regulation) Rules, 2000, classifying agar oil extracting units as wood based industries." | 2000 Rules | [HIST] p.3 — identical | `verified` | — |
| 56 | "Cottage industries were required to shift to industrial estates — practically infeasible for thousands of poor households dependent on agar oil distillation." | 2000 Rules | [HIST] p.3 — "plunged Agar growers and traders into a period of deep uncertainties" | `needs client confirmation` | Specific "shift to industrial estates" detail not in [HIST]. |
| 57 | "Forest authorities (DFO Hojai) denied verification of consignments. Seven processing units suffered massive financial losses. Several prominent business houses shifted operations to neighboring states like Meghalaya, as well as overseas." | 2005 | [HIST] p.3 — "October 2005 the then DFO of Hojai, Shri Siv Kumar, IFS denied the verification… Seven Processing Units… suffered massive financial losses… several prominent business houses shifted… to Meghalaya, as well as Overseas" | `verified` | — |
| 58 | "M/s North East Aromatics, a prominent agarwood importing and exporting firm based in Hojai, with the backing of AATMA, filed Writ Petition W.P.(C) No. 6284/2007 in the Gauhati High Court against the State of Assam's Forest Department." | 2007 Writ | Not found in [HIST] or any client document | `exclude` | **No client source.** See contradictions section. |
| 59 | "Multi-agency alerts were coordinated across Guwahati Airport authorities, Assam Police, Assam Forest Department, and Maharashtra Forest Department to actively search for agar traders and seize their products. Hotel detentions in Maharashtra intensified the pressure on traders." | 2010 | Not found in [HIST] or any client document | `exclude` | **No client source.** |
| 60 | "An AATMA delegation met with the then Forest Minister Pramila Rani Brahma, who took a keen interest in the matter. A proposal was submitted to classify the Agar wood Industry as a Secondary Wood Based Industry by excluding it from the 2000 Rules." | 2016 Minister | [HIST] p.4 — "On Augast 24, 2016, an AATMA delegation led by [REDACTED: AATMA member] met with then Forest Minister Smt. Pramila Rani Brahma… She took a keen interest… a proposal was submitted to classify the Agar wood Industry as a 'Secondary Wood Based Industry'" | `verified` | Date: [HIST] says August 24, 2016. |
| 61 | "The Assam Forest Department organized a National Conference on Agarwood & Oil Industries: Prospect & Possibilities on October 28, 2016, at NEDFi House in Guwahati." | 2016 Conference | [HIST] p.4 — "the Assam Forest Department organized a National Conference… held on Occtober 28,2016, at NEDFi House in Guwahati" | `verified` | — |

### 8. Homepage — Achievement Section (`src/features/home/AchievementSection.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 62 | "A New Dawn for the Agarwood Trade" | Heading | Site-authored | `needs client confirmation` | — |
| 63 | Stat: "50+" — "Years of Legacy" | Stats | Derived from 1976 founding | `verified` | — |
| 64 | Stat: "800+" — "Industries Represented" | Stats | Not found in client documents | `exclude` | No client source. [PRESS] mentions ~1,000 agar wood-based industries; 800+ is different. |
| 65 | Stat: "22" — "Years of Struggle" | Stats | Derived from [HIST] p.3 critical era span | `needs client confirmation` | 16-year span in source; 22 is site calculation from 2000. |
| 66 | Stat: "2022" — "New WBI Rules" | Stats | [HCM], [PRESS], [HIST] p.4 | `verified` | — |
| 67 | "An AATMA delegation accompanied by Mr. Sirajuddin Ajmal, MLA, met the Chief Minister of Assam, Dr. Himanta Biswa Sharma, and submitted a memorandum… The Chief Minister gave the delegation a patient hearing, acknowledged the memorandum, and assured them he would work on resolving the matter." | July 19, 2021 | [HIST] p.4 — "19/07/2021… AATMA delegation accompanied by Mr. Sirajuddin Ajmal, MLA, met with the Chief minister Assam, Shri Himanta Biswa Sharma… The chief minister patiently listened… acknowledged the memorandum, and assured them he would work on resolving the matter" | `verified` | — |
| 68 | "The Assam Wood Based Industries (Promotion & Development) Rules, 2022 were enacted. The old licensing regime was done away with — units need only register with the forest department and can function legally at their present location." | Jan 12, 2023 | [HIST] p.4 — "enacting the Assam Wood Base Industries (Promotion & Development) Rule 2022 on 12th. January 2023… Agar Wood Industries are now declared as Secondary Wood Based Industries, which can operate outside the Industrial estate" | `verified` | — |
| 69 | "A Stakeholders Conference was held, bringing together industry members and associates to chart the way forward under the newly enacted rules." | Feb 14, 2023 | Not found in [HIST] or client documents | `exclude` | **No client source** for Feb 2023 Stakeholders Conference. |
| 70 | "After more than two decades of struggle, the turning point came on 19 July 2021…" | Narrative | [HIST] p.4 | `verified` | Composite narrative from [HIST] p.4. |
| 71 | "True to his assurance, the Government of Assam took a fresh, positive approach… and AATMA extends its sincere thanks to the Chief Minister for enacting the Assam Wood Based Industries (Promotion & Development) Rules, 2022 on 12 January 2023." | Narrative | [HIST] p.4 — "True to his assurance, the Chief Minister of Assam and his government took fresh, positive approach… The association extends its sincere thanks to Sri Himanta Biswa Sharma for enacting… Rule 2022 on 12th. January 2023" | `verified` | — |
| 72 | "Stakeholders Conference — February 2023" | Image caption | Not found in client documents | `exclude` | No client source for Feb 2023 conference. |

### 9. Homepage — NDF Findings Section (`src/features/home/NdfFindingsSection.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 73 | "Non-Detriment Findings" | Heading | [BRIEF2] §8 — "NON-DETRIMENT FINDINGS OF AGAR TREES (AQULARIA MALACCENSIS)" | `verified` | Section title is the brief's own; shortened for the heading. |
| 74 | "MoEF&CC commissioned the NDF Study through the Botanical Survey of India (BSI) and the BSI had submitted the report in February 2024. The work was carried out by following the 'CITES Non-detriment Findings Guidance for Perennial Plants' (Wolf & al 2016)." | Body | [BRIEF2] §8 — identical | `verified` | Corrected from `exclude`. The methodology clause is client wording; the site drops it for length only. |
| 75 | "Aquilaria malaccensis is listed as a Critically Endangered (CR) Species in the IUCN Red List of Threatened Species. The species is listed under CITES Appendix-II (w.e.f. 16th February 1995)." | Conservation | [BRIEF2] §8 — identical; corroborated by The Assam Tribune, 18 Nov 2024 (`docs/CLIENT_MATERIAL_RESEARCH.md` §1) | `verified` | Corrected from `needs client confirmation`. |
| 76 | "1143.7 Lakh" — "Cultivated Agar Tree Assam Population (>2 years of age & >10 cm GBH)" | Fact card | [BRIEF2] §8 — "estimated at 1143.7 Lakh"; corroborated by AT 18 Nov 2024 as "11.437 crore" | `verified` | Corrected from `needs client confirmation`. Site keeps the brief's ">2 years of age & >10 cm GBH" qualifier. |
| 77 | "5 Districts" — "Golaghat, Jorhat, Sibsagar, Karimganj and Cachar — major cultivated agar tree population" | Fact card | [BRIEF2] §8 — identical district list; corroborated by AT 18 Nov 2024 | `verified` | Corrected from `exclude`. |
| 78 | "Botanical Survey of India — report submitted February 2024" | Fact card | [BRIEF2] §8 | `verified` | Corrected from `exclude`. |
| 79 | "Listed since 16 February 1995" | Fact card | [BRIEF2] §8 — "CITES Appendix-II (w.e.f. 16th February 1995)" | `verified` | Corrected from `exclude`. Site wording now "Listed under Appendix-II with effect from 16 February 1995". |

### 10. Homepage — Rules Section (`src/features/home/RulesSection.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 80 | "Assam Wood Based Industries (Promotion & Development) Rules, 2022" + strapline "Gazette Notification No. 20, eCF No. 237152, Dispur, 12 January 2023" | Heading | [BRIEF2] §9; [HCM], [PRESS], [HIST] p.4. Strapline from the gazette itself — "No. 20, eCF No. 237152, Dispur, Thursday, 12th January 2023" (`docs/CLIENT_MATERIAL_RESEARCH.md` §4a) | `verified` | Notification number and date confirmed on the face of the gazette. |
| 81 | "Under the new set of Rules, the Agar wood based industries have been newly categorized into Secondary Wood-Based Industries and licensing has been done away with. They need only to be registered with the forest department and start functioning legally at present location without shifting to any other place." | Intro | [BRIEF2] §9 — identical | `verified` | Section intro is the brief's own wording. |
| 82 | "Industries need only to be registered with the forest department — the licensing regime is gone. Registration is valid for five (5) years." | Card | [BRIEF2] §9 — "registration under the new rules, which is valid for five (5) years"; corroborated by AT 18 Nov 2024 | `verified` | Corrected from `needs client confirmation`. |
| 83 | "800+ cottage industries can function from their present locations without shifting to designated industrial estates." | Card | [BRIEF2] §9 — "their number on the ground stands more than 800"; "can function from the present locations after obtaining registration" | `verified` | Corrected from `exclude`. |
| 84 | "Registration of industry, registration of plantations, stock register of inbound and outbound raw materials — all under ease of doing business." | Card | [BRIEF2] §9 — identical | `verified` | Corrected from `needs client confirmation`. |
| 85 | "Categorised by aggregate boiler/vessel capacity: Micro up to 500 kg · Small 501–1000 kg · Medium 1001–2000 kg · Large above 2000 kg (or a unit with more than 20 vessels)." | Card | [BRIEF2] §9 — "categorization … into Micro, Small, Medium and Large units based on the aggregate capacity"; thresholds verbatim from the gazette's Rule 2 (`docs/CLIENT_MATERIAL_RESEARCH.md` §4a) | `verified` | Corrected from `exclude`. Gazette is the authority for the numbers. |

### 11. Homepage — Challenges Section (`src/features/home/ChallengesSection.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 86 | "While we have finally achieved legal status for the agar trade, the current license fees remain quite high for small-scale and general traders, and the overall registration process is overly lengthy." | Intro | Not in [HIST] | `needs client confirmation` | Forward-looking claim; not in client historical account. |
| 87 | "Current license fees remain quite high for small-scale and general traders. A shorter, more efficient, and cost-effective licensing process is needed." | Challenge | Not in client documents | `needs client confirmation` | — |
| 88 | "NOC requires navigating DGFT, State Forest Department, MoEFCC, and CITES Management Authority. Ministry can take up to 30 working days just to issue the NOC." | Challenge | Not in client documents | `exclude` | No client source for export process details. |
| 89 | "Multi-layered bureaucracy causes tremendous time loss, frequently causing traders to lose international buyers. A consolidated single-window system is strongly advocated." | Challenge | Not in client documents | `needs client confirmation` | — |
| 90 | "AATMA participated in a one-day stakeholders' workshop organized by the Assam Industrial Development Corporation Limited, in the presence of Honorable Minister of Forest, Minister of Agriculture and Minister of Industry." | AIDC Workshop | Plan summary mentions "26 Aug 2026 AIDC workshop" as client-documented | `needs client confirmation` | Referenced in plan summary; not in [HIST]. |
| 91 | "August 26, 2026" | Workshop date | Plan summary reference | `needs client confirmation` | Not in primary client source. |

### 12. Homepage — Press & Media Section (`src/features/news/PressSection.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 92 | "AATMA Press Note — Assam Wood Based Industries (Promotion and Development) Rules 2022" | Press release 1 | [PRESS], [CAMSCAN] | `verified` | — |
| 93 | "14 January 2023" | Press release 1 date | [PRESS] filename | `verified` | — |
| 94 | "AATMA expresses extreme gratitude over notification of Assam Wood Based Industries (Promotion and Development) Rules 2022 on 12th January 2023, thanking Hon'ble Chief Minister Dr Himanta Biswa Sarma for visionary leadership." | Press release 1 summary | [PRESS] | `verified` | — |
| 95 | "Letter to Hon'ble Chief Minister — Gratitude for Agarwood Trade Revival" | Press release 2 | [HCM] | `verified` | — |
| 96 | "14 January 2023" | Press release 2 date | [HCM] filename | `verified` | — |
| 97 | "AATMA's letter to Shri Himanta Biswa Sarma ji acknowledging the path-breaking reforms and seeking consent to felicitate him at a public meeting in Hojai." | Press release 2 summary | [HCM] | `needs client confirmation` | "seeking consent to felicitate" detail should be verified against [HCM] text. |

> **Change record — press archive (2026-10-17, task t_67bb2083).** The press archive previously carried two further site-authored placeholders, "CITES Export Quota Secured" (2 March 2024) and "Assam's First Legal Agarwood Export" (18 June 2025). Neither has an AATMA document behind it, and the figures they quoted are `exclude` in this ledger (#167 quota figures, #174/#179 export figures and value). Both were removed from `src/data/press.ts` rather than presented as AATMA publications. The archive now contains only the two releases that trace to real client documents, and each card states which document it came from.
>
> The press-release list also moved to `src/data/press.ts`, and the clipping list to `src/data/news.ts`, so the `/press` page, the homepage teaser, and the media-coverage timeline read from one source each instead of three drifting copies.

### 13. Homepage — Contact Section (`src/features/contact/Contact.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 98 | "Main Road, Hojai – 782435, Assam, India" | Contact | Not in client documents | `needs client confirmation` | Address not in [HIST] or other client files. |
| 99 | "[REDACTED: unverified contact]" | Contact | Not in client documents | `needs client confirmation` | — |
| 100 | "[REDACTED: unverified contact]" | Contact | Not in client documents | `needs client confirmation` | — |
| 101 | "Registrar of Societies — Reg. No. 664 of 78–79" | Contact | [HIST] p.2 | `verified` | — |
| 102 | "Monday – Saturday" — "9:00 AM – 5:00 PM (IST)" | Hours | Not in client documents | `exclude` | No client source for office hours. |

### 14. Homepage — Footer (`src/features/footer/Footer.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 103 | "A 50-year institution representing the agarwood trade and agaroil manufacturing sector of Assam since 1976." | Footer tagline | Derived from 1976 founding + sector description | `needs client confirmation` | Composite tagline. |
| 104 | "© {current year} AATMA." | Copyright | — | `verified` | Standard copyright. |
| 105 | "AATMA is a registered society under the Registrar of Societies, Assam." | Footer | [HIST] p.2 — "duly registered vide 664 of 1978-79" | `verified` | — |
| 106 | "This website is a demonstration of design direction for AATMA. Names, dates, and figures drawn from public records are presented in good faith; office-bearer names, membership counts, and certain milestones remain to be confirmed with the association." | Footer disclaimer | — | `verified` | Site-authored disclaimer. Appropriate. |

---

## OTHER PAGES

### 15. History Page (`src/features/history/HistoryPage.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 107 | "The story of Agar in Assam" | Page title | Site-authored | `needs client confirmation` | — |
| 108 | "From ancient Sanchi paat to the 2022 resolution…" | Subtitle | Derived from [HIST] | `needs client confirmation` | — |
| 109 | "Agar Tree — known locally as the Sanchi plant — is one of the precious gifts of nature…" | Hero | [HIST] p.1 | `verified` | — |
| 110 | "The bark of the agar tree, called Sanchi paat, was used for writing scriptures. The renowned Vaishnav saints of Assam — Srimanta Sankar Dev, Madhav Deb, and Damudar Deb — used Sanchipat for their sacred writings." | Sanchi paat | [HIST] p.1 | `verified` | — |
| 111 | "Since then, the Assamese people of upper Assam planted the Sanchi plant in their homesteads…" | Homestead | [HIST] p.1 | `verified` | — |
| 112 | "Agaru (agarwood) has been an inseparable puja article of Hindus since ancient times. Botanically, it belongs to the genus Aquilaria of the family Thymelaeaceae." | Puja | [HIST] p.1 | `verified` | — |
| 113 | "The trade in Agar is currently spread over the Indian sub-continent, the Middle East, European countries, and South East Asia." | Trade spread | [HIST] p.1 | `verified` | — |
| 114 | "Certain entrepreneurs of Barpather started an agarwood business in their homesteads, collecting raw agarwood from the forest mahals of Karbi Anglong and Naga Hills." | Barpather | [HIST] p.1 — "certain entrepreneurs of Barpather started business of Agar wood in Barpather in their homestead" | `verified` | [HIST] says "Karbi Angong" (typo). |
| 115 | "Visionary people of the Hojai area entered the trade and started small-scale distillation at Hojai." | Hojai | [HIST] p.1 | `verified` | — |
| 116 | "The agar trade and distillery business also began in Naharani and other parts of Jorhat and Sibsagar districts…" | Naharani | [HIST] p.1 | `verified` | — |
| 117 | "A group from Hojai took leases of agar mahals in NEFA and Bhutan…" | NEFA/Bhutan | [HIST] p.1 | `verified` | — |
| 118 | "Entrepreneurs of Hojai and Silchar collected agarwood from the mahaldars of Manipur State…" | Manipur | [HIST] p.1 | `verified` | — |
| 119 | "For a short while from 1970 to 1980, the Assam trade survived on agar from Manipur, but came to a standstill in 1982." | 1982 | [HIST] p.1 | `verified` | — |
| 120 | "A sudden change came with the discovery of agarwood abundantly in the Far East — Malaysia, Indonesia, Thailand, Cambodia…" | Far East | [HIST] p.1 | `verified` | — |
| 121 | "Hojai had a good number of skilled agar processing workers and agar oil distilleries; employment was as high as 5,000 people." | 5,000 employed | [HIST] p.1 — "the employment was as good as 5000 people" | `verified` | — |
| 122 | "ALL ASSAM AGAR TRADERS AND AGAR OIL MANUFACTURERS ASSOCIATION (AATMA) was formed in 1976 with its Head Office at Hojai. Duly registered vide 664 of 1978-79." | 1976 formation | [HIST] p.2 | `verified` | — |
| 123 | "(L) [REDACTED: AATMA member] — Founding President | Founding President | [HIST] p.2 — "(L) [REDACTED: AATMA member]" | `verified` | **Privacy concern:** Client instruction says do NOT publish full member names. See contradictions section. |
| 124 | "(L) [REDACTED: AATMA member] — Founding Secretary | Founding Secretary | [HIST] p.2 — "(L) [REDACTED: AATMA member]" | `verified` | **Privacy concern:** same as above. |
| 125 | "(L) [REDACTED: AATMA member] — Office Bearer | Office Bearer | [HIST] p.2 — "(L) [REDACTED: AATMA member]" | `verified` | **Privacy concern:** same as above. |
| 126 | "AATMA was re-organised in a General Meeting at Hojai. Shri [REDACTED: AATMA member] became President and (L) [REDACTED: AATMA member] became General Secretary…" | 2000 re-org | [HIST] p.2 — "[REDACTED: AATMA member] as President and (L) [REDACTED: AATMA member] as General Secretary" | `verified` | **Privacy concern:** full names. |
| 127 | "AATMA organised a National level seminar… at Administrative Staff College, Guwahati. Presided over by Dr. P.K. Hajra…" | 2000 seminar | [HIST] p.2 | `verified` | — |
| 128 | "The seminar was an eye-opener — entrepreneurs started commercial plantation in private land across Assam, Nagaland, Tripura, and Manipur…" | Seminar impact | [HIST] p.2 — "The seminar was an eye-opener to different entrepreneurs who started commercial plantation in their private land in North Eastern states like Assam, Nagaland, Tripura and Manipur etc." | `verified` | — |
| 129 | "A joint survey by AATMA and Assam Govt revealed more than crores of agar trees…" | Survey | [HIST] p.2 — "Survey conducted jointly by AATMA and Assam Govt. reveals that there are more than crores of agar trees in private cultivation in Upper Assam region" | `verified` | — |
| 130 | "Lakhs of people are now involved in cultivation and the agar trade." | Employment | [HIST] p.2 — "lakhs of people are involved in the cultivation agar trade" | `verified` | — |
| 131 | "At the request of the then Forest Minister, AATMA sponsored and participated in 'The Workshop on Agar Plantation and the Rule of Joint Forest Management Committees of Assam', held at Rabindra Bhavan on 6 and 7 January 2004." | 2004 workshop | [HIST] p.3 — "In December 2003, at the request of the then Forest Minister, AATMA sponsored and participated in 'The Workshop on Agar Plantation…' held in Rabindra Bhavan on 6th and 7th January 2004" | `verified` | — |
| 132 | "Govt. of Assam framed the 'Assam Wood Based Industries (Establishment and Regulation) Rules, 2000'…" | 2000 Rules | [HIST] p.3 | `verified` | — |
| 133 | "AATMA met the then Chief Minister of Assam and submitted a Memorandum… urging exclusion of agar oil extracting units from the Rules…" | 26.6.2000 | [HIST] p.3 — "on June 26,2000, representative of the… (AATMA) met with the then Chief Minister of Assam. They submitted a Memorandum…" | `verified` | — |
| 134 | "Agar processing units survived on imports till 2005. Verification of consignments by the DFO was done for CITES compliance. In October 2005, the then DFO of Hojai, Shri Siv Kumar, IFS, denied verification…" | Oct 2005 DFO | [HIST] p.3 | `verified` | **Privacy concern:** full name of DFO. |
| 135 | "About 6–7 processing units suffered huge losses. As many as 7–8 business houses shifted to Meghalaya and abroad…" | Losses | [HIST] p.3 — "around Seven Processing Units… suffered massive financial losses… several prominent business houses shifted… to Meghalaya, as well as Overseas" | `verified` | — |
| 136 | "The Central Empowered Committee agreed to certain changes and recommended incorporating Agarwood industries in Secondary Wood Based Industry… Unfortunately, the Assam Cabinet did not approve the recommendation." | 01.03.2006 CEC | [HIST] p.3 — "As per CCF(T) letter No.FGT39/WBI/Amand/SecondaryWBI/06 dt.01,03. 2006, the Central Empowered Committee… recommended to incorporate the Agarwood industries in Secondary Wood Based Industry… But unfortunately the Assam Cabinet did not approve" | `verified` | — |
| 137 | "An AATMA delegation led by [REDACTED: AATMA member] met the then Forest Minister Smt. Pramila Rani Brahma at the Hojai Forest Circuit House…" | 24.8.2016 | [HIST] p.4 — "an AATMA delegation led by [REDACTED: AATMA member] met with then Forest Minister Smt. Pramila Rani Brahma, at the Hojai Forest circuit House" | `verified` | **Privacy concern:** full names. |
| 138 | "Under her initiative, the Assam Forest Department organised a National Conference… held on 28 October 2016 at NEDFi House, Guwahati." | 28.10.2016 | [HIST] p.4 | `verified` | — |
| 139 | "An AATMA delegation, accompanied by Mr. Sirajuddin Ajmal, MLA, met the Chief Minister Shri Himanta Biswa Sharma…" | 19.7.2021 | [HIST] p.4 | `verified` | **Privacy concern:** full name of MLA. |
| 140 | "Thanks to the present dynamic Chief Minister… New rules were made: 'Assam Wood Based Industries (Promotion & Development) Rules, 2022'. Agar Wood Industries are now declared as Secondary Wood Based Industries…" | 2022 resolution | [HIST] p.4 | `verified` | — |

### 16. Policy Page (`src/features/policy/PolicyPage.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 141 | "Policy & Legal Framework" | Page title | Site-authored | `needs client confirmation` | — |
| 142 | "The landmark state policy that legalised the entire agarwood trade chain… Effective 2021 with a 5-year initial term…" | 2020 Policy card | [50YRS] — "The Assam Agarwood Promotion Policy 2020… Effective 2021 with a 5-year initial term" | `needs client confirmation` | Only in team-authored [50YRS], not in primary client source. |
| 143 | "Aquilaria malaccensis has been on CITES Appendix II since 1995. India's successful 2024 Review of Significant Trade outcome secured a formal export quota: 1,51,080 kg/year of chips & powder and 7,050 kg/year of oil for 2024–2027. Assam's share: 1,19,400 kg chips + 5,560 kg oil." | CITES card | Not in client documents | `exclude` | **No client source** for quota figures. |
| 144 | "In July 2019, the Assam Cabinet approved growing and cutting of Agar and Chandan trees on non-forest lands up to 35 bighas (later refined to 5 hectares) without permission — the culmination of nearly 20 years of AATMA advocacy." | 2019 Cabinet card | [50YRS] — "In July 2019, the Assam Cabinet approved…" | `needs client confirmation` | Only in team-authored [50YRS]. |
| 145 | "In May 2026, the Ministry of Commerce constituted a dedicated Agarwood Export Promotion Cell, bringing together CHEMEXCIL and SHEFEXIL for focused export promotion, exporter facilitation, and market development." | 2026 Export Cell card | Not in client documents | `exclude` | **No client source.** |

### 17. Research Page (`src/features/research/ResearchPage.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 146 | "A comprehensive digital publication by the AATMA Research Wing…" | Book card | [TRADE] is team-authored | `needs client confirmation` | Research Wing not mentioned in [HIST]. |
| 147 | "Co-organised in Nagaon with proceedings published — an early contribution to building a knowledge base for agar cultivation in the region." | Seminar card | [50YRS] — "AATMA co-organised a seminar on Agar Plantation in the Northeast in Nagaon, with proceedings published" | `needs client confirmation` | **Only in team-authored [50YRS]. Nagaon seminar NOT in [HIST].** See duplicates section. |
| 148 | "Empirical studies of agar cultivation in Assam have found that every ₹100 invested can yield ₹623 in net benefit…" | Cultivation card | [TRADE] — "every ₹100 invested can yield ₹623 in net benefit" | `needs client confirmation` | Only in team-authored [TRADE]. |
| 149 | "AATMA's research wing compiles data, case studies, and policy analysis to support advocacy efforts — from the 2000 Guwahati seminar to the 2020 Assam Agarwood Promotion Policy and beyond." | Policy research card | Not in [HIST]; partially in [50YRS] and [TRADE] | `needs client confirmation` | — |

### 18. Press Page (`src/features/press/PressPage.tsx`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 150 | "Press is AATMA's own communications — press releases, official letters, and downloads. News is external media coverage of AATMA's work and the agarwood sector." | Distinction | Site-authored explanation | `verified` | Appropriate. |

### 19. News Page (`src/data/news.ts`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 151 | "AATMA thanks CM Sarma for restoring glory of agar wood-based industries in Assam" — Hindustan Times, 17 Jan 2023 | News item | Client-supplied newspaper clipping (via [NEWS]) | `verified` | Client-supplied clipping. |
| 152 | "About 1,000 agar wood-based industries in Assam" | HT excerpt | [PRESS] — "about 1000 Agar Wood Based Industries in Assam" | `verified` | Matches client press note. |
| 153 | "Hojai, Golaghat, Sibsagar, Nagaon, Jorhat, Majuli, Karimganj, Cachar, Dima Hasao, Boroland" | HT excerpt | Not in client documents (from news clipping) | `needs client confirmation` | From news clipping; not in [HIST] or [PRESS]. |
| 154 | "Benefits small and marginal farmers, the distillation industry, and traders; employment for lakhs of skilled workers" | HT excerpt | [HIST] p.2 — "lakhs of people are involved" | `needs client confirmation` | Partial match. |
| 155 | "Wood-based industries: Winds of change soon" — The Assam Tribune, 2 Aug 2023 | News item | Client-supplied newspaper clipping | `verified` | Client-supplied. |
| 156 | "Pre-Godavarman: 588… reduced by 66% → ~206 primary WBIs now functional in Assam" | AT excerpt | Not in client documents | `needs client confirmation` | From news clipping. |
| 157 | "~1,500 agarwood-based units, 'basically cottage industries'" | AT excerpt | Not in client documents | `needs client confirmation` | From news clipping. |
| 158 | "Max 74 days for fresh licence or renewal (primary WBIs) per 5-year period" | AT excerpt | Not in client documents | `needs client confirmation` | From news clipping. |
| 159 | "Max 62 days for fresh registration or renewal (secondary WBIs) per 5-year period" | AT excerpt | Not in client documents | `needs client confirmation` | From news clipping. |
| 160 | "Prospects of Assam's agarwood industry" — The Assam Tribune, 18 Nov 2024 | News item | Client-supplied newspaper clipping | `verified` | Client-supplied. |
| 161 | "Assam holds over 82% of India's agarwood trees — 11.437 crore trees outside forest areas" | AT excerpt | Not in client documents | `needs client confirmation` | From news clipping; matches tree count in [TRADE]. |
| 162 | "Golaghat district: 4.5 crore (highest concentration in the state)" | AT excerpt | Not in client documents | `needs client confirmation` | From news clipping. |
| 163 | "Tripura is second nationally with 1.515 crore" | AT excerpt | Not in client documents | `needs client confirmation` | From news clipping. |
| 164 | "2018–2022 global agarwood chips market grew at 7.7% CAGR, reaching $44.05 billion (~Rs 3,52,405.6 crore) by 2023" | AT excerpt | Not in client documents | `needs client confirmation` | From news clipping. |
| 165 | "Projected $64 billion (~Rs 5,12,000 crore) by 2029" | AT excerpt | Not in client documents | `needs client confirmation` | From news clipping. |
| 166 | "High-quality agarwood ~Rs 1 lakh per kg internationally; agar oil up to Rs 80,000 per kg" | AT excerpt | Not in client documents; [TRADE] says USD 32,000–40,000/kg for oil | `needs client confirmation` | Conflicting figures — see contradictions. |
| 167 | "Assam secured 79% of the country's export quota… 1.194 lakh kg agarwood chips per annum, 5,560 kg agar oil per annum" | AT excerpt | Not in client documents | `exclude` | No client source for quota figures. |

> **Change record — clippings (2026-10-17, task t_67bb2083).** The three clippings were moved into a typed module, `src/data/news.ts`, and every entry now records its verified outlet, its verified ISO date, the page number where legible, the byline where legible, and the exact client file it was read from. Each card and article page pairs the outlet with the date and states plainly that the text is a transcription of a client-supplied clipping rather than something the site wrote.
>
> Two corrections followed from that pass:
> 1. **Adjacent unrelated story.** The *Assam Tribune* clipping of 2 August 2023 sat on a page that also carried an unrelated editorial, "River dredging". That story is not transcribed, and the exclusion is now stated on the article page and in the coverage timeline rather than left implicit.
> 2. **Member names.** The *Hindustan Times* transcription listed AATMA office-bearers by full name. Per the client instruction recorded above (contradiction C3) those names are no longer reproduced; the page notes that the clipping names them and points at the instruction.

### 20. Books Page (`src/data/books.ts`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 168 | "The Agarwood Trade of Assam" by AATMA Research Wing | Book 1 | [TRADE] — team-authored | `needs client confirmation` | Book is team-authored, not client-published. |
| 169 | "Aquilaria malaccensis, native to Northeast India and Southeast Asia" | Book 1 | [TRADE] | `needs client confirmation` | Not in [HIST]. |
| 170 | "In Assam, the tree grows across the districts of Golaghat, Jorhat, Sivasagar, and Hojai — part of an estimated 114.3 million agar trees in the state, the largest population in India." | Book 1 | [TRADE] | `needs client confirmation` | Not in [HIST]. |
| 171 | "The species is listed as Critically Endangered by the IUCN" | Book 1 | [TRADE] | `needs client confirmation` | Not in [HIST]. |
| 172 | "Pure-grade agar oil, of the quality produced in Assam's distillation centres, trades at USD 32,000–40,000 per kilogram." | Book 1 | [TRADE] | `exclude` | **No client source.** Team-authored. |
| 173 | "Hojai, Assam, is the distillation hub of India" | Book 1 | [HIST] p.1 — "small-scale distillation at Hojai" | `needs client confirmation` | "Hub of India" is stronger than client source. |
| 174 | "India's 2024 CITES export quota — 1,51,080 kg of chips and powder and 7,050 kg of oil per year" | Book 1 | Not in client documents | `exclude` | **No client source.** |
| 175 | "Assam's share of 1,19,400 kg chips and 5,560 kg oil" | Book 1 | Not in client documents | `exclude` | **No client source.** |
| 176 | "Assam alone has an estimated 114.3 million agar trees — part of India's 139.89 million" | Book 1 | [TRADE] | `needs client confirmation` | Not in [HIST]. |
| 177 | "every ₹100 invested can yield ₹623 in net benefit" | Book 1 | [TRADE] | `needs client confirmation` | Not in [HIST]. |
| 178 | "The 2019 Assam Cabinet decision to liberalise agar cultivation and felling on non-forest lands up to 35 bighas (later refined to 5 hectares) without permission" | Book 1 | [50YRS] | `needs client confirmation` | Not in [HIST]. |
| 179 | "in 2025 Assam shipped its first legal agarwood consignment — 100 kg to Saudi Arabia and 12 kg to the UAE" | Book 1 | Not in client documents | `exclude` | **No client source.** |
| 180 | "A dedicated Agarwood Export Promotion Cell was constituted by the Ministry of Commerce in May 2026." | Book 1 | Not in client documents | `exclude` | **No client source.** |
| 181 | "AATMA: Fifty Years" by AATMA | Book 2 | [50YRS] — team-authored | `needs client confirmation` | Book is team-authored. |
| 182 | "The story of the All Assam Agar Traders & Agaroil Manufacturers' Association — from its founding in 1976 to its role in shaping national policy." | Book 2 desc | [50YRS] | `needs client confirmation` | — |
| 183 | "AGAR — History & Scope of Plantation: A Perspective" by Dr. M. Ahmed and Dr. P. Gogoi, AATMA, 2000, 31 pages | Book 3 | `public/books/agar/pages/` — scanned client book | `verified` | Client publication; 31 scanned pages in project. |

### 21. Resources Page (`src/data/resources.ts`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 184 | "AATMA's press note welcoming the notification of the Assam Wood-Based Industries (Promotion and Development) Rules 2022…" | Press note | [PRESS] | `verified` | — |
| 185 | "AATMA's letter to Chief Minister Himanta Biswa Sarma acknowledging the notification of the 2022 rules and describing the 23-year wait for reform." | Letter | [HCM] | `verified` | — |
| 186 | "The Assam Gazette (Extraordinary) notification No. 20, eCF No. 237152, dated 12 January 2023…" | WBI Rules | [HCM], [PRESS] | `needs client confirmation` | Gazette number not in client documents. |
| 187 | "The gazette notification governing agar trees grown on non-forest land…" | ToF Rules | Not in client documents | `needs client confirmation` | — |
| 188 | "AATMA's account of the agarwood trade — from the sanchi-paat era and the Hojai distillation trade through the 2000 rules and the campaign that led to the 2022 reforms." | History | [HIST] | `verified` | — |
| 189 | "Collected abstracts of papers presented at the national seminar on the scope and dimension of agar plantation in the North East, organised by AATMA at the Assam Administrative Staff College, Guwahati." | Seminar abstracts | [HIST] p.2 | `verified` | — |
| 190 | "22–23 November 2000" | Seminar date | [HIST] p.2 — "In November 2000" | `needs client confirmation` | Specific dates (22–23 Nov) not in [HIST]. |
| 191 | "The prescribed application for a registration certificate…" | Form XVII | Not in client documents | `needs client confirmation` | — |
| 192 | "The prescribed Legal Procurement Certificate for agarwood derivatives…" | Form XXV | Not in client documents | `needs client confirmation` | — |

### 22. Data Files — Milestones (`src/data/content.ts`)

| # | Claim (exact text) | Page location | Client source | Status | Notes |
|---|-------------------|---------------|---------------|--------|-------|
| 193 | "AATMA is established in Hojai, Assam" | Milestones | [HIST] p.2 | `verified` | — |
| 194 | "AATMA receives formal registration — Reg. No. 664 of 78–79…" | Milestones | [HIST] p.2 | `verified` | — |
| 195 | "AATMA connects with outside agar expertise for the first time — a landmark seminar…" | Milestones | [HIST] p.2 | `verified` | — |
| 196 | "Co-organised in Nagaon with proceedings published…" | Milestones | [50YRS] — team-authored | `needs client confirmation` | **Nagaon seminar — see duplicates.** |
| 197 | "In July 2019, the Assam Cabinet approves growing and cutting of Agar and Chandan trees on non-forest lands up to 35 bighas (later refined to 5 hectares) without permission." | Milestones | [50YRS] | `needs client confirmation` | Not in [HIST]. |
| 198 | "The Cabinet also approves the Assam Agar International Trade Centre in Golaghat." | Milestones | Not in client documents | `exclude` | **No client source.** |
| 199 | "The state legalises the entire agarwood trade chain — plantation, harvesting, processing, transit, and sale. Effective 2021 with a 5-year initial term" | Milestones | [50YRS] | `needs client confirmation` | Not in [HIST]. |
| 200 | "India successfully prevents Aquilaria malaccensis from being placed under CITES' Review of Significant Trade, and secures a formal export quota: 1,51,080 kg/year…" | Milestones | Not in client documents | `exclude` | **No client source.** |
| 201 | "Assam ships its first legally approved commercial consignment: 100 kg of premium agarwood chips to Saudi Arabia and 12 kg to the UAE — worth a combined ₹2.35 crore" | Milestones | Not in client documents | `exclude` | **No client source.** |
| 202 | "In May 2026, the Ministry of Commerce constitutes a dedicated Agarwood Export Promotion Cell…" | Milestones | Not in client documents | `exclude` | **No client source.** |

---

## DUPLICATE 2000 SEMINAR ENTRIES

The 2000 seminar appears in TWO different forms across the site and source materials:

| Version | Location | Source | Venue | Status |
|---------|----------|--------|-------|--------|
| **Guwahati seminar** | Homepage AgarStory §5, History Page §15, Resources §21, Milestones #195 | [HIST] p.2 — **client primary source** | Administrative Staff College, Guwahati | `verified` |
| **Nagaon seminar** | Research Page §17 (#147), Milestones #196 | [50YRS] — **team-authored only** | Nagaon | `needs client confirmation` |

**Finding:** The Guwahati seminar is directly documented in the client's own account ([HIST] p.2). The Nagaon seminar appears ONLY in the team-authored [50YRS] text and is **not corroborated** by any primary client document.

**Action required:** Remove or hold the Nagaon seminar claim pending client confirmation. Do not publish as fact.

---

## CLAIMS LACKING ANY CLIENT SOURCE (EXCLUDE)

The following claims have **no client source found in any primary or secondary client document** and should be removed or held for confirmation before publishing:

| # | Claim | Page | Reason |
|---|-------|------|--------|
| 22 | Species list: Aquilaria malaccensis, A. Agalocha, A. khasiana | About | Not in [HIST] |
| 26 | "~2 Lakh livelihoods across Assam" | About stats | Not in client documents |
| 27 | "First Legal Export 2025 — 112 kg to Saudi Arabia & UAE" | About stats | Not in client documents |
| 28 | "CITES Quota 1.51 Lakh kg" | About stats | Not in client documents |
| 58 | "W.P.(C) No. 6284/2007 in Gauhati High Court" | Critical Era | Not in [HIST] |
| 59 | "Multi-agency alerts, Guwahati Airport, hotel detentions in Maharashtra" | Critical Era | Not in [HIST] |
| 64/83 | "800+ cottage industries" | Achievement/Rules | **#83 resolved** — brief (2) §9 "more than 800". #64 (AchievementSection) needs the same re-check. |
| 69/72 | "Stakeholders Conference — February 2023" | Achievement | Brief (2) §7 says 14 February 2023 — re-check, not yet done |
| 73–79 | Entire NDF Findings section (NDF study, tree population, districts, BSI report, CITES date) | NDF Findings | **Resolved** — all seven rows `verified` against brief (2) §8; see correction note above |
| 82 | "Registration valid for five (5) years" | Rules | **Resolved** — brief (2) §9 "valid for five (5) years" |
| 84 | "Registration of industry, plantations, stock register…" | Rules | **Resolved** — brief (2) §9 verbatim |
| 85 | "Categorization into Micro, Small, Medium, Large" | Rules | **Resolved** — brief (2) §9 + gazette Rule 2 thresholds |
| 88 | "NOC requires DGFT, Forest Dept, MoEFCC, CITES — 30 working days" | Challenges | Not in client documents |
| 102 | Office hours: "Mon–Sat, 9 AM–5 PM" | Contact | Not in client documents |
| 143 | CITES quota figures (1,51,080 kg, 7,050 kg, Assam share) | Policy | Not in client documents |
| 145 | "Agarwood Export Promotion Cell, May 2026" | Policy | Not in client documents |
| 167 | Assam export quota share (1.194 lakh kg) | News | Not in client documents |
| 172 | "USD 32,000–40,000/kg" | Books | Not in client documents |
| 174–175 | CITES quota figures | Books | Not in client documents |
| 179 | "First legal consignment 2025 — 100 kg + 12 kg" | Books | Not in client documents |
| 180 | "Export Promotion Cell, May 2026" | Books | Not in client documents |
| 198 | "Assam Agar International Trade Centre in Golaghat" | Milestones | Not in client documents |
| 200 | CITES quota + Review of Significant Trade | Milestones | Not in client documents |
| 201 | "First legal consignment + ₹2.35 crore" | Milestones | Not in client documents |
| 202 | "Export Promotion Cell, May 2026" | Milestones | Not in client documents |

---

## CONTRADICTIONS BETWEEN PAGE COPY AND CLIENT DOCUMENTS

### C1. 2000 Seminar Location: Guwahati vs. Nagaon

| Side | Evidence |
|------|----------|
| **Client document [HIST] p.2** | "In November 2000, AATMA organized a National level seminar on Scope & Dimension of Agar (Aquilaria spp.) plantation in North Eastern Region **at Administrative staff college, Guwahati**" |
| **Team-authored [50YRS]** | "AATMA co-organised a seminar on Agar Plantation in the Northeast **in Nagaon**, with proceedings published" |
| **Site (Research Page + Milestones)** | References "Nagaon" seminar |

**Resolution:** Client document says Guwahati. Team-authored summary says Nagaon. The Nagaon version is uncorroborated. **Use Guwahati; remove or hold Nagaon claim.**

### C2. 2025 First Legal Export Quantity

| Side | Evidence |
|------|----------|
| **Site (About stats #27)** | "112 kg to Saudi Arabia & UAE" |
| **Site (Books #179, Milestones #201)** | "100 kg to Saudi Arabia and 12 kg to the UAE" (= 112 kg total) |
| **Client documents** | **No mention** of any 2025 export in [HIST] or any other client source |

**Resolution:** The claim is internally consistent (112 = 100 + 12) but has **no client source**. Hold for confirmation.

### C3. Member/Office-Bearer Full Names

| Side | Evidence |
|------|----------|
| **Client instruction** (plan summary) | "Do NOT publish full names of AATMA members/office-holders — use role descriptions" |
| **Client document [HIST]** | Names ARE present: "(L) [REDACTED: AATMA member]", "(L) [REDACTED: AATMA member]", "(L) [REDACTED: AATMA member]", "Shri Siv Kumar, IFS", "Smt. Pramila Rani Brahma", "[REDACTED: AATMA member]", "Mr. Sirajuddin Ajmal, MLA" |
| **Site (History Page)** | Full names published: "(L) [REDACTED: AATMA member]", "(L) [REDACTED: AATMA member]", "(L) [REDACTED: AATMA member]", "[REDACTED: AATMA member]", "(L) [REDACTED: AATMA member]", "Shri Siv Kumar, IFS", "Smt. Pramila Rani Brahma", "[REDACTED: AATMA member]", "Mr. Sirajuddin Ajmal, MLA" |

**Resolution:** Client documents contain names (client wrote them), but client instruction to the design team says **do not publish full names**. Site should comply with the instruction — replace full names with role descriptions.

### C4. Agar Oil Price: USD vs. INR

| Side | Evidence |
|------|----------|
| **Team-authored [TRADE]** | "USD 32,000–40,000 per kilogram" |
| **News clipping [NEWS]** | "agar oil up to Rs 80,000 per kg" |
| **Client [HIST]** | No price figures |

**Resolution:** Two different figures from different secondary sources. No primary client source. Hold for confirmation.

### C5. 2005 DFO Denial Date

| Side | Evidence |
|------|----------|
| **Client [HIST] p.3** | "October 2005 the then DFO of Hojai, Shri Siv Kumar, IFS denied the verification" |
| **Site (Critical Era #57)** | "Forest authorities (DFO Hojai) denied verification of consignments." |

**Resolution:** Consistent — no contradiction. Site omits the specific date and name (appropriate given privacy instruction).

### C6. 2004 Workshop Date

| Side | Evidence |
|------|----------|
| **Client [HIST] p.3** | "In December 2003, at the request of the then Forest Minister, AATMA sponsored and participated in… held in Rabindra Bhavan on 6th and 7th January 2004" |
| **Site (History #131)** | "held at Rabindra Bhavan on 6 and 7 January 2004" |

**Resolution:** Consistent. The workshop was requested in December 2003 but held in January 2004. Site states the holding date correctly.

---

## SUMMARY

| Category | Count |
|----------|-------|
| **Total claims** | 202 |
| **Verified** (direct client source) | 83 |
| **Needs client confirmation** (partial/secondary/site-authored) | 69 |
| **Exclude** (no client source) | 50 |
| **Homepage claims** | 106 (#1–#106) |
| **Other page claims** | 96 (#107–#202) |
| **Contradictions found** | 6 |
| **Duplicate seminar entries** | 1 (Guwahati vs. Nagaon) |

### Priority Actions

1. **Remove the 50 remaining `exclude` claims** from public copy or hold for client confirmation. (Was 57; 7 NDF rows moved to `verified` on 2026-10-17 — see correction note.)
2. **Resolve the Nagaon seminar duplicate** — use Guwahati (client-sourced), remove Nagaon.
3. **Replace full member names** with role descriptions per client instruction.
4. **Confirm the 69 `needs client confirmation` claims** with the client before publishing. (Was 73; four rows moved to `verified` on 2026-10-17.)
5. **Label the decorative wallpaper** as decorative/non-factual with attribution.
6. **Obtain higher-resolution hero images** — current client tree originals are 1000×800 and 758×606.

---

*End of ledger.*
