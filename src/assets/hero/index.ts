/**
 * Resolves the optimized hero layers to fingerprinted asset URLs.
 *
 * URLs come from generated.ts (explicit static imports) rather than
 * import.meta.glob, because the glob + `?url` form did not resolve to hashed
 * build URLs under this Vite/rolldown version — it emitted raw /src/... dev
 * paths, which left the hero imageless and crashed the render.
 *
 * See scripts/optimize-hero-images.mjs (produces the files) and
 * scripts/generate-hero-assets.mjs (produces generated.ts).
 */
import { HERO_LAYER_META, type HeroLayerMeta } from "./manifest";
import { HERO_ASSET_URLS } from "./generated";

export interface HeroImageVariant {
  /** Intrinsic width of this file, in px. */
  w: number;
  webp: string;
  avif: string;
}

export interface HeroImage {
  name: string;
  kind: HeroLayerMeta["kind"];
  /** width / height — used to reserve layout space and avoid CLS. */
  aspect: number;
  /** Ascending by width. */
  variants: HeroImageVariant[];
  /** The largest variant, for the plain `src` fallback. */
  fallback: string;
}

/** Resolved, sorted, ready-to-render hero layers (same order as the manifest). */
export const HERO_IMAGES: HeroImage[] = HERO_LAYER_META.map((meta) => {
  const variants: HeroImageVariant[] = meta.variants
    .map((v) => {
      const urls = HERO_ASSET_URLS[`${meta.name}-${v.w}`];
      if (!urls) return null;
      return { w: v.w, webp: urls.webp, avif: urls.avif };
    })
    .filter((v): v is HeroImageVariant => v !== null)
    .sort((a, b) => a.w - b.w);

  const largest = variants[variants.length - 1];
  return {
    name: meta.name,
    kind: meta.kind,
    aspect: meta.aspect,
    variants,
    fallback: largest?.webp ?? "",
  };
});

/** Build a `srcset` string, e.g. "a.webp 640w, b.webp 1280w". */
export function srcSetFor(image: HeroImage, format: "webp" | "avif"): string {
  return image.variants.map((v) => `${v[format]} ${v.w}w`).join(", ");
}
