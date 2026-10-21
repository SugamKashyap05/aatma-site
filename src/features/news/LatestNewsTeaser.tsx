import { Link } from "react-router-dom";
import { ArrowRight, Newspaper } from "lucide-react";
import { cn, type ClassValue } from "@/lib/utils";
import { getAllNews } from "@/data/news";
import { NewsCard } from "@/features/news/NewsCard";
import { Reveal } from "@/components/ui/reveal";

// ─── Component ────────────────────────────────────────────────────────────────

interface LatestNewsTeaserProps {
  className?: ClassValue;
  /** Number of clippings to show. Default 3. */
  count?: number;
  /** Show the section header block (badge + title + view-all link).
   *  Set false when the enclosing layout already provides a hero. */
  showHeader?: boolean;
}

/**
 * LatestNewsTeaser — compact clipping teaser section.
 *
 * Shows the most recent client-supplied clippings as NewsCards with a "View all
 * news" link to /news. Uses only the verified data in `src/data/news.ts`.
 * Designed for placement on the home page and /press page.
 */
export function LatestNewsTeaser({
  className,
  count = 3,
  showHeader = true,
}: LatestNewsTeaserProps) {
  const latestNews = getAllNews().slice(0, count);

  if (latestNews.length === 0) return null;

  return (
    <section
      id="latest-news"
      className={cn(
        "relative py-16 md:py-24 overflow-hidden scroll-mt-20 text-green-deep",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        {showHeader && (
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-12">
            <Reveal variant="fade" delay={0}>
              <div>
                <span className="inline-flex items-center gap-2 text-gold-light text-sm font-semibold tracking-[0.25em] uppercase mb-3">
                  <Newspaper size={14} />
                  Latest News
                </span>
                <h2 className="font-display font-bold text-xl md:text-3xl leading-tight">
                  Recent <span className="text-gold-light">coverage</span>
                </h2>
              </div>
            </Reveal>
            <Reveal variant="fade" delay={100}>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold-light hover:text-gold-light active:text-gold-light transition-colors duration-300 group min-h-[44px]"
              >
                View all news
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        )}

        {/* News cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestNewsTeaser;
