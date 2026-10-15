import { Download } from "lucide-react";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal } from "@/components/ui/reveal";
import ResourceNav from "@/features/resources/ResourceNav";
import { ResourceCategorySection } from "@/features/resources/ResourceCategorySection";
import {
  RESOURCE_CATEGORIES,
  RESOURCE_DOCUMENTS,
} from "@/data/resources";

/**
 * ResourceCenterPage — dedicated route for the Resource Center / Downloads page.
 * Features 5 clearly delineated category sections with sticky scroll-spy nav,
 * responsive layout, and a metadata schema per document for future tagging.
 */
export function ResourceCenterPage() {
  return (
    <PageLayout
      badge="Resource Center"
      badgeIcon={<Download size={14} />}
      title={
        <>
          Resource <span className="text-gold">Center</span>
        </>
      }
      subtitle="Official documents, press notes, policy papers, research publications, and registration forms — organised by category for easy access."
      heroPaddingBottom="pb-12"
    >
      {/* Main content with sidebar nav */}
      <div className="relative pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-10">
            {/* Sidebar navigation */}
            <ResourceNav />

            {/* Content sections */}
            <div className="flex-1 min-w-0">
              {RESOURCE_CATEGORIES.map((category) => {
                const docs = RESOURCE_DOCUMENTS.filter(
                  (d) => d.category === category.id
                );
                return (
                  <ResourceCategorySection
                    key={category.id}
                    category={category}
                    documents={docs}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ResourceCenterPage;
