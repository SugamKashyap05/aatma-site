import { Download, FileText, Calendar, Tag } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { ResourceCategory, ResourceDocument } from "@/data/resources";

// ─── Document Card ───────────────────────────────────────────────────────────

function ResourceDocumentCard({
  doc,
  index,
}: {
  doc: ResourceDocument;
  index: number;
}) {
  const isAvailable = doc.available ?? false;

  return (
    <Reveal variant="up" delay={index * 80}>
      <article className="card-hover group relative h-full flex flex-col bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-sm overflow-hidden">
        {/* Header strip */}
        <div className="px-5 py-2.5 flex items-center justify-between border-b border-white/10 bg-white/[0.04]">
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-gold" />
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-white/70">
              {doc.fileType}
            </span>
          </div>
          <span className="text-white/50 text-xs">{doc.fileSize}</span>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          <h3 className="font-display font-bold text-base md:text-lg leading-snug text-white group-hover:text-gold transition-colors duration-300">
            {doc.title}
          </h3>
          <p className="mt-3 text-white/60 text-sm leading-relaxed flex-1">
            {doc.description}
          </p>

          {/* Metadata row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-white/40 text-xs">
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} />
              {new Date(doc.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            {doc.tags.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <Tag size={12} />
                {doc.tags.slice(0, 3).join(", ")}
              </span>
            )}
          </div>

          {/* Action */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            {isAvailable ? (
              <a
                href={doc.downloadPath}
                download
                className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-white/70 hover:text-gold transition-colors duration-300 group/dl"
                aria-label={`Download ${doc.title}`}
              >
                <Download size={14} />
                <span>Download</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-white/35">
                <FileText size={14} />
                <span>Not yet published</span>
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

// ─── Category Section ────────────────────────────────────────────────────────

interface ResourceCategorySectionProps {
  category: ResourceCategory;
  documents: ResourceDocument[];
}

/**
 * ResourceCategorySection — renders a single category with heading, intro,
 * and a grid of document cards.
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
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" aria-hidden="true" />
          <h2
            id={`${category.id}-heading`}
            className="font-display font-bold text-white text-lg md:text-xl tracking-wide"
          >
            {category.label}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" aria-hidden="true" />
        </div>
        <p className="text-white/60 text-sm md:text-base max-w-2xl mb-8">
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
          <div className="border border-dashed border-white/15 rounded-sm p-8 text-center">
            <p className="text-white/40 text-sm">
              Documents for this category will be published here soon.
            </p>
          </div>
        </Reveal>
      )}
    </section>
  );
}

export default ResourceCategorySection;
