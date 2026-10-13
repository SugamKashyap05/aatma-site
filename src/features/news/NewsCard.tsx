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
import { cn, type ClassValue } from "@/lib/utils";
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
 * Renders a single NewsArticle as a glassmorphism card.
 *
 * Wraps the entire card in a react-router Link to `/news/${article.slug}`.
 * The source citation distinguishes between a real permalink (link) and a
 * printed note (plain text) — never links a bare homepage.
 */
export function NewsCard({ article, index = 0, className }: NewsCardProps) {
  const Icon = OUTLET_ICON[article.outletType];
  const formattedDate = dateFormatter.format(new Date(article.date));
  const ariaLabel = `${article.title}, published ${formattedDate} by ${article.outlet}`;

  return (
    <Reveal variant="up" delay={index * 100}>
      <Link
        to={`/news/${article.slug}`}
        aria-label={ariaLabel}
        className="block focus-visible:outline-2 focus-visible:outline-gold focus-visible:-outline-offset-2 rounded-sm"
      >
        <article
          className={cn(
            "card-hover group relative h-full flex flex-col bg-white/[0.07] backdrop-blur-sm border border-white/20 rounded-sm overflow-hidden",
            "transition-all duration-300 hover:border-gold/30",
            className,
          )}
        >
          {/* Header strip */}
          <div className="px-5 py-2.5 flex items-center justify-between border-b border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <Icon size={14} className="text-gold" />
              <span className="text-gold font-semibold text-xs tracking-wide uppercase">
                {article.outlet}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <Calendar size={12} />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-5 md:p-6 flex flex-col">
            <h3 className="font-display font-bold text-white text-base md:text-lg leading-snug group-hover:text-gold transition-colors duration-300">
              {article.title}
            </h3>
            <p className="mt-3 text-white/60 text-sm leading-relaxed flex-1">
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
                    "text-gold hover:text-gold-light",
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
                <p className="text-white/40 text-xs leading-relaxed">
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
