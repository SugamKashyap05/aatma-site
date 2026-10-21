import { Link } from "react-router-dom";
import type { NewsArticle } from "@/data/news";
import {
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Globe,
  Newspaper,
  Radio,
  Rss,
} from "lucide-react";
import { cn, assetUrl, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

// ─── Icon map ─────────────────────────────────────────────────────────────────
// Mirrors the outlet-type → icon mapping in MediaCoverageTimeline.tsx.
const OUTLET_ICON: Record<NewsArticle["outletType"], typeof Globe> = {
  national: Newspaper,
  regional: Globe,
  trade: Rss,
  digital: Radio,
};

// ─── Date formatter ───────────────────────────────────────────────────────────
const dateFormatter = new Intl.DateTimeFormat("en-IN", { dateStyle: "long" });

// ─── Component ────────────────────────────────────────────────────────────────

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
  className?: ClassValue;
}

/**
 * Renders a single client-supplied clipping's checked summary as a glassmorphism card.
 *
 * Wraps the entire card in a react-router Link to `/news/${article.slug}`.
 * The header always pairs the verified outlet with the verified date, and the
 * source block distinguishes a real permalink (link) from a printed citation
 * (plain text) — never a bare homepage standing in for a citation.
 */
export function NewsCard({ article, index = 0, className }: NewsCardProps) {
  const Icon = OUTLET_ICON[article.outletType];
  const formattedDate = dateFormatter.format(new Date(article.date));
  const pageLabel = article.page ? `, p.${article.page}` : "";
  const ariaLabel = `${article.headline}, published ${formattedDate} by ${article.outlet}`;

  return (
    <Reveal variant="up" delay={index * 100}>
      <Link
        to={`/news/${article.slug}`}
        aria-label={ariaLabel}
        className="block focus-visible:outline-2 focus-visible:outline-gold focus-visible:-outline-offset-2 rounded-sm"
      >
        <article
          className={cn(
            "card-hover glass-surface group relative h-full flex flex-col rounded-sm overflow-hidden",
            "transition-all duration-300 hover:border-gold/30",
            className,
          )}
        >
          {/* Header strip — verified outlet and date together */}
          <div className="px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-glass-surface-subtle">
            <div className="flex items-center gap-2">
              <Icon size={14} className="text-gold-light" />
              <span className="text-gold-light font-semibold text-xs tracking-wide uppercase">
                {article.outlet}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-cream/75 text-xs">
              <Calendar size={12} />
              <span>
                {formattedDate}
                {pageLabel}
              </span>
            </div>
          </div>

          {/* Clipping preview image */}
          {article.imagePath && (
            <div className="px-5 pt-4">
              <img
                src={assetUrl(article.imagePath)}
                alt={article.imageAlt ?? article.headline}
                className="w-full h-48 object-cover rounded-sm border border-white/10"
                loading="eager"
              />
            </div>
          )}

          {/* Body */}
          <div className="flex-1 p-5 md:p-6 flex flex-col">
            <h3 className="font-display font-bold text-green-deep text-base md:text-lg leading-snug group-hover:text-gold-deep group-active:text-gold-deep transition-colors duration-300">
              {article.headline}
            </h3>
            <p className="mt-3 text-cream/75 text-sm leading-relaxed flex-1">
              {article.excerpt}
            </p>

            {/* Source */}
            <div className="mt-5 pt-4 border-t border-white/10">
              {article.sourceUrl ? (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-300",
                    "text-gold-light hover:text-gold-light active:text-gold-light",
                  )}
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
          </div>
        </article>
      </Link>
    </Reveal>
  );
}

export default NewsCard;
