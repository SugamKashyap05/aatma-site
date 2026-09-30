import { cn, type ClassValue } from "@/lib/utils";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import { ArrowRight, TreePine, Droplets, Globe, Landmark, Sprout, Scale, ScrollText } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BentoCard } from "@/components/ui/bento-card";

interface AgarCard {
  rank: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  colSpan?: 1 | 2 | 3;
}

const CARDS: AgarCard[] = [
  {
    rank: "The Raw Material",
    icon: <TreePine className="w-6 h-6" strokeWidth={1.5} />,
    title: "The Tree & The Resin",
    body: `Agarwood is the fragrant resin that forms inside the heartwood of the agar tree. The tree — <em>Aquilaria malaccensis</em>, native to Northeast India and Southeast Asia — begins life as an ordinary, odourless, pale hardwood. Only when its bark is wounded and infected by a specific group of fungi does it produce the dark, heavy, aromatic resin that the world values. The resin is not present in healthy trees; it is a defence — the tree's response to injury and infection, a slow chemical armour grown over years and decades. The oldest, most resin-saturated heartwood commands the highest prices, and the formation of that wood is the entire economic basis of the agar trade.`,
    colSpan: 2,
  },
  {
    rank: "The Essence",
    icon: <Droplets className="w-6 h-6" strokeWidth={1.5} />,
    title: "Agaroil — Liquid Gold",
    body: `Distilling agarwood chips yields agarwood essential oil — among the most expensive and most sought-after oils in the world. Pure-grade agar oil, of the quality produced in Assam's distillation centres, trades at USD 32,000–40,000 per kilogram. Hojai, Assam, is the distillation hub of India, where generations of agaroil manufacturers have refined the craft of extraction — the careful selection of chips, the slow hydro-distillation, and the repeated fractionation that separates the head, heart, and base notes. The oil is not merely an aroma: in Middle Eastern homes and courts it is a sign of hospitality, a marker of respect, and a tradition passed from one generation to the next.`,
  },
  {
    rank: "The Market",
    icon: <Globe className="w-6 h-6" strokeWidth={1.5} />,
    title: "Global Demand",
    body: `Agarwood's demand is global, but its deepest roots are in the Middle East — particularly the Gulf states, where it is burned to honour guests, used in wedding ceremonies, and distilled into fine attars and luxury fragrances. Gulf importers have long formed the backbone of demand for Assam's agarwood. Demand is also growing across Europe, the United States, and East Asia — for premium fragrances, aromatherapy, cosmetics, and traditional medicine. The growth of legal, documented, traceable exports is reshaping a market that for decades operated largely in the shadows.`,
  },
  {
    rank: "Heritage & Craft",
    icon: <Landmark className="w-6 h-6" strokeWidth={1.5} />,
    title: "Uses & Traditions",
    body: `Beyond luxury perfumery, agarwood carries deep cultural and medicinal meaning across the world. It is burned as incense in religious and ceremonial contexts; used in traditional medicine systems — Ayurveda, Chinese, Malay, and Tibetan — for its anti-inflammatory, analgesic, and anti-rheumatic properties; incorporated into cosmetics, soaps, and personal-care formulations; carved into ornamental objects and prayer items; used as an insect repellent; and, in some traditions, blended as a flavouring. In parts of East Asia, agarwood is used as a fragrant ingredient in wines. Each use draws on the same resin, the same slow-growing heartwood, the same craft.`,
  },
  {
    rank: "The Grower's Story",
    icon: <Sprout className="w-6 h-6" strokeWidth={1.5} />,
    title: "Cultivation in Assam",
    body: `Assam alone has an estimated 114.3 million agar trees — part of India's 139.89 million, the largest agarwood tree population in the country. Farmers grow <em>Aquilaria</em> on private land, homesteads, and plantations across Upper Assam — Golaghat, Jorhat, Sivasagar, Hojai, and the districts around them. The crop is long-gestation — a farmer plants a tree and waits years before the first wounds are made, and longer still before resin begins to form — but the returns, when they come, are extraordinary. Empirical studies of agar cultivation in the region have found that every ₹100 invested can yield ₹623 in net benefit, making agar one of the most rewarding crops a farmer can plant, if they can wait for it.`,
  },
  {
    rank: "The Law & The Land",
    icon: <Scale className="w-6 h-6" strokeWidth={1.5} />,
    title: "Conservation & CITES",
    body: `The very value that makes agarwood extraordinary has made its tree, <em>Aquilaria malaccensis</em>, vulnerable. The species is listed by the IUCN as Critically Endangered, and has been on CITES Appendix II since 1995 — placed there on India's own proposal during the 9th Conference of the Parties in 1994. For decades, the vast majority of agarwood traded from India was illegal: the country has regularly reported seizure figures to CITES well into the tens of tonnes of chips and litres of oil across multiple states. CITES controls are not a barrier to the trade — they are the framework that makes legitimate, documented, sustainable trade possible, and they are the reason India's 2024 quota and 2025 export carry the weight of international recognition.`,
  },
  {
    rank: "The Policy & The Future",
    icon: <ScrollText className="w-6 h-6" strokeWidth={1.5} />,
    title: "Policy, Legalisation & The Road Ahead",
    body: `For over two decades, AATMA pressed for the legalisation of agarwood trade in Assam — beginning with a landmark seminar at the Assam Administrative Staff College in Guwahati in 2000, followed by years of memoranda, protests, and sustained engagement with government. In 2019 the Assam Cabinet moved to liberalise agar trade, and in 2020 the state enacted the Assam Agarwood Promotion Policy, bringing plantation, harvesting, processing, transit, and sale of agar within a formal legal framework on non-forest land. A 2024 CITES Review of Significant Trade outcome opened the door to formal international exports, and in 2025 Assam shipped its first legal agarwood consignment — 100 kg to Saudi Arabia and 12 kg to the UAE — from the Guwahati airport. A dedicated Agarwood Export Promotion Cell was constituted by the Ministry of Commerce in May 2026. The road ahead is one of consolidation: developing an auction system for agar chips, building a recognised agarwood market, and securing the livelihoods of the lakhs of Assamese whose futures are rooted in this tree.`,
    colSpan: 2,
  },
];

export function AgarStory({ className, deviceTier }: { className?: ClassValue; deviceTier?: "mobile" | "tablet" | "desktop" }) {
  const isMobile = deviceTier === "mobile";

  return (
    <section
      id="agar-story"
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20 text-white",
        className
      )}
    >
      <AmbientMotion
        variant={isMobile ? "fog" : "fog"}
        theme="dark"
        layers={isMobile ? 1 : 2}
        speed={isMobile ? 75 : 60}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          <Reveal variant="fade" delay={0}>
            <span className="inline-block text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-sm mb-4">
              The Agar Story
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-6 drop-shadow-lg">
              From forest to fragrance
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
              The story of agarwood — a resin that forms only in wounded trees, an oil that trades for tens of thousands of dollars, and a trade that for centuries ran through the forests and markets of Assam, until it was finally brought into the light.
            </p>
          </Reveal>
        </div>

        <BentoGrid>
          {CARDS.map((card, i) => (
            <BentoCard
              key={i}
              title={card.title}
              description={card.body}
              icon={card.icon}
              colSpan={card.colSpan}
            />
          ))}
        </BentoGrid>

        <Reveal variant="fade" delay={200} className="mt-12 md:mt-16 text-center">
          <a
            href="#milestones"
            className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-wide hover:text-gold-light transition-colors duration-300 group"
          >
            See the milestones
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
