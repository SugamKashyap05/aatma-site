import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import PageLayout from "@/components/ui/PageLayout";
import ResourceNav from "@/features/resources/ResourceNav";
import { ResourceFilter } from "@/features/resources/ResourceFilter";
import { ResourceCategorySection } from "@/features/resources/ResourceCategorySection";
import {
  RESOURCE_CATEGORIES,
  RESOURCE_DOCUMENTS,
  type ResourceDocType,
} from "@/data/resources";

/**
 * ResourceCenterPage — dedicated route for the Resource Center / Downloads page.
 *
 * Groups every published document under its category, with a sticky scroll-spy
 * nav and a type filter. Only documents that trace to a real client or gazette
 * source appear here — see `src/data/resources.ts`.
 */
export function ResourceCenterPage() {
  const [activeFilter, setActiveFilter] = useState<ResourceDocType | "all">("all");

  const counts = useMemo(() => {
    const tally: Record<string, number> = { all: RESOURCE_DOCUMENTS.length };
    for (const doc of RESOURCE_DOCUMENTS) {
      tally[doc.docType] = (tally[doc.docType] ?? 0) + 1;
    }
    return tally;
  }, []);

  const visibleDocuments = useMemo(
    () =>
      activeFilter === "all"
        ? RESOURCE_DOCUMENTS
        : RESOURCE_DOCUMENTS.filter((doc) => doc.docType === activeFilter),
    [activeFilter]
  );

  const visibleCategories = useMemo(
    () =>
      RESOURCE_CATEGORIES.filter((category) =>
        visibleDocuments.some((doc) => doc.category === category.id)
      ),
    [visibleDocuments]
  );

  return (
    <PageLayout
      badge="Resource Center"
      badgeIcon={<Download size={14} />}
      title={
        <>
          Resource <span className="text-gold-light">Center</span>
        </>
      }
      subtitle="Official documents from AATMA and the Government of Assam — press notes, gazette notifications, research papers, and the prescribed registration and CITES forms. Organised by category, downloadable as PDFs."
      heroPaddingBottom="pb-12"
    >
      {/* Main content with sidebar nav */}
      <div className="relative pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-10">
            {/* Sidebar navigation */}
            <ResourceNav categories={visibleCategories} />

            {/* Content sections */}
            <div className="flex-1 min-w-0">
              <ResourceFilter
                active={activeFilter}
                onChange={setActiveFilter}
                counts={counts}
              />

              {visibleCategories.length > 0 ? (
                visibleCategories.map((category) => (
                  <ResourceCategorySection
                    key={category.id}
                    category={category}
                    documents={visibleDocuments.filter(
                      (doc) => doc.category === category.id
                    )}
                  />
                ))
              ) : (
                <p className="text-white/75 text-sm">
                  No documents match this filter.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ResourceCenterPage;
