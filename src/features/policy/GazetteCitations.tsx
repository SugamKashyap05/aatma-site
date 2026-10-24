import { Reveal } from "@/components/ui/reveal";
import {
  ScrollText,
  FileText,
  Building2,
  Scale,
  CheckCircle,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const GAZETTE_FACTS = [
  {
    id: "wbi-notification",
    icon: <FileText className="w-4 h-4 text-gold-light" />,
    title: "WBI Rules 2022 — Notification",
    citation: "No. 20, eCF No. 237152, Dispur, 12 January 2023",
    details: [
      "The Assam Gazette, Extraordinary — Government of Assam, Orders by the Governor, Environment and Forest Department",
      "Gazette pagination 616–682 (67 pages)",
    ],
  },
  {
    id: "tof-notification",
    icon: <FileText className="w-4 h-4 text-gold-light" />,
    title: "ToF Rules 2022 — Notification",
    citation: "9 December 2022, ECF No. 232904, Assam Gazette No. 1 of 2 Jan 2023",
    details: [
      "The Assam Gazette, Extraordinary — No. 1, Dispur, Monday, 2nd January 2023",
      "25 pages",
    ],
  },
  {
    id: "unit-categories",
    icon: <Building2 className="w-4 h-4 text-gold-light" />,
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
    icon: <Scale className="w-4 h-4 text-gold-light" />,
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
    icon: <FileText className="w-4 h-4 text-gold-light" />,
    title: "LPC FORM-XXV vs. Certificate of Origin",
    citation: "WBI Rules 2022, Rule 2 — No. 20, eCF No. 237152, 12-01-2023",
    details: [
      "LPC FORM-XXV: Legal Procurement Certificate — issued per FORM-XXV, conforming to CITES, by a local forest official authorised by the Chief Wildlife Warden under the Wildlife Protection Act 1972, to establish the legality of a consignment for an export permit",
      "Certificate of Origin: A certificate/document testifying origin, issued by the DFO having jurisdiction over where the raw material originated, to owners/legal title holders/legal assigns, for traceability",
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GazetteCitations — Section 5 for the /policy page.
 *
 * Presents cited Gazette information and distinguishes LPC FORM-XXV from Certificate of Origin.
 *
 * Newspaper estimates are not presented here as data sources.
 */
export function GazetteCitations() {
  return (
    <section id="gazette-citations" className="relative pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <Reveal variant="fade" delay={0}>
          <div className="mb-12 md:mb-16">
            <span className="glass-card inline-flex items-center gap-2 text-gold-light text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-4">
              <ScrollText size={14} />
              Section 5
            </span>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-3">
              Gazette <span className="text-gold-light">Citations</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl">
              Gazette notifications are listed with their legal citations.
            </p>
          </div>
        </Reveal>

        {/* Gazette facts */}
        <div className="space-y-8">
          {GAZETTE_FACTS.map((fact, i) => (
            <Reveal key={fact.id} variant="fade" delay={100 + i * 50}>
              <div className="glass-card rounded-lg p-6">
                <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                  {fact.icon}
                  {fact.title}
                </h3>
                <p className="text-gold-light font-display font-semibold text-sm mb-3">
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



        </div>
      </div>
    </section>
  );
}

export default GazetteCitations;
