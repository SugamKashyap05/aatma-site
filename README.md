# AATMA Website

The public institutional website for **AATMA** — the All Assam Agar Traders &
Agaroil Manufacturers' Association, established 1976 in Hojai, Assam.

> A 50-year institution at the heart of India's agarwood trade.

**Live:** https://sugamkashyap05.github.io/aatma-site/

---

## What this is

A static, client-side-rendered content site presenting AATMA's history, policy
record, publications, and research. Six routes, no backend, no database.

| Route | Page |
|---|---|
| `/` | Home — hero, About, Agar Story, Milestones, Members, Press & Media, Contact |
| `/books` | Books library and full-screen reader (text and scanned volumes) |
| `/press` | Press releases, media coverage timeline, downloads |
| `/history` | Institutional history and interactive timeline (1905–2026) |
| `/policy` | Assam agarwood policy, rules, CITES compliance, registration |
| `/research` | Research publications and soil-science communication |

---

## Stack

React 19 · Vite 8 · TypeScript 6 · Tailwind CSS v4 · React Router 7 · Motion 13 ·
Three.js (desktop WebGL hills) · Lucide icons · Oxlint

**No shadcn/ui. No backend. No database.**

---

## Getting started

```bash
npm install
npm run dev          # dev server -> http://localhost:5173
```

### Build and verify

```bash
npm run build        # tsc -b && vite build - must exit 0
npm run lint         # oxlint - must exit 0
npm run preview      # preview the built output
```

To verify a built site locally, serve from `dist/` — **never** the project root:

```bash
cd dist && python3 -m http.server 4173
```

---

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which runs
`npm ci` -> `npm run build` (with `VITE_BASE_PATH=/aatma-site/`) and publishes
`dist/` to GitHub Pages.

The app derives its router `basename` from `import.meta.env.BASE_URL` so the same
code runs at `/` in development and `/aatma-site/` on Pages.

---

## Documentation

**Read these before making changes.** They are the shared source of truth for
humans and AI agents alike.

| Document | Answers |
|---|---|
| [`AGENTS.md`](AGENTS.md) | How should an AI agent behave in this repo? |
| [`docs/PRD.md`](docs/PRD.md) | What are we building, for whom, and why? |
| [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | What should it look and feel like? |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | How does the system work? |
| [`docs/CODE_STYLE.md`](docs/CODE_STYLE.md) | How should code be written? |
| [`docs/TESTING.md`](docs/TESTING.md) | How do we know it works? |

### Known gaps

Recorded honestly rather than left implicit:

- **No test suite exists.** `playwright` is installed but unconfigured. See `docs/TESTING.md`.
- **Lint does not run in CI** — only `npm ci` and `npm run build` do.
- **`public/sitemap.xml` lists 2 of 6 routes** and references the wrong host.
- **Press downloads and research charts contain placeholder content**, labelled as such.
- **29 hardcoded hex values** bypass the design tokens. See `docs/DESIGN_SYSTEM.md` section 16.

---

## Project structure

```
aatma-site/
|-- AGENTS.md              <- Agent instructions (start here if you are an AI)
|-- docs/                  <- Source-of-truth documentation
|-- documents/             <- Client-supplied source documents
|-- public/                <- Static assets (books, history, research, press)
|-- scripts/               <- Build-time asset pipelines
`-- src/
    |-- components/ui/     <- Shared primitives
    |-- context/           <- Device tier provider
    |-- data/              <- Typed content (content.ts, books.ts)
    |-- features/          <- One folder per route / home section
    |-- hooks/             <- 8 reusable hooks
    `-- lib/               <- cn() utility
```

Full detail in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Contact

**AATMA** — Main Road, Hojai – 782435, Assam, India
+91 94014 82133 · aatma20676@gmail.com
