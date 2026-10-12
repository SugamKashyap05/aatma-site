import { CHART_COLORS, ChartFrame, buildAriaSummary } from "./ChartFrame";

/**
 * CH-03 — Global agarwood market growth (area/line)
 * Route: /research · Source: The Assam Tribune, 18 Nov 2024
 *
 * The source gives two anchor points and a growth rate:
 *   $44.05bn in 2023, $64bn projected 2029, 7.7% CAGR
 *
 * The intermediate years 2024–2028 are NOT stated. The dashed segment makes
 * clear they are a compound interpolation of the stated CAGR, not reported
 * figures. The two endpoints are solid because they are the actual data.
 */

const POINTS = [
  { year: 2023, value: 44.05, kind: "reported" as const },
  { year: 2029, value: 64.0, kind: "reported" as const },
];

// Derived, labelled as interpolation in the chart note.
const INTERPOLATED = [
  { year: 2024 },
  { year: 2025 },
  { year: 2026 },
  { year: 2027 },
  { year: 2028 },
];

const CAGR = 0.077;
const BASE = POINTS[0].value;
const BASE_YEAR = POINTS[0].year;

function projected(year: number): number {
  return BASE * Math.pow(1 + CAGR, year - BASE_YEAR);
}

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

const series = [
  POINTS[0],
  ...INTERPOLATED.map((p) => ({
    year: p.year,
    value: projected(p.year),
    kind: "interpolated" as const,
  })),
  POINTS[1],
];

const linePath = series
  .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.year)} ${y(p.value)}`)
  .join(" ");
const areaPath = `${linePath} L ${x(X_MAX)} ${y(0)} L ${x(X_MIN)} ${y(0)} Z`;

const ariaLabel = buildAriaSummary(
  "Area chart of global agarwood market value",
  [
    { label: "2023", value: "$44.05 billion" },
    { label: "2029 projected", value: "$64 billion" },
  ],
);

export function GlobalMarketGrowth() {
  return (
    <ChartFrame
      title="Global agarwood market, 2023 to 2029"
      subtitle="Reaching $44.05 billion in 2023, projected to $64 billion by 2029 — a 7.7% compound annual growth rate."
      ariaLabel={ariaLabel}
      source={{
        publication: "The Assam Tribune",
        date: "18 Nov 2024",
        isPressEstimate: true,
      }}
      note="The 2023 and 2029 endpoints are the article's figures. The dashed segment between them is a compound interpolation at the stated 7.7% CAGR, not reported annual data."
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id="ch03-fill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-gold)"
              stopOpacity="0.28"
            />
            <stop
              offset="100%"
              stopColor="var(--color-gold)"
              stopOpacity="0.02"
            />
          </linearGradient>
        </defs>

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

        {/* Area under the line */}
        <path d={areaPath} fill="url(#ch03-fill)" />

        {/* Reported segment: 2023 to first interpolated point, solid */}
        <path
          d={`M ${x(POINTS[0].year)} ${y(POINTS[0].value)} L ${x(2024)} ${y(projected(2024))}`}
          fill="none"
          stroke={CHART_COLORS.gold}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        {/* Interpolated middle: dashed */}
        <path
          d={series
            .slice(1)
            .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.year)} ${y(p.value)}`)
            .join(" ")}
          fill="none"
          stroke={CHART_COLORS.goldLight}
          strokeWidth={2}
          strokeDasharray="5 5"
        />

        {/* Axis line */}
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
              ${p.value.toFixed(2).replace(/0$/, "")}bn
            </text>
          </g>
        ))}

        {/* Legend distinguishing solid from dashed */}
        <g
          transform={`translate(${M.left}, ${H - 10})`}
          fontFamily="Inter, system-ui, sans-serif"
          fontSize={9.5}
        >
          <line x1={0} y1={-3} x2={18} y2={-3} stroke={CHART_COLORS.gold} strokeWidth={2.5} />
          <text x={24} y={0} fill={CHART_COLORS.creamSoft}>
            Reported
          </text>
          <line
            x1={92}
            y1={-3}
            x2={110}
            y2={-3}
            stroke={CHART_COLORS.goldLight}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <text x={116} y={0} fill={CHART_COLORS.creamSoft}>
            CAGR interpolation
          </text>
        </g>
      </svg>
    </ChartFrame>
  );
}
