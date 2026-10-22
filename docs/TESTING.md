# Testing Strategy — AATMA

> Source of truth for **how we know it works**.
> The blueprint's rule: *"The agent should not stop at 'the code looks correct.'
> Test the application and verify critical user journeys."*

---

## ⚠️ Current State: No Persistent Test Suite Exists

This is an honest statement of the gap, not a description of intent.

| Expected | Actual |
|---|---|
| `playwright.config.ts` | ❌ Does not exist |
| `vitest.config.ts` | ❌ Does not exist |
| `*.test.ts` / `*.spec.ts` | ❌ Zero files |
| `npm test` script | ❌ Not in `package.json` |
| Test step in CI | ❌ Not in `deploy.yml` |
| Lint step in CI | ❌ Not in `deploy.yml` (lint exists locally but never runs in CI) |

**What exists:**
- `playwright` is listed in `devDependencies` and powers the focused `scripts/critical-era-dialog-smoke.mjs` check for card order, 2016/2011 details, LPC omission, and dialog interactions.
- `scripts/homepage-claims-smoke.mjs` checks the rendered homepage for known unsupported legacy strings, verifies source-grounded Achievement wording and About expansion, and checks browser errors and 390px overflow. Both scripts are reproducible locally but are not yet registered as package scripts or CI jobs.
- `npm run smoke:client-assets` verifies the original Sanchi Paat scan, five distinct agarwood photos, and supplied-logo placements plus favicon/social-preview assets. It is a local smoke check and is not part of CI.
- `npm run build` (`tsc -b && vite build`) provides type checking and compilation as a side effect.
- Browser verification remains separate from CI: the kept Playwright smoke scripts provide reproducible local checks but are not automatically run by the deploy workflow.

**Consequence:** nothing prevents a route from breaking, an image from going missing, or a link from 404ing between deploys.

---

## 1. Testing Goals

Critical functionality to protect, in priority order:

1. **All six routes render** without crashing or showing a blank page.
2. **Navigation works** — every navbar and footer link resolves to a real route.
3. **No broken internal links** — zero `href="#"`, zero dead routes.
4. **Images load** — no broken `<img>` on any route.
5. **Mobile navigation functions** — drawer opens, closes, and is reachable.
6. **Accessibility basics hold** — one `<h1>` per route, images have `alt`, contrast passes.
7. **Build and lint pass** on every push.

---

## 2. Test Types

### Unit testing
**Status:** Not implemented. **Priority:** Low for this project.

The product is presentation-heavy with little business logic. Genuinely testable units are limited to:
- `cn()` class merging.
- `hexToVec3()` colour conversion (`glsl-hills.tsx`).
- `getPageFromPath()` route parsing (`useCurrentRoute.ts`).
- `useBookReader` pagination and font-size logic.

### Integration testing
**Status:** Not implemented. **Priority:** Medium.

Worth testing once a runner exists:
- `useBookReader` with the scanned-image AGAR book and embedded-PDF proceedings book.
- `DeviceContext` tier resolution at 375 / 900 / 1536 px.
- `SpaRedirectHandler` path restoration from `?path=`.

### End-to-end testing
**Status:** Not implemented. **Priority:** High — this is the real gap.

E2E is where this project's failures actually occur (broken images, dead links, unreachable drawer, routes that render nothing). `playwright` is already a devDependency.

---

## 3. Testing Tools

| Level | Tool | Status |
|---|---|---|
| Unit | Vitest (not installed) | ❌ |
| Integration | Vitest + Testing Library (not installed) | ❌ |
| E2E | **Playwright** (installed, unconfigured) | ⚠️ |
| Type check | `tsc -b` | ✅ via `npm run build` |
| Lint | Oxlint | ✅ local, ❌ not in CI |

---

## 4. Test File Structure

Recommended layout once a runner is added:

```
tests/
├── e2e/
│   ├── routes.spec.ts        ← all six routes render
│   ├── navigation.spec.ts    ← navbar, footer, anchor links
│   ├── mobile-nav.spec.ts    ← drawer behaviour at 375px
│   └── assets.spec.ts        ← no broken images
└── unit/
    ├── utils.spec.ts
    └── useBookReader.spec.ts
```

---

## 5. Critical User Flows

### Flow 1 — Land on the site and read the home page
**Steps:**
1. Navigate to `/`
2. Wait for the hero to render
3. Scroll through About → Sanchi Paat → Agar Story → Formation → Critical Era → Achievement → NDF Findings → Rules → Challenges → Press → Latest News.

**Expected result:** All sections render with content; navbar highlights the active section; no console errors.

---

### Flow 2 — Open a book and read it
**Steps:**
1. Navigate to `/books`
2. Confirm the library lists exactly the two client-supplied publications
3. Open the AGAR scan; verify page 1 loads and the flipbook page-turn style is active
4. Advance to page 2; verify the page image and progress update
5. Return to the library
6. Open the seminar proceedings; verify the local PDF reader and download work

**Expected result:** Both client-supplied books open correctly; AGAR uses the configured flipbook page-turn effect; the proceedings PDF renders locally; the page remains navigable and downloads are local.

---

### Flow 3 — Read the policy page via the scroll-spy nav
**Steps:**
1. Navigate to `/policy`
2. Click each of the six sidebar entries
3. Confirm the page scrolls to the matching section and the nav marks it active

**Expected result:** All six sections reachable; active state follows scroll.

---

### Flow 4 — Read the research page and verify sample-data labels
**Steps:**
1. Navigate to `/research`
2. Click each of the six sidebar entries
3. Locate the data visualization section
4. Confirm every chart and the data table carry a "Sample Data — for illustration only" label

**Expected result:** All sections render; **the sample-data disclaimer is present and visible on every chart.** Absence of the label is a test failure.

---

### Flow 5 — Navigate on a mobile viewport
**Steps:**
1. Set viewport to 375 × 667
2. Open the hamburger drawer
3. Confirm the close control is reachable and functional
4. Navigate to a page route
5. Confirm the drawer closes

**Expected result:** Drawer opens above the navbar, closes reliably, and navigation completes.

---

### Flow 6 — Hit an unknown route
**Steps:**
1. Navigate to `/does-not-exist`

**Expected result:** `NotFoundPage` renders with working navigation — not a blank page, not a server error.

---

### Flow 7 — Verify the deep-link recovery
**Steps:**
1. In a production build served under the deploy base, request `/aatma-site/history`
   directly (simulating the Pages 404 path). **Dev base is `/`; CI base is `/aatma-site/`.**
   Testing the bare `/history` path passes while production is broken.

**Expected result:** `404.html` redirects into the SPA and the history route renders.

---

### Flow 8 — Critical Era detail dialogs and History link

**Steps:**
1. Open each of the four Critical Era cards using mouse, touch, Enter, and Space.
2. Verify the dialog title and card-specific copy.
3. Verify initial focus, focus trapping, focus restoration, Escape/close-button/backdrop closing, and body-scroll restoration.
4. Check the page and dialog at 320, 390, 768, and 1366 px; verify the close button stays visible and long text scrolls inside the dialog without horizontal overflow.
5. Activate “Read the full story.”

**Expected result:** Every card shows its matching content, the dialog remains usable at all tested widths, and the link opens `/history`.

**Automation:** `node scripts/critical-era-dialog-smoke.mjs` (set `CRITICAL_ERA_BASE_URL` to the dev or preview origin).

---

### Flow 9 — /about complete-brief reader fidelity (final PDF baseline)

**Verified source baseline:** the 10-page final PDF has 10 headed sections and 36 paragraphs (3 editorial + 33 section paragraphs), totalling 4,343 whitespace-delimited words. `scripts/about-spine-smoke.mjs` compares the rendered reader to `src/data/about-spine.ts`; PDF reconciliation separately confirms 36/36 paragraph substrings and 185/185 detected red text spans represented in the reader. These figures replace—not combine with—the historical DOCX baseline of 31 paragraphs / 3,880 words.

**Regression steps:**
1. Open `/about`; verify every final-PDF heading and paragraph appears in source order.
2. Compare normalized rendered paragraph text against a paragraph-level extraction of the authoritative final PDF; record only explicitly permitted transport normalization. Do not omit passages or use prior DOCX counts as the expected result.
3. Verify every red-coloured/red-underlined addition from the PDF is present in the full reader and mapped in the reconciliation manifest.
4. Verify Contents anchors and homepage deep-dive links land under the fixed navbar at the correct section.
5. Check long paragraphs, source wording, and source slips against the final PDF; no silent corrections or truncation.
6. Check responsive overflow at 320/375/390/768/900/1024/1366/1536 px and verify the current publication/privacy decision for member identities.

**Expected result:** complete, ordered, paragraph-for-paragraph final-PDF representation on `/about`; all 36 paragraphs and detected red-formatted text runs are accounted for in the reader. Homepage topic destinations for red additions are a separate gate and remain pending beyond the About pilot.

**Automation:** `scripts/about-spine-smoke.mjs` asserts final-PDF paragraph/word pins, section order and deep-dive links, and compares the rendered reader with source data. A separate PDF reconciliation run verifies source paragraphs/red text spans against the supplied PDF; keep both checks current.

### Flow 10 — Homepage About sequence and remaining story-section source coverage

**About pilot steps:**
1. Open `/` and verify the initial About view is collapsed, retains the seal and bilingual intro, and shows a semantic “Read more” button.
2. Activate “Read more”; confirm the route remains `/`, the button becomes “Show less,” and eleven connected cards appear in final-PDF order (editorial + ten headed sections).
3. Open each card by mouse/touch and keyboard. Compare dialog heading, every source paragraph, editorial byline, and sequence index against `src/data/about-spine.ts`.
4. Verify Previous/Next, first/last disabled states, Escape/close/backdrop, focus entry/trap/restore, body scroll/inert restoration, and internal scroll for long sections.
5. Test expansion, cards and dialog at 320/375/390/768/900/1024/1366/1536 px; check no horizontal overflow and reduced-motion usability.
6. Collapse the sequence; confirm focus returns to “Read more” and the control does not navigate to `/about`.
7. Open `/about` directly and by its existing route; verify the full reader and its section anchors remain intact.

**Remaining full redesign steps:** visit Sanchi Paat, Agar Story, Formation/Seminar, Critical Era, Achievement, NDF, Rules, and Challenges; map every final-PDF red passage to the appropriate rendered destination. Keep Press/News provenance distinct. This is a separate outstanding phase, not covered by the About smoke.

**Expected result:** all 36 final-PDF paragraphs (4,343 whitespace-delimited words) are available through the in-place About sequence with exact source text; the legacy `/about` route remains complete. Other homepage red-addition destinations are not complete until separately verified.

**Automation:** `node scripts/about-redesign-smoke.mjs` checks all eleven sequence items against parsed canonical source text, expansion/collapse, modal navigation, focus/scroll behavior, responsive widths, and `/about` compatibility. `node scripts/about-spine-smoke.mjs` checks the complete full-reader route and its collapsed homepage CTA contract.

**About pilot — 2026-10-22:** implemented locally and awaiting user review. Other sections remain pending.

---

## 6. Coverage

**Target:** Practical, not a percentage. Every route and every critical flow above must be covered by at least one E2E check.

**Prioritise:**
- Route rendering (all six + not-found).
- Internal link integrity.
- Image loading.
- Mobile drawer behaviour.
- Sample-data labelling on `/research`.
- Build, lint, and type-check passing in CI.

**Do not chase:** line coverage on presentational components.

---

## 7. Commands

| Purpose | Command | Status |
|---|---|---|
| Build | `npm run build` | ✅ works |
| Type check | `npm run build` (runs `tsc -b`) | ✅ works |
| Lint | `npm run lint` | ✅ works locally, ❌ not in CI |
| Browser smoke test | `node scripts/smoke-test.mjs` | ✅ works (see §7a) |
| Test (unit/E2E suite) | *not defined* | ❌ |
| Dev server | `npm run dev` | ✅ works |
| Preview built output | `npm run preview` | ✅ works |

**Local verification server:** serve from `dist/`, never the project root:
```bash
cd dist && python3 -m http.server 4173
```

### §7a. Browser smoke test (scripted, runs)

`scripts/smoke-test.mjs` visits every public route × 5 viewports (360×390, 390×844, 768×1024, 1366×768, 1920×1080) against the built site and records HTTP status, title, rendered content, console/page errors, failed requests, broken images, and overflow. Writes `scripts/smoke-test-results.json`.

```bash
npm run preview                     # terminal 1 — serves dist/ on :4173
node scripts/smoke-test.mjs        # terminal 2 — full matrix (11 routes + 3 probes)
```

Env knobs: `SMOKE_ONLY=/,/books` (route filter for chunks), `SMOKE_TAG=chunk1` (output-file suffix), `SMOKE_SHOTS=1` (screenshot every combination, not just failures). **Must run in a foreground terminal** — Playwright's driver exits with "stdin is not a tty" when backgrounded.

Latest full run: 2026-10-17 — 70 combinations, 35 PASS / 10 PASS⚠ / 20 FAIL. Findings + matrix: `docs/SMOKE_TEST_REPORT.md`.

### CI gap to close

`.github/workflows/deploy.yml` currently runs only:
```yaml
- run: npm ci
- run: npm run build
```

**Missing:** `npm run lint`, and any route smoke test. The blueprint's Definition
of Done requires lint and tests to pass — today only the build does.

---

## 8. Definition of Done

A task is complete only when:

- [ ] `npm run build` exits 0 (includes type checking).
- [ ] `npm run lint` exits 0.
- [ ] Affected routes render in a real browser.
- [ ] No broken images on affected routes.
- [ ] No broken internal links introduced.
- [ ] No console errors on affected routes.
- [ ] Critical flow for the change manually verified and **the verification recorded in the task**.
- [ ] Sample/placeholder data still labelled as such.
- [ ] Documentation updated when behaviour changed.

**Anti-pattern to avoid:** reporting a task complete because the code *looks*
correct. Every claim of completion must name the artifact (file path, route,
command output) that was actually observed. If a file was supposed to be
created, verify it exists on disk before reporting success.

---

## 9. Lazy-Loading Investigation on /history (2026-10-13)

### Verdict: NOT a bug — correct native lazy-loading behavior

`loading="lazy"` images on `/history` reported `naturalWidth: 0` before scrolling. Cross-browser testing (task `t_c10aad2e`) across **new headless v151, old headless v151, and real headed Chrome v155** showed **identical behavior in all three**: 8/10 lazy images unloaded before scroll, **0 failures after scroll — all load correctly when scrolled into view.** This is exactly how native `loading="lazy"` is designed to work. There is no defect.

The earlier "naturalWidth: 0" observations were measurements taken before scrolling — which is the expected, correct behavior for lazy images, not a failure.

### Changes made (aab4486 + d2e65c6) — minor enhancements, not bug fixes

Two low-risk changes were made to `src/components/ui/reveal.tsx` / `HistoryPage.tsx` on the initial (mistaken) belief that this was a bug. They are harmless and kept, but they were **not fixing a real defect**:

- `aab4486` — added a `rootMargin` prop to `Reveal`, set to `"0px 0px 400px 0px"` on the history `ImageSection`, so images begin loading slightly before fully scrolled in.
- `d2e65c6` — apply `will-change-transform` only when `visible` (not in the hidden state).

Neither is required for correctness. If revisiting, they can be kept as-is or reverted without user-visible impact.

### Note for Future Contributions

Do **not** treat `naturalWidth: 0` on a `loading="lazy"` image as a bug — measure **after** scrolling the image into view first. Do **not** "fix" lazy-loading by flipping images to `loading="eager"`; that trades a real performance regression for a non-issue. Native lazy-loading is working as intended here.
