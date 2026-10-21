import { Reveal } from "@/components/ui/reveal";
import { TreePopulationByDistrict } from "@/components/charts/TreePopulationByDistrict";
import { AssamVsTripuraTrees } from "@/components/charts/AssamVsTripuraTrees";
import { GlobalMarketGrowth } from "@/components/charts/GlobalMarketGrowth";
import { TradeFlow } from "@/components/charts/TradeFlow";
import { AgarwoodPriceRanges } from "@/components/charts/AgarwoodPriceRanges";

/**
 * Trade & Conservation Data — /research
 *
 * Mounts the five research-route charts (CH-01, CH-02, CH-03, CH-05, CH-07) in
 * one coherent section, in the order the story reads:
 *   resource (trees) → scale (Assam vs Tripura) → market (growth)
 *   → movement (trade flow) → value (prices)
 *
 * Every chart carries its own source citation and, for the four drawn from
 * newspaper reporting, a press-estimate badge. This component adds framing
 * prose only — it never restates a figure the chart does not itself cite.
 *
 * The integrated narrative below combines the conservation and market prose
 * drafted in parallel. Every figure traces to The Assam Tribune, 18 Nov 2024,
 * PJ Vijayakar. Jorhat, Sivasagar, Karimganj, and Cachar are named without
 * figures — matching CH-01's "no figure reported" tracks. Chips (kg) and
 * oil (tola) units are kept separate with no cross-conversion.
 */
export function TradeDataSection() {
  return (
    <section
      className="relative pb-16 md:pb-20"
      id="trade-data"
      aria-labelledby="trade-data-heading"
    >
      <Reveal variant="fade" delay={0}>
        <div className="flex items-center gap-3 mb-8">
          <div
            className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30"
            aria-hidden="true"
          />
          <h2
            id="trade-data-heading"
            className="font-display font-bold text-white text-lg md:text-xl tracking-wide"
          >
            Trade &amp; Conservation Data
          </h2>
          <div
            className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30"
            aria-hidden="true"
          />
        </div>
      </Reveal>

      <Reveal variant="up" delay={60}>
        <p className="text-cream/75 text-sm leading-relaxed mb-10 max-w-3xl">
          The following charts use figures reported in the client-supplied 18
          November 2024 article; they are presented as press estimates, not
          audited AATMA statistics.
        </p>
      </Reveal>


      <div className="space-y-2">
        <TreePopulationByDistrict />
        <AssamVsTripuraTrees />
        <GlobalMarketGrowth />
        <TradeFlow />
        <AgarwoodPriceRanges />
      </div>
    </section>
  );
}

export default TradeDataSection;
