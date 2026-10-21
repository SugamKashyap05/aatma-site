import { Link } from "react-router-dom";
import { cn, type ClassValue, assetUrl } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { ClientAgarwoodPhotos } from "@/features/agarStory/ClientAgarwoodPhotos";
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
}

/**
 * The agar trade timeline — client-supplied A BRIEF HISTORY OF AGAR.pdf
 * §§3–4 (early trade and Far East import era), §6 (national seminar), and the
 * client-supplied Agar Trade note §5 (Legal Procurement Certificate).
 *
 * Preserve the source's own wording: the Hojai passage says "Meanwhile" but
 * gives no year, and the Far East import-era passage is undated. Only the
 * trade standstill itself is dated to 1982.
 */
const MILESTONES: Milestone[] = [
  {
    year: "1905–06",
    icon: <TreePine className="w-5 h-5" strokeWidth={1.5} />,
    title: "Sylhet oil extraction",
    description:
      "Agarwood was found abundantly in the forests of the North Eastern region, and people of Sylhet used it for extracting oil.",
  },
  {
    year: "Date not stated",
    icon: <Droplets className="w-5 h-5" strokeWidth={1.5} />,
    title: "Hojai distillation begins",
    description:
      "Meanwhile, several enthusiastic and visionary people of Hojai area entered in the trade and started small-scale distillation at Hojai.",

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
    title: "Trade standstill",
    description:
      "For a short while from 1970 to 1980, Assam's agar trade survived on agar from Manipur. It came to a standstill in 1982.",
  },
  {
    year: "Far East import era",
    icon: <Globe className="w-5 h-5" strokeWidth={1.5} />,
    title: "Far East discovery and imports",
    description:
      "The client history describes a sudden change in the trade with the discovery of abundant agarwood in Malaysia, Indonesia, Thailand, and Cambodia. Prominent Hojai business houses began importing agarwood from those countries under the Government of India's Exim Policy, paying heavy import duties. Imported raw agarwood was re-exported as finished products after processing.",
  },
  {
    year: "Nov 2000",
    icon: <Sprout className="w-5 h-5" strokeWidth={1.5} />,
    title: "National Seminar at Guwahati",
    description:
      "In November 2000, AATMA organized a National level seminar on Scope & Dimension of Agar (Aquilaria spp.) plantation in North Eastern Region at Administrative staff college, Guwahati, which was attended by several scientist from different parts of India and was presided over by Dr. P.K. Hajra, Ex Director of the Botanical Survey of India.",

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
 * The client's closing passage for the early trade — the Manipur supply line
 * and Bombay market. It remains a standalone strip rather than a dated card,
 * since the source describes a range rather than a single year.
 */
const TRADING_ROUTE =
  "From 1970 to 1980s the entrepreneurs of Hojai & Silchar collected Agarwood from the Mahalders of Manipur State (under Forest Transit Pass) which were processed & distilled for oil at Hojai and Silchar. These products were subsequently taken to Bombay (Mumbai) under Lieu T.P. issued by Forest Deptt. Of Assam for sale.";

export function AgarStory({ className }: {
  className?: ClassValue;
  deviceTier?: "mobile" | "tablet" | "desktop";
}) {

  return (
    <section
      id="agar-story"
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20 text-agar-body",
        className
      )}
    >

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          <Reveal variant="fade" delay={0}>
            <span className="bg-glass-card backdrop-blur-xl border border-white/20 inline-block text-agar-label text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-4">
              Agar Trade in Assam
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-6 drop-shadow-lg">
              Agarwood in the trade
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <p className="text-agar-body text-base md:text-lg max-w-2xl mx-auto">
              The client history describes agarwood chips (black resinous wood) and agar oil/attar as useful raw materials for perfumery, and agar as a highly commercially useful plant.
            </p>
          </Reveal>
        </div>

        {/* Map visual */}
        <Reveal variant="fade" delay={250} className="mb-16">
          <div className="max-w-3xl mx-auto">
            <picture className="block overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
              <source
                media="(max-width: 639px)"
                srcSet={assetUrl("history/trade-journey-map-mobile.svg")}
              />
              <img
                src={assetUrl("history/trade-journey-map.svg")}
                alt="Schematic of client-described agar trade chronology and supply relationships; not a geographic map or to scale"
                className="block w-full h-auto"
                loading="eager"
                decoding="async"
              />
            </picture>
            <p className="mt-3 text-center text-xs leading-relaxed text-agar-body">
              Schematic relationship diagram, not to geographic scale.
            </p>
          </div>
        </Reveal>

        <ClientAgarwoodPhotos />

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
                          "p-5 md:p-6 rounded-xl border transition-all duration-300 bg-glass-card backdrop-blur-xl border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.32)]",
                          "hover:bg-green-deep/95 active:bg-green-deep/95 hover:border-gold/30 active:border-gold/30 hover:shadow-lg hover:shadow-gold/10"
                        )}
                      >
                        {/* Year + icon */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/10 border border-gold/20 text-agar-icon">
                            {milestone.icon}
                          </span>
                          <span className="text-agar-label text-lg md:text-xl font-bold font-display tracking-tight">
                            {milestone.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-agar-title text-lg md:text-xl font-semibold mb-2 font-display leading-tight">
                          {milestone.title}
                        </h3>

                        {/* Description */}
                        <p className="text-agar-body text-sm md:text-base leading-relaxed mb-4">
                          {milestone.description}
                        </p>


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
          <div className="max-w-4xl mx-auto bg-glass-card backdrop-blur-xl border border-white/20 rounded-lg p-6 md:p-7 shadow-[0_12px_32px_rgba(0,0,0,0.32)]">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-gold/10 border border-gold/20 text-agar-icon">
                <Ship className="w-5 h-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="text-agar-title text-lg md:text-xl font-semibold mb-2 font-display leading-tight">
                  The Manipur supply, and the road to Bombay
                </h3>
                <p className="text-agar-body text-sm md:text-base leading-relaxed">
                  {TRADING_ROUTE}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal variant="fade" delay={200} className="mt-16 text-center">
          <Link
            to="/history"
            className="inline-flex items-center gap-2 text-agar-label text-sm font-medium tracking-wide hover:text-agar-label active:text-agar-label transition-colors duration-300 group min-h-[44px]"
          >
            See AATMA's milestones
            <span className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
