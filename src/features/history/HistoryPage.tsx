import { History } from "lucide-react";
import { Milestones } from "@/features/milestones/Milestones";
import PageLayout from "@/components/ui/PageLayout";
import { useDevice } from "@/context/DeviceContext";

/**
 * History page — dedicated route for the association's milestone timeline.
 * Reuses the Milestones component within a page-level layout.
 */
export function HistoryPage() {
  const { tier } = useDevice();

  return (
    <PageLayout
      badge="Our History"
      badgeIcon={<History size={14} />}
      title={
        <>
          Five decades of <span className="text-gold">progress</span>
        </>
      }
      subtitle="From a meeting of traders in Hojai in 1976 to Assam's first legal export in 2025 — key moments in the association's story."
    >
      <Milestones deviceTier={tier} />
    </PageLayout>
  );
}

export default HistoryPage;
