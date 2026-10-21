# News & Research Completeness Report

**Prepared:** 19 October 2026  
**Scope:** Current local AATMA worktree, the supplied-material inventories and research notes in `docs/`, and rendered `/books`, `/news`, one news-detail route, and `/research` in the local production preview.  
**Not covered:** A complete line-by-line census of every brief section, OCR/privacy review of every image or scanned page, or the live deployed website.

## Executive finding

**The local site is not yet certified complete or ready for deployment.** Targeted work has expanded the three existing, date-verified News summaries; added five client-clipping-sourced Research findings and direct client-gazette links; and mapped three additional client photographs to the home page. The original newspaper scans remain undisplayed. The 11 extracted scan/photo assets have now been individually visually triaged: three are non-newspaper documents and eight are newspaper-style pages/clippings. The available visual review is not certified full-resolution OCR or publication/privacy approval; none of the eight was added to News because outlet, issue date, and reliable publication-ready transcription are not all verified. The separate unresolved clipping remains unpublished; its 14 January 2023 banner is an event date, not a verified newspaper publication date. The full section-by-section claim census remains open.

This report reflects the **local build only**. No push or deployment was made, so no claim is made about what the public site currently serves.

## Books — requested changes completed locally

The `/books` library now lists only the two client-supplied publications:

1. **AGAR — History & Scope of Plantation: A Perspective** — 31-page scan, with local page images.
2. **Proceedings of Seminar on Scope & Dimension of Agar Plantation in NE Region** — 128-page client-supplied PDF scan.

The two project-authored demo summaries (“The Agarwood Trade of Assam” and “AATMA: Fifty Years”) were removed from `BOOKS` and from `public/books/`. The production build contains only the two publication PDFs; the removed demo titles and filenames do not appear in the built JavaScript.

AGAR now has `readerStyle: "flipbook"`; `ImageReader` enables the existing page-turn animation only for that configuration. In the local browser, desktop used the 3D page-turn class and mobile used the slide page-turn class. Pages 1 and 2 loaded. The 31 page-image files are present in `public/` and `dist/`; the full 31-page interaction was not re-certified after this style change.

## Supplied images and clipping assets

The Phase 0 inventory of the user-specified `assestes images/` folder records **37 unique JPEGs** (20 at the folder root and 17 in four child folders) plus 11 client documents. Four images have exact-hash matches to rendered home-page assets: the plantation photograph on the hero and three agarwood/process photographs in the Agar Trade section. **33 of the 37 images remain unmapped.** The older “44-image” count included 11 chat screenshot filenames that are not present in this specified folder; do not add those to the 37-image count. The `/press` gallery separately uses three stills extracted from supplied video.

The 11 chat screenshot filenames listed in earlier notes are not present in the specified folder and are not part of this 37-image inventory. They remain outside this pass and the earlier instruction excluding private chat screenshots from public routes remains active. For the 33 unmapped images, consult the per-item readability, people/embedded-text flags, destination, and hold notes in `docs/PHASE0_ASSET_INVENTORY.csv`; the three new Home photographs retain neutral captions and alt text.

## News section

### What is present

`src/data/news.ts` and `/news` currently contain three dated entries:

- *Hindustan Times*, 17 January 2023.
- *The Assam Tribune*, 2 August 2023, page 6.
- *The Assam Tribune*, 18 November 2024.

The News page now accurately describes these as **checked summaries**, not complete or verbatim article transcriptions, and states that original scans are not displayed. The rendered News index contains three article cards and no clipping images.

### Missing or incomplete

1. **One of the four directly inventoried clipping images remains unresolved.** It was only partly readable in the available 720×343 image. A banner gives the press-meet event date as 14 January 2023, but that is not the newspaper publication date; the outlet/masthead and article body are not legible enough to identify or transcribe reliably. It is correctly absent from `/news` until a clearer scan or verified citation is available.
2. **The Hindustan Times clipping crop does not independently show the issue masthead/date.** The image shows the article headline and a Hojai story dateline; the current News module/source notes cite 17 January 2023. Verify that publication date against the full client source record before treating this crop alone as evidence of the issue date.
3. The 11 extracted scan/page files have been visually triaged individually in `docs/CLIENT_ASSET_AND_PROVENANCE_AUDIT.md`; visual triage is not certified transcription or privacy approval. Three are non-newspaper documents and eight are newspaper-style pages/clippings. None was added as a new News item because complete outlet/date/transcription verification is missing.
4. The 17 January 2023 summary includes the private-farmer/non-forest-land context, relationship between the 2022 rules, and the delegation's reported intention to meet and invite the Chief Minister. It remains a checked summary, not a verbatim article transcript.
5. The 2 August 2023 summary covers the wood/carbon discussion, 2000-rule/Supreme Court context, composite units, automatic application advancement, captive plantations, technology/skills constraints, the proposed investment policy, and the then-planned portal, as well as the figures and processing timelines. Time-sensitive proposals are framed as reported at the time.
6. The 18 November 2024 summary includes the reported trade volumes, domestic and international price ranges, quota figures, and registration/compliance claims. These remain newspaper-reported claims, not independently audited AATMA statistics.

## Research section

### What is present

The rendered `/research` route contains three overview cards and five chart visualizations. The charts cover:

- Assam district tree counts and the Assam/Tripura comparison.
- Global market growth and projection.
- India import/re-export tonnage and eastern-India shares.
- Domestic chip and oil price ranges, preserving their different units.

The figures are labelled as press estimates, not as audited AATMA statistics. The 390×844 local browser check found all five chart SVGs and no horizontal overflow.

### Supplementary findings added

The route now includes five sourced findings: NDF/conservation context; export quota share and annual chip/oil quantities; international prices per kilogram; the planned trade centre; and the reported registration/compliance problem. Each identifies *The Assam Tribune*, 18 November 2024, as source and uses a client-supplied press-estimate badge. The card links directly to the client-supplied WBI and ToF gazette PDFs, which also remain listed under Resources. The current checks confirm those two local assets respond as PDFs; they do not substitute for a full legal-source audit of the newspaper's claims.

## All-section completeness remains open

`docs/PHASE1_CANONICAL_CLAIM_LEDGER.md` explicitly leaves additional brief-backed rows for re-check, including the 2007 writ petition, 2010 multi-agency harassment, the 800+ industry figure, the February 2023 stakeholders' conference, ongoing challenges and the 26 August 2026 AIDC workshop, policy cards, and milestone entries. Until those rows are reconciled against the current rendered routes, an “every section is complete” confirmation would be unsupported.

## Remaining work

1. Complete the full section-by-section canonical claim census against actual client source passages and current rendered pages.
2. Obtain legible sources for the eight held newspaper-style scans and the unresolved clipping; publish nothing without verified outlet/date and a reliable source-grounded summary, and do not infer dates from event banners.
3. Review/map the 29 remaining non-chat image assets only where captions, alt text, visible text, and privacy are supportable; continue excluding the 11 private chat screenshots.
4. Repeat full browser, accessibility, privacy, and production-base verification after census remediation. Deploy only after that gate is complete.

## Verification performed after latest edits

- `npm run build` — passed.
- `npm run lint` — exited 0; the tool output was terse and indicates warnings. No claim of warning-free lint.
- `git diff --check` on touched source/docs — exit 0; Git warned that `ResearchPage.tsx` LF will be replaced by CRLF on a future Git touch.
- Local production preview at `http://127.0.0.1:4179/`: home at 390px decoded all three new images and displayed captions/alt text with no horizontal overflow; `/news` rendered three dated cards, checked-summary/scan disclosure, and no horizontal overflow; `/research` rendered all five findings and the “Client-supplied press estimate” badge, linked both gazette PDFs (both HEAD checks returned 200 and `application/pdf`), and had no horizontal overflow.
- Targeted checks do not certify all routes, viewport sizes, accessibility, complete content inventory, or deployment state. No live deployment or remote repository state was checked or changed.
