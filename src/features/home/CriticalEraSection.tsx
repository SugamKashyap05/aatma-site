import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Stagger } from "@/components/ui/reveal";

/**
 * CriticalEraSection — selected milestones from the Critical Era of
 * AATMA's struggle (2000–2016), as documented in the client's
 * "A BRIEF HISTORY OF AGAR" (§3, pp.3–4).
 *
 * Four cards in a 2×2 responsive grid. Content is exact from the client
 * source. No AATMA member names are used — the delegation is referenced
 * generically. Government official names retained per client instruction.
 *
 * "Read the full story" links to the agar-story anchor, the dedicated section
 * carrying the full agarwood trade narrative.
 */

interface EraCard {
  year: string;
  title: string;
  description: string;
}

const ERA_CARDS: EraCard[] = [
  {
    year: "2000",
    title: "Rules Notified",
    description:
      "The Govt. of Assam framed the Assam Wood Based Industries (Establishment and Regulation) Rules, 2000, classifying agar oil extracting units as wood based industries. These rules plunged agar growers and traders into a period of deep uncertainties.",

  },
  {
    year: "2005",
    title: "Verification Denied",
    description:
      "In October 2005, the then DFO of Hojai denied verification of consignments. Around seven processing units suffered massive financial losses. Several prominent business houses shifted operations to neighboring states like Meghalaya, as well as overseas.",
  },
  {
    year: "2016",
    title: "Minister's Initiative",
    description:
      "On August 24, 2016, an AATMA delegation met with the then Forest Minister Pramila Rani Brahma, who took a keen interest in the matter. A proposal was submitted to classify the Agar wood Industry as a Secondary Wood Based Industry by excluding it from the 2000 Rules.",
  },
  {
    year: "2016",
    title: "National Conference",
    description:
      "The Assam Forest Department organized a National Conference on Agarwood & Oil Industries: Prospect & Possibilities on October 28, 2016, at NEDFi House in Guwahati.",
  },
];

function EraCardItem({ card, index }: { card: EraCard; index: number }) {
  return (
    <Reveal
      variant="up"
      delay={index * 80}
      className="group relative bg-cream rounded-xl border-t-4 border-gold shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] active:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      {/* Year badge */}
      <span className="inline-block bg-green-deep text-gold-light font-display font-bold text-sm tracking-wider px-3 py-1 rounded-full mb-4">
        {card.year}
      </span>

      <h3 className="font-display font-bold text-green-deep text-lg mb-3 leading-snug">
        {card.title}
      </h3>

      <p className="text-text-mute text-sm leading-relaxed">
        {card.description}
      </p>


    </Reveal>
  );
}

export function CriticalEraSection({ className }: { className?: ClassValue }) {
  return (
    <section
      id="critical-era"
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
            Critical Era · 2000–2016
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal mb-6">
            The Critical Era
          </h2>
          <p className="text-text-mute text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            In the year 2000 the Govt. of Assam notified the Assam Wood Based
            Industries (Establishment and Regulation) Rules, 2000, classifying
            agar oil extracting units as wood based industries. These rules
            plunged Agar growers and traders into a period of deep
            uncertainties.
          </p>
        </Reveal>

        {/* Card grid — 2×2 responsive */}
        <Stagger staggerMs={100} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ERA_CARDS.map((card, i) => (
            <EraCardItem
              key={`${card.year}-${card.title}`}
              card={card}
              index={i}
            />
          ))}
        </Stagger>

        {/* Read the full story link */}
        <Reveal variant="up" delay={200} className="mt-12 text-center">
          <Link
            to="/#agar-story"
            className="inline-flex items-center gap-2 text-green-deep text-sm font-medium tracking-wide underline decoration-gold/40 underline-offset-4 hover:decoration-gold active:decoration-gold transition-colors duration-300 group min-h-[44px] rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Read the full story
            <span className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default CriticalEraSection;
