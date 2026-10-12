import { CHART_COLORS, ChartFrame, buildAriaSummary } from "./ChartFrame";

/**
 * CH-04 — Assam export quota share (donut)
 * Route: /policy · Source: The Assam Tribune, 18 Nov 2024
 *
 * Both figures are stated exactly: Assam 79%, rest of India 21%.
 * The donut geometry is computed from those numbers, not hardcoded arcs.
 */

const SLICES = [
  { label: "Assam", pct: 79 },
  { label: "Rest of India", pct: 21 },
];

const SIZE = 260;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUTER = 96;
const R_INNER = 58;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  // SVG arc convention: 0deg at 12 o'clock, clockwise positive
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutSlice(startDeg: number, endDeg: number): string {
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  const o1 = polar(CX, CY, R_OUTER, startDeg);
  const o2 = polar(CX, CY, R_OUTER, endDeg);
  const i2 = polar(CX, CY, R_INNER, endDeg);
  const i1 = polar(CX, CY, R_INNER, startDeg);
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${R_OUTER} ${R_OUTER} 0 ${largeArc} 1 ${o2.x} ${o2.y}`,
    `L ${i2.x} ${i2.y}`,
    `A ${R_INNER} ${R_INNER} 0 ${largeArc} 0 ${i1.x} ${i1.y}`,
    "Z",
  ].join(" ");
}

const ariaLabel = buildAriaSummary(
  "Donut chart of Assam's share of India's agarwood and agar oil export quota",
  SLICES.map((s) => ({ label: s.label, value: `${s.pct}%` })),
);

export function AssamExportQuota() {
  let cursor = 0;
  const arcs = SLICES.map((s) => {
    const sweep = (s.pct / 100) * 360;
    const d = donutSlice(cursor, cursor + sweep);
    cursor += sweep;
    return { ...s, d };
  });

  return (
    <ChartFrame
      title="Share of India's export quota"
      subtitle="Assam secured 79% of the country's agarwood and agar oil export quota."
      ariaLabel={ariaLabel}
      source={{
        publication: "The Assam Tribune",
        date: "18 Nov 2024",
        isPressEstimate: true,
      }}
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-52 w-52 flex-shrink-0 sm:h-56 sm:w-56"
          role="img"
          aria-label={ariaLabel}
        >
          {arcs.map((a) => (
            <path
              key={a.label}
              d={a.d}
              fill={
                a.label === "Assam"
                  ? CHART_COLORS.gold
                  : CHART_COLORS.greenLight
              }
              opacity={a.label === "Assam" ? 0.92 : 0.6}
            />
          ))}
          {/* Centre readout */}
          <text
            x={CX}
            y={CY - 4}
            textAnchor="middle"
            fontSize={30}
            fontWeight={700}
            fill={CHART_COLORS.goldLight}
            fontFamily="Inter, system-ui, sans-serif"
          >
            79%
          </text>
          <text
            x={CX}
            y={CY + 18}
            textAnchor="middle"
            fontSize={11}
            fill={CHART_COLORS.creamSoft}
            fontFamily="Inter, system-ui, sans-serif"
            letterSpacing="0.06em"
          >
            ASSAM
          </text>
        </svg>

        {/* Legend */}
        <ul className="space-y-3">
          {SLICES.map((s) => (
            <li key={s.label} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-3 w-3 flex-shrink-0 rounded-sm"
                style={{
                  background:
                    s.label === "Assam"
                      ? CHART_COLORS.gold
                      : CHART_COLORS.greenLight,
                }}
              />
              <span
                className="text-sm text-cream/80"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {s.label}
              </span>
              <span
                className="text-sm font-semibold text-cream"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {s.pct}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartFrame>
  );
}
