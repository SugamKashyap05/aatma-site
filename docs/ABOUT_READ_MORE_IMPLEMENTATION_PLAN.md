# About “Read More” In-Place Story Plan

> **For Hermes:** Implement this plan task-by-task with test-first changes, and stop for user review at the About-only gate.

**Goal:** Keep visitors on the homepage About section: replace “Read the complete brief” with “Read more,” reveal the complete brief as a connected sequence of story cards, and show each full story in an accessible pop-up.

**Architecture:** Use `src/data/about-spine.ts` as the canonical source for every full-text item. Render an initially collapsed sequence in `AboutOverview`; the “Read more” control expands it in place. Represent the opening editorial and ten sections as eleven ordered cards; clicking a card opens the existing About story dialog, populated with all source-exact paragraphs for that item and previous/next navigation through the sequence. Keep `/about` functional for existing bookmarks and direct URLs unless a later request explicitly removes it.

**Tech Stack:** React 19, TypeScript, React Router, Tailwind CSS v4, existing `AboutStoryDialog`, existing smoke tests, Playwright/browser verification.

**Implementation status (October 22, 2026):** About-only implementation is complete locally and awaiting user review. It derives all eleven cards from canonical source data, expands in place with “Read more,” and serves complete section text through dialogs with Previous/Next. Production build, lint (exit 0 with existing project warnings), both production-preview About smoke checks, and `git diff --check` passed; browser inspection confirmed the sequence expands to eleven cards and the dialog fits the desktop viewport. No deployment, commit, or changes to other homepage sections are included.

---

## User-facing behavior

1. Initial About view remains concise and retains the approved seal and bilingual intro/toggle.
2. The primary control reads **“Read more”** and does not navigate away.
3. Activating it expands the section in place to show a connected, ordered story sequence.
4. Sequence order follows the final client PDF: opening editorial/byline, then sections I–VII, X (Challenges), VIII (NDF), IX (WBI Rules), which is the source PDF order currently used by `/about`.
5. Each card is a semantic button. Activating one opens a modal with its complete source text—not a summary—including every paragraph and the source heading/byline where applicable.
6. The modal offers Previous/Next controls so readers can follow the sequence without closing and reopening cards. At sequence ends, controls are disabled or clearly absent; no wraparound.
7. The modal can also be closed by visible close button, Escape, or backdrop click; focus is restored to the card that opened it.
8. “Read more” toggles back to collapsed view. If collapse is requested while a modal is open, close the modal first and return focus to the toggle.
9. `/about` remains available and complete; existing deep links and bookmarks must not break. Do not present `/about` as the only way to access the full brief from homepage About.

## Content and privacy requirements

- Pull the editorial and sections directly from `ABOUT_EDITORIAL` and `ABOUT_SPINE`; do not duplicate or paraphrase source body text in a second dataset.
- Every section card must map to exactly one source section and preserve its current order, spelling, punctuation, and paragraph boundaries.
- The sequence includes **11 items**: one editorial item plus ten numbered sections. Its full-text payload must cover all 36 paragraphs (3 editorial + 33 section paragraphs) and preserve the current 4,343 whitespace-delimited-word source baseline.
- Source text is rendered only in its relevant modal; overview cards use short source-grounded labels, not claims presented as verbatim quotations.
- Preserve the current publication boundary: do not add member identities to the card summaries or other new surfaces. Full source text remains as it is on the existing `/about` reader.
- Keep the visible source byline associated with the editorial item, not silently omitted.

## Current context

- `src/features/home/HomePage.tsx` currently imports `AboutOverview` from `src/features/about/AboutOverview.tsx` as its About section.
- `src/features/about/AboutOverview.tsx` currently contains the short overview, four summary cards, language toggle, and “Read the complete brief” route link.
- `src/features/about/AboutStoryDialog.tsx` currently accepts an `AboutStoryCard` from `src/data/about-stories.ts`; it manages portal rendering, focus, body scroll, Escape, backdrop, and dialog content.
- `src/data/about-spine.ts` exports `ABOUT_EDITORIAL` and ordered `ABOUT_SPINE`, used by the complete `/about` reader.
- Existing checks: `scripts/about-redesign-smoke.mjs` covers the About card/dialog/brief-link behavior; `scripts/about-spine-smoke.mjs` covers the complete reader.
- Design reference: `docs/DESIGN_SYSTEM.md` §17 (overview-to-detail and accessible dialog requirements); implementation behavior must update that section and the About acceptance criteria in `docs/PRD.md` when shipped.

## Implementation tasks

### Task 1 — Define story sequence from canonical brief data

**Files:**
- Modify: `src/data/about-stories.ts`
- Test: `scripts/about-redesign-smoke.mjs`

1. Add a failing assertion that About offers eleven items, with source IDs/order `[editorial, I, II, III, IV, V, VI, VII, X, VIII, IX]` and each item carries the exact body paragraphs from canonical brief data.
2. Run `node scripts/about-redesign-smoke.mjs` against the current dev/preview server; verify it fails for the missing full sequence.
3. Replace or refactor the current four-card-only data so presentation metadata (ID, year/label, title, summary, source identifier) is kept separate from source body text. Derive body paragraphs from `ABOUT_EDITORIAL` / `ABOUT_SPINE` rather than manually copying them.
4. Ensure the editorial item carries its three paragraphs, author, and role; each numbered section carries its heading and all section paragraphs.
5. Run the smoke and verify the eleven-item order and exact-text checks pass.

**Acceptance:** One sequence data source maps each item to canonical brief content without duplicate hard-coded body text.

### Task 2 — Convert “Read more” into an in-place disclosure

**Files:**
- Modify: `src/features/about/AboutOverview.tsx`
- Test: `scripts/about-redesign-smoke.mjs`

1. Add failing interaction checks: “Read more” exists; clicking does not change route; it reveals the sequence; clicking again collapses it.
2. Run the smoke and observe the expected failures before implementation.
3. Add local expanded/collapsed state. Replace the `/about` link in this homepage section with a semantic button labeled “Read more” / “Show less” (or equivalent state-aware accessible label).
4. Render a connected vertical sequence using existing design tokens and responsive layout. Use visible numbered/ordered labels and a connector line that remains understandable without color alone. Keep the source order exact and preserve focus visibility and ≥44px touch targets.
5. Use reduced-motion-aware disclosure animation; expanded content must remain available if animation is disabled.
6. Run the smoke at narrow and desktop viewport sizes; verify no navigation, no horizontal overflow, and correct toggle behavior.

**Acceptance:** The sequence appears directly under About; the button only controls expansion and never navigates to `/about`.

### Task 3 — Render full source content in each story dialog

**Files:**
- Modify: `src/features/about/AboutStoryDialog.tsx`
- Modify: `src/features/about/AboutOverview.tsx`
- Test: `scripts/about-redesign-smoke.mjs`

1. Add a failing check that opening each item displays every canonical paragraph in exact order, plus its heading; editorial also displays author and role.
2. Run the smoke and confirm existing summary-only dialog fails this check.
3. Change the dialog’s data contract to consume a sequence item whose text comes from the canonical spine data. Render long content in an internally scrollable, viewport-bounded region.
4. Add Previous/Next controls with disabled states at the first and last sequence items. Keep the current item’s accessible heading, close control, focus trap/restore, Escape/backdrop, scroll lock, and `inert` behavior correct when moving between items.
5. On Previous/Next, update the active item in place without restoring focus to the originating card or re-running modal-open body-scroll setup; keep focus on a stable modal control/heading.
6. Verify all 11 items with the smoke; assert 36 full-text paragraphs are accessible across the sequence, and exact match to `ABOUT_EDITORIAL`/`ABOUT_SPINE` data.

**Acceptance:** Each card opens a complete source-text chapter, not a short summary. Readers can move through the whole story within the modal.

### Task 4 — Handle disclosure, modal, and browser history edge cases

**Files:**
- Modify: `src/features/about/AboutOverview.tsx`
- Modify: `src/features/about/AboutStoryDialog.tsx`
- Test: `scripts/about-redesign-smoke.mjs`

Add regression checks and implement as needed for:
- Clicking “Read more” while a modal is open closes it safely before collapse.
- Escape/backdrop/close restore focus to the originating card; collapse restores focus to the “Read more” button.
- Previous/Next do not wrap; keyboard Tab stays inside the dialog.
- Long paragraphs scroll inside the modal while its close and navigation controls remain reachable.
- Reopening a card after closing works and restores body scrolling and page-root inert state.
- Browser back/forward and direct `/about` navigation still work. Do not introduce route state unless it is needed for a tested requirement.

**Acceptance:** No trapped focus, lost scroll, dead controls, or broken legacy route/deep links.

### Task 5 — Update documentation and regression contract

**Files:**
- Modify: `docs/PRD.md`
- Modify: `docs/DESIGN_SYSTEM.md`
- Modify: `docs/TESTING.md`
- Modify: `docs/FINAL_BRIEF_HOMEPAGE_REDESIGN_PLAN.md`

1. Replace the planned About behavior that describes a prominent full-brief link with the approved in-place “Read more” → connected sequence → complete-story modal flow.
2. State that `/about` remains a compatible full-reader route, while homepage About itself exposes all complete brief content through the eleven-item sequence.
3. Keep the scope boundary: other homepage sections and their PDF-red destination mappings are not included in this About-only implementation.
4. Record exact test commands and acceptance criteria; do not mark other sections or whole-site redesign complete.

**Acceptance:** Product/design/test docs describe actual About behavior and preserve the remaining phases as pending.

### Task 6 — Full verification and user review gate

**Files:**
- Test: `scripts/about-redesign-smoke.mjs`
- Test: `scripts/about-spine-smoke.mjs`
- Build/lint/browser validation; no deployment in this plan

Run:

```bash
npm run build
npm run lint
node scripts/about-spine-smoke.mjs
node scripts/about-redesign-smoke.mjs
```

Then verify in a real browser at 320, 375/390, 768/900, 1024, and 1366/1536 px:
- initial collapsed About layout and language toggle;
- disclosure opens/collapses in place, with exactly eleven ordered cards;
- each of eleven cards opens complete text and can be traversed Previous/Next;
- first/last navigation boundaries;
- keyboard-only operation, Escape, close/backdrop, focus restoration, and body-scroll behavior;
- no horizontal overflow, missing paragraphs, dead controls, console errors, or accidental `/about` navigation from “Read more.”

Check exact content coverage with data comparisons and the existing final-PDF reader smoke: **36 paragraphs, 4,343 words, ten numbered sections, and editorial/byline**. Treat pre-existing lint warnings as warnings only if lint exits 0; report them distinctly. Review `git diff --check` and the changed-file list to ensure no unrelated or scratch files are included.

**Final gate:** Show the implemented About section and wait for the user to review it before implementing another homepage section. Do not deploy, commit, or continue to other sections unless asked.

## Likely changed files

- `src/data/about-stories.ts` — ordered sequence presentation metadata derived from canonical data.
- `src/features/about/AboutOverview.tsx` — in-place expansion, story sequence, active-item state.
- `src/features/about/AboutStoryDialog.tsx` — complete text rendering and Previous/Next navigation.
- `scripts/about-redesign-smoke.mjs` — source-fidelity, expansion, modal sequence, keyboard, and responsive tests.
- `docs/PRD.md`, `docs/DESIGN_SYSTEM.md`, `docs/TESTING.md`, `docs/FINAL_BRIEF_HOMEPAGE_REDESIGN_PLAN.md` — update planned/actual contract.

Keep `src/data/about-spine.ts` the canonical text source. Keep `src/features/about/AboutPage.tsx` and route registration intact for backwards compatibility unless implementation reveals a concrete conflict; do not remove or redirect the route as a side effect.

## Risks and trade-offs

- **Large homepage DOM if all complete copy is rendered at once.** Keep full body text in modal content; only render the ordered card summaries in the expanded state. Verify opening the modal makes the complete copy accessible and testable.
- **Duplicate or drifting copy.** Derive modal paragraphs from `ABOUT_EDITORIAL` and `ABOUT_SPINE`; never hard-code the full brief again in card data.
- **Modal focus regressions during Previous/Next.** Keep the dialog mounted while changing the selected item; specifically test focus and body-scroll restoration.
- **Sequence line aesthetics vs accessibility.** Connector is decorative; explicit titles/order labels must convey sequence without relying on color or line alone.
- **Long mobile dialogs.** Bound modal to viewport and keep text content independently scrollable while navigation/close controls remain visible.
- **Scope creep.** This plan covers only About. It does not map or implement red additions in other homepage sections.
- **Identity publication.** Do not add names to sequence summaries; display source names only inside the full-text modal as already present in the complete brief. Do not expand the identity surface beyond the currently published reader without a separate approval decision.
