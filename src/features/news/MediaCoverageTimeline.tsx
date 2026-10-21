import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Globe,
  Newspaper,
  Radio,
  Rss,
} from "lucide-react";
import { getAllNews, type NewsArticle, type OutletType } from "@/data/news";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MediaOutletType = OutletType;

interface MediaCoverageTimelineProps {
  items?: NewsArticle[];
  className?: ClassValue;
  showHeader?: boolean;
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const OUTLET_ICON: Record<MediaOutletType, typeof Globe> = {
  national: Newspaper,
  regional: Globe,
  trade: Rss,
  digital: Radio,
};

/** Long-form date for a card, derived from the verified ISO date on the clipping. */
const dateFormatter = new Intl.DateTimeFormat("en-IN", { dateStyle: "long" });

// ─── Timeline Card ───────────────────────────────────────────────────────────

function CoverageCard({
  article,
  index,
  isLast,
}: {
  article: NewsArticle;
  index: number;
  isLast: boolean;
}) {
  const Icon = OUTLET_ICON[article.outletType];
  const formattedDate = dateFormatter.format(new Date(article.date));
  const pageLabel = article.page ? `, p.${article.page}` : "";

  return (
    <Reveal variant="left" delay={index * 100}>
      <div className="relative pl-8 md:pl-12 pb-8 md:pb-10 last:pb-0 group">
        {/* Connector line */}
        {!isLast && (
          <div
            className="absolute left-[13px] md:left-[17px] top-8 bottom-0 w-px bg-gradient-to-b from-gold/40 via-white/10 to-transparent"
            aria-hidden="true"
          />
        )}

        {/* Dot */}
        <div
          className={cn(
            "absolute left-0 top-1.5 w-[26px] h-[26px] md:w-[34px] md:h-[34px] rounded-full border-2 flex items-center justify-center transition-all duration-300",
            "bg-green-deep group-hover:bg-gold/10 group-active:bg-gold/10",
            "border-gold/50 group-hover:border-gold group-active:border-gold",
          )}
        >
          <Icon size={12} className="text-gold-light" />
        </div>

        {/* Card */}
        <article className="card-hover glass-surface rounded-sm p-4 md:p-5 group-hover:border-gold/25">
          {/* Meta row — verified outlet and date, always shown together */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <Icon size={13} className="text-gold-light" />
              <span className="text-gold-light font-semibold text-xs md:text-sm tracking-wide uppercase">
                {article.outlet}
              </span>
              {article.byline && (
                <span className="text-cream/75 text-xs">· {article.byline}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-cream/75 text-xs">
              <Calendar size={11} />
              <span>
                {formattedDate}
                {pageLabel}
              </span>
            </div>
          </div>

          {/* Title */}
          <h4 className="font-display font-bold text-white text-sm md:text-base leading-snug group-hover:text-gold-light group-active:text-gold-light transition-colors duration-300">
            {article.headline}
          </h4>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="mt-2 text-cream/75 text-sm leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Adjacent-story exclusion — stated plainly when it applies */}
          {article.adjacentStoryExcluded && article.adjacentStoryNote && (
            <p className="mt-3 text-white/45 text-xs leading-relaxed border-l-2 border-gold/40 pl-3">
              {article.adjacentStoryNote}
            </p>
          )}

          {/* Source — link only when a real permalink exists */}
          <div className="mt-4 pt-3 border-t border-white/10">
            {article.sourceUrl ? (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-300",
                  "text-gold-light hover:text-gold-light active:text-gold-light",
                )}
                aria-label={`Read article: ${article.headline}`}
              >
                <ExternalLink size={13} />
                <span>Read Article</span>
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ) : (
              <p className="text-cream/75 text-xs leading-relaxed">
                {article.sourceNote}
              </p>
            )}
          </div>
        </article>
      </div>
    </Reveal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MediaCoverageTimeline({
  items,
  className,
  showHeader = true,
}: MediaCoverageTimelineProps) {
  const articles = items ?? getAllNews();

  return (
    <div className={cn("w-full", className)}>
      {showHeader && (
        <Reveal variant="fade" delay={0}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
            <h3 className="font-display font-bold text-white text-base md:text-lg tracking-wide">
              Media Coverage
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </Reveal>
      )}

      {articles.length === 0 ? (
        <p className="text-cream/75 text-sm">
          No client-supplied coverage has been published yet.
        </p>
      ) : (
        <div className="mt-4">
          {articles.map((article, i) => (
            <CoverageCard
              key={article.id}
              article={article}
              index={i}
              isLast={i === articles.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaCoverageTimeline;
