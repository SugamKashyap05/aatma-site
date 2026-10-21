import { CHART_COLORS, ChartFrame, buildAriaSummary } from "./ChartFrame";

/**
 * CH-03 — Global agarwood market endpoints (2023 and 2029)
 * Route: /research · Source: The Assam Tribune, 18 Nov 2024
 *
 * The source reports $44.05bn in 2023 and a $64bn projection for 2029.
 * Its 7.7% CAGR refers to 2018–2022, not to these 2023–2029 endpoints.
 * Intermediate annual values are not supplied.
 */

const POINTS = [
  { year: 2023, value: 44.05 },
  { year: 2029, value: 64.0 },
];

const W = 680;
const H = 280;
const M = { top: 24, right: 40, bottom: 44, left: 60 };
const IW = W - M.left - M.right;
const IH = H - M.top - M.bottom;
const X_MIN = 2023;
const X_MAX = 2029;
const Y_MAX = 70;

const x = (year: number) =>
  M.left + ((year - X_MIN) / (X_MAX - X_MIN)) * IW;
const y = (v: number) => M.top + IH - (v / Y_MAX) * IH;

const linePath = POINTS
  .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.year)} ${y(p.value)}`)
  .join(" ");

const ariaLabel = buildAriaSummary(
  "Chart of reported global agarwood market endpoints",
  [
    { label: "2023", value: "$44.05 billion" },
    { label: "2029 projected", value: "$64 billion" },
  ],
);

export function GlobalMarketGrowth() {
  return (
    <ChartFrame
      title="Global agarwood market endpoints, 2023 and 2029"
      subtitle="The source reports $44.05 billion in 2023 and projects $64 billion by 2029."
      ariaLabel={ariaLabel}
      source={{
        publication: "The Assam Tribune",
        date: "18 Nov 2024",
        isPressEstimate: true,
      }}
      note="The source reports a 7.7% CAGR for 2018–2022; it does not report a CAGR or annual values for 2023–2029. The dashed connector is visual only."
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
      >

        {/* Y gridlines and labels */}
        {[0, 20, 40, 60].map((t) => (
          <g key={t}>
            <line
              x1={M.left}
              y1={y(t)}
              x2={M.left + IW}
              y2={y(t)}
              stroke={CHART_COLORS.gridline}
            />
            <text
              x={M.left - 10}
              y={y(t) + 4}
              textAnchor="end"
              fontSize={10}
              fill={CHART_COLORS.creamSoft}
              fontFamily="Inter, system-ui, sans-serif"
            >
              ${t}bn
            </text>
          </g>
        ))}

        {/* X axis year labels */}
        {[2023, 2025, 2027, 2029].map((yr) => (
          <text
            key={yr}
            x={x(yr)}
            y={M.top + IH + 20}
            textAnchor="middle"
            fontSize={10}
            fill={CHART_COLORS.creamSoft}
            fontFamily="Inter, system-ui, sans-serif"
          >
            {yr}
          </text>
        ))}


        {/* Visual connector only; no intermediate annual values are supplied. */}
        <path
          d={linePath}
          fill="none"
          stroke={CHART_COLORS.goldLight}
          strokeWidth={2}
          strokeDasharray="5 5"
        />

        <line
          x1={M.left}
          y1={y(0)}
          x2={M.left + IW}
          y2={y(0)}
          stroke={CHART_COLORS.creamFaint}
        />

        {/* Endpoint markers */}
        {POINTS.map((p) => (
          <g key={p.year}>
            <circle
              cx={x(p.year)}
              cy={y(p.value)}
              r={5}
              fill={CHART_COLORS.goldLight}
              stroke="var(--color-green-deep)"
              strokeWidth={2}
            />
            <text
              x={x(p.year)}
              y={y(p.value) - 14}
              textAnchor={p.year === 2023 ? "start" : "end"}
              fontSize={13}
              fontWeight={700}
              fill={CHART_COLORS.cream}
              fontFamily="Inter, system-ui, sans-serif"
            >
              ${Number.isInteger(p.value) ? p.value.toFixed(0) : p.value.toFixed(2)}bn
            </text>
          </g>
        ))}

        {/* Legend: source-reported endpoints and a visual-only connector */}
        <g
          transform={`translate(${M.left}, ${H - 10})`}
          fontFamily="Inter, system-ui, sans-serif"
          fontSize={9.5}
        >
          <circle cx={4} cy={-3} r={3} fill={CHART_COLORS.goldLight} />
          <text x={12} y={0} fill={CHART_COLORS.creamSoft}>
            Reported endpoints
          </text>
          <line
            x1={130}
            y1={-3}
            x2={148}
            y2={-3}
            stroke={CHART_COLORS.goldLight}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <text x={154} y={0} fill={CHART_COLORS.creamSoft}>
            Visual connector only
          </text>
        </g>
      </svg>
    </ChartFrame>
  );
}
