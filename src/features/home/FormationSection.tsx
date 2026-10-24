import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface FormationSectionProps {
  className?: ClassValue;
  /**
   * Declared for API parity with the other home sections (About, AgarStory,
   * PressSection and Contact all accept it). Layout here is breakpoint-driven,
   * so the section is single-column on phones whether or not a caller supplies
   * a tier.
   */
  deviceTier?: "mobile" | "tablet" | "desktop";
}

/**
 * Formation section — how AATMA came into being.
 *
 * Copy source: final client brief `documents/A brief note on Agar Trade
 * (2) (2)-2.pdf` (attached 2026-10-23), p.3, sections "FORMATION OF AATMA"
 * and "NATIONAL SEMINAR ON SCOPE & DIMENTIN OF AGAR (Aquilqriq spp.)
 * PLANTATION IN N.E.REGION". The wording is published verbatim, word for
 * word, per the user's explicit instruction; the run-on sentence is split at
 * sentence boundaries only for web readability, and no fact, date, name or
 * number is added or removed. The source's own slips ("ASSOCTION",
 * "DIMENTIN", "Aquilqriq", "President ship"/"Secretary ship") are preserved
 * deliberately — say the word and they can be corrected.
 *
 * Office-bearer names render verbatim per the user's explicit direction
 * (2026-10-23): the three founders — (L) Hazi Anfar Ali, (L) Hazi Samsul
 * Islam, (L) Binay Kumar Paul — and the 2000 re-organization officers —
 * Ataur Rahman (President), (L) Jamal Uddin Choudhury (General Secretary).
 * An earlier revision replaced them with role placeholders; the client
 * caught the redaction on the live page, so the section now copies the
 * brief exactly. The same names render on `/about`
 * (`src/data/about-spine.ts` §IV) and `/history`
 * (`src/data/history-chapters.ts`).
 *
 * Interaction: the card shows a preview of the formation paragraph; a Read
 * more button (the same pattern as `src/features/about/AboutOverview.tsx`)
 * expands the card in place to reveal the complete paragraph and the
 * National Seminar passage. `aria-expanded`/`aria-controls` keep the toggle
 * usable by assistive tech and keyboard.
 *
 * "Learn more" target: the dedicated `/about` page
 * (`src/features/about/AboutPage.tsx`), which carries the complete client
 * brief in ten sequential sections. The full formation chronology also lives
 * at `/history`.
 */
export function FormationSection({ className }: FormationSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="formation"
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20",
        "text-agar-body",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header — client's own section title, [HIST] p.2 */}
        <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          <Reveal variant="fade" delay={0}>
            <span className="bg-glass-card backdrop-blur-xl border border-white/20 inline-block text-agar-label text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-4">
              Formation
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight text-agar-title">
              Formation of AATMA
            </h2>
          </Reveal>
        </div>

        {/* Client-supplied formation copy, verbatim from the final brief; the preview expands to the full text. */}
        <div className="grid grid-cols-1 gap-10 md:gap-12">
          <Reveal variant="fade" delay={0}>
            <div className="mx-auto max-w-4xl bg-glass-card backdrop-blur-xl rounded-sm p-6 md:p-8 shadow-lg border border-white/20 space-y-5">
              {/* Preview — always visible */}
              <p className="text-agar-body text-base md:text-lg leading-relaxed">
                The trade being a cottage based industry in unorganized sector
                has suffered many obstacles largely due to lack of knowledge on
                the part of traders as well as law enforcing agency and there
                were undue and uncalled for interference posing hurdles to the
                safe sailing of the trade for which it was felt by some
                prominent traders of Hojai area back in 1975-76 to form some
                sort of association / NGO for the improvement and expansion of
                the trade.
              </p>

              {/* Full text — revealed when the card expands */}
              {expanded && (
                <div id="formation-full-text" className="space-y-5 pt-2">
                  <p className="text-agar-body text-base md:text-lg leading-relaxed">
                    In the pursuit of which{" "}
                    <strong className="text-agar-title">
                      ALL ASSAM AGAR TRADERS AND AGAR OIL MANUFACTURERS,
                      ASSOCTION (AATMA)
                    </strong>{" "}
                    was formed under the President ship and Secretary ship of{" "}
                    <strong className="text-agar-title">
                      (L) Hazi Anfar Ali, (L) Hazi Samsul Islam and (L) Binay
                      Kumar Paul
                    </strong>{" "}
                    in <strong className="text-agar-label">1976</strong> with
                    its H.O. at Hojai, which was duly registered vide{" "}
                    <strong className="text-agar-label">664 of 1978-79</strong>.
                  </p>
                  <p className="text-agar-body text-base md:text-lg leading-relaxed">
                    Since then the Association continuously fought legally as
                    well as by submitting different representations before the
                    govt to remove unnecessary interference and hurdle in the
                    interest of smooth conduct of the trade.
                  </p>
                  <p className="text-agar-body text-base md:text-lg leading-relaxed">
                    In the year 2000 AATMA was re-organized in a General
                    Meeting at Hojai with{" "}
                    <strong className="text-agar-title">Ataur Rahman</strong> as
                    President and{" "}
                    <strong className="text-agar-title">
                      (L) Jamal Uddin Choudhury
                    </strong>{" "}
                    as General Secretary and with its Executive body.
                  </p>

                  {/* National Seminar passage, final brief p.3, verbatim */}
                  <div className="space-y-4 pt-4 border-t border-white/15">
                    <h3 className="font-display font-bold text-lg md:text-xl leading-snug text-agar-title">
                      National Seminar on Scope &amp; Dimension of Agar
                      (Aquilaria spp.) Plantation in N.E. Region
                    </h3>
                    <p className="text-agar-body text-base md:text-lg leading-relaxed">
                      In November 2000, AATMA organized a National level seminar
                      on Scope &amp; Dimension of Agar (Aquilaria spp.)
                      plantation in North Eastern Region at Administrative
                      staff college, Guwahati, which was attended by several
                      scientist from different parts of India and was presided
                      over by{" "}
                      <strong className="text-agar-title">
                        Dr. P.K. Hajra, Ex Director of the Botanical Survey of
                        India
                      </strong>
                      .
                    </p>
                    <p className="text-agar-body text-base md:text-lg leading-relaxed">
                      Several scientific reports on Agar wood and its
                      plantation and development submitted by the participant
                      scientist are incorporated in the proceedings of the
                      seminar. The seminar was an eye-opener to different
                      entrepreneurs who started commercial plantation in their
                      private land in North Eastern states like Assam,
                      Nagaland, Tripura and Manipur etc. where it is a great
                      success and are major source of raw materials for Agar
                      wood trade &amp; Industry of the region now a days.
                    </p>
                    <p className="text-agar-body text-base md:text-lg leading-relaxed">
                      Survey conducted jointly by AATMA and Assam Govt. reveals
                      that there are more than crores of agar trees in private
                      cultivation in Upper Assam region, and other parts of the
                      state commercially. Similarly there are reports that wide
                      spread private cultivation have flourished in Tripura and
                      Nagaland as well. It is worth mentioning that lakhs of
                      people are involved in the cultivation agar trade as
                      well.
                    </p>
                  </div>
                </div>
              )}

              {/* Read more / Show less — same pattern as AboutOverview.tsx */}
              <div className="pt-2">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls="formation-full-text"
                  data-formation-read-more
                  onClick={() => setExpanded((current) => !current)}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-sm border border-gold/50 bg-glass-card px-5 py-2.5 text-sm font-semibold tracking-wide text-agar-label transition-colors hover:border-gold hover:bg-green-deep/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
                >
                  {expanded ? "Show less" : "Read more"}
                  <ArrowDown
                    size={16}
                    aria-hidden="true"
                    focusable="false"
                    className={cn(
                      "transition-transform motion-reduce:transition-none",
                      expanded && "rotate-180"
                    )}
                  />
                </button>
              </div>
            </div>
          </Reveal>

        </div>

        {/* Key fact + link to the About section */}
        <Reveal variant="up" delay={200} className="mt-12 md:mt-16">
          <div className="max-w-3xl mx-auto bg-[linear-gradient(135deg,var(--color-green-deep),var(--color-green-mid))] text-cream rounded-sm p-8 md:p-10 text-center shadow-lg">
            <div className="font-display text-5xl md:text-6xl text-gold-light font-bold mb-4">
              1976
            </div>
            <p className="text-cream/90 text-base md:text-lg mb-6">
              AATMA founded at Hojai, Assam — registered vide 664 of 1978-79
            </p>
            <Link
              to="/#about"
              className="inline-flex items-center gap-2 text-gold-light text-sm font-medium tracking-wide hover:text-cream active:text-cream transition-colors duration-300 group min-h-[44px] rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
            >
              Learn more about AATMA
              <span className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300">
                <ArrowRight size={16} strokeWidth={2} />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FormationSection;
