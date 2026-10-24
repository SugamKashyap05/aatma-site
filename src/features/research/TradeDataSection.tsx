import { Reveal } from "@/components/ui/reveal";
import { TreePopulationByDistrict } from "@/components/charts/TreePopulationByDistrict";
import { NationalTreePopulation } from "@/components/charts/NationalTreePopulation";
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
 * Every chart cites the client-supplied MoEF&CC / BSI NDF summary (February 2024).
 *
 * Values are reproduced from the client PDF; the client has confirmed its
 * figures are to be used as verified by their organization.
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
          This section reproduces figures from the summary of
          the MoEF&amp;CC-commissioned Non-Detriment Findings study, prepared by
          the Botanical Survey of India and submitted in February 2024. The
          figures are confirmed verified by the association.
        </p>
      </Reveal>


      <div className="space-y-2">
        <NationalTreePopulation />
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
