import { Newspaper } from "lucide-react";
import { PressSection } from "@/features/news/PressSection";
import { LatestNewsTeaser } from "@/features/news/LatestNewsTeaser";
import { PressDownloads } from "@/features/press/PressDownloads";
import { PressReleaseArchive } from "@/features/press/PressReleaseArchive";
import PageLayout from "@/components/ui/PageLayout";
import { useDevice } from "@/context/DeviceContext";

/**
 * Press page — dedicated route for press releases and media coverage.
 * Composes PressSection (press releases + media timeline), PressReleaseArchive
 * (downloadable releases, two of which have real PDFs), and PressDownloads
 * within a PageLayout wrapper. Fully independent of the home page.
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
      <PressSection deviceTier={tier} showHeader={false} />
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <PressReleaseArchive showHeader={false} />
        </div>
      </div>
      <LatestNewsTeaser showHeader={true} />
      <PressDownloads deviceTier={tier} showHeader={false} />
    </PageLayout>
  );
}

export default PressPage;
