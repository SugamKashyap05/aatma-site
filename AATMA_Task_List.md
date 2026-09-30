# AATMA Demo Site — Task List

## Phase 1: Foundation
- [x] Project scaffold (React 19 + Vite 6 + Tailwind CSS v4 + TypeScript)
- [x] Design token system (`@theme` block: green-deep, green-mid, green-light, gold, cream, charcoal)
- [x] Font setup (Playfair Display, Inter, Noto Sans Assamese via Google Fonts)
- [x] Global CSS: Tailwind v4 `@import`, `@theme` tokens, base resets
- [x] `cn()` utility (clsx + tailwind-merge)
- [x] Custom scrollbar styling (green-gold themed)
- [x] `useInView` hook (IntersectionObserver, threshold-based)
- [x] `usePrefersReducedMotion` hook (matchMedia, SSR-safe)

## Phase 2: Layout & Navigation
- [x] App shell: BrowserRouter, relative flex-col, min-h-screen, overflow-x-hidden
- [x] Navbar: fixed, transparent→solid on scroll, useLocation() for hash active state
- [x] Mobile menu: hamburger toggle, overlay with backdrop blur
- [x] NavLink active state: gold highlight + underline for current section
- [x] Smooth scroll via CSS `scroll-behavior: smooth` + scroll-mt-20 offsets

## Phase 3: Hero
- [x] ParallaxHero: 17-layer parallax (mountains + fog) via mouse/touch tracking
- [x] Hero layers: 21st.dev CDN images (mountains, fog strips)
- [x] Hero text: AATMA name, tagline, two CTAs (Discover AATMA, Get in Touch)
- [x] Parallax mouse move: perspective translateZ + rotateY + translateX/Y per layer
- [x] Hero parallax respects prefers-reduced-motion (no transform applied)

## Phase 4: Content Sections
- [x] **About** (`/src/features/about/About.tsx`): bilingual (EN/AS), 4 stat cards, seal SVG
- [x] **AgarStory** (`/src/features/agarStory/AgarStory.tsx`): 7 agarwood topic cards, emoji icons
- [x] **Milestones** (`/src/features/milestones/Milestones.tsx`): 2-column timeline, year pills, vertical rail
- [x] **Members** (`/src/features/members/Members.tsx`): 3 value-chain cards, stat strip, join CTA
- [x] **News** (`/src/features/news/News.tsx`): 4 article cards, image placeholders, tag badges
- [x] **Contact** (`/src/features/contact/Contact.tsx`): info card + working form (name/email/message)
- [x] **Footer** (`/src/features/footer/Footer.tsx`): brand block, quick links, contact info, social SVG, copyright

## Phase 5: Visual Polish
- [x] Section-specific radial-gradient overlays (gold-tinted, per-section positioning)
- [x] Card hover effects: border gold, shadow gold, translate-y
- [x] Button hover: translate-y micro-motion, shadow lift
- [x] Transition timing: duration-300/500/700, ease-out, delay-150 for staggered reveals
- [x] Backdrop blur on navbar (md+), stat cards, info cards
- [x] Seal SVG: gold circle + star pattern + "AATMA Est. 1976 · Hojai" label

## Phase 6: GLSL Rolling Hills (WebGL)
- [x] `glsl-hills.tsx`: Three.js + GLSL vertex shader rolling hills component
- [x] Shader: 3D Perlin noise (cnoise), 256×256 plane, 3 noise octaves, sin1 shaping
- [x] Fragment shader: distance-based opacity fade, color uniform (hex→vec3)
- [x] Camera: PerspectiveCamera at (0, 16, cameraZ), looking at (0, 28, 0)
- [x] Props: color (default #1a3c2a), speed (default 0.5), cameraZ (default 125), planeSize (default 256)
- [x] Integration in App.tsx: rendered behind all post-hero sections (z-0), content at z-10
- [x] prefers-reduced-motion: static CSS radial-gradient fallback instead of WebGL canvas
- [x] Canvas size: fills viewport (window.innerWidth/Height), DPR capped at 2
- [x] Cleanup: RAF cancel, renderer/geometry/material dispose, event listener remove
- [x] Verified: canvas paints visible green-tinted hills (WebGL readPixels confirms non-zero RGBA)

## Phase 7: Ambient Motion (CSS-only)
- [x] `AmbientMotion.tsx`: fog/clouds/particles variants, 1-3 layers, dark/light/green themes
- [x] Fog variant: blurred rounded-full divs, horizontal drift + bob (float-fog keyframes)
- [x] Clouds variant: smaller blurred puffs, slower drift with vertical bob (float-cloud keyframes)
- [x] Particles variant: 8 tiny specks per layer, upward drift (float-particle keyframes)
- [x] Default speed: 45s/cycle (fog), 55s (clouds), 70s (particles) — very slow, serene
- [x] Reduced-motion: single static gradient blob fallback (no animation)
- [x] All 6 sections + footer have AmbientMotion:
  - [x] About: fog, green theme, 2 layers
  - [x] AgarStory: fog, dark theme, 2 layers, speed 60
  - [x] Milestones: clouds, light theme, 2 layers, speed 55
  - [x] Members: fog, green theme, 2 layers, speed 50
  - [x] News: particles, light theme, 1 layer, speed 70
  - [x] Contact: fog, dark theme, 2 layers, speed 65
  - [x] Footer: fog, dark theme, 2 layers, speed 60

## Phase 8: prefers-reduced-motion (Site-wide)
- [x] `usePrefersReducedMotion` hook: matchMedia("(prefers-reduced-motion: reduce)")
- [x] GLSLHills: skips WebGL init when reduced, renders CSS gradient fallback
- [x] AmbientMotion: renders static gradient blob when reduced, inline animationDuration=0s
- [x] ParallaxHero: skips mousemove listener and transform updates when reduced
- [x] Global CSS `@media (prefers-reduced-motion: reduce)`:
  - [x] Neutralizes all animation-duration/iteration-count/transition-duration
  - [x] `.hero-layer { transform: none !important }`
  - [x] `.style-float, .style-cloud, [style*="animationDuration: 0s"] { animation: none !important }`
  - [x] `.ambient-reduced-fallback { opacity: 1 !important }`
- [x] CSS delivered via standalone `/reduced-motion.css` (public/) to survive Tailwind v4 build stripping
- [x] Verified: `/reduced-motion.css` served, contains media query + all override rules (661 bytes)

## Phase 9: Build & Deployment
- [x] `npm run build` exits 0 (tsc -b + vite build)
- [x] Output: dist/index.html (1.19 kB), dist/assets/index-*.css (54 kB), dist/assets/index-*.js (888 kB)
- [x] Dev server: Python http.server 4173 serving `dist/` (NOT project root)
- [x] White strip after hero: fixed (overflow-x-hidden on root container)
- [x] Horizontal scrollbar: fixed (overflow-x-hidden, relative positioning)
- [x] Final browser sweep: all 6 sections + footer render, canvas paints, AmbientMotion present

## Phase 10: Mobile Optimization
- [x] `useDeviceTier` hook (`src/hooks/useDeviceTier.ts`): SSR-safe `DeviceTier` type (`mobile` | `tablet` | `desktop`), `window.innerWidth` read on mount + resize listener
- [x] `DeviceContext` (`src/context/DeviceContext.tsx`): `DeviceProvider` + `useDevice()` hook, context-based tier distribution to all 8 consumers
- [x] `App.tsx` refactored: `PostHeroShell` component extracted, wrapped in `DeviceProvider`, passes `deviceTier` to `GLSLHills`, `Navbar`, all 6 sections + `Footer`
- [x] `GLSLHills` mobile fallback: new `deviceTier` prop; when `"mobile"`, skips Three.js WebGL init and renders static `radial-gradient(ellipse at 50% 100%, #1a3c2a 0%, transparent 70%)` at 0.35 opacity (same approach as `prefers-reduced-motion`)
- [x] `Navbar` mobile variant: accepts `deviceTier`; inline links hidden on mobile (`isMobile && "hidden"`), logo + hamburger shown; desktop unchanged; existing mobile menu overlay reused
- [x] All 7 sections receive `deviceTier` prop and consume it for mobile-specific layout:
  - [x] **About**: heading `text-3xl md:text-4xl lg:text-5xl` (was 4xl/5xl/6xl), seal `w-20 h-20 md:w-24 lg:w-28` (was w-24 md:w-28), stat strip already 2-col on mobile
  - [x] **AgarStory**: heading `text-3xl md:text-4xl lg:text-5xl`, card body `text-sm md:text-base`, card padding `p-4 md:p-6`
  - [x] **Milestones**: `flex-col` single-column on mobile (was `md:grid-cols-2`), year pill above card, vertical rail hidden on mobile, centered on tablet+
  - [x] **Members**: heading `text-2xl md:text-4xl lg:text-5xl`, `Join AATMA` CTA full-width on mobile
  - [x] **News**: heading `text-2xl md:text-4xl lg:text-5xl`, summary `text-sm md:text-base`, `Stay informed` CTA full-width on mobile
  - [x] **Contact**: `grid gap-6 md:grid-cols-[1fr_360px]` (stacked on mobile), form inputs `py-3.5 md:py-3`, heading `text-2xl md:text-4xl lg:text-5xl`
  - [x] **Footer**: `flex flex-col md:grid-cols-[1.2fr_1fr_1fr]` (single column on mobile)
- [x] Section CTAs full-width on mobile: Members `Join AATMA`, News `Stay informed`
- [x] AmbientMotion mobile reduction (all 7 sections): 1 layer on mobile (2 on desktop), slower speed (+15s), `clouds`/`particles` → `fog` on mobile (Milestones, News)
- [x] `npm run build` exit 0 after mobile changes: 55.60 kB CSS, 889.87 kB JS
- [x] Dev server restarted from `dist/`, mobile + desktop verified:
  - [x] Mobile (375px): canvas count 0, gradient fallback present (`radial-gradient(at 50% 100%, rgb(26,60,42)...)` opacity 0.35), all 8 DOM elements present
  - [x] Desktop (1536px): canvas count 1 (WebGL active), no fallback, all 8 DOM elements present
- [x] Decision: bottom tab bar deferred (hamburger-only mobile nav sufficient for Phase 10)
- [x] Decision: milestones vertical rail hidden on mobile (not thin border)
