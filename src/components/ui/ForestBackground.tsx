import { cn } from "@/lib/utils";
import {
  FOREST_DESKTOP_CROPS,
  FOREST_FALLBACK_COLOR,
  FOREST_FULL,
  FOREST_MOBILE_CROPS,
  FOREST_SMALL_CROPS,
  FOREST_TABLET_CROPS,
} from "@/assets/backgrounds";

/**
 * ForestBackground — decorative shell layer with the Kaziranga photograph.
 *
 * Renders a responsive <picture> with AVIF → WebP → JPEG fallback, a
 * solid-color base (#1a3c2a) for no-image scenarios, and an optional
 * high-contrast overlay. The component is always aria-hidden — it is a
 * decorative layer, never a reading surface.
 *
 * OVERLAY VARIANTS:
 * - "green"  — deep-green wash for dark sections (default)
 * - "cream"  — warm cream wash for light sections
 * - "none"   — no overlay (use only when the parent provides its own)
 *
 * FOCAL POSITIONING:
 * The `focal` prop maps to CSS object-position so the crop can be tuned
 * per section (e.g. "center", "top", "bottom", "left", "right").
 */

export interface ForestBackgroundProps {
  /** Overlay variant — "green" (dark sections), "cream" (light), or "none". */
  overlay?: "green" | "cream" | "none";
  /** Focal position for the image crop. */
  focal?: "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Additional classes on the wrapper. */
  className?: string;
  /** z-index of the background layer (default -10, behind content). */
  zIndex?: number;
  /** Load immediately for above-the-fold heroes; defer elsewhere. */
  loading?: "eager" | "lazy";
}

function cropFor(
  images: typeof FOREST_DESKTOP_CROPS,
  focal: NonNullable<ForestBackgroundProps["focal"]>,
) {
  return images.find((image) => image.crop === focal) ?? images[0];
}

function srcSetFor(image: (typeof FOREST_FULL)[number], format: "avif" | "webp") {
  return image.variants
    .map((variant) => `${variant[format]} ${variant.w}w`)
    .join(", ");
}

export function ForestBackground({
  overlay = "green",
  focal = "center",
  className,
  zIndex = -10,
  loading = "lazy",
}: ForestBackgroundProps) {
  const desktop = cropFor(FOREST_DESKTOP_CROPS, focal);
  const tablet = cropFor(FOREST_TABLET_CROPS, focal);
  const mobile = cropFor(FOREST_MOBILE_CROPS, focal);
  const small = cropFor(FOREST_SMALL_CROPS, focal);
  const responsive = [
    { media: "(max-width: 480px)", image: small },
    { media: "(max-width: 767px)", image: mobile },
    { media: "(max-width: 1024px)", image: tablet },
    { media: "(min-width: 1025px)", image: desktop },
  ];

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ zIndex }}
    >
      {/* Solid-color fallback — always the base layer */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: FOREST_FALLBACK_COLOR }}
      />

      {/* Responsive image with AVIF → WebP → JPEG fallback */}
      <picture className="absolute inset-0 h-full w-full">
        {responsive.flatMap(({ media, image }) => [
          <source
            key={`${media}-avif`}
            media={media}
            type="image/avif"
            srcSet={srcSetFor(image, "avif")}
            sizes="100vw"
          />,
          <source
            key={`${media}-webp`}
            media={media}
            type="image/webp"
            srcSet={srcSetFor(image, "webp")}
            sizes="100vw"
          />,
          <source
            key={`${media}-jpeg`}
            media={media}
            type="image/jpeg"
            srcSet={image.fallback}
            sizes="100vw"
          />,
        ])}
        <source type="image/avif" srcSet={srcSetFor(FOREST_FULL[0], "avif")} />
        <source type="image/webp" srcSet={srcSetFor(FOREST_FULL[0], "webp")} />
        <img
          src={FOREST_FULL[0].fallback}
          alt=""
          width={FOREST_FULL[0].variants[0]?.w}
          height={FOREST_FULL[0].variants[0]
            ? Math.round(FOREST_FULL[0].variants[0].w / FOREST_FULL[0].aspect)
            : undefined}
          loading={loading}
          fetchPriority={loading === "eager" ? "high" : "auto"}
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </picture>

      {/* High-contrast overlay — keeps text legible over the image */}
      {overlay === "green" && (
        <div className="absolute inset-0 forest-overlay-green" />
      )}
      {overlay === "cream" && (
        <div className="absolute inset-0 forest-overlay-cream" />
      )}
    </div>
  );
}

export default ForestBackground;
