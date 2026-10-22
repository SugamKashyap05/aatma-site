# Design System — AATMA

> Source of truth for **how the site looks and feels**.
> The tokens below are already implemented in `src/index.css` inside the
> Tailwind v4 `@theme` block. This document formalises them so agents stop
> inventing values. **If a value is not in this document, do not introduce it.**

---

## 1. Design Direction

**Style:** Editorial heritage — institutional, archival, restrained.

**Mood:** Authoritative and warm. A 50-year institution, not a startup. Deep
forest greens carry weight; gold accents signal heritage and value; cream
provides paper-like breathing room. Motion is atmospheric (fog, drifting
clouds), never playful.

**Design principles:**
1. **Weight over decoration** — hierarchy comes from scale and spacing, not from adding visual noise.
2. **Gold is an accent, never a surface** — it marks emphasis, borders, and focus; it is not a background fill.
3. **Dark-first** — the site sits on `green-deep`; text is light. This is the default, not a theme variant.
4. **Motion is optional** — every animation must be gated behind `prefers-reduced-motion`.
5. **Tokens over literals** — colors and fonts come from the `@theme` block, never from inline hex.

---

## 2. Brand

| Field | Value |
|---|---|
| Brand name | AATMA |
| Full name | All Assam Agar Traders & Agaroil Manufacturers' Association |
| Assamese name | সদৌ অসম আগৰ ব্যৱসায়ী আৰু আগৰতেল উৎপাদনকাৰী সংস্থা |
| Logo | `public/favicon.svg`; inline SVG seal used in `About.tsx` |
| Brand voice | Formal, factual, institutional. Third person. No marketing superlatives. |

**Voice rules:**
- State achievements as verifiable facts with dates ("In July 2019, the Assam Cabinet approved…"), not as claims ("we revolutionised…").
- Never invent statistics, partnerships, or quotations.
- Where a figure is illustrative rather than measured, label it explicitly.

---

## 3. Color Palette

All values are defined in `src/index.css` under `@theme`. Use the Tailwind
utility (e.g. `text-gold`, `bg-green-deep`), never the raw hex.

| Token | Hex | Utility | Role |
|---|---|---|---|
| `--color-green-deep` | `#1a3c2a` | `green-deep` | Primary surface / page background |
| `--color-green-mid` | `#2d5a3d` | `green-mid` | Raised surface, gradient mid-stop |
| `--color-green-light` | `#3d7a54` | `green-light` | Accent surface, gradient end-stop |
| `--color-gold` | `#c9a84c` | `gold` | Ornament, borders, decorative marks; avoid for small text on dark surfaces |
| `--color-gold-light` | `#e0c878` | `gold-light` | Text accents and focus indicators on dark green/glass |
| `--color-gold-deep` | `#6b4516` | `gold-deep` | Gold text on cream/light surfaces |
| `--color-gold-deep-light` | `#7a5220` | `gold-deep-light` | Hover text on cream/light surfaces |
| `--color-cream` | `#f5f0e8` | `cream` | Light text on dark, paper surfaces |
| `--color-cream-dark` | `#e8e0d0` | `cream-dark` | Secondary light surface |
| `--color-charcoal` | `#1a1a1a` | `charcoal` | Deepest neutral |
| `--color-text` | `#2a2a2a` | `text` | Body text on light surfaces |
| `--color-text-mute` | `#5a5a5a` | `text-mute` | Secondary text on light surfaces |
| `--color-border` | `#d4c9b0` | `border` | Borders on light surfaces |
| `--color-glass-surface` | cream at 14% | `glass-surface` | Standard translucent surface over evergreen |
| `--color-glass-surface-hover` | cream at 16% | `glass-surface-hover` | Hover surface; maximum fill while using gold-light text |
| `--color-glass-border` | cream at 32% | `glass-border` | Visible glass boundary |
| `--color-glass-nav` | `rgb(26 60 42 / 90%)` | `glass-nav` | Fixed navigation surface |
| `--color-glass-card` | `rgb(26 60 42 / 88%)` | `glass-card` | Reading card over variable, bright video; use light foreground tokens |
| `--color-agar-title` | `#F5F1E4` | `agar-title` | Warm off-white titles on dark agar-story cards |
| `--color-agar-body` | `#DCE3D6` | `agar-body` | Soft sage-white body text on dark agar-story cards |
| `--color-agar-label` | `#F0D77A` | `agar-label` | Bright gold date / label on dark agar-story cards |
| `--color-agar-icon` | `#E8C85A` | `agar-icon` | Gold icon accent on dark agar-story cards |

**No success / warning / error tokens are defined.** The site has no forms with
server responses. If a status color is ever needed, add a token here first.

### Glass surfaces

The site uses layered glass only over dark evergreen backgrounds. The recipe is
centralized in `src/index.css`; do not recreate it with one-off white alpha
classes. Standard and subtle surfaces retain an opaque cream fallback through
their borders and are not used for long-form reading.

| Variant | Classes/tokens | Use |
|---|---|---|
| **Standard** | `glass-surface` (`--color-glass-surface`, 14% cream fill; 32% cream border; 12px blur) | Cards, dropdowns, and feature panels over dark green |
| **Hover** | `--color-glass-surface-hover` (16% cream fill); `--color-glass-border-strong` (46%) | Interactive emphasis; keep gold-light text at or above 4.5:1 |
| **Subtle** | `glass-surface-subtle` (8% cream fill; 32% border; 10px blur) | Decorative or secondary dark panels |
| **Navigation** | `glass-nav` (90% green-deep; 16px blur) | Fixed site navigation |
| **Paper** | opaque `cream` / `cream-dark`, dark text | Long copy, tables, publications, and book-reading surfaces |

The global `.card-hover` uses the standard glass fill and moves by no more than
4px on hover. Gold-light is the default text/focus accent over dark glass;
`gold` is reserved for ornament/borders. On cream surfaces use `gold-deep` for
text, never `gold` or `gold-light`. The core palette maintains cream text at
10.7:1 and gold-light at 7.4:1 on the evergreen base; translucent overlays must
still be checked against the actual background image and composited surface.

---

## 4. Typography

Fonts are loaded via Google Fonts in `index.html` and declared in `@theme`.

| Token | Family | Utility | Role |
|---|---|---|---|
| `--font-display` | Playfair Display, Georgia, serif | `font-display` | Headings, page titles |
| `--font-sans` | Inter, system-ui, sans-serif | `font-sans` | UI, body, navigation |
| `--font-assamese` | Noto Sans Assamese, serif | `font-assamese` | Assamese script content |
| `--font-reading` | Crimson Pro, Georgia, serif | `font-reading` | Long-form book reading |
| `--font-display-alt` | Cormorant Garamond, Georgia, serif | `font-display-alt` | Secondary display accents |

### Scale

| Element | Classes | Notes |
|---|---|---|
| Page H1 (via `PageLayout`) | `font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-4` | One per route |
| Section H2 | `font-display font-bold text-2xl md:text-4xl` | Section headings |
| Subsection H3 | `font-display font-bold text-white text-base` | Card and block headings |
| Body | `text-white/80 text-base md:text-lg` | Default paragraph on dark |
| Small / meta | `text-sm`, `text-xs` | Labels, captions, badges |

**Hierarchy rule:** section headings must not all share one scale. Vary between
H2 and H3 so the page reads as a document, not a list of equal blocks.

---

## 5. Spacing

**Base unit:** 4 px (Tailwind default scale).

**Scale in use:** `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96` px
→ `p-1 / p-2 / p-3 / p-4 / p-6 / p-8 / p-12 / p-16 / p-24`

**Section rhythm:**
- Section vertical padding: `py-16 md:py-24`
- Container: `max-w-7xl mx-auto px-6`
- Card internal padding: `p-6 md:p-8`
- Grid gaps: `gap-4` (tight), `gap-6` (default), `gap-8` (loose)

---

## 6. Border Radius

| Size | Class | Use |
|---|---|---|
| Small | `rounded-sm` | Badges, pills, tags |
| Medium | `rounded-lg` | Buttons, inputs |
| Large | `rounded-xl` | Cards, panels |
| Pill | `rounded-full` | Avatars, icon buttons |

---

## 7. Shadows

The site is dark-first; shadows are used sparingly and always gold-tinted on
hover rather than neutral.

| Size | Rule |
|---|---|
| Small | `shadow-sm` — resting cards |
| Medium | `shadow-lg` — raised cards |
| Hover | Gold-tinted glow on interactive cards: `hover:shadow-glow-gold` (token-backed — see `@theme`). Never hard-code `rgba(201,168,76,…)`. |

---

## 8. Buttons

| Variant | Rule |
|---|---|
| Primary | Gold background (`bg-gold`), dark text, `rounded-lg`, `hover:bg-gold-light`, `hover:-translate-y-0.5` |
| Secondary | Transparent with gold border (`border border-gold/40 text-gold`), `hover:bg-gold/10` |
| Danger | **Not used** — no destructive actions exist in the product |
| Disabled | `opacity-50 cursor-not-allowed`, no hover transform |
| Loading | **Not used** — no async actions exist in the product |

**Motion:** interactive elements lift on hover (`-translate-y-0.5`) and compress
on press (`active:scale-95`). All such motion must be inside a
`prefers-reduced-motion` guard.

---

## 9. Inputs

Only one form exists (`Contact.tsx`).

| State | Rule |
|---|---|
| Default | `bg-white/[0.08] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/40` |
| Focus | `focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40` |
| Error | **Not implemented** — the form has no validation state |
| Disabled | **Not implemented** |
| Placeholder | `text-white/40` |

**Open question:** the contact form has no visible error or success state. See `PRD.md` §11.

---

## 10. Cards

Standard card recipe:

The dark video background makes dark-green text low contrast. Homepage About, Formation, Sanchi Paat, Achievement, and agar-story sections, and the interactive history timeline use the stronger `glass-card` dark evergreen surface with `agar-title` for headings, `agar-body` for paragraphs, `agar-label` for labels and dates, and `agar-icon` for icons and timeline markers so variable bright video patches do not wash out text.

```
bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-xl p-6 md:p-8
transition-all duration-300 hover:border-gold/40 hover:-translate-y-1
```

Implemented as `BentoCard` (`src/components/ui/bento-card.tsx`) and
`BentoGrid` (`src/components/ui/bento-grid.tsx`). **Reuse these components**
rather than rebuilding the recipe.

---

## 11. Navigation

| Surface | Rule |
|---|---|
| Header | Fixed top, transparent over hero → `bg-green-deep/90 backdrop-blur` once scrolled. Two zones: 6 home-section links (left) + 5 page routes (right) + logo. Home-section links are hidden on non-home routes. |
| Section nav | Sticky scroll-spy sidebar on `/policy` (`PolicyNav`) and `/research` (`ResearchNav`) |
| Mobile navigation | Hamburger → slide-out drawer at `z-[60]` (above navbar `z-50`), `justify-start pt-20`, `overflow-y-auto` |
| Zone labels | `text-white/60` minimum — `text-white/40` fails WCAG AA on `green-deep` |

**Contrast requirement:** any text on `green-deep` must reach 4.5:1. Verified
values: `text-white/60` ≈ 5.9:1 ✅ · `text-white/40` ≈ 3.3:1 ❌

---

## 12. States

| State | Rule |
|---|---|
| Loading | Route-level `Suspense` fallback: `<div className="min-h-screen bg-green-deep" />` |
| Empty | Render the section heading with a short explanatory line. Never render a bare blank container. |
| Error | **Not implemented** — no runtime data fetching exists |
| Success | **Not implemented** |
| Disabled | `opacity-50`, no pointer events |

---

## 13. Icons

| Field | Value |
|---|---|
| Library | `lucide-react` |
| Default size | `w-6 h-6` for cards; `size={14}` inside badges |
| Stroke width | `strokeWidth={1.5}` for card icons; default elsewhere |
| Style | Outline |

**Rule:** do not mix icon systems. Emoji used as icons must be replaced with
Lucide equivalents — the codebase previously mixed both.

Decorative SVG must carry `aria-hidden="true"` and `focusable="false"`.

---

## 14. Responsive Design

**Device tiers** come from `DeviceContext` (`mobile` / `tablet` / `desktop`),
not from ad-hoc media queries. Use `useDevice()`.

| Tier | Width | Behaviour |
|---|---|---|
| Mobile | < 768 px | Drawer nav, no WebGL hills (gradient fallback), single-column grids, 1 ambient layer |
| Tablet | 768–1023 px | Drawer or compact nav, reduced motion layers |
| Desktop | ≥ 1024 px | Full nav, WebGL hills, multi-column grids |

**Breakpoints:** Tailwind defaults — `sm:640` `md:768` `lg:1024` `xl:1280` `2xl:1536`

**Minimum supported width:** 320 px. Verify no horizontal overflow at 320 px.

---

## 15. Accessibility

Required on every change:

- [ ] Use semantic HTML (`nav`, `main`, `section`, `h1`–`h3` in order).
- [ ] Maintain sufficient contrast — 4.5:1 for body text, 3:1 for large text and UI borders.
- [ ] Support keyboard navigation — every interactive element reachable by Tab.
- [ ] Provide visible focus states — `focus-visible:outline-2 focus-visible:outline-gold`.
- [ ] Provide accessible labels — `aria-label` on icon-only controls; `alt` on every `<img>`.
- [ ] Do not rely on colour alone to convey meaning.
- [ ] Gate all motion behind `prefers-reduced-motion`.
- [ ] Touch targets at least 44×44 px.
- [ ] Decorative SVG: `aria-hidden="true"` and `focusable="false"`.
- [ ] Exactly one `<h1>` per route.

---

## 16. Known Token Violations

These exist today and should be fixed when the file is next touched. They are
**not** precedent — do not add more.

| File | Violation |
|---|---|
| `src/components/ui/InteractiveTimeline.tsx` | 6 hardcoded era colours (`#8B7355`, `#C9A84C`, `#D4A843`, `#B8944A`, `#A67C3D`, `#C9A84C`) |
| `src/components/ui/glsl-hills.tsx` | Inline `"#1a3c2a"` default for the hills colour |
| `src/features/research/MicrobialDataViz.tsx` | Chart series colours as literals |

**Total: 29 hardcoded hex values across `src/**/*.tsx`.** New code must use
tokens. When fixing these, add the missing values to `@theme` first.

---

## 17. Homepage overview-to-detail story sections

**Status:** About pilot implemented locally and awaiting user review; remaining story-bearing sections are pending. See `docs/ABOUT_READ_MORE_IMPLEMENTATION_PLAN.md` for the About interaction contract and `docs/FINAL_BRIEF_HOMEPAGE_REDESIGN_PLAN.md` for whole-site source mapping.

For homepage About, the sequence is an explicit variation on the general overview-to-detail pattern:

1. Keep the association intro, seal, and current bilingual toggle in the collapsed section.
2. A semantic **Read more** disclosure expands a connected, vertical, ordered sequence in place—no route change.
3. Eleven card buttons represent the opening editorial and ten sections in final-PDF order. Their short labels and paragraph counts are interface metadata; full copy remains in `src/data/about-spine.ts`.
4. Each card opens the complete source text in the modal. Previous/Next controls traverse adjacent items without closing the modal; end controls are disabled.
5. `/about` remains available as the full-reader route for existing bookmarks, while homepage About itself exposes the complete brief via the sequence/dialogs.

Other homepage sections continue to follow the planned shared contract: sourced heading/orientation → content-appropriate topic presentation → accessible details or existing destination. Do not force every subject into About’s vertical sequence. Reuse existing dialog behavior and design tokens; do not add a dependency or duplicate modal primitive.

**Content rules:** all final-PDF paragraphs remain in source order and verbatim in the full reader and About dialogs. Do not duplicate the body text in story-card data; derive it from `ABOUT_EDITORIAL` and `ABOUT_SPINE`. Keep card summaries free of private/member identities and do not expand identity publication beyond existing full-reader copy. Other section red-addition mapping remains pending until individually verified.

**Dialog requirements:** keyboard-operable trigger; meaningful accessible name; focus moved into dialog, contained while open, and restored on close; Escape, visible close button, and supported backdrop close; body scrolling restored; long detail scrolls within viewport; close and navigation controls remain visible; support reduced motion and 44×44 px touch targets. Use the same contrast and visible-focus requirements as §15.

**Responsive behavior:** one-column connected sequence at all breakpoints, bounded dialog at mobile/tablet/desktop, no horizontal overflow at 320 px, and no loss of source content. Verify at 320, 375/390, 768/900, 1024, and 1366/1536 px.
