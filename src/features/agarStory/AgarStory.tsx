import { cn, type ClassValue, assetUrl } from "@/lib/utils";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  TreePine,
  Droplets,
  Globe,
  Landmark,
  Sprout,
  Scale,
  Ship,
} from "lucide-react";

interface Milestone {
  year: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

/**
 * The agar trade timeline — brief §2 (About the trade), §3 (early trade
 * 1905–1970) and §4 (Far East discovery and the import era).
 *
 * Wording follows the client brief. The milestones the brief dates
 * explicitly form the spine of the timeline; the two undated brief passages
 * they bracket are carried as the closing entries. The November 2000
 * National Seminar is the one dated event from brief §5 and is retained as
 * the pivot point.
 */
const MILESTONES: Milestone[] = [
  {
    year: "1905–06",
    icon: <TreePine className="w-5 h-5" strokeWidth={1.5} />,
    title: "Sylhet: the first oil extraction",
    description:
      "Agarwood was found abundantly in the forests of the North Eastern region, and people of Sylhet (now in Bangladesh) used it for extracting oil.",
  },
  {
    year: "1960s",
    icon: <Droplets className="w-5 h-5" strokeWidth={1.5} />,
    title: "Hojai distillation begins",
    description:
      "Meanwhile, several enthusiastic and visionary people of Hojai area entered in the trade and started small-scale distillation at Hojai.",
    image: assetUrl("history/trade-journey-hojai.jpg"),
    imageAlt: "Traditional agar oil distillation at Hojai, Assam",
  },
  {
    year: "Late 1960s",
    icon: <Globe className="w-5 h-5" strokeWidth={1.5} />,
    title: "NEFA and Bhutan agar mahals",
    description:
      "At that period of time, i.e. in the late 60s, a group of enthusiastic people of Hojai involved in taking lease of agar mahals in NEFA and Bhutan and collected agar from there and brought to Hojai.",
  },
  {
    year: "1982",
    icon: <Landmark className="w-5 h-5" strokeWidth={1.5} />,
    title: "Trade standstill + Far East discovery",
    description:
      "For a short while from 1970 to 1980 trade of agar in Assam survived somehow with the agar from the state of Manipur but it came to a standstill since 1982. However, there happened a sudden change in the trade which started with the discovery of Agar wood abundantly in the far Eastern countries like Malaysia, Indonesia, Thiland, Combodia etc.",
  },
  {
    year: "Nov 2000",
    icon: <Sprout className="w-5 h-5" strokeWidth={1.5} />,
    title: "National Seminar at Guwahati",
    description:
      "In November 2000, AATMA organized a National level seminar on Scope & Dimension of Agar (Aquilaria spp.) plantation in North Eastern Region at Administrative staff college, Guwahati, which was attended by several scientist from different parts of India and was presided over by Dr. P.K. Hajra, Ex Director of the Botanical Survey of India.",
    image: assetUrl("history/seminar-2000.jpg"),
    imageAlt: "National Seminar on Agar Plantation, Guwahati, November 2000",
  },
  {
    year: "LPC",
    icon: <Scale className="w-5 h-5" strokeWidth={1.5} />,
    title: "Legal Procurement Certificate",
    description:
      "Local forest authorities used to issue 'Legal Procurement Certificate (LPC)' of the products to be re-exported that are derived from the imported materials to comply with the CITES provisions.",
  },
];

/**
 * The brief's closing passage for the early trade — the Manipur supply line
 * and the Bombay market. Carried as a standalone strip rather than a seventh
 * milestone so the timeline stays at the six required entries.
 */
const TRADING_ROUTE =
  "From 1970 to 1980s the entrepreneurs of Hojai & Silchar collected Agarwood from the Mahalders of Manipur State (under Forest Transit Pass) which were processed & distilled for oil at Hojai and Silchar. These products were subsequently taken to Bombay (Mumbai) under Lieu T.P. issued by Forest Deptt. Of Assam for sale.";

export function AgarStory({
  className,
  deviceTier,
}: {
  className?: ClassValue;
  deviceTier?: "mobile" | "tablet" | "desktop";
}) {
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
        variant="fog"
        theme="dark"
        layers={isMobile ? 1 : 2}
        speed={isMobile ? 75 : 60}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
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
              The story of agarwood — a resin that forms only in wounded trees, an oil that trades for tens of thousands of dollars, and a trade that for centuries ran through the forests and markets of Assam.
            </p>
          </Reveal>
        </div>

        {/* Map visual */}
        <Reveal variant="fade" delay={250} className="mb-16">
          <div className="max-w-3xl mx-auto">
            <img
              src={assetUrl("history/trade-journey-map.svg")}
              alt="Map of the agarwood trade journey across Northeast India"
              className="w-full h-auto rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
            />
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-white/15 to-transparent" />

          <div className="space-y-10 md:space-y-16">
            {MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal
                  key={milestone.year}
                  variant="fade"
                  delay={100 + index * 80}
                >
                  <div
                    className={cn(
                      "relative flex flex-col md:flex-row md:items-center gap-6 md:gap-0",
                      isEven ? "" : "md:flex-row-reverse"
                    )}
                  >
                    {/* Dot on the line */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-green-deep bg-gold shadow-lg shadow-gold/30 z-10" />

                    {/* Content card */}
                    <div
                      className={cn(
                        "ml-10 md:ml-0 md:w-[calc(50%-2rem)]",
                        isEven ? "md:pr-0 md:pl-0" : "md:pl-0 md:pr-0"
                      )}
                    >
                      <div
                        className={cn(
                          "group p-5 md:p-6 rounded-xl border transition-all duration-300",
                          "bg-white/[0.04] border-white/10 backdrop-blur-sm",
                          "hover:bg-white/[0.08] hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10"
                        )}
                      >
                        {/* Year + icon */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/10 border border-gold/20 text-gold">
                            {milestone.icon}
                          </span>
                          <span className="text-gold text-lg md:text-xl font-bold font-display tracking-tight">
                            {milestone.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-white text-lg md:text-xl font-semibold mb-2 font-display leading-tight">
                          {milestone.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/65 text-sm md:text-base leading-relaxed mb-4">
                          {milestone.description}
                        </p>

                        {/* Image */}
                        {milestone.image && (
                          <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                            <img
                              src={milestone.image}
                              alt={milestone.imageAlt || milestone.title}
                              className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* The Manipur supply line and the road to Bombay */}
        <Reveal variant="fade" delay={250} className="mt-14 md:mt-18">
          <div className="max-w-4xl mx-auto bg-white/[0.04] border border-white/10 backdrop-blur-sm rounded-lg p-6 md:p-7">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-gold/10 border border-gold/20 text-gold">
                <Ship className="w-5 h-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="text-white text-lg md:text-xl font-semibold mb-2 font-display leading-tight">
                  The Manipur supply, and the road to Bombay
                </h3>
                <p className="text-white/65 text-sm md:text-base leading-relaxed">
                  {TRADING_ROUTE}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal variant="fade" delay={200} className="mt-16 text-center">
          <a
            href="#milestones"
            className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-wide hover:text-gold-light transition-colors duration-300 group min-h-[44px]"
          >
            See AATMA's milestones
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
