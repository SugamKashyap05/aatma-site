import { CHART_COLORS, ChartFrame, buildAriaSummary } from "./ChartFrame";

/**
 * CH-10 — Unit capacity categories (stepped bar)
 * Route: /policy · Source: WBI Rules 2022, No. 20, eCF No. 237152, dated 12-01-2023
 *
 * This is the ONE chart drawn from the gazette rather than a newspaper, so it is
 * NOT flagged as a press estimate — it is primary law, read verbatim in Rule 2.
 *
 * The four categories as notified, with their upper bounds:
 *   ≤500 kg / ≤20 vessels
 *   501–1000 kg
 *   1001–2000 kg
 *   >2000 kg or >20 vessels
 *
 * The vessel alternative applies to liquid/oil units; the kg bands apply to
 * solid material. Both bounds are shown because the Rules state them together.
 */

interface Category {
  label: string;
  lowerKg: number;
  upperKg: number | null;
  lowerVessels: number | null;
  upperVessels: number | null;
  tier: "micro" | "small" | "medium" | "large";
}

const CATEGORIES: Category[] = [
  {
    label: "Micro",
    lowerKg: 0,
    upperKg: 500,
    lowerVessels: null,
    upperVessels: 20,
    tier: "micro",
  },
  {
    label: "Small",
    lowerKg: 501,
    upperKg: 1000,
    lowerVessels: null,
    upperVessels: null,
    tier: "small",
  },
  {
    label: "Medium",
    lowerKg: 1001,
    upperKg: 2000,
    lowerVessels: null,
    upperVessels: null,
    tier: "medium",
  },
  {
    label: "Large",
    lowerKg: 2001,
    upperKg: null,
    lowerVessels: 21,
    upperVessels: null,
    tier: "large",
  },
];

const MAX_KG = 2000;
const W = 680;
const H = 280;
const M = { top: 28, right: 24, bottom: 64, left: 56 };
const IW = W - M.left - M.right;
const IH = H - M.top - M.bottom;
const BAR_W = 76;
const SLOT_W = IW / CATEGORIES.length;

const y = (v: number) => M.top + IH - (v / MAX_KG) * IH;

// Stepped upper bounds: each category's ceiling is drawn relative to its floor,
// so the visual reads as ascending bands rather than independent totals.
function barTop(c: Category): number {
  if (c.upperKg !== null) return c.upperKg;
  return MAX_KG;
}

const ariaLabel = buildAriaSummary(
  "Stepped bar chart of WBI unit capacity categories under the 2022 Rules",
  CATEGORIES.map((c) => ({
    label: c.label,
    value:
      c.upperKg !== null
        ? `up to ${c.upperKg} kg`
        : `above ${c.lowerKg - 1} kg or more than 20 vessels`,
  })),
);

export function UnitCapacityCategories() {
  return (
    <ChartFrame
      title="How units are classified"
      subtitle="Capacity thresholds determine which category an agar processing unit falls into, and therefore which provisions apply to it."
      ariaLabel={ariaLabel}
      source={{
        publication: "Assam Gazette — WBI Rules 2022, No. 20",
        date: "12 Jan 2023",
        isPressEstimate: false,
      }}
      note="Drawn from Rule 2 of the notified Rules — primary law, not a press estimate. The vessel alternative (>20 vessels) applies to oil and liquid units alongside the kilogram bands."
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
      >
        {/* Y gridlines */}
        {[0, 500, 1000, 1500, 2000].map((t) => (
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
              {t === 0 ? "0" : `${t / 1000}k`}
            </text>
          </g>
        ))}
        <text
          x={M.left - 10}
          y={M.top - 12}
          textAnchor="end"
          fontSize={9.5}
          fill={CHART_COLORS.creamFaint}
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="0.08em"
        >
          KG
        </text>

        {CATEGORIES.map((c, i) => {
          const cx = M.left + i * SLOT_W + SLOT_W / 2;
          const top = barTop(c);
          const isLarge = c.upperKg === null;

          return (
            <g key={c.label}>
              {/* The "Large" category has no statutory ceiling. Drawing a bar to
                  an arbitrary 2,500kg cap would contradict its own "no ceiling"
                  label, so instead it renders as an ascending arrow that runs
                  off the top of the plot area — the visual idiom for unbounded. */}
              {isLarge ? (
                <>
                  <defs>
                    <linearGradient id="ch10-open" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor={CHART_COLORS.greenLight} stopOpacity="0.55"/>
                      <stop offset="100%" stopColor={CHART_COLORS.greenLight} stopOpacity="0.05"/>
                    </linearGradient>
                  </defs>
                  <rect
                    x={cx - BAR_W / 2}
                    y={y(2000)}
                    width={BAR_W}
                    height={M.top + IH - y(2000)}
                    rx={4}
                    fill="url(#ch10-open)"
                  />
                  {/* Upward arrow signalling no upper bound */}
                  <g
                    stroke={CHART_COLORS.greenLight}
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                  >
                    <line
                      x1={cx}
                      y1={y(2000)}
                      x2={cx}
                      y2={M.top - 12}
                    />
                    <path d={`M ${cx - 6} ${M.top - 4} L ${cx} ${M.top - 14} L ${cx + 6} ${M.top - 4}`} />
                  </g>
                  <text
                    x={cx + BAR_W / 2 + 10}
                    y={y(2000) - 8}
                    fontSize={11}
                    fontWeight={600}
                    fill={CHART_COLORS.cream}
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    no statutory ceiling
                  </text>
                </>
              ) : (
                <>
                  <rect
                    x={cx - BAR_W / 2}
                    y={y(top)}
                    width={BAR_W}
                    height={M.top + IH - y(top)}
                    rx={4}
                    fill={CHART_COLORS.gold}
                    opacity={0.85}
                  />
                  <text
                    x={cx}
                    y={y(top) - 8}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill={CHART_COLORS.goldLight}
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {`≤${c.upperKg?.toLocaleString("en-IN")}`}
                  </text>
                </>
              )}

              {/* Category label */}
              <text
                x={cx}
                y={M.top + IH + 20}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fill={CHART_COLORS.cream}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {c.label}
              </text>
              {/* Range label */}
              <text
                x={cx}
                y={M.top + IH + 36}
                textAnchor="middle"
                fontSize={9.5}
                fill={CHART_COLORS.creamSoft}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {isLarge
                  ? `>2,000 kg`
                  : c.upperKg === 500
                    ? `≤500 kg · ≤20 vessels`
                    : `${c.lowerKg.toLocaleString("en-IN")}–${c.upperKg?.toLocaleString("en-IN")} kg`}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}
