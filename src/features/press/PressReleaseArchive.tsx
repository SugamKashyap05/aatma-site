import { useState } from "react";
import { cn, assetUrl, type ClassValue } from "@/lib/utils";
import {
  ArrowUpRight,
  Calendar,
  Download,
  Eye,
  FileText,
  Megaphone,
  ScrollText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger } from "@/components/ui/reveal";
import DocumentPreviewModal from "@/components/ui/DocumentPreviewModal";
import { PRESS_RELEASES, type PressRelease } from "@/data/press";

// ─── Press Release Card ──────────────────────────────────────────────────────

function PressReleaseCard({
  release,
  index,
}: {
  release: PressRelease;
  index: number;
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  return (
    <Reveal
      variant="up"
      delay={index * 120}
      className={cn(release.featured && "md:col-span-2")}
    >
      <article
        className={cn(
          "card-hover glass-surface group relative h-full flex flex-col rounded-sm overflow-hidden",
          release.featured && "border-gold/40 bg-glass-surface-hover",
        )}
      >
        {/* Category strip */}
        <div
          className={cn(
            "px-5 py-2.5 flex items-center justify-between border-b border-white/10",
            release.featured ? "bg-gold/10" : "bg-glass-surface-subtle",
          )}
        >
          <div className="flex items-center gap-2">
            {release.category === "Press Release" ? (
              <Megaphone size={14} className="text-gold-light" />
            ) : (
              <ScrollText size={14} className="text-gold-light" />
            )}
            <span
              className={cn(
                "text-xs font-semibold tracking-[0.12em] uppercase",
                release.featured ? "text-gold-light" : "text-white/70",
              )}
            >
              {release.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-cream/75 text-xs">
            <Calendar size={12} />
            <span>{release.date}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          <h3
            className={cn(
              "font-display font-bold leading-snug text-white group-hover:text-gold-light group-active:text-gold-light transition-colors duration-300",
              release.featured ? "text-lg md:text-xl" : "text-base md:text-lg",
            )}
          >
            {release.title}
          </h3>
          <p className="mt-3 text-cream/75 text-sm md:text-base leading-relaxed flex-1">
            {release.summary}
          </p>

          {/* Meta + actions */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-cream/75 text-xs">
              <FileText size={12} />
              <span>PDF</span>
              <span className="text-white/20">|</span>
              <span>{release.size}</span>
            </div>
            {release.available ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-300 group/preview min-h-[44px] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-0"
                >
                  <Eye size={14} />
                  <span>Preview</span>
                </button>
                <a
                  href={assetUrl(release.pdfPath)}
                  download={release.fileName}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-300 group/dl min-h-[44px] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-0",
                    release.featured
                      ? "text-gold-light hover:text-gold-light active:text-gold-light"
                      : "text-white/70 hover:text-gold-light",
                  )}
                  aria-label={`Download ${release.title}`}
                >
                  <Download size={14} />
                  <span>Download</span>
                </a>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-white/35">
                <FileText size={14} />
                <span>Not yet published</span>
              </span>
            )}
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

        {/* Preview modal */}
        {release.available && (
          <DocumentPreviewModal
            open={previewOpen}
            title={release.title}
            pdfUrl={assetUrl(release.pdfPath)}
            fileName={release.fileName}
            meta={`PDF · ${release.size}`}
            onClose={() => setPreviewOpen(false)}
          />
        )}
      </article>
    </Reveal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * PressReleaseArchive — AATMA's own publications.
 *
 * Every entry is a document the association issued; the list lives in
 * `src/data/press.ts` so the /press page and the homepage teaser cannot drift
 * apart. Cards state the client document each release was produced from.
 */
export function PressReleaseArchive({
  releases = PRESS_RELEASES,
  className,
  showHeader = true,
}: {
  releases?: PressRelease[];
  className?: ClassValue;
  showHeader?: boolean;
}) {
  return (
    <div className={cn("max-w-5xl mx-auto", className)}>
      {showHeader && (
        <Reveal variant="fade" delay={0}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
            <h3 className="font-display font-bold text-white text-base md:text-lg tracking-wide">
              Press Release Archive
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </Reveal>
      )}

      <Stagger staggerMs={120} className="grid md:grid-cols-2 gap-6">
        {releases.map((release, i) => (
          <PressReleaseCard key={release.id} release={release} index={i} />
        ))}
      </Stagger>
    </div>
  );
}

export default PressReleaseArchive;
