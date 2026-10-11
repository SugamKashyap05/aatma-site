# Architecture — AATMA Website

> Source of truth for **how the system is built** — routing, folder structure,
> component contracts, and deployment. Read before adding a route, a component,
> or a dependency.

---

## 1. System Overview

A **static single-page application** with client-side routing. There is no
server, no database, and no runtime API. All content is compiled into the
bundle or served as static files from `public/`.

```
Visitor
  │
  ▼
GitHub Pages (static files from dist/)
  │
  ├── index.html ──► React bundle ──► React Router ──► Route component
  │                                       │
  │                                       └── PageLayout (navbar + hero + footer)
  │
  ├── 404.html ──► redirects deep links back into the SPA via ?path=
  │
  └── public/ static assets
        ├── books/   (text chapters, scanned page images, covers)
        ├── history/ (9 generated images)
        ├── research/(3 SVG illustrations)
        └── press/   (download assets)
```

---

## 2. Architecture Pattern

**Pattern:** Modular monolith — a single build artifact organised into
self-contained feature folders.

**Reason:** The product is a content site with six independent pages. A feature
folder per page keeps each route's components, data, and styling together,
which keeps the working set small for both humans and agents. Splitting into
separate deployables would add infrastructure cost with no benefit for a
statically hosted site.

---

## 3. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19 |
| Build tool | Vite | 8 |
| Language | TypeScript | 6.0 (`~6.0.2`) |
| Styling | Tailwind CSS | v4 (via `@tailwindcss/vite`) |
| Routing | React Router | 7 |
| Animation | Motion (Framer Motion successor) | 13 |
| 3D / WebGL | Three.js | 0.186 |
| Icons | Lucide React | 1.48 |
| Class utilities | clsx + tailwind-merge (via `cn`) | 2.1 / 3.7 |
| Linting | Oxlint | 1.81 |
| Backend | **None** | — |
| Database | **None** | — |
| Authentication | **None** | — |
| Storage | **None** (static assets in `public/`) | — |
| Hosting | GitHub Pages | — |
| CI/CD | GitHub Actions | — |
| Payments / Email / Analytics | **None** | — |

**Explicitly not used:** shadcn/ui, ESLint, Prettier, Vitest.

---

## 4. System Components

### Frontend responsibilities
- Render six routes and a not-found route.
- Manage client-side navigation and scroll restoration.
- Detect device tier and adapt layout and animation cost.
- Read and paginate books (text and scanned-image formats).
- Serve as the sole source of truth for content presentation.

### Build responsibilities
- Type-check via `tsc -b`, then bundle via `vite build`.
- Inline/emit assets; copy `public/` verbatim into `dist/`.
- Apply `base` so assets resolve under `/aatma-site/` on Pages.

### Static-asset responsibilities
- `public/books/` — book text, chapter images, covers.
- `public/history/` — hero banner and section illustrations.
- `public/research/` — SVG illustrations.
- `public/press/` — downloadable assets.
- `public/404.html` — SPA deep-link recovery.

**There are no backend or database responsibilities.**

---

## 5. Architecture Diagram

```
                    ┌──────────────────────────────────────┐
                    │            App.tsx                    │
                    │  BrowserRouter (basename from BASE_URL)│
                    │  DeviceProvider                       │
                    │  SpaRedirectHandler · ScrollManager   │
                    │  KineticGrid (fixed background)       │
                    └──────────────────┬───────────────────┘
                                       │
                    ┌──────────────────▼───────────────────┐
                    │              Routes                   │
                    └──┬────┬────┬────┬────┬────┬──────────┘
                       │    │    │    │    │    │
              ┌────────┘    │    │    │    │    └────────┐
              ▼             ▼    ▼    ▼    ▼             ▼
        HomePage      /books /press /history /policy  /research  NotFoundPage
        (eager)       └──────────── lazy-loaded ────────────┘
              │             │    │    │    │             │
              └─────────────┴────┴────┴────┴─────────────┘
                                       │
                              ┌────────▼────────┐
                              │   PageLayout    │  ← shared shell
                              │  Navbar · Hero  │
                              │  AmbientMotion  │
                              │     Footer      │
                              └─────────────────┘
```

**Home is eager-loaded** (it is the landing route). All other routes are
`React.lazy` + `Suspense` with a `bg-green-deep` fallback.

---

## 6. Data Flow

### Route navigation
1. User clicks a link (React Router `Link`/`NavLink`, or programmatic `navigate`).
2. Router matches the path against `basename` + route table.
3. If the route is lazy and not yet loaded, `Suspense` renders the fallback.
4. Route component renders, wrapping content in `PageLayout`.
5. `ScrollManager` restores scroll position or scrolls to a hash target.

### Anchor navigation (home sections)
1. Link targets `/#<sectionId>`.
2. Router navigates to `/`; `ScrollManager` reads the hash.
3. Element with that `id` is scrolled into view, offset by the fixed navbar via `scroll-mt`.

### Deep-link recovery (GitHub Pages 404)
1. A request for `/aatma-site/history` reaches Pages, which has no such file.
2. Pages serves `public/404.html`.
3. The inline script extracts the path relative to `/aatma-site` and redirects to `/aatma-site/?path=%2Fhistory`.
4. `SpaRedirectHandler` reads `path` from the query string and calls `navigate(redirectPath, { replace: true })`.

### Book reading
1. `/books` renders `BookLibrary` from `BOOKS` (`src/data/books.ts`).
2. Selecting a book calls `useBookReader`, which loads either chapter text (`filePath`) or page images (`public/books/<slug>/pages/`).
3. Reader state (current page, font size) lives in the hook; `BookReader` renders it.

---

## 7. Project Structure

```
aatma-site/
├── docs/                       ← This documentation set
├── documents/                  ← Client-supplied source documents (5 files)
├── public/                     ← Static assets, copied verbatim to dist/
│   ├── books/                  ← Book text, chapter images, covers
│   ├── history/                ← 9 history-page images
│   ├── research/               ← 3 research-page SVG illustrations
│   ├── press/                  ← Press download assets
│   ├── 404.html                ← SPA deep-link recovery
│   ├── robots.txt · sitemap.xml
│   └── favicon.svg · icons.svg · reduced-motion.css
├── scripts/                    ← Build-time asset pipelines (hero images)
├── src/
│   ├── App.tsx                 ← Router, providers, route table
│   ├── main.tsx                ← Entry point
│   ├── index.css               ← Tailwind import + @theme tokens
│   ├── assets/hero/            ← Generated hero manifest + variants
│   ├── components/ui/          ← Shared primitives (13 files)
│   │   ├── PageLayout.tsx      ← Route shell: navbar + hero + footer
│   │   ├── Navbar.tsx          ← Two-zone responsive navigation
│   │   ├── reveal.tsx          ← Scroll-reveal wrapper
│   │   ├── bento-grid.tsx / bento-card.tsx
│   │   ├── button.tsx / badge.tsx
│   │   ├── InteractiveTimeline.tsx
│   │   ├── kinetic-grid.tsx    ← Fixed background grid
│   │   ├── glsl-hills.tsx      ← WebGL hills (desktop only)
│   │   ├── slide-tabs.tsx
│   │   └── ScrollManager.tsx
│   ├── context/
│   │   └── DeviceContext.tsx   ← Device tier provider
│   ├── data/
│   │   ├── content.ts          ← AATMA identity + MILESTONES
│   │   └── books.ts            ← Book + Chapter types and BOOKS array
│   ├── features/               ← One folder per page/section
│   │   ├── home/ hero/ about/ agarStory/ milestones/
│   │   ├── members/ contact/ footer/ ambient/
│   │   ├── books/              ← Library + reader (9 files)
│   │   ├── press/              ← /press route (3 files)
│   │   ├── news/               ← PressSection, MediaCoverageTimeline
│   │   ├── history/            ← /history route
│   │   ├── policy/             ← /policy route (7 files)
│   │   ├── research/           ← /research route (4 files)
│   │   └── notFound/
│   ├── hooks/                  ← 8 custom hooks
│   └── lib/
│       └── utils.ts            ← cn() utility
├── .github/workflows/deploy.yml
├── index.html · vite.config.ts · tsconfig*.json · package.json
└── AATMA_*.md                  ← Historical phase trackers (superseded by docs/)
```

---

## 8. Dependency Rules

- **UI components must not import feature components.** Dependencies flow one way: `features/` → `components/ui/`.
- **`components/ui/` must not import from `features/`** — with one documented exception: `PageLayout` imports `AmbientMotion`, `Footer`, and `Navbar`, because it *is* the composition layer for routes.
- **`data/` must not import from `features/` or `components/`.** It is pure data and types.
- **`hooks/` must not import from `features/`.** Hooks are generic and reusable.
- **`lib/utils.ts` must not import from anything in `src/`.** It is a leaf.
- **No circular imports.** If two modules need each other, extract the shared piece.
- **Route components are the only place `PageLayout` is used.** Sections receive layout from their route, not from each other.
- **Use the `@/` alias for all internal imports.** Never use long relative paths like `../../..`.

---

## 9. Key Technical Decisions

### Decision: Client-side routing with a 404.html redirect shim
**Context:** GitHub Pages has no server-side rewrite. A direct request to `/aatma-site/history` returns a 404.
**Alternatives:** Hash routing (`/#/history`), or moving to a host with rewrites (Netlify, Vercel).
**Reason:** Hash routing produces ugly, non-canonical URLs. `404.html` + `?path=` recovery keeps clean paths while remaining fully static. Implemented in `public/404.html` + `SpaRedirectHandler`.

### Decision: `basename` derived from `import.meta.env.BASE_URL`
**Context:** The app runs at `/` in dev, `/aatma-site/` on Pages, and `./` for a local build.
**Alternatives:** Hardcode `/aatma-site/`; require an env var everywhere.
**Reason:** Deriving it keeps one code path. **Pitfall:** `"./"` is not a valid router basename — it must be normalised to `"/"` or the app renders nothing. See `App.tsx`.

### Decision: Device tier via context, not media queries
**Context:** Layout *and* animation cost differ per tier (mobile skips WebGL entirely).
**Alternatives:** CSS-only breakpoints; prop-drilling from a wrapper.
**Reason:** 8 consumers need the same value, and the WebGL decision is JavaScript-side, not CSS-side. A context avoids drilling through intermediate components.

### Decision: Feature folders instead of type folders
**Context:** Six routes, each with several sections.
**Alternatives:** Group by type (`components/`, `containers/`, `pages/`).
**Reason:** Keeping a route's files together makes the working set obvious. Adding a route means adding one folder, not editing five.

### Decision: Tailwind v4 `@theme` tokens instead of a JS config
**Context:** Tailwind v4 replaced `tailwind.config.js` with CSS-native configuration.
**Alternatives:** A legacy `tailwind.config.js` with `theme.extend`.
**Reason:** v4's `@theme` is the supported path and keeps tokens in one CSS file. **Pitfall:** there is no `tailwind.config.js` — do not create one.

### Decision: No test framework installed
**Context:** `playwright` is a devDependency but no config or spec files exist.
**Alternatives:** Add Vitest + Playwright and wire them into CI.
**Reason:** **This is a gap, not a decision.** See `TESTING.md` and `PRD.md` §11.

---

## 10. Performance Considerations

- **Route-level code splitting** — every route except `/` is lazy-loaded.
- **WebGL is desktop-only** — `glsl-hills` renders only when `deviceTier === "desktop"`; mobile gets a static gradient.
- **Ambient layers scale down** — 1 layer on mobile, 2 on desktop.
- **Images should be lazy-loaded** below the fold (`loading="lazy"`).
- **Hero images are pre-generated** into AVIF/WebP variants by `scripts/optimize-hero-images.mjs`; source PNGs are gitignored scratch.
- **Build size baseline:** main bundle ≈ 441 kB (≈ 142 kB gzipped) — see `npm run build` output.

---

## 11. Scalability Considerations

- **Static hosting scales trivially** — no runtime to saturate.
- **Bundle size is the real constraint.** New dependencies must be justified; prefer a small local component over a library.
- **Content growth** is handled by adding entries to `src/data/*.ts` and assets to `public/`. No infrastructure change required.
- **If a backend is ever added** (membership, CMS), it must be introduced as a separate service — this architecture has no server layer to extend.

---

## 12. Failure Scenarios

| Scenario | Expected behaviour |
|---|---|
| **Static asset missing** (404) | Browser renders a broken image. The page must not crash. Every `<img>` should have a meaningful `alt`. |
| **Route chunk fails to load** | `Suspense` shows the `bg-green-deep` fallback. A network retry or reload is required; no error boundary is implemented. |
| **WebGL unavailable** (desktop) | `glsl-hills` must fall back to the static gradient, matching the mobile path. |
| **`prefers-reduced-motion` set** | All animation disabled; parallax transforms not applied; ambient motion suppressed. |
| **Unknown route** | `NotFoundPage` renders with navigation intact. |
| **Deep link on GitHub Pages** | `404.html` redirects into the SPA; `SpaRedirectHandler` restores the path. |
| **JavaScript disabled** | **Blank page.** No SSR, no static fallback. Accepted for this product. |
| **Book file missing** | Reader must degrade gracefully — show an unavailable message, not a crash. |

**Not implemented:** error boundaries, retry logic, offline support, analytics-based failure detection.
