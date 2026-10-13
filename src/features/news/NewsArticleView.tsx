import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink } from "lucide-react";
import PageLayout from "@/components/ui/PageLayout";
import NotFoundPage from "@/features/notFound/NotFoundPage";
import { Reveal } from "@/components/ui/reveal";
import { getAllNews, getNewsBySlug } from "@/data/news";

/**
 * NewsArticleView — renders a single news article at /news/:slug.
 *
 * Uses the shared NotFoundPage for unknown slugs, prev/next navigation
 * between articles, and design-token-only styling.
 */
export function NewsArticleView() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getNewsBySlug(slug) : undefined;

  // Document title — restore default on unmount
  useEffect(() => {
    if (article) {
      document.title = article.title;
    }
    return () => {
      document.title = "AATMA";
    };
  }, [article]);

  // 404 — no blank page, no fabricated fallback
  if (!article) {
    return <NotFoundPage />;
  }

  const allArticles = getAllNews();
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const hasPrev = allArticles.length > 1 && currentIndex > 0;
  const hasNext = allArticles.length > 1 && currentIndex < allArticles.length - 1;
  const prevArticle = hasPrev ? allArticles[currentIndex - 1] : null;
  const nextArticle = hasNext ? allArticles[currentIndex + 1] : null;

  const formattedDate = new Date(article.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageLayout badge="News" title={article.title} subtitle={article.excerpt}>
      <section className="relative pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Meta row — date, outlet type, outlet */}
          <Reveal variant="fade" delay={0}>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="inline-flex items-center gap-2 text-cream/70 text-sm">
                <Calendar size={16} className="text-gold" />
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-2 text-gold text-xs font-semibold tracking-[0.15em] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-sm">
                {article.outletType}
              </span>
              <span className="text-cream/50 text-sm">{article.outlet}</span>
            </div>
          </Reveal>

          {/* Article body — prefer full body, fall back to excerpt */}
          <Reveal variant="up" delay={100}>
            {article.body ? (
              <p className="text-cream/80 text-base md:text-lg leading-relaxed whitespace-pre-line">
                {article.body}
              </p>
            ) : (
              <p className="text-cream/80 text-base md:text-lg leading-relaxed italic">
                {article.excerpt}
              </p>
            )}
          </Reveal>

          {/* Source block */}
          <Reveal variant="fade" delay={200}>
            <div className="mt-12 pt-8 border-t border-white/10">
              {article.sourceUrl ? (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors duration-300 text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  Read original article
                </a>
              ) : (
                <p className="text-cream/50 text-sm italic">
                  {article.sourceNote ?? "Source: AATMA"}
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
                    className="inline-flex items-center gap-2 text-cream/70 hover:text-gold transition-colors duration-300 text-sm group"
                  >
                    <ArrowLeft
                      size={16}
                      className="group-hover:-translate-x-1 transition-transform duration-300"
                    />
                    <span>{prevArticle.title}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {nextArticle ? (
                  <Link
                    to={`/news/${nextArticle.slug}`}
                    className="inline-flex items-center gap-2 text-cream/70 hover:text-gold transition-colors duration-300 text-sm group sm:flex-row-reverse"
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                    <span>{nextArticle.title}</span>
                  </Link>
                ) : (
                  <span />
                )}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

export default NewsArticleView;