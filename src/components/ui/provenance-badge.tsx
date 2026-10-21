import { BadgeCheck, FileText, Newspaper, PenLine, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PublicationProvenance } from "@/data/books";

/**
 * ProvenanceBadge — distinguishes client publications, client-supplied documents,
 * press estimates, and website-authored summaries.
 */
interface ProvenanceMeta {
  label: string;
  description: string;
  Icon: LucideIcon;
  className: string;
}

const PROVENANCE_META: Record<PublicationProvenance, ProvenanceMeta> = {
  "client-publication": {
    label: "Client publication",
    description: "Client-supplied material reproduced on this site.",
    Icon: BadgeCheck,
    className: "border-gold/50 bg-gold/15 text-white",
  },
  "client-press-estimate": {
    label: "Client-supplied press estimate",
    description: "Reported in a client-supplied news clipping; not an AATMA-authored statistic.",
    Icon: Newspaper,
    className: "border-white/30 bg-white/10 text-white",
  },
  "client-supplied-document": {
    label: "Client-supplied document",
    description: "A source document supplied for this project.",
    Icon: FileText,
    className: "border-white/30 bg-white/10 text-white",
  },
  "site-summary": {
    label: "Site summary",
    description: "Website-authored summary; not a client publication.",
    Icon: PenLine,
    className: "border-white/30 bg-white/10 text-white",
  },
};

/** Short label, e.g. for a data attribute or an aria description. */
export function provenanceLabel(provenance: PublicationProvenance): string {
  return PROVENANCE_META[provenance].label;
}

/** One-line meaning of the label, for screen readers and legends. */
export function provenanceDescription(provenance: PublicationProvenance): string {
  return PROVENANCE_META[provenance].description;
}

export function ProvenanceBadge({
  provenance,
  className,
}: {
  provenance: PublicationProvenance;
  className?: string;
}) {
  const meta = PROVENANCE_META[provenance];
  const { Icon } = meta;

  return (
    <span
      data-provenance={provenance}
      title={meta.description}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
        meta.className,
        className,
      )}
    >
      <Icon size={12} aria-hidden="true" focusable="false" />
      {meta.label}
    </span>
  );
}

/**
 * ProvenanceNote — the badge plus its explanatory sentence, for places with
 * room for a full statement (library header, reader, research cards).
 */
export function ProvenanceNote({
  provenance,
  note,
  className,
}: {
  provenance: PublicationProvenance;
  note: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <ProvenanceBadge provenance={provenance} className="self-start" />
      <p className="text-white/70 text-xs leading-relaxed">{note}</p>
    </div>
  );
}

export default ProvenanceBadge;
