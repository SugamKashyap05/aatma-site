import { Reveal } from "@/components/ui/reveal";
import { AssamExportQuota } from "@/components/charts/AssamExportQuota";
import { RegistrationTimeline } from "@/components/charts/RegistrationTimeline";
import { UnitCapacityCategories } from "@/components/charts/UnitCapacityCategories";

/**
 * Regulatory Framework Data — /policy
 *
 * Mounts the three policy-route charts:
 *   CH-04 Assam's export quota share   (press estimate)
 *   CH-08 Statutory time windows       (press estimate)
 *   CH-10 Unit capacity categories     (PRIMARY LAW — no press badge)
 *
 * The provenance differs deliberately. CH-10 is drawn from Rule 2 of the
 * notified 2022 Rules and carries no press-estimate badge; the other two are
 * reported figures and do. The framing prose keeps that distinction visible.
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
        <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-3xl">
          The 2022 Rules changed both who may trade and how quickly they may move.
          Unit capacity thresholds are read from the WBI Gazette (Rule 2, No. 20,
          eCF No. 237152, 12-01-2023) — primary law, no press-estimate badge. The
          registration time windows and quota share are as reported in the press.
        </p>
      </Reveal>

      <div className="space-y-2">
        <UnitCapacityCategories />
        <RegistrationTimeline />
        <AssamExportQuota />
      </div>
    </section>
  );
}

export default PolicyDataSection;
