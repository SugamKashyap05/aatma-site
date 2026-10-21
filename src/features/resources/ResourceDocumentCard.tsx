import { useState } from "react";
import { Download, FileText, Calendar, Tag } from "lucide-react";
import { assetUrl } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import DocumentPreviewModal from "@/components/ui/DocumentPreviewModal";
import type { ResourceDocument } from "@/data/resources";

/** Format an ISO date for display; returns null when the source is undated. */
function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * ResourceDocumentCard — a single downloadable document.
 *
 * Emits `data-doc-type`, `data-doc-category` and `data-doc-id` so the document
 * set can be queried and filtered from outside React as well as in the UI.
 */
export function ResourceDocumentCard({
  doc,
  index,
}: {
  doc: ResourceDocument;
  index: number;
}) {
  const isAvailable = (doc.available ?? false) && Boolean(doc.downloadPath);
  const fileName = doc.downloadPath?.split("/").pop();
  const dateLabel = formatDate(doc.date);
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <Reveal variant="up" delay={Math.min(index, 4) * 80}>
      <article
        data-doc-type={doc.docType}
        data-doc-category={doc.category}
        data-doc-id={doc.id}
        className="card-hover glass-card group relative h-full flex flex-col rounded-sm overflow-hidden"
      >
        {/* Header strip — file type + size */}
        <div className="px-5 py-2.5 flex items-center justify-between gap-3 border-b border-white/10 bg-glass-surface-subtle">
          <div className="flex items-center gap-2">
            <FileText
              size={14}
              className="text-gold-light shrink-0"
              aria-hidden="true"
              focusable="false"
            />
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-white/75">
              {doc.fileType}
              {doc.pageCount ? ` · ${doc.pageCount} pp` : ""}
            </span>
          </div>
          <span className="text-white/70 text-xs shrink-0">{doc.fileSize}</span>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          <h3 className="font-display font-bold text-base md:text-lg leading-snug text-white group-hover:text-gold-light group-active:text-gold-light transition-colors duration-300">
            {doc.title}
          </h3>
          <p className="mt-3 text-white/75 text-sm leading-relaxed flex-1">
            {doc.description}
          </p>

          {/* Metadata row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-white/65 text-xs">
            {dateLabel && (
              <span className="inline-flex items-center gap-1">
                <Calendar size={12} aria-hidden="true" focusable="false" />
                {dateLabel}
              </span>
            )}
            {doc.tags.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <Tag size={12} aria-hidden="true" focusable="false" />
                {doc.tags.slice(0, 3).join(", ")}
              </span>
            )}
          </div>

          {/* Provenance */}
          <p className="mt-3 text-white/70 text-xs italic">Source: {doc.source}</p>

          {/* Action */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            {isAvailable ? (
              <>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(true)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-white/85 hover:text-gold-light transition-colors duration-300 min-h-[44px] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-0"
                    aria-label={`Preview ${doc.title} — ${doc.fileType}, ${doc.fileSize}`}
                  >
                    <FileText size={14} aria-hidden="true" focusable="false" />
                    <span>Preview</span>
                  </button>
                  <a
                    href={assetUrl(doc.downloadPath as string)}
                    download={fileName}
                    className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-white/70 hover:text-gold-light transition-colors duration-300 min-h-[44px] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-0"
                    aria-label={`Download ${doc.title} — ${doc.fileType}, ${doc.fileSize}`}
                  >
                    <Download size={14} aria-hidden="true" focusable="false" />
                    <span>Download</span>
                  </a>
                </div>
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-cream/75">
                <FileText size={14} aria-hidden="true" focusable="false" />
                <span>Not yet published</span>
              </span>
            )}
          </div>
        </div>

        {/* Preview modal */}
        {isAvailable && (
          <DocumentPreviewModal
            open={previewOpen}
            title={doc.title}
            pdfUrl={assetUrl(doc.downloadPath as string)}
            fileName={fileName}
            meta={
              [dateLabel, doc.pageCount ? `${doc.pageCount} pages` : null]
                .filter(Boolean)
                .join(" · ") || undefined
            }
            onClose={() => setPreviewOpen(false)}
          />
        )}
      </article>
    </Reveal>
  );
}

export default ResourceDocumentCard;
