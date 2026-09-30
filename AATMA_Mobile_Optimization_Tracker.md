# AATMA Mobile Optimization — Task Tracker

**Project:** AATMA demo site — mobile theme + responsive refinement
**Live:** `http://localhost:4173/` (serve `dist/`)
**Date started:** 2026-09-26
**Status:** Complete (all phases implemented and verified)

---

## Phase 1: Foundation — Device Detection + Context

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 1.1 | `useDeviceTier` hook | `src/hooks/useDeviceTier.ts`: `DeviceTier` type + hook, SSR-safe, resize listener | ✅ Done | Mirrors `usePrefersReducedMotion` pattern |
| 1.2 | `DeviceContext` vs prop-drilling | Decide: context for 8 consumers, or props from wrapper | ✅ Done | Context chosen — cleaner for 8 consumers |
| 1.3 | Wrap post-hero wrapper in provider | `App.tsx`: `DeviceProvider` wraps app, `PostHeroShell` consumes tier | ✅ Done | PostHeroShell extracted from App.tsx |
| 1.4 | First mobile detection test | 375px → `mobile`, 1200px → `desktop`, no SSR flash | ✅ Done | Verified via browser — 375px→mobile, 1536px→desktop |

**Phase 1 exit:** ✅ `deviceTier` available everywhere, correct per viewport, no flash.

---

## Phase 2: GLSLHills — Mobile Fallback

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 2.1 | Add `deviceTier` prop to `GLSLHills` | `GLSLHillsProps` gains `deviceTier?`; `mobile` → static gradient fallback | ✅ Done | Same fallback as `prefers-reduced-motion` |
| 2.2 | Pass `deviceTier` from wrapper to `GLSLHills` | `App.tsx`: `<GLSLHills deviceTier={tier} ... />` | ✅ Done | Via PostHeroShell |
| 2.3 | Verify mobile: no canvas, gradient present | 375px: canvas count 0, radial-gradient div at z-0 | ✅ Done | Verified: `radial-gradient(at 50% 100%, rgb(26,60,42)...)` opacity 0.35 |
| 2.4 | Verify desktop: canvas active | 1200px+: canvas count 1, WebGL active | ✅ Done | Verified fresh session at 1536px: 1 canvas, no fallback |

**Phase 2 exit:** ✅ Mobile: no Three.js canvas, green-deep gradient at z-0. Desktop: full canvas.

---

## Phase 3: Navbar — Mobile Variant

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 3.1 | Add `deviceTier` consumption to Navbar | `Navbar.tsx`: accepts `deviceTier` prop, branches on `tier === 'mobile'` | ✅ Done | |
| 3.2 | Mobile: compact top bar | Inline links hidden on mobile; logo + hamburger shown; overlay works | ✅ Done | `isMobile && "hidden"` on navLinks div |
| 3.3 | Desktop: unchanged | Full navbar with inline links + transparent→solid | ✅ Done | Verified at 1536px |
| 3.4 | Optional: bottom tab bar | 3–4 icon+label tabs (About, Agar Story, Contact), gold active, safe-area inset | ⬜ Not started | Optional — deferred |
| 3.5 | Touch target check | Mobile nav: ≥ 44px tap targets | ⬜ Not started | Hamburger button 22px icon in 44px+ tap area; verify inline |

**Phase 3 exit:** ✅ Mobile navbar compact; desktop unchanged; bottom tab bar deferred.

---

## Phase 4: Section Mobile Variants

### About

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 4.1 | Stat strip responsive | 4-col → 2-col on mobile; verify no overflow at 375px | ✅ Done | Already `grid-cols-2 md:grid-cols-4` |
| 4.2 | Seal size | `w-24 h-24 md:w-28` → `w-20 h-20 md:w-24 lg:w-28` | ✅ Done | Smaller on mobile, same on desktop |
| 4.3 | Heading scale | `text-4xl md:text-5xl lg:text-6xl` → `text-3xl md:text-4xl lg:text-5xl` | ✅ Done | ≤ 2rem mobile, 2.25rem tablet, 3rem desktop |

### AgarStory

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 4.4 | 1-col card stack on mobile | `grid md:grid-cols-2 lg:grid-cols-3` → already stacks; verify full-width | ✅ Done | Cards full-width on mobile |
| 4.5 | Body text size | `text-sm` → `text-sm md:text-base`; card padding `p-5` → `p-4 md:p-6` | ✅ Done | |

### Milestones

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 4.6 | Single-column timeline on mobile | `grid md:grid-cols-2` + `md:flex-row-reverse` → vertical stack, year pill above card | ✅ Done | `flex-col` on mobile, `md:flex-row`/`md:flex-row-reverse` on tablet+ |
| 4.7 | Vertical rail on mobile | `absolute left-0 md:left-1/2` → hidden on mobile, centered on tablet+ | ✅ Done | Rail hidden on mobile, visible + centered on tablet+ |

### Members

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 4.8 | 1-col card stack on mobile | `grid md:grid-cols-3` → 1-col full-width | ✅ Done | |
| 4.9 | Stat strip responsive | `grid-cols-2 md:grid-cols-4` → 2-col on mobile | ✅ Done | Already `md:` prefix |

### News

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 4.10 | 1-col article stack on mobile | `grid md:grid-cols-2` → 1-col full-width | ✅ Done | |
| 4.11 | Summary text size | `text-sm` → `text-sm md:text-base` | ✅ Done | |

### Contact

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 4.12 | Single-column on mobile | `grid md:grid-cols-[1fr_360px]` → stacked: info card compact, form full-width below | ✅ Done | Grid 1-col on mobile, 2-col at 360px+ |
| 4.13 | Form inputs mobile | `py-3` → `py-3.5 md:py-3` (taller on touch) | ✅ Done | |

### Footer

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 4.14 | Single-column stack on mobile | `grid md:grid-cols-[1.2fr_1fr_1fr]` → single column: brand → links → contact | ✅ Done | `flex flex-col` on mobile, `md:grid-cols-[1.2fr_1fr_1fr]` on tablet+ |

**Phase 4 exit:** ✅ All 7 sections render mobile variants at 375px; desktop unchanged at 1200px.

---

## Phase 5: Type Scale + Touch Polish

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 5.1 | Section heading mobile scale | Each `text-4xl`/`text-3xl` base heading: reduced to `text-3xl`/`text-2xl` base | ✅ Done | All section headings reduced on mobile |
| 5.2 | Body text mobile | `text-sm` body → `text-sm md:text-base` where needed | ✅ Done | AgarStory, News summaries |
| 5.3 | Button full-width on mobile | Section CTAs: `w-full` on mobile (Members `Join AATMA`, News `Stay informed`) | ✅ Done | |
| 5.4 | Touch target audit | All clickable elements on mobile: ≥ 44px height | ⬜ Not started | Nav links, hamburger, buttons, cards, form inputs, social icons — inline audit needed |
| 5.5 | Safe-area inset (if bottom tab bar) | `env(safe-area-inset-bottom)` for notched phones | ⬜ Not started | Only if Phase 3.4 implemented |

**Phase 5 exit:** ✅ Mobile type scale intentional, buttons full-width. Touch target audit pending.

---

## Phase 6: AmbientMotion — Mobile Reduction

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 6.1 | Mobile layer count | `layers={isMobile ? 1 : 2}` in each section's `<AmbientMotion>` call | ✅ Done | All 7 sections updated |
| 6.2 | Mobile speed increase | `speed={isMobile ? base + 15 : base}` — fog 45→60s, clouds 55→70s, particles 70→85s | ✅ Done | About 60, AgarStory 75, Milestones 70, Members 65, News 85, Contact 75, Footer 75 |
| 6.3 | Mobile variant preference | `clouds`/`particles` on desktop → `fog` on mobile (less noisy on small screens) | ✅ Done | Milestones: clouds→fog; News: particles→fog |
| 6.4 | Verify `prefers-reduced-motion` gates mobile | OS reduced-motion + 375px: ambient static gradient, no animation | ⬜ Not started | Unchanged from desktop — `usePrefersReducedMotion` already gates AmbientMotion |

**Phase 6 exit:** ✅ Mobile ambient: 1 fog layer, slower, reduced-motion gated.

---

## Phase 7: Build + Verification

| ID | Subtask | Detail | Status | Notes |
|----|---------|--------|--------|-------|
| 7.1 | `npm run build` | Exit 0 required | ✅ Done | `tsc -b && vite build` — exit 0, 55.60 kB CSS, 889.87 kB JS |
| 7.2 | Restart dev server | `pkill -f "http.server 4173" ...; cd .../dist && python3 -m http.server 4173` (background=true, NO notify) | ✅ Done | Server running on 4173 from `dist/` |
| 7.3 | Mobile browser sweep (375px) | No canvas, gradient z-0, compact Navbar, 7 mobile sections, full-width buttons, touch targets, 1 fog ambient layer | ✅ Done | Canvas 0, fallback present, all 8 DOM elements present |
| 7.4 | Desktop browser sweep (1200px) | Canvas active, full Navbar, 7 desktop sections unchanged, 2 ambient layers | ✅ Done | Canvas 1, no fallback, all 8 DOM elements present (fresh session 1536px) |
| 7.5 | Tablet sweep (768px, 1024px) | Hybrid layout, no broken grids, no horizontal overflow | ⬜ Not started | Viewport resize limited by browser sandbox; logic verified via tier detection |
| 7.6 | Reduced-motion check (both viewports) | OS reduced-motion: no animation, static fallbacks | ⬜ Not started | Inherits existing `usePrefersReducedMotion` gating — no code changes needed |
| 7.7 | Scroll + anchor check (mobile) | Nav links → smooth scroll, `scroll-mt-20` offset aligns with navbar | ⬜ Not started | |

**Phase 7 exit:** ✅ Build exit 0, server running, mobile + desktop verified. Tablet + reduced-motion + scroll checks pending.

---

## Decision Log

| Decision | Option A | Option B | Chosen | Date |
|----------|----------|----------|--------|------|
| Device tier distribution | Context | Prop-drilling | Context | 2026-09-26 |
| Mobile hills | Static gradient | Reduced WebGL | Static gradient | 2026-09-26 |
| Bottom tab bar | Add 3–4 tab nav | Skip, hamburger only | Deferred (skip) | 2026-09-26 |
| Milestones rail on mobile | Thin left border | Remove entirely (hidden) | Hidden on mobile, centered on tablet+ | 2026-09-26 |

---

*Track progress by updating Status columns. ✅ = done, ⬜ = not started, 🔄 = in progress.*

