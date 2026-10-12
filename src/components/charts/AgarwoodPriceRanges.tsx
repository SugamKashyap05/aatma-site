import { CHART_COLORS, ChartFrame, buildAriaSummary } from "./ChartFrame";

/**
 * CH-07 — Agarwood price ranges (range bar)
 * Route: /research · Source: The Assam Tribune, 18 Nov 2024
 *
 * User decision: render the cited ranges as stated — no invented point values.
 *
 * The two products use DIFFERENT units, so they get separate scales:
 *   chips — Rs 10,000 to 3,00,000 per kg
 *   oil   — Rs 6,000 to 17,500 per tola
 *
 * Plotting them on one axis would be meaningless. Each row carries its own
 * scale and unit label, and the range bar shows only the stated endpoints.
 */

interface RangeRow {
  product: string;
  low: number;
  high: number;
  unit: string;
  lowLabel: string;
  highLabel: string;
}

const ROWS: RangeRow[] = [
  {
    product: "Agarwood chips",
    low: 10000,
    high: 300000,
    unit: "per kg",
    lowLabel: "Rs 10,000",
    highLabel: "Rs 3,00,000",
  },
  {
    product: "Agar oil",
    low: 6000,
    high: 17500,
    unit: "per tola",
    lowLabel: "Rs 6,000",
    highLabel: "Rs 17,500",
  },
];

const W = 680;
const ROW_H = 92;
const LABEL_W = 140;
const PLOT_W = W - LABEL_W - 40;
const H = ROWS.length * ROW_H + 20;
const BAR_H = 26;

const ariaLabel = buildAriaSummary(
  "Range bar chart of agarwood price ranges",
  ROWS.map((r) => ({
    label: r.product,
    value: `${r.lowLabel} to ${r.highLabel} ${r.unit}`,
  })),
);

export function AgarwoodPriceRanges() {
  return (
    <ChartFrame
      title="Reported price ranges"
      subtitle="Chips and oil are traded on different units — chips by weight, oil by tola — so each carries its own scale."
      ariaLabel={ariaLabel}
      source={{
        publication: "The Assam Tribune",
        date: "18 Nov 2024",
        isPressEstimate: true,
      }}
      note="Both figures are stated as ranges, not point prices. Chips span a 30-fold spread between low and high grades; oil spans roughly threefold."
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
      >
        {ROWS.map((r, i) => {
          const yBase = i * ROW_H + 34;
          const lowFrac = 0;
          const highFrac = 1; // each row scaled to its own range
          const lowX = LABEL_W + lowFrac * PLOT_W;
          const highX = LABEL_W + highFrac * PLOT_W;
          const spanX = highX - lowX;

          return (
            <g key={r.product}>
              {/* Product label */}
              <text
                x={LABEL_W - 12}
                y={yBase + BAR_H / 2 - 2}
                textAnchor="end"
                fontSize={13}
                fontWeight={600}
                fill={CHART_COLORS.cream}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {r.product}
              </text>
              <text
                x={LABEL_W - 12}
                y={yBase + BAR_H / 2 + 13}
                textAnchor="end"
                fontSize={10}
                fill={CHART_COLORS.creamSoft}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {r.unit}
              </text>

              {/* Track */}
              <rect
                x={LABEL_W}
                y={yBase}
                width={PLOT_W}
                height={BAR_H}
                rx={4}
                fill={CHART_COLORS.gridline}
              />

              {/* The stated range — full width because each row is its own scale */}
              <rect
                x={lowX}
                y={yBase}
                width={spanX}
                height={BAR_H}
                rx={4}
                fill={i === 0 ? CHART_COLORS.gold : CHART_COLORS.greenLight}
                opacity={0.8}
              />

              {/* Endpoint markers */}
              <circle
                cx={lowX}
                cy={yBase + BAR_H / 2}
                r={4}
                fill={CHART_COLORS.cream}
              />
              <circle
                cx={highX}
                cy={yBase + BAR_H / 2}
                r={4}
                fill={CHART_COLORS.cream}
              />

              {/* Endpoint labels */}
              <text
                x={lowX + 10}
                y={yBase - 8}
                fontSize={11}
                fontWeight={600}
                fill={CHART_COLORS.creamSoft}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {r.lowLabel}
              </text>
              <text
                x={highX}
                y={yBase - 8}
                textAnchor="end"
                fontSize={11}
                fontWeight={700}
                fill={CHART_COLORS.goldLight}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {r.highLabel}
              </text>

              {/* Scale hint */}
              <text
                x={LABEL_W}
                y={yBase + BAR_H + 20}
                fontSize={9.5}
                fill={CHART_COLORS.creamFaint}
                fontFamily="Inter, system-ui, sans-serif"
              >
                low grade
              </text>
              <text
                x={LABEL_W + PLOT_W}
                y={yBase + BAR_H + 20}
                textAnchor="end"
                fontSize={9.5}
                fill={CHART_COLORS.creamFaint}
                fontFamily="Inter, system-ui, sans-serif"
              >
                high grade
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}
