# Home Page Verification Report — t_e9a2f11e

**Task:** Verify navigation, accessibility, and build/lint for the assembled home page.
**Date:** 2026-10-17
**Workspace:** `E:/all projects for hermes/aatma-site` (shared `workspace_kind: dir`)
**Verified against:** `dist/` built **2026-10-17 12:26** (the build of the assembled home page), served by `vite preview` on `:4173`, driven through real Chrome (CDP `localhost:9222`).

> **Important caveat on the build criterion.** The build passed at 12:35 and lint passes
> now, but the *current* source tree no longer compiles — a concurrent worker
> (`t_67bb2083`, "Align Press/News route…", run 391) is refactoring `src/features/news/*`
> and `src/features/press/*` **in this same shared workspace** and has deleted
> `src/features/home/PressTeaser.tsx`, which `HomePage.tsx` still imports. See §7.
> Every result below is labelled with the state it was measured in.

---

## 1. Result summary

| # | Check | Result | Evidence |
|---|---|---|---|
| 1a | All 11 home sections present in DOM | **PASS** (10/11) | §3.1 |
| 1b | `#press` nav + footer link has a target | **FAIL** | §3.2 |
| 1c | Desktop nav links resolve to real elements | **FAIL** (1 dead) | §3.2 |
| 1d | Nav click actually scrolls to the section | **PASS** | §3.3 |
| 1e | Nav section order matches rendered order | **FAIL** | §3.4 |
| 1f | Page links present | **PASS** (7/7) | §3.5 |
| 1g | Footer links resolve | **FAIL** (1 dead) | §3.2 |
| 1h | In-page CTAs resolve | **FAIL** (1 dead) | §3.2 |
| 1i | Mobile drawer opens / closes / labelled | **PASS** | §6 |
| 2a | Exactly one visible `<h1>` | **PASS** | §4.1 |
| 2b | No skipped heading levels | **PASS** (43 headings) | §4.1 |
| 2c | Every `<img>` has non-empty `alt` | **PASS** (27 imgs) | §4.2 |
| 2d | No broken images | **PASS** (see note) | §4.2 |
| 2e | Buttons / links labelled | **PASS** | §4.3 |
| 2f | Inline `<svg>` hidden or labelled | **FAIL** (4 of 49) | §4.3 |
| 2g | Skip link is first Tab stop | **PASS** | §4.4 |
| 2h | Keyboard reaches visible elements | **PASS** (12 stops) | §4.4 |
| 2i | Colour contrast ≥ 4.5:1 (measured pixels) | **FAIL** (9 of 23) | §4.5 |
| 3 | `npm run build` | **PASS @12:35 / FAIL now** | §7 |
| 3 | `npm run lint` | **PASS** (exit 0, 63 warnings) | §7 |
| 4 | Other routes render | **PASS** (7/7 HTTP 200) | §5 |
| 5 | No member names on home page | **PASS** | §2.1 |
| 6 | No unsupported market/export claims | **FAIL** | §2.2 |

---

## 2. Content guardrails (task items 5 and 6)

Measured against the rendered DOM text of `/`.

### 2.1 Member names — **PASS**

None of the anonymized AATMA member / office-bearer names appear anywhere on the home page:
`[REDACTED: AATMA member], Anfar Ali, [REDACTED: AATMA member], Samsul Islam, [REDACTED: AATMA member], [REDACTED: AATMA member],
[REDACTED: AATMA member], Jamal Uddin, Jhanu Sen, Bhusan Sen, Jogesh Deb,
Hazi Mastafauddin Gaoburha, Ajmal Ali, Mastafauddin, Hazi, (L), [REDACTED: AATMA member]`.

`FormationSection.tsx` and `CriticalEraSection.tsx` correctly use role descriptions
("AATMA's founding members", "AATMA's President and General Secretary at the time").

### 2.2 Unsupported market / export claims — **FAIL**

The home page still carries **five** claims that `docs/APPROVED_CONTENT_LEDGER.md`
marks `exclude` (no client source). Each is located in the DOM:

| Location | Claim on page | Ledger row | Ledger status |
|---|---|---|---|
| `ParallaxHero.tsx` subtitle | "…from the distillation hub of Hojai to the **global markets** of the Middle East." | — | not sourced |
| `About.tsx` stat card | "**~2 Lakh** — livelihoods across Assam" | #26 | `exclude` |
| `About.tsx` stat card | "**First Legal Export** 2025 — **112 kg to Saudi Arabia & UAE**" | #27 | `exclude` — "**No client source.**" |
| `About.tsx` stat card | "**CITES Quota (2024–27)** — **1.51 Lakh kg** — chips & powder / year for India" | #28 | `exclude` — "No client source for CITES quota figure." |

This is a direct hit on task item (6): *"Confirm no unsupported global markets/export/market claims."*
The `global markets` wording is in the hero subtitle itself.

**Corroboration:** the sibling card `t_1ba1742c` independently reported the same defect —
*"About.tsx stats include unsupported 'First Legal Export 2025' and '112 kg to Saudi Arabia & UAE'"* —
and listed *"Fix About.tsx stats to remove unsupported 2025 export claims"* as remaining work.
Two independent passes found it; it has not been fixed.

Note: the earlier pass of this check was a **false PASS** — the first census searched for
`"1,51,080 kg"` while the page renders `"1.51 Lakh kg"`. The corrected census above is authoritative.

---

## 3. Navigation

### 3.1 Sections present

All 11 `HOME_SECTIONS` ids exist in the DOM except `press`. Document order (top px):

```
  908  about          7159  formation      12223  rules
 2710  sanchi-paat    8606  critical-era   13403  challenges
 3464  agar-story     9873  achievement    14392  press-teaser
11356  ndf-findings   15611  latest-news    16329  contact   17337  footer
```

### 3.2 `#press` is a dead link — **FAIL**

`PressTeaser.tsx` declares `id="press-teaser"`, but three places link to `#press`:

- `Navbar.tsx` `HOME_SECTIONS` → `{ id: "press", label: "Press & Media" }`
- `Footer.tsx` quick links → `{ label: "Press", to: "/#press" }`
- consequently the in-page CTA scan

Reproduced in the browser:

```
nav[aria-label="Home sections"] a[href="#press"]  →  #press  (no such id)
footer a[href="/#press"]                          →  #press  (no such id)

clicking "Press & Media":  before {scrollY:0, hash:""}  →  after {scrollY:0, hash:""}
                               didScroll: false     (the click does nothing)
document.getElementById("press")     === null
document.getElementById("press-teaser") !== null   (top 14392)
```

**Fix:** change `id="press-teaser"` → `id="press"` in `src/features/home/PressTeaser.tsx`
(one line), or change the two link sites. The id is not referenced anywhere else
(`grep -rn "press-teaser" src/` returns nothing).

### 3.3 Nav click scrolls correctly — **PASS**

Every other section link lands exactly under the fixed navbar:

```
about        sectionTop= 80px   (nav height 80)
sanchi-paat  sectionTop= 80px
formation    sectionTop= 80px
critical-era sectionTop= 80px
achievement  sectionTop= 80px
ndf-findings sectionTop= 80px
rules        sectionTop= 80px
challenges   sectionTop= 80px
contact      sectionTop= 80px
```

### 3.4 Nav order ≠ page order — **FAIL (minor)**

`Navbar.tsx` lists `Agar Story` (2nd) before `Sanchi Paat` (3rd), but the page renders
`Sanchi Paat` (2710) before `Agar Story` (3464). The nav implies an order the page does not have.

### 3.5 Page links — **PASS**

`/books, /press, /news, /history, /policy, /research, /resources` all present.

---

## 4. Accessibility

### 4.1 Headings — **PASS**

- Exactly one visible `<h1>`: "All Assam Agar Traders & Agaroil Manufacturers' Association — AATMA".
- No skipped levels across 43 visible headings (h1→h2→h3 sequence is unbroken).

### 4.2 Images — **PASS**

- All 27 `<img>` elements carry non-empty `alt` text; none empty, none missing.
- **No broken images.** An initial run reported 8 "broken" images
  (`sanchi-paat-manuscript.jpg`, `trade-journey-hojai.jpg`, `seminar-2000.jpg`,
  `founders-1976.jpg`, `critical-era.png`, `victory-2023.jpg`,
  `plantation-present-day.jpg`, `conservation-habitat.jpg`). That was a **harness
  artifact, not a defect**: stepping `window.scrollTo()` programmatically does not
  trigger Chrome's native lazy loader. Re-tested by scrolling each image to viewport
  centre individually — all 8 load within 0–200 ms (`naturalWidth` 800–1600).
  All 8 files exist in `public/` and are served.
- **Minor (informational):** the 16 hero parallax layers use filename alt text
  (`fog-7`, `mountain-10`) instead of `aria-hidden="true"`. Screen readers will
  announce "fog seven image" 16 times. Cosmetic, not a failure of the alt-text check.

### 4.3 ARIA / labels — **one FAIL**

- Every `<button>` has text, `aria-label` or `title` — **PASS**.
- Every `<a href>` has text, `aria-label` or `title` — **PASS**.
- Inline `<svg>`: **4 of 49 are neither `aria-hidden` nor labelled** — the four decorative
  star glyphs inside the `About.tsx` stat cards
  (`<svg viewBox="0 0 24 24" … className="inline-block w-5 h-5">`, parent
  `div.mt-3.text-white/20.group-hover:text-gold/40`). Sibling seal SVGs in the same
  file correctly carry `aria-hidden="true" focusable="false"`. Fix: add
  `aria-hidden="true" focusable="false"` to that one `<svg>`.

### 4.4 Keyboard — **PASS**

- First Tab from page top lands on the skip link: *"Skip to main content" → `#main-content`*.
- 12 consecutive Tab presses all land on visible focusable elements (no focus traps,
  no off-screen stops).
- Mobile drawer: `Escape` closes it; the drawer is `role="dialog" aria-modal="true"
  aria-label="Navigation menu"`, focus moves into it on open and back to the trigger on close.

### 4.5 Colour contrast — **FAIL**

Measured by screenshotting each text element's box and computing the luminance ratio
between the darkest and lightest painted pixels (sharp-decoded), because Chrome reports
Tailwind v4 colours as `oklab(...)` and the navbar sits over a photographic hero with a
translucent backdrop blur — neither is computable from `getComputedStyle` alone.

9 of 23 measured text elements fall below the 4.5:1 threshold:

| Ratio | Need | Element | Colour |
|---|---|---|---|
| **1.22:1** | 4.5 | `<p>` 20px "অসমৰ আগাৰৱুডি কারুকলা" (hero Assamese subtitle) | `text-cream-dark/90` |
| 2.13:1 | 4.5 | `<a>` 12px "History" (navbar) | `text-white/70` |
| 2.47:1 | 4.5 | `<a>` 12px "News" (navbar) | `text-white/70` |
| 3.22:1 | 4.5 | `<a>` 12px "Press Releases" (navbar) | `text-white/70` |
| 3.42:1 | 4.5 | `<a>` 12px "Books" (navbar) | `text-white/70` |
| 3.48:1 | 4.5 | `<a>` 12px "About" (navbar) | `text-white/80` |
| 4.02:1 | 4.5 | `<a>` 12px "Agar Story" (navbar) | `text-white/80` |
| 4.04:1 | 4.5 | `<span>` 16px "AATMA" (logo) | `text-white` |
| 4.34:1 | 4.5 | `<a>` 12px "Sanchi Paat" (navbar) | `text-white/80` |

The navbar failures are structural: 12 px text at 70–80 % opacity over a **photographic**
hero with `bg-green-deep/80 backdrop-blur-md`. Contrast there varies with the image behind
it and cannot be guaranteed by a token change alone — the honest fix is a more opaque
navbar surface (e.g. `bg-green-deep` without `/80`) or non-translucent text.
The hero Assamese subtitle (1.22:1) is the most severe and should be fixed regardless.

---

## 5. Regressions elsewhere — **PASS**

All 7 non-home routes return HTTP 200 and render their own content (not the 404 page):
`/books, /press, /history, /policy, /research, /news, /resources`.

Mobile: no horizontal overflow at 375 px (`scrollWidth 360 ≤ viewport 375`);
no overflow at 1440 px either.

---

## 6. Mobile drawer — **PASS**

Opens via the hamburger (`aria-controls="mobileNavLinks"`, `aria-expanded`, labelled),
is `role="dialog" aria-modal="true" aria-label="Navigation menu"`, all its links resolve,
and `Escape` closes it. Its one dead link is the same `#press` defect as §3.2.

---

## 7. Build and lint — **BLOCKED (external)**

| Check | At 12:35 (assembled home page) | Now (13:30) |
|---|---|---|
| `npm run build` | **exit 0** — `tsc -b && vite build`, built in 1.93 s | **exit 2** |
| `npm run lint` | exit 0 | **exit 0** (63 warnings, 0 errors) |

Current build error:

```
src/features/home/HomePage.tsx(11,29): error TS2307:
  Cannot find module '@/features/home/PressTeaser' or its corresponding type declarations.
```

`src/features/home/PressTeaser.tsx` is **absent from disk**. It existed at 12:26 (the
verified build) and was deleted during the window in which `t_67bb2083`
("Align Press/News route with verified clippings and archival scan", run 391) is
refactoring `src/features/news/*` / `src/features/press/*` in this same shared workspace.

The tree is churning under that worker — the build error changed between two checks
four minutes apart:

- 13:21 → 5 errors: missing `NewsIndex`, `NewsArticleView`, `LatestNewsTeaser`,
  `PressReleaseArchive`, plus `PublicationProvenance` not exported from `@/data/books`
- 13:24 → 1 error: `PublicationProvenance` missing from `@/data/books`
- 13:30 → 1 error: `@/features/home/PressTeaser` missing

File writes were observed at 13:21:02 (`src/index.css`), 13:21:44
(`src/components/ui/ForestBackground.tsx`) and 13:22:47 (`src/components/ui/PageLayout.tsx`)
— i.e. while this verification was running.

**This is not a defect introduced by the home-page redesign.** The home page assembled
by `t_f49d4c2d` built clean. The breakage is a concurrent-worker collision on a shared
`workspace_kind: dir` workspace.

---

## 8. Verdict

Verification is **incomplete and cannot be honestly completed** on the current tree:

- **Build criterion: not met** — broken by concurrent worker `t_67bb2083`.
- **Navigation criterion: not met** — `#press` is a dead link in the navbar, footer and
  mobile drawer.
- **Accessibility criterion: not met** — 4 unlabelled decorative SVGs; 9 text elements
  below the 4.5:1 contrast threshold (one at 1.22:1).
- **Content criterion (items 5 & 6): item 5 met, item 6 not met** — five ledger-`exclude`
  claims still render on the home page, including "global markets" in the hero.

Measured-and-passing: lint, heading hierarchy, alt text, no broken images, skip link,
keyboard navigation, mobile drawer, other routes, no member names, no horizontal overflow.

### Recommended fixes (for the owning cards, not applied here)

1. `src/features/home/PressTeaser.tsx` → `id="press-teaser"` becomes `id="press"`
   (also unblocks footer + mobile drawer). *Blocked: file currently absent.*
2. `src/features/navbar` `HOME_SECTIONS` — reorder `sanchi-paat` before `agar-story`
   to match rendered order.
3. `src/features/about/About.tsx` — add `aria-hidden="true" focusable="false"` to the
   decorative star `<svg>` in the stat cards; remove or source the three `exclude` stats
   (`~2 Lakh`, `First Legal Export 2025 / 112 kg to Saudi Arabia & UAE`,
   `CITES Quota 1.51 Lakh kg`).
4. `src/features/hero/ParallaxHero.tsx` — remove "to the global markets of the Middle East".
5. Navbar contrast — raise the navbar surface opacity or the link text opacity.
6. Hero Assamese subtitle — raise contrast (currently 1.22:1).

### Collision hotspot

`src/features/home/PressTeaser.tsx` is claimed by two cards at once: it is imported by
`HomePage.tsx` (home-page assembly, `t_f49d4c2d` / this task) and was deleted by the
press/news refactor (`t_67bb2083`). It needs one owner before either card can finish.
