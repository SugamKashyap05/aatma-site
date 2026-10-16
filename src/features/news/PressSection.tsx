import { cn, assetUrl, type ClassValue } from "@/lib/utils";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import {
  ArrowUpRight,
  Calendar,
  Download,
  FileText,
  Megaphone,
  ScrollText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { MediaCoverageTimeline } from "@/features/news/MediaCoverageTimeline";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PressRelease {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  pdfPath: string;
  fileName: string;
  size: string;
  featured?: boolean;
}



// ─── Data ─────────────────────────────────────────────────────────────────────

const PRESS_RELEASES: PressRelease[] = [
  {
    id: "press-note-2023",
    title: "AATMA Press Note — Assam Wood Based Industries (Promotion and Development) Rules 2022",
    date: "14 January 2023",
    category: "Press Release",
    summary:
      "AATMA expresses extreme gratitude over notification of Assam Wood Based Industries (Promotion and Development) Rules 2022 on 12th January 2023, thanking Hon'ble Chief Minister Dr Himanta Biswa Sarma for visionary leadership.",
    pdfPath: "/press/aatma-press-note-2023-01-14.pdf",
    fileName: "AATMA-Press-Note-2023-01-14.pdf",
    size: "5.6 KB",
    featured: true,
  },
  {
    id: "letter-to-hcm-2023",
    title: "Letter to Hon'ble Chief Minister — Gratitude for Agarwood Trade Revival",
    date: "14 January 2023",
    category: "Official Letter",
    summary:
      "AATMA's letter to Shri Himanta Biswa Sarma ji acknowledging the path-breaking reforms and seeking consent to felicitate him at a public meeting in Hojai.",
    pdfPath: "/press/aatma-letter-to-hcm-2023-01-14.pdf",
    fileName: "AATMA-Letter-to-HCM-2023-01-14.pdf",
    size: "5.7 KB",
  },
];



// ─── Press Release Card ──────────────────────────────────────────────────────

function PressReleaseCard({
  release,
  index,
}: {
  release: PressRelease;
  index: number;
}) {
  return (
    <Reveal
      variant="up"
      delay={index * 120}
      className={cn(
        release.featured && "md:col-span-2",
      )}
    >
      <article
        className={cn(
          "card-hover group relative h-full flex flex-col bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-sm overflow-hidden",
          release.featured && "border-gold/30 bg-white/[0.10]",
        )}
      >
        {/* Category strip */}
        <div
          className={cn(
            "px-5 py-2.5 flex items-center justify-between border-b border-white/10",
            release.featured
              ? "bg-gold/10"
              : "bg-white/[0.04]",
          )}
        >
          <div className="flex items-center gap-2">
            {release.category === "Press Release" ? (
              <Megaphone size={14} className="text-gold" />
            ) : (
              <ScrollText size={14} className="text-gold" />
            )}
            <span
              className={cn(
                "text-xs font-semibold tracking-[0.12em] uppercase",
                release.featured ? "text-gold" : "text-white/70",
              )}
            >
              {release.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <Calendar size={12} />
            <span>{release.date}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          <h3
            className={cn(
              "font-display font-bold leading-snug text-white group-hover:text-gold transition-colors duration-300",
              release.featured ? "text-lg md:text-xl" : "text-base md:text-lg",
            )}
          >
            {release.title}
          </h3>
          <p className="mt-3 text-white/60 text-sm md:text-base leading-relaxed flex-1">
            {release.summary}
          </p>

          {/* Meta + download */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <FileText size={12} />
              <span>PDF</span>
              <span className="text-white/20">|</span>
              <span>{release.size}</span>
            </div>
            <a
              href={assetUrl(release.pdfPath)}
              download={release.fileName}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-300 group/dl min-h-[44px]",
                release.featured
                  ? "text-gold hover:text-gold-light"
                  : "text-white/70 hover:text-gold",
              )}
              aria-label={`Download ${release.title}`}
            >
              <Download size={14} />
              <span>Download</span>
              <ArrowUpRight
                size={12}
                className="transition-transform duration-300 group-hover/dl:translate-x-0.5 group-hover/dl:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Featured badge */}
        {release.featured && (
          <div className="absolute top-2.5 right-2.5">
            <Badge
              variant="default"
              className="text-[10px] tracking-wider uppercase h-5 px-2 shadow-lg"
            >
              Key Release
            </Badge>
          </div>
        )}
      </article>
    </Reveal>
  );
}



// ─── Main Section ─────────────────────────────────────────────────────────────

export function PressSection({
  className,
  deviceTier,
  showHeader = true,
}: {
  className?: ClassValue;
  deviceTier?: "mobile" | "tablet" | "desktop";
  /** Show the section header block (badge, title, subtitle). Default true.
   *  Set false when the enclosing layout already provides a hero (e.g. PageLayout). */
  showHeader?: boolean;
}) {
  const isMobile = deviceTier === "mobile";

  return (
    <section
      id="press"
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20 text-white",
        className,
      )}
    >
      <AmbientMotion
        variant={isMobile ? "fog" : "clouds"}
        theme="light"
        layers={isMobile ? 1 : 2}
        speed={isMobile ? 60 : 50}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08)_0%,rgba(0,0,0,0)_55%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        {showHeader && (
        <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          <Reveal variant="fade" delay={0}>
            <span className="inline-block text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-sm mb-4">
              Press &amp; Media
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl leading-tight mb-6">
              Official communications &amp;{" "}
              <span className="text-gold">media coverage</span>
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              Press releases, official letters, and media coverage of AATMA's
              work — from policy milestones to the sector's revival.
            </p>
          </Reveal>
        </div>
        )}

        {/* Press Release Archive */}
        <div className="max-w-5xl mx-auto mb-16 md:mb-20">
          <Reveal variant="fade" delay={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <h3 className="font-display font-bold text-white text-base md:text-lg tracking-wide">
                Press Release Archive
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </Reveal>

          <Stagger staggerMs={120} className="grid md:grid-cols-2 gap-6">
            {PRESS_RELEASES.map((release, i) => (
              <PressReleaseCard key={release.id} release={release} index={i} />
            ))}
          </Stagger>
        </div>

        {/* Media Coverage Timeline */}
        <div className="max-w-3xl mx-auto">
          <MediaCoverageTimeline />
        </div>
      </div>
    </section>
  );
}

export default PressSection;
