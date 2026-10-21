import { useState } from "react";
import { Link } from "react-router-dom";
import { cn, assetUrl, type ClassValue } from "@/lib/utils";
import {
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
import { MediaCoverageTimeline } from "@/features/news/MediaCoverageTimeline";
import { PRESS_RELEASES, type PressRelease } from "@/data/press";
import { NEWS_ARTICLES, type NewsArticle } from "@/data/news";

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

          {/* Provenance — which client document this was produced from */}
          <p className="mt-3 text-cream/75 text-xs leading-relaxed">
            Source document: {release.sourceDocument}
          </p>

          {/* Meta + actions */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-cream/75 text-xs">
              <FileText size={12} />
              <span>PDF</span>
              <span className="text-white/20">|</span>
              <span>{release.size}</span>
            </div>
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

// ─── Main Section ─────────────────────────────────────────────────────────────

/**
 * PressSection — the "Press & Media" section, composed from the shared
 * archives.
 *
 * This file used to carry its own hard-coded copy of the press-release list
 * and its own copy of the coverage list. Both now come from
 * `src/data/press.ts` and `src/data/news.ts` so there is one place to change
 * when a client document is added or corrected.
 *
 * Nothing here is site-authored: every release is an AATMA document and every
 * coverage card is a clipping the client supplied.
 */
export function PressSection({
  className,
  showHeader = true,
}: {
  className?: ClassValue;
  deviceTier?: "mobile" | "tablet" | "desktop";
  /** Show the section header block (badge, title, subtitle). Default true.
   *  Set false when the enclosing layout already provides a hero (e.g. PageLayout). */
  showHeader?: boolean;
}) {
  return (
    <section
      id="press"
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20 text-green-deep",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08)_0%,rgba(0,0,0,0)_55%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        {showHeader && (
        <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          <Reveal variant="fade" delay={0}>
            <span className="glass-surface-subtle inline-block text-gold-light text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-4">
              Press &amp; Media
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl leading-tight mb-6">
              Official communications &amp;{" "}
              <span className="text-gold-light">media coverage</span>
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <p className="text-green-deep/80 text-base md:text-lg max-w-2xl mx-auto">
              Press releases and official letters issued by AATMA, alongside
              newspaper coverage of its work — each labelled with the source it
              came from.
            </p>
          </Reveal>
        </div>
        )}

        {/* Press Release Archive */}
        <div className="max-w-5xl mx-auto mb-16 md:mb-20">
          <Reveal variant="fade" delay={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <h3 className="font-display font-bold text-green-deep text-base md:text-lg tracking-wide">
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

        {/* Related verified newspaper coverage */}
        <div className="max-w-5xl mx-auto mb-16 md:mb-20">
          <Reveal variant="fade" delay={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <h3 className="font-display font-bold text-green-deep text-base md:text-lg tracking-wide">
                Verified press coverage
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </Reveal>
          <Stagger staggerMs={120} className="grid md:grid-cols-2 gap-6">
            {NEWS_ARTICLES.map((article: NewsArticle) => (
              <Link
                key={article.id}
                to={`/news/${article.slug}`}
                className="block rounded-sm focus-visible:outline-2 focus-visible:outline-gold focus-visible:-outline-offset-2"
              >
                <article className="card-hover glass-surface h-full overflow-hidden rounded-sm">
                  {article.imagePath && (
                    <img
                      src={assetUrl(article.imagePath)}
                      alt={article.imageAlt ?? article.headline}
                      className="h-44 w-full object-cover border-b border-white/10"
                      loading="lazy"
                    />
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3 text-xs text-cream/70">
                      <span className="font-semibold uppercase tracking-wide text-gold-light">{article.outlet}</span>
                      <time dateTime={article.date}>{article.date}</time>
                    </div>
                    <h4 className="mt-2 font-display text-base font-semibold text-green-deep">{article.headline}</h4>
                    <p className="mt-2 line-clamp-3 text-sm text-cream/75">{article.excerpt}</p>
                  </div>
                </article>
              </Link>
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
