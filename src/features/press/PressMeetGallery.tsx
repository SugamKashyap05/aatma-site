import { assetUrl } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * PressMeetGallery — mounts the 3 verified frame grabs from the 14 Jan 2023
 * press meet video into the /press page.
 *
 * Each image uses a <picture> element with AVIF → WebP → JPEG → PNG fallback
 * so every browser gets the smallest format it supports. All paths go through
 * assetUrl() to resolve correctly under the GitHub Pages subpath.
 *
 * IMG-P04 alt transcribes the actual banner text (verified legible).
 *
 * When t_a1c29289 (press-meet video section) lands, IMG-P02 doubles as the
 * <video> poster attribute.
 */

interface FrameGrab {
  slug: string;
  alt: string;
  width: number;
  height: number;
}

const FRAME_GRABS: FrameGrab[] = [
  {
    slug: "aatma-head-office",
    alt: "AATMA head office on Main Road, Hojai — modest building exterior",
    width: 1024,
    height: 1024,
  },
  {
    slug: "IMG-P02_press-meet-hero",
    alt: "Five men seated at a table during the AATMA press meet, with a banner reading PRESS MEET visible behind them",
    width: 1280,
    height: 720,
  },
  {
    slug: "IMG-P03_speakers-table",
    alt: "Six men seated in a wider row at the AATMA press meet speakers table",
    width: 1280,
    height: 720,
  },
  {
    slug: "IMG-P04_banner-detail",
    alt: "Banner detail from the AATMA press meet reading: PRESS MEET — Date - 14th January 2023 (Saturday) Time : 6-00 PM — VENUE : HEAD OFFICE, HOJAI",
    width: 1280,
    height: 240,
  },
];

function FrameImage({ grab }: { grab: FrameGrab }) {
  return (
    <picture>
      <source
        srcSet={assetUrl(`press-meet/${grab.slug}.avif`)}
        type="image/avif"
      />
      <source
        srcSet={assetUrl(`press-meet/${grab.slug}.webp`)}
        type="image/webp"
      />
      <source
        srcSet={assetUrl(`press-meet/${grab.slug}.jpg`)}
        type="image/jpeg"
      />
      <img
        src={assetUrl(`press-meet/${grab.slug}.png`)}
        alt={grab.alt}
        className="w-full h-auto rounded-sm border border-white/10 bg-white/[0.03]"
        loading="lazy"
        decoding="async"
        width={grab.width}
        height={grab.height}
      />
    </picture>
  );
}

export function PressMeetGallery({ className }: { className?: string }) {
  return (
    <section
      aria-label="Press meet photo gallery"
      className={className}
    >
      <Reveal variant="fade" delay={0}>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
          <h3 className="font-display font-bold text-white text-base md:text-lg tracking-wide">
            Press Meet — 14 January 2023
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {FRAME_GRABS.map((grab, i) => (
          <Reveal key={grab.slug} variant="up" delay={i * 120}>
            <figure>
              <FrameImage grab={grab} />
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default PressMeetGallery;
