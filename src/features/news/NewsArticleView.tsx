import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, Newspaper, ZoomIn } from "lucide-react";
import PageLayout from "@/components/ui/PageLayout";
import { ClippingLightbox } from "@/components/ui/ClippingLightbox";
import { assetUrl } from "@/lib/utils";
import NotFoundPage from "@/features/notFound/NotFoundPage";
import { Reveal } from "@/components/ui/reveal";
import { AATMA } from "@/data/content";
import { getAllNews, getNewsBySlug } from "@/data/news";

/**
 * NewsArticleView — renders a single clipping at /news/:slug.
 *
 * The page states the verified outlet and date, a generic client-supplied
 * source label, and whether an unrelated neighbouring story was excluded
 * from the checked summary. It uses the shared NotFoundPage for unknown slugs and
 * prev/next navigation between clippings.
 */
export function NewsArticleView() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getNewsBySlug(slug) : undefined;
  const [lightboxOpen, setLightboxOpen] = useState(false);

  /**
   * Per-article metadata. The route-level title is set in App.tsx, so this
   * effect only overrides it while an article is open — and restores the
   * route's own title on unmount rather than the bare "AATMA" the previous
   * cleanup wrote, which was a downgrade from what the route had already set.
   *
   * Declared before the early return below so the hook order never changes
   * between renders of this component instance.
   */
  useEffect(() => {
    if (!article) return;

    const title = `${article.headline} — ${AATMA.shortName}`;
    const description = `${article.outlet}, ${article.date} — a client-supplied newspaper clipping summarized by ${AATMA.shortName}. ${article.excerpt}`;

    document.title = title;

    const upsert = (
      key: "name" | "property",
      attr: string,
      content: string,
    ) => {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${key}="${attr}"]`,
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(key, attr);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    upsert("name", "description", description);
    upsert("property", "og:title", title);
    upsert("property", "og:description", description);
    upsert("property", "og:type", "article");
    upsert(
      "name",
      "article:published_time",
      new Date(article.date).toISOString(),
    );

    return () => {
      document.title = "News & Media Coverage — AATMA";
    };
  }, [article]);

  // 404 — no blank page, no fabricated fallback
  if (!article) {
    return <NotFoundPage />;
  }

  const allArticles = getAllNews();
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const hasPrev = allArticles.length > 1 && currentIndex > 0;
  const hasNext =
    allArticles.length > 1 && currentIndex < allArticles.length - 1;
  const prevArticle = hasPrev ? allArticles[currentIndex - 1] : null;
  const nextArticle = hasNext ? allArticles[currentIndex + 1] : null;

  const formattedDate = new Date(article.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const pageLabel = article.page ? `, page ${article.page}` : "";

  const citationLine = [
    article.outlet,
    article.page ? `page ${article.page}` : null,
    formattedDate,
    article.language,
    article.byline ? `By ${article.byline}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <PageLayout badge="News" title={article.headline} subtitle={article.excerpt}>
      <section className="relative pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Verified source row — outlet and date, always together */}
          <Reveal variant="fade" delay={0}>
            <dl className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 border-b border-white/10 pb-6">
              <div className="flex items-center gap-2">
                <dt className="sr-only">Published in</dt>
                <dd className="inline-flex items-center gap-2 text-gold-light text-xs font-semibold tracking-[0.15em] uppercase">
                  <Newspaper size={14} />
                  {article.outlet}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Published on</dt>
                <dd className="inline-flex items-center gap-2 text-cream/70 text-sm">
                  <Calendar size={16} className="text-gold-light" />
                  {formattedDate}
                  {pageLabel}
                </dd>
              </div>
              {article.byline && (
                <div>
                  <dt className="sr-only">By</dt>
                  <dd className="text-cream/50 text-sm">By {article.byline}</dd>
                </div>
              )}
            </dl>
          </Reveal>

          {/* Provenance — what this text is and where it came from */}
          <Reveal variant="fade" delay={60}>
            <div className="glass-surface mb-10 rounded-sm border border-gold/25 p-4 md:p-5">
              <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                <span className="text-gold-light font-semibold uppercase tracking-[0.12em] text-[11px]">
                  Client-supplied clipping
                </span>
                <br />
                The text below is a checked summary of claims in a
                client-supplied newspaper clipping, not the complete article.
                The outlet and publication date are shown above; the clipping
                scan and an online-archive link are not displayed on this page.
              </p>
            </div>
          </Reveal>

          {/* The clipping itself — the scan is the content */}
          <Reveal variant="up" delay={100}>
            {article.imagePath ? (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="group relative block w-full cursor-zoom-in rounded-sm border border-glass-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-label={`Enlarge the clipping: ${article.headline}`}
              >
                <img
                  src={assetUrl(article.imagePath)}
                  alt={article.imageAlt ?? article.headline}
                  className="w-full rounded-sm transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-green-deep/85 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-green-deep/90 px-2.5 py-1.5 text-xs font-medium text-gold-light">
                    <ZoomIn size={13} aria-hidden="true" focusable="false" />
                    Click to enlarge
                  </span>
                </span>
              </button>
            ) : (
              <p className="text-sm italic text-white/50">
                No scan of this clipping is available to display.
              </p>
            )}
          </Reveal>

          {/* Adjacent-story exclusion — stated when it applies */}
          {article.adjacentStoryExcluded && article.adjacentStoryNote && (
            <Reveal variant="fade" delay={160}>
              <p className="mt-8 text-white/45 text-sm leading-relaxed border-l-2 border-gold/40 pl-4">
                {article.adjacentStoryNote}
              </p>
            </Reveal>
          )}

          {/* Source block */}
          <Reveal variant="fade" delay={200}>
            <div className="mt-12 pt-8 border-t border-white/10">
              {article.sourceUrl ? (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold-light hover:text-gold-light active:text-gold-light transition-colors duration-300 text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  Read original article
                </a>
              ) : (
                <p className="text-cream/50 text-sm italic">
                  {article.sourceNote}
                </p>
              )}
            </div>
          </Reveal>

          {/* Prev / Next navigation */}
          {allArticles.length > 1 && (
            <Reveal variant="fade" delay={300}>
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4">
                {prevArticle ? (
                  <Link
                    to={`/news/${prevArticle.slug}`}
                    className="inline-flex items-center gap-2 text-cream/70 hover:text-gold-light transition-colors duration-300 text-sm group"
                  >
                    <ArrowLeft
                      size={16}
                      className="group-hover:-translate-x-1 group-active:-translate-x-1 transition-transform duration-300"
                    />
                    <span>{prevArticle.headline}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {nextArticle ? (
                  <Link
                    to={`/news/${nextArticle.slug}`}
                    className="inline-flex items-center gap-2 text-cream/70 hover:text-gold-light transition-colors duration-300 text-sm group sm:flex-row-reverse"
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300"
                    />
                    <span>{nextArticle.headline}</span>
                  </Link>
                ) : (
                  <span />
                )}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {article.imagePath && (
        <ClippingLightbox
          open={lightboxOpen}
          src={assetUrl(article.imagePath)}
          alt={article.imageAlt ?? article.headline}
          title={article.headline}
          meta={citationLine}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </PageLayout>
  );
}

export default NewsArticleView;
