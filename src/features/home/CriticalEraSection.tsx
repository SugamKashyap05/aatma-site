import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Stagger } from "@/components/ui/reveal";
import { assetUrl } from "@/lib/utils";

/**
 * CriticalEraSection — card-based section depicting the Critical Era of
 * AATMA's struggle (2000–2016).
 *
 * Six cards in a 3×2 responsive grid, each with a year badge, title,
 * description, and optional image. Content is exact from brief §6.
 * Government official names retained; AATMA member names anonymized.
 */

interface EraCard {
  year: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

const ERA_CARDS: EraCard[] = [
  {
    year: "2000",
    title: "Rules Notified",
    description:
      "The Govt. of Assam notified the Assam Wood Based Industries (Establishment and Regulation) Rules, 2000, classifying agar oil extracting units as wood based industries. Cottage industries were required to shift to industrial estates — practically infeasible for thousands of poor households dependent on agar oil distillation.",
    image: assetUrl("history/critical-era.png"),
    imageAlt: "Critical era — agar wood processing units",
  },
  {
    year: "2005",
    title: "Verification Denied",
    description:
      "Forest authorities (DFO Hojai) denied verification of consignments. Seven processing units suffered massive financial losses. Several prominent business houses shifted operations to neighboring states like Meghalaya, as well as overseas.",
  },
  {
    year: "2007",
    title: "Writ Petition Filed",
    description:
      "M/s North East Aromatics, a prominent agarwood importing and exporting firm based in Hojai, with the backing of AATMA, filed Writ Petition W.P.(C) No. 6284/2007 in the Gauhati High Court against the State of Assam's Forest Department.",
  },
  {
    year: "2010",
    title: "Harassment Escalates",
    description:
      "Multi-agency alerts were coordinated across Guwahati Airport authorities, Assam Police, Assam Forest Department, and Maharashtra Forest Department to actively search for agar traders and seize their products. Hotel detentions in Maharashtra intensified the pressure on traders.",
    image: assetUrl("history/critical-era-hardship.jpg"),
    imageAlt: "Hardship faced by agar traders during the critical era",
  },
  {
    year: "2016",
    title: "Minister's Initiative",
    description:
      "An AATMA delegation met with the then Forest Minister Pramila Rani Brahma, who took a keen interest in the matter. A proposal was submitted to classify the Agar wood Industry as a Secondary Wood Based Industry by excluding it from the 2000 Rules.",
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
      className="group relative bg-white rounded-xl border-t-4 border-gold shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      {/* Year badge */}
      <span className="inline-block bg-green-deep text-gold font-display font-bold text-sm tracking-wider px-3 py-1 rounded-full mb-4">
        {card.year}
      </span>

      <h3 className="font-display font-bold text-green-deep text-lg mb-3 leading-snug">
        {card.title}
      </h3>

      <p className="text-text-mute text-sm leading-relaxed">
        {card.description}
      </p>

      {card.image && (
        <div className="mt-5 overflow-hidden rounded-lg">
          <img
            src={card.image}
            alt={card.imageAlt ?? ""}
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
    </Reveal>
  );
}

export function CriticalEraSection({ className }: { className?: ClassValue }) {
  return (
    <section
      id="critical-era"
      className={cn(
        "relative py-20 md:py-28 scroll-mt-20 bg-cream-dark overflow-hidden",
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
            22 Years of Struggle
          </h2>
          <p className="text-text-mute text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            In the year 2000 the Govt. of Assam notified the Assam Wood Based
            Industries (Establishment and Regulation) Rules, 2000, classifying
            agar oil extracting units as wood based industries. These rules
            plunged Agar growers and traders into a period of deep
            uncertainties.
          </p>
        </Reveal>

        {/* Card grid — 3×2 responsive */}
        <Stagger staggerMs={100} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ERA_CARDS.map((card, i) => (
            <EraCardItem key={`${card.year}-${card.title}`} card={card} index={i} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default CriticalEraSection;
