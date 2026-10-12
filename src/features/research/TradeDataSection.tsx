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
        <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-3xl">
          Assam&apos;s position in the agarwood economy rests on the state&apos;s
          standing stock of trees, its share of national trade, and the prices the
          material commands. The figures below are drawn from press reporting and
          are labelled accordingly — they indicate scale and direction rather than
          serving as audited statistics.
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
