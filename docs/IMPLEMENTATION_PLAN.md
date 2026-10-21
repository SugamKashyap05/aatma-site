# Implementation Plan — Client Material Integration
**Board:** `aatma-site`
**Derived from:** `docs/CLIENT_MATERIAL_RESEARCH.md` (12 Oct 2026)
**Purpose:** feed the Kanban **triage** column. Each card below is written so a triager can promote it to `todo` with no further research.

---

## How to use this document

Every item is a proposed Kanban card. Each carries: **what to build**, **the verified source**, **acceptance criteria**, and **a dependency**. Cards are grouped into waves by what unblocks what.

Two things gate the whole plan:

- **GATE A — read item 5** (`WhatsApp Image ... 12.28.18 AM (2).jpeg`, 76 KB). Unread due to vision rate limits. Almost certainly a third newspaper clipping. Until it is read, Wave 3 (press archive) may be under-scoped.
- **GATE B — finish the gazette read.** Only Rule 2 (definitions) is verified verbatim. Rules 3+ contain the operative registration machinery. Until read, Wave 1's law-precision cards must cite the gazette for *definitions only* and the newspapers for *procedure*, which is weaker sourcing.

Neither gate blocks Wave 0 or Wave 2.

---

## Wave 0 — Foundations (no source gaps; do first)

### P-01 · Move client material into the repo
**Build:** Copy the 2 gazette PDFs and 4 images from `Downloads/` into `documents/` (already gitignored). Add a `documents/README.md` index naming each file, its publication, date, and what it sources. Place the downloaded videos in `_client_videos/` (gitignore it — 125 MB) or upload to a host and reference by URL.
**Source:** this research, §0.
**Acceptance:** `documents/` contains 7 new files beyond the original 5; the index names each source, publication and date; no video bytes enter git; `git status` shows nothing unexpected tracked.
**Depends on:** nothing.

### P-02 · Record the two verified facts that are currently wrong or vague
**Build:** Two targeted edits, each traceable to primary law.
1. `RulesSection.tsx` ToF entry currently reads *"Recently notified"* → replace with **notification dated 9 December 2022, file ECF No. 232904, published in the Assam Gazette No. 1 of 2 January 2023**.
2. `RulesSection.tsx` unit categorisation → add the gazette capacity thresholds: Micro ≤500 kg · Small 501–1000 kg · Medium 1001–2000 kg · Large >2000 kg or >20 vessels.
**Source:** research §4a, §4b — both read directly off the gazettes.
**Acceptance:** `npm run build` and `npm run lint` exit 0; the /policy route renders the new dates and thresholds; each new claim carries a visible citation naming the gazette number and date.
**Depends on:** nothing. **This is the highest-value card in the plan** — it converts two vague claims into primary-law-precise ones.

### P-03 · Verify AATMA leadership against `src/data/content.ts`
**Build:** The HT clipping names **[REDACTED: AATMA member] (President)** and **Helal Uddin (General Secretary)**, and credits **Chandra Mohan Patowary (Minister of Forests)**. Compare against `src/data/content.ts` and correct or confirm. Do not invent — if content.ts disagrees, report the conflict rather than silently overwriting (per `AGENTS.md` §8).
**Source:** research §3 — Hindustan Times, 17 Jan 2023.
**Acceptance:** A short note stating for each named role whether content.ts matches the source; any mismatch raised as an explicit conflict for the user to decide.
**Depends on:** nothing.

---

## Wave 1 — Policy depth (partially gated on B)

### P-04 · Add the two hectare thresholds to the ToF section
**Build:** Surface the legal definitions that make the ToF Rules meaningful and are absent from the site:
- **"Forest"** includes a continuous patch of **≥10 hectares with ≥200 naturally grown trees per hectare**
- **"Plantation"** = a scheme covering **≥0.1 hectare** on non-forest or community land
- **"Captive Plantation"** = **≥10 hectares** raised by WB industrial unit(s) or private entities on non-forest land
**Source:** research §4b — ToF Gazette Rule 2, read verbatim.
**Acceptance:** The three thresholds appear on /policy with each citing the ToF Gazette 2022; build and lint clean; a designer confirms the additions read as definitional, not promotional.
**Depends on:** nothing (Rule 2 is verified).

### P-05 · Add the registration time limits
**Build:** Add the **62-day** (secondary WB registration, fresh or renewal) and **74-day** (primary WB licence) maximum time limits per 5-year period, plus the auto-advance behaviour when an intermediate level exceeds its limit.
**Source:** research §2 — *The Assam Tribune*, 2 Aug 2023. **Note: sourced to the newspaper, not the gazette** — the operative rule text is unread (GATE B). If P-07 completes first, re-source to the gazette and update this card's citation.
**Acceptance:** Both figures appear with a citation that honestly names the newspaper as the source; if P-07 has landed, the citation is upgraded to the gazette rule number.
**Depends on:** nothing, but re-source after P-07.

### P-06 · Add the Legal Procurement Certificate and Certificate of Origin machinery
**Build:** Explain the export paperwork chain that currently appears on the site only as the phrase "CITES compliant":
- **Legal Procurement Certificate (LPC)** — issued per **FORM- XXV**, by a local forest official authorised by the **Chief Wildlife Warden** under the Wildlife Protection Act 1972, to establish consignment legality for a CITES export permit
- **Certificate of Origin** — issued by the DFO with jurisdiction over where the raw material originated, for traceability
- **Licensing Authority** = the DFO with jurisdiction over a particular *primary* WB Industrial Unit
- **Authorized Officer** = the DFO of the territorial/wildlife division with jurisdiction over the unit's location
**Source:** research §4a — WBI Gazette Rule 2 definitions, read verbatim.
**Acceptance:** The four definitions appear with gazette citation; the explanation distinguishes LPC from Certificate of Origin (they are different documents and the site currently conflates them under "CITES compliant").
**Depends on:** nothing (Rule 2 verified).

### P-07 · Read the remainder of both gazettes  ← closes GATE B
**Build:** Render and read WBI Gazette pp. 620–682 and ToF Gazette pp. 3–25. Extract the operative rules on classification, registration procedure, time limits, Registration Committees, and plantation registration/felling/transport. Produce a distilled markdown summary in `docs/`.
**Method:** `pymupdf` render at 150 dpi → vision read, as already proven. **Expect the 429 rate limit** — batch the reads, space them out, and consider OCR for the Assamese-font pages. The WBI PDF's text layer is in an Assamese encoding and does **not** extract as readable English.
**Acceptance:** A `docs/GAZETTE_RULES_SUMMARY.md` exists citing rule numbers verbatim; every figure the site currently states is traced to a rule number; anything the site states that the gazette contradicts is flagged as a conflict.
**Depends on:** nothing. **Blocks re-sourcing of P-05 and gates P-08.**

### P-08 · Add the transition history of the 2000 → 2022 rules
**Build:** The 2023 article gives a concrete before/after that the site lacks:
- Pre-*Godavarman Thirumulpad*: **588** primary WBIs (502 saw mills, 57 plywood, 27 veneer, 2 ply-cum-veneer)
- After: **down 66% → ~206** functional in Assam
- **~1,500** agarwood units, mostly cottage industry, required to relocate to Industrial Estates; owners refused; the sector "suffered a major setback"
- The 2022 Rules shift the forest department **from regulator to facilitator**
- Only primary WBIs need a licence and must sit in notified Industrial Estates; **secondary** WBIs (agarwood, katha, furniture) need registration only
**Source:** research §2 — *The Assam Tribune*, 2 Aug 2023. The 588/206/1,500 figures are the article's; the *regulator→facilitator* framing is the article's characterisation of the gazette, so cite accordingly.
**Acceptance:** A "23 years of advocacy" timeline entry or policy section carries the counts with citation; the regulator→facilitator shift is stated as the gazette's design intent, attributed.
**Depends on:** P-07 for the regulatory mechanism; the *counts* can ship from the newspaper now.

---

## Wave 2 — Market & research content (fully unblocked)

### P-09 · Create a market overview section
**Build:** A new section — candidate home `/research` or a dedicated `/market` route — carrying:
- Global agarwood chips market: **7.7% CAGR 2018–2022**, **$44.05 billion** (~Rs 3,52,405.6 crore) by 2023, projected **$64 billion** (~Rs 5,12,000 crore) by 2029
- Pricing: high-quality agarwood **~Rs 1 lakh/kg** international; agar oil **up to Rs 80,000/kg**; domestic chips **Rs 10,000–3 lakh/kg**; agar oil **Rs 6,000–17,500 per tola (11.66 gm)**
- Every figure labelled as a **2024 press estimate**, not AATMA data
**Source:** research §1 — *The Assam Tribune*, 18 Nov 2024.
**Acceptance:** All figures render with a citation line naming publication and date; a visible label distinguishes press estimates from AATMA's own data; build and lint clean; no figure presented as AATMA's own research.
**Depends on:** nothing. **Watch the honesty boundary** — these are a journalist's figures, and the site must not imply AATMA produced them.

### P-10 · Create a conservation & sustainability section
**Build:**
- Agarwood **critically endangered** (IUCN Red List), **CITES Appendix II** — export permitted only without harming survival
- MoEFCC commissioned a **Non-detriment Findings** study; report submitted by the **Botanical Survey of India, February 2024**
- Tree population: Assam holds **>82% of India's agarwood trees**, **11.437 crore** trees outside forest areas; **Golaghat 4.5 crore** (state's highest); other key districts Jorhat, Sivasagar, Karimganj, Cachar
- Tripura second nationally at **1.515 crore**
**Source:** research §1 — *The Assam Tribune*, 18 Nov 2024, itself citing the NDF report.
**Acceptance:** Figures carry citation; the IUCN/CITES status is presented with its own authority named (not attributed to AATMA).
**Depends on:** nothing.

### P-11 · Create an export quota & trade statistics section
**Build:**
- NDF study proposes state-wise export quotas; **Assam holds 79% of the national quota** for agarwood and agar oil
- **1.194 lakh kg** agarwood chips and **5,560 kg** agar oil per annum
- 2017–2021: India imported **>142 tonnes**, re-exported **141 tonnes**; eastern India accounted for **74% of imports** and **92% of re-exports**
**Source:** research §1.
**Acceptance:** Figures render with citation; quota figures labelled as proposed by the NDF study (not yet in force, per the article's framing).
**Depends on:** nothing.

### P-12 · Add the Assam Agar International Trade Centre
**Build:** A short item — the **Assam Agar International Trade Centre** to be established in **Golaghat district**, intended to eliminate middlemen and give farmers/traders direct access to national and international buyers.
**Source:** research §1.
**Acceptance:** Item appears with citation; the *purpose* (middleman elimination) is stated as the article describes it; no claim is made about the centre's operational status beyond "set to be established".
**Depends on:** nothing.

---

## Wave 3 — Press & media archive (gated on A)

### P-13 · Read item 5  ← closes GATE A
**Build:** Run vision analysis on `WhatsApp Image 2026-10-12 at 12.28.18 AM (2).jpeg` (76 KB) and transcribe it. Retry later if the 429 limit persists — it is a rate limit, not a failure.
**Acceptance:** A verbatim transcription added to the research report §6; publication, date, byline, headline recorded.
**Depends on:** nothing. **Blocks final scoping of P-14.**

### P-14 · Build a press & media archive section
**Build:** A structured archive of every attributable press item, each with **publication, date, byline, headline** and a source link or scanned clipping:
1. *The Assam Tribune*, **18 Nov 2024** — "Prospects of Assam's agarwood industry", PJ Vijayakar
2. *The Assam Tribune*, **2 Aug 2023** (p. 6) — "Wood-based industries: Winds of change soon", PJ Vijayakar
3. *Hindustan Times*, **17 Jan 2023** — "AATMA thanks CM Sarma for restoring glory of agar wood-based industries in Assam", HT Correspondent
4. *(item 5 — pending P-13)*
**Note:** the *Assam Tribune* item 2 sits on a page whose left column is an unrelated editorial, "River dredging". **Do not carry that over.**
**Source:** research §1, §2, §3, plus P-13.
**Acceptance:** Each entry names publication, date, byline, headline; the archive is separate from the existing MediaCoverageTimeline (which covers coverage of AATMA generally) or explicitly reconciles with it; build and lint clean.
**Depends on:** **P-13** for the final entry count.

### P-15 · Add AATMA's own address to the contact page
**Build:** The press-meet banner in both videos shows **"Head office : Main Road, Hojai – 782435"**. Verify against `src/data/content.ts` and reconcile.
**Source:** research §5 — read off the banner in both videos.
**Acceptance:** Address either confirmed present or added; if content.ts holds a different address, the conflict is raised rather than silently overwritten.
**Depends on:** nothing.

---

## Wave 4 — Video press meet (needs a transcript decision)

### P-16 · Decide the transcript route and produce a real transcript
**Build:** Whisper cannot transcribe Assamese (`as` scored 2.2%; the model misroutes to Bengali and produces garble or hallucinated English). Choose one and execute:
- **AI4Bharat IndicConformer** (`ai4bharat/indic-conformer-600m-multilingual`) — explicitly covers Assamese, open weights, CPU-feasible
- **Google Cloud Speech-to-Text** or **Azure AI Speech** — both list `as-IN`
- **A human Assamese speaker** — 6½ + 13¼ minutes of audio
**Deliver:** timestamped transcripts for both videos.
**Source:** research §5.
**Acceptance:** A transcript exists whose sample passages read as coherent Assamese; the transcript is checked by someone who can read the language, not accepted on model self-report.
**Depends on:** nothing, but **blocks P-17**. **This is a user decision** — which route, and whether the cost is justified.

### P-17 · Publish the press meet as a video feature with transcript context
**Build:** The client's stated intent is that the video be posted **with its full spoken context**. Build:
- Video player(s) on a `/press/press-meet-2023` route or equivalent
- Timestamped transcript displayed alongside, syncable to playback position
- The press-meet facts that *are* independently verified — date, venue, organisation, named speakers, the points the HT clipping reports (§3)
- Both broadcasts offered, labelled by broadcaster (**Asom First**, 6 min 27 s; **News To Newsaxom**, 13 min 20 s), noting they cover the same event
**Hosting note:** the files are 12.7 MB and 111.9 MB — too large for git. Host externally or add a compressed re-encode via the existing ffmpeg at `C:/Users/kashy/AppData/Local/hermes/tools/ffmpeg-9.0.1-win32-x64/bin/ffmpeg.exe`.
**Accessibility:** a transcript alongside video is required for WCAG conformance — this card is where that obligation lands.
**Source:** research §3, §5.
**Acceptance:** Video plays on the deployed subpath; transcript displays and is synced or clearly timestamped; both broadcasts labelled by broadcaster; the HT-reported substance is available to a reader who never plays the video.
**Depends on:** **P-16**.

---

## Dependency graph

```
P-01 (material into repo)
P-02 (law-precision edits)      ← highest value, no gates
P-03 (leadership verify)
P-04 (hectare thresholds)
P-06 (LPC / Certificate of Origin)
   │
P-07 (finish gazette read) ──→ re-source P-05
   │                         └──→ unblocks P-08 (regulatory mechanism)
P-05 (time limits)            [can ship from newspaper citation now]
P-08 (2000→2022 history)      [counts can ship now; mechanism needs P-07]

P-09 (market)  ┐
P-10 (conservation) ├─ fully independent, start any time
P-11 (quota/trade)  │
P-12 (trade centre)┘

P-13 (read item 5) ──→ P-14 (press archive)
P-15 (address)       [independent]

P-16 (transcript) ──→ P-17 (video feature)
```

**Fastest path to visible value:** P-02 → P-04 → P-09 → P-10. Four cards, no gates, all primary-source-backed.

---

## Suggested triage batching

| Batch | Cards | Why together | Gate |
|---|---|---|---|
| **A — quick wins, no gates** | P-02, P-03, P-04, P-06 | All source from already-verified Rule 2 definitions and one HT clipping. Small, precise, high-credibility. | none |
| **B — content expansion** | P-09, P-10, P-11, P-12 | One source document (§1, the 18 Nov 2024 feature). One research pass, four sections. | none |
| **C — close the gaps** | P-07, P-13, P-01, P-15 | Housekeeping + the two reads that unblock everything else. Do these while A and B are in flight. | none |
| **D — press archive** | P-14 | Needs C's P-13. | A |
| **E — policy depth** | P-05, P-08 | Better sourcing once P-07 lands; counts can ship earlier. | B |
| **F — video** | P-16, P-17 | Needs a user decision on transcript route and hosting cost. | — |

**Recommended:** dispatch batches A and B in parallel now; run batch C concurrently. D, E, F wait on their gates.

---

## What I did not do

- **No Kanban cards were created.** The request was to produce the plan so triage can be set up, and to keep research off the board.
- **No site changes were made.** This is research and planning only.
- **Item 5 was not read** (rate-limited) and is carried as a gate, not guessed at.
- **Gazette Rules 3+ were not read** and are carried as a gate. Every claim in the research report is traceable to either a gazette page I read or a named newspaper article.
- **No transcript was fabricated.** Whisper's output was unusable; I have said so rather than presenting garbled text as a transcript.
