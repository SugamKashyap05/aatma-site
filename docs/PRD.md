# Product Requirements Document — AATMA Website

> Source of truth for **what** we are building and **why**.
> Read before changing scope. Do not invent requirements — if something is not
> here, it is either out of scope or an open question (see §11).

---

## 1. Product Overview

| Field | Value |
|---|---|
| **Product Name** | AATMA Website |
| **One-line description** | The public institutional website for AATMA — a 50-year-old association representing Assam's agarwood (agar) traders and agaroil manufacturers. |
| **Product Type** | Static content & heritage site (no backend, no accounts, no database) |
| **Primary Platform** | Web (responsive: mobile / tablet / desktop) |
| **Live URL** | `https://sugamkashyap05.github.io/aatma-site/` |
| **Repository** | `sugamkashyap05/aatma-site`, branch `master` |
| **Deployment** | GitHub Actions → GitHub Pages (auto-deploy on push to `master`) |

### Organisation identity (single source: `src/data/content.ts`)

| Field | Value |
|---|---|
| Full name | All Assam Agar Traders & Agaroil Manufacturers' Association |
| Short name | AATMA |
| Assamese name | সদৌ অসম আগৰ ব্যৱসায়ী আৰু আগৰতেল উৎপাদনকাৰী সংস্থা |
| Established | 1976 |
| Registration | Registrar of Societies — Reg. No. 664 of 78–79 |
| Head office | Main Road, Hojai – 782435, Assam, India |
| Phone | [REDACTED: unverified contact] |
| Email | [REDACTED: unverified contact] |
| Districts served | Golaghat, Jorhat, Sivasagar, Hojai |
| Tagline | "A 50-year institution at the heart of India's agarwood trade." |

---

## 2. Problem

**What problem are we solving?**
AATMA has 50 years of institutional history — advocacy wins, policy milestones,
research publications, and archival documents — that exists in scattered form:
press clippings, government correspondence, scanned books, and seminar
proceedings. There is no single public presence that presents this record
credibly to members, regulators, researchers, and international buyers.

**Why does it matter?**
Assam's agarwood trade was legalised relatively recently (2019 Cabinet decision,
2020 state policy, 2024 CITES quota, 2025 first legal export). Buyers,
researchers, and prospective members now look for an authoritative institutional
reference. Absence of one weakens AATMA's standing in exactly the period when
the sector has entered regulated international trade.

**How is this handled today?**
Print press notes, Word documents circulated by email, scanned PDFs, and
word-of-mouth. No consolidated public resource.

---

## 3. Goal

**Primary goal:** Give AATMA a single authoritative public website that presents
its history, its policy record, its publications, and its research to members,
regulators, researchers, and trade partners.

**Secondary goals:**
- Make primary source documents (books, press notes, policy documents) publicly readable.
- Establish a durable, low-maintenance institutional web presence.
- Present AATMA's policy contributions (2019, 2020, 2024, 2026) in a citable form.

---

## 4. Target Users

### User Type 1 — AATMA member (agar trader / agaroil manufacturer)
**Who:** Existing association members across Golaghat, Jorhat, Sivasagar, Hojai.
**Needs:** Association news, policy updates, downloadable documents, contact details.
**Pain points:** Policy changes communicated informally; hard to find the current rules.

### User Type 2 — Researcher / student
**Who:** Academic and agricultural researchers studying agarwood cultivation, trade, or policy.
**Needs:** Publications, seminar proceedings, cultivation and economic data, citable history.
**Pain points:** Source material is locked in scanned PDFs and print.

### User Type 3 — Regulator / policy stakeholder
**Who:** State and central government officers, CHEMEXCIL/SHEFEXIL, CITES authorities.
**Needs:** AATMA's policy positions, compliance record, registration process guidance.
**Pain points:** No consolidated view of what the association has advocated and achieved.

### User Type 4 — Prospective member / trade partner
**Who:** New cultivators, international buyers, exporters.
**Needs:** Understanding who AATMA is, what it does, how to engage.
**Pain points:** No credible public presence to verify legitimacy.

---

## 5. User Stories

- As a **researcher**, I want to read AATMA's publications online so that I can cite them without requesting print copies.
- As a **member**, I want to see the current policy rules in plain language so that I can comply without hiring a consultant.
- As a **trade partner**, I want to understand AATMA's history and standing so that I can judge whether to engage.
- As a **regulator**, I want to see AATMA's compliance and advocacy record so that I can assess the association's positions.
- As a **prospective member**, I want contact details and membership information so that I can join.
- As **any visitor**, I want the site to work on my phone so that I can read it anywhere.

---

## 6. Core Features

### Feature 1 — Home page (single-scroll institutional overview)

**Purpose:** Present AATMA's identity, story, milestones, members, press, and contact in one scroll.

**User flow:** Land on `/` → parallax hero → scroll through About → Agar Story → Milestones → Members → Press & Media → Contact → Footer.

**Inputs:** None (static content).

**Outputs:** Six anchored sections; navbar highlights the active section while scrolling.

**Acceptance criteria:**
- [ ] `/` renders hero, About, AgarStory, Milestones, Members, PressSection, Contact, Footer.
- [ ] Navbar shows 6 section links (`about`, `agar-story`, `milestones`, `members`, `press`, `contact`) plus 5 page links plus logo.
- [ ] Anchor scrolling works with `scroll-mt` offset under the fixed navbar.
- [ ] Parallax hero does not animate when `prefers-reduced-motion` is set.

**Edge cases:**
- Direct navigation to `/#contact` from a non-home route must land on the section.
- Contact section (last on page) may not scroll to viewport top — accepted limitation.

**Source:** `src/features/home/HomePage.tsx`, `src/features/hero/ParallaxHero.tsx`

---

### Feature 2 — Books library and reader (`/books`)

**Purpose:** Make AATMA's published books publicly readable, including image-only scanned volumes.

**User flow:** `/books` → library grid → select book → full-screen reader → page through → return to library.

**Inputs:** Book selection, font-size preference, page navigation.

**Outputs:** Rendered text chapters or scanned page images; progress indicator.

**Acceptance criteria:**
- [ ] `/books` lists all books defined in `src/data/books.ts`.
- [ ] Text books render chapter-by-chapter with working next/previous.
- [ ] Scanned books render page images from `public/books/<slug>/pages/`.
- [ ] Reader is wrapped in `PageLayout` — navbar and footer present.
- [ ] Font size control offers sm / md / lg / xl.

**Edge cases:**
- A book with no chapters must not crash the reader.
- Missing page image must not break the whole reader.

**Source:** `src/features/books/*`, `src/data/books.ts`, `src/hooks/useBookReader.ts`

---

### Feature 3 — Press & Media (`/press`)

**Purpose:** Present press releases, media coverage, and downloadable assets.

**User flow:** `/press` → page header → press releases → media coverage timeline → downloads.

**Acceptance criteria:**
- [ ] `/press` composes `PressSection` and `PressDownloads` inside `PageLayout`.
- [ ] Media coverage timeline renders chronologically.
- [ ] Download entries render with title and description.

**Known gap:** `PressDownloads` currently ships 4 **placeholder** entries (press kit, brand guidelines, fact sheet, executive bio) with no real files behind them. See §11.

**Source:** `src/features/press/*`, `src/features/news/PressSection.tsx`, `src/features/news/MediaCoverageTimeline.tsx`

---

### Feature 4 — History (`/history`)

**Purpose:** Present AATMA's full institutional history with primary-source content.

**User flow:** `/history` → hero → ancient roots → early trade (1905) → AATMA formation (1976) → struggle & victory → interactive timeline (1905–2026) → cultural significance.

**Acceptance criteria:**
- [ ] `/history` renders 8 distinct sections beyond a re-render of the home Milestones.
- [ ] Interactive timeline covers 1905–2026 with era groupings.
- [ ] History content is sourced from the client documents in `documents/`, not invented.
- [ ] `Milestones` is rendered with `variant="history"` so heading and section id differ from home.

**Source:** `src/features/history/HistoryPage.tsx`, `src/components/ui/InteractiveTimeline.tsx`

---

### Feature 5 — Policy & Legal (`/policy`)

**Purpose:** Explain the current legal framework governing agarwood in Assam.

**User flow:** `/policy` → sticky scroll-spy nav → six sections.

**Sections:** Wood Based Industries Rules 2022 · Trees Outside Forest Rules 2022 · 2000 vs 2022 comparison · CITES compliance · registration walkthrough · online platform guidance.

**Acceptance criteria:**
- [ ] All six sections render with working scroll-spy navigation.
- [ ] Comparison table presents 2000 vs 2022 rules side by side.
- [ ] Registration walkthrough covers the end-to-end process.
- [ ] Content traces to the client documents, not to invention.

**Source:** `src/features/policy/*`

---

### Feature 6 — Research & Knowledge (`/research`)

**Purpose:** Present AATMA's research publications and soil-science communication.

**User flow:** `/research` → hero → sticky nav → five science sections → data visualization → research cards → digital library.

**Sections:** Rhizosphere Mycoflora · Microbial Workforce · Biopesticide Potential · PGPR for Cultivation · AAU Partnership · Data Visualization.

**Acceptance criteria:**
- [ ] All five science sections render with working scroll-spy navigation.
- [ ] Data visualizations render and are **explicitly labelled as sample data**.
- [ ] Digital library links to the books route.

**Critical constraint — sample data:** the microbial charts contain **illustrative sample values only**. They are not research findings. Every chart and table must carry a visible "Sample Data — for illustration only" label. Do not remove these labels. Do not present these values as real measurements.

**Open question:** several science sections describe research topics for which the
source book contains **no content** (verified: the book covers resin formation,
distillation, markets, cultivation economics, and policy — not microbiology).
See §11.

**Source:** `src/features/research/*`

---

### Feature 7 — Not-found handling

**Purpose:** Serve a branded 404 and recover deep links for the SPA.

**Acceptance criteria:**
- [ ] Unknown routes render `NotFoundPage`, not a blank page or server 404.
- [ ] `public/404.html` redirects deep links back into the SPA via `?path=`.

**Source:** `src/features/notFound/NotFoundPage.tsx`, `public/404.html`

---

### Feature 8 — Responsive & accessible navigation

**Purpose:** Provide working navigation at every viewport width.

**Acceptance criteria:**
- [ ] Mobile drawer opens, closes, and is reachable above the navbar (z-index).
- [ ] Touch targets are at least 44×44 px.
- [ ] Zone labels meet WCAG AA contrast (4.5:1).
- [ ] Keyboard focus is visible on all interactive elements.

**Source:** `src/components/ui/Navbar.tsx`

---

## 7. Non-Goals

The following are intentionally **not** part of this product:

- User accounts, login, or authentication of any kind.
- A database or server-side backend.
- A CMS or admin interface — content changes ship as code.
- Membership application or payment processing.
- E-commerce or document sales.
- Comments, forums, or any user-generated content.
- Real-time data feeds or third-party API integrations.
- Multi-language UI switching (Assamese content is present inline, not via a locale system).

---

## 8. MVP Scope

**Must have (shipped):**
- Six routes: `/`, `/books`, `/press`, `/history`, `/policy`, `/research`.
- Shared `PageLayout` giving every route navbar + hero + footer.
- Responsive navigation including mobile drawer.
- Books library with text and scanned-image readers.
- Policy, history, press, and research content pages.
- GitHub Pages deployment on push to `master`.

**Nice to have:**
- Real downloadable press assets replacing placeholders.
- Real research data replacing sample charts.
- Expanded sitemap covering all routes.

**Future:**
- Assamese language toggle.
- Member directory.
- Document search.

---

## 9. Success Metrics

**Primary:**
- All six routes load without error on the live site.
- Build succeeds on every push to `master`.
- Site is usable at 320 px through 2560 px width.

**Secondary:**
- Zero broken internal links.
- Zero WCAG AA contrast failures on navigation.
- All animations gated behind `prefers-reduced-motion`.

---

## 10. Constraints

**Technical:**
- Static hosting only (GitHub Pages) — no server-side runtime.
- React 19 + Vite + Tailwind CSS v4 + TypeScript. **No shadcn/ui.**
- Deployed under a subpath (`/aatma-site/`) — all asset and route handling must respect `BASE_URL`.

**Business:**
- Content must trace to the client-supplied source documents. No invented facts about the association, its history, or its policy record.

**Design:**
- Fixed palette and typography (see `DESIGN_SYSTEM.md`). No new colors without a documented decision.

**Timeline:**
- No hard deadline. Correctness over speed.

---

## 11. Open Questions

- [ ] **Research page source data.** The science sections (rhizosphere mycoflora, microbial workforce, biopesticide potential, PGPR) describe topics that the source book does not cover. Is there an external source for this content, or should these sections be reframed or removed?
- [ ] **Sample data in charts.** Should real microbial count data be sourced, or do the illustrative charts stay permanently (with labels)?
- [ ] **Press downloads.** `PressDownloads` ships 4 placeholder entries with no files. What real assets should exist?
- [ ] **Sitemap coverage.** `public/sitemap.xml` lists only 2 of 6 routes and references `sugamkashyap.github.io`, which does not match the live host `sugamkashyap05.github.io`.
- [ ] **AAU partnership.** No source document contains Assam Agricultural University partnership details. Is this a real programme?
- [ ] **Assamese language.** Should the UI offer a language toggle, or is inline bilingual content sufficient?

---

## 12. Definition of Done

A feature is complete when:

- [ ] Requirements in this document are satisfied.
- [ ] Critical user flows work in a real browser.
- [ ] `npm run build` succeeds.
- [ ] `npm run lint` passes.
- [ ] No unintended files changed.
- [ ] No placeholder content shipped as if it were real.
- [ ] Documentation updated when behaviour changes.
