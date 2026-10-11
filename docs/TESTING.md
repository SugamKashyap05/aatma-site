# Testing Strategy — AATMA

> Source of truth for **how we know it works**.
> The blueprint's rule: *"The agent should not stop at 'the code looks correct.'
> Test the application and verify critical user journeys."*

---

## ⚠️ Current State: No Tests Exist

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
- `playwright` is listed in `devDependencies` but is unused.
- `npm run build` (`tsc -b && vite build`) provides type checking and compilation as a side effect.
- Verification has been performed manually through browser automation in agent sessions — **this does not persist** and leaves no regression protection.

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
- `useBookReader` with a text book and a scanned-image book.
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
3. Scroll through About → Agar Story → Milestones → Members → Press & Media → Contact

**Expected result:** All sections render with content; navbar highlights the active section; no console errors.

---

### Flow 2 — Open a book and read it
**Steps:**
1. Navigate to `/books`
2. Confirm the library lists all books from `src/data/books.ts`
3. Select a text book → reader opens with chapters
4. Advance a page → progress updates
5. Return to the library
6. Select a scanned book → page images render

**Expected result:** Both book formats read correctly; navbar and footer remain present (reader is wrapped in `PageLayout`).

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
1. In a production build, request `/history` directly (simulating the Pages 404 path)

**Expected result:** `404.html` redirects into the SPA and the history route renders.

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
| Test | *not defined* | ❌ |
| Dev server | `npm run dev` | ✅ works |
| Preview built output | `npm run preview` | ✅ works |

**Local verification server:** serve from `dist/`, never the project root:
```bash
cd dist && python3 -m http.server 4173
```

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
