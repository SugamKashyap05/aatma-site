import { Reveal } from "@/components/ui/reveal";
import { Building2, Scale, CheckCircle, FileText, ArrowRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const WOOD_INDUSTRIES_CONTENT = {
  title: "Assam Wood Based Industries (Promotion and Development) Rules 2022",
  notification: "No. 20, eCF No. 237152, 12-01-2023",
  repeals: "Assam Wood Based Industries (Establishment and Regulation) Rules 2000",
  sections: [
    {
      heading: "Classification",
      items: [
        "Agar Wood Based Industries declared as Secondary Wood Based Industries",
        "AATMA's supplied brief describes the 2022 Rules as removing the licence requirement; the rules provide for registration",
      ],
    },
    {
      heading: "Registration",
      items: [
        "Registration handled by Registration Committees at the level of Conservator of Forests concerned",
        "Registration valid for five (5) years",
        "Units can function from present locations after obtaining registration",

      ],
    },
    {
      heading: "Unit Categorization",
      items: [
        "Units categorized into Micro, Small, Medium and Large based on aggregate capacity",

      ],
    },
    {
      heading: "CITES Compliance",
      items: [
        "AATMA's 14 January 2023 press note describes the 2022 Rules as fully CITES compliant",
        "AATMA's 14 January 2023 press note says the Rules pave the way for revival of agarwood industries and import, re-export, and export of domestic agarwood products",
      ],
    },
    {
      heading: "Industry Context",
      items: [
        "AATMA's 14 January 2023 press note reports about 1,000 Agar Wood Based Industries in Assam",
      ],
    },
  ],
  advocacy: [
    { year: "24 August 2016", event: "An AATMA delegation met the Forest Minister and submitted a memorandum concerning the 2000 Rules." },
    { year: "28 October 2016", event: "The Assam Forest Department organized a National Conference on Agarwood & Oil Industries at NEDFi House, Guwahati." },
    { year: "12 January 2023", event: "The Assam Wood Based Industries (Promotion and Development) Rules 2022 were notified." },
  ],
};

const TREES_OUTSIDE_FOREST_CONTENT = {
  title: "Assam Trees Outside Forest (Sustainable Management) Rules 2022",
  notification: "9 Dec 2022, ECF No. 232904, Assam Gazette No. 1 of 2 Jan 2023",
  sections: [
    {
      heading: "Purpose & Applicability",
      items: [
        "Assam has a huge population of Agar trees growing on non-forest lands by private farmers",
        "Rules promote and facilitate the creation of Agar tree plantations on non-forest lands",
        "Makes raw material available for Agar Wood Based Industries",
      ],
    },
    {
      heading: "Simplified Procedures",
      items: [
        "Simplifies procedures for registration of Agar tree plantations",
        "Simplifies felling and transportation of harvested material from various parts of the State to Agar Wood Based Industries",
      ],
    },
    {
      heading: "Online Platform",
      items: [
        "AATMA's supplied brief states that both rules operate on an end-to-end online platform for traders and planters, providing transparency and timely permissions by reducing human interface",
      ],
    },
    {
      heading: "Complementary Relationship",
      items: [
        "Complement and supplement the Wood Based Industries Rules 2022",

      ],
    },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * RulesSection — regulatory content for both 2022 rule sets.
 * Section 1: Wood Based Industries Rules 2022
 * Section 2: Trees Outside Forest Rules 2022
 */
export function RulesSection() {
  return (
    <>
      {/* Section 1: Wood Based Industries Rules 2022 */}
      <section id="rules-wood-industries" className="relative pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal variant="fade" delay={0}>
            <div className="mb-12 md:mb-16">
              <span className="glass-card inline-flex items-center gap-2 text-gold-light text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-4">
                <Building2 size={14} />
                Section 1
              </span>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-3">
                Assam Wood Based Industries{" "}
                <span className="text-gold-light">(Promotion and Development) Rules 2022</span>
              </h2>
              <p className="text-white/70 text-base md:text-lg max-w-3xl">
                The primary regulatory framework for agar wood processing units in Assam —
                replacing the restrictive 2000 rules with a promotive, developmental regime.
              </p>
            </div>
          </Reveal>

          {/* Key facts bar */}
          <Reveal variant="fade" delay={100}>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="glass-card rounded-lg p-4">
                <p className="text-cream/80 text-xs uppercase tracking-wider mb-1">Notified</p>
                <p className="text-white font-display font-bold text-base">{WOOD_INDUSTRIES_CONTENT.notification}</p>
              </div>
              <div className="glass-card rounded-lg p-4">
                <p className="text-cream/80 text-xs uppercase tracking-wider mb-1">Repeals</p>
                <p className="text-white/70 text-sm leading-snug">{WOOD_INDUSTRIES_CONTENT.repeals}</p>
              </div>
              <div className="glass-card rounded-lg p-4">
                <p className="text-cream/80 text-xs uppercase tracking-wider mb-1">Registration Validity</p>
                <p className="text-white font-display font-bold text-base">5 Years</p>
              </div>
            </div>
          </Reveal>

          {/* Content sections */}
          <div className="space-y-8">
            {WOOD_INDUSTRIES_CONTENT.sections.map((section, si) => (
              <Reveal key={si} variant="fade" delay={si * 60}>
                <div className="glass-card rounded-lg p-6">
                  <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gold-light" />
                    {section.heading}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-white/70 text-sm leading-relaxed">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Advocacy timeline */}
          <Reveal variant="fade" delay={200}>
            <div className="mt-10">
              <h3 className="font-display font-bold text-lg md:text-xl text-white mb-6">
                Client-supplied advocacy milestones
              </h3>
              <div className="relative">
                <div
                  className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-white/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="space-y-4">
                  {WOOD_INDUSTRIES_CONTENT.advocacy.map((item, i) => (
                    <Reveal key={i} variant="up" delay={i * 40}>
                      <div className="relative flex gap-4 pl-8 md:pl-10">
                        <div className="absolute left-1.5 md:left-2.5 top-1.5 w-3 h-3 rounded-full bg-gold/20 border-2 border-gold" />
                        <div className="flex-1 min-w-0">
                          <span className="text-gold-light font-display font-bold text-sm">{item.year}</span>
                          <p className="text-cream/75 text-sm leading-relaxed mt-0.5">{item.event}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Cross-reference */}
          <Reveal variant="fade" delay={300}>
            <div className="mt-8 glass-card rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-gold-light shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong className="text-gold-light">Related:</strong> The 2022 rules introduced two parallel
                  regulatory regimes. See{" "}
                  <a href="#rules-trees-outside-forest" className="text-gold-light underline underline-offset-2 hover:text-gold-light transition-colors">
                    Trees Outside Forest Rules 2022
                  </a>{" "}
                  for the complementary plantation framework, the{" "}
                  <a href="#comparison" className="text-gold-light underline underline-offset-2 hover:text-gold-light transition-colors">
                    2000 vs 2022 comparison
                  </a>{" "}
                  for detailed differences, and the{" "}
                  <a href="#cites" className="text-gold-light underline underline-offset-2 hover:text-gold-light transition-colors">
                    CITES Compliance
                  </a>{" "}
                  section for how the 2022 rules resolved trade disruptions.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2: Trees Outside Forest Rules 2022 */}
      <section id="rules-trees-outside-forest" className="relative pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal variant="fade" delay={0}>
            <div className="mb-12 md:mb-16">
              <span className="glass-card inline-flex items-center gap-2 text-gold-light text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-4">
                <Scale size={14} />
                Section 2
              </span>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-3">
                Assam Trees Outside Forest{" "}
                <span className="text-gold-light">(Sustainable Management) Rules 2022</span>
              </h2>
              <p className="text-white/70 text-base md:text-lg max-w-3xl">
                The complementary framework for agar tree plantations on non-forest land —
                simplifying registration, felling, and transportation to supply raw material
                to the processing industry.
              </p>
            </div>
          </Reveal>

          <div className="space-y-8">
            {TREES_OUTSIDE_FOREST_CONTENT.sections.map((section, si) => (
              <Reveal key={si} variant="fade" delay={si * 60}>
                <div className="glass-card rounded-lg p-6">
                  <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gold-light" />
                    {section.heading}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-white/70 text-sm leading-relaxed">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Cross-reference */}
          <Reveal variant="fade" delay={200}>
            <div className="mt-8 glass-card rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-gold-light shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong className="text-gold-light">Related:</strong> These rules complement the Wood Based
                  Industries Rules 2022. See the{" "}
                  <a href="#comparison" className="text-gold-light underline underline-offset-2 hover:text-gold-light transition-colors">
                    comparison table
                  </a>{" "}
                  for how the two rule sets work together.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default RulesSection;
