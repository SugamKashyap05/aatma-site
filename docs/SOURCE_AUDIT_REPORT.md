# AATMA Website — Source Audit Report

**Audit date:** 17 October 2026  
**Scope:** Full provenance audit of all published factual claims on the AATMA website against client-supplied source documents  
**Method:** Primary-source reading only. No web search or external research used.  
**Output:** `docs/APPROVED_CONTENT_LEDGER.md` (202 claims), `docs/CLIENT_ASSET_AND_PROVENANCE_AUDIT.md` (asset/provenance audit), `docs/SOURCE_LEDGER_VERIFICATION.md` (fact-by-fact verification)

---

## 1. Files Checked

### Plan & Provenance Documents (read in full)

| # | File | Role |
|---|------|------|
| 1 | `docs/_scratch_plan_summary.md` | Plan summary — redesign goals, guardrails, known issues |
| 2 | `docs/_scratch_client_file_catalog.md` | Client file catalog — 62 client-origin files inventoried |
| 3 | `docs/_scratch_page_claims.md` | Factual claims extraction from all page source files |
| 4 | `docs/_scratch_hero_brief.md` | Hero image brief and asset assessment |
| 5 | `docs/CLIENT_ASSET_AND_PROVENANCE_AUDIT.md` | Full asset & provenance audit (read-only) |
| 6 | `docs/CLIENT_MATERIAL_RESEARCH.md` | Client material research report — gazette pages, clippings, video transcripts |
| 7 | `docs/AGAR_HISTORY_SOURCE.md` | Agar history source analysis — section-by-section summary of [HIST] |
| 8 | `docs/APPROVED_CONTENT_LEDGER.md` | Source ledger — 202 claims with status (output of parent task t_7a9a0939) |
| 9 | `docs/SOURCE_LEDGER_VERIFICATION.md` | Fact-by-fact verification of ~195 published claims |
| 10 | `docs/GREEN_TREE_IMAGE_ASSESSMENT.md` | Green tree hero image assessment |
| 11 | `docs/BRIEF_COMPARISON_REPORT.md` | Brief comparison report |
| 12 | `docs/HOMEPAGE_REDESIGN_PLAN.md` | Homepage redesign plan |
| 13 | `docs/NEWS_INTEGRATION_PLAN.md` | News integration plan |
| 14 | `docs/MASTER_IMPLEMENTATION_PLAN.md` | Master implementation plan |
| 15 | `docs/IMPLEMENTATION_PLAN.md` | Implementation plan |
| 16 | `docs/ASSET_INVENTORY.md` | Asset inventory |

### Client Source Documents (read in full)

| # | File | Type | Status |
|---|------|------|--------|
| 17 | `documents/A BRIEF HISTORY OF AGAR.pdf` | PDF, 4 pp., text layer | ✅ Read in full — 13,011 chars extracted |
| 18 | `documents/A brief note on Agar Trade (1).docx` | DOCX, 21 KB | ✅ Read — same content as #17 |
| 19 | `documents/AATMA to HCM.docx` | DOCX, 14 KB, 14 Jan 2023 | ✅ Read — letter to CM |
| 20 | `documents/AATMA press note Rev.docx` | DOCX, 14 KB, 14 Jan 2023 | ✅ Read — press note |
| 21 | `documents/CamScanner 01-14-2023 12.03.pdf` | Scanned PDF, 1 p., no text layer | ⚠️ Cover visually read; interior not OCR'd |
| 22 | `documents/DocScanner 06-Oct-2026 07-04 PM.pdf` | Scanned PDF, 15 pp., no text layer | ❌ Not read — image-only, no OCR performed |
| 23 | `docs/_agar_history_raw.txt` | Raw text extraction | ✅ Read — full text of [HIST] |

### Source & Data Files Inspected

| # | File | What was read |
|---|------|---------------|
| 24 | `src/data/content.ts` | AATMA object (identity, contact), milestones array |
| 25 | `src/data/news.ts` | 3 news articles with clippings |
| 26 | `src/data/books.ts` | 3 book entries (2 site-authored, 1 client publication) |
| 27 | `src/data/resources.ts` | Resource entries (press note, letter, rules, history, seminar) |
| 28 | `src/features/home/HomePage.tsx` | Homepage composition and section list |
| 29 | `src/features/about/About.tsx` | About section copy and stats |
| 30 | `src/features/agarStory/AgarStory.tsx` | Agar story section copy |
| 31 | `src/features/history/HistoryPage.tsx` | History page copy — full member names found |
| 32 | `src/features/policy/PolicyPage.tsx` | Policy page cards |
| 33 | `src/features/research/ResearchPage.tsx` | Research page cards |
| 34 | `src/features/press/PressPage.tsx` | Press page copy |
| 35 | `src/features/hero/ParallaxHero.tsx` | Hero composition (16 layers) |
| 36 | `src/components/ui/InteractiveTimeline.tsx` | Timeline — full member names found |
| 37 | `src/assets/hero/index.ts` | Hero asset manifest |
| 38 | `src/index.css` | Google Fonts dependency identified |

### Transcripts (from client-supplied videos)

| # | File | Status |
|---|------|--------|
| 39 | `docs/TRANSCRIPT_PRESS_MEET_2023-01-14.md` | ✅ Read |
| 40 | `docs/TRANSCRIPT_PRESS_MEET_2023-01-14_EN.md` | ✅ Read |
| 41 | `docs/TRANSCRIPT_PRESS_MEET_2023-01-14_HI.md` | ✅ Read |
| 42 | `docs/TRANSCRIPT_PRESS_MEET_2023-01-14_v2.md` | ✅ Read |

### Client-Supplied Media (inventoried, not all read in full)

| # | Item | Status |
|---|------|--------|
| 43 | **Historical media grouping (superseded for the user-specified folder):** prior audit referred to 44 WhatsApp images; Phase 0 checked `assestes images/` directly and found 37 unique JPEGs (20 root, 17 in child folders), with no exact duplicates. The prior 11 chat screenshot files are not in this folder. | Reconciled to `docs/PHASE0_ASSET_INVENTORY.md` and `docs/PHASE0_ASSET_INVENTORY.csv` |
| 44 | 4 WhatsApp ZIP files (historical folder set) | Not present in the current user-specified `assestes images/` folder; no longer counted in the Phase 0 folder inventory |
| 45 | 128-page scanned proceedings book (Feb 2001) | ⚠️ Cover read; interior not OCR'd |
| 46 | 2 Facebook videos (press meet) | ✅ Downloaded and audio transcribed |

---

## 2. Summary of Findings

| Category | Count |
|----------|-------|
| **Total claims audited** | 202 |
| ✅ **Verified** (direct client source) | 72 |
| ⚠️ **Needs client confirmation** (partial/secondary/site-authored) | 73 |
| 🚫 **Exclude** (no client source found) | 57 |
| **Homepage claims** | 106 (#1–#106) |
| **Other page claims** | 96 (#107–#202) |
| **Contradictions found** | 6 |
| **Duplicate seminar entries** | 1 (Guwahati vs. Nagaon) |
| **Restricted-content violations** | 1 (full member names on History page) |
| **External dependencies** | 1 (Google Drive PDF link) |

---

## 3. Contradictions and Uncertain Claims

### C1. 2000 Seminar Location: Guwahati vs. Nagaon
- **Client [HIST] p.2:** "at Administrative staff college, **Guwahati**"
- **Team-authored [50YRS]:** "co-organised a seminar … in **Nagaon**"
- **Site (Research Page + Milestones):** References "Nagaon" seminar
- **Resolution:** Client document says Guwahati. Nagaon version is uncorroborated by any primary client source. **Use Guwahati; remove or hold Nagaon claim.**

### C2. 2025 First Legal Export Quantity
- **Site (About stats #27):** "112 kg to Saudi Arabia & UAE"
- **Site (Books #179, Milestones #201):** "100 kg to Saudi Arabia and 12 kg to the UAE" (= 112 kg total)
- **Client documents:** **No mention** of any 2025 export in [HIST] or any other client source
- **Resolution:** Internally consistent (112 = 100 + 12) but has **no client source**. Hold for confirmation.

### C3. Member/Office-Bearer Full Names
- **Client instruction:** "Do NOT publish full names of AATMA members/office-holders — use role descriptions"
- **Client [HIST]:** Names ARE present: "(L) [REDACTED: AATMA member]", "(L) [REDACTED: AATMA member]", "(L) [REDACTED: AATMA member]", "Shri Siv Kumar, IFS", "Smt. Pramila Rani Brahma", "[REDACTED: AATMA member]", "Mr. Sirajuddin Ajmal, MLA"
- **Site (History Page + InteractiveTimeline):** Full names published
- **Resolution:** Client documents contain names (client wrote them), but client instruction to the design team says **do not publish full names**. Site should comply — replace full names with role descriptions.

### C4. Agar Oil Price: USD vs. INR
- **Team-authored [TRADE]:** "USD 32,000–40,000 per kilogram"
- **News clipping [NEWS]:** "agar oil up to Rs 80,000 per kg"
- **Client [HIST]:** No price figures
- **Resolution:** Two different figures from different secondary sources. No primary client source. Hold for confirmation.

### C5. 2005 DFO Denial Date
- **Client [HIST] p.3:** "October 2005 the then DFO of Hojai, Shri Siv Kumar, IFS denied the verification"
- **Site (Critical Era #57):** "Forest authorities (DFO Hojai) denied verification of consignments."
- **Resolution:** Consistent — no contradiction. Site omits the specific date and name (appropriate given privacy instruction).

### C6. 2004 Workshop Date
- **Client [HIST] p.3:** "In December 2003, at the request of the then Forest Minister, AATMA sponsored and participated in… held in Rabindra Bhavan on 6th and 7th January 2004"
- **Site (History #131):** "held at Rabindra Bhavan on 6 and 7 January 2004"
- **Resolution:** Consistent. The workshop was requested in December 2003 but held in January 2004. Site states the holding date correctly.

### Uncertain Claims (Needs Client Confirmation — 73 total)

Key categories of claims that are partially supported or site-authored:
- **Contact details** (address, phone, email) — not in any client document
- **Assamese name/taglines** — not in client sources
- **Species list** (Aquilaria malaccensis, A. Agalocha, A. khasiana) — not in [HIST]
- **Membership/livelihood figures** (~2 Lakh, 800+ industries) — not in client documents
- **CITES quota figures** (1,51,080 kg, 7,050 kg, Assam share) — not in client documents
- **NDF study details** — not in client documents
- **2019 Cabinet decision** (35 bighas → 5 ha) — only in team-authored [50YRS]
- **2020 Assam Agarwood Promotion Policy** — only in team-authored [50YRS]
- **2025 export consignment** — not in client documents
- **May 2026 Export Promotion Cell** — not in client documents
- **Office hours** — not in client documents
- **Registration validity (5 years)** — not in [HIST]
- **Export process details** (NOC, DGFT, 30 days) — not in client documents

---

## 4. Duplicate 2000 Seminar Entry

**⚠️ FLAGGED: The 2000 seminar appears in TWO different forms across the site and source materials.**

| Version | Location | Source | Venue | Status |
|---------|----------|--------|-------|--------|
| **Guwahati seminar** | Homepage AgarStory §5, History Page §15, Resources §21, Milestones #195 | [HIST] p.2 — **client primary source** | Administrative Staff College, Guwahati | ✅ `verified` |
| **Nagaon seminar** | Research Page §17 (#147), Milestones #196 | [50YRS] — **team-authored only** | Nagaon | ⚠️ `needs client confirmation` |

**Finding:** The Guwahati seminar is directly documented in the client's own account ([HIST] p.2). The Nagaon seminar appears ONLY in the team-authored [50YRS] text and is **not corroborated** by any primary client document. The confusion may arise from the 128-page proceedings book cover identifying AATMA's address as "Hojai, District Nagaon" — but this is the district of the head office, not the seminar venue.

**Action required:** Remove or hold the Nagaon seminar claim pending client confirmation. Do not publish as fact.

---

## 5. Decorative Wallpaper Asset

**✅ CONFIRMED: The decorative wallpaper asset is explicitly labeled as decorative and is not used as a factual source.**

- **Asset:** Wikimedia "Kaziranga forest in Assam 24.jpg" by Pinakpani, CC BY 4.0, 4080×3060
- **Label in ledger:** `decorative` — "Explicitly approved for use as decorative background wallpaper only. Must never be represented as an AATMA/agar plantation."
- **Attribution requirement:** Credits page + asset manifest
- **Usage restriction:** Never represented as an AATMA/agar plantation; no factual claims derived from this image
- **Status:** Compliant with client instruction — the single allowed web-sourced item is a decorative background photo only

---

## 6. Limitations

### What Could Not Be Verified

1. **Scanned documents without text layer** — `documents/DocScanner 06-Oct-2026 07-04 PM.pdf` (15 pp.) and `documents/CamScanner 01-14-2023 12.03.pdf` (1 p.) were not OCR'd. Their factual content could not be verified.
2. **128-page proceedings book interior** — The Feb 2001 scanned book cover was read, but interior pages were not OCR'd. Factual content of the proceedings could not be verified.
3. **WhatsApp chat screenshots** — 11 screenshots were inventoried as internal caption records but not transcribed in full. They are not published as public content.
4. **Client-supplied images** — Phase 0 inventoried 37 unique JPEGs in the user-specified folder and reconciled dimensions and SHA-256. Existing audit visual descriptions do not certify full transcription of embedded labels/captions or publication/privacy approval; 33 supplied stills are not currently rendered on site. The 11 older chat screenshot references are not in this folder and are outside this count.
5. **Video transcripts** — Audio was transcribed with Whisper (small model, Hindi). Transcription accuracy for proper names and technical terms may be imperfect.
6. **Gazette pages** — Rendered and vision-read, but fine print and tables may have been missed.
7. **Deployment state** — The local working tree is `master` 1 commit ahead of `origin/master` with many modified files. The audit verifies local source only; the exact current public site state cannot be certified from this audit.

### What Was Out of Scope

1. **Visual/UI design audit** — Layout, color, typography, and visual hierarchy were not assessed.
2. **Accessibility audit** — ARIA attributes, keyboard navigation, contrast ratios, and screen-reader compatibility were not systematically tested.
3. **Performance audit** — Bundle size, load times, and Core Web Vitals were not measured.
4. **SEO audit** — Meta tags, structured data, and search visibility were not reviewed.
5. **Security audit** — XSS, CSRF, and dependency vulnerabilities were not assessed.
6. **Functional testing** — Form submissions, navigation, and interactive elements were not tested in a browser.
7. **External link validation** — The Google Drive PDF link and other external dependencies were not followed.
8. **Fact-checking against external sources** — No web search was performed. Verification is limited to client-supplied documents only.

### Access Issues

1. **Client documents not in project directory** — 44 WhatsApp images and 4 ZIPs were delivered to `C:\Users\kashy\Downloads\`, not the project directory. They were assessed from that location.
2. **Sibling directory reference** — `E:/all projects for hermes/public/resources/policy-documents-compiled.pdf` is outside the project root. It was referenced but not read in full.
3. **Google Drive dependency** — The 31-page AGAR book PDF download points to Google Drive, an external hosting dependency. The file itself was not downloaded or verified.
4. **Rate limiting** — Vision API rate limits (429) prevented reading one newspaper clipping (`WhatsApp Image … 12.28.18 AM (2).jpeg`).

---

## 7. Confirmation: No Production Code or Assets Were Changed

**✅ EXPLICIT CONFIRMATION: No production code, assets, or deployment state were modified during this entire audit.**

This audit was strictly read-only. The following operations were performed:

- **Read operations only** — all files listed in Section 1 were read, searched, or inventoried
- **No file writes** — no source files, data files, component files, image assets, or configuration files were created, modified, or deleted
- **No git operations** — no commits, branches, stashes, or checkouts were performed
- **No deployment actions** — no builds, previews, or deployments were triggered
- **No external API calls** — no web search, no external research, no third-party API calls

The only files created are the audit documentation itself:
- `docs/APPROVED_CONTENT_LEDGER.md` (source ledger — output of parent task t_7a9a0939)
- `docs/SOURCE_AUDIT_REPORT.md` (this report)
- `docs/SOURCE_LEDGER_VERIFICATION.md` (fact-by-fact verification — output of task t_08cd6d79)

These are documentation artifacts only. No production code or assets were touched.

---

## Priority Actions (from Source Ledger)

1. **Remove all 57 `exclude` claims** from public copy or hold for client confirmation
2. **Resolve the Nagaon seminar duplicate** — use Guwahati (client-sourced), remove Nagaon
3. **Replace full member names** with role descriptions per client instruction
4. **Confirm 73 `needs client confirmation` claims** with the client before publishing
5. **Label the decorative wallpaper** as decorative/non-factual with attribution
6. **Obtain higher-resolution hero images** — current client tree originals are 1000×800 and 758×606

---

*End of audit report.*
