import { cn, type ClassValue } from "@/lib/utils";
import { Reveal, Stagger } from "@/components/ui/reveal";

/**
 * RulesSection — Assam Wood Based Industries (Promotion & Development) Rules,
 * 2022, on the home page.
 *
 * Two client sources carry this section:
 *   • `documents/A brief note on Agar Trade (2).docx` §9 — "NOTIFICATION OF
 *     ASSAM WOOD BASED INDUSTRIES (PROMOTION AND DEVELOPMENT) RULES 2022".
 *     The section intro is that section's own wording; the 800+ cottage
 *     industries, the five-year registration validity and the Micro/Small/
 *     Medium/Large categorisation all come from it. Comparison recorded in
 *     docs/BRIEF_COMPARISON_REPORT.md §3.5.
 *   • The gazette notification itself — "No. 20, eCF No. 237152, Dispur,
 *     12 January 2023" — whose Rule 2 (definitions) supplies the unit-capacity
 *     thresholds verbatim, as read and recorded in
 *     docs/CLIENT_MATERIAL_RESEARCH.md §4a.
 *
 * Known variance, recorded rather than resolved: the client brief says "more
 * than 800" cottage industries, the Hindustan Times report of 17 Jan 2023 says
 * "about 1,000 agar wood-based industries in Assam", and the /policy page
 * carries the ~1,000 figure. This section uses the brief's figure because the
 * home page is brief-sourced. The two figures need one client decision.
 *
 * Ledger note: docs/APPROVED_CONTENT_LEDGER.md §10 marked the 800+ and
 * Micro/Small/Medium/Large rows `exclude` because its source key omitted brief
 * (2). That was a gap in the ledger, not in this copy; §10 and the source key
 * are corrected alongside this component.
 */

interface RuleCard {
  badge: string;
  title: string;
  description: string;
  /** Provenance string rendered under the description. */
  source: string;
}

const BRIEF_SOURCE =
  "A brief note on Agar Trade (2).docx §9 — WBI Rules 2022 notification";
const GAZETTE_SOURCE =
  "Assam Gazette No. 20, eCF No. 237152, 12 Jan 2023 — Rule 2";

const RULE_CARDS: RuleCard[] = [
  {
    badge: "Registration",
    title: "Register, Don't License",
    description:
      "Industries need only to be registered with the forest department — the licensing regime is gone. Registration is valid for five (5) years.",
    source: BRIEF_SOURCE,
  },
  {
    badge: "Location",
    title: "Operate from Present Location",
    description:
      "800+ cottage industries can function from their present locations without shifting to designated industrial estates.",
    source: BRIEF_SOURCE,
  },
  {
    badge: "CITES",
    title: "Fully CITES Compliant",
    description:
      "Registration of industry, registration of plantations, stock register of inbound and outbound raw materials — all under ease of doing business.",
    source: BRIEF_SOURCE,
  },
  {
    badge: "Scale",
    title: "Micro to Large",
    description:
      "Categorised by aggregate boiler/vessel capacity: Micro up to 500 kg · Small 501–1000 kg · Medium 1001–2000 kg · Large above 2000 kg (or a unit with more than 20 vessels).",
    source: GAZETTE_SOURCE,
  },
];

function RuleCardItem({ card, index }: { card: RuleCard; index: number }) {
  return (
    <Reveal
      variant="up"
      delay={index * 80}
      className="group relative flex h-full flex-col bg-white rounded-xl border-t-4 border-gold shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] active:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      {/* Badge label */}
      <span className="inline-block self-start bg-gold text-green-deep font-display font-bold text-xs tracking-wider px-3 py-1 rounded-full mb-4 uppercase">
        {card.badge}
      </span>

      <h3 className="font-display font-bold text-green-deep text-lg mb-3 leading-snug">
        {card.title}
      </h3>

      <p className="text-text-mute text-sm leading-relaxed">
        {card.description}
      </p>

      <span className="mt-auto pt-4 block text-xs italic leading-snug text-text-mute">
        Source: {card.source}
      </span>
    </Reveal>
  );
}

export function RulesSection({ className }: { className?: ClassValue }) {
  return (
    <section
      id="rules"
      className={cn(
        "relative py-20 md:py-28 scroll-mt-20 overflow-hidden",
        className,
      )}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.06)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <Reveal variant="fade" delay={0} className="text-center mb-14">
          <span className="inline-block text-gold-deep text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Policy
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal mb-4">
            Assam Wood Based Industries (Promotion &amp; Development) Rules, 2022
          </h2>
          {/* The gazette notification behind the section title. */}
          <p className="text-gold-deep font-display font-semibold text-sm md:text-base mb-6">
            Gazette Notification No. 20, eCF No. 237152, Dispur, 12 January 2023
          </p>
          <p className="text-text-mute text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Under the new set of Rules, the Agar wood based industries have been
            newly categorized into Secondary Wood-Based Industries and
            licensing has been done away with. They need only to be registered
            with the forest department and start functioning legally at present
            location without shifting to any other place.
          </p>
          <p className="mt-3 text-xs italic leading-relaxed text-text-mute">
            Source: {BRIEF_SOURCE}
          </p>
        </Reveal>

        {/* Card grid — 2×2 responsive */}
        <Stagger staggerMs={100} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RULE_CARDS.map((card, i) => (
            <RuleCardItem key={card.badge} card={card} index={i} />
          ))}
        </Stagger>

        {/* Source footer */}
        <Reveal variant="fade" delay={100}>
          <p className="mt-10 border-t border-border pt-4 text-xs leading-relaxed text-text-mute">
            Sources: {GAZETTE_SOURCE}; {BRIEF_SOURCE}; The Assam Tribune, 2
            August 2023.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default RulesSection;
