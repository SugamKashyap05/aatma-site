import { ArrowRight, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { assetUrl } from "@/lib/utils";
import { MediaCoverageTimeline } from "@/features/news/MediaCoverageTimeline";
import { NEWS_ARTICLES, type NewsArticle } from "@/data/news";
import { PressReleaseArchive } from "@/features/press/PressReleaseArchive";
import { PressMeetGallery } from "@/features/press/PressMeetGallery";
import { PressMeetSection } from "@/features/press/PressMeetSection";
import { EVENT_PHOTOS } from "@/data/events";
import { Reveal } from "@/components/ui/reveal";
import PageLayout from "@/components/ui/PageLayout";

/**
 * Composes MediaCoverageTimeline, PressReleaseArchive (downloadable client
 * releases), PressMeetSection, and PressMeetGallery within a PageLayout
 * wrapper. Unsupported placeholder downloads are not presented.
 */
export function PressPage() {
  return (
    <PageLayout
      badge="Press & Media"
      badgeIcon={<Newspaper size={14} />}
      title={
        <>
          Press &amp; <span className="text-gold-light">Media</span>
        </>
      }
      subtitle="Official communications, press releases, and media coverage of AATMA's work — from policy milestones to the sector's revival."
    >
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <MediaCoverageTimeline showHeader={true} />
        </div>
      </div>

      {/* Cross-link: Press → News distinction */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-surface rounded-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-white text-base md:text-lg">
                  Looking for media coverage of AATMA?
                </h3>
                <p className="mt-1.5 text-cream/75 text-sm leading-relaxed max-w-2xl">
                  <span className="text-gold-light font-medium">Press</span> is AATMA's own communications — press releases, official letters, and downloads.{" "}
                  <span className="text-gold-light font-medium">News</span> is external media coverage of AATMA's work and the agarwood sector.
                </p>
              </div>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold-light hover:text-gold-light active:text-gold-light transition-colors duration-300 shrink-0"
              >
                Visit News
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <PressReleaseArchive showHeader={false} />
        </div>
      </div>

      {/* Verified newspaper coverage */}
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
            <h3 className="font-display font-bold text-white text-base md:text-lg tracking-wide">
              Verified press coverage
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
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
                      loading="eager"
                    />
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3 text-xs text-cream/70">
                      <span className="font-semibold uppercase tracking-wide text-gold-light">{article.outlet}</span>
                      <time dateTime={article.date}>{article.date}</time>
                    </div>
                    <h4 className="mt-2 font-display text-base font-semibold text-white">{article.headline}</h4>
                    <p className="mt-2 line-clamp-3 text-sm text-cream/75">{article.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <PressMeetSection />

      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <PressMeetGallery />
        </div>
      </div>

      {/* Event photos */}
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal variant="fade" delay={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <h3 className="font-display font-bold text-white text-base md:text-lg tracking-wide">
                Events &amp; Meetings
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_PHOTOS.map((photo) => (
              <figure
                key={photo.id}
                className="bg-glass-card backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden shadow-2xl"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-48 object-cover"
                  loading="eager"
                  decoding="async"
                />
                <figcaption className="p-4">
                  <div className="text-xs text-gold-light font-medium mb-1">{photo.date}</div>
                  <div className="text-sm text-cream/80 leading-relaxed">{photo.caption}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default PressPage;
