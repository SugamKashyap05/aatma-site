# Green-Tree Image Assessment (client, received 2026-10-17 via WhatsApp)

Originals untouched (read-only inspection).

## Metadata

| Image | Dimensions | Aspect | File size | Mode | ICC profile | EXIF |
|---|---|---|---|---|---|---|
| 7.12.59 PM.jpeg | 758 × 606 | 1.251 | 139 KB (0.13 MB) | RGB | none | none |
| 7.13.00 PM.jpeg | 1000 × 800 | 1.250 | 177 KB (0.17 MB) | RGB | none | none |

Both are heavily WhatsApp-recompressed JPEGs: sub-0.2 MB, no EXIF, no color profile.

## Visual assessment (both images)

- **Subject**: rows of trees and a dirt/grass path, with a bright hazy backlit canopy. The pixels and available metadata do not independently establish species or precise location. 7.13.00 has a slightly wider view with two framing trunks at right; 7.12.59 is tighter on the path.
- **Foliage edges**: NOT clean enough for masking on either. Leaf/sky transitions are soft, feathery, and low-contrast (backlit haze); isolating leaves would produce halos/jagged edges.
- **Compression**: visible JPEG blocking in the bright sky/washed-background areas on both; leaves look "crunchy"/mushy, not sharp.
- **Clean elements**: the tree trunks have the most distinct edges; foreground trunks could serve as low-fi depth planes, but foliage cannot.

## Resolution verdict

| Use | Required | 7.12.59 (758px) | 7.13.00 (1000px) |
|---|---|---|---|
| Desktop full-bleed hero | ≥1920px wide | FAIL — ~2.5× short | FAIL — ~1.9× short |
| Mobile hero | ≥750px wide | borderline pass (758px) | pass (1000px) |

## Bottom line

- **Neither image is usable as a desktop full-bleed hero.** Do NOT upscale aggressively — upscaling 758→1920 invents detail and stays soft.
- **7.13.00 PM (1000×800)** is the better continuous base for mobile and the better candidate overall (wider composition, framing trunks); still insufficient for desktop.
- **Depth-plane cut-outs**: not viable from these files. Trunk-only planes are marginal; leafy cut-outs are not possible without halos.
- **Prior assessment, superseded for bounded layout:** Request the phone-gallery originals only if a wide desktop full-bleed hero or masking/cut-out treatment is later required. The current Phase 4 implementation uses the 1000×800 photo at a maximum rendered width of 576 px in a static split hero; it does not upscale the image into a full-bleed background.

## Phase 4 outcome — 18 October 2026

The 1000×800 client-supplied image (`WhatsApp Image 2026-09-26 at 7.13.00 PM.jpeg`) is copied to `public/client-images/aatma-tree-plantation.jpg` and displayed in `AatmaHero` within a bounded 5:4 frame (up to 576 px wide on desktop). The visible alt text and caption describe only “rows of trees and a grassy path”; species and location are not inferred. The hero is static, so it does not introduce parallax or animation that needs a reduced-motion override.

The separate Kaziranga image remains decorative wallpaper only, with its CC BY 4.0 attribution retained in `docs/ASSET_CREDITS.md` and `public/assets/backgrounds/manifest.json`. It is not used as the homepage agar/plantation image or as evidence of AATMA activity. The 7.12.59 PM image is not selected for the homepage hero.
