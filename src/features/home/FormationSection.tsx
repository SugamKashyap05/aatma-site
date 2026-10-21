import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
 * Copy source: client document `documents/A BRIEF HISTORY OF AGAR.pdf` p.2,
 * section "FORMATION OF AATMA" (extracted at `docs/_agar_history_raw.txt:58-71`).
 * Every sentence below is the client's own wording, with grammar corrections
 * only — run-on sentences split, "some sort of association / NGO" -> "some sort
 * of association", and spellings corrected ("President ship" ->
 * "presidentship", "ASSOCTION" -> "ASSOCIATION"). No fact, date or number is
 * added.
 *
 * Ledger status (`docs/APPROVED_CONTENT_LEDGER.md` §6, rows #46-#53):
 *   #48 body paragraph, #49 "1976", #50 "664 of 1978-79", #51 the 2000
 *   re-organisation, #53 the highlight box — all `verified` against [HIST] p.2.
 *   #46 ("The Birth of AATMA", the demo heading), #47 (the demo subtitle) and
 *   #52 (the Assamese line "আত্মা স্থাপিত হোজাইত") are `needs client
 *   confirmation`, so none of them is used: the <h2> is the client's own
 *   section title, "FORMATION OF AATMA", and the Assamese caption line is gone.
 *
 * Member names are replaced with role descriptions per the anonymization map
 * in `docs/HOMEPAGE_REDESIGN_PLAN.md` §3.3:
 *   "(L) [REDACTED: AATMA member], (L) [REDACTED: AATMA member] and (L) [REDACTED: AATMA member]"
 *     -> "AATMA's founding members"
 *   "[REDACTED: AATMA member] as President" -> "AATMA's President ... at the time"
 *   "(L) [REDACTED: AATMA member] as General Secretary"
 *     -> "AATMA's General Secretary at the time"
 * No AATMA member or office-holder name appears in this component.
 *
 * "Learn more" target: the dedicated `/about` page
 * (`src/features/about/AboutPage.tsx`), which carries the complete client
 * brief in ten sequential sections. About is also the `#about` section of
 * the home page (`src/features/about/About.tsx`), which is how the site's
 * own footer links it (`src/features/footer/Footer.tsx` -> "/#about"),
 * and Navbar's hash effect scrolls it into view
 * (`src/components/ui/Navbar.tsx`, lines 67-80). The full formation
 * chronology lives at `/history`.
 */
export function FormationSection({ className }: FormationSectionProps) {
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

        {/* Client-supplied formation copy; no project-created historical image. */}
        <div className="grid grid-cols-1 gap-10 md:gap-12">
          {/* Text card — [HIST] p.2, member names replaced with role descriptions */}
          <Reveal variant="fade" delay={0}>
            <div className="mx-auto max-w-4xl bg-glass-card backdrop-blur-xl rounded-sm p-6 md:p-8 shadow-lg border border-white/20 space-y-5">
              <p className="text-agar-body text-base md:text-lg leading-relaxed">
                The trade being a cottage based industry in unorganized sector
                has suffered many obstacles largely due to lack of knowledge on
                the part of traders as well as law enforcing agency, and there
                were undue and uncalled for interference posing hurdles to the
                safe sailing of the trade. It was for this that some prominent
                traders of Hojai area, back in 1975-76, felt the need to form
                some sort of association for the improvement and expansion of
                the trade.
              </p>
              <p className="text-agar-body text-base md:text-lg leading-relaxed">
                In the pursuit of which{" "}
                <strong className="text-agar-title">
                  ALL ASSAM AGAR TRADERS AND AGAR OIL MANUFACTURERS, ASSOCIATION
                  (AATMA)
                </strong>{" "}
                was formed under the presidentship and secretaryship of{" "}
                <strong className="text-agar-title">
                  AATMA&rsquo;s founding members
                </strong>{" "}
                in <strong className="text-agar-label">1976</strong> with its
                H.O. at Hojai, which was duly registered vide{" "}
                <strong className="text-agar-label">664 of 1978-79</strong>.
              </p>
              <p className="text-agar-body text-base md:text-lg leading-relaxed">
                Since then the Association continuously fought legally as well
                as by submitting different representations before the govt to
                remove unnecessary interference and hurdle in the interest of
                smooth going of the trade.
              </p>

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
