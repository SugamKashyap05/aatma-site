/**
 * Generate responsive derivatives for the Kaziranga background image.
 *
 * Source: "Kaziranga forest in Assam 24.jpg" by Pinakpani, CC BY 4.0
 *         4080×3060 JPEG, 6,374,749 bytes, sha1 a4a022ac5584140486336cf07e0fe8295135060b
 *         — verified byte-identical to the Wikimedia Commons original via the
 *         Commons API (imageinfo size + sha1).
 * Output: WebP + AVIF + JPEG fallback at 1920, 1280, 768, 480 px
 *         Plus focal-positioning crop variants for each breakpoint.
 *
 * CONTENT NOTE — verified by inspecting the pixels, not assumed from the filename:
 *   Despite "forest" in the filename this is NOT dense forest. It is an open
 *   Kaziranga grassland/wetland under overcast sky — a wildlife-park scene. The
 *   upper ~third is featureless sky; the horizon carries a distant treeline; the
 *   mid-ground contains an adult Asian elephant on a dirt path, a second elephant
 *   lying in the stream with a mahout on its back, and a human-made elevated
 *   viewing pavilion. Decorative use only — it does not depict AATMA, agarwood or
 *   agar cultivation. See `cropNotes` in the emitted manifest for which focal
 *   crops actually read well.
 *
 * Run: node scripts/generate-forest-backgrounds.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "public", "assets", "backgrounds", "kaziranga-forest-assam-source.jpg");
const OUT = path.join(ROOT, "public", "assets", "backgrounds");

// Breakpoint widths for responsive derivatives
const WIDTHS = [1920, 1280, 768, 480];

// Focal crop positions as [x, y] fractions of the available crop slack:
// 0 = flush to the left/top edge, 0.5 = centred, 1 = flush to the right/bottom.
const CROPS = {
  center: [0.5, 0.5],
  top: [0.5, 0],
  bottom: [0.5, 1],
  left: [0, 0.5],
  right: [1, 0.5],
  "top-left": [0, 0],
  "top-right": [1, 0],
  "bottom-left": [0, 1],
  "bottom-right": [1, 1],
};

// Aspect ratios for crop variants (width:height)
// Desktop hero: very wide; Tablet: 16:10; Mobile: 4:3 or square
const CROP_ASPECTS = {
  desktop: 21 / 9,   // ~2.33:1 — cinematic hero
  tablet: 16 / 10,   // 1.6:1 — standard tablet
  mobile: 4 / 3,     // 1.33:1 — classic photo
  square: 1 / 1,     // 1:1 — thumbnail/small
};

// The crop window is this fraction of the largest window that fits the source at
// the target aspect. At 100% the tight axis has no slack at all, which silently
// collapses several focal positions onto identical pixels — the original bug in
// this script: `mobile` is 4:3 against a 4:3 source, so all nine mobile "focal
// variants" were byte-identical, and left/right collapsed onto center at every
// breakpoint. 0.85 keeps most of the frame while guaranteeing slack on BOTH axes.
const CROP_ZOOM = 0.85;

const md5 = (buf) => createHash("md5").update(buf).digest("hex");

/** Largest window at `aspect` that fits inside the source, scaled by `zoom`. */
function focalWindow(srcW, srcH, aspect, zoom) {
  const srcAspect = srcW / srcH;
  let baseW, baseH;
  if (srcAspect > aspect) {
    // Source is wider than the target — width is the tight axis.
    baseH = srcH;
    baseW = Math.round(srcH * aspect);
  } else {
    // Source is taller than the target — height is the tight axis.
    baseW = srcW;
    baseH = Math.round(srcW / aspect);
  }
  const width = Math.max(1, Math.round(baseW * zoom));
  const height = Math.max(1, Math.round(baseH * zoom));
  return { width, height, maxLeft: srcW - width, maxTop: srcH - height };
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const srcMeta = await sharp(SRC).metadata();
  const srcW = srcMeta.width;
  const srcH = srcMeta.height;
  const srcAspect = srcW / srcH;
  const srcBytes = (await stat(SRC)).size;

  console.log(`Source: ${srcW}x${srcH} (aspect ${srcAspect.toFixed(3)}), ${srcBytes} bytes`);

  const manifest = {
    source: {
      file: "kaziranga-forest-assam-source.jpg",
      width: srcW,
      height: srcH,
      aspect: +srcAspect.toFixed(4),
      bytes: srcBytes,
      url: "https://commons.wikimedia.org/wiki/File:Kaziranga_forest_in_Assam_24.jpg",
      fileUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/Kaziranga_forest_in_Assam_24.jpg",
      author: "Pinakpani",
      credit: "Own work",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      attributionRequired: true,
      dateOriginal: "2026-04-13",
      sha1: "a4a022ac5584140486336cf07e0fe8295135060b",
      contentNote:
        "Filename says 'forest'; the photograph is an open Kaziranga grassland/wetland under overcast sky, i.e. a wildlife-park scene, not dense forest. The upper ~third is featureless sky, the horizon carries a distant treeline, and the mid-ground contains: an adult Asian elephant walking on a dirt path, a second elephant lying in the stream with a mahout (handler) on its back, and a human-made elevated viewing pavilion with metal railings. Decorative use only — it does not depict AATMA, agarwood, agar plantations or agar cultivation.",
    },
    modifications: [
      "Downloaded from Wikimedia Commons into public/assets/backgrounds/ (local copy; never hotlinked at runtime)",
      "Resized to 1920 / 1280 / 768 / 480 px wide for responsive delivery",
      "Focal crops to 21:9 (desktop), 16:10 (tablet), 4:3 (mobile) and 1:1 (small), at 85% crop-window scale",
      "Converted to WebP and AVIF, with mozjpeg JPEG fallbacks",
      "No retouching, colour grading, compositing or content alteration",
    ],
    cropZoom: CROP_ZOOM,
    cropNotes: {
      center: "Grassland mid-ground: elephant on the dirt path, viewing pavilion, horizon treeline.",
      top: "Overcast sky band plus horizon treeline and a little grassland — sky-dominant (weakest read).",
      bottom: "Foreground grass and dirt path, no sky — busiest read.",
      left: "Frames the large tree at the left edge with the viewing pavilion beyond it.",
      right: "Frames the stream with the second elephant and its mahout on the right of the frame.",
      "top-left": "Left tree canopy against sky — sky-dominant.",
      "top-right": "Sky above the distant treeline — sky-dominant (weakest read).",
      "bottom-left": "Tree base and pavilion over foreground grass.",
      "bottom-right": "Dirt path and stream bank across the foreground grass.",
    },
    derivatives: [],
  };

  // 1. Standard responsive derivatives (no crop — full image, just resized)
  for (const w of WIDTHS) {
    const h = Math.round(w / srcAspect);
    const baseName = `forest-${w}`;

    // WebP
    const webpBuf = await sharp(SRC).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72, effort: 6 }).toBuffer();
    await writeFile(path.join(OUT, `${baseName}.webp`), webpBuf);

    // AVIF
    const avifBuf = await sharp(SRC).resize({ width: w, withoutEnlargement: true }).avif({ quality: 55, effort: 5 }).toBuffer();
    await writeFile(path.join(OUT, `${baseName}.avif`), avifBuf);

    // JPEG fallback
    const jpegBuf = await sharp(SRC).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toBuffer();
    await writeFile(path.join(OUT, `${baseName}.jpg`), jpegBuf);

    manifest.derivatives.push({
      name: baseName,
      width: w,
      height: h,
      crop: "full",
      webp: { file: `${baseName}.webp`, bytes: webpBuf.length },
      avif: { file: `${baseName}.avif`, bytes: avifBuf.length },
      jpeg: { file: `${baseName}.jpg`, bytes: jpegBuf.length },
    });

    console.log(`${baseName}: webp ${(webpBuf.length/1024).toFixed(0)}KB  avif ${(avifBuf.length/1024).toFixed(0)}KB  jpeg ${(jpegBuf.length/1024).toFixed(0)}KB`);
  }

  // 2. Focal crop variants — extract a genuinely different window of the source
  //    at the target aspect, then resize it to the target dimensions.
  const cropConfigs = [
    { breakpoint: "desktop", width: 1920, aspect: CROP_ASPECTS.desktop },
    { breakpoint: "tablet", width: 1280, aspect: CROP_ASPECTS.tablet },
    { breakpoint: "mobile", width: 768, aspect: CROP_ASPECTS.mobile },
    { breakpoint: "small", width: 480, aspect: CROP_ASPECTS.square },
  ];

  for (const cfg of cropConfigs) {
    const targetW = cfg.width;
    const targetH = Math.round(targetW / cfg.aspect);
    const win = focalWindow(srcW, srcH, cfg.aspect, CROP_ZOOM);
    const seen = new Map();

    for (const [cropName, [fx, fy]] of Object.entries(CROPS)) {
      const baseName = `forest-${cfg.breakpoint}-${cropName}`;
      const left = Math.round(win.maxLeft * fx);
      const top = Math.round(win.maxTop * fy);

      // Extract at the focal offset FIRST, then resize. The previous version
      // computed these offsets and then never used them, relying on
      // resize({fit:"cover"}) instead — which only ever crops along the tight
      // axis, so most "variants" shipped as byte-identical duplicates.
      const pipeline = () =>
        sharp(SRC)
          .extract({ left, top, width: win.width, height: win.height })
          .resize({ width: targetW, height: targetH });

      const webpBuf = await pipeline().webp({ quality: 70, effort: 6 }).toBuffer();
      const avifBuf = await pipeline().avif({ quality: 50, effort: 5 }).toBuffer();
      const jpegBuf = await pipeline().jpeg({ quality: 75, mozjpeg: true }).toBuffer();

      const hash = md5(jpegBuf);
      if (seen.has(hash)) {
        throw new Error(
          `Focal crop collision: forest-${cfg.breakpoint}-${cropName} is byte-identical to ` +
            `forest-${cfg.breakpoint}-${seen.get(hash)}. Lower CROP_ZOOM or fix the focal offsets — ` +
            `duplicate files under different focal names are not crop variants.`,
        );
      }
      seen.set(hash, cropName);

      await writeFile(path.join(OUT, `${baseName}.webp`), webpBuf);
      await writeFile(path.join(OUT, `${baseName}.avif`), avifBuf);
      await writeFile(path.join(OUT, `${baseName}.jpg`), jpegBuf);

      manifest.derivatives.push({
        name: baseName,
        width: targetW,
        height: targetH,
        crop: cropName,
        breakpoint: cfg.breakpoint,
        aspect: +cfg.aspect.toFixed(4),
        extract: { left, top, width: win.width, height: win.height },
        webp: { file: `${baseName}.webp`, bytes: webpBuf.length },
        avif: { file: `${baseName}.avif`, bytes: avifBuf.length },
        jpeg: { file: `${baseName}.jpg`, bytes: jpegBuf.length },
      });

      console.log(`${baseName}: webp ${(webpBuf.length/1024).toFixed(0)}KB  avif ${(avifBuf.length/1024).toFixed(0)}KB  jpeg ${(jpegBuf.length/1024).toFixed(0)}KB`);
    }

    console.log(
      `${cfg.breakpoint}: ${seen.size}/${Object.keys(CROPS).length} distinct focal crops ` +
        `(window ${win.width}x${win.height}, slack ${win.maxLeft}x${win.maxTop})`,
    );
  }

  // 3. Solid-color fallback — used if the decorative wallpaper is unavailable
  //    or the client rejects the external visual exception. The client-supplied
  //    tree-and-path photo is a separate, bounded homepage hero asset.
  const fallbackColor = "#1a3c2a";
  manifest.fallback = {
    type: "solid-color",
    color: fallbackColor,
    token: "--color-green-deep",
    description: "Deep forest green (--color-green-deep) fallback when the decorative wallpaper image is unavailable",
    clientHomepageHero: {
      summary: "The 1000×800 client-supplied tree-and-path photo is used separately in the bounded homepage split hero; it does not replace or change attribution of the decorative wallpaper.",
      assets: [
        "WhatsApp Image 2026-09-26 at 7.13.00 PM.jpeg — 1000×800 (selected)",
        "WhatsApp Image 2026-09-26 at 7.12.59 PM.jpeg — 758×606 (not selected)",
      ],
      assessment: "The selected photo displays at up to 576 px wide. Alt text and caption describe only visible rows of trees and a grassy path; species and location are not inferred.",
      status: "1000×800 client-supplied photo selected for bounded homepage hero; full-resolution original not required for this use",
    },
  };

  // Write manifest
  await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to ${path.join(OUT, "manifest.json")}`);
  console.log(`Total derivatives: ${manifest.derivatives.length}`);
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
