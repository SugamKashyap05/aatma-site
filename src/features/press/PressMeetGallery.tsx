import { assetUrl } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * PressMeetGallery — mounts the two complete client-supplied frame grabs from the
 * 14 Jan 2023 press meet video into the /press page.
 *
 * Each image uses a <picture> element with WebP → JPEG fallback so every
 * browser gets a supported format. All paths go through
 * assetUrl() to resolve correctly under the GitHub Pages subpath.
 *
 * A third frame, IMG-P04_banner-detail, was removed at the client's request: it
 * was a thin crop (1280x240) in which the banner heading is cut off at both
 * edges and only the tops of the speakers' heads are visible.
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
    slug: "IMG-P02_press-meet-hero",
    alt: "Press-meet attendees seated at a table, with the event banner visible behind them",
    width: 1280,
    height: 720,
  },
  {
    slug: "IMG-P03_speakers-table",
    alt: "A wider view of attendees seated at the AATMA press-meet table",
    width: 1280,
    height: 720,
  },
];

function FrameImage({ grab }: { grab: FrameGrab }) {
  return (
    <picture>
      <source
        srcSet={assetUrl(`press-meet/${grab.slug}.webp`)}
        type="image/webp"
      />
      <source
        srcSet={assetUrl(`press-meet/${grab.slug}.jpg`)}
        type="image/jpeg"
      />
      <img
        src={assetUrl(`press-meet/${grab.slug}.jpg`)}
        alt={grab.alt}
        className="w-full h-auto rounded-sm border border-white/10 bg-white/[0.03]"
        loading="eager"
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
