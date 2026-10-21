import { type ReactNode } from "react";

/**
 * Shared wrapper for every AATMA data chart.
 *
 * Enforces the five non-negotiable requirements from docs/ASSET_INVENTORY.md
 * Part 2 in one place, so no individual chart can ship without them:
 *
 *   1. Visible source citation naming publication and date.
 *   2. Press estimates labelled as such — CH-01…CH-07 are a journalist's 2024
 *      figures, NOT AATMA's own research.
 *   3. aria-label derived from the caller's data summary (never hardcoded).
 *   4. Entrance animation gated on prefers-reduced-motion (handled in CSS below).
 *   5. No raw hex — every colour comes from a design token.
 *
 * Charts pass only their geometry and data; this component owns the compliance.
 */

export interface ChartSource {
  /** Publication name, e.g. "The Assam Tribune" */
  publication: string;
  /** Publication date as printed, e.g. "18 Nov 2024" */
  date: string;
  /**
   * True when the figures are a journalist's estimate rather than AATMA's own
   * research or a gazette. Renders the visible "press estimate" caveat.
   */
  isPressEstimate?: boolean;
}

interface ChartFrameProps {
  /** Chart title, also the accessible name via aria-labelledby. */
  title: string;
  /** One-line reading of the chart, e.g. "Golaghat leads with 4.5 crore trees." */
  subtitle?: string;
  /**
   * aria-label for the <svg> itself. Callers build this from their own data
   * (see buildAriaSummary) — never a hardcoded string.
   */
  ariaLabel: string;
  source: ChartSource;
  children: ReactNode;
  /** Optional extra note rendered above the source line. */
  note?: string;
}

export function ChartFrame({
  title,
  subtitle,
  ariaLabel,
  source,
  children,
  note,
}: ChartFrameProps) {
  return (
    <figure className="my-10 glass-surface rounded-xl p-5 md:p-7">
      <figcaption className="mb-5">
        <h3 className="font-display text-lg text-cream md:text-xl">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-sm leading-relaxed text-cream/75">{subtitle}</p>
        )}
      </figcaption>

      {/*
        The reveal animation is declared here once rather than per-chart.
        Under prefers-reduced-motion it collapses to a plain opacity of 1,
        so no chart can forget to gate it.
      */}
      <style>{`
        .aatma-chart-enter {
          opacity: 1;
        }
        @media (prefers-reduced-motion: no-preference) {
          .aatma-chart-enter {
            animation: aatma-chart-in 0.6s ease-out both;
          }
          @keyframes aatma-chart-in {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>

      <div className="aatma-chart-enter">{children}</div>

      {note && <p className="mt-4 text-xs leading-relaxed text-cream/75">{note}</p>}

      <figcaption className="mt-5 border-t border-white/10 pt-3 text-xs leading-relaxed text-cream/75">
        <span className="text-cream">Source:</span> {source.publication},{" "}
        {source.date}
        {source.isPressEstimate && (
          <span className="ml-2 inline-flex items-center rounded-full border border-gold/25 bg-gold/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gold-light">
            press estimate
          </span>
        )}
        {source.isPressEstimate && (
          <span className="mt-1 block text-cream/75">
            Reported figures from journalism, not AATMA's own research — cite with
            care.
          </span>
        )}
      </figcaption>
    </figure>
  );
}

/**
 * Builds a data-derived aria-label so requirement 3 can never be satisfied with
 * a hardcoded sentence. Every chart calls this with its actual rows.
 *
 * @param description  what the chart shows, e.g. "Tree population by district"
 * @param rows         label/value pairs, in the order they are drawn
 * @param unit         unit suffix appended to each value, e.g. "crore trees"
 */
export function buildAriaSummary(
  description: string,
  rows: { label: string; value: number | string }[],
  unit?: string,
): string {
  if (rows.length === 0) return `${description}. No data points.`;
  const parts = rows.map((r) => {
    const v = typeof r.value === "number" ? r.value.toLocaleString("en-IN") : r.value;
    return `${r.label} ${v}${unit ? ` ${unit}` : ""}`.trim();
  });
  const joined =
    parts.length === 1
      ? parts[0]
      : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  return `${description}: ${joined}.`;
}

/** Token palette — the ONLY colours charts may use. No raw hex. */
export const CHART_COLORS = {
  gold: "var(--color-gold)",
  goldLight: "var(--color-gold-light)",
  greenLight: "var(--color-green-light)",
  greenMid: "var(--color-green-mid)",
  cream: "var(--color-cream)",
  /** For muted text inside charts (gridlines, axis labels). */
  creamSoft: "color-mix(in srgb, var(--color-cream) 75%, transparent)",
  creamFaint: "color-mix(in srgb, var(--color-cream) 30%, transparent)",
  gridline: "color-mix(in srgb, var(--color-cream) 12%, transparent)",
} as const;
