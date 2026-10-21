import { CHART_COLORS, ChartFrame, buildAriaSummary } from "./ChartFrame";

/**
 * CH-05 — Trade flow 2017–2021 (paired bar)
 * Route: /research · Source: The Assam Tribune, 18 Nov 2024
 *
 * Source states, for 2017–2021:
 *   India imported >142 tonnes, re-exported 141 tonnes
 *   Eastern India (esp. Assam) accounted for 74% of imports and 92% of re-exports
 *
 * The eastern-share percentages are derived figures the source itself provides.
 * The paired bars show tonnage; the percentage chips show eastern share.
 */

const IMPORT_T = 142;
const RE_EXPORT_T = 141;
const EASTERN_IMPORT_PCT = 74;
const EASTERN_RE_EXPORT_PCT = 92;

const MAX_T = 150;

const W = 680;
const H = 260;
const M = { top: 30, right: 20, bottom: 56, left: 60 };
const IW = W - M.left - M.right;
const IH = H - M.top - M.bottom;
const BAR_W = 90;
const GROUP_GAP = 60;
const GROUP_W = BAR_W * 2 + GROUP_GAP;
const GROUPS = 2;
const TOTAL_W = GROUPS * GROUP_W;
const START_X = M.left + (IW - TOTAL_W) / 2 + BAR_W / 2;

const y = (v: number) => M.top + IH - (v / MAX_T) * IH;

const ariaLabel = buildAriaSummary(
  "Paired bar chart of India's agarwood trade 2017 to 2021",
  [
    { label: "Imported", value: `over ${IMPORT_T} tonnes` },
    { label: "Re-exported", value: `${RE_EXPORT_T} tonnes` },
  ],
);

export function TradeFlow() {
  const groups = [
    { label: "Imported", value: IMPORT_T, easternPct: EASTERN_IMPORT_PCT },
    { label: "Re-exported", value: RE_EXPORT_T, easternPct: EASTERN_RE_EXPORT_PCT },
  ];

  return (
    <ChartFrame
      title="Agarwood trade flow, 2017–2021"
      subtitle="India imported over 142 tonnes and re-exported 141 tonnes. The article attributes 74% of imports and 92% of re-exports to eastern India."
      ariaLabel={ariaLabel}
      source={{
        publication: "The Assam Tribune",
        date: "18 Nov 2024",
        isPressEstimate: true,
      }}
      note="The import bar is plotted at 142 tonnes as a lower bound; the source reports over 142. Eastern India shares are the article's attribution, not a measured regional split."
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
      >
        {/* Y gridlines */}
        {[0, 50, 100, 150].map((t) => (
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
              {t} t
            </text>
          </g>
        ))}

        {groups.map((g, gi) => {
          const barX = START_X + gi * GROUP_W;
          const barH = M.top + IH - y(g.value);

          return (
            <g key={g.label}>
              {/* Bar */}
              <rect
                x={barX}
                y={y(g.value)}
                width={BAR_W}
                height={barH}
                rx={4}
                fill={
                  gi === 0 ? CHART_COLORS.greenLight : CHART_COLORS.gold
                }
                opacity={gi === 0 ? 0.75 : 0.9}
              />
              {/* Value label */}
              <text
                x={barX + BAR_W / 2}
                y={y(g.value) - 8}
                textAnchor="middle"
                fontSize={14}
                fontWeight={700}
                fill={CHART_COLORS.cream}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {g.label === "Imported" ? `over ${g.value} t` : `${g.value} t`}
              </text>
              {/* X label */}
              <text
                x={barX + BAR_W / 2}
                y={M.top + IH + 22}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fill={CHART_COLORS.cream}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {g.label}
              </text>
              {/* Eastern share chip */}
              <text
                x={barX + BAR_W / 2}
                y={M.top + IH + 40}
                textAnchor="middle"
                fontSize={10}
                fill={CHART_COLORS.goldLight}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {g.easternPct}% eastern India
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}
