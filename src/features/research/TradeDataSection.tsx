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
        <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-3xl">
          Assam&apos;s position in the agarwood economy rests on the state&apos;s
          standing stock of trees, its share of national trade, and the prices the
          material commands. The figures below are drawn from press reporting and
          are labelled accordingly — they indicate scale and direction rather than
          serving as audited statistics.
        </p>
      </Reveal>

      {/* Integrated conservation + market narrative */}
      <Reveal variant="up" delay={120}>
        <div className="space-y-5 mb-10 max-w-3xl">
          <h3 className="font-display font-semibold text-white text-base md:text-lg tracking-wide">
            The agarwood economy
          </h3>

          <p className="text-white/60 text-sm leading-relaxed">
            According to an 18 November 2024 report in The Assam Tribune by PJ
            Vijayakar, the global agarwood market was valued at $44.05 billion in
            2023 and is projected to reach $64 billion by 2029 — a compound annual
            growth rate of 7.7%. The same report notes that the global chips
            market grew at that same 7.7% CAGR over the 2018–2022 period.
          </p>

          <p className="text-white/60 text-sm leading-relaxed">
            India&apos;s position in this market is shaped by its role as both
            importer and re-exporter. The Assam Tribune report states that between
            2017 and 2021, India imported over 142 tonnes of agarwood and
            re-exported 141 tonnes — a near-parity balance. Eastern India accounted
            for 74% of imports and 92% of re-exports, with Assam at the centre of
            that trade.
          </p>

          <p className="text-white/60 text-sm leading-relaxed">
            Assam&apos;s dominance is underpinned by its standing stock of trees.
            The report credits Assam with over 82% of India&apos;s agarwood trees —
            11.437 crore trees outside forest areas — against 1.515 crore in
            Tripura, the second-holding state. Golaghat district alone holds 4.5
            crore trees, the highest concentration in the state. Jorhat,
            Sivasagar, Karimganj, and Cachar are also named as key districts,
            though the source reports no comparative figures for them.
          </p>

          <p className="text-white/60 text-sm leading-relaxed">
            On the policy side, Assam secured 79% of the country&apos;s export
            quota under the Non-detriment Findings study — 1.194 lakh kg of
            agarwood chips and 5,560 kg of agar oil per annum. The report also
            notes plans to establish an Assam Agar International Trade Centre in
            Golaghat district, intended to eliminate middlemen and give farmers
            and traders direct access to national and international buyers.
          </p>

          <p className="text-white/60 text-sm leading-relaxed">
            At the commodity level, agarwood trades in two distinct product
            categories. Agarwood chips are priced by weight, ranging from Rs
            10,000 to Rs 3,00,000 per kg. Agar oil is priced by tola, ranging from
            Rs 6,000 to Rs 17,500 per tola. These are separate units of measurement
            and the two products are not directly comparable.
          </p>

          <p className="text-white/50 text-xs leading-relaxed italic">
            All figures above are press estimates drawn from journalism, not
            AATMA&apos;s own research. They indicate scale and direction rather
            than serving as audited statistics. The districts named as key
            producers without reported figures — Jorhat, Sivasagar, Karimganj,
            and Cachar — represent a gap in the public record that further
            research could help fill.
          </p>
        </div>
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
