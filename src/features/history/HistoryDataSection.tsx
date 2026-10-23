import { Reveal } from "@/components/ui/reveal";
import { TimelineEventDensity } from "@/components/charts/TimelineEventDensity";

/**
 * Timeline Density — /history
 *
 * Mounts CH-12, the one chart built from the site's own timeline records rather
 * than from press reporting, so it carries no press-estimate badge.
 *
 * The counts were derived by reading the `era:` tag on each of the 16 events in
 * src/components/ui/InteractiveTimeline.tsx. The "Ancient Roots" era legitimately
 * has zero dated entries and is shown at zero rather than omitted.
 *
 * Renders no heading of its own: the /history page supplies the section
 * wrapper, so an h2 here would duplicate it.
 */
export function HistoryDataSection() {
  return (
    <div className="relative">
      <Reveal variant="up" delay={60}>
        <p className="text-cream/75 text-sm leading-relaxed mb-10 max-w-3xl">
          The archive is not evenly distributed across the association&apos;s
          history. Most dated records fall in a single era — the years spent
          seeking recognition under rules that did not yet account for the trade.
        </p>
      </Reveal>

      <TimelineEventDensity />
    </div>
  );
}

export default HistoryDataSection;
