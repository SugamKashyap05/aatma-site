# Home Page Verification Report — t_e9a2f11e

**Task:** Verify navigation, accessibility, and build/lint for the assembled home page.
**Date:** 2026-10-17
**Workspace:** `E:/all projects for hermes/aatma-site` — shared `workspace_kind: dir`, with **5+ concurrent workers** writing to it during this run.
**Method:** real Chrome on CDP `localhost:9222`, driven by Playwright, against `vite preview` on `:4173`. Scripts in `scripts/`.

---

## 1. Verdict

**Verification complete. Acceptance criteria NOT met.**

| Criterion | Result |
|---|---|
| Build passes | **PASS** — `npm run build` exit 0 (rebuilt 13:47, `tsc -b && vite build`, 2.03 s) |
| Lint passes | **PASS** — `npm run lint` exit 0, 0 errors (63 pre-existing warnings) |
| No regressions in existing functionality | **PASS** — all 7 non-home routes HTTP 200 and render their own content |
| All navigation works | **PASS after fixes applied in this run** — see §3 |
| Accessibility checks pass | **FAIL** — ~33 residual contrast failures; ARIA/headings/keyboard/alt-text pass |
| Item (5) no member names | **PASS** |
| Item (6) no unsupported market/export claims | **FAIL** — 4 ledger-`exclude` claims still render |

---

## 2. Fixes applied in this run

| File | Change | Why |
|---|---|---|
| `src/features/home/PressTeaser.tsx` | `id="press-teaser"` → `id="press"` | `#press` was a dead link in navbar, footer and mobile drawer |
| `src/components/ui/Navbar.tsx` | `bg-green-deep/80` → `bg-green-deep/95` | 12 px nav text over a photographic hero could not reach 4.5:1 |
| `src/components/ui/Navbar.tsx` | `sanchi-paat` moved before `agar-story` in `HOME_SECTIONS` | nav order did not match rendered page order |
| `src/features/about/About.tsx` | `aria-hidden="true" focusable="false"` on the decorative star `<svg>` | 4 of 49 inline SVGs were neither hidden nor labelled |

**Re-verified after the fixes** (`scripts/final-check.cjs`):

```
[PASS] all-nav-targets-resolve: 22 nav/footer links, every hash target exists
[PASS] press-nav-scrolls: #press click scrolls (scrollY 0 → 14374, target top 100px)
[PASS] nav-order-matches-page: about → sanchi-paat → agar-story → formation → …
[PASS] svg-aria: all 49 inline <svg> are aria-hidden or labelled
[PASS] heading-hierarchy: one <h1>, 43 visible headings, no skipped levels
[PASS] skip-link-first-tab: "Skip to main content"
[PASS] no-h-overflow-1440 / no-h-overflow-375
```

---

## 3. Navigation — PASS (after fixes)

- **22 nav + footer links; every hash target resolves.** Previously `#press` was dead in three places.
- **`#press` click now scrolls** (scrollY 0 → 14374, target lands at top 100 px, i.e. under the fixed navbar).
- **Nav order now matches document order.**
- All 7 page links present (`/books /press /news /history /policy /research /resources`).
- Mobile drawer opens, is `role="dialog" aria-modal="true" aria-label="Navigation menu"`, and `Escape` closes it.
- Skip link is the first Tab stop; 12 consecutive Tab presses all land on visible focusables.

---

## 4. Accessibility

### PASS
- **Headings:** exactly one visible `<h1>`; no skipped levels across 43 visible headings.
- **Alt text:** every `<img>` has an `alt` attribute. One image carries `alt=""` — a decorative background (`forest-1920.jpg` in the achievement section, added by concurrent worker `t_49ac4d95`); empty alt is correct there.
- **ARIA:** all 49 inline `<svg>` hidden or labelled; every `<button>` and `<a href>` labelled.
- **Keyboard:** skip link first; focus moves into the mobile drawer on open and back to the trigger on close; no focus traps.
- **Navbar contrast: 10.12:1** — measured directly from a screenshot of the `nav.fixed` element (computed background `oklab(…/0.95)` = `green-deep/95`).

### FAIL — colour contrast (residual, ~33 elements)

Measured from **painted pixels** (element screenshot → sharp → WCAG relative-luminance ratio).
This method is required because Chrome reports Tailwind v4 colours as `oklab(...)` and most
sections sit over `AmbientMotion` photographic backgrounds, so no single computed
`background-color` exists.

**Worst offenders:**

| Ratio | Element | Colour |
|---|---|---|
| **1.22:1** | hero Assamese tagline "অসমৰ আগাৰৱুডি কারুকলা" (20 px) | `text-cream-dark/90` on pale fog |
| 1.98:1 | "Listed under Appendix-II with effect from 16 February 1995" (14 px) | `text-text-mute` |
| 2.13:1 | "These manuscripts represent a living connection…" (18 px) | `rgb(90,90,90)` |
| 2.36:1 | stat "50+" (48 px) | `text-gold` on dark green |
| 2.37:1 | "The Agar Story" (14 px) | `text-gold` |
| 2.45:1 | "Get in Touch" / "Press & Resources" (14 px) | `text-gold` / `text-gamosa-red` |
| 2.56:1 | "Ongoing Challenges" (14 px) | `text-gamosa-red` |
| 2.66:1 | "We respect your privacy…" (12 px) | `text-white/40` |
| 2.76:1 | "17 January 2023" (12 px) | `text-white/40` |
| 2.9:1 | "The Assam Tribune, 2 August 2023, p.6 — client-supplied clipping." | `text-white/40` |
| 2.93:1 | footer disclaimer (11 px) | `text-white/30` |

**Root cause is systematic, not local:** sections render light text at 30–50 % opacity
(`text-white/30` … `text-white/50`, `text-gold`, `text-gamosa-red`, `text-text-mute`)
directly over `AmbientMotion` photographic backgrounds. Fixing individual elements will not
hold; the fix belongs in the section/ambient layer (a scrim, or a raised minimum text opacity).

**Measurement caveats, stated honestly:**
- `ElementHandle.screenshot()` on a `position: fixed` element captures the wrong region, so the
  navbar links appeared to fail at 2.13–4.49:1 in the bulk run. A direct screenshot of the navbar
  element measures **10.12:1** — the navbar passes.
- Entries where the darkest and lightest sampled pixels are identical (ratio 1.0, e.g. "Research",
  "Resources", "2016") are capture artifacts of unrendered elements, not real failures.

---

## 5. Content guardrails

### Item (5) — no member names: **PASS**

None of the anonymized AATMA member / office-bearer names appear anywhere on the home page
(17 names checked). `FormationSection` and `CriticalEraSection` correctly use role descriptions.

### Item (6) — no unsupported market/export claims: **FAIL**

Four claims that `docs/APPROVED_CONTENT_LEDGER.md` marks `exclude` still render on `/`:

| Location | Claim on page | Ledger row | Status |
|---|---|---|---|
| `ParallaxHero.tsx` subtitle | "…to the **global markets** of the Middle East." | — | not sourced |
| `About.tsx` stat card | "**~2 Lakh** — livelihoods across Assam" | #26 | `exclude` |
| `About.tsx` stat card | "**First Legal Export** 2025 — **112 kg to Saudi Arabia & UAE**" | #27 | `exclude` — "No client source" |
| `About.tsx` stat card | "**CITES Quota (2024–27)** — **1.51 Lakh kg** — chips & powder / year for India" | #28 | `exclude` |

Independently corroborated by sibling card `t_1ba1742c`, which listed the `About.tsx` stats as
unfixed remaining work. An earlier pass of this check was a **false PASS** — it searched for
`"1,51,080 kg"` while the page renders `"1.51 Lakh kg"`.

---

## 6. Concurrent-worker collision (context, not a home-page defect)

The workspace is shared (`workspace_kind: dir`) and was being written by several other cards
during this run — `t_67bb2083` (press/news refactor), `t_49ac4d95` (forest background),
`t_205ca804` (route smoke test), `t_1abbce00` (asset credits).

Observed consequences:
- `src/features/home/PressTeaser.tsx` was **deleted** at ~13:20, breaking the build
  (`TS2307: Cannot find module '@/features/home/PressTeaser'`), then **restored** at 13:30.
- The build error changed between checks at 13:21 → 13:24 → 13:30.
- File writes observed at 13:21:02 (`src/index.css`), 13:21:44 (`ForestBackground.tsx`),
  13:22:47 (`PageLayout.tsx`) — while this verification was running.
- 13 Chrome tabs on `localhost:4173` were open in the shared browser context.
- A `forest-1920.jpg` background image appeared in the achievement section mid-run.

**The home page assembled by `t_f49d4c2d` built clean** (exit 0 at 12:35 and again at 13:47).
The transient breakage was not caused by the home-page redesign.

---

## 7. Exact fixes still required

**A. Content (item 6) — owner: redesign root `t_fe8e316d`**
1. `src/features/hero/ParallaxHero.tsx:285` — remove "to the global markets of the Middle East".
2. `src/features/about/About.tsx:108-110` — remove or replace the three `exclude` stat cards
   (`~2 Lakh`, `First Legal Export 2025 / 112 kg to Saudi Arabia & UAE`,
   `CITES Quota 1.51 Lakh kg`). Ledger-verified replacements already on the page:
   `1976` (established), `664 of 1978-79` (registered), `2000` (re-organised), `2022` (WBI Rules).

**B. Contrast (accessibility) — owner: design-system / redesign root**
3. Systematic: sections over `AmbientMotion` need a scrim or a raised minimum text opacity.
   Affected: `Contact.tsx`, `PressSection.tsx`/`PressTeaser.tsx`, `RulesSection.tsx`,
   `NdfFindingsSection.tsx`, `ChallengesSection.tsx`, `AgarStory.tsx`, `About.tsx` stats.
4. `src/features/hero/ParallaxHero.tsx:275` — the Assamese tagline needs a scrim behind the
   hero text block (currently 1.22:1, the worst on the page).

**C. Already fixed in this run** — items in §2.

---

## 8. Scripts produced

| Script | Purpose |
|---|---|
| `scripts/verify-home.cjs` | full navigation + a11y sweep |
| `scripts/check-contrast2.cjs` | pixel-measured WCAG contrast (226 elements) |
| `scripts/census-home.cjs` | member-name + ledger-exclude claim census |
| `scripts/final-check.cjs` | post-fix navigation / ARIA / heading re-verification |
| `scripts/diag-navbar.cjs` | proves the navbar passes (10.12:1) |
| `scripts/diag-final.cjs` | skip-link position + unlabelled-image locator |
| `scripts/contrast-results.json` | full contrast data |
