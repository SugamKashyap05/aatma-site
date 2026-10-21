import { assetUrl } from "@/lib/utils";

/**
 * Background image assets — generated from the Kaziranga photograph.
 *
 * Source: "Kaziranga forest in Assam 24.jpg" by Pinakpani (CC BY 4.0)
 * Attribution details in public/assets/backgrounds/manifest.json
 *
 * CONTENT NOTE (verified by inspecting the pixels, not assumed from the filename):
 * despite "forest" in its Commons filename this is NOT dense forest — it is an
 * open Kaziranga grassland/wetland under overcast sky, a wildlife-park scene.
 * It does not depict AATMA, agarwood or agar cultivation. Decorative wallpaper only;
 * the client-supplied 1000×800 tree-and-path photo is used separately in a
 * bounded homepage split hero with neutral visual wording. Do not infer its
 * species or location from pixels.
 *
 * All image files are local — no external hotlinking. The Commons URL below is
 * attribution metadata only and is never used as an image source.
 * Regenerate: node scripts/generate-forest-backgrounds.mjs
 */

export interface BackgroundVariant {
  /** Intrinsic width of this file, in px. */
  w: number;
  webp: string;
  avif: string;
  jpeg: string;
}

export interface BackgroundImage {
  name: string;
  breakpoint: string;
  /** width / height of the crop. */
  aspect: number;
  /** Focal position for CSS object-position. */
  crop: string;
  variants: BackgroundVariant[];
  /** The largest variant, for plain src fallback. */
  fallback: string;
}

const BASE = assetUrl("assets/backgrounds");

/** Responsive derivatives — full image, no crop. */
export const FOREST_FULL: BackgroundImage[] = [
  {
    name: "forest-1920",
    breakpoint: "desktop",
    aspect: 1.333,
    crop: "full",
    variants: [{ w: 1920, webp: `${BASE}/forest-1920.webp`, avif: `${BASE}/forest-1920.avif`, jpeg: `${BASE}/forest-1920.jpg` }],
    fallback: `${BASE}/forest-1920.jpg`,
  },
  {
    name: "forest-1280",
    breakpoint: "tablet",
    aspect: 1.333,
    crop: "full",
    variants: [{ w: 1280, webp: `${BASE}/forest-1280.webp`, avif: `${BASE}/forest-1280.avif`, jpeg: `${BASE}/forest-1280.jpg` }],
    fallback: `${BASE}/forest-1280.jpg`,
  },
  {
    name: "forest-768",
    breakpoint: "mobile",
    aspect: 1.333,
    crop: "full",
    variants: [{ w: 768, webp: `${BASE}/forest-768.webp`, avif: `${BASE}/forest-768.avif`, jpeg: `${BASE}/forest-768.jpg` }],
    fallback: `${BASE}/forest-768.jpg`,
  },
  {
    name: "forest-480",
    breakpoint: "small",
    aspect: 1.333,
    crop: "full",
    variants: [{ w: 480, webp: `${BASE}/forest-480.webp`, avif: `${BASE}/forest-480.avif`, jpeg: `${BASE}/forest-480.jpg` }],
    fallback: `${BASE}/forest-480.jpg`,
  },
];

/** Desktop hero crops — 21:9 cinematic aspect. */
export const FOREST_DESKTOP_CROPS: BackgroundImage[] = ["center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"].map((crop) => ({
  name: `forest-desktop-${crop}`,
  breakpoint: "desktop",
  aspect: 2.333,
  crop,
  variants: [{ w: 1920, webp: `${BASE}/forest-desktop-${crop}.webp`, avif: `${BASE}/forest-desktop-${crop}.avif`, jpeg: `${BASE}/forest-desktop-${crop}.jpg` }],
  fallback: `${BASE}/forest-desktop-${crop}.jpg`,
}));

/** Tablet crops — 16:10 aspect. */
export const FOREST_TABLET_CROPS: BackgroundImage[] = ["center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"].map((crop) => ({
  name: `forest-tablet-${crop}`,
  breakpoint: "tablet",
  aspect: 1.6,
  crop,
  variants: [{ w: 1280, webp: `${BASE}/forest-tablet-${crop}.webp`, avif: `${BASE}/forest-tablet-${crop}.avif`, jpeg: `${BASE}/forest-tablet-${crop}.jpg` }],
  fallback: `${BASE}/forest-tablet-${crop}.jpg`,
}));

/** Mobile crops — 4:3 aspect. */
export const FOREST_MOBILE_CROPS: BackgroundImage[] = ["center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"].map((crop) => ({
  name: `forest-mobile-${crop}`,
  breakpoint: "mobile",
  aspect: 1.333,
  crop,
  variants: [{ w: 768, webp: `${BASE}/forest-mobile-${crop}.webp`, avif: `${BASE}/forest-mobile-${crop}.avif`, jpeg: `${BASE}/forest-mobile-${crop}.jpg` }],
  fallback: `${BASE}/forest-mobile-${crop}.jpg`,
}));

/** Small/square crops — 1:1 aspect. */
export const FOREST_SMALL_CROPS: BackgroundImage[] = ["center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"].map((crop) => ({
  name: `forest-small-${crop}`,
  breakpoint: "small",
  aspect: 1,
  crop,
  variants: [{ w: 480, webp: `${BASE}/forest-small-${crop}.webp`, avif: `${BASE}/forest-small-${crop}.avif`, jpeg: `${BASE}/forest-small-${crop}.jpg` }],
  fallback: `${BASE}/forest-small-${crop}.jpg`,
}));

/** All background images combined. */
export const ALL_FOREST_BACKGROUNDS: BackgroundImage[] = [
  ...FOREST_FULL,
  ...FOREST_DESKTOP_CROPS,
  ...FOREST_TABLET_CROPS,
  ...FOREST_MOBILE_CROPS,
  ...FOREST_SMALL_CROPS,
];

/**
 * Solid-color fallback when the image is unavailable.
 * Mirrors --color-green-deep (src/index.css) exactly — do not inline a
 * different green here, or the fallback stops matching the palette.
 */
export const FOREST_FALLBACK_COLOR = "#1a3c2a";

/**
 * Source attribution for display.
 * `url`/`fileUrl` are attribution metadata only — never used as an image source.
 */
export const FOREST_SOURCE = {
  file: "Kaziranga forest in Assam 24.jpg",
  author: "Pinakpani",
  credit: "Own work",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Kaziranga_forest_in_Assam_24.jpg",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  dimensions: "4080×3060",
  sha1: "a4a022ac5584140486336cf07e0fe8295135060b",
  contentNote:
    "Open Kaziranga grassland/wetland, not dense forest: overcast sky in the upper third, distant treeline, an Asian elephant on a dirt path, a second elephant in the stream with a mahout, and a human-made viewing pavilion. Decorative only.",
  attributionFile: "public/assets/backgrounds/manifest.json",
};

/**
 * Client-supplied tree-photo used in the bounded homepage split hero.
 * The 1000×800 source renders at up to 576 px wide; do not upscale it into a
 * full-bleed desktop background or infer species/location from the pixels.
 * The decorative Kaziranga background remains separate and attributed.
 */
export const CLIENT_OWNED_FALLBACK = {
  path: "client-images/aatma-tree-plantation.jpg",
  description: "Photograph showing rows of trees and a grassy path",
  status: "selected for the bounded homepage hero; full-resolution originals were not needed for this use",
  assessment:
    "The selected 1000×800 image renders within a max-width 576 px split-hero frame; the 758×606 alternative is not selected. The image is not used as an edge-to-edge desktop background.",
  usage: "Describe only the visible rows of trees and grassy path; do not infer species, location, or AATMA ownership from pixels.",
};
