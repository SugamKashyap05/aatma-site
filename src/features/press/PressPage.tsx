import { ArrowRight, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { MediaCoverageTimeline } from "@/features/news/MediaCoverageTimeline";
import { PressDownloads } from "@/features/press/PressDownloads";
import { PressReleaseArchive } from "@/features/press/PressReleaseArchive";
import { PressMeetGallery } from "@/features/press/PressMeetGallery";
import { PressMeetSection } from "@/features/press/PressMeetSection";
import PageLayout from "@/components/ui/PageLayout";
import { useDevice } from "@/context/DeviceContext";

/**
 * Press page — dedicated route for press releases and media coverage.
 * Composes MediaCoverageTimeline, PressReleaseArchive (downloadable releases),
 * PressMeetSection, PressMeetGallery, and PressDownloads within a PageLayout
 * wrapper. Fully independent of the home page.
 */
export function PressPage() {
  const { tier } = useDevice();

  return (
    <PageLayout
      badge="Press & Media"
      badgeIcon={<Newspaper size={14} />}
      title={
        <>
          Press &amp; <span className="text-gold">Media</span>
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
          <div className="border border-gold/20 bg-white/[0.03] rounded-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-white text-base md:text-lg">
                  Looking for media coverage of AATMA?
                </h3>
                <p className="mt-1.5 text-white/60 text-sm leading-relaxed max-w-2xl">
                  <span className="text-gold font-medium">Press</span> is AATMA's own communications — press releases, official letters, and downloads.{" "}
                  <span className="text-gold font-medium">News</span> is external media coverage of AATMA's work and the agarwood sector.
                </p>
              </div>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold hover:text-gold-light transition-colors duration-300 shrink-0"
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
      <PressMeetSection />

      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <PressMeetGallery />
        </div>
      </div>
      <PressDownloads deviceTier={tier} showHeader={false} />
    </PageLayout>
  );
}

export default PressPage;
