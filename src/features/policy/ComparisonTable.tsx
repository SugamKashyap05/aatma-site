import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, X, AlertTriangle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ComparisonRow {
  aspect: string;
  rule2000: string;
  rule2022: string;
  /** "improved" = 2022 is better, "changed" = neutral change, "new" = introduced in 2022 */
  trend: "improved" | "changed" | "new";
  /** Source document label */
  source: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COMPARISON_DATA: ComparisonRow[] = [
  {
    aspect: "Rule Name",
    rule2000: "Assam Wood Based Industries (Establishment and Regulation) Rules, 2000",
    rule2022: "Assam Wood Based Industries (Promotion and Development) Rules, 2022",
    trend: "changed",
    source: "Doc 1, Doc 2, Doc 3",
  },
  {
    aspect: "Philosophy & Approach",
    rule2000: "\"Establishment and Regulation\" — restrictive, regulatory regime focused on control",
    rule2022: "\"Promotion and Development\" — liberalizing, promoting growth and ease of business",
    trend: "improved",
    source: "Doc 1, Doc 2",
  },
  {
    aspect: "Industry Classification",
    rule2000: "Agar oil extracting units classified as \"wood based industries\" — pushed growers/traders into regulatory uncertainty",
    rule2022: "Agar Wood Industries declared as \"Secondary Wood Based Industries\" — liberalized and simplified",
    trend: "improved",
    source: "Doc 1, Doc 2",
  },
  {
    aspect: "License / Registration Regime",
    rule2000: "License regime with associated restrictions; strict laws governing operations",
    rule2022: "Liberated from license regime and associated restrictions; simplified procedures",
    trend: "improved",
    source: "Doc 1, Doc 2",
  },
  {
    aspect: "Registration Authority",
    rule2000: "Not specified in source documents",
    rule2022: "Registration Committees at the level of Conservator of Forests concerned — local accessibility",
    trend: "improved",
    source: "Doc 2",
  },
  {
    aspect: "Registration Validity",
    rule2000: "Not specified in source documents",
    rule2022: "Valid for five (5) years",
    trend: "new",
    source: "Doc 2",
  },
  {
    aspect: "Unit Categorization",
    rule2000: "Not specified",
    rule2022: "Categorized into Micro, Small, Medium, and Large units based on aggregate capacity",
    trend: "new",
    source: "Doc 2",
  },
  {
    aspect: "Location Requirements",
    rule2000: "Units faced restrictions; many shifted to Meghalaya due to regulatory burden",
    rule2022: "Can function from present locations after obtaining registration — no relocation required",
    trend: "improved",
    source: "Doc 1, Doc 2",
  },
  {
    aspect: "Import / Re-export",
    rule2000: "Import of Agar Wood material into Assam and re-export stopped due to legal hurdles",
    rule2022: "Paved way for revival of import and re-export as well as export of domestic agar wood products",
    trend: "improved",
    source: "Doc 2, Doc 3",
  },
  {
    aspect: "CITES Compliance",
    rule2000: "CITES verification was a hurdle — in October 2005, DFO Hojai denied verification, allegedly on verbal instruction of the Forest Minister",
    rule2022: "AATMA's 14 January 2023 press note describes the Rules as fully CITES compliant and says they pave the way for import, re-export, and export",
    trend: "improved",
    source: "Doc 1, Doc 2",
  },
  {
    aspect: "Online Platform",
    rule2000: "Not mentioned in source documents",
    rule2022: "Complete and interactive end-to-end online platform for traders/planters; transparency, timely permissions, reduced human interface",
    trend: "new",
    source: "Doc 2",
  },
  {
    aspect: "Impact on Trade",
    rule2000: "Major setback; several units shifted to Meghalaya; trade crippled; huge loss of industries and foreign currency",
    rule2022: "Immense boost to trade after 23 years; revival of Agar Wood Industries; Assam to reclaim global capital status",
    trend: "improved",
    source: "Doc 1, Doc 3",
  },
  {
    aspect: "Number of Industries",
    rule2000: "Not specified",
    rule2022: "AATMA's 14 January 2023 press note reports about 1,000 Agar Wood Based Industries in Assam",
    trend: "new",
    source: "Doc 2",
  },
  {
    aspect: "Industry Locations",
    rule2000: "Not specified",
    rule2022: "Predominantly located in Hojai, Golaghat, Sibasagar",
    trend: "new",
    source: "Doc 2",
  },
  {
    aspect: "Complementary Rules",
    rule2000: "No complementary rules mentioned",
    rule2022: "Assam Trees Outside Forest (Sustainable Management) Rules 2022 complements and supplements",
    trend: "new",
    source: "Doc 2, Doc 3",
  },
  {
    aspect: "Plantation Registration",
    rule2000: "Not mentioned",
    rule2022: "Simplified procedures for registration of Agar tree plantations on non-forest lands",
    trend: "new",
    source: "Doc 2",
  },
  {
    aspect: "Felling & Transportation",
    rule2000: "Not mentioned",
    rule2022: "Simplified procedures for felling and transportation of harvested material from various parts of the State to industries",
    trend: "new",
    source: "Doc 2",
  },
  {
    aspect: "Small / Marginal Farmers",
    rule2000: "Not mentioned",
    rule2022: "Benefits small and marginal farmers; provides necessary impetus for small traders to conduct trade in affordable manner",
    trend: "new",
    source: "Doc 2",
  },
  {
    aspect: "Employment Impact",
    rule2000: "Thousands of workers lost livelihood; units shifted out of Assam",
    rule2022: "Employment to lakhs of skilled workers directly or indirectly engaged in Agar trade",
    trend: "improved",
    source: "Doc 1, Doc 2, Doc 3",
  },
  {
    aspect: "Notification Date",
    rule2000: "2000 (exact date not specified in source documents)",
    rule2022: "12 January 2023",
    trend: "changed",
    source: "Doc 2, Doc 3",
  },
  {
    aspect: "Government Response to AATMA",
    rule2000: "AATMA pursued matter with five successive governments — all in vain; Assam Cabinet did not approve CEC recommendation (2006)",
    rule2022: "CM Himanta Biswa Sarma notified Rules 2022; Forest Minister Chandra Mohan Patowary contributed",
    trend: "improved",
    source: "Doc 1, Doc 2, Doc 3",
  },
  {
    aspect: "Central Empowered Committee",
    rule2000: "CEC recommended incorporating Agarwood industries in Secondary Wood Based Industry (2006); Assam Cabinet did not approve",
    rule2022: "Not applicable — 2022 rules already classify as Secondary Wood Based Industry",
    trend: "improved",
    source: "Doc 1",
  },
  {
    aspect: "DFO Verification Issue",
    rule2000: "Oct/Nov 2005: DFO Hojai denied verification unlawfully; around seven processing units suffered massive financial losses",
    rule2022: "Not applicable — 2022 rules fully CITES compliant with online platform",
    trend: "improved",
    source: "Doc 1, Doc 2",
  },
  {
    aspect: "Business Migration",
    rule2000: "Several prominent business houses shifted operations to neighboring Meghalaya and overseas",
    rule2022: "Not applicable — 2022 rules enable revival within Assam",
    trend: "improved",
    source: "Doc 1",
  },
];

/** Number of comparison rows rendered. Exported so copy that references the
 *  count cannot drift from the data. */
export const COMPARISON_ROW_COUNT = COMPARISON_DATA.length;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function TrendBadge({ trend }: { trend: ComparisonRow["trend"] }) {
  if (trend === "improved") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
        <Check className="w-3 h-3" />
        Client-source characterization
      </span>
    );
  }
  if (trend === "new") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold-light bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full">
        <ArrowRight className="w-3 h-3" />
        New in 2022
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-cream/75 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
      <AlertTriangle className="w-3 h-3" />
      Changed
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ComparisonTable — 2000 vs 2022 rules comparison for the /policy page.
 * Renders a responsive, accessible table with trend indicators and source labels.
 */
export function ComparisonTable() {
  return (
    <div className="w-full">
      {/* Desktop table */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-white/[0.06] border-b border-white/10">
              <th className="px-5 py-4 font-display font-bold text-gold-light text-base tracking-wide w-[180px]">
                Aspect
              </th>
              <th className="px-5 py-4 font-display font-bold text-white/90 text-base tracking-wide">
                <span className="flex items-center gap-2">
                  <X className="w-4 h-4 text-red-400" />
                  2000 Rules
                </span>
              </th>
              <th className="px-5 py-4 font-display font-bold text-white/90 text-base tracking-wide">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  2022 Rules
                </span>
              </th>
              <th className="px-5 py-4 font-display font-bold text-cream/75 text-sm tracking-wide w-[120px]">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_DATA.map((row, i) => (
              <Reveal
                key={row.aspect}
                variant="fade"
                delay={i * 30}
                duration={400}
              >
                <tr
                  className={cn(
                    "border-b border-white/5 transition-colors hover:bg-glass-card active:bg-glass-surface-subtle",
                    i % 2 === 0 ? "bg-white/[0.01]" : "bg-transparent"
                  )}
                >
                  <td className="px-5 py-4 align-top">
                    <span className="font-semibold text-white/90 text-sm leading-snug">
                      {row.aspect}
                    </span>
                    <span className="block text-cream/75 text-xs mt-1">
                      {row.source}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <span className="text-cream/75 text-sm leading-relaxed">
                      {row.rule2000}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <span className="text-white/80 text-sm leading-relaxed">
                      {row.rule2022}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <TrendBadge trend={row.trend} />
                  </td>
                </tr>
              </Reveal>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {COMPARISON_DATA.map((row, i) => (
          <Reveal key={row.aspect} variant="up" delay={i * 40} duration={500}>
            <div className="glass-card rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-bold text-white text-base leading-snug">
                  {row.aspect}
                </h3>
                <TrendBadge trend={row.trend} />
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-cream/75 uppercase tracking-wider">
                      2000 Rules
                    </span>
                    <p className="text-cream/75 text-sm leading-relaxed mt-0.5">
                      {row.rule2000}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-cream/75 uppercase tracking-wider">
                      2022 Rules
                    </span>
                    <p className="text-white/80 text-sm leading-relaxed mt-0.5">
                      {row.rule2022}
                    </p>
                  </div>
                </div>
              </div>

              <span className="text-cream/75 text-xs">{row.source}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Footnotes */}
      <Reveal variant="fade" delay={200} duration={600}>
        <div className="mt-6 pt-4 border-t border-white/10">
          <h4 className="text-gold-light text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Notes
          </h4>
          <ul className="space-y-1.5 text-cream/75 text-xs leading-relaxed">
            <li>
              <strong className="text-white/70">Doc 1:</strong> "A brief note on Agar Trade" — Historical narrative of agar trade in Assam
            </li>
            <li>
              <strong className="text-white/70">Doc 2:</strong> AATMA Press Note — Press release on 2022 Rules
            </li>
            <li>
              <strong className="text-white/70">Doc 3:</strong> AATMA to HCM — Memorandum to Chief Minister of Assam
            </li>
            <li className="pt-2 text-cream/75 italic">
              Trend labels describe the client-supplied source's characterization; they are not an independent legal assessment.
            </li>
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

export default ComparisonTable;
