import { Reveal } from "@/components/ui/reveal";
import { TimelineEventDensity } from "@/components/charts/TimelineEventDensity";

/**
 * Timeline Density — /history
 *
 * Mounts CH-12, the one chart built from the site's own timeline records rather
 * than from press reporting, so it carries no press-estimate badge.
 *
 * The counts were derived by reading the `era:` tag on each of the 20 events in
 * src/components/ui/InteractiveTimeline.tsx. The "Ancient Roots" era legitimately
 * has zero dated entries and is shown at zero rather than omitted.
 */
export function HistoryDataSection() {
  return (
    <section
      className="relative pb-16 md:pb-20"
      aria-labelledby="history-data-heading"
    >
      <Reveal variant="fade" delay={0}>
        <div className="flex items-center gap-3 mb-8">
          <div
            className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30"
            aria-hidden="true"
          />
          <h2
            id="history-data-heading"
            className="font-display font-bold text-white text-lg md:text-xl tracking-wide"
          >
            Where the Timeline Concentrates
          </h2>
          <div
            className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30"
            aria-hidden="true"
          />
        </div>
      </Reveal>

      <Reveal variant="up" delay={60}>
        <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-3xl">
          The archive is not evenly distributed across the association&apos;s
          history. Most dated records fall in a single era — the years spent
          seeking recognition under rules that did not yet account for the trade.
        </p>
      </Reveal>

      <TimelineEventDensity />
    </section>
  );
}

export default HistoryDataSection;
