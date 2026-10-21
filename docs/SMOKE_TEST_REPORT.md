# Browser Smoke Test Report — AATMA Site

**Date:** 2026-10-17 · **Task:** t_205ca804 · **Tester:** Playwright 1.64 (bundled Chromium, headless)

## What was tested

- **Build under test:** `npm run build` (tsc + vite, exit 0, 12:26) with default `base: './'`, served by `vite preview` on `http://localhost:4173` (dist/, never the project root).
- **Harness:** `scripts/smoke-test.mjs` — per route×viewport: HTTP status, `<title>`, rendered-text length (≥50 chars = content), `#main-content` presence, console errors/warnings, uncaught page errors, failed requests + HTTP ≥400 (split same-origin vs third-party), broken images (`complete && naturalWidth===0`), horizontal overflow. Failure screenshots saved to `scripts/smoke-screenshots/`.
- **Viewports:** 360×390 (mobile), 390×844 (mobile-large), 768×1024 (tablet), 1366×768 (laptop), 1920×1080 (desktop).
- **Public routes (11):** `/`, `/books`, `/press`, `/history`, `/policy`, `/research`, `/news`, `/news/aatma-thanks-cm-sarma-2023`, `/news/winds-of-change-2023`, `/news/prospects-assam-agarwood-2024`, `/resources` — every route × every viewport = **55 public combinations**.
- **Probe routes (3):** `/nonexistent-page-404-test`, `/news/does-not-exist-slug`, `/__challenges-probe` = 15 combinations (not counted in the public matrix).
- **Total: 70 combinations — 35 PASS, 10 PASS⚠, 20 FAIL** (public: 35/0/20; probes: 0/10/5).

## Results matrix — public routes

| Route | 360×390 | 390×844 | 768×1024 | 1366×768 | 1920×1080 |
|---|---|---|---|---|---|
| `/` | PASS | PASS | PASS | PASS | PASS |
| `/books` | PASS | PASS | PASS | PASS | PASS |
| `/press` | **FAIL** | **FAIL** | **FAIL** | **FAIL** | **FAIL** |
| `/history` | PASS | PASS | PASS | PASS | PASS |
| `/policy` | PASS | PASS | PASS | PASS | PASS |
| `/research` | PASS | PASS | PASS | PASS | PASS |
| `/news` | PASS | PASS | PASS | PASS | PASS |
| `/news/aatma-thanks-cm-sarma-2023` | **FAIL** | **FAIL** | **FAIL** | **FAIL** | **FAIL** |
| `/news/winds-of-change-2023` | **FAIL** | **FAIL** | **FAIL** | **FAIL** | **FAIL** |
| `/news/prospects-assam-agarwood-2024` | **FAIL** | **FAIL** | **FAIL** | **FAIL** | **FAIL** |
| `/resources` | PASS | PASS | PASS | PASS | PASS |

## Results matrix — probe routes (not counted publicly)

| Route | 360×390 | 390×844 | 768×1024 | 1366×768 | 1920×1080 |
|---|---|---|---|---|---|
| `/nonexistent-page-404-test` | PASS⚠ | PASS⚠ | PASS⚠ | PASS⚠ | PASS⚠ |
| `/news/does-not-exist-slug` | **FAIL** | **FAIL** | **FAIL** | **FAIL** | **FAIL** |
| `/__challenges-probe` (dev) | PASS⚠ | PASS⚠ | PASS⚠ | PASS⚠ | PASS⚠ |

⚠ = expected behaviour with a note (404 → SPA fallback renders NotFoundPage with HTTP 200; dev probe has no nav/`#main-content` wrapper by design).

## Findings

### D1 — CRITICAL: all `/news/:slug` article pages render blank (20/20 fail)

Every published news article is a **completely blank page** at every viewport: root text 0 chars, no `#main-content`, no navbar, no console page-errors — just 2 console 404s and aborted script loads.

- **Evidence:** `http://localhost:4173/news/assets/index-B1cHmvcv.js` → 404 (same `Navbar-Dnhtfn1p.js`); `dist/index.html` references `./assets/…` **relatively**; blank-page screenshot `scripts/smoke-screenshots/news_winds_of_change_2023__1366x768.png`.
- **Root cause:** `vite.config.ts:9` — `base: process.env.VITE_BASE_PATH || './'`. With the default `'./'`, the browser resolves `./assets/x.js` against the current document URL, so from `/news/<slug>` it requests `/news/assets/x.js` → 404 → React never mounts. Top-level routes work because `/` + `./assets` resolves correctly.
- **Classification:** defect of the **default local build**. CI builds (`VITE_BASE_PATH=/aatma-site/`) emit absolute asset paths and are unaffected; the production deploy works. Any static serving of a locally-built `dist/` (preview, manual Pages deploy) breaks every nested route.
- **Note:** `/news/does-not-exist-slug` fails identically (nested path → SPA fallback HTML → same 404 chain), so the "unknown slug" probe is also blank for the same reason.

### D2 — MAJOR: broken image `aatma-head-office.avif` on `/press` (all viewports)

The press-meet gallery's first frame grab is a broken image everywhere: `complete: true, naturalWidth: 0`.

- **Evidence:** `public/press-meet/` and `dist/press-meet/` contain only `aatma-head-office.jpg` and `.webp` — **`.avif` and `.png` were never generated**. `vite preview` SPA-fallback returns `index.html` with **HTTP 200 + `Content-Type: text/html`**, masking the missing asset; the browser cannot decode HTML as an image. `PressMeetGallery.tsx:56` lists the `.avif` as the first `<picture>` `<source>`; Chromium supports AVIF, so every viewport selects it. Visual proof: `scripts/smoke-screenshots/_evidence_gallery.png` (broken-image glyph + exposed alt text). Dedicated probe confirms the other 3 gallery images load fine (naturalWidth 1280).
- **Classification:** real production defect — the file does not exist in the source tree. (GH Pages' 404.html fallback behaves the same way, so production is affected too.)

### D3 — INFO (benign): `net::ERR_ABORTED` on `v2-tiny.mp4` during harness scroll

The smoke harness's fast scroll-through aborted the video's initial request on every `/press` viewport. A dedicated probe with real-user-paced scrolling shows the video reaches **`readyState: 4` (HAVE_ENOUGH_DATA), duration 800.3 s** — the file exists (9.5 MB, serves 200) and plays. **Not a site defect** — a measurement artifact of harness scroll speed.

## Notes

- `pendingImages` on `/`, `/history`, `/research` are lazy images still in flight at measure time — not broken (see TESTING.md §9: measure after scrolling).
- `/research` charts render as canvas/SVG; the 6 `<img>`s are publication covers.
- **Concurrent-edit caveat:** sibling workers were mid-edit during the run (102 files churning; a transient `tsc` failure at 12:40 — missing `PressTeaser`/`LatestNewsTeaser`/`PressReleaseArchive` modules — did not affect the tested build, which was compiled at 12:26 with tsc+vite exit 0). The `/press` page is still changing (a `PressReleaseArchive` section is being added); re-run this smoke test after the redesign tasks settle.

## Artifacts

- Machine-readable full results: `scripts/smoke-test-results.json` (all 70 records with statuses, notes, evidence)
- Failure screenshots: `scripts/smoke-screenshots/` (press, news articles, unknown slug)
- Harness: `scripts/smoke-test.mjs` (env knobs: `SMOKE_ONLY` route filter, `SMOKE_TAG` output suffix, `SMOKE_SHOTS=1` full screenshots)
