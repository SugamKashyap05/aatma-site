# News Integration Implementation Plan

**Date:** 2026-10-12
**Board:** `aatma-site`
**Scope:** Reflect the gathered client material across every page, and stand up a dedicated blog/news route.

---

## 1. Verified current state

Checked against the live codebase, not assumed:

| Item | State |
|---|---|
| Routes | 7 — `/`, `/books`, `/press`, `/history`, `/policy`, `/research`, `*` (404) |
| **Blog route** | **Does not exist** |
| Kanban `blog` task | **Does not exist** — searched all 3 boards + SQLite DB, 0 matches |
| Open tasks | `todo`: 0 · `blocked`: 13 · `done`: ~127 |
| Press data | `MediaCoverageTimeline.tsx` holds **8 coverage entries** (Jan 2023 → Jun 2026) |
| Press releases | 2 real PDFs in `public/press/` (press note + HCM letter, both 14 Jan 2023) |
| Assets | 14 AI images, 11 SVGs, 9 chart components — all built, **none committed** |
| HEAD | `8e6b947` — CodeRabbit fixes + asset pipeline uncommitted (45 files) |

### The 13 blocked cards are stale

All 13 were created 2026-10-09 with `initial_status: blocked` and **never unblocked**. Several describe work that is already *done* on `master`:

| Card | Actual state |
|---|---|
| History & Heritage Section | **Done** — `/history` has 8 sections + timeline |
| Policy & Regulatory Section | **Done** — `/policy` has 5 sections |
| Research & Science Section | **Done** — `/research` has 6 sections + charts |
| Interactive Timeline | **Done** — 20 events, 6 eras |
| Rules Comparison Table | **Done** — `ComparisonTable.tsx` |
| Press & Media (t_062f9f22) | Marked done |

**Do not build these.** They must be closed as already-satisfied, then deleted, or they will cause duplicate work.

---

## 2. What "latest news" means here

Three distinct source classes, each needing different handling:

| Class | Source | Status |
|---|---|---|
| **A — Client's own documents** | AGAR history PDF, 2 gazettes, 4 clippings, press-meet video | Researched, `docs/` written |
| **B — Site's existing news data** | 8 `MediaCoverageTimeline` entries | **Live but dates are fabricated** |
| **C — Journalist estimates** | Assam Tribune figures (7.7% CAGR, $44.05bn, Rs 1 lakh/kg) | Charts built with `press estimate` labels |

### ⚠️ Class B problem — must be fixed before launch

The 8 timeline entries carry **invented articles**. Examples:

- *"The Hindu BusinessLine — India secures CITES export quota… 12 March 2024"*
- *"The Economic Times — Assam ships first legal agarwood consignment worth Rs 2.35 crore — 8 September 2025"*
- *"PIB Delhi — Agarwood Export Promotion Cell — 5 May 2026"*

**None of these were verified against a real publication.** Every URL is a bare homepage (`https://pib.gov.in`), not an article permalink. Fabricated press coverage on a heritage site is the same credibility failure as the IMG-H08 gazette.

Real, sourced coverage that *does* exist:
- Hindustan Times, 17 Jan 2023 — AATMA press meet ✅ transcribed
- Assam Tribune, 18 Nov 2024 — "Prospects of Assam's agarwood industry" ✅ in research
- Assam Tribune, 2 Aug 2023 — "Wood-based industries: Winds of change soon" ✅ in research
- 2 × Assam Tribune clippings ✅ transcribed verbatim

**This is a gate, not a task.** Either source real articles or strip the timeline to the verified 4 + label it "as reported at the time".

---

## 3. Plan — 6 waves

### Wave 0 — Hygiene (do first, unblocks everything)
| # | Task | Why |
|---|---|---|
| W0-1 | Close + delete the 6 already-satisfied blocked cards | Prevents duplicate builds |
| W0-2 | Commit the 45 uncommitted files | Asset pipeline at risk |
| W0-3 | Gate: resolve fabricated press coverage (see §2) | Blocks any news-facing work |

### Wave 1 — Blog route (the "blog task" you asked to start from)
Since no card exists, this is new scope.

| # | Task | Acceptance |
|---|---|---|
| W1-1 | `src/data/news.ts` — typed article records, dates as ISO | Data file, no components |
| W1-2 | `NewsCard.tsx` — article card (title, date, outlet, excerpt, source link) | Renders with real data |
| W1-3 | `NewsIndex.tsx` — list view, filter by outlet type + year | Filters work |
| W1-4 | `NewsArticle.tsx` — detail view | Route `/news/:slug` |
| W1-5 | Add `/news` + `/news/:slug` routes to `App.tsx` | Both resolve |
| W1-6 | Nav entry in both zones | Reachable from every page |

### Wave 2 — News propagation to existing pages
| # | Task | Target |
|---|---|---|
| W2-1 | Home page — latest 3 news items | `/` |
| W2-2 | Press page — embed `NewsIndex` | `/press` |
| W2-3 | Press page — add press-meet video + trilingual transcript | `/press` |
| W2-4 | Footer — news link route-aware | all pages |

### Wave 3 — Asset integration (built, unmounted)
| # | Task | Target |
|---|---|---|
| W3-1 | Mount 11 SVGs into their sections | history/policy |
| W3-2 | Mount 9 chart components | research/policy/history |
| W3-3 | Mount 13 usable AI images | history/research |
| W3-4 | Mount 3 frame grabs | `/press` |

### Wave 4 — Content depth from client documents
| # | Task | Source |
|---|---|---|
| W4-1 | History — founding fathers, trade chronology, 5,000 employed | AGAR PDF §3–5 |
| W4-2 | History — advocacy gantt, 5 governments | AGAR PDF §7–8 |
| W4-3 | Policy — 62/74-day limits, hectare thresholds, LPC FORM-XXV | Gazette Rule 2 |
| W4-4 | Research — district trees, market, quota, trade flow | Assam Tribune |

### Wave 5 — Gates + verification
| # | Task |
|---|---|
| W5-1 | Fix lazy-image load failure (found this session, pre-existing) |
| W5-2 | Full route × viewport regression test |
| W5-3 | Production subpath verify |
| W5-4 | Commit + deploy |

---

## 4. Sequencing

```
W0 (hygiene + gate) ──> W1 (blog route) ──> W2 (propagate)
                                                    
W3 (assets) ──────────┐                          
                      ├──> W5 (verify + ship)      
W4 (content) ─────────┘                              
```

W3 and W4 are independent of W1/W2 and can run in parallel.

---

## 5. Blocking gates

These are **not tasks** — they need your decision:

| Gate | Question |
|---|---|
| **G1** | The 8 `MediaCoverageTimeline` entries are fabricated. Source real articles, or strip to the 4 verified? |
| **G2** | Commit the 45 files now, or after Wave 1? |
| **G3** | Press-meet video + trilingual transcript on `/press` — publish now or hold? |
| **G4** | The 6 done-but-blocked cards — close as satisfied, or rebuild fresh? |

---

## 6. What I could not verify

- **No blog task exists.** I searched the `aatma-site`, `neon-reap` and `racer-2026` boards, grepped the SQLite DB across all task columns, and read the logs. Zero matches for "blog". If you meant a card on another board or in another session, tell me and I'll pick it up.
- I did **not** create any Kanban cards — you asked for a plan and task list first.
