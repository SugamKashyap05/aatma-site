import { useMemo } from "react";

// ── Sample Data ──────────────────────────────────────────────────────────────
// Realistic rhizosphere soil microbial counts for agarwood plantation zones.
// Values in CFU/g (colony-forming units per gram of dry soil).
// SAMPLE DATA — for illustration only, NOT real research findings.

interface SampleLocation {
  name: string;
  fungi: number;
  bacteria: number;
  actinomycetes: number;
}

const SAMPLE_DATA: SampleLocation[] = [
  { name: "Nagaon", fungi: 24000, bacteria: 8700000, actinomycetes: 152000 },
  { name: "Golaghat", fungi: 31000, bacteria: 6200000, actinomycetes: 198000 },
  { name: "Sivasagar", fungi: 18000, bacteria: 9400000, actinomycetes: 121000 },
  { name: "Jorhat", fungi: 27000, bacteria: 7300000, actinomycetes: 167000 },
];

const COLORS = {
  fungi: "#4a9b6e",
  bacteria: "#1a3c2a",
  actinomycetes: "#c9a84c",
};

const CHART_HEIGHT = 220;
const CHART_WIDTH = 680;
const MARGIN = { top: 30, right: 20, bottom: 60, left: 70 };
const INNER_W = CHART_WIDTH - MARGIN.left - MARGIN.right;
const INNER_H = CHART_HEIGHT - MARGIN.top - MARGIN.bottom;
const BAR_GAP = 6;
const GROUP_GAP = 24;
const GROUP_COUNT = SAMPLE_DATA.length;
const BAR_COUNT = 3;
const GROUP_W = INNER_W / GROUP_COUNT;
const BAR_W = Math.min(28, (GROUP_W - GROUP_GAP * 2 - BAR_GAP * (BAR_COUNT - 1)) / BAR_COUNT);

const Y_MAX = 10000000;
const Y_TICKS = [0, 2000000, 4000000, 6000000, 8000000, 10000000];
const Y_LABELS = ["0", "2M", "4M", "6M", "8M", "10M"];

function formatCFU(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
  return v.toString();
}

// ─── Bar Chart ───────────────────────────────────────────────────────────────

function GroupedBarChart() {
  const bars = useMemo(() => {
    const items: { x: number; y: number; w: number; h: number; color: string; label: string; value: number }[] = [];
    SAMPLE_DATA.forEach((sample, gi) => {
      const groupX = MARGIN.left + gi * GROUP_W + GROUP_GAP;
      const entries = [
        { key: "fungi" as const, val: sample.fungi },
        { key: "bacteria" as const, val: sample.bacteria },
        { key: "actinomycetes" as const, val: sample.actinomycetes },
      ];
      entries.forEach((e, bi) => {
        const barH = (e.val / Y_MAX) * INNER_H;
        items.push({
          x: groupX + bi * (BAR_W + BAR_GAP),
          y: MARGIN.top + INNER_H - barH,
          w: BAR_W,
          h: barH,
          color: COLORS[e.key],
          label: sample.name,
          value: e.val,
        });
      });
    });
    return items;
  }, []);

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="w-full h-auto"
      role="img"
      aria-label="Grouped bar chart comparing fungal, bacterial, and actinomycetes populations across four sample locations. Values in millions of CFU per gram of soil."
    >
      {/* Grid lines */}
      {Y_TICKS.map((tick, i) => {
        const y = MARGIN.top + INNER_H - (tick / Y_MAX) * INNER_H;
        return (
          <g key={tick}>
            <line x1={MARGIN.left} x2={CHART_WIDTH - MARGIN.right} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize={11} fontFamily="Inter, system-ui, sans-serif">
              {Y_LABELS[i]}
            </text>
          </g>
        );
      })}

      {/* Axes */}
      <line x1={MARGIN.left} x2={MARGIN.left} y1={MARGIN.top} y2={MARGIN.top + INNER_H} stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} />
      <line x1={MARGIN.left} x2={CHART_WIDTH - MARGIN.right} y1={MARGIN.top + INNER_H} y2={MARGIN.top + INNER_H} stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} />

      {/* Bars */}
      {bars.map((bar, i) => (
        <g key={i}>
          <rect x={bar.x} y={bar.y} width={bar.w} height={bar.h} rx={3} fill={bar.color} opacity={0.85} className="transition-opacity hover:opacity-100" />
          <text x={bar.x + bar.w / 2} y={bar.y - 6} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={10} fontFamily="Inter, system-ui, sans-serif">
            {formatCFU(bar.value)}
          </text>
        </g>
      ))}

      {/* X-axis labels */}
      {SAMPLE_DATA.map((sample, i) => {
        const cx = MARGIN.left + i * GROUP_W + GROUP_W / 2;
        return (
          <text key={sample.name} x={cx} y={MARGIN.top + INNER_H + 20} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize={12} fontFamily="Inter, system-ui, sans-serif" fontWeight={500}>
            {sample.name}
          </text>
        );
      })}
      <text x={MARGIN.left + INNER_W / 2} y={MARGIN.top + INNER_H + 42} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontFamily="Inter, system-ui, sans-serif">
        Sample Location (Agarwood Plantation Zones)
      </text>

      {/* Y-axis label */}
      <text x={16} y={MARGIN.top + INNER_H / 2} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontFamily="Inter, system-ui, sans-serif" transform={`rotate(-90, 16, ${MARGIN.top + INNER_H / 2})`}>
        CFU per gram of soil
      </text>

      {/* Legend */}
      <g transform={`translate(${MARGIN.left + INNER_W - 170}, ${MARGIN.top - 16})`}>
        <rect width={170} height={22} rx={4} fill="rgba(255,255,255,0.06)" />
        {(["fungi", "bacteria", "actinomycetes"] as const).map((key, i) => {
          const lx = 10 + i * 58;
          return (
            <g key={key}>
              <rect x={lx} y={7} width={10} height={10} rx={2} fill={COLORS[key]} />
              <text x={lx + 14} y={15} fill="rgba(255,255,255,0.8)" fontSize={10} fontFamily="Inter, system-ui, sans-serif">
                {key === "fungi" ? "Fungi" : key === "bacteria" ? "Bacteria" : "Actino."}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// ─── Donut Chart ─────────────────────────────────────────────────────────────

function DonutChart() {
  const total = SAMPLE_DATA.reduce(
    (sum, s) => sum + s.fungi + s.bacteria + s.actinomycetes,
    0,
  );

  const fungiTotal = SAMPLE_DATA.reduce((s, d) => s + d.fungi, 0);
  const bacteriaTotal = SAMPLE_DATA.reduce((s, d) => s + d.bacteria, 0);
  const actinoTotal = SAMPLE_DATA.reduce((s, d) => s + d.actinomycetes, 0);

  const segments = [
    { label: "Bacteria", value: bacteriaTotal, color: COLORS.bacteria },
    { label: "Fungi", value: fungiTotal, color: COLORS.fungi },
    { label: "Actinomycetes", value: actinoTotal, color: COLORS.actinomycetes },
  ];

  const CX = 110;
  const CY = 110;
  const R_OUTER = 85;
  const R_INNER = 50;

  function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  /**
   * Build a ring (annulus) segment as a chain of short arcs.
   *
   * A single SVG arc spanning nearly a full circle is degenerate: its start and
   * end points land at almost the same coordinate, and the renderer gives up
   * and fills the entire disc instead of the annulus. That turned the 97.7%
   * Bacteria slice into a solid square that hid the other two slices.
   *
   * Chunking keeps every arc <= 180deg so consecutive endpoints are always
   * distinct. Outer edge runs clockwise, inner edge counter-clockwise, so the
   * hole is preserved.
   */
  function ringPath(cx: number, cy: number, rO: number, rI: number, start: number, end: number): string {
    const sweep = end - start;
    if (sweep <= 0) return "";
    const steps = Math.max(1, Math.ceil(sweep / 179));
    const step = sweep / steps;

    let d = "";
    for (let i = 0; i < steps; i++) {
      const a0 = start + i * step;
      const a1 = a0 + step;
      const s = polarToCartesian(cx, cy, rO, a0);
      const e = polarToCartesian(cx, cy, rO, a1);
      d += `${i === 0 ? "M" : "L"}${s.x},${s.y} A${rO},${rO} 0 0 1 ${e.x},${e.y} `;
    }
    for (let i = steps; i > 0; i--) {
      const a0 = start + i * step;
      const a1 = a0 - step;
      const s = polarToCartesian(cx, cy, rI, a0);
      const e = polarToCartesian(cx, cy, rI, a1);
      d += `L${s.x},${s.y} A${rI},${rI} 0 0 0 ${e.x},${e.y} `;
    }
    return `${d}Z`;
  }

  let angle = 0;
  const slices = segments.map((seg) => {
    const sweep = (seg.value / total) * 360;
    const d = ringPath(CX, CY, R_OUTER, R_INNER, angle, angle + sweep);
    angle += sweep;
    return { ...seg, d, pct: ((seg.value / total) * 100).toFixed(1) };
  });

  // Derive the accessible summary from the same `slices` the chart renders, so
  // the label can never drift from the data. A hard-coded string here
  // previously announced 73.5% / 14.9% / 2.4% while the chart showed
  // 97.7% / 2.0% / 0.3% — wrong data read aloud to screen-reader users.
  const ariaSummary = slices.map((s) => `${s.label} ${s.pct}%`).join(", ");

  return (
    // Layout note: the parent card sits in a 2-of-5 grid column, so it is
    // NARROWEST at the largest viewports. A viewport-keyed `sm:flex-row` is
    // therefore anti-correlated with the space actually available — it put the
    // donut and legend side by side (192 + 24 + 167 = 383px) inside a 291px
    // column and pushed the legend 67px past the card edge. Stack vertically
    // whenever the column is narrow: below `sm` and again from `lg` upward.
    <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-6">
      <svg viewBox="0 0 220 220" className="w-48 h-48 max-w-full flex-shrink-0" role="img" aria-label={`Donut chart showing proportional breakdown of total microbial population: ${ariaSummary}. Sample data, for illustration only.`}>
        {slices.map((s) => (
          <path key={s.label} d={s.d} fill={s.color} opacity={0.85} className="transition-opacity hover:opacity-100" />
        ))}
        <text x={CX} y={CY - 6} textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize={14} fontWeight={600} fontFamily="Inter, system-ui, sans-serif">
          Total
        </text>
        <text x={CX} y={CY + 12} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={11} fontFamily="Inter, system-ui, sans-serif">
          {formatCFU(total)} CFU/g
        </text>
      </svg>

      <div className="flex flex-col gap-3 min-w-0 w-full sm:w-auto">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
            <div>
              <span className="text-white/80 text-sm font-medium">{s.label}</span>
              <span className="text-white/50 text-sm ml-2">{s.pct}%</span>
            </div>
          </div>
        ))}
        <p className="text-white/40 text-xs mt-1 max-w-[180px]">
          Share of total microbial population across all samples
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * MicrobialDataViz — Data visualization section for the Research page.
 * Displays microbial population charts with sample data and clear disclaimers.
 * Charts are pure SVG, self-contained, and use the site's green/earth-tone palette.
 */
export function MicrobialDataViz() {
  return (
    <section id="data-visualization" className="relative pb-20 md:pb-28 overflow-hidden scroll-mt-24" aria-labelledby="microbial-viz-heading">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-wide uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            Sample Data Visualization
          </div>
          <h2 id="microbial-viz-heading" className="font-display font-bold text-white text-xl md:text-2xl tracking-wide mb-3">
            Microbial Populations in Rhizosphere Soil
          </h2>
          <p className="text-white/50 text-sm max-w-2xl mx-auto leading-relaxed">
            Exploring the unseen world beneath agarwood trees — comparing fungal, bacterial, and actinomycetes
            populations across plantation zones. These soil microbes play crucial roles in nutrient cycling and plant health.
          </p>
        </div>

        {/* Charts grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Bar chart card */}
          <div className="lg:col-span-3 bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-sm p-5 md:p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-white text-base md:text-lg">
                  Population Comparison by Location
                </h3>
                <p className="text-white/40 text-xs mt-1">
                  Colony-forming units (CFU) per gram of dry soil
                </p>
              </div>
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-gold/15 text-gold/90 border border-gold/25 uppercase tracking-wider flex-shrink-0">
                Sample Data
              </span>
            </div>
            <GroupedBarChart />
          </div>

          {/* Donut chart card */}
          <div className="lg:col-span-2 bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-sm p-5 md:p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-white text-base md:text-lg">
                  Overall Composition
                </h3>
                <p className="text-white/40 text-xs mt-1">
                  Share of total microbial population
                </p>
              </div>
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-gold/15 text-gold/90 border border-gold/25 uppercase tracking-wider flex-shrink-0">
                Sample Data
              </span>
            </div>
            <DonutChart />
          </div>
        </div>

        {/* Data table for accessibility */}
        <div className="mt-6 bg-white/[0.04] border border-white/10 rounded-sm p-5 md:p-6">
          <h3 className="font-display font-bold text-white text-base mb-4">Sample Data Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="table" aria-label="Sample microbial count data in CFU per gram of soil">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/60 font-medium py-2.5 pr-4">Location</th>
                  <th className="text-right text-white/60 font-medium py-2.5 px-4">Fungi (CFU/g)</th>
                  <th className="text-right text-white/60 font-medium py-2.5 px-4">Bacteria (CFU/g)</th>
                  <th className="text-right text-white/60 font-medium py-2.5 pl-4">Actinomycetes (CFU/g)</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_DATA.map((s) => (
                  <tr key={s.name} className="border-b border-white/5 last:border-0">
                    <td className="text-white/80 py-2.5 pr-4 font-medium">{s.name}</td>
                    <td className="text-right text-white/60 py-2.5 px-4 tabular-nums">{s.fungi.toLocaleString()}</td>
                    <td className="text-right text-white/60 py-2.5 px-4 tabular-nums">{s.bacteria.toLocaleString()}</td>
                    <td className="text-right text-white/60 py-2.5 pl-4 tabular-nums">{s.actinomycetes.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/30 text-xs mt-3 italic">
            All values are sample data for illustration only — not real research findings.
          </p>
        </div>
      </div>
    </section>
  );
}

export default MicrobialDataViz;
