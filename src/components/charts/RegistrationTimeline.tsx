import { CHART_COLORS, ChartFrame, buildAriaSummary } from "./ChartFrame";

/**
 * CH-08 — Registration processing time (timeline bar)
 * Route: /policy · Source: The Assam Tribune, 2 Aug 2023
 *
 * The 2022 Rules set two distinct windows by unit category:
 *   secondary WBI unit  — 62 days to register
 *   primary WBI unit    — 74 days to be processed
 *
 * Note the difference in what each window measures — the source frames one as
 * registration and the other as processing, so they are not interchangeable.
 * The comparison against the pre-2023 position of open-ended delay is stated
 * in the annotation, not drawn as a bar, because no figure exists for it.
 */

const BARS = [
  {
    label: "Secondary WBI unit",
    days: 62,
    action: "to register",
    kind: "registration" as const,
  },
  {
    label: "Primary WBI unit",
    days: 74,
    action: "to be processed",
    kind: "processing" as const,
  },
];

const MAX_DAYS = 80;
const W = 680;
const ROW_H = 76;
const BAR_H = 30;
const LABEL_W = 160;
const PLOT_W = W - LABEL_W - 110;
const H = BARS.length * ROW_H + 48;

const ariaLabel = buildAriaSummary(
  "Timeline bar chart of registration and processing windows under the 2022 Rules",
  BARS.map((b) => ({ label: b.label, value: `${b.days} days ${b.action}` })),
);

export function RegistrationTimeline() {
  return (
    <ChartFrame
      title="Statutory time windows"
      subtitle="The 2022 Rules replace open-ended delay with defined limits: 62 days to register a secondary unit, 74 days to process a primary unit."
      ariaLabel={ariaLabel}
      source={{
        publication: "The Assam Tribune",
        date: "2 Aug 2023",
        isPressEstimate: true,
      }}
      note="Each bar measures a different act — registration for secondary units, processing for primary units — as framed by the source. The Rules do not state a figure for the pre-2023 position, so none is drawn."
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
      >
        {/* Day scale gridlines */}
        {[0, 20, 40, 60, 80].map((d) => {
          const xPos = LABEL_W + (d / MAX_DAYS) * PLOT_W;
          return (
            <g key={d}>
              <line
                x1={xPos}
                y1={14}
                x2={xPos}
                y2={H - 40}
                stroke={CHART_COLORS.gridline}
              />
              <text
                x={xPos}
                y={H - 22}
                textAnchor="middle"
                fontSize={10}
                fill={CHART_COLORS.creamSoft}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {d}
              </text>
            </g>
          );
        })}
        <text
          x={LABEL_W + PLOT_W / 2}
          y={H - 6}
          textAnchor="middle"
          fontSize={9.5}
          fill={CHART_COLORS.creamFaint}
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="0.1em"
        >
          DAYS
        </text>

        {BARS.map((b, i) => {
          const y = 24 + i * ROW_H;
          const barW = (b.days / MAX_DAYS) * PLOT_W;

          return (
            <g key={b.label}>
              <text
                x={LABEL_W - 12}
                y={y + BAR_H / 2 - 2}
                textAnchor="end"
                fontSize={12.5}
                fontWeight={600}
                fill={CHART_COLORS.cream}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {b.label}
              </text>
              <text
                x={LABEL_W - 12}
                y={y + BAR_H / 2 + 14}
                textAnchor="end"
                fontSize={10}
                fill={CHART_COLORS.creamSoft}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {b.action}
              </text>

              <rect
                x={LABEL_W}
                y={y}
                width={PLOT_W}
                height={BAR_H}
                rx={4}
                fill={CHART_COLORS.gridline}
              />
              <rect
                x={LABEL_W}
                y={y}
                width={barW}
                height={BAR_H}
                rx={4}
                fill={
                  b.kind === "registration"
                    ? CHART_COLORS.gold
                    : CHART_COLORS.greenLight
                }
                opacity={0.85}
              />

              <text
                x={LABEL_W + barW + 12}
                y={y + BAR_H / 2 + 5}
                fontSize={15}
                fontWeight={700}
                fill={
                  b.kind === "registration"
                    ? CHART_COLORS.goldLight
                    : CHART_COLORS.cream
                }
                fontFamily="Inter, system-ui, sans-serif"
              >
                {b.days} d
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}
