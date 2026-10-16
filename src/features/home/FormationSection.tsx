import { cn, type ClassValue, assetUrl } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface FormationSectionProps {
  className?: ClassValue;
  deviceTier?: "mobile" | "tablet" | "desktop";
}

/**
 * Formation section — the birth of AATMA (brief §3).
 *
 * Shows the 1976 founding, registration vide 664 of 1978-79, and the
 * 2000 reorganization. All individual member names are anonymized per
 * the name map in docs/HOMEPAGE_REDESIGN_PLAN.md §3.3.
 */
export function FormationSection({ className, deviceTier }: FormationSectionProps) {
  const isMobile = deviceTier === "mobile";

  return (
    <section
      id="formation"
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20",
        "bg-cream text-charcoal",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          <Reveal variant="fade" delay={0}>
            <span className="inline-block text-gold-deep text-sm font-semibold tracking-[0.25em] uppercase bg-green-deep/10 border border-green-deep/20 px-4 py-1.5 rounded-sm mb-4">
              Formation
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-6 text-green-deep">
              The Birth of AATMA
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <p className="text-text-mute text-base md:text-lg max-w-2xl mx-auto">
              How a group of traders in Hojai came together to give Assam's
              agarwood trade a collective voice.
            </p>
          </Reveal>
        </div>

        {/* Content grid: text + image */}
        <div
          className={cn(
            "grid gap-10 md:gap-12 items-center",
            isMobile ? "grid-cols-1" : "grid-cols-2"
          )}
        >
          {/* Text card */}
          <Reveal variant="fade" delay={0}>
            <div className="bg-white rounded-sm p-6 md:p-8 shadow-lg border border-cream-dark">
              <p className="text-charcoal text-base md:text-lg leading-relaxed mb-6">
                The trade being a cottage based industry in unorganized sector
                has suffered many obstacles largely due to lack of knowledge on
                the part of traders as well as law enforcing agency and there
                were undue and uncalled for interference posing hurdles to the
                safe sailing of the trade for which it was felt by some
                prominent traders of Hojai area back in 1975-76 to form some
                sort of association / NGO for the improvement and expansion of
                the trade.
              </p>
              <p className="text-charcoal text-base md:text-lg leading-relaxed mb-6">
                In the pursuit of which{" "}
                <strong className="text-green-deep">
                  ALL ASSAM AGAR TRADERS AND AGAR OIL MANUFACTURERS, ASSOCIATION
                  (AATMA)
                </strong>{" "}
                was formed under the President ship and Secretary ship of{" "}
                <strong className="text-green-deep">
                  AATMA's founding members
                </strong>{" "}
                in <strong className="text-green-deep">1976</strong> with its
                H.O. at Hojai which was duly registered vide{" "}
                <strong className="text-green-deep">664 of 1978-79</strong>.
              </p>
              <p className="text-charcoal text-base md:text-lg leading-relaxed mb-6">
                Since then the Association continuously fought legally as well
                as by submitting different representations before the govt to
                remove unnecessary interference and hurdle in the interest of
                smooth going of the trade.
              </p>
              <p className="text-charcoal text-base md:text-lg leading-relaxed">
                In the year 2000, the Association was re-organized in a General
                Meeting at Hojai under{" "}
                <strong className="text-green-deep">
                  AATMA's President at the time
                </strong>
                , with its Executive body.
              </p>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal variant="fade" delay={100}>
            <div className="relative">
              <img
                src={assetUrl("history/founders-1976.jpg")}
                alt="AATMA's founding members, 1976"
                className="w-full h-auto rounded-sm shadow-lg border border-cream-dark"
                loading="lazy"
              />
              <div className="mt-4 text-center">
                <span className="font-assamese text-gold-deep-light text-lg opacity-90">
                  আত্মা স্থাপিত হোজাইত
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Highlight box */}
        <Reveal variant="up" delay={200} className="mt-12 md:mt-16">
          <div className="max-w-3xl mx-auto bg-[linear-gradient(135deg,var(--color-green-deep),var(--color-green-mid))] text-cream rounded-sm p-8 md:p-10 text-center shadow-lg">
            <div className="font-display text-5xl md:text-6xl text-gold font-bold mb-4">
              1976
            </div>
            <div className="font-assamese text-gold-light text-xl md:text-2xl opacity-85 mb-4">
              আত্মা স্থাপিত হোজাইত
            </div>
            <p className="text-cream/90 text-base md:text-lg">
              AATMA founded in Hojai, Assam — registered vide 664 of 1978-79
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FormationSection;
