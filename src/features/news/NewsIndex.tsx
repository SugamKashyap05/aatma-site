import { useMemo, useState } from "react";
import { Newspaper } from "lucide-react";
import { PageLayout } from "@/components/ui/PageLayout";
import { getAllNews, type OutletType } from "@/data/news";
import { NewsCard } from "@/features/news/NewsCard";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type OutletFilter = "all" | OutletType;
type YearFilter = "all" | string;

// ─── Constants ───────────────────────────────────────────────────────────────

const OUTLET_OPTIONS: { value: OutletFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "national", label: "National" },
  { value: "regional", label: "Regional" },
  { value: "trade", label: "Trade" },
  { value: "digital", label: "Digital" },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * NewsIndex — the `/news` index page.
 *
 * Every card represents a client-supplied clipping with a checked claim summary
 * in `src/data/news.ts`. Full article scans are not rendered. Each item carries
 * a verified outlet and date, and none of the summary copy is presented as a
 * complete article. Two independent filter groups (outlet type and year)
 * intersect to narrow results, and an aria-live region announces the count.
 */
export function NewsIndex() {
  const [selectedOutlet, setSelectedOutlet] = useState<OutletFilter>("all");
  const [selectedYear, setSelectedYear] = useState<YearFilter>("all");

  // Fetch and sort articles newest-first
  const allArticles = useMemo(() => getAllNews(), []);

  // Derive available years dynamically (unique, descending)
  const availableYears = useMemo(() => {
    const years = new Set(
      allArticles.map((a) => new Date(a.date).getFullYear().toString()),
    );
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [allArticles]);

  // Filter by outlet type AND year (intersection)
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesOutlet =
        selectedOutlet === "all" || article.outletType === selectedOutlet;
      const matchesYear =
        selectedYear === "all" ||
        new Date(article.date).getFullYear().toString() === selectedYear;
      return matchesOutlet && matchesYear;
    });
  }, [allArticles, selectedOutlet, selectedYear]);

  // Build year options: "All" + each available year
  const yearOptions = useMemo(
    () => [
      { value: "all" as YearFilter, label: "All" },
      ...availableYears.map((y) => ({ value: y as YearFilter, label: y })),
    ],
    [availableYears],
  );

  return (
    <PageLayout
      badge="News & Media"
      badgeIcon={<Newspaper size={14} />}
      title={
        <>
          News &amp; <span className="text-gold-light">Media</span>
        </>
      }
      subtitle="Selected checked claims from the newspaper clippings in the association's archive. Full article scans are not displayed."
    >
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* ── Provenance note ──────────────────────────────────────── */}
          <p className="text-cream/50 text-sm leading-relaxed mb-10 max-w-3xl">
            Each entry is based on a clipping from the association's archive and shows
            the verified outlet and publication date. The text is a checked
            summary, not a complete article transcription, and original scans
            are not displayed. Any unrelated neighbouring story is excluded
            from the summary and identified on that entry.
          </p>

          {/* ── Filter controls ─────────────────────────────────────── */}
          <div className="mb-10 space-y-4">
            {/* Outlet type filter */}
            <div>
              <span className="block text-xs font-semibold tracking-[0.15em] uppercase text-cream/50 mb-2">
                Outlet Type
              </span>
              <div
                role="tablist"
                aria-label="Filter by outlet type"
                className="flex flex-wrap gap-2"
              >
                {OUTLET_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    role="tab"
                    aria-selected={selectedOutlet === option.value}
                    onClick={() => setSelectedOutlet(option.value)}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-sm border transition-colors duration-200",
                      selectedOutlet === option.value
                        ? "bg-gold text-green-deep border-gold"
                        : "bg-glass-surface-subtle text-cream/70 border-glass-border hover:border-gold/30 hover:text-cream",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Year filter */}
            <div>
              <span className="block text-xs font-semibold tracking-[0.15em] uppercase text-cream/50 mb-2">
                Year
              </span>
              <div
                role="tablist"
                aria-label="Filter by year"
                className="flex flex-wrap gap-2"
              >
                {yearOptions.map((option) => (
                  <button
                    key={option.value}
                    role="tab"
                    aria-selected={selectedYear === option.value}
                    onClick={() => setSelectedYear(option.value)}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-sm border transition-colors duration-200",
                      selectedYear === option.value
                        ? "bg-gold text-green-deep border-gold"
                        : "bg-glass-surface-subtle text-cream/70 border-glass-border hover:border-gold/30 hover:text-cream",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Result count (aria-live) ────────────────────────────── */}
          <p aria-live="polite" className="text-cream/50 text-sm mb-6">
            Showing {filteredArticles.length} clipping
            {filteredArticles.length !== 1 ? "s" : ""}
          </p>

          {/* ── Article grid / empty state ──────────────────────────── */}
          {filteredArticles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-cream/50 text-base">
                No newspaper clipping matches this filter yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

export default NewsIndex;
