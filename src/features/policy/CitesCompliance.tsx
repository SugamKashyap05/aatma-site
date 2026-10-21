import { Reveal } from "@/components/ui/reveal";
import { Globe, CheckCircle } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CITES_TIMELINE = [
  {
    period: "Until 2005",
    status: "LPC issued",
    description:
      "Local forest authorities issued LPCs for re-export products derived from imported agar wood to comply with CITES provisions",
    source: "AATMA-supplied brief, §5",
  },
  {
    period: "Oct 2005",
    status: "Disrupted",
    description:
      "DFO Hojai denied CITES verification on alleged verbal instruction of the then Forest Minister. Around seven processing units suffered massive financial losses; several prominent business houses shifted operations to neighbouring states like Meghalaya and overseas.",
    source: "A Brief History of Agar, §7",
  },
  {
    period: "Jan 2023",
    status: "Rules notified",
    description:
      "Assam Wood Based Industries (Promotion and Development) Rules 2022 were notified on 12 January 2023 and described by AATMA as fully CITES compliant.",
    source: "AATMA press note, 14 Jan 2023",
  },
  {
    period: "2023+",
    status: "Trade provisions",
    description:
      "AATMA's supplied press note says the Rules paved the way for import and re-export, as well as export of domestic agarwood products.",
    source: "AATMA press note, 14 Jan 2023",
  },
];

const CITES_KEY_FACTS = [
  "CITES verification was a mandatory step for import and re-export of agar wood consignments",
  "DFO (Divisional Forest Officer) was the authority responsible for CITES verification",
  "Around seven processing units suffered massive financial losses after the October 2005 denial of CITES verification by DFO Hojai",
  "AATMA's 14 January 2023 press note describes the Assam Wood Based Industries (Promotion and Development) Rules 2022 as fully CITES compliant",
  "AATMA's supplied press note says the 2022 rules paved the way for import and re-export, as well as export of domestic agar wood products",
  "Registration under the 2022 rules is valid for 5 years",
  "The 2022 rules replaced the 2000 rules that had imposed legal hurdles blocking import and re-export",
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CitesCompliance — CITES compliance section for the /policy page.
 * Summarizes the CITES claims in client-supplied documents.
 */
export function CitesCompliance() {
  return (
    <section id="cites" className="relative pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <Reveal variant="fade" delay={0}>
          <div className="mb-12 md:mb-16">
            <span className="glass-card inline-flex items-center gap-2 text-gold-light text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-4">
              <Globe size={14} />
              Section 4
            </span>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-3">
              CITES <span className="text-gold-light">Compliance</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl">
              Client documents describe the verification process, the 2005 disruption, and the 2022 Rules.
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
                          item.status === "LPC issued"
                            ? "bg-emerald-400/20 border-emerald-400"
                            : item.status === "Disrupted"
                              ? "bg-red-400/20 border-red-400"
                              : item.status === "Blocked"
                                ? "bg-red-400/20 border-red-400"
                                : item.status === "Rules notified"
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
                              item.status === "LPC issued"
                                ? "text-emerald-400 bg-emerald-400/10"
                                : item.status === "Disrupted"
                                  ? "text-red-400 bg-red-400/10"
                                  : item.status === "Blocked"
                                    ? "text-red-400 bg-red-400/10"
                                    : item.status === "Rules notified"
                                      ? "text-gold-light bg-gold/10"
                                      : "text-emerald-400 bg-emerald-400/10"
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="text-cream/75 text-xs">
                            [{item.source}]
                          </span>
                        </div>
                        <p className="text-cream/75 text-sm leading-relaxed">
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

        {/* Key facts */}
        <div className="grid gap-8">
          {/* Key facts */}
          <Reveal variant="fade" delay={200}>
            <div className="glass-card rounded-lg p-6">
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Key Facts
              </h3>
              <ul className="space-y-3">
                {CITES_KEY_FACTS.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-white/70 text-sm leading-relaxed">
                    <span className="text-gold-light mt-1.5 shrink-0">▸</span>
                    {fact}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-cream/75 text-xs leading-relaxed">
                Sources: AATMA-supplied brief, §5; A Brief History of Agar, §7; AATMA press note, 14 January 2023.
              </p>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
}

export default CitesCompliance;
