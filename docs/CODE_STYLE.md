# Code Style & Conventions — AATMA

> Source of truth for **how code is written** in this repository.
> The goal is that any file, written by any agent at any time, looks like it
> was written by the same person.

---

## 1. General Principles

- **Prefer readable code** over clever code. This is a content site, not a performance-critical engine.
- **Keep functions focused** — one logical job per function.
- **Avoid unnecessary abstractions.** Do not build a generic system for two use cases.
- **Reuse existing components and utilities.** `BentoCard`, `PageLayout`, `Reveal`, and `cn` already exist.
- **Prefer consistency over novelty.** If the codebase does it one way, do it that way.
- **Remove dead code** rather than commenting it out.

---

## 2. Naming

| Thing | Convention | Example |
|---|---|---|
| React components | PascalCase, one per file, named export | `export function ResearchPage()` |
| Component files | PascalCase matching the component | `PageLayout.tsx`, `BentoCard.tsx` |
| Hooks | camelCase with `use` prefix | `useDeviceTier.ts` → `useDeviceTier()` |
| Utilities | camelCase | `cn()`, `hexToVec3()` |
| Types / interfaces | PascalCase | `Book`, `Chapter`, `DeviceTier` |
| Constants (arrays/objects) | SCREAMING_SNAKE_CASE | `BOOKS`, `MILESTONES`, `NAV_ITEMS` |
| CSS custom properties | kebab-case with `--color-` / `--font-` prefix | `--color-green-deep`, `--font-display` |
| Route paths | lowercase kebab-case | `/books`, `/history`, `/policy` |
| Section ids | lowercase kebab-case | `agar-story`, `rhizosphere-mycoflora` |
| Asset files | lowercase kebab-case | `hero-banner.jpg`, `icon_set.svg` |

**Note:** asset naming is inconsistent today (`hero-banner.jpg` vs `icon_set.svg`). Prefer **kebab-case** for new files.

---

## 3. Folder Structure

```
src/
├── components/ui/   ← Shared, reusable primitives. No feature knowledge.
├── context/         ← React context providers.
├── data/            ← Typed content and constants. Pure data, no JSX.
├── features/<name>/ ← One folder per route or home-page section.
├── hooks/           ← Generic reusable hooks.
└── lib/             ← Leaf utilities with no internal imports.
```

**Rules:**
- A new route gets a **new folder** under `features/`.
- A component used by exactly one route lives in that route's folder.
- A component used by two or more routes moves to `components/ui/`.
- Data lives in `src/data/`, never inline in a component if it is more than a few lines.

---

## 4. Imports

- **Use the `@/` alias** for everything inside `src/`. Never `../../`.
- **Use `import type`** for type-only imports (`verbatimModuleSyntax` is enabled).
- **Group imports** in this order, separated by blank lines:
  1. External packages (`react`, `react-router-dom`, `lucide-react`)
  2. Internal aliased modules (`@/components/...`, `@/data/...`)
- **Do not import a whole library** for one item.

```tsx
// ✅ Correct
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

import PageLayout from "@/components/ui/PageLayout";
import { BOOKS } from "@/data/books";
import type { Book } from "@/data/books";
```

---

## 5. Components

Components should:
- Have a **single responsibility**.
- Prefer **reusable patterns** — use `BentoCard` for cards, `Reveal` for scroll animation.
- **Accept `className`** where a caller may need to adjust layout, and merge it with `cn()`.
- **Export a named function**, with a default export only where the lazy-import pattern requires it (`PageLayout`, route pages).

```tsx
// ✅ Correct
interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn("bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-xl p-6", className)}>
      <p className="font-display text-3xl text-gold">{value}</p>
      <p className="text-white/70 text-sm">{label}</p>
    </div>
  );
}
```

**Avoid:** inline styles for anything a Tailwind class can express.

---

## 6. Functions

Functions should:
- **Do one logical thing.**
- **Have clear names** that describe the outcome, not the mechanism.
- **Avoid unnecessary complexity** — no premature memoisation.

Prefer early returns over nested conditionals:

```tsx
// ✅ Correct
function getBookCover(book: Book): string {
  if (book.coverImage) return book.coverImage;
  return "/books/covers/placeholder.jpg";
}
```

---

## 7. Error Handling

**Use:**
- Optional chaining and nullish coalescing for absent data: `book?.chapters?.[0] ?? null`
- Guard clauses that return a safe fallback.
- `Suspense` fallbacks for lazy routes (already wired in `App.tsx`).

**Do not:**
- Swallow errors silently in a `catch {}` with no handling.
- Add an error boundary without a documented reason (none exist today).
- Throw inside render.

```tsx
// ✅ Correct — degrade gracefully
if (!book) {
  return <p className="text-white/70">This publication is currently unavailable.</p>;
}
```

---

## 8. Comments

Comments should explain:
- **Why** something exists, especially workarounds.
- **Important tradeoffs.**
- **Non-obvious behaviour** — e.g. the `"./"` basename pitfall in `App.tsx`.

**Do not** write comments that restate the code.

```tsx
// ✅ Correct — explains a non-obvious constraint
// React Router needs a rooted path without a trailing slash. Passing "./"
// through naively yields ".", which is not a valid basename and renders nothing.
const basename = rawBase === "./" || rawBase === "" ? "/" : rawBase.replace(/\/$/, "") || "/";

// ❌ Wrong — restates the code
// set basename to rawBase
```

---

## 9. Logging

**No logging library is installed.** This is a client-side static site.

- `console.log` is acceptable during development and **must be removed before commit**.
- `console.warn` / `console.error` may be kept only for genuine, actionable failure paths.
- **Never log** personal data, tokens, or credentials. (None exist in this project — keep it that way.)

---

## 10. Formatting

| Concern | Tool | Config |
|---|---|---|
| Formatter | **None installed** | — |
| Linter | Oxlint | `.oxlintrc.json` |
| Type checking | TypeScript | `tsc -b`, `tsconfig.app.json` |

**Note:** there is no Prettier config. Match the surrounding file's style:
- 2-space indentation.
- Double quotes in TSX/TS.
- Semicolons present.
- Trailing commas in multiline literals.

**Commands:**
```bash
npm run lint     # oxlint
npm run build    # tsc -b && vite build  (includes type checking)
```

**Known gap:** `npm run lint` is **not** run in CI. See `TESTING.md` §7.

---

## 11. Styling

- **Use design tokens, never raw hex.** `text-gold`, not `text-[#c9a84c]`.
- **Use `cn()`** to merge conditional classes — never string concatenation.
- **Follow the card recipe** from `DESIGN_SYSTEM.md` §10.
- **Gate motion** behind `prefers-reduced-motion` via `usePrefersReducedMotion()`.
- **Do not create `tailwind.config.js`** — Tailwind v4 is configured in `src/index.css` via `@theme`.

```tsx
// ✅ Correct
<div className={cn("rounded-xl p-6", isActive && "border-gold/40")} />

// ❌ Wrong
<div className={"rounded-xl p-6 " + (isActive ? "border-gold/40" : "")} />
<div style={{ borderRadius: 12, padding: 24 }} />
<div className="text-[#c9a84c]" />
```

---

## 12. Accessibility (non-negotiable)

Every component must:
- Use semantic HTML elements.
- Provide `alt` on `<img>`; `alt=""` if genuinely decorative.
- Provide `aria-label` on icon-only buttons.
- Mark decorative SVG with `aria-hidden="true"` and `focusable="false"`.
- Keep touch targets ≥ 44×44 px.
- Maintain WCAG AA contrast (4.5:1 body text).

---

## 13. Do

- Reuse existing patterns and components.
- Keep changes focused on the task.
- Follow the design system and folder conventions.
- Remove dead code you encounter.
- Verify with `npm run build` before declaring work complete.
- Label illustrative data explicitly as illustrative.

## 14. Don't

- Create duplicate utilities or components that already exist.
- Introduce a new dependency without justification.
- Ignore the existing architecture or folder rules.
- Change unrelated files in the same commit.
- Invent facts about AATMA, its history, or its policy record.
- Present sample or placeholder data as real.
- Use raw hex colours, inline styles for layout, or `tailwind.config.js`.
- Leave `console.log` in committed code.
- Report work as complete when the artifact does not exist on disk.
