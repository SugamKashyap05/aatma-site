# AATMA Homepage Redesign — Full-Brief Implementation Plan

- **Status:** Final-PDF text reconciliation and the About pilot are implemented and verified locally; other homepage sections remain pending.
- **Approved visual direction:** About overview-to-detail demo (`aatma-about-redesign-demo.html`, previously shown to and approved by the user).
- **Authoritative new source:** Client-provided `A brief note on Agar Trade (2) (2).pdf` (10 pages; red-coloured and red-underlined additions).
- **Current complete reader:** `src/data/about-spine.ts` contains the PDF editorial and all ten headed sections; verified against the final PDF.
- **Scope:** Homepage content sections and their connected complete-brief reader; project documentation. About is the only homepage section implemented in this phase.

## 1. Goal and non-negotiable content rule

Rework the homepage story sections into a coherent, scannable overview-to-detail experience modeled on the approved About demo and the existing Critical Era card/dialog interaction. A visitor should be able to see the subject of each section quickly, open a focused detail, and follow a link to the corresponding complete source text.

**Nothing in the final client brief may be omitted from the public presentation.** The complete final PDF—not just its red additions—must be inventoried paragraph by paragraph, mapped to a rendered destination, and preserved in the dedicated long-form reader in source order. The red-marked passages must additionally be mapped to their intended homepage topics. A homepage summary or card is not a replacement for the complete text. Do not truncate long passages, silently correct source wording, merge conflicting source versions, or invent facts to make the story flow. Keep the original source wording and visible section structure; distinguish interface labels and editorial navigation from client copy.

The final PDF is a revision-sensitive primary input. First compare it with the existing DOCX-backed `about-spine.ts`; do not assume matching section headings, paragraph boundaries, word counts, spelling, or that all PDF additions are already present just because similar text occurs elsewhere. Extract text and formatting, render ambiguous pages for visual inspection, and record exact page/heading/paragraph references.

## 2. Current state and supersession

The homepage currently composes `AatmaHero`, `About`, `SanchiPaatSection`, `AgarStory`, `FormationSection`, `CriticalEraSection`, `AchievementSection`, `NdfFindingsSection`, `RulesSection`, `ChallengesSection`, `PressTeaser`, and `LatestNewsTeaser`. Critical Era already establishes the approved interaction vocabulary: brief overview cards, a keyboard-operable detail dialog, and a full-story route link. The homepage About section is a distinct organizational-introduction section; the dedicated `/about` page is the complete brief reader.

This plan supersedes the earlier narrow scope in `.hermes/plans/2026-10-21_200619-about-brief-spine.md` and the earlier homepage proposal in `docs/HOMEPAGE_REDESIGN_PLAN.md` wherever they say to leave other homepage sections untouched, or prescribe a competing structure/content treatment. Preserve those files as history, but mark them as superseded and point to this plan. The About pilot is implemented locally and verified; no claim is made that the new homepage redesign has been released.

## 3. Information architecture and design rules

### 3.1 Shared pattern, not identical section layouts

Use a common section contract: sourced heading and short orientation → appropriately sized set of topic cards → accessible detail interaction when useful → link to the exact section of `/about` and/or an existing page. Reuse the Critical Era dialog behavior and current design-system tokens/components. Each section may use a grid, timeline, fact card, or comparison layout appropriate to its content; consistency comes from hierarchy, card treatment, detail behavior, and navigation, not forcing every subject into a four-card grid.

Do not put the entire final-PDF brief into homepage dialogs. Long-form copy remains complete and sequential on `/about`; homepage cards provide a sourced overview and link to the exact full-text heading. Use source-exact paragraphs in dialogs where practical, without cutting or rewriting a paragraph mid-thought. Any homepage summaries must be traceable to the exact source paragraph and must not introduce a new claim.

### 3.2 About redesign

Replace the current single long editorial passage as the primary homepage story interface with an association-focused introduction and scannable story cards. Retain the AATMA seal, established institutional identity, current approved bilingual introduction/toggle, and a prominent “Read the complete brief” route link. Cards should orient visitors to AATMA’s formation, early trade, institutional advocacy, milestones, research/conservation, rules, and current challenges, with details opening in an accessible dialog or navigating to the full reader. Keep the distinction clear between AATMA’s story and agarwood’s cultural/trade background. Do not add an unsupported claim about the Association merely to make the introduction sound more narrative.

The complete source copy, including names already approved for the existing full reader, remains there. Do not expand publication of protected office-bearer identities onto additional homepage cards by default; use role-based summaries there unless a later explicit user/client decision authorizes wider duplication. Do not machine-translate the English brief.

### 3.3 Section-by-section destination matrix

| Current homepage area | Final-brief material / red additions to reconcile | Planned presentation and destination |
|---|---|---|
| Hero | Organization identity only where supported; no new claim simply to fill the hero | Preserve hero as a concise identity gateway. Review wording against the source ledger; do not turn it into another long-form card collection. |
| About | Agar origins and identity context; 1976 / reorganization story as it relates to AATMA | Association-first overview plus story cards and link to the full brief. Keep the bilingual interface for existing approved copy. |
| Sanchi Paat | Cultural/manuscript material from the brief | Preserve the topic-appropriate editorial section; include any final-PDF text assigned to it without shortening the complete reader. |
| Agar Story / Trade | PDF p.2 red trade geography, perfume demand, Sylhet/Barpather/Hojai, late-1960s lease, 1970–80s Manipur–Bombay route; p.3 red Far-East imports, employment, re-export, LPC/CITES passage | Topic cards / timeline details for trade origins, route, and Far-East-era change; every full paragraph also appears in order in `/about`. Do not infer dates where the source gives none. |
| Formation | PDF p.3 red 2000 AATMA reorganization and named leadership content | Formation card(s) with full wording on `/about`; protect member identities from new duplicate homepage exposure unless explicitly authorized. |
| National Seminar (currently no dedicated named homepage component) | PDF p.3 red National Seminar, plantation, proceedings, and joint AATMA–Assam survey material | Place in the most appropriate history/formation area or add a dedicated seminar card/section after the inventory confirms placement. Link to existing `/history` or `/resources` only where the target substantively expands the text. Keep survey claims and scope exact. |
| Critical Era | PDF p.6 red 20 December 2011 MoEF meeting and AATMA briefing; red 28 October 2016 conference passage; compare all existing black/underlined paragraphs too | Add topic card(s) within Critical Era’s overview/detail pattern. Preserve attribution as AATMA’s account and distinguish the 2011 meeting from 2016 advocacy. |
| Achievement | PDF p.7 red consequences of the Rules and 14 February 2023 Stakeholders Conference | Cards for the Rules outcome and conference, with source-faithful detail; retain milestone chronology and separate enactment date from conference date. |
| NDF Findings | PDF pp.8–9 red NDF method/report, Article IV, Hojai/Calicut markets and survey visits, population estimate/qualifiers/districts | Evidence-oriented cards or grouped facts; retain the complete method, citation wording, qualifiers, places, and figures. Do not reduce this to just headline statistics. |
| Rules | PDF pp.8–9 red 2000 Rules/Supreme Court context, 800+ cottage units, 22-year issue, 2022 Rules, registration/traceability/CITES, ToF Rules | Organized overview cards/details; keep the final brief’s complete explanatory text in `/about`, do not silently substitute policy/legal interpretation, and keep source claims distinct from verified gazette explanations. |
| Challenges | PDF pp.7–8 red licensing/registration costs and delay; export NOC chain, up-to-30-working-day NOC, verification agencies, buyer-loss account, single-window request, 26 Aug 2026 AIDC workshop | Separate challenge cards for domestic registration and export process plus the workshop/way-forward; attribute these as the client’s position. Do not restate as independent legal advice. |
| Press and Latest News teasers | No assumption that these contain brief paragraphs | Keep their distinct content roles and existing verified source/press attribution. Harmonize card styling only where useful; do not force them into the brief story or add unsourced material. |
| Dedicated `/about` | All sections and every paragraph from final PDF, including both unmarked baseline text and every red-marked addition | Replace/update the existing DOCX-based spine only after exact reconciliation. Preserve complete source order, exact wording, source typos, paragraph boundaries, and a clear route to each relevant homepage detail. |

This matrix is a planning map, not a claim that every passage has been fully audited against current components. Phase 0 closes that audit and may refine destinations while maintaining a 100% paragraph mapping.

## 4. Content integrity protocol

Create a machine-readable or tabular source-to-render manifest before content edits. Minimum fields: stable paragraph ID; PDF page; exact PDF heading; paragraph order; text or stable text hash; red/underline/other emphasis status; present in old spine (exact / partial / absent); present on current homepage (exact / summary / absent); planned route/component/card; full-text destination; provenance/status; reviewer sign-off.

The final PDF was independently extracted and reconciled for the About pilot: 10 pages, 10 headed sections, 36 paragraphs total (3 opening editorial + 33 section paragraphs), and 4,343 whitespace-delimited words. After normalization limited to whitespace, zero-width formatting characters, and spaces before punctuation, all 36 source paragraphs match the PDF text layer exactly. A color-run scan found 185 red text spans; all 185 occur in the complete reader's source text (including section headings). This establishes full-reader fidelity for this PDF version; the destination map for red-marked material across the remaining homepage sections is still pending.

Rules:
- The final client PDF takes precedence for its edited/new passages. Record disagreements with older client documents rather than silently harmonizing them.
- Preserve all client text in the long-form route, including awkward grammar/spelling where the client requested verbatim treatment. If a specific accessibility or rendering issue requires transformation, document it and seek a decision rather than silently editing copy.
- Homepage summaries must be independently traceable, source-faithful, and clearly summaries; every source paragraph still has a complete-text home.
- Preserve distinctions between client-authored statements, client-supplied press reporting, site-authored navigation, and external/legal context.
- Never expose attachment/local-transfer filenames in visitor-facing copy. Keep the private attachment as the internal source reference unless the source is deliberately added to the repository under existing project rules.
- Do not make a new public-member-name decision as a side effect of card redesign. Keep names on the already-approved full-reader surface; seek explicit approval before duplicating them elsewhere.

## 5. Implementation phases and gates

### Phase 0 — Final-PDF census and source lock (prerequisite)
1. Verify the exact attachment is the client’s final version; retain a read-only local source and its checksum in internal audit notes if project policy permits.
2. Extract all PDF text with page and paragraph boundaries; inspect font color, underline, and annotations; render ambiguous pages for visual validation.
3. Diff the final PDF against `src/data/about-spine.ts`’s prior DOCX source and current rendered homepage copy.
4. Produce the paragraph manifest and red-marked passage map for every page/heading.
5. Resolve any source-version/format ambiguities with the user/client. Do not implement until every PDF paragraph has a destination and conflicting source variants are explicitly noted.

**Gate:** 100% of PDF paragraphs indexed; 100% of red-marked passages individually mapped; no unresolved ambiguous text silently treated as absent.

### Phase 1 — Freeze experience and content model
1. Treat the approved demo as the visual reference; document card/dialog anatomy, responsive behavior, navigation, and interaction states.
2. Define typed data for final brief sections/paragraph IDs and homepage card summaries/details/links; keep source text separate from UI labels and layout metadata.
3. Decide which final paragraphs are shown verbatim in homepage details versus shown only in `/about`; the complete text is always on `/about`.
4. Map every CTA to an existing route/anchor and verify the target exists. Add a section/anchor only when no suitable destination exists.

**Gate:** user reviews the finalized content-to-card map before broad implementation; no unsupported copy or unapproved wider identity disclosure.

### Phase 2 — Shared interaction foundation
1. Reuse/refactor the existing Critical Era dialog behavior into an appropriate shared primitive only if the current code review shows reuse is safe; do not fork inconsistent modal implementations.
2. Provide semantic buttons, accessible names, focus placement/trap/restore, Escape/close/backdrop rules, body-scroll restoration, and internal scrolling for long details.
3. Reuse current design tokens, `BentoCard`/`BentoGrid`, reveal behavior, and reduced-motion rules. Add no dependency or color token without a documented need.
4. Test the shared behavior independently before migrating all sections.

### Phase 3 — About pilot
1. Implement the approved association-first overview and cards on homepage About.
2. Preserve the seal and approved bilingual intro/toggle; add full-brief CTA and card deep links.
3. Validate copy against the manifest and the About smoke. Review at 320, 375/390, 768/900, 1024, and 1366/1536 px.

**Gate:** user reviews the actual implemented About section before expansion to remaining sections, consistent with the one-page-at-a-time preference.

**Implementation record — 2026-10-22:** The local About overview now has four source-grounded story cards, keyboard-operable detail dialogs, retained bilingual intro/seal, and a complete-brief link. `/about` was updated to the final PDF editorial + ten-section order. Build and source/rendered-reader and About interaction smokes pass; desktop screenshots were reviewed. This is not deployed. Await the user’s review before moving to the next homepage section.

### Phase 4 — Remaining story sections, in content order
Implement and verify Sanchi Paat / Agar Story, Formation, National Seminar placement, Critical Era, Achievement, NDF, Rules, then Challenges. For each section: map source IDs → UI; add only supported source wording; ensure full paragraph exists on `/about`; update its exact deep link; test keyboard/touch and narrow/wide layout. Keep Press and Latest News as separately sourced content, changing their styles only if needed for a coherent visual system.

### Phase 5 — Full fidelity, accessibility, responsive, regression verification
1. Compare complete rendered `/about` text with the final PDF extraction in page/section/paragraph order; verify exact-text hashes after permitted transport normalization only.
2. Verify every red-marked paragraph appears in the full reader and each has the appropriate homepage destination; verify no red addition is accidentally omitted or duplicated as if it were a separate fact.
3. Verify card details, deep links, history, policy, resources, press/news, navbar, and route behavior.
4. Run build, lint, existing smoke scripts, updated About/full-brief smoke, and browser E2E checks. Inspect browser console, network, image loads, and responsive overflow.
5. Test dialogs with keyboard, touch, reduced motion, focus restore, Escape, and long copy; confirm visual contrast and minimum 44×44 px touch targets.
6. Run source-ledger and protected-name checks with explicitly stated scan scope; do not call a configured-pattern text scan a complete OCR/privacy audit.

### Phase 6 — Documentation, review, release
1. Update PRD, Design System, Architecture, Testing, and canonical claim ledger from the actual shipped behavior; mark this plan’s tasks/gates complete only with evidence.
2. Review exact diff for accidental source-copy edits, unrelated files, and local/scratch artifacts.
3. User approval before release. Then follow the project’s current deployment procedure; do not assume the separate Firebase migration is complete.
4. After deployment, verify the live homepage, `/about`, all deep links, and relevant dialogs against the final brief.

## 6. Acceptance criteria

- Every paragraph in the final client PDF is present in the complete reader in source order; every red-marked addition is accounted for individually.
- No source paragraph is omitted, truncated, merged in a way that changes meaning, or silently corrected. The baseline DOCX’s old counts are not used as a substitute for comparing the final PDF.
- Every red addition has a documented intended homepage topic and is represented in the relevant homepage section/card or explicitly identified as already present with evidence.
- Every homepage card and detail is traceable to a source paragraph; summaries are not presented as verbatim quotes.
- About explains AATMA using supported facts, not merely general agarwood context; seal and bilingual existing UI are retained where appropriate.
- Content-heavy sections share the approved overview-to-detail pattern while each section’s format fits its material; Press and News are not falsely presented as brief content.
- Full brief remains readable at mobile/tablet/desktop; no clipping or horizontal overflow; long copy remains scrollable.
- Dialog accessibility and reduced-motion behavior meet the project’s documented standards.
- `npm run build`, `npm run lint`, and all applicable smokes/E2E/browser checks pass, with results recorded; current known unrelated warnings are distinguished from new failures.
- PRD, Design System, Architecture, Testing, and canonical claim ledger describe the implemented state after implementation—not prematurely before it.

## 7. Risks, decisions, and not-in-scope

- **PDF/DOCX differences:** expected; resolve via actual comparison. Do not take prior counts as final.
- **Long text:** several source sections are large. The homepage overview should not become an unscannable wall; completeness is guaranteed by the full reader and mapped links, not by copying all text into each card.
- **Source typos and awkward phrasing:** preserve under the existing verbatim directive; do not silently normalize.
- **Member identity:** the earlier full-reader decision is not blanket approval to replicate names across every homepage card.
- **Unsupported additions:** existing page copy may contain older summaries or contradictions; check the canonical claim ledger and final source before reuse.
- **Deployment:** no hosting/domain migration is included. Firebase plan is separate.
- **No code, content, or deployment changes are authorized by this planning document alone.** Implementation begins only after Phase 0 and the About review gate are satisfied.

## 8. Documentation touched for this plan

- `docs/PRD.md` — desired homepage behavior and content-completeness acceptance requirements.
- `docs/DESIGN_SYSTEM.md` — shared overview-to-detail card/detail interaction recipe.
- `docs/ARCHITECTURE.md` — proposed data/component boundaries, clearly marked planned.
- `docs/TESTING.md` — PDF fidelity and homepage interaction coverage.
- `docs/PHASE1_CANONICAL_CLAIM_LEDGER.md` — final PDF source authority and reconciliation gate; no old row is marked resolved merely because the plan exists.
- `docs/HOMEPAGE_REDESIGN_PLAN.md` and `.hermes/plans/2026-10-21_200619-about-brief-spine.md` — mark as superseded where they conflict with the new scope.