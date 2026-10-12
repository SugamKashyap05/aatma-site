import { CHART_COLORS, ChartFrame, buildAriaSummary } from "./ChartFrame";

/**
 * CH-01 — Tree population by district (horizontal bar)
 * Route: /research · Source: The Assam Tribune, 18 Nov 2024
 *
 * DATA HONESTY — read before editing this file.
 *
 * The source article gives an exact figure for ONE district only:
 *   Golaghat 4.5 crore (highest in the state)
 * For the other four districts it names them only as "other key districts":
 *   Jorhat, Sivasagar, Karimganj, Cachar
 *
 * It provides NO comparative numbers. Earlier drafts of this chart invented
 * plausible-looking values for those four, which would have been fabrication
 * presented as sourced data on a heritage site. Instead this chart renders
 * Golaghat as a measured bar and the remaining districts as named entries with
 * an explicit "no figure reported" state. That is what the evidence supports.
 */

interface DistrictRow {
  name: string;
  /** crore trees, or null when the source reports no figure */
  crore: number | null;
  status: "reported" | "named-only";
}

const DISTRICTS: DistrictRow[] = [
  { name: "Golaghat", crore: 4.5, status: "reported" },
  { name: "Jorhat", crore: null, status: "named-only" },
  { name: "Sivasagar", crore: null, status: "named-only" },
  { name: "Karimganj", crore: null, status: "named-only" },
  { name: "Cachar", crore: null, status: "named-only" },
];

// Layout constants
const W = 680;
const ROW_H = 40;
const BAR_H = 22;
const LABEL_W = 120;
const VALUE_W = 120;
const PLOT_W = W - LABEL_W - VALUE_W;
const TOP_PAD = 8;
const H = TOP_PAD + DISTRICTS.length * ROW_H + 8;

// Scale to the single known maximum. Golaghat fills the plot width.
const MAX_CRORE = 4.5;

const reported = DISTRICTS.filter((d) => d.status === "reported");
const ariaLabel = buildAriaSummary(
  "Horizontal bar chart of agarwood tree population by district",
  [
    ...reported.map((d) => ({
      label: d.name,
      value: `${d.crore} crore trees`,
    })),
    {
      label: "Districts named as key but without a reported figure",
      value: `${DISTRICTS.length - reported.length}`,
    },
  ],
);

export function TreePopulationByDistrict() {
  return (
    <ChartFrame
      title="Agarwood trees by district"
      subtitle="Golaghat holds the state's highest concentration. The other four districts are named as key producers, but the source reports no comparative figures for them."
      ariaLabel={ariaLabel}
      source={{
        publication: "The Assam Tribune",
        date: "18 Nov 2024",
        isPressEstimate: true,
      }}
      note="Only Golaghat is quantified in the source. The remaining districts are listed as key areas without stated tree counts, so no bars are drawn for them — inventing values would misrepresent the data."
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
      >
        {/* Column headers */}
        <g
          fontSize={10}
          fill={CHART_COLORS.creamSoft}
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="0.08em"
        >
          <text x={LABEL_W} y={2}>
            DISTRICT
          </text>
          <text x={LABEL_W + PLOT_W + 12} y={2}>
            TREES
          </text>
        </g>

        {DISTRICTS.map((d, i) => {
          const y = TOP_PAD + i * ROW_H + 10;
          const barW = d.crore ? (d.crore / MAX_CRORE) * PLOT_W : 0;

          return (
            <g key={d.name}>
              {/* District name */}
              <text
                x={LABEL_W - 12}
                y={y + BAR_H / 2 + 4}
                textAnchor="end"
                fontSize={13}
                fontWeight={d.status === "reported" ? 600 : 400}
                fill={
                  d.status === "reported"
                    ? CHART_COLORS.cream
                    : CHART_COLORS.creamSoft
                }
                fontFamily="Inter, system-ui, sans-serif"
              >
                {d.name}
              </text>

              {/* Plot track */}
              <rect
                x={LABEL_W}
                y={y}
                width={PLOT_W}
                height={BAR_H}
                rx={3}
                fill={CHART_COLORS.gridline}
              />

              {/* Bar — only drawn where a figure was reported */}
              {d.crore ? (
                <>
                  <rect
                    x={LABEL_W}
                    y={y}
                    width={barW}
                    height={BAR_H}
                    rx={3}
                    fill={CHART_COLORS.gold}
                    opacity={0.85}
                  />
                  <text
                    x={LABEL_W + PLOT_W + 12}
                    y={y + BAR_H / 2 + 4}
                    fontSize={13}
                    fontWeight={700}
                    fill={CHART_COLORS.goldLight}
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {d.crore} cr
                  </text>
                </>
              ) : (
                <>
                  {/* Dashed placeholder track signals "named, not measured" */}
                  <rect
                    x={LABEL_W}
                    y={y}
                    width={PLOT_W}
                    height={BAR_H}
                    rx={3}
                    fill="none"
                    stroke={CHART_COLORS.creamFaint}
                    strokeWidth={1}
                    strokeDasharray="4 5"
                  />
                  <text
                    x={LABEL_W + 12}
                    y={y + BAR_H / 2 + 4}
                    fontSize={11}
                    fontStyle="italic"
                    fill={CHART_COLORS.creamFaint}
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    named as key district — no figure reported
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Axis baseline */}
        <line
          x1={LABEL_W}
          y1={TOP_PAD + 10}
          x2={LABEL_W}
          y2={H - 8}
          stroke={CHART_COLORS.creamFaint}
        />
      </svg>
    </ChartFrame>
  );
}
