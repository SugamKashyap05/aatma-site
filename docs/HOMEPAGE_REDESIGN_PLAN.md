# Homepage Redesign — Implementation Plan

> **Superseded for the current client-approved redesign.** This 2026-10-16 proposal was based on an earlier brief/demo and includes content corrections/anonymization and section decisions that must not be carried forward automatically. The authoritative current plan is `docs/FINAL_BRIEF_HOMEPAGE_REDESIGN_PLAN.md`, based on the client’s final PDF and the requirement that no brief content be omitted. Retained below as historical context only; do not implement conflicting directions from this document.

**Date:** 2026-10-16  
**Source brief:** `A brief note on Agar Trade (2).docx` (34 KB, 58 sections)  
**Design demo:** `cache/scratch/aatma-homepage-demo.html`  
**Book reader demo:** `cache/scratch/book-reader-demo.html`

---

## 1. Current State Review

### What exists
| Component | Lines | Current content |
|-----------|-------|-----------------|
| `HomePage.tsx` | 60 | 8 sections: Hero, About, AgarStory, Milestones, Members, Press, LatestNews, Contact |
| `ParallaxHero.tsx` | 299 | Existing hero with parallax background |
| `About.tsx` | 172 | Brief intro text |
| `AgarStory.tsx` | 127 | Agarwood story narrative |
| `Milestones.tsx` | 81 | Timeline of key events |
| `Contact.tsx` | 262 | Contact form |
| `PressSection.tsx` | — | Press coverage teaser |

### What the demo shows
The demo (`aatma-homepage-demo.html`) demonstrates the full redesign:
- 12 sections with new brief content
- Assam visual identity (Gamosa borders, Assamese script, Sanchi Paat manuscript)
- Members section removed
- Exact brief wording with minor grammatical corrections
- AATMA member names anonymized

### Design system search results
- **Pattern:** Hero → Problem → Solution → Social Proof → CTA
- **Style:** Accessible & Ethical (high contrast, keyboard nav, reduced motion)
- **Accessibility:** Skip links, focus rings, 44px touch targets, `prefers-reduced-motion`

---

## 2. Design System Updates

### 2.1 New CSS variables (add to `@theme` block)

```css
/* Assam visual identity */
--color-gamosa-red: #b83a2e;
--color-terracotta: #c67b5c;
--color-mustard: #d4a03c;
--font-assamese: 'Noto Sans Bengali', sans-serif;
```

### 2.2 New utility classes

```css
/* Gamosa border pattern */
.gamosa-border { /* repeating red/gold/cream stripes */ }

/* Assamese script text */
.assamese-script {
  font-family: var(--font-assamese);
  color: var(--gold);
  opacity: 0.7;
}

/* Hero Assamese text */
.hero-assamese {
  font-family: var(--font-assamese);
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  color: var(--gold-light);
  opacity: 0.85;
}
```

### 2.3 Google Fonts import

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;600&display=swap');
```

---

## 3. Section-by-Section Plan

### 3.1 Section inventory

| # | Section | Source in brief | Action | Est. lines |
|---|---------|----------------|--------|------------|
| 1 | Hero | — | Update with Assamese script + badge | 20 |
| 2 | About | §1 A BRIEF HISTORY OF AGAR | Rewrite with exact brief wording | 40 |
| 3 | Sanchi Paat | §1 (sanchi paat paragraph) | **New section** | 50 |
| 4 | Story / Trade | §2 ABOUT THE TRADE | Rewrite + timeline | 60 |
| 5 | Formation | §3 FORMATION OF AATMA | Rewrite, anonymize names | 50 |
| 6 | Critical Era | §6 CRITICAL ERA | Expand from ~5 to ~15 paragraphs | 80 |
| 7 | Achievement | §7 Achievement | **New section** | 40 |
| 8 | NDF Findings | §8 NON-DETRIMENT | **New section** | 50 |
| 9 | Rules 2022 | §9 NOTIFICATION | **New section** | 60 |
| 10 | Challenges | §10 ONGOING CHALLENGES | **New section** | 50 |
| 11 | Press | — | Keep existing, update styling | 20 |
| 12 | CTA | — | Keep existing | 30 |
| — | ~~Members~~ | — | **Removed** | 0 |

**Total new/updated components:** ~550 lines across 12 sections.

### 3.2 Content mapping

| Brief section | Content | Homepage section |
|---------------|---------|-----------------|
| §1 A BRIEF HISTORY OF AGAR | Agar tree, Sanchi paat, Aquilaria, perfume | About + Sanchi Paat |
| §2 ABOUT THE TRADE | 1905 Sylhet, following years Hojai, late 1960s NEFA/Bhutan, 1982 standstill, Far East import era (no year stated) | Story / Trade |
| §3 FORMATION OF AATMA | 1976 founding, Reg. 664 of 1978-79, 2000 reorg | Formation |
| §4 NATIONAL SEMINAR | Nov 2000, Dr. P.K. Hajra, plantation survey | Story / Trade |
| §5 NEW DIMENSION | Far East discovery, LPC, re-export | Story / Trade |
| §6 CRITICAL ERA | 2000 Rules, 2005 DFO denial, 2007 Writ Petition, 2010 harassment, 2016 Minister meeting | Critical Era |
| §7 Achievement | July 2021 CM meeting, 2022 Rules, Feb 2023 Stakeholders Conference | Achievement |
| §8 NDF Findings | BSI study, 1143.7 Lakh trees, 5 districts, CITES App. II | NDF Findings |
| §9 Rules 2022 | Registration, location, CITES, Micro-Small-Medium-Large | Rules 2022 |
| §10 Challenges | License fees, export process, single-window, Aug 2026 workshop | Challenges |

### 3.3 Name anonymization map

| Brief says | Homepage says |
|------------|---------------|
| "(L) [REDACTED: AATMA member], (L) [REDACTED: AATMA member] and (L) [REDACTED: AATMA member]" | "AATMA's founding members" |
| "[REDACTED: AATMA member] as President" | "AATMA's President at the time" |
| "(L) [REDACTED: AATMA member] as General Secretary" | "AATMA's General Secretary at the time" |
| "[REDACTED: AATMA member] led the delegation" | "An AATMA delegation led by its office bearers" |
| "S. Doley, PCCF" | Keep (government official) |
| "Smt. Pramila Rani Brahma" | Keep (government official) |
| "Dr. Himanta Biswa Sharma" | Keep (government official) |
| "Mr. Sirajuddin Ajmal, MLA" | Keep (government official) |
| "Dr. P.K. Hajra" | Keep (public record) |
| "Srimanta Sankar Dev, Madhav Deb, Damudar Deb" | Keep (historical/religious figures) |

---

## 4. Component Changes

### 4.1 Files to create

| File | Purpose | Est. lines |
|------|---------|------------|
| `src/features/home/SanchiPaatSection.tsx` | Sanchi Paat manuscript section | 50 |
| `src/features/home/CriticalEraSection.tsx` | 22 years of struggle (expanded) | 80 |
| `src/features/home/AchievementSection.tsx` | 2021 CM meeting + 2022 Rules | 40 |
| `src/features/home/NdfFindingsSection.tsx` | BSI study + tree population data | 50 |
| `src/features/home/RulesSection.tsx` | WBI Rules 2022 details | 60 |
| `src/features/home/ChallengesSection.tsx` | Ongoing challenges + way forward | 50 |
| `src/components/ui/GamosaBorder.tsx` | Gamosa pattern divider | 15 |
| `src/components/ui/AssameseScript.tsx` | Reusable Assamese text component | 10 |

### 4.2 Files to update

| File | Change |
|------|--------|
| `src/index.css` | Add Assam CSS variables + utility classes |
| `src/features/home/HomePage.tsx` | New section order, remove Members |
| `src/features/hero/ParallaxHero.tsx` | Add Assamese script + badge |
| `src/features/about/About.tsx` | Rewrite with exact brief wording |
| `src/features/agarStory/AgarStory.tsx` | Rewrite + timeline from §2, §4, §5 |
| `src/features/milestones/Milestones.tsx` | Update to reflect new brief dates |
| `src/features/contact/Contact.tsx` | Keep, minor styling update |
| `src/components/ui/Navbar.tsx` | Add Sanchi Paat link, remove Members |
| `src/features/footer/Footer.tsx` | Update links |

### 4.3 Files to delete

| File | Reason |
|------|--------|
| `src/features/members/Members.tsx` | Client wants names removed |

---

## 5. Asset Usage

### Existing images to integrate

| Image | Section | How |
|-------|---------|-----|
| `public/history/hero-banner.jpg` | Hero | Parallax background |
| `public/history/ancient-roots.png` | About | Side image |
| `public/history/sanchi-paat-manuscript.jpg` | Sanchi Paat | Manuscript illustration |
| `public/history/trade-journey-hojai.jpg` | Story / Trade | Timeline header |
| `public/history/founders-1976.jpg` | Formation | Founding image |
| `public/history/critical-era.png` | Critical Era | Section header |
| `public/history/critical-era-hardship.jpg` | Critical Era | Card image |
| `public/history/far-east-import.jpg` | Story / Trade | Far East imports |
| `public/history/victory-2023.jpg` | Achievement | Victory image |
| `public/history/seminar-2000.jpg` | Story / Trade | Seminar image |
| `public/history/plantation-present-day.jpg` | NDF Findings | Plantation image |
| `public/research/conservation-habitat.jpg` | NDF Findings | Habitat image |
| `public/history/trade-journey-map.svg` | Story / Trade | Map illustration |

### New assets needed

| Asset | Purpose | Source |
|-------|---------|--------|
| Gamosa pattern SVG | Section divider | Create as inline SVG |
| Sanchi Paat decorative border | Manuscript frame | Create as CSS/SVG |
| Japi hat silhouette | Hero decorative | AI generate or SVG |
| Xorai silhouette | Formation section | AI generate or SVG |

---

## 6. HomePage.tsx Structure (target)

```tsx
export function HomePage() {
  const { tier } = useDevice();
  return (
    <>
      <ParallaxHero />
      <div className="relative z-10">
        <Navbar />
        <Reveal><About deviceTier={tier} /></Reveal>
        <GamosaBorder />
        <Reveal><SanchiPaatSection /></Reveal>
        <GamosaBorder />
        <Reveal><AgarStory deviceTier={tier} /></Reveal>
        <Reveal><FormationSection /></Reveal>
        <Reveal><CriticalEraSection /></Reveal>
        <GamosaBorder />
        <Reveal><AchievementSection /></Reveal>
        <Reveal><NdfFindingsSection /></Reveal>
        <Reveal><RulesSection /></Reveal>
        <Reveal><ChallengesSection /></Reveal>
        <Reveal><PressSection deviceTier={tier} /></Reveal>
        <Reveal><LatestNewsTeaser /></Reveal>
        <Reveal><Contact deviceTier={tier} /></Reveal>
        <Footer deviceTier={tier} />
      </div>
    </>
  );
}
```

---

## 7. Phased Rollout

### Phase 1: Foundation (Day 1)
- [ ] Add CSS variables + utility classes to `index.css`
- [ ] Create `GamosaBorder` component
- [ ] Create `AssameseScript` component
- [ ] Update Google Fonts import
- [ ] Update `Navbar` + `Footer` links
- **Verify:** `npm run build` exits 0

### Phase 2: Hero + About (Day 1-2)
- [ ] Update `ParallaxHero` with Assamese script + badge
- [ ] Rewrite `About.tsx` with exact brief wording
- [ ] Create `SanchiPaatSection.tsx`
- **Verify:** Hero renders, About shows brief content, Sanchi Paat section appears

### Phase 3: Story + Formation (Day 2)
- [ ] Rewrite `AgarStory.tsx` with timeline (§2, §4, §5)
- [ ] Create `FormationSection.tsx` (§3, anonymized)
- **Verify:** Timeline renders, Formation shows 1976 + Reg. 664

### Phase 4: Critical Era + Achievement (Day 2-3)
- [ ] Create `CriticalEraSection.tsx` (§6, expanded)
- [ ] Create `AchievementSection.tsx` (§7)
- **Verify:** 6 cards render, stats show (50+, 800+, 22, 2022)

### Phase 5: Data Sections (Day 3)
- [ ] Create `NdfFindingsSection.tsx` (§8)
- [ ] Create `RulesSection.tsx` (§9)
- [ ] Create `ChallengesSection.tsx` (§10)
- **Verify:** 1143.7 Lakh, 5 districts, 4 rule cards, 4 challenge items

### Phase 6: Integration + Cleanup (Day 3-4)
- [ ] Update `HomePage.tsx` with new section order
- [ ] Remove `Members` import + section
- [ ] Update `PressSection` styling
- [ ] Add Gamosa borders between sections
- **Verify:** Full page renders, no broken images, no console errors

### Phase 7: Regression + Deploy (Day 4)
- [ ] `npm run build` exits 0
- [ ] `npm run lint` exits 0
- [ ] Browser test: 375px + 1440px viewports
- [ ] All images load (naturalWidth > 0)
- [ ] No horizontal overflow
- [ ] Keyboard nav works (Tab, Escape, arrows)
- [ ] Push to master
- [ ] Verify live deploy

---

## 8. Verification Checklist

### Build & Type
- [ ] `npm run build` exits 0
- [ ] `npm run lint` exits 0
- [ ] No TypeScript errors

### Content
- [ ] All brief wording is exact (with only grammatical corrections)
- [ ] No AATMA member names appear
- [ ] Government officials + historical figures retained
- [ ] All 12 sections render in correct order

### Visual
- [ ] Gamosa borders appear between sections
- [ ] Assamese script renders in hero + formation
- [ ] Sanchi Paat manuscript section displays correctly
- [ ] All images load (no broken images)
- [ ] No horizontal overflow at any viewport

### Accessibility
- [ ] Skip link works
- [ ] Focus visible on all interactive elements
- [ ] Keyboard navigation works
- [ ] `prefers-reduced-motion` respected
- [ ] Contrast ratio ≥ 4.5:1

### Performance
- [ ] Lazy loading on images below fold
- [ ] No layout shift (CLS < 0.1)
- [ ] Build output < 500 KB gzipped

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Members section deletion breaks layout | Medium | Remove import + JSX, verify build |
| New sections exceed viewport height | Low | Use `min-height` not `fixed height` |
| Assamese font fails to load | Low | Fallback to `sans-serif` |
| Gamosa border pattern looks off | Low | Use subtle opacity, test at multiple widths |
| Existing images don't match new sections | Medium | Map images to closest section, generate new if needed |
| Brief content too long for section | Low | Use `line-clamp` + "Read more" expand |

---

## 10. Demo vs. Production

| Aspect | Demo (HTML) | Production (React) |
|--------|-------------|-------------------|
| Sections | 12 inline `<section>` | 12 React components |
| Styling | Inline `<style>` | Tailwind v4 + `@theme` block |
| Fonts | Google Fonts `<link>` | CSS `@import` |
| Images | Emoji placeholders | Real images from `public/` |
| Animations | CSS transitions | `Reveal` component |
| Responsive | Media queries | Tailwind breakpoints |
| Interactivity | `onclick` | React `onClick` + state |

---

## 11. Estimated Effort

| Phase | Effort | Lines |
|-------|--------|-------|
| Phase 1: Foundation | 2 hours | ~50 |
| Phase 2: Hero + About | 3 hours | ~110 |
| Phase 3: Story + Formation | 3 hours | ~110 |
| Phase 4: Critical Era + Achievement | 3 hours | ~120 |
| Phase 5: Data Sections | 3 hours | ~160 |
| Phase 6: Integration | 2 hours | ~40 |
| Phase 7: Regression + Deploy | 2 hours | ~20 |
| **Total** | **18 hours** | **~610** |

---

## 12. Decision Needed

Before implementation begins, confirm:

1. **Section order** — is the proposed 12-section order correct?
2. **Gamosa borders** — should they appear between every section or only major dividers?
3. **Name anonymization** — is the anonymization map acceptable?
4. **Image mapping** — are the existing images assigned to the right sections?
5. **Members section** — confirm permanent removal (not just hiding)
