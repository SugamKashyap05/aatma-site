import { Reveal } from "@/components/ui/reveal";
import {
  ScrollText,
  FileText,
  Building2,
  Scale,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const GAZETTE_FACTS = [
  {
    id: "wbi-notification",
    icon: <FileText className="w-4 h-4 text-gold" />,
    title: "WBI Rules 2022 — Notification",
    citation: "No. 20, eCF No. 237152, Dispur, 12 January 2023",
    details: [
      "The Assam Gazette, Extraordinary — Government of Assam, Orders by the Governor, Environment and Forest Department",
      "Gazette pagination 616–682 (67 pages)",
      "Rule 2 (definitions) verified verbatim",
    ],
  },
  {
    id: "tof-notification",
    icon: <FileText className="w-4 h-4 text-gold" />,
    title: "ToF Rules 2022 — Notification",
    citation: "9 December 2022, ECF No. 232904, Assam Gazette No. 1 of 2 Jan 2023",
    details: [
      "The Assam Gazette, Extraordinary — No. 1, Dispur, Monday, 2nd January 2023",
      "25 pages",
      "Rule 2 (definitions) verified verbatim",
    ],
  },
  {
    id: "unit-categories",
    icon: <Building2 className="w-4 h-4 text-gold" />,
    title: "Unit Categories — Rule 2",
    citation: "WBI Rules 2022, Rule 2 — No. 20, eCF No. 237152, 12-01-2023",
    details: [
      "Micro: Boilers/vessels aggregate capacity up to 500 kg",
      "Small: 501 kg – 1000 kg",
      "Medium: 1001 kg – 2000 kg",
      "Large: More than 20 vessels, or aggregate capacity more than 2000 kg",
    ],
  },
  {
    id: "thresholds",
    icon: <Scale className="w-4 h-4 text-gold" />,
    title: "Plantation vs. Wild Thresholds — Rule 2",
    citation: "ToF Rules 2022, Rule 2 — ECF No. 232904, 9 Dec 2022",
    details: [
      "Captive Plantation: A continuous patch of 10 hectares or more",
      "Plantation: A continuous patch of 0.1 hectare or more",
      "Forest: A continuous patch of 10 hectares or more having not less than 200 naturally grown trees per hectare on average",
    ],
  },
  {
    id: "lpc-vs-origin",
    icon: <FileText className="w-4 h-4 text-gold" />,
    title: "LPC FORM-XXV vs. Certificate of Origin",
    citation: "WBI Rules 2022, Rule 2 — No. 20, eCF No. 237152, 12-01-2023",
    details: [
      "LPC FORM-XXV: Legal Procurement Certificate — issued per FORM-XXV, conforming to CITES, by a local forest official authorised by the Chief Wildlife Warden under the Wildlife Protection Act 1972, to establish the legality of a consignment for an export permit",
      "Certificate of Origin: A certificate/document testifying origin, issued by the DFO having jurisdiction over where the raw material originated, to owners/legal title holders/legal assigns, for traceability",
    ],
  },
];

const PRESS_SOURCED_FACTS = [
  {
    label: "Registration limit",
    value: "62 days to register a secondary WBI unit",
    source: "The Assam Tribune, 2 Aug 2023",
  },
  {
    label: "Processing limit",
    value: "74 days to process a primary WBI unit",
    source: "The Assam Tribune, 2 Aug 2023",
  },
  {
    label: "Primary WBI count",
    value: "588 → 206 (66% decline)",
    source: "The Assam Tribune, 2 Aug 2023",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GazetteCitations — Section 7 for the /policy page.
 *
 * Presents the verified gazette facts with full citations, distinguishes
 * LPC FORM-XXV from Certificate of Origin, labels press-sourced facts,
 * and marks Rule 3+ content as not yet verified.
 *
 * This section complements the charts (CH-04, CH-08, CH-10) and SVGs
 * mounted by t_ea757e9d — it provides the legal citations and provenance
 * that the visualisations cannot carry.
 */
export function GazetteCitations() {
  return (
    <section id="gazette-citations" className="relative pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <Reveal variant="fade" delay={0}>
          <div className="mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-1.5 rounded-sm mb-4">
              <ScrollText size={14} />
              Section 7
            </span>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-3">
              Gazette <span className="text-gold">Citations</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl">
              The primary law behind the 2022 Rules — every figure traced to its
              notification, with press estimates labelled as such.
            </p>
          </div>
        </Reveal>

        {/* Gazette facts */}
        <div className="space-y-8">
          {GAZETTE_FACTS.map((fact, i) => (
            <Reveal key={fact.id} variant="fade" delay={100 + i * 50}>
              <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
                <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                  {fact.icon}
                  {fact.title}
                </h3>
                <p className="text-gold font-display font-semibold text-sm mb-3">
                  {fact.citation}
                </p>
                <ul className="space-y-2.5">
                  {fact.details.map((detail, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-white/70 text-sm leading-relaxed"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {/* Press-sourced facts */}
          <Reveal variant="fade" delay={400}>
            <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-gold" />
                Press-Sourced Facts
              </h3>
              <p className="text-white/70 text-sm mb-4">
                The following figures are from newspaper reports, not from the
                gazette. They are labelled as press estimates.
              </p>
              <div className="space-y-3">
                {PRESS_SOURCED_FACTS.map((fact, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-sm p-3"
                  >
                    <span className="text-gold font-display font-bold text-sm shrink-0">
                      {fact.label}
                    </span>
                    <div>
                      <p className="text-white/80 text-sm">{fact.value}</p>
                      <p className="text-white/40 text-xs mt-1">
                        Source: {fact.source} — press estimate
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Not yet verified */}
          <Reveal variant="fade" delay={450}>
            <div className="bg-amber-400/[0.07] border border-amber-400/30 rounded-lg p-6">
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-300" />
                Not Yet Verified — Rule 3+
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Rule 2 (definitions) of both gazette notifications has been read
                and verified verbatim. Rules 3 onward — covering classification,
                registration procedure, time limits, and the Registration
                Committees — remain unread (~60 pages of the WBI gazette, ~20 of
                the ToF gazette). Content on this page that goes beyond Rule 2 is
                labelled as inferred or reconstructed, not as verified primary
                law.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default GazetteCitations;
