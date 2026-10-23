import { CHART_COLORS, ChartFrame, buildAriaSummary } from "./ChartFrame";

/**
 * CH-02 — Assam vs Tripura tree count (comparative bar)
 * Route: /research · Source: client NDF summary, February 2024
 *
 * Both state figures and the Assam share are reproduced from the NDF summary.
 */

const ROWS = [
  { name: "Assam", crore: 11.437, note: "cultivated agar trees" },
  { name: "Tripura", crore: 1.515, note: "second nationally" },
];

const MAX_CRORE = 11.437;

const W = 680;
const ROW_H = 64;
const BAR_H = 34;
const LABEL_W = 120;
const VALUE_W = 150;
const PLOT_W = W - LABEL_W - VALUE_W;
const H = ROWS.length * ROW_H + 24;

const ariaLabel = buildAriaSummary(
  "Comparison of NDF estimates of cultivated agar trees",
  ROWS.map((r) => ({ label: r.name, value: `${r.crore} crore` })),
);

export function AssamVsTripuraTrees() {
  // Ratio is derived from the data, never hardcoded.
  const ratio = (ROWS[0].crore / ROWS[1].crore).toFixed(1);

  return (
    <ChartFrame
      title="Assam against the next state"
      subtitle={`Calculated from the two NDF estimates, Assam's count is ${ratio}× Tripura's. The study states 82.38% for Assam.`}
      ariaLabel={ariaLabel}
      source={{
        publication: "MoEF&CC-commissioned NDF study (Botanical Survey of India)",
        date: "February 2024",
        provenanceLabel: "Client-verified NDF study",
      }}
      note="Figures count agarwood trees cultivated agar trees, as stated in the NDF summary."
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
      >
        {ROWS.map((r, i) => {
          const y = i * ROW_H + 16;
          const barW = (r.crore / MAX_CRORE) * PLOT_W;
          const isPrimary = i === 0;

          return (
            <g key={r.name}>
              <text
                x={LABEL_W - 12}
                y={y + BAR_H / 2 + 5}
                textAnchor="end"
                fontSize={14}
                fontWeight={isPrimary ? 700 : 500}
                fill={isPrimary ? CHART_COLORS.cream : CHART_COLORS.creamSoft}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {r.name}
              </text>

              <rect
                x={LABEL_W}
                y={y}
                width={barW}
                height={BAR_H}
                rx={4}
                fill={isPrimary ? CHART_COLORS.gold : CHART_COLORS.greenLight}
                opacity={isPrimary ? 0.9 : 0.7}
              />

              <text
                x={LABEL_W + barW + 12}
                y={y + BAR_H / 2 - 2}
                fontSize={15}
                fontWeight={700}
                fill={isPrimary ? CHART_COLORS.goldLight : CHART_COLORS.cream}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {r.crore} cr
              </text>
              <text
                x={LABEL_W + barW + 12}
                y={y + BAR_H / 2 + 13}
                fontSize={10}
                fill={CHART_COLORS.creamSoft}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {r.note}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}
