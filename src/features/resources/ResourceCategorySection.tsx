import { Reveal } from "@/components/ui/reveal";
import type { ResourceCategory, ResourceDocument } from "@/data/resources";
import { ResourceDocumentCard } from "@/features/resources/ResourceDocumentCard";

interface ResourceCategorySectionProps {
  category: ResourceCategory;
  documents: ResourceDocument[];
}

/**
 * ResourceCategorySection — renders a single category with heading, intro and a
 * grid of document cards. Categories with no matching documents render a short
 * empty state rather than disappearing silently.
 */
export function ResourceCategorySection({
  category,
  documents,
}: ResourceCategorySectionProps) {
  return (
    <section
      id={category.id}
      className="relative pb-16 md:pb-20 scroll-mt-24"
      aria-labelledby={`${category.id}-heading`}
    >
      <Reveal variant="fade" delay={0}>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30"
            aria-hidden="true"
          />
          <h2
            id={`${category.id}-heading`}
            className="font-display font-bold text-white text-lg md:text-xl tracking-wide"
          >
            {category.label}
          </h2>
          <div
            className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30"
            aria-hidden="true"
          />
        </div>
        <p className="text-white/70 text-sm md:text-base max-w-2xl mb-8">
          {category.description}
        </p>
      </Reveal>

      {documents.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {documents.map((doc, i) => (
            <ResourceDocumentCard key={doc.id} doc={doc} index={i} />
          ))}
        </div>
      ) : (
        <Reveal variant="fade" delay={100}>
          <div className="border border-dashed border-white/20 rounded-sm p-8 text-center">
            <p className="text-white/70 text-sm">
              No documents of this type in this category.
            </p>
          </div>
        </Reveal>
      )}
    </section>
  );
}

export default ResourceCategorySection;
