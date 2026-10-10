import { Newspaper } from "lucide-react";
import { PressSection } from "@/features/news/PressSection";
import PageLayout from "@/components/ui/PageLayout";
import { useDevice } from "@/context/DeviceContext";

/**
 * Press page — dedicated route for press releases and media coverage.
 * Reuses the PressSection component within a page-level layout.
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
    </PageLayout>
  );
}

export default PressPage;
