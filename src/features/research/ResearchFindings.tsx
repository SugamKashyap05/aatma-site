import { useState } from "react";
import { Eye, FileText, MapPinned, Scale, TrendingUp } from "lucide-react";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";
import { assetUrl } from "@/lib/utils";
import DocumentPreviewModal from "@/components/ui/DocumentPreviewModal";

const SOURCE = "The Assam Tribune, 18 November 2024 — client-supplied clipping";

const POLICY_DOCUMENTS = [
  {
    label: "Wood-Based Industries Rules, 2022 (Assam Gazette, 12 Jan 2023)",
    href: "resources/wbi-rules-2022-gazette.pdf",
  },
  {
    label: "Trees Outside Forest Rules, 2022 (Assam Gazette)",
    href: "resources/tof-rules-2022-gazette.pdf",
  },
];

/** Additional reported findings not shown in the five data charts. */
export function ResearchFindings() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<{ label: string; href: string } | null>(null);
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 md:pb-28" aria-labelledby="research-findings-heading">
      <div className="mb-8 max-w-3xl">
        <h2 id="research-findings-heading" className="font-display text-2xl font-bold text-white md:text-3xl">
          Reported policy, quota &amp; compliance findings
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-cream/75">
          These additional points are reported in the client-supplied newspaper clipping. They are press claims, not independently audited AATMA data.
        </p>
        <ProvenanceBadge provenance="client-press-estimate" className="mt-4" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="glass-card rounded-sm p-5 md:p-6">
          <div className="flex items-center gap-3">
            <Scale className="text-gold-light" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold text-white">Export quota reported for Assam</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-cream/80">
            <li>79% of the national export quota for agarwood and agar oil.</li>
            <li>1.194 lakh kg of agarwood chips per year.</li>
            <li>5,560 kg of agar oil per year.</li>
          </ul>
          <p className="mt-4 text-xs text-cream/70">Source: {SOURCE}. Quota figures are reported by the article as based on the NDF study.</p>
        </article>

        <article className="glass-card rounded-sm p-5 md:p-6">
          <div className="flex items-center gap-3">
            <FileText className="text-gold-light" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold text-white">NDF and conservation context</h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            The newspaper reports that the Ministry of Environment, Forest and Climate Change commissioned a Non-detriment Findings study, submitted by the Botanical Survey of India in February 2024. It also reports agarwood's IUCN Critically Endangered status and CITES Appendix II listing.
          </p>
          <p className="mt-4 text-xs text-cream/70">Source: {SOURCE}. This card reports the article's account; it is not a substitute for the underlying NDF or conservation-listing documents.</p>
        </article>

        <article className="glass-card rounded-sm p-5 md:p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-gold-light" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold text-white">International price estimates</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-cream/80">
            <li>High-quality agarwood: about ₹1 lakh per kg.</li>
            <li>Agar oil: up to ₹80,000 per kg.</li>
          </ul>
          <p className="mt-4 text-xs text-cream/70">Source: {SOURCE}. The report separately gives domestic ranges in the chart above; these estimates are not directly interchangeable.</p>
        </article>

        <article className="glass-card rounded-sm p-5 md:p-6">
          <div className="flex items-center gap-3">
            <MapPinned className="text-gold-light" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold text-white">Proposed trade centre</h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            The article reports a plan to establish an Assam Agar International Trade Centre in Golaghat district, with the stated aim of giving farmers and traders direct access to national and international buyers.
          </p>
          <p className="mt-4 text-xs text-cream/70">Source: {SOURCE}. This is reported as a plan, not as a completed facility.</p>
        </article>

        <article className="glass-card rounded-sm p-5 md:p-6">
          <div className="flex items-center gap-3">
            <FileText className="text-gold-light" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold text-white">Registration issue reported</h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            The article describes industry response to the rules as tepid and reports that many existing units had yet to register. It attributes tax evasion and reduced profits for farmers and traders to the situation.
          </p>
          <p className="mt-4 text-xs text-cream/70">Source: {SOURCE}. These are statements reported by the newspaper, not independently verified measurements.</p>
        </article>
      </div>

      <div className="mt-8 glass-card rounded-sm p-5 md:p-6">
        <h3 className="font-display text-lg font-semibold text-white">Client-supplied policy documents</h3>
        <p className="mt-2 text-sm leading-relaxed text-cream/75">
          The client-supplied gazette scans are linked here and listed in Resources.
        </p>
        <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {POLICY_DOCUMENTS.map((document) => (
            <li key={document.href}>
              <button
                type="button"
                onClick={() => {
                  setPreviewDoc(document);
                  setPreviewOpen(true);
                }}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-sm border border-glass-border px-4 py-2 text-sm text-cream hover:text-gold-light hover:border-gold/30 transition-colors focus-visible:outline-2 focus-visible:outline-gold-light"
              >
                <Eye size={14} />
                {document.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {previewDoc && (
        <DocumentPreviewModal
          open={previewOpen}
          title={previewDoc.label}
          pdfUrl={assetUrl(previewDoc.href)}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </section>
  );
}
