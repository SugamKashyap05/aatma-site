# Phase 1 — Canonical claim ledger and rendered-route map

> **Status (updated 2026-10-19):** Phase 1 reconciliation in progress. The current draft has been reconciled for identified claims and selected corrections, but the full rendered-claim census and every-item source map are not yet complete. User decisions are required for the listed metadata, privacy, and translation items. This is not a release sign-off. The user's client-only content rule and explicit privacy decisions supersede any older checkboxes below.
>
> The previous `docs/APPROVED_CONTENT_LEDGER.md` and `docs/HOMEPAGE_VERIFICATION_REPORT_FINAL.md` are retained as superseded evidence. Do not use their stale line numbers, `exclude` verdicts, or “not in client documents” conclusions as Phase 3 instructions.

## Client-source key

- **[HIST]** — `documents/A BRIEF HISTORY OF AGAR.pdf` (client-authored history)
- **[BRIEF2]** — `documents/A brief note on Agar Trade (2).docx` (the prior DOCX-backed brief used for the existing `/about` spine; compare against the final PDF before treating its wording/counts as current)
- **[BRIEF2-PDF-FINAL]** — client-provided attachment `A brief note on Agar Trade (2) (2).pdf` (10 pages; visually marked red passages). This is the newest supplied brief for the redesign. Full paragraph/formatting reconciliation against the DOCX and rendered site is **pending**; do not infer completion from the previous `/about` reader.
- **[BRIEF1]** — `documents/A brief note on Agar Trade (1).docx` (older, unique alternate in the separate `documents/` folder; it gives 2017 for the Forest Minister meeting, while [HIST] and [BRIEF2] give 2016; authority not yet confirmed, so do not use it for public copy)
- **[HCM]** — `documents/AATMA to HCM.docx` (client-authored letter)
- **[PRESS]** — `documents/AATMA press note Rev.docx` (client-authored press note)
- **[CLIPPING]** — client-supplied newspaper clippings; only verified items are public in `src/data/news.ts`, with held candidates documented in this ledger
- **[BOOKS]** — the three client-supplied publications: `public/books/agar.pdf`, `public/books/abstracts-2000.pdf` and `public/books/proceedings-seminar-2001.pdf`
- **[SEMINAR]** — `public/books/abstracts-2000.pdf` (client-supplied seminar abstracts; cover page identifies dates and venue)

`verified` means a client-authored/supplied primary document directly supports the claim. `press estimate` is a separate provenance class. `needs confirmation` means only partial, secondary, composite, or unsupported wording remains. `exclude` means no client primary source was found in the reconciliation pass; it is not a verified falsehood.

## 0.1 Final-PDF full-reader fidelity — verified; homepage destination map pending

The user-approved homepage redesign is planned in `docs/FINAL_BRIEF_HOMEPAGE_REDESIGN_PLAN.md`. The final 10-page PDF was extracted and compared with `src/data/about-spine.ts`: the reader includes an opening editorial plus 10 headed sections, with 36 paragraphs (3 editorial + 33 section paragraphs) and 4,343 whitespace-delimited words. The red-font scan found 185 text spans across pages 2–3 and 6–10; rendered inspection of those pages confirmed the red-marked passages and their topic context. All 36 source paragraphs match the PDF text layer after normalizing only whitespace, zero-width formatting characters, and spaces before punctuation. The source-text scan covers the complete paragraph content, including red-formatted headings and passages.

**Scope boundary:** this verifies the full-text reader and the About pilot. A targeted homepage follow-up now adds the 2011 MoEF meeting to Critical Era, combines the two 2016 events into one card, and removes the standalone LPC card from Agar Story at the client's request. The wider destination-by-destination review of remaining red additions is still open; see `docs/HOMEPAGE_BRIEF_GAP_AUDIT.md`. Do not treat the full reader or 185 red-text spans as proof that every homepage topic is complete.

## 1. Current public-route map

| Route | Rendered component(s) | Canonical timeline/data |
|---|---|---|
| `/` | `HomePage`, `Navbar`, `AatmaHero`, `About`, `SanchiPaatSection`, `AgarStory`, `FormationSection`, `CriticalEraSection`, `AchievementSection`, `NdfFindingsSection`, `RulesSection`, `ChallengesSection`, `PressTeaser`, `LatestNewsTeaser`, `Footer` | Section-local data; news teaser from `src/data/news.ts`; see home claim rows and open rendered census |
| `/history` | `HistoryPage`, shared `PageLayout`, `InteractiveTimeline` | `InteractiveTimeline.DEFAULT_EVENTS` and `DEFAULT_ERAS`; `HistoryDataSection` is not imported/rendered |
| `/books` | `BooksPage`, `BookLibrary`, `BookCard`, reader components, shared `PageLayout` | `src/data/books.ts`; client-supplied publications and local scan assets |
| `/policy` | `PolicyPage`, `PolicyNav`, `RulesSection`, `ComparisonTable`, `CitesCompliance`, `PolicyDataSection`, `GazetteCitations`, shared `PageLayout` | Policy components and client-supplied source materials; registration walkthrough and online guidance are not imported/rendered |
| `/press` | `PressPage`, `MediaCoverageTimeline`, `PressReleaseArchive`, `PressMeetSection`, `PressMeetGallery`, shared `PageLayout` | `src/data/press.ts`, `src/data/news.ts`, client-supplied video and frame-grab assets |
| `/research` | `ResearchPage`, `TradeDataSection`, chart components, shared `PageLayout` | Research publication/document cards, trade data and chart components; `ResearchSections.tsx` and `src/data/resources.ts` are not imported/rendered here |
| `/news` | `NewsIndex`, shared `PageLayout` | `src/data/news.ts` |
| `/news/aatma-thanks-cm-sarma-2023` | `NewsArticleView` resolves to `NotFoundPage` | Candidate clipping held from public data pending verified outlet/masthead and issue date; see NEWS-005 |
| `/news/winds-of-change-2023` | `NewsArticleView`, shared `PageLayout` | `getNewsBySlug()` from `src/data/news.ts`; client-supplied clipping transcription |
| `/news/prospects-assam-agarwood-2024` | `NewsArticleView`, shared `PageLayout` | `getNewsBySlug()` from `src/data/news.ts`; client-supplied clipping transcription |
| `/resources` | `ResourceCenterPage`, shared `PageLayout` | `src/data/resources.ts`; local client-supplied and government documents |

`src/data/content.ts` `MILESTONES`, `src/features/milestones/Milestones.tsx`, `src/components/ui/timeline.tsx`, and the `defaultItems` copy inside `timeline.tsx` are currently orphaned: no public route renders them. `src/features/history/HistoryDataSection.tsx`, `src/features/research/ResearchSections.tsx`, `src/features/policy/RegistrationProcessWalkthrough.tsx`, and `src/features/policy/OnlinePlatformGuidance.tsx` are also not imported by their route pages. Do not treat these source-only modules as current rendered claims or wire them back into routes without a new source audit. The orphaned research module contains general science/partnership claims and generated illustration references that are not approved route content. They are not a third public timeline.

## 2. Canonical identity, hero, About and home claims

| ID | Rendered claim / component | Current classification | Client evidence / caveat | Phase 3 action |
|---|---|---|---|---|
| ID-001 | Full legal name and AATMA abbreviation | Verified | [HIST] p.2 | Retain |
| ID-002 | Established 1976 | Verified | [HIST] p.2 | Retain |
| ID-003 | Registration `664 of 1978-79` | Verified | [HIST] p.2 | Retain |
| ID-004 | Unverified phone/email contact values (exact values intentionally omitted from this ledger) | Excluded | No verified client-primary citation was recorded in the earlier audit; the current 11-route rendered text check finds no visible email pattern | No dedicated Contact route/section remains; the unverified repository README contact block was also removed. Do not restore direct phone/email details without a client source and explicit publication context. |
| ID-005 | Unverified Assamese hero tagline | Excluded | Not located in client primary documents | Removed from the hero; unused stored copy also removed |
| ID-006 | Hero “Est. 1976 · Hojai, Assam” | Verified | [HIST] p.2 | Retain |
| ID-007 | Hero “Representing the agarwood trade and agaroil manufacturing sector of Assam” | Verified paraphrase | [HIST] association purpose; [BRIEF2] §2 trade sector wording | Retain; replaced the earlier site-authored composite tagline |
| ID-008 | About precious-gift opening | Verified | [BRIEF2] §1 | Retain current exact wording |
| ID-009 | Sanchi-paat scripture sentence and three named Vaishnav saints | Verified | [HIST] p.1 | Retain |
| ID-010 | Scientific name/family and three species | Verified | [BRIEF2] §1 | Retain |
| ID-011 | About statistic `1976 / Established` | Verified | [HIST] p.2 | Retain; the adjacent “50 years of advocacy” phrase was a site-calculated duration, not client wording, and has been removed |
| ID-012 | About statistic `~2 Lakh livelihoods` | Exclude | Not in client primary sources | Remove or hold pending client confirmation |
| ID-013 | About statistic `112 kg to Saudi Arabia & UAE` | Exclude | Not in client primary sources | Remove or hold pending client confirmation |
| ID-014 | About statistic `1.51 Lakh kg chips & powder` | Exclude | Not in client primary sources | Remove or hold pending client confirmation |
| ID-015 | AgarStory title “Agarwood in the trade” | Verified paraphrase | [HIST] §“ABOUT THE TRADE” and [BRIEF2] §2 | Retain |
| ID-016 | Earlier AgarStory resin-formation and price phrases | Site-authored demo-summary content; not a client publication or independently verified site claim | Wording appeared in the team-authored `agarwood-trade-of-assam.txt` demo summary | Removed from AgarStory; the demo summary is removed from the public book library and must not be cited as a client source |
| HIS-001 | Former HistoryPage claims about regional livelihood, preserving biodiversity/traditional knowledge, and 2022 recognition supporting sustainable trade | Excluded site-authored interpretations | No direct support identified in client sources searched | Removed from `/history` |
| HIS-003 | Former SanchiPaatSection claims about durable bark, a natural canvas, poetry/historical records, and pre-paper writing | Excluded site-authored expansion | [BRIEF2] §1 supports use of sanchi paat for scripture and named Vaishnav saints; it does not support these additional details | Removed the unsupported expansion; retained client-supported scripture wording |
| HIS-004 | HistoryDataSection interpretation and counts (16 events, 6 eras, 10 in Critical Era; “archive not evenly distributed” and “seeking recognition”) | Excluded site-authored derivative | Derived from website timeline records, not supplied as a client statement | Removed from public `/history` |
| HIS-005 | 14 February 2023 Stakeholders Conference and 26 August 2026 AIDC workshop timeline entries | Verified | [BRIEF2] §7 and §10 directly support event dates, purpose/participation, and attending ministerial roles | Added to `/history` timeline |
| HIS-002 | Agarwood chips and agar oil/attar as perfume raw materials | Verified paraphrase | [BRIEF2] §1 says they are among the “most useful and oldest raw materials for perfume” | Retained without the unsupported “global fragrance traditions” clause |
| ID-017 | AgarStory Sylhet, Barpather, Hojai and Naharani/Jorhat/Sibsagar passages, NEFA/Bhutan, 1982 standstill, Far East, Manipur/Bombay route | Verified with source-wording corrections | [HIST] p.1; [BRIEF2] early-trade passage; [BRIEF2] §5 for LPC | Use client spelling “Karbi Angong”; remove unsupported “first” from the Sylhet heading; mark Hojai undated (source says “Meanwhile”), retain “A few years later” for Naharani/Jorhat/Sibsagar, keep Far East undated, and date only the standstill to 1982. |
| ID-018 | 22–23 November 2000 national seminar at Assam Administrative Staff College, Khanapara, Guwahati; Dr P.K. Hajra presided | Verified | [HIST] p.2 supports the Guwahati event and presiding officer; [SEMINAR] cover p.1 gives 22–23 November and Khanapara, Guwahati-22 | Retain exact date/venue; no Nagaon conflation |
| ID-019 | Standalone LPC card in the homepage Agar Story | Verified in source; removed from that homepage section at the client's request. The full brief remains in the expandable About reader; the separate Critical Era account still contains its sourced 2000 LPC-stoppage reference. | [BRIEF2] §5; client removal instruction | Do not restore the standalone Agar Story card. This scope does not remove LPC references from other site routes. |
| ID-020 | Formation, cottage-industry obstacles, 1976, registration, 2000 re-organisation | Verified | [HIST] p.2 | Retain |
| ID-021 | Critical Era content: 2000 Rules/industrial-estate requirement and LPC stoppage; 2000/2001/2003–04 representations/workshop; 2005 PCCF recommendation and DFO verification denial; 2006 CEC recommendation; 2007 writ petition and withdrawal account; 2010 harassment account; 2011 MoEF meeting/briefing; 2016 Forest Minister meeting/proposal and National Conference now combined in one card | Verified as client-supplied account | [HIST] pp.3–4 and latest [BRIEF2] §6 | Expanded homepage dialogs use [BRIEF2] §6 copy — the on-page citation label was removed at the client's request, so §6 provenance is recorded in code and project docs only. Keep claims framed as AATMA's account and retain approximate/qualitative wording. The user's explicit instruction to add the 2011 passage includes its source-written reference to President Shri A. Rahman; no other AATMA member names were added. |
| ID-022 | 24 August 2016 Forest Minister meeting and proposal | Supported by [HIST] p.4 and latest [BRIEF2]; older [BRIEF1] gives 2017, so precedence remains a user decision | The current route uses 2016 from the two newer/corroborating client sources | Keep the 2016 wording provisionally; do not use the older version's 2017 without confirmation |
| ID-023 | 28 October 2016 national conference at NEDFi House, Guwahati | Verified | [HIST] p.4 | Retain |
| ID-024 | Achievement `1976 / AATMA formed` replaces `50+ years of legacy` | Verified for 1976; former duration was site-calculated | [HIST] p.2 | Retain the source year; remove the unlabelled “50+” duration from public copy |
| ID-025 | Achievement `>800` — “Agarwood cottage industries on the ground” | Verified | [BRIEF2-PDF-FINAL] §9 — “their number on the ground stands more than 800” | Keep the strict lower-bound and exact subject; do not label the count as “household units” or imply AATMA representation |
| ID-026 | `22 years` of licensing infeasibility / struggle | Verified | [BRIEF2-PDF-FINAL] editorial and §9 state “after 22 years” | Retain as client wording; do not infer it from the 2000–2016 Critical Era span |
| ID-027 | 19 July 2021 CM meeting and 21-year description | Verified | [HIST] p.4 | Retain |
| ID-028 | WBI Rules 2022 notified on 12 January 2023; registration replaces licence | Verified | [BRIEF2-PDF-FINAL] §9, [HIST] p.4, [HCM], [PRESS] | Use “notified” in the homepage summary; keep the instrument's 2022 title and the 12 January 2023 date distinct |
| ID-029 | Stakeholders Conference, 14 February 2023 | Verified | [BRIEF2] §7 | Retain |
| ID-030 | NDF/BSI report February 2024 | Verified | [BRIEF2] §8 | Retain |
| ID-031 | IUCN CR and CITES Appendix II effective 16 February 1995 | Verified | [BRIEF2] §8 | Retain |
| ID-032 | Tree population `1143.7 Lakh` and five districts | Verified | [BRIEF2] §8 | Retain |
| ID-033 | High license fees, registration process, NOC/DGFT/30-working-day wording, single-window advocacy | Verified | [BRIEF2] §10 | Retain as client-authored concerns |
| ID-034 | 26 August 2026 AIDC workshop | Verified | [BRIEF2] §10 | Retain |
| ID-035 | Institutional office-address text visible on supplied publication/media artwork | Client-supplied artifact text; not a site-authored contact block | The client-supplied proceedings cover (p.1) and supplied press-meet banner display an institutional office-address line; current visible instances are inherent in the `/books` cover and `/press` media frame. See `docs/ACTIVE_ASSET_PROVENANCE_REGISTER.md`. | Do not create a separate Contact section or repeat/normalize the address as site-authored copy; preserve the source artifact only under the existing client-material decision. |
| ID-036 | Achievement summary name “Dr. Himanta Biswa Sarma” | Verified with a source spelling discrepancy | [BRIEF2-PDF-FINAL] §9, [PRESS], and [HCM] use “Sarma”; [BRIEF2-PDF-FINAL] §VII and [HIST] p.4 use “Sharma” | Homepage summary follows §9/[PRESS]/[HCM]; the full reader preserves the source text verbatim. |

## 3. Policy, research, books, press/news and resources

| ID | Rendered claim / component | Current classification | Client evidence / caveat | Phase 3 action |
|---|---|---|---|---|
| POL-001 | Rules 2022 notification and register-not-licence | Verified | [BRIEF2] §9; [HCM]; [PRESS] | Retain |
| POL-002 | Unit categories and five-year registration | Verified | [BRIEF2] §9 | Retain |
| POL-003 | “About 1000 Agar Wood Based Industries” | Client-authored press note | [PRESS] | Retain with AATMA-publication provenance; do not present as independent count |
| POL-004 | 800+ versus about 1000 industries | Verified but internally inconsistent | [BRIEF2] §9 versus [PRESS] | Present each source separately or label count provenance; do not choose a silently reconciled number |
| POL-005 | CITES compliance summary and export-quota claims | Verified with provenance distinction | [BRIEF2] §9 and [PRESS] support the “fully CITES compliant” framing; the 79% quota figure appears only as a labelled [CLIPPING] press estimate | Keep client brief/policy facts distinct from the 18 Nov 2024 press estimate; public policy copy now attributes the compliance characterization to AATMA’s 14 Jan 2023 press note. Historical CITES timeline uses “around seven” and qualitative business-house movement from [HIST] §7; removed unsupported 7–8 count and 2005–2022 “blocked” span. |
| POL-006 | Advocacy timeline date 2017 for Forest Minister meeting | Corrected in current copy, with older-source discrepancy recorded | [HIST] p.4 and latest [BRIEF2] give 24 August 2016; older [BRIEF1] gives 2017 | Current copy uses 2016 provisionally; ask user to confirm [BRIEF1] is superseded |
| POL-007 | Registration Process Walkthrough and Online Platform Guidance | Excluded non-client operational guidance | These components included reconstructed procedures and general advice not supplied by the client (e.g. guessed platform URL, identity-document checklist, payment methods, application timelines, reminders, troubleshooting) | Removed from `/policy` rendering and navigation; source files remain unrendered |
| POL-008 | CITES “Not in Source Documents” gap list | Stale/contradicted by source | [BRIEF2] §8 names Aquilaria malaccensis and CITES Appendix II; the old gap list wrongly said those were absent | Removed the gap list from `/policy` |

| RES-001 | NDF figures, BSI, IUCN, CITES, district data | Verified | [BRIEF2] §8 | Retain |
| RES-002 | TradeDataSection charts and derived metrics | Client-supplied press estimates; any site calculations are labelled | [CLIPPING] The Assam Tribune, 18 Nov 2024 reports 7.7% CAGR for 2018–2022, $44.05bn by 2023, $64bn projected by 2029, and India imports over 142 tonnes/re-exports 141 tonnes in 2017–2021 | Market chart now displays only the two reported endpoints with a visual-only dashed connector; trade chart labels the import value as a lower bound and retains the article-attributed regional shares |
| BOOK-001 | AGAR scanned book title and author names | Client-supplied publication | The user's latest instruction identifies the AGAR scan as the first of the two real client-supplied books; local 31-page scan is available | Retain locally with publication provenance; no external Google Drive dependency |
| BOOK-002 | “The Agarwood Trade of Assam” text summary | Project-authored demo summary; not a client-original publication | `public/books/agarwood-trade-of-assam.txt` was a team-authored summary, not a client book | Removed from `BOOKS` and `public/`; do not cite as client-provided material |
| BOOK-003 | “AATMA: Fifty Years” text summary | Project-authored demo summary; not a client-original publication | `public/books/aatma-fifty-years.txt` was a team-authored summary, not a client book | Removed from `BOOKS` and `public/`; do not cite as client-provided material |
| BOOK-004 | Seminar proceedings volume | Client-supplied publication | `public/books/proceedings-seminar-2001.pdf`, 128-page scan located in Downloads and copied unchanged | Retain locally and render the scan; do not fabricate transcript/chapter text |
| BOOK-005 | Claims in the two retained client publications | Client-supplied publication content, not independently validated website claims | The two retained items are the AGAR scan and seminar proceedings scan; the two team-authored text summaries were demo books and have been removed | Keep publication-level provenance visible; do not use removed demo summaries as sources for independent site claims |
| BOOK-006 | Seminar locations/dates mentioned in different supplied materials | Client-supplied source claims; keep distinct | [HIST] identifies the November 2000 National Seminar in Guwahati; other client-supplied material refers to a Nagaon seminar | Preserve distinct client source accounts; do not merge separate events or silently change the supplied books |
| PRESS-001 | AATMA press note/letter PDF reproductions | Client-supplied documents | [PRESS], [HCM], and exact-hash client PDFs DOC-003/DOC-002; DOCX/PDF and signed-scan equivalence is not verified | Treat each supplied PDF as its own client document; do not claim it is a privacy-safe substitute for any signed scan until content matching and privacy checks are complete |
| PRESS-002 | Hindustan Times and Assam Tribune figures | Press estimate, not AATMA-authored fact | [CLIPPING] | Keep only under explicit press-estimate label |
| PRESS-003 | 2025 consignment and quota figures in clippings | Press estimate | [CLIPPING] | Label separately; do not promote to client fact |
| NEWS-004 | “No online archive copy available” in clipping source notes | Excluded unverified availability claim | Client-supplied scans establish clipping provenance, not that no public archive exists | Removed the availability assertion; retain outlet/date and client-supplied-clipping citation |
| NEWS-005 | Hindustan Times clipping previously dated 17 January 2023 | Held out of public data pending verified outlet and issue date | [IMG-004] shows a Hojai story dateline; it does not establish the newspaper masthead or issue date. The prior route used `2023-01-17` as publication metadata. | Clipping is now excluded from `NEWS_ARTICLES`; retain the client asset and internal transcription. Do not restore until a full citation is provided |
| PRESS-004 | Press/letter display titles and source labels | Site metadata, not printed document titles | Documents support their type and date; the prior letter-card phrase “Gratitude for Agarwood Trade Revival” was site-authored and local DOCX filenames were not visitor-facing source labels | Use neutral document-type/date titles and generic client-source labels |
| RSC-001 | Seminar dates 22–23 November 2000 | Verified | [SEMINAR] cover page p.1 shows “22-23 November, 2000” and “Assam Administrative Staff College, Khanapara, Guwahati-22” | Retain exact dates and venue from the client-supplied abstracts scan |
| RSC-002 | Resource titles/dates/form descriptions | Mostly verified | [HIST], [BRIEF2], gazette-derived entries | Retain only rows with a cited source; mark uncertain metadata separately |

## 4. Corrected ledger rows

The old ledger's `exclude` / `needs confirmation` conclusions below are corrected by direct [BRIEF2] evidence. These are reconciliation corrections, not implementation authorizations.

- **Writ Petition W.P.(C) No. 6284/2007** — Verified, [BRIEF2] §4.
- **2001 multi-agency alert / hotel detentions / airport and police involvement** — Verified, [BRIEF2] §4.
- **More than 800 cottage industries** — Verified, [BRIEF2] §9.
- **Stakeholders Conference, 14 February 2023** — Verified, [BRIEF2] §7.
- **High license fees and overly lengthy registration** — Verified, [BRIEF2] §10.
- **NOC process through DGFT, State Forest Department, MoEFCC/CITES and up to 30 working days** — Verified, [BRIEF2] §10.
- **Single-window system advocacy and buyer-loss wording** — Verified, [BRIEF2] §10.
- **26 August 2026 AIDC workshop and participating ministers** — Verified, [BRIEF2] §10.
- **Species list** — Verified, [BRIEF2] §1.
- **IUCN Critically Endangered listing** — Verified, [BRIEF2] §8.
- **NDF figures, BSI study, CITES date and district list** — Verified, [BRIEF2] §8.
- **WBI Rules claims currently rendered without quota quantities** — Verified, [BRIEF2] §9.

### 4.1 Current reconciliation findings (19 October 2026)

- **Chart CH-03, `/research`:** The client-supplied 18 Nov 2024 clipping reports 7.7% CAGR for 2018–2022, $44.05bn by 2023, and $64bn projected by 2029. The prior chart incorrectly applied 7.7% to the 2023–2029 endpoints. Source code now shows the two reported endpoints only, with a dashed visual connector and no invented annual values. Verify the compiled rendering before sign-off.
- **Chart CH-05, `/research`:** The clipping says India imported **over 142 tonnes** and re-exported 141 tonnes in 2017–2021. The chart now labels the import bar as a lower bound and no longer calls the two flows “near-parity.”
- **Policy comparison, `/policy`:** The client history uses “around seven” processing units and qualitative “several” business-house movement. Replaced unsupported `6–7` and `7–8` ranges with those source-grounded forms.
- **Scientific family spelling, `/history`:** The client brief/history spell the family `Thymeleaceae`; the rendered copy now matches the client source rather than importing an external spelling correction.
- **Duration statistics, `/` and metadata:** Removed the site-calculated “50 years/50+ years” copy. The client-sourced year 1976 remains. The static and route metadata no longer call AATMA a “50-year institution” or add the unsupported “at the heart of India's trade” phrase.
- **ToF resource copy, `/resources`:** Removed “notified alongside the wood-based industries rules”; that relation was imprecise for the source dates. The listed 9 Dec 2022 notification date remains subject to content-level comparison with the client scan.
- **Transcript discrepancy, `/press`:** The public Assamese and English transcript files record `77` for the species count; the Hindi file records `17`. These machine-produced translations have not been checked against the supplied video. Do not silently edit or harmonize them; user decision/source-audio review is pending.
- **External forest image:** Source components no longer render the Wikimedia-derived forest photo and the footer credit was removed. The derivative/source files remain in `public/assets/backgrounds/`; current built-route and direct-asset state must be verified, and deleting the files requires user confirmation.
- **Source variants:** A separate `documents/A brief note on Agar Trade (1).docx` is not in the specified image-folder inventory and differs from the newer brief/history on a 2016/2017 meeting date. Current site uses 2016 from [HIST] and [BRIEF2]; user confirmation that version (1) is superseded is pending.
- **Privacy/equivalence:** DOC-001 has a privacy-edited `/resources` derivative; DOC-005/008 are same-subject but non-identical Gazette copies; DOC-006/007 have no confirmed public mapping; DOC-010/011 DOCX-to-PDF equivalence is unverified. The original scans IMG-026/030/031 remain explicitly excluded from public routes.

## 5. Previously flagged claims to re-check against the current rendered census

This is a historical candidate list, not proof that every item still renders or remains unresolved. Re-check each against the current rendered route and source classification before acting. Some figures may appear as client-supplied newspaper text and must remain visibly attributed as press reporting rather than AATMA fact.

1. `~2 Lakh` livelihoods.
2. `112 kg` Saudi Arabia/UAE export.
3. `1.51 Lakh kg`, `7,050 kg`, `1,19,400 kg`, `5,560 kg` quota figures.
4. `100 kg + 12 kg`, `₹2.35 crore`, and 2025 first-consignment wording.
5. 2019 Cabinet liberalisation and 35-bigha/5-hectare wording.
6. 2020 Assam Agarwood Promotion Policy and five-year term.
7. May 2026 Agarwood Export Promotion Cell.
8. Nagaon seminar location.
9. USD 32,000–40,000/kg and ₹623 net return.
10. “Largest population in India”, unsupported native-range wording, unsupported Hojai-hub superlative, and unsupported price claims.
11. Unverified contact values and Assamese hero tagline — removed from public content and unused defaults; do not reintroduce without client sourcing.

## 6. Privacy and provenance gate

- The current public routes use role labels rather than AATMA office-bearer names. Retain that behavior.
- Historical/religious names, government officials, and public figures in client-authored text are not AATMA office-bearer names; do not remove them without a separate client instruction.
- Keep client publications, client-supplied press clippings/estimates, and client-supplied source documents visibly distinct; do not present website-written summaries as client publications.
- Client-provided books, clippings, and documents are to be represented on the site under the user's explicit instruction; no further provenance or publication-permission confirmation is being requested for those materials.
- The active asset register documents the current rendered photo/map/media assets. Full OCR/name/privacy review of image-only books, proceedings, seminar abstracts, gazettes/forms, and the full press-meet video remains open; do not infer those scans contain no names or personal details.

## 7. Phase 1–2 gate checklist

- [x] Current routes and data sources mapped.
- [ ] Complete claim-by-claim comparison of every rendered route with exact client source passages; selected claims are reconciled, but the full census is incomplete.
- [ ] Recheck every legacy-ledger verdict against the current source corpus; selected stale rows are corrected, but a full reconciliation is not complete.
- [x] Press estimates separated from client-authored facts.
- [x] Phase 2 client decision: all supplied books/materials are client-provided and should be represented; no further provenance confirmation is needed.
- [x] Phase 2 client decision: no non-client additions; unsupported claims are omitted rather than held for approval.
- [ ] External Wikimedia-derived background is removed from current components, but `public/assets/backgrounds/` remains directly accessible; user decision is required before deleting or archiving those files.
- [x] The two confirmed client publications (AGAR and the 2001 seminar proceedings) are represented in `/books`; the two project-authored demo summaries are excluded. DOC-006/007 remain unresolved document inventory items, not confirmed books.
- [ ] Historical root-preview smoke (18 October 2026, 55/55) predates the current Phase 1 edits; rerun on the fresh build before acceptance.
- [ ] Historical rendered-image matrix (18 October 2026) predates the current Phase 1 edits; rerun after rebuild, including lazy-load/decode checks.
- [ ] Historical rendered text/privacy smoke predates the current Phase 1 edits; rerun on current routes and verify all eight Resources PDF targets.
- [ ] Historical text-only privacy sweep (19 October 2026; 238 files, configured patterns only) must be rerun after the current edits; it is not a full binary/OCR privacy audit.
- [ ] Current browser checks pending: the external-photo footer credit was removed with the background reference; recheck the AGAR reader, press tabs/video, and route images against the rebuilt site.
- [ ] Full rendered-text census against the canonical claim ledger; route presence alone is not evidence of source validation.
- [ ] Finish the image-to-route-to-alt/caption/source/approval census, including full scanned-publication and video privacy review. The current active register covers live raster/map/media paths and known captions but does not close OCR or full-length video review.
