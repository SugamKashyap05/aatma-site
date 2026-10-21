import { CHART_COLORS, ChartFrame, buildAriaSummary } from "./ChartFrame";

/**
 * CH-12 — Timeline event density (bar by era)
 * Route: /history · Source: the site's own InteractiveTimeline data
 *
 * Counts were derived programmatically from src/components/ui/InteractiveTimeline.tsx
 * by reading the `era:` tag on each of the 16 timeline events, not estimated:
 *
 *   ancient       0   early-trade   4
 *   formation     1   growth        1
 *   critical     10   modern        0
 *
 * The "Ancient Roots" era legitimately has zero events — it is a period heading
 * with no dated entries in the timeline data. That zero is shown rather than
 * hidden, because omitting the era would misrepresent the timeline's structure.
 */

interface EraDensity {
  id: string;
  label: string;
  range: string;
  count: number;
}

const ERAS: EraDensity[] = [
  { id: "ancient", label: "Ancient Roots", range: "pre-1905", count: 0 },
  { id: "early-trade", label: "Early Trade", range: "1905–1975", count: 4 },
  { id: "formation", label: "AATMA Formation", range: "1976", count: 1 },
  { id: "growth", label: "Growth", range: "1977–1999", count: 1 },
  { id: "critical", label: "Critical Era", range: "2000–2022", count: 10 },
  { id: "modern", label: "Modern", range: "2023–2026", count: 0 },
];

const TOTAL_EVENTS = ERAS.reduce((s, e) => s + e.count, 0);
const MAX_COUNT = Math.max(...ERAS.map((e) => e.count));

const W = 680;
const H = 300;
const M = { top: 34, right: 24, bottom: 66, left: 44 };
const IW = W - M.left - M.right;
const IH = H - M.top - M.bottom;
const SLOT_W = IW / ERAS.length;
const BAR_W = 62;

const y = (v: number) => M.top + IH - (v / MAX_COUNT) * IH;

const ariaLabel = buildAriaSummary(
  `Bar chart of timeline event density across ${ERAS.length} eras, ${TOTAL_EVENTS} events total`,
  ERAS.map((e) => ({ label: e.label, value: `${e.count} events` })),
);

export function TimelineEventDensity() {
  const peak = ERAS.reduce((a, b) => (b.count > a.count ? b : a));

  return (
    <ChartFrame
      title="Where the timeline's weight sits"
      subtitle={`${TOTAL_EVENTS} dated events across ${ERAS.length} eras — ${peak.count} of them in the ${peak.label}, the period AATMA spent seeking recognition.`}
      ariaLabel={ariaLabel}
      source={{
        publication: "AATMA site — Interactive Timeline",
        date: "as published",
        isPressEstimate: false,
      }}
      note="Counts derived from the timeline's own event records. The 'Ancient Roots' era carries no dated entries in the source data, so it shows zero rather than being omitted."
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
      >
        {/* Y gridlines */}
        {Array.from({ length: MAX_COUNT + 1 }, (_, i) => i).map((t) => (
          <g key={t}>
            <line
              x1={M.left}
              y1={y(t)}
              x2={M.left + IW}
              y2={y(t)}
              stroke={t === 0 ? CHART_COLORS.creamFaint : CHART_COLORS.gridline}
            />
            <text
              x={M.left - 10}
              y={y(t) + 4}
              textAnchor="end"
              fontSize={10}
              fill={CHART_COLORS.creamSoft}
              fontFamily="Inter, system-ui, sans-serif"
            >
              {t}
            </text>
          </g>
        ))}
        <text
          x={M.left - 10}
          y={M.top - 16}
          textAnchor="end"
          fontSize={9.5}
          fill={CHART_COLORS.creamFaint}
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="0.08em"
        >
          EVENTS
        </text>

        {ERAS.map((e, i) => {
          const cx = M.left + i * SLOT_W + SLOT_W / 2;
          const barH = e.count > 0 ? M.top + IH - y(e.count) : 0;
          const isPeak = e.count === MAX_COUNT && e.count > 0;

          return (
            <g key={e.id}>
              {/* Zero-state marker for eras with no dated events */}
              {e.count === 0 ? (
                <>
                  <line
                    x1={cx - BAR_W / 2}
                    y1={y(0)}
                    x2={cx + BAR_W / 2}
                    y2={y(0)}
                    stroke={CHART_COLORS.creamFaint}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                  <text
                    x={cx}
                    y={y(0) - 8}
                    textAnchor="middle"
                    fontSize={11}
                    fontStyle="italic"
                    fill={CHART_COLORS.creamFaint}
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    0
                  </text>
                </>
              ) : (
                <>
                  <rect
                    x={cx - BAR_W / 2}
                    y={y(e.count)}
                    width={BAR_W}
                    height={barH}
                    rx={4}
                    fill={isPeak ? CHART_COLORS.gold : CHART_COLORS.greenLight}
                    opacity={isPeak ? 0.9 : 0.65}
                  />
                  <text
                    x={cx}
                    y={y(e.count) - 8}
                    textAnchor="middle"
                    fontSize={13}
                    fontWeight={700}
                    fill={isPeak ? CHART_COLORS.goldLight : CHART_COLORS.cream}
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {e.count}
                  </text>
                </>
              )}

              {/* Era label — wrapped onto two lines where needed */}
              <text
                x={cx}
                y={M.top + IH + 20}
                textAnchor="middle"
                fontSize={10.5}
                fontWeight={600}
                fill={CHART_COLORS.cream}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {e.label.split(" ")[0]}
              </text>
              {e.label.split(" ").length > 1 && (
                <text
                  x={cx}
                  y={M.top + IH + 32}
                  textAnchor="middle"
                  fontSize={10.5}
                  fontWeight={600}
                  fill={CHART_COLORS.cream}
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {e.label.split(" ").slice(1).join(" ")}
                </text>
              )}
              <text
                x={cx}
                y={M.top + IH + 50}
                textAnchor="middle"
                fontSize={9.5}
                fill={CHART_COLORS.creamSoft}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {e.range}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}
