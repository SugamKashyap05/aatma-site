# Source Ledger Fact-by-Fact Verification

> **Status (2026-10-18): Historical snapshot; superseded by `docs/PHASE1_CANONICAL_CLAIM_LEDGER.md`.** The route map and several verdicts below predate source reconciliation and current rendering. Do not use this report as current publication approval.

**Verification date:** 17 October 2026  
**Scope:** All published content on the AATMA site (11 routes + homepage sub-sections)  
**Source ledger:** `docs/CLIENT_MATERIAL_RESEARCH.md` (primary), `docs/CLIENT_ASSET_AND_PROVENANCE_AUDIT.md`, `docs/HOMEPAGE_REDESIGN_PLAN.md`, `docs/BRIEF_COMPARISON_REPORT.md`

---

## 1. Summary

| Category | Count |
|----------|-------|
| Total distinct factual claims verified | ~195 |
| ✅ Match (supported by ledger) | ~140 |
| ⚠️ Unsupported (no ledger entry) | ~30 |
| 🚫 Restricted/private content published | 1 |
| 🔗 External dependencies | 1 |
| 📋 Client-approval blockers unresolved | 3 |

---

## 2. Verification Table

### 2.1 `src/data/content.ts` — AATMA object

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| `fullName: "All Assam Agar Traders & Agaroil Manufacturers' Association"` | CLIENT_MATERIAL_RESEARCH.md §3, §5 | ✅ Match |
| `shortName: "AATMA"` | Throughout ledger | ✅ Match |
| `assameseName: "সদৌ অসম আগৰ ব্যৱসায়ী আৰু আগৰতেল উৎপাদনকাৰী সংস্থা"` | Not in ledger | ⚠️ Unsupported |
| `established: 1976` | CLIENT_MATERIAL_RESEARCH.md §6, HOMEPAGE_REDESIGN_PLAN.md §3.2 | ✅ Match |
| `registered: "Registrar of Societies — Reg. No. 664 of 78–79"` | HOMEPAGE_REDESIGN_PLAN.md §3.2 (brief §3) | ✅ Match |
| `headOffice: "Main Road, Hojai – 782435, Assam, India"` | CLIENT_MATERIAL_RESEARCH.md §5 (press meet banner) | ✅ Match |
| `phone: "[REDACTED: unverified contact]"` | Not in ledger | ⚠️ Unsupported |
| `email: "[REDACTED: unverified contact]"` | Not in ledger | ⚠️ Unsupported |
| `tagline: "A 50-year institution at the heart of India's agarwood trade."` | Not in ledger (editorial) | ⚠️ Unsupported |
| `districts: ["Golaghat", "Jorhat", "Sivasagar", "Hojai"]` | CLIENT_MATERIAL_RESEARCH.md §1 (NDF districts), §3 (HT locations) | ✅ Match |

### 2.2 `src/data/content.ts` — MILESTONES

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| **1976 — Foundation:** "AATMA is established in Hojai, Assam" | Brief §3, HOMEPAGE_REDESIGN_PLAN.md §3.2 | ✅ Match |
| **1978–79 — Registration:** "Reg. No. 664 of 78–79" | Brief §3 | ✅ Match |
| **2000 — Turning Point:** "Seminar at Assam Administrative Staff College, Guwahati" | CLIENT_MATERIAL_RESEARCH.md §6, HOMEPAGE_REDESIGN_PLAN.md §3.2 | ✅ Match |
| **2019 — Major Victory:** "Assam Cabinet liberalises agar cultivation & felling" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| — "35 bighas (later refined to 5 hectares)" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| — "AATMA's General Secretary addresses a press meet at Hojai" | Not in ledger | ⚠️ Unsupported |
| — "Assam Agar International Trade Centre in Golaghat" | CLIENT_MATERIAL_RESEARCH.md §1 (Assam Tribune) | ✅ Match |
| **2020 — Policy Landmark:** "Assam Agarwood Promotion Policy 2020" | CLIENT_MATERIAL_RESEARCH.md §1 (Assam Tribune) | ✅ Match |
| — "Effective 2021 with a 5-year initial term" | Not in ledger | ⚠️ Unsupported |
| — "Agar brought out of ambit of forest produce regulations" | Brief §9 | ✅ Match |
| **2024 — Global Opening:** "CITES export quota secured for India" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| — "1,51,080 kg/year chips & powder, 7,050 kg/year oil for 2024–2027" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| — "Assam's share: 1,19,400 kg chips + 5,560 kg oil" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| **2025 — New Era:** "Assam's first legal agarwood export" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| — "100 kg to Saudi Arabia, 12 kg to UAE, ₹2.35 crore" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| **2026 — National Stage:** "Agarwood Export Promotion Cell constituted" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| — "Ministry of Commerce, CHEMEXCIL and SHEFEXIL" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |

### 2.3 `src/data/books.ts` — "The Agarwood Trade of Assam" (site-summary)

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| `provenance: "site-summary"` | Correctly labeled | ✅ Match |
| "USD 32,000–40,000 per kilogram" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| "Every ₹100 invested yielding ₹623 in net benefit" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| "114.3 million agar trees in Assam" | CLIENT_MATERIAL_RESEARCH.md §1 (11.437 crore) | ✅ Match |
| "139.89 million in India" | Not in ledger | ⚠️ Unsupported |
| "2024 CITES quota split" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| "2025 first legal consignment" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| "Agarwood Export Promotion Cell May 2026" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |

### 2.4 `src/data/books.ts` — "AATMA: Fifty Years" (site-summary)

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| `provenance: "site-summary"` | Correctly labeled | ✅ Match |
| "AATMA established in 1976 in Hojai, Assam" | Brief §3 | ✅ Match |
| "Reg. No. 664 of 78–79" | Brief §3 | ✅ Match |
| "AATMA co-organised a seminar in Nagaon" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| "Assam Agarwood Promotion Policy 2020" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| "35 bighas (later refined to 5 hectares)" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| "CITES export quota for 2024–2027" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| "2025 first legal consignment" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| "Agarwood Export Promotion Cell May 2026" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |

### 2.5 `src/data/books.ts` — "AGAR — History & Scope of Plantation" (client-publication)

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| `provenance: "client-publication"` | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ✅ Match |
| `author: "Dr. M. Ahmed and Dr. P. Gogoi"` | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ✅ Match |
| `publishedYear: 2000` | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ✅ Match |
| `totalPages: 31` | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ✅ Match |
| `externalDownloadUrl: Google Drive` | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | 🔗 External dependency |

### 2.6 `src/data/news.ts` — News articles

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| **Hindustan Times, 17 Jan 2023** — all claims | CLIENT_MATERIAL_RESEARCH.md §3 | ✅ Match |
| **The Assam Tribune, 2 Aug 2023** — all claims | CLIENT_MATERIAL_RESEARCH.md §2 | ✅ Match |
| **The Assam Tribune, 18 Nov 2024** — all claims | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |

### 2.7 `src/data/resources.ts` — Resource documents

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| `press-note-2023` | CLIENT_MATERIAL_RESEARCH.md §3 | ✅ Match |
| `press-note-signed-2023` | Not directly in ledger | ⚠️ Unsupported |
| `letter-to-hcm-2023` | Not directly in ledger | ⚠️ Unsupported |
| `policy-wbi-rules-2022` | CLIENT_MATERIAL_RESEARCH.md §4a | ✅ Match |
| `policy-tof-rules-2022` | CLIENT_MATERIAL_RESEARCH.md §4b | ✅ Match |
| `research-history-of-agar` | Withdrawn from public Resource documents per client direction (2026-10-24) | N/A — no longer published |
| `form-xvii-registration` | CLIENT_MATERIAL_RESEARCH.md §4a | ✅ Match |
| `cites-form-xxv-lpc` | CLIENT_MATERIAL_RESEARCH.md §4a | ✅ Match |

### 2.8 `src/features/about/About.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| SCRIPT.en — agar tree / sanchi paat / Aquilaria | Brief §1, HOMEPAGE_REDESIGN_PLAN.md §3.2 | ✅ Match |
| "Established 1976" | ✅ Match |
| "Trade Members ~2 Lakh" | Not in ledger | ⚠️ Unsupported |
| "First Legal Export 2025, 112 kg to Saudi Arabia & UAE" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| "CITES Quota (2024–27) 1.51 Lakh kg" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |

### 2.9 `src/features/history/HistoryPage.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| Full names of AATMA founders/office-holders | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | 🚫 **Restricted content published** |
| "1905–06 Sylhet" | Brief §2 | ✅ Match |
| "Post-Independence Barpather" | Brief §2 | ✅ Match |
| "NEFA and Bhutan leases" | Brief §2 | ✅ Match |
| "1970–1980s Manipur, Silchar, Bombay" | Brief §2 | ✅ Match |
| "1982 standstill" | Brief §2 | ✅ Match |
| "Far East discovery" | Brief §2 | ✅ Match |
| "5,000 employed in Hojai" | Not in ledger | ⚠️ Unsupported |
| "2000 Rules" | Brief §6 | ✅ Match |
| "26.6.2000 Memorandum" | Brief §6 | ✅ Match |
| "October 2005 DFO Hojai" | Brief §6 | ✅ Match |
| "01.03.2006 CEC" | Brief §6 | ✅ Match |
| "24.8.2016 Pramila Rani Brahma" | Brief §6 | ✅ Match |
| "28.10.2016 National Conference" | Brief §6 | ✅ Match |
| "19.7.2021 Sirajuddin Ajmal" | Brief §7 | ✅ Match |
| "2022 Resolution" | Brief §7 | ✅ Match |

### 2.10 `src/features/home/FormationSection.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| "1976" | Brief §3 | ✅ Match |
| "664 of 1978-79" | Brief §3 | ✅ Match |
| "2000 re-organisation" | Brief §3 | ✅ Match |
| Names anonymized | HOMEPAGE_REDESIGN_PLAN.md §3.3 | ✅ Match |

### 2.11 `src/features/home/CriticalEraSection.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| "2000 Rules Notified" | Brief §6 | ✅ Match |
| "2005 Verification Denied" | Brief §6 | ✅ Match |
| "2007 Writ Petition W.P.(C) No. 6284/2007" | Brief §6 | ✅ Match |
| "2010 Harassment Escalates" | Brief §6 | ✅ Match |
| "2016 Minister's Initiative" | Brief §6 | ✅ Match |
| "2016 National Conference" | Brief §6 | ✅ Match |

### 2.12 `src/features/home/AchievementSection.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| "50+ Years of Legacy" | ✅ Match |
| "800+ Cottage Industries Legalized" | Brief §9 | ✅ Match |
| "22 Years of Struggle" | ✅ Match |
| "2022 New Rules Enacted" | ✅ Match |
| "July 19, 2021 Memorandum" | Brief §7 | ✅ Match |
| "January 12, 2023 WBI Rules 2022 Enacted" | CLIENT_MATERIAL_RESEARCH.md §4a | ✅ Match |
| "February 14, 2023 Stakeholders Conference" | Brief §7 | ✅ Match |

### 2.13 `src/features/home/NdfFindingsSection.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| "1143.7 Lakh" | CLIENT_MATERIAL_RESEARCH.md §1 (11.437 crore) | ✅ Match |
| "5 Districts" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| "BSI Study" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| "CITES App. II" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| "16 February 1995" | Not explicitly in ledger | ⚠️ Unsupported |

### 2.14 `src/features/home/RulesSection.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| "Register, Don't License" | CLIENT_MATERIAL_RESEARCH.md §4a | ✅ Match |
| "Operate from Present Location" | CLIENT_MATERIAL_RESEARCH.md §4a | ✅ Match |
| "800+ cottage industries" | Brief §9 | ✅ Match |
| "Fully CITES Compliant" | CLIENT_MATERIAL_RESEARCH.md §4a | ✅ Match |
| "Micro to Large" | CLIENT_MATERIAL_RESEARCH.md §4a | ✅ Match |
| "Gazette Notification No. 20, eCF No. 237152, Dispur, 12 January 2023" | CLIENT_MATERIAL_RESEARCH.md §4a | ✅ Match |

### 2.15 `src/features/home/ChallengesSection.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| "High License Fees" | Brief §10 | ✅ Match |
| "Export Process Too Lengthy" | Brief §10 | ✅ Match |
| "Single-Window System" | Brief §10 | ✅ Match |
| "August 26, 2026 AIDC Workshop" | Brief §10 | ✅ Match |

### 2.16 `src/features/agarStory/AgarStory.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| "1905–06 Sylhet" | Brief §2 | ✅ Match |
| "Following years Hojai distillation" | [HIST] p.1 | ✅ Match — no exact decade stated |
| "Late 1960s NEFA and Bhutan" | Brief §2 | ✅ Match |
| "1982 trade standstill" | [HIST] p.1 | ✅ Match |
| "Far East discovery/import era" | [HIST] p.1 | ✅ Match — source passage does not state a specific year |
| "Nov 2000 National Seminar" | [HIST] p.2; seminar cover for exact dates/venue | ✅ Match |
| "LPC" | [BRIEF2] §5 | ✅ Match |
| "Manipur supply, road to Bombay" | Brief §2 | ✅ Match |

### 2.17 `src/features/home/SanchiPaatSection.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| "Bark of the agar tree — called sanchi paat — was used for writing scripture" | Brief §1 | ✅ Match |

### 2.18 `src/features/policy/PolicyPage.tsx` + sub-components

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| "Wood Based Industries Rules 2022" | CLIENT_MATERIAL_RESEARCH.md §4a | ✅ Match |
| "Trees Outside Forest Rules 2022" | CLIENT_MATERIAL_RESEARCH.md §4b | ✅ Match |
| "CITES & International Trade" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| "23 Years of Advocacy" | Brief §6-§7 | ✅ Match |
| All RulesSection claims | CLIENT_MATERIAL_RESEARCH.md §4a, §4b | ✅ Match |
| All ComparisonTable claims | CLIENT_MATERIAL_RESEARCH.md §4a, §4b, §1, §2, §3 | ✅ Match |
| All CitesCompliance claims | CLIENT_MATERIAL_RESEARCH.md §4a, §1 | ✅ Match |
| All RegistrationProcessWalkthrough claims | CLIENT_MATERIAL_RESEARCH.md §4a, §4b | ✅ Match |
| All GazetteCitations claims | CLIENT_MATERIAL_RESEARCH.md §4a, §4b | ✅ Match |
| All PolicyDataSection claims | CLIENT_MATERIAL_RESEARCH.md §4a, §4b | ✅ Match |

### 2.19 `src/components/ui/InteractiveTimeline.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| "1905–06 Sylhet" | Brief §2 | ✅ Match |
| "Post-Independence Barpather" | [HIST] p.1 | ✅ Match — source says "Post-Independence"; no 1947 date in the passage |
| "Following years Hojai distillation" | [HIST] p.1 | ✅ Match — no exact decade stated |
| "1970–1980s Manipur" | Brief §2 | ✅ Match |
| "1976 AATMA Formation" | Brief §3 | ✅ Match |
| "1982 trade standstill; Far East import era separately undated" | [HIST] p.1 | ✅ Match |
| "2000 Re-organisation & National Seminar" | Brief §3, §4 | ✅ Match |
| "2000 Rules Framed" | Brief §6 | ✅ Match |
| "26.06.2000 Memorandum" | Brief §6 | ✅ Match |
| "2001 Fresh Representation" | Brief §6 | ✅ Match |
| "Dec 2003 Workshop" | Brief §6 | ✅ Match |
| "Oct 2005 DFO Hojai Refusal" | Brief §6 | ✅ Match |
| "01.03.2006 CEC" | Brief §6 | ✅ Match |
| "2005–2016 Continued Efforts" | Brief §6 | ✅ Match |
| "2017 Forest Minister's Interest" | Brief §6 | ✅ Match |
| "2022 Resolution" | Brief §7 | ✅ Match |
| "2023 Assam Agarwood Promotion Policy" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| "2024 CITES Export Quota" | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| "2025 First Legal Agarwood Export" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |
| "2026 Export Promotion Cell" | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 | ⚠️ Unsupported |

### 2.20 `src/features/research/ResearchPage.tsx`

| Published Fact | Ledger Reference | Verdict |
|---|---|---|
| "The Agarwood Trade of Assam" — site-summary | Correctly labeled | ✅ Match |
| "Abstracts of the 2000 national seminar" — client-publication | CLIENT_MATERIAL_RESEARCH.md §4a | ✅ Match |
| "Cultivation & market data" — Assam Tribune 18 Nov 2024 | CLIENT_MATERIAL_RESEARCH.md §1 | ✅ Match |
| "Policy documents" — gazette notifications | CLIENT_MATERIAL_RESEARCH.md §4a, §4b | ✅ Match |

---

## 3. Restricted/Private Content Published

| # | Location | Content | Issue |
|---|---|---|---|
| 1 | Former `HistoryPage` copy | Full names of AATMA founders/office-holders appeared in the old rendered component | Historical issue — names were removed from current authored page copy; do not restore them. Supplied books/documents are reproduced as client materials and are not expanded into site-authored member profiles. |

---

## 4. Client-Approval Blockers Unresolved

| # | Blocker | Source | Status |
|---|---|---|---|
| 1 | **Full names removed from History and timelines** | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §5(4) | 🚫 **Unresolved** — names still published in HistoryPage.tsx |
| 2 | **Client authorizes web publication of identifiable event attendees** | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §5(1) | ⚠️ **Unresolved** — no evidence of client authorization |
| 3 | **Newspaper clippings and 2001 book may be reproduced** | CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §5(3) | ⚠️ **Unresolved** — no evidence of client authorization |

---

## 5. External Dependencies

| # | Location | Dependency | Issue |
|---|---|---|---|
| 1 | `src/data/books.ts` — AGAR book | Google Drive download link | 🔗 External file-hosting dependency. CLIENT_ASSET_AND_PROVENANCE_AUDIT.md §4 flags this. |

---

## 6. Key Findings

### 6.1 Well-supported content
- All three news articles (Hindustan Times, Assam Tribune × 2) are fully traced to client-supplied clippings
- All policy page content traces to the two gazette notifications
- All homepage sections (Formation, Critical Era, Achievement, NDF Findings, Rules, Challenges) trace to the client brief
- The AgarStory timeline traces to brief §2, §4, §5

### 6.2 Systematic unsupported claims
The following claims appear across multiple files and have **no ledger entry**:
1. **2019 Cabinet decision** (35 bighas / 5 hectares) — appears in content.ts, books.ts, InteractiveTimeline
2. **2020 Policy details** (5-year initial term) — appears in content.ts, books.ts
3. **2025 first legal export** (100 kg + 12 kg, ₹2.35 crore) — appears in content.ts, books.ts, InteractiveTimeline, About.tsx
4. **2026 Export Promotion Cell** — appears in content.ts, books.ts, InteractiveTimeline
5. **Nagaon seminar** — appears in books.ts
6. **Tree population figures** (114.3 million / 139.89 million) — partially supported (Assam figure yes, India figure no)
7. **Oil pricing** (USD 32,000–40,000/kg) — appears in books.ts
8. **Return on investment** (₹623 per ₹100) — appears in books.ts

### 6.3 Restricted content
- Full names of AATMA founders/office-holders remain in HistoryPage.tsx and InteractiveTimeline.tsx, directly conflicting with the client's privacy instruction.

---

## 7. Recommendations

1. **Remove or anonymize full names** in HistoryPage.tsx and InteractiveTimeline.tsx immediately
2. **Hold or source** the 2019/2020/2025/2026 claims — either find client-supplied sources or remove them
3. **Replace Google Drive link** for the AGAR book with a locally hosted PDF
4. **Obtain client authorization** for event attendee publication and clipping/book reproduction
5. **Add source labels** to all unsupported claims or remove them
