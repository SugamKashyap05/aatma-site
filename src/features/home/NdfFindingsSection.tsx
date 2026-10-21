import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { TreePine, MapPin, Microscope, Globe } from "lucide-react";

/**
 * NdfFindingsSection — Non-Detriment Findings (NDF) on agar trees.
 *
 * Every figure here traces to the client's latest brief,
 * `documents/A brief note on Agar Trade (2).docx` §8 — "NON-DETRIMENT FINDINGS
 * OF AGAR TREES (AQULARIA MALACCENSIS)" — which is the brief the client
 * directive says to use. The section-by-section comparison is recorded in
 * docs/BRIEF_COMPARISON_REPORT.md §3.5; the same facts are independently
 * corroborated by The Assam Tribune, 18 November 2024
 * (docs/CLIENT_MATERIAL_RESEARCH.md §1).
 *
 * Wording note: the brief's own qualifier on the tree count — ">2 years of age
 * & >10 cm GBH" — is kept, because a population figure without its measurement
 * threshold is misleading. The brief also names the NDF methodology
 * ("CITES Non-detriment Findings Guidance for Perennial Plants", Wolf et al
 * 2016); that citation is dropped here for length only, not for lack of a
 * source.
 *
 * Ledger note: docs/APPROVED_CONTENT_LEDGER.md §9 originally marked this whole
 * section `exclude` because its source key omitted brief (2). That was a gap in
 * the ledger, not in this copy; §9 and the source key are corrected alongside
 * this component. Nothing here is web-sourced.
 *
 * The section displays source-backed copy and figures only; project-created
 * photo-style illustrations are excluded from the client presentation.
 */

interface FactItem {
  icon: typeof TreePine;
  label: string;
  description: string;
  /** Short provenance string rendered under the description. */
  source: string;
}

/** Primary source for every NDF figure in this section. */
const BRIEF_SOURCE = "A brief note on Agar Trade (2).docx §8 — NDF of agar trees";
const TRIBUNE_SOURCE = "The Assam Tribune, 18 November 2024";

const FACTS: FactItem[] = [
  {
    icon: TreePine,
    label: "1143.7 Lakh",
    description:
      "Cultivated agar tree population in Assam (trees over 2 years of age and over 10 cm GBH)",
    source: BRIEF_SOURCE,
  },
  {
    icon: MapPin,
    label: "5 Districts",
    description:
      "Golaghat, Jorhat, Sibsagar, Karimganj and Cachar — the districts with the major cultivated agar tree population",
    source: BRIEF_SOURCE,
  },
  {
    icon: Microscope,
    label: "BSI Study",
    description:
      "Commissioned by MoEF&CC, carried out by the Botanical Survey of India — report submitted February 2024",
    source: BRIEF_SOURCE,
  },
  {
    icon: Globe,
    label: "CITES App. II",
    description: "Listed under Appendix-II with effect from 16 February 1995",
    source: BRIEF_SOURCE,
  },
];

function FactCard({ fact, index }: { fact: FactItem; index: number }) {
  const Icon = fact.icon;
  return (
    <Reveal
      variant="up"
      delay={index * 80}
      className="flex items-start gap-4 bg-white rounded-xl border border-cream-dark shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 transition-all duration-300 hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] active:shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
    >
      <div className="w-12 h-12 rounded-xl bg-[linear-gradient(135deg,var(--color-green-mid),var(--color-green-deep))] flex items-center justify-center text-cream flex-shrink-0">
        <Icon className="w-6 h-6" aria-hidden="true" focusable="false" />
      </div>
      <div className="min-w-0">
        <strong className="block text-green-deep font-display font-bold text-lg leading-tight">
          {fact.label}
        </strong>
        <span className="block text-text-mute text-sm leading-snug">
          {fact.description}
        </span>
        <span className="mt-1.5 block text-xs italic leading-snug text-text-mute">
          Source: {fact.source}
        </span>
      </div>
    </Reveal>
  );
}

export function NdfFindingsSection({ className }: { className?: ClassValue }) {
  return (
    <section
      id="ndf-findings"
      className={cn(
        "relative py-20 md:py-28 scroll-mt-20 overflow-hidden",
        className,
      )}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.05)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ---- Left: text content + images ---- */}
          <div>
            <Reveal variant="fade" delay={0}>
              <span className="inline-block text-gold-deep text-sm font-semibold tracking-[0.25em] uppercase mb-4">
                Research
              </span>
            </Reveal>

            <Reveal variant="up" delay={100}>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal mb-6">
                Non-Detriment Findings
              </h2>
            </Reveal>

            <Reveal variant="fade" delay={200}>
              <p className="text-text-mute text-base md:text-lg leading-relaxed mb-5">
                MoEF&amp;CC commissioned the NDF Study through the Botanical
                Survey of India (BSI), and the BSI submitted its report in
                February 2024.
              </p>
            </Reveal>

            <Reveal variant="fade" delay={300}>
              <p className="text-text-mute text-base md:text-lg leading-relaxed mb-8">
                <em className="text-charcoal font-medium">
                  Aquilaria malaccensis
                </em>{" "}
                is listed as a Critically Endangered (CR) species in the IUCN
                Red List of Threatened Species, and under CITES Appendix-II
                with effect from 16 February 1995.
              </p>
            </Reveal>

          </div>

          {/* ---- Right: fact cards ---- */}
          <div className="flex flex-col gap-4">
            {FACTS.map((fact, i) => (
              <FactCard key={fact.label} fact={fact} index={i} />
            ))}
          </div>
        </div>

        {/* Source footer — names the brief so no figure above is left without
            a provenance line. */}
        <Reveal variant="fade" delay={100}>
          <p className="mt-10 border-t border-cream-dark pt-4 text-xs leading-relaxed text-text-mute">
            Sources: {BRIEF_SOURCE}; {TRIBUNE_SOURCE}. Figures are the brief's
            own — nothing in this section is web-sourced.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default NdfFindingsSection;
