# Phase 0 — Source Asset Inventory and Decision Register

**As of:** 19 October 2026  
**Authoritative scope for this pass:** `E:/all projects for hermes/aatma-site/assestes images/` — the exact folder supplied by the user. No Downloads or outside folders are part of this inventory.  
**Mode:** Read-only source review and metadata checks; no public routes, source assets, or site code were changed and no deployment was made.

## Verified inventory

The specified folder contains **48 files**: **37 JPEG images** and **11 client documents** (8 PDFs and 3 DOCX files). Of the 37 images, **20 are at the folder root** and **17 are in its four child folders**. I computed SHA-256 for every image; **all 37 are unique, with no exact duplicate image files** in this folder. Per-image filename, dimensions, byte size, hash, broad category, readability status, current route match, and proposed destination/hold are recorded in `docs/PHASE0_ASSET_INVENTORY.csv`.

The 17 subfolder images comprise the 11-page scan/document group, two plantation/tree photographs, two meeting/event photographs, and two plantation/field/NDF-related collages. Thus, the 11 scans are **included in the 37-image count**, not added on top. The four root clipping JPEGs are also included in the 37.

The folder has exactly 11 non-image documents. `docs/PHASE0_DOCUMENT_INVENTORY.csv` records sizes, PDF page counts, whether an extractable text layer exists, and exact-hash/current-route matches. PDF metadata and text-layer checks were read-only: `pdfinfo` for page counts and `pdftotext` for non-empty-text detection. No OCR or personal-data extraction was run.

## Rendered-site mapping

Exact SHA-256 comparison against `public/` found **four of the 37 supplied images currently used**:

- `IMG-005` raw agarwood pieces → `/`, Agar Trade gallery.
- `IMG-017` distillation equipment → `/`, Agar Trade gallery.
- `IMG-020` chips held in a hand → `/`, Agar Trade gallery.
- `IMG-033` 1000×800 plantation photo → `/`, home hero.

The other **33 of these 37 images are not currently represented as client-supplied still images on a route**. Their proposed section or hold reason is recorded individually in the CSV. This is an inventory finding, not a decision to discard them; it establishes where the site needs to map the client set in the implementation phase. The press-page stills are extracted from the supplied video and are not additional files in this 37-image inventory.

## Clipping and scan status

- The *Assam Tribune*, **2 August 2023**, page 6 clipping has a readable masthead, issue date, headline, and article text. Its checked summary exists in News; the clipping image itself is not displayed.
- The *Assam Tribune*, **18 November 2024** clipping has a readable masthead, issue date, headline, and article text. Its checked summary exists in News/Research; the clipping image itself is not displayed.
- The 720×343 clipping remains unresolved: its press-meet banner gives an **event date**, not a newspaper issue date. The outlet and issue date are not verified from this image; the available article text does not support a reliable publication-ready transcription. Keep it as a source item, but do not give it an inferred date.
- The cropped clipping used for the existing *Hindustan Times* News summary shows the article headline and a Hojai story dateline. The image crop does **not** visibly establish a newspaper masthead or issue date. The current News module/source notes cite 17 January 2023; cross-check that citation against the full client clipping/source record before treating this crop alone as proof of publication date.
- The 11 subfolder scans were individually triaged in `docs/CLIENT_ASSET_AND_PROVENANCE_AUDIT.md`: 8 newspaper-style pages and 3 non-newspaper documents (a court filing and two AATMA notices). This is visual triage, not certified transcription, complete OCR, or publication/privacy approval. No new News item was added from these scans.

## Document-to-site matches

- The 128-page `Adobe Scan 13 Oct 2026 (1) (1).pdf` is image-only and matches `public/books/proceedings-seminar-2001.pdf` byte-for-byte.
- The two 2-page letter/press-note PDFs are searchable and match their corresponding `/press` and `/resources` PDF copies byte-for-byte.
- The four-page, searchable `A BRIEF HISTORY OF AGAR.pdf` is not byte-identical to the privacy-edited 4-page resource copy, as expected from the existing register.
- The client-supplied ToF and WBI rule PDFs have the expected 25-page and 67-page counts. They are not byte-identical to the current same-subject resource PDFs; matching content/source equivalence still needs a page/content comparison.
- `CamScanner 01-14-2023 12.03.pdf` (1 page, image-only) and `DocScanner 06-Oct-2026 07-04 PM.pdf` (15 pages, image-only) have no exact public hash match and are not yet classified against a public route. Their identities/content should be checked from their pages before mapping.
- The latest supplied brief and two DOCX press/letter sources have structured text. The brief's topics are reflected in homepage sections, but the DOCX is not offered as a document download. The DOCX-to-existing-PDF correspondence for the press note/letter has not been verified.

## Scope discrepancy to retain

Older project notes list 11 WhatsApp chat screenshots as part of an earlier “44-image” inventory. **Those 11 screenshot files are not present in the user-specified `assestes images` folder**, so they are not counted in this 37-image manifest and their absence here does not prove they are absent from every client source location. The exact folder supplied for this phase is the controlling scope. If those screenshots are intended to be part of the website content set, they need to be supplied or their source path identified; the prior privacy restriction on private chats remains active unless specifically changed.

## Phase 0 gate status

**Inventory and hash reconciliation: complete for the specified folder.** Every one of its 37 images has a stable ID and a proposed destination or explicit hold in the CSV; all 11 documents have an inventory row. The three original scans with visible personal/signatory/contact details (IMG-026, IMG-030, IMG-031) are explicitly held off public pages per the user's decision on 19 October 2026. Use only an already-existing privacy-safe client text source or unsigned copy if its content match is verified; do not display the original scans or transcribe those details. No source file or public site code was changed.

**Phase 0 reconciliation status: inventory complete; source-content checks remain open.** The image-only CamScanner and DocScanner PDFs lack confirmed content-to-route mapping; the Hindustan Times crop does not independently prove its cited issue date; and the client ToF/WBI source PDFs still need content-level comparison against the current public copies. The scans' unreadable/uncertain newspaper metadata remains held, with no dates inferred from event banners or story datelines. These are documented holds, not inferred facts. No additional work beyond Phase 0 is authorized by this report.
