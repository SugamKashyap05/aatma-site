# Active Asset & Provenance Register

**As of:** 19 October 2026  
**Scope:** Current AATMA site working tree and assets rendered from its local production preview. This is not a statement about any deployed site, remote repository, or CDN.  
**Canonical sources:** `docs/PHASE1_CANONICAL_CLAIM_LEDGER.md`, `docs/CLIENT_ASSET_AND_PROVENANCE_AUDIT.md`, and the client-supplied materials recorded there. `docs/ASSET_INVENTORY.md` is an earlier planning snapshot, not the active register.

## Verification snapshot

- Targeted verification after the 19 October 2026 edits: `npm run build` passed; `npm run lint` exited 0 with warnings. Browser checks at 390×844 and 1536×730 confirmed exactly two library entries; the AGAR page-turn class was `page-turn-3d` on desktop and `page-turn-slide` on mobile, with pages 1–2 loading. `/news` showed three summaries and no clipping scans; the 2024 news detail and `/research` rendered at 390×844 with no horizontal overflow. This is not a full-site, accessibility, or deployment certification.
- Prior full-image matrix (18 October 2026, before the current changes): 11 routes × 3 viewports (360×844, 768×1024, 1366×900); 33 route/viewport checks, 54 `<main><img>` observations, 11 unique runtime image paths, no unloaded images, page errors, failed requests, or HTTP error responses in that run.
- Prior full local smoke (18 October 2026, before the current changes): **11 public routes × 5 viewports (360×390, 390×844, 768×1024, 1366×768, 1920×1080)**; **55/55 public combinations passed**, with no route/console/network errors, broken images, or horizontal overflow. One lazy image on Home remained pending at the generic smoke's measurement point; the separate image matrix explicitly waited for image decode and found all 54 observations loaded. The five additional warnings were the expected unknown-news-slug SPA fallback returning HTTP 200 while rendering the not-found page; the smoke run had zero failures. Evidence: `scripts/smoke-test-continuation-2026-10-18.json`.
- Prior AGAR image-reader check (18 October 2026, before the style toggle): all **31** sequential scan pages loaded with non-empty page/chapter alt text and distinct page-image paths. The 19 October browser check confirmed the new desktop/mobile flipbook classes and loaded pages 1 and 2.
- Mobile trade schematic: at a 360px viewport the image rendered at 310px wide using the mobile SVG; direct screenshot review found the event labels, descriptions, and source note readable (small type), with no overlap or clipping. The mobile version is chronology-oriented and omits the desktop's dashed relationship lines. At desktop, the 766×479 rendered wide schematic visually distinguishes the gold chronology path from pale dashed client-described supply links; labels/source note are readable, with no overlap or clipping. Both versions explicitly say the diagram is not geographic or to scale.
- Footer attribution was previously browser-checked on all **11** public routes: visible decorative-photo notice, Commons source link, and CC BY 4.0 license link.
- The supplied press-meet video supports playback; keyboard activation produced a decoded 480×270 frame and playback advance to 0.263 seconds, with no media HTTP failure or page error. Its 1280×720 poster decoded. Full-duration playback and full-video privacy review are **not** certified here.
- The PDF/resource privacy smoke and public text scan previously exited successfully. They do not establish that image-only PDF pages contain no personal names: see **Open checks**.

## Repository text privacy sweep (19 October 2026)

- A local text-only scan covered **238 project text files** (excluding dependency/build folders and Git metadata). It checked the configured known-member-name list plus email and `+91` phone patterns. The initial scan found matches in 30 files; those text occurrences were redacted, including a name split across a line break, and the final scan returned **zero matches** for those configured patterns.
- The unverified AATMA contact block was removed from the repository README. This pass did not rewrite Git history, publish or deploy changes, or scan binary assets; it does **not** establish that all possible name variants are absent.
- Scanned PDFs, raster artwork, and video still require the OCR/frame-level privacy review listed below. These local text results do not establish remote-repository or deployed-site state.

## Rendered image and media map

| Route/state | Asset(s) | Provenance and approval | Rendered description/accessibility treatment |
|---|---|---|---|
| `/` home hero | `public/client-images/aatma-tree-plantation.jpg` (1000×800) | Client-supplied photograph | Alt and visible caption both describe only rows of trees and a grassy path. No species, location, or AATMA activity is inferred from the pixels. Bounded split hero; not a full-bleed evidence image. |
| `/` Agar Trade section | `public/client-images/agarwood/agarwood-raw-pieces.jpg`, `distillation-vessel.jpg`, `agarwood-chips-hand.jpg` | Three client-supplied direct photographs copied from the supplied Downloads asset set on 19 October 2026. | Visible, neutral captions and descriptive alt text; no person names, specific origin, grade, quality, price, or performance claims. The distillation photo shows equipment only; the chip close-up shows a hand but no face. |
| `/` trade schematic, viewport ≤639px | `public/history/trade-journey-map-mobile.svg` | Project-authored responsive layout based on the client-supplied *A Brief History of Agar*, §3; no external source added | Vertical readable chronology. Shared `<img>` alt says the figure is a client-described schematic, not a geographic map or to scale. Visible caption identifies the source. |
| `/` trade schematic, viewport ≥640px | `public/history/trade-journey-map.svg` | Project-authored schematic based on the same client source | Wide chronology and supply-relationship diagram. Same alt/caption intent; source note is embedded in the SVG and rendered caption. Claims such as the late-1960s NEFA/Bhutan leases were checked against §3. |
| All 11 routes | `public/assets/backgrounds/forest-*` derivatives | One approved Wikimedia Commons photograph, stored locally and not hotlinked at runtime. Attribution: Pinakpani; CC BY 4.0. Source and modification details are in `public/assets/backgrounds/manifest.json`. | Decorative-only: background component is `aria-hidden` and the image alt is empty. The visible footer attributes it on each route. Do not describe it as AATMA, agarwood, or plantation evidence. |
| `/books` library | `public/books/agar/pages/page-001.jpg`; `public/books/covers/proceedings-seminar-2001.png` | Client-supplied publications; the proceedings cover is a local cover image for its supplied scan | Card cover art is decorative (`alt=""`, `aria-hidden`) because the book title is adjacent. The proceedings cover visibly prints editor credits in abbreviated initials/surname form and the association's institutional address/registration line; no personal phone/email is visible. The AGAR reader uses the supplied scan pages, not a project-created substitute cover. |
| `/books` AGAR reader state | `public/books/agar/pages/page-001.jpg` through `page-031.jpg` | Page images derived from the client-supplied 31-page scanned publication | Browser check loaded all 31 pages; each reader image has page/chapter alt text. Images remain scans; no transcript or OCR text is claimed. |
| `/books` proceedings reader state | `public/books/proceedings-seminar-2001.pdf` | Client-supplied 128-page scanned proceedings volume | Embedded local PDF and download. Full 128-page OCR/privacy review was not performed. |
| `/press` gallery | `public/press-meet/IMG-P02_press-meet-hero.webp`, `IMG-P03_speakers-table.webp`, `IMG-P04_banner-detail.webp`; JPEG fallbacks | Three local frame grabs from the client-supplied press-meet video. AVIF and PNG variants also exist in `public/press-meet/` but are not selected by the current gallery component. | P02/P03 alt text describes the public event scene without identifying attendees or asserting an attendee count. P04 alt text transcribes the visible event banner. Pixel review found no readable individual full names, personal phone numbers, or email addresses in these three frames. P02 visibly includes an institutional office-address line; P02/P03 carry the supplied footage's media watermark. The images show unnamed attendees; they are not individually captioned. |
| `/press` video state | `public/press-meet/v2-tiny.mp4`; poster `IMG-P02_press-meet-hero.jpg` | Client-supplied press-meet video and local poster frame | Controls enabled; `preload="none"`; accessible label identifies the client-supplied event and date. Playback advanced and decoded in-browser; the video watermark and unnamed attendees are part of the supplied footage. No full-length privacy/transcript audit is claimed. |

### Shared background derivatives

`public/assets/backgrounds/` contains **40 logical variants** (four full-frame sizes and 36 focal crops), each encoded as AVIF, WebP, and JPEG: **120 derivative files**, plus one source JPEG and `manifest.json` (**122 files** in that directory). At the tested widths, Chromium selected the center-crop AVIF for small (360px), tablet (768px), and desktop (1366px) layouts. The alternate crops and WebP/JPEG fallbacks remain available but were not fetched in that browser run.

## Public publication and download inventory

There are 12 public PDF files representing 10 unique PDFs; the press note and letter each have a `/press` copy and a `/resources` copy. All are local assets.

| Public file | Route/state | Source/handling |
|---|---|---|
| `books/agar.pdf` (31 pages) | `/books` download; page images in reader | Client-supplied scanned AGAR publication; now explicitly configured for flipbook-style page turns. |
| `books/proceedings-seminar-2001.pdf` (128 pages) | `/books` download and embedded reader | Client-supplied scanned proceedings. |
| `press/aatma-press-note-2023-01-14.pdf`; `resources/press-note-2023-01-14.pdf` | `/press`, `/resources` | Same unsigned client-supplied press-note document in two route-specific copies. |
| `press/aatma-letter-to-hcm-2023-01-14.pdf`; `resources/letter-to-hcm-2023-01-14.pdf` | `/press`, `/resources` | Same client-supplied correspondence in two route-specific copies. |
| `resources/brief-history-of-agar.pdf` | `/resources` | Four-page searchable, privacy-edited public copy of the client-supplied history note (57,758 bytes); full AATMA office-bearer names are withheld. The public resource card discloses the edit. |
| `resources/seminar-abstracts-2000.pdf` (15 pages) | `/resources` | Client-supplied seminar publication. Scanned/image-only portions have not had a full OCR privacy review. |
| `resources/wbi-rules-2022-gazette.pdf` (67 pages) | `/resources` | Client-supplied Assam Gazette copy. |
| `resources/tof-rules-2022-gazette.pdf` (25 pages) | `/resources` | Client-supplied Assam Gazette copy. |
| `resources/wbi-form-xvii-registration.pdf` (2 pages) | `/resources` | Form reproduced from the client-supplied rules gazette. |
| `resources/cites-form-xxv-lpc.pdf` (1 page) | `/resources` | Form reproduced from the client-supplied rules gazette. |

The signed press-note scan is **not** present in `public/` and is not offered by the site. It was removed because it exposes signatories/signatures and direct contact details. The unsigned client text copy remains. A direct URL probe for the removed scan returned the SPA's `text/html` fallback, not a PDF; this is not evidence that the scan is available. The press-note and letter copies in `/press` and `/resources` were checked by SHA-256 and are byte-identical within each pair. The original client history source was not overwritten; the deployable resource is the privacy-edited copy. No Git-history rewrite or deployment was performed.

## Current public-tree counts

The current `public/` snapshot contains **191 files / 178,801,516 bytes**, including **12 PDFs** (10 unique documents; two byte-identical route-copy pairs), 79 JPG, 43 WebP, 43 AVIF, 4 PNG, 4 SVG, 1 MP4, 1 TXT, 1 JSON, 1 CSS, 1 XML, and 1 HTML file. `public/assets/backgrounds/` contains 40 manifest variants × 3 encodings (120 derivative files), one source JPEG, and the manifest (122 files total). The 58 archived project-created illustration assets comprise 48 raster files and 10 SVG diagrams; no matching archived-asset content hashes were found in the current `dist/` build.

## Route-level summary

The route matrix above observed these runtime `<img>` sources:

- `/`: client hero, one trade-map variant (mobile or wide), and the selected decorative background.
- `/books`: AGAR page-1 cover, proceedings cover, and decorative background. The opened AGAR reader was separately checked across all 31 pages.
- `/press`: three WebP gallery frames and decorative background. The video poster and MP4 were separately checked.
- `/history`, `/policy`, `/research`, `/resources`, `/news`, `/news/aatma-thanks-cm-sarma-2023`, `/news/winds-of-change-2023`, and `/news/prospects-assam-agarwood-2024`: decorative background only in the image matrix.

The route set was tested at 360×844, 768×1024, and 1366×900. This records what rendered in the checked local preview, not what is currently deployed.

## Retired project-created illustrations

The 48 project-created raster illustrations and 10 unused SVG diagrams documented in `docs/retired-project-illustrations/README.md` are archived outside the deployable `public/` tree. They are not approved documentary imagery and must not be restored to public routes without explicit client approval. The two active trade-schematic SVGs above are separate, source-derived diagrams.

## Open checks and limits

1. **Scanned-document OCR/privacy:** no page-by-page OCR review is recorded for the 31-page AGAR scan, 128-page proceedings, 15-page seminar abstracts, or scanned portions of government gazettes/forms. Do not infer that these scans contain no member names or personal details. Their client-supplied status is confirmed; privacy review of image-only text remains open.
2. **Full video review:** only a short muted playback advance and decoded frame were tested. Full-duration playback, transcript accuracy, and frame-by-frame privacy were not audited.
3. **Accessibility:** `axe-core` was unavailable. The source/route checks do not certify WCAG 2.2 AA. Actual foreground/background contrast over the final translucent/glass surfaces and image composites, keyboard/screen-reader review of all interactive states, and a complete heading/landmark audit remain open.
4. **Rendered claims:** the canonical ledger exists and multiple claims were checked against client documents, but the full interactive-state, every-timeline-entry, route-by-route rendered claim census remains open. Do not mark presentation-ready from this register alone.
5. **Visual regression:** there is no committed screenshot baseline. The mobile trade-map layout was directly reviewed; a full manual visual inspection of every route/state and a baseline comparison have not been completed.
6. **Production subpath:** the earlier seven-case `/aatma-site/` smoke predates the mobile trade-map `<picture>` addition and the latest CITES copy changes. `assetUrl()` is used for both map assets, but a fresh production-base build/smoke after those edits remains open.
7. **Remote state:** no deployment, remote repository history, CDN purge, or publication status was verified. This register describes the local worktree and local preview only.
