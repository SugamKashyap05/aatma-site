# Asset Credits & Provenance

This document records the attribution, license, and modification history for every third-party or externally-sourced asset used on the AATMA website. It is the single source of truth for provenance questions.

---

## 1. Kaziranga Forest Background Image

| Field | Value |
|---|---|
| **Local path (source)** | `public/assets/backgrounds/kaziranga-forest-assam-source.jpg` |
| **Local path (derivatives)** | `public/assets/backgrounds/forest-*.{webp,avif,jpg}` — 40 responsive/crop variants encoded as 120 derivative files |
| **Author** | Pinakpani |
| **Source URL** | [Wikimedia Commons — File:Kaziranga forest in Assam 24.jpg](https://commons.wikimedia.org/wiki/File:Kaziranga_forest_in_Assam_24.jpg) |
| **License** | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| **Original dimensions** | 4080 × 3060 px (4:3 landscape) |
| **Original file size** | ~6.3 MB (JPEG) |
| **SHA-1 (source)** | `a4a022ac5584140486336cf07e0fe8295135060b` — verified against Wikimedia Commons API |
| **Date of original photograph** | 2026-04-13 (per Commons metadata) |

### Modifications applied

1. **Downloaded locally** — the source JPEG was downloaded from Wikimedia Commons into `public/assets/backgrounds/`. The site never hotlinks the original at runtime; all references resolve to local files.
2. **Resized** — four full-frame derivatives at 1920, 1280, 768, and 480 px wide for responsive delivery.
3. **Focal crops** — nine crop variants per breakpoint (center, top, bottom, left, right, top-left, top-right, bottom-left, bottom-right) at 85 % crop-window scale, targeting aspect ratios 21:9 (desktop), 16:10 (tablet), 4:3 (mobile), and 1:1 (small).
4. **Format conversion** — each derivative exists in three formats: WebP (primary), AVIF (best compression), and mozjpeg JPEG (universal fallback).
5. **No content alteration** — no retouching, colour grading, compositing, or other pixel-level changes were applied. The image content is identical to the Commons original.
6. **Visible attribution** — the shared site footer links the image title/author to Wikimedia Commons, links the CC BY 4.0 license, and notes that the responsive derivatives were cropped, resized, and format-converted.

### Content description (for accessibility and editorial accuracy)

The photograph depicts an open Kaziranga grassland/wetland scene under overcast sky. The upper portion is featureless sky; the horizon carries a distant treeline. The mid-ground contains an adult Asian elephant walking on a dirt path, a second elephant lying in a stream with a mahout (handler) on its back, and a human-made elevated viewing pavilion with metal railings.

> **Decorative use only.** This image does **not** depict AATMA, agar plantations, agar cultivation, agarwood, or any aspect of the agar trade. It is a generic Assam landscape photograph selected for its visual tone (deep greens, natural light) as a decorative background. No external editorial claim is made or implied by its use.

### Fallback

If the image is unavailable, a solid-colour fallback (`#1a3c2a`, design token `--color-green-deep`) is rendered. Client-owned tree/plantation photographs have been identified as a potential replacement if the client rejects the external visual.

---

## 2. Client-Owned Assets

The homepage hero uses the client-supplied `WhatsApp Image 2026-09-26 at 7.13.00 PM.jpeg` (1000×800), copied to `public/client-images/aatma-tree-plantation.jpg`. It is displayed in a bounded split layout at up to 576 px wide; caption and alt text say only that it shows rows of trees and a grassy path. No species, location, or AATMA ownership is inferred from the pixels.

All other images on the site are either:
- **Client-provided** — photographs, documents, and video frames supplied directly by AATMA, or
- **AI-generated** — created for this project using Microsoft MAI Playground (see `docs/ASSET_INVENTORY.md` for the full list), or
- **Original SVG/chart work** — created inline in React components for this project.

These assets require no external attribution.

---

## Verification

- [x] Source file exists at `public/assets/backgrounds/kaziranga-forest-assam-source.jpg`
- [x] SHA-1 matches Wikimedia Commons API record
- [x] License link (`https://creativecommons.org/licenses/by/4.0/`) resolves to the official Creative Commons legal deed
- [x] All 120 encoded derivative files listed in `manifest.json` exist (40 responsive/crop variants × 3 formats)
- [x] No wording in site copy or alt text implies the photo shows agar cultivation
- [x] `manifest.json` at `public/assets/backgrounds/manifest.json` carries the same attribution metadata for runtime reference
