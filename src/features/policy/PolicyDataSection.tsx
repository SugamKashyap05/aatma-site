import { Reveal } from "@/components/ui/reveal";
import { AssamExportQuota } from "@/components/charts/AssamExportQuota";
import { UnitCapacityCategories } from "@/components/charts/UnitCapacityCategories";

/**
 * Regulatory Framework Data — /policy
 *
 * Mounts quota figures from the NDF summary and unit categories from
 * Rule 2 of the notified 2022 Rules. Newspaper estimates are excluded.
 */
export function PolicyDataSection() {
  return (
    <section
      className="relative pb-16 md:pb-20"
      aria-labelledby="policy-data-heading"
    >
      <Reveal variant="fade" delay={0}>
        <div className="flex items-center gap-3 mb-8">
          <div
            className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30"
            aria-hidden="true"
          />
          <h2
            id="policy-data-heading"
            className="font-display font-bold text-white text-lg md:text-xl tracking-wide"
          >
            The Rules in Numbers
          </h2>
          <div
            className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30"
            aria-hidden="true"
          />
        </div>
      </Reveal>

      <Reveal variant="up" delay={60}>
        <p className="text-cream/75 text-sm leading-relaxed mb-10 max-w-3xl">
          The unit-capacity thresholds are read from Rule 2 of the WBI Gazette (No. 20, eCF No. 237152, 12 January 2023). The proposed state-wise export quotas are reproduced from the MoEF&amp;CC-commissioned NDF summary prepared by BSI (February 2024).
        </p>
      </Reveal>

      <div className="space-y-2">
        <UnitCapacityCategories />
        <AssamExportQuota />
      </div>
    </section>
  );
}

export default PolicyDataSection;
