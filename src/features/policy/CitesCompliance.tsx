import { Reveal } from "@/components/ui/reveal";
import { Globe, CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CITES_TIMELINE = [
  {
    period: "Pre-2005",
    status: "Functioning",
    description:
      "CITES verification by DFO required for import/re-export; functioning normally",
    source: "Doc 1",
  },
  {
    period: "Oct 2005",
    status: "Disrupted",
    description:
      "DFO Hojai denied CITES verification on alleged verbal instruction of Forest Minister; 6-7 units suffered huge losses",
    source: "Doc 1",
  },
  {
    period: "2005-2022",
    status: "Blocked",
    description:
      "Trade crippled; 7-8 businesses shifted to Meghalaya and abroad; huge loss of industries and foreign currency",
    source: "Doc 1, Doc 3",
  },
  {
    period: "Jan 2023",
    status: "Resolved",
    description:
      "Assam Wood Based Industries (Promotion and Development) Rules 2022 notified — fully CITES compliant",
    source: "Doc 2",
  },
  {
    period: "2023+",
    status: "Revived",
    description:
      "Import, re-export, and export of agar wood products revived under CITES-compliant framework",
    source: "Doc 2",
  },
];

const CITES_KEY_FACTS = [
  "CITES verification was a mandatory step for import and re-export of agar wood consignments",
  "DFO (Divisional Forest Officer) was the authority responsible for CITES verification",
  "The 2005 denial of CITES verification by DFO Hojai caused 6-7 processing units to suffer huge losses",
  "The Assam Wood Based Industries (Promotion and Development) Rules 2022 are explicitly \"fully CITES compliant\"",
  "CITES compliance under the 2022 rules enables import, re-export, and export of domestic agar wood products",
  "Registration under the 2022 rules is valid for 5 years",
  "The 2022 rules replaced the 2000 rules that had imposed legal hurdles blocking import and re-export",
];

const CITES_GAPS = [
  "No specific CITES Appendix or Schedule references (e.g., Appendix I, II, III)",
  "No specific permit or certificate types mentioned",
  "No penalty provisions for CITES non-compliance",
  "No specific CITES-listed species names (e.g., Aquilaria malaccensis)",
  "No reference to the CITES Secretariat or international CITES bodies",
  "No mention of the Wildlife Protection Act, 1972",
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CitesCompliance — CITES compliance section for the /policy page.
 * Includes timeline, key facts, gaps, and cross-references.
 */
export function CitesCompliance() {
  return (
    <section id="cites" className="relative pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <Reveal variant="fade" delay={0}>
          <div className="mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-1.5 rounded-sm mb-4">
              <Globe size={14} />
              Section 4
            </span>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-3">
              CITES <span className="text-gold">Compliance</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl">
              How the 2022 rules resolved decades of CITES-related trade disruptions —
              and what compliance means for your business today.
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <Reveal variant="fade" delay={100}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-6">
              CITES Compliance Timeline
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-red-400/60 via-gold/40 to-emerald-400/60"
                aria-hidden="true"
              />
              <div className="space-y-6">
                {CITES_TIMELINE.map((item, i) => (
                  <Reveal key={item.period} variant="up" delay={i * 80}>
                    <div className="relative flex gap-4 md:gap-6 pl-10 md:pl-14">
                      {/* Dot */}
                      <div
                        className={`absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 rounded-full border-2 ${
                          item.status === "Functioning"
                            ? "bg-emerald-400/20 border-emerald-400"
                            : item.status === "Disrupted"
                              ? "bg-red-400/20 border-red-400"
                              : item.status === "Blocked"
                                ? "bg-red-400/20 border-red-400"
                                : item.status === "Resolved"
                                  ? "bg-gold/20 border-gold"
                                  : "bg-emerald-400/20 border-emerald-400"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-display font-bold text-white text-base">
                            {item.period}
                          </span>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              item.status === "Functioning"
                                ? "text-emerald-400 bg-emerald-400/10"
                                : item.status === "Disrupted"
                                  ? "text-red-400 bg-red-400/10"
                                  : item.status === "Blocked"
                                    ? "text-red-400 bg-red-400/10"
                                    : item.status === "Resolved"
                                      ? "text-gold bg-gold/10"
                                      : "text-emerald-400 bg-emerald-400/10"
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="text-white/30 text-xs">
                            [{item.source}]
                          </span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Key facts + gaps */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Key facts */}
          <Reveal variant="fade" delay={200}>
            <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Key Facts
              </h3>
              <ul className="space-y-3">
                {CITES_KEY_FACTS.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-white/70 text-sm leading-relaxed">
                    <span className="text-gold/60 mt-1.5 shrink-0">▸</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Gaps */}
          <Reveal variant="fade" delay={300}>
            <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-gold" />
                Not in Source Documents
              </h3>
              <ul className="space-y-3">
                {CITES_GAPS.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-white/50 text-sm leading-relaxed">
                    <XCircle className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" />
                    {gap}
                  </li>
                ))}
              </ul>
              <p className="mt-4 pt-3 border-t border-white/10 text-white/40 text-xs italic">
                For complete CITES guidance, contact the Assam Forest Department or refer to the
                official CITES documentation.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Cross-reference */}
        <Reveal variant="fade" delay={400}>
          <div className="mt-8 bg-gold/5 border border-gold/20 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-gold shrink-0">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white/80 text-sm leading-relaxed">
                <strong className="text-gold">Related:</strong> CITES compliance is an ongoing
                obligation under the 2022 rules. See the{" "}
                <a href="#registration" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">
                  Registration Walkthrough
                </a>{" "}
                for how CITES compliance integrates with the registration process, and the{" "}
                <a href="#platform" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">
                  Online Platform Guidance
                </a>{" "}
                for how to submit CITES compliance reports.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CitesCompliance;
