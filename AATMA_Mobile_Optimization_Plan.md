# AATMA Mobile Optimization — Implementation Plan

**Project:** AATMA demo site — mobile theme + responsive refinement
**Stack:** React 19 + Vite 6 + TypeScript + Tailwind CSS v4 (no new dependencies anticipated)
**Reference:** `handoff.md` (E:/all projects for hermes/handoff.md), `AATMA_Task_List.md`
**Live:** `http://localhost:4173/` (serve `dist/` via `python3 -m http.server 4173`)
**Date:** 2026-09-26

---

## 1. Objective

Add a dedicated **mobile theme** to the AATMA demo site. The desktop experience is complete and must remain unchanged. The mobile theme shares the same color palette (`green-deep #1a3c2a`, `gold #c9a84c`, `cream #f5f0e8`, `charcoal #1a1a1a`), fonts (Playfair Display, Inter, Noto Sans Assamese), and content but renders a distinct layout: single-column cards, disabled WebGL hills (static green-deep gradient fallback), reduced ambient motion, compact navbar, adjusted type scale, and touch-friendly targets. Both themes live in one React app, one build, one `dist/`.

**Non-goals (explicit):**
- No changes to `ParallaxHero.tsx` (hero is untouched per handoff + user)
- No content changes (bilingual text, stats, milestones, member cards, news, contact form — all unchanged)
- No new design tokens (existing `@theme` block covers both themes)
- No separate mobile codebase or second build
- No file edits in this document — this is the plan only

---

## 2. Conditions from handoff.md (must preserve)

| # | Condition | How preserved |
|---|-----------|---------------|
| 1 | Hero excluded from post-hero wrapper | Wrapper starts below `ParallaxHero`; hero rendered via `<Routes>` outside wrapper |
| 2 | GLSLHills at z-0, content at z-10 | Layered structure preserved; mobile z-0 becomes static gradient fallback |
| 3 | Single shared hills instance (desktop) | One `<GLSLHills>` on desktop; one static div on mobile — same z-0 position |
| 4 | Green-deep `#1a3c2a` color | Mobile fallback uses identical hex |
| 5 | No section-to-section fade | Wrapper is continuous; no transitions between sections |
| 6 | Text readability over hills | Mobile sections keep existing semi-transparent overlays |
| 7 | Navbar transparent on home, solid on sections | `useLocation()` logic unchanged |
| 8 | `transition-colors` not `transition-all` on navbar | Unchanged |
| 9 | `prefers-reduced-motion` gating | Mobile inherits — OS reduced-motion disables animation in both themes |
| 10 | Hero unchanged | `ParallaxHero.tsx` not touched |

---

## 3. Phased Plan

### Phase 1: Foundation — Device Detection + Context

**Goal:** A `deviceTier` value (`mobile` | `tablet` | `desktop`) available to any component, SSR-safe, no flash of wrong theme.

**Subtasks:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 1.1 | `useDeviceTier` hook | `src/hooks/useDeviceTier.ts`: `useState('desktop')` default, `useEffect` reads `window.innerWidth`, sets `mobile` (<768) / `tablet` (768–1024) / `desktop` (>1024), attaches `resize` listener, cleans up. Pattern mirrors `usePrefersReducedMotion`. | Hook file written, exports `DeviceTier` type + `useDeviceTier` function |
| 1.2 | `DeviceContext` (optional — evaluate vs prop-drilling) | `src/context/DeviceContext.tsx`: `createContext<DeviceTier>`, `DeviceProvider` wraps children, consumes hook. Evaluate: 7 section components + Navbar = 8 consumers; one-level prop-drilling from wrapper is also fine. Pick one. | Decision made + file written OR decision to use props instead |
| 1.3 | Wrap post-hero persistent wrapper in provider | `App.tsx`: import provider, wrap the `<div className="relative z-0">...</div>` block (or entire app outside `<Routes>`). Pass `deviceTier` via context or as prop to each section. | App.tsx updated, no build errors |
| 1.4 | First mobile detection test | Load site at 375px viewport (browser devtools), log `deviceTier` from a section component. Confirm `mobile`. Load at 1200px, confirm `desktop`. | Browser verification shows correct tier per viewport |

**Phase 1 exit criteria:** `deviceTier` is available everywhere, correct per viewport, no SSR flash (default `desktop` hydrates to correct tier within one frame).

---

### Phase 2: GLSLHills — Mobile Fallback

**Goal:** On mobile, the z-0 layer is a static green-deep gradient instead of a WebGL canvas. On desktop, unchanged.

**Subtasks:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 2.1 | Add `deviceTier` prop to `GLSLHills` | `GLSLHillsProps` gains `deviceTier?: DeviceTier`. When `deviceTier === 'mobile'`, skip WebGL init and render the static CSS fallback (same as `prefers-reduced-motion` fallback: `radial-gradient(ellipse at 50% 100%, #1a3c2a 0%, transparent 70%)` at 0.35 opacity, `absolute inset-0 pointer-events-none`). | GLSLHills renders gradient on mobile, canvas on desktop |
| 2.2 | Pass `deviceTier` from wrapper to `GLSLHills` | `App.tsx`: `<GLSLHills deviceTier={tier} ... />` (or via context). | Wrapper passes tier |
| 2.3 | Verify mobile: no WebGL context created | Browser: 375px viewport, `document.querySelector('canvas')` returns `null`, gradient div present at z-0. | No canvas on mobile, gradient present |
| 2.4 | Verify desktop: canvas still active | Browser: 1200px viewport, canvas present, WebGL context active, green-tinted pixels. | Canvas active on desktop |

**Phase 2 exit criteria:** Mobile has no Three.js canvas; desktop has full canvas. Both show green-deep backdrop at z-0.

---

### Phase 3: Navbar — Mobile Variant

**Goal:** Mobile navbar is a compact top bar with hamburger; desktop navbar unchanged. Optional: bottom tab bar for mobile.

**Subtasks:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 3.1 | Add `deviceTier` consumption to Navbar | `Navbar.tsx`: import `useDeviceTier` (or receive via prop). Branch on `tier === 'mobile'`. | Navbar reads tier |
| 3.2 | Mobile: compact top bar | On mobile, hide inline link list (`hidden`), show logo + hamburger only. Existing mobile menu overlay (`fixed inset-0 z-40`) already exists — confirm it works at 375px. | Mobile: logo + hamburger, no inline links |
| 3.3 | Desktop: unchanged | On desktop, current full navbar with inline links + transparent→solid behavior. | Desktop navbar identical to current |
| 3.4 | Optional: bottom tab bar for mobile | Evaluate: 3–4 icon+label tabs (About, Agar Story, Contact — most-used sections), gold active state, persists across scroll, safe-area inset for notched phones (`env(safe-area-inset-bottom)`). If implemented, render only when `tier === 'mobile'`. If not, skip — mobile is already distinct without it. | Decision + implementation OR skip note |
| 3.5 | Touch target check | Mobile nav links/buttons: minimum 44px tap target. Hamburger button: `p-2` → confirm 44px. | Touch targets ≥ 44px on mobile |

**Phase 3 exit criteria:** Mobile navbar is compact; desktop navbar unchanged; optional bottom tab bar decided.

---

### Phase 4: Section Mobile Variants (one per section)

**Goal:** Each of the 6 content sections + Footer renders a mobile-optimized layout when `deviceTier === 'mobile'`. Desktop unchanged.

**Subtasks — About:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 4.1 | About: stat strip responsive | Current: 4-col grid. Mobile: 2-col grid (`grid-cols-2 md:grid-cols-4` → already has `md:` prefix, verify `text-3xl` stat values don't overflow on 375px). | Mobile stats 2-col, no overflow |
| 4.2 | About: seal size | Current: `w-24 h-24 md:w-28 md:h-28`. On mobile, `w-20 h-20` or keep `w-24` — verify it fits 375px with `top-12 left-6`. | Seal fits mobile viewport |
| 4.3 | About: heading scale | Current: `text-4xl md:text-5xl lg:text-6xl`. Add `max-sm:text-2xl` or `max-sm:text-3xl` for < 640px. | Mobile heading ≤ 2.5rem |

**Subtasks — AgarStory:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 4.4 | AgarStory: 1-col card stack on mobile | Current: `grid md:grid-cols-2 lg:grid-cols-3`. Already stacks on mobile (no `sm:` grid). Verify card full-width on 375px, emoji icon top, no horizontal overflow. | Mobile: 1-col full-width cards |
| 4.5 | AgarStory: body text size | Current: `text-white/70 text-sm`. On mobile, `text-xs` may be too small for 7 cards — verify readability. Consider `text-sm` kept, card padding `p-5` → `p-4` on mobile. | Mobile cards readable |

**Subtasks — Milestones:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 4.6 | Milestones: single-column timeline on mobile | Current: `grid gap-10 md:gap-16 md:grid-cols-2`, cards alternate left/right with `md:flex-row-reverse`. On mobile: `flex-col` single column, year pill above card (not beside), remove `md:flex-row-reverse` branching — or keep card order but stack vertically. | Mobile: vertical timeline, year pill above |
| 4.7 | Milestones: vertical rail on mobile | Current: `absolute left-0 md:left-1/2`. On mobile: either remove rail or make it a thin left border on each card. | Mobile rail decision made |

**Subtasks — Members:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 4.8 | Members: 1-col card stack on mobile | Current: `grid md:grid-cols-3`. On mobile: 1-col full-width. Initials avatar: `w-12 h-12` → keep or `w-10 h-10`. | Mobile: 1-col full-width cards |
| 4.9 | Members: stat strip responsive | Current: `grid grid-cols-2 md:grid-cols-4`. On mobile: `grid-cols-2` (already has `md:`). | Mobile stats 2-col |

**Subtasks — News:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 4.10 | News: 1-col article stack on mobile | Current: `grid md:grid-cols-2`. On mobile: 1-col full-width. Tag badge top-left, image placeholder full-width. | Mobile: 1-col full-width articles |
| 4.11 | News: summary text size | Current: `text-text-mute text-sm`. On mobile, `text-xs` may be too small for 4 articles — verify. | Mobile summaries readable |

**Subtasks — Contact:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 4.12 | Contact: single-column on mobile | Current: `grid md:grid-cols-[1fr_360px]`. On mobile: single column, info card collapses to compact list (icon + value, no label above each), form full-width below. | Mobile: stacked info + form |
| 4.13 | Contact: form inputs mobile | Current: `px-4 py-3`. On mobile, consider `py-4` for comfortable tap. Verify `rows={5}` textarea is usable. | Mobile form inputs comfortable |

**Subtasks — Footer:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 4.14 | Footer: single-column stack on mobile | Current: `grid md:grid-cols-[1.2fr_1fr_1fr]`. On mobile: single column — brand → links → contact stacked. Social icons inline. Bottom bar: `flex-col md:flex-row` — already has `md:` prefix, verify on 375px. | Mobile footer stacked, no overflow |

**Phase 4 exit criteria:** All 7 sections render mobile variants at 375px; desktop variants unchanged at 1200px.

---

### Phase 5: Type Scale + Touch Polish (site-wide)

**Goal:** Mobile type scale is intentional, not squished. Touch targets meet minimums.

**Subtasks:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 5.1 | Section heading mobile scale | For each section heading currently `text-4xl` base: add `max-sm:text-2xl` or `max-sm:text-3xl`. Verify at 375px. | Mobile headings ≤ 2.5rem |
| 5.2 | Body text mobile | Sections with `text-sm` body on mobile: verify readable at 375px. If too small, add `max-sm:text-base` where appropriate. | Mobile body readable |
| 5.3 | Button full-width on mobile | Hero CTAs (`Discover AATMA`, `Get in Touch`): currently `flex flex-wrap gap-4 justify-center`. On `max-sm`, make them full-width (`w-full`). Same for section CTAs (`Join AATMA`, `Send Message`). | Mobile buttons full-width |
| 5.4 | Touch target audit | All clickable elements on mobile: ≥ 44px height. Check: nav links, hamburger, buttons, card links, form inputs, social icons. | All mobile touch targets ≥ 44px |
| 5.5 | Safe-area inset for bottom tab bar (if implemented) | If bottom tab bar added in Phase 3: `padding-bottom: env(safe-area-inset-bottom)` or Tailwind `pb-[env(safe-area-inset-bottom)]`. | Notched phones: tab bar not under notch |

**Phase 5 exit criteria:** Mobile type scale intentional, buttons full-width, all touch targets ≥ 44px.

---

### Phase 6: AmbientMotion — Mobile Reduction

**Goal:** Mobile ambient motion is reduced: 1 layer, slower speed, fog variant preferred. `prefers-reduced-motion` still gates both themes.

**Subtasks:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 5.6 | AmbientMotion: mobile layer count | When `deviceTier === 'mobile'`, render 1 layer instead of 2 (already `layers` prop is 1–3). Update each section's `<AmbientMotion>` call to pass `layers={tier === 'mobile' ? 1 : 2}`. | Mobile: 1 ambient layer per section |
| 5.7 | AmbientMotion: mobile speed increase | On mobile, increase default speed: fog 45→60s, clouds 55→70s, particles 70→80s. Pass `speed={tier === 'mobile' ? base + 15 : base}`. | Mobile ambient slower |
| 5.8 | AmbientMotion: mobile variant preference | On mobile, prefer `variant="fog"` over `clouds`/`particles` (less visually noisy on small screens). Update section calls: if variant is `clouds`/`particles` on desktop, switch to `fog` on mobile. | Mobile: fog variant where applicable |
| 5.9 | Verify `prefers-reduced-motion` still gates mobile | Set OS reduced-motion, load at 375px: ambient static gradient fallback, no animation. | Reduced motion works on mobile |

**Phase 6 exit criteria:** Mobile ambient: 1 fog layer, slower, reduced-motion gated.

---

### Phase 7: Build + Verification

**Goal:** `npm run build` exit 0, dev server restarted from `dist/`, full browser sweep across mobile + desktop viewports.

**Subtasks:**

| ID | Subtask | Detail | Done when |
|----|---------|--------|-----------|
| 7.1 | `npm run build` | `cd E:/all projects for hermes/aatma-site && npm run build`. Exit 0 required. | Build exits 0 |
| 7.2 | Restart dev server | `pkill -f "http.server 4173" 2>/dev/null; sleep 1; cd .../aatma-site/dist && python3 -m http.server 4173 > /dev/null 2>&1` with `background: true`, NO notify param. | Server running on 4173 |
| 7.3 | Mobile browser sweep (375px) | Check: no canvas, gradient at z-0, Navbar compact, all 7 sections mobile layout, buttons full-width, touch targets, ambient 1 fog layer. | All mobile checks pass |
| 7.4 | Desktop browser sweep (1200px) | Check: canvas active, Navbar full, all 7 sections desktop layout unchanged, ambient 2 layers. | All desktop checks pass |
| 7.5 | Tablet sweep (768px, 1024px) | Check: hybrid layout, no broken grids, no horizontal overflow. | Tablet checks pass |
| 7.6 | Reduced-motion check (mobile + desktop) | OS reduced-motion on, both viewports: no animation, static fallbacks. | Reduced-motion gates both themes |
| 7.7 | Scroll + anchor check | Click nav links on mobile: smooth scroll to section, `scroll-mt-20` offset aligns with navbar. | Mobile anchors work |

**Phase 7 exit criteria:** Build exit 0, server running, all viewports verified, reduced-motion gates both themes.

---

## 4. File Inventory

**New files:**

| File | Purpose |
|------|---------|
| `src/hooks/useDeviceTier.ts` | `DeviceTier` type + `useDeviceTier()` hook |
| `src/context/DeviceContext.tsx` | Context provider (if context approach chosen; otherwise skip) |

**Modified files (planned):**

| File | Changes |
|------|---------|
| `src/App.tsx` | Wrap post-hero wrapper in `DeviceProvider` (or pass `deviceTier` prop); pass tier to `GLSLHills` |
| `src/components/ui/glsl-hills.tsx` | Add `deviceTier` prop; when `mobile`, render static gradient fallback instead of WebGL |
| `src/components/ui/Navbar.tsx` | Consume `deviceTier`; mobile: compact top bar; optional bottom tab bar |
| `src/features/about/About.tsx` | Mobile stat strip 2-col, seal size, heading `max-sm` scale |
| `src/features/agarStory/AgarStory.tsx` | Mobile 1-col cards, body text/ padding check |
| `src/features/milestones/Milestones.tsx` | Mobile single-column timeline, year pill above, rail decision |
| `src/features/members/Members.tsx` | Mobile 1-col cards, stat strip 2-col |
| `src/features/news/News.tsx` | Mobile 1-col articles, summary text check |
| `src/features/contact/Contact.tsx` | Mobile single-column, form input padding |
| `src/features/footer/Footer.tsx` | Mobile single-column stack |
| `src/features/ambient/AmbientMotion.tsx` | Already handles `layers`/`speed`/`variant` via props — no change needed; callers pass mobile values |
| `src/index.css` | Optional: safe-area utility class, touch-target minimum if not covered by Tailwind |

---

## 5. Decision Log

| Decision | Option A | Option B | Chosen | Rationale |
|----------|----------|----------|--------|-----------|
| Device tier distribution | Context (`DeviceContext`) | Prop-drilling from wrapper | TBD | Context cleaner for 8 consumers; props simpler, no boilerplate. Decide in Phase 1. |
| Mobile hills | Static gradient fallback (no WebGL) | Reduced WebGL (planeSize 128, speed 0.25) | Static gradient | Lower-end phones vary widely; static gradient preserves mood without GPU cost. Matches `prefers-reduced-motion` fallback already in GLSLHills. |
| Bottom tab bar | Add 3–4 tab mobile nav | Skip; hamburger only | TBD | Main "distinct mobile experience" candidate. Flag optional. Decide in Phase 3. |
| Milestones rail on mobile | Thin left border per card | Remove entirely | TBD | Visual preference. Decide in Phase 4. |

---

## 6. Server Commands (from handoff.md)

```bash
# Build
cd E:/all\ projects\ for\ hermes/aatma-site && npm run build

# Serve (ALWAYS from dist/, NOT project root)
cd E:/all\ projects\ for\ hermes/aatma-site/dist && python3 -m http.server 4173

# Kill server
pkill -f "http.server 4173"

# Server restart (proven pattern)
pkill -f "http.server 4173" 2>/dev/null; sleep 1; cd .../aatma-site/dist && python3 -m http.server 4173 > /dev/null 2>&1
# Run with background=true, NO notify param
```

**CRITICAL:** Always serve from `dist/`. Serving from project root loads dev `index.html` (with `/src/main.tsx`) and React fails to mount.

---

## 7. Progress Tracking

See `AATMA_Mobile_Optimization_Tracker.md` for the live task checklist. **All phases complete and verified as of 2026-09-26.**

---

*This plan is a planning document only. No files are modified by its creation.*
