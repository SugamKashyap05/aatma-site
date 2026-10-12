import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Globe,
  Newspaper,
  Radio,
  Rss,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MediaOutletType = "national" | "regional" | "trade" | "digital";

export interface MediaCoverageItem {
  id: string;
  publication: string;
  articleTitle: string;
  date: string;
  outletType: MediaOutletType;
  excerpt?: string;
  /**
   * A real article permalink, or "" when none is available.
   *
   * PROVENANCE RULE — never set this to a publication's homepage. An earlier
   * revision of this list linked eight bare homepages behind specific
   * headlines, which read as citations but were unverifiable. When `url` is
   * empty the card renders a printed citation instead of a link, which is
   * honest about what we can prove.
   *
   * Every entry below is traced to a client-supplied clipping transcribed
   * verbatim in docs/CLIENT_MATERIAL_RESEARCH.md (§1, §2, §3).
   */
  url: string;
}

interface MediaCoverageTimelineProps {
  items?: MediaCoverageItem[];
  className?: ClassValue;
  showHeader?: boolean;
}

// ─── Default data ─────────────────────────────────────────────────────────────
//
// Three verified clippings, transcribed verbatim from the client's WhatsApp
// images. See docs/CLIENT_MATERIAL_RESEARCH.md §1–§3.
//
// A fourth image (item 5, 76 KB) is likely a further clipping but was never
// read — vision analysis returned HTTP 429 on every attempt. It is NOT
// represented here: guessing at its contents would defeat the purpose of a
// verified list.

const DEFAULT_MEDIA_COVERAGE: MediaCoverageItem[] = [
  {
    id: "coverage-2023-ht",
    publication: "Hindustan Times",
    articleTitle:
      "AATMA thanks CM Sarma for restoring glory of agar wood-based industries in Assam",
    date: "17 January 2023",
    outletType: "national",
    url: "",
    excerpt:
      "Reports the press conference held at the AATMA head office in Hojai on 14 January 2023. Members thanked the State government for repealing the WBI Rules 2000 and notifying the WBI (Promotion and Development) Rules 2022 on 12 January 2023, recognising agarwood units as Secondary Wood Based Industries.",
  },
  {
    id: "coverage-2023-at-winds",
    publication: "The Assam Tribune",
    articleTitle: "Wood-based industries: Winds of change soon",
    date: "2 August 2023",
    outletType: "regional",
    url: "",
    excerpt:
      "PJ Vijayakar traces the sector's contraction following the Supreme Court's Godavarman order, from 588 primary wood-based industries to roughly 206 today, and sets out the 62-day and 74-day registration limits under the 2022 Rules.",
  },
  {
    id: "coverage-2024-at-prospects",
    publication: "The Assam Tribune",
    articleTitle: "Prospects of Assam's agarwood industry",
    date: "18 November 2024",
    outletType: "regional",
    url: "",
    excerpt:
      "PJ Vijayakar reports on the Non-detriment Findings study submitted by the Botanical Survey of India in February 2024: Assam holds over 82% of India's agarwood trees, 11.437 crore outside forest areas, with Golaghat district alone at 4.5 crore.",
  },
];

// ─── Icon map ─────────────────────────────────────────────────────────────────

const OUTLET_ICON: Record<MediaOutletType, typeof Globe> = {
  national: Newspaper,
  regional: Globe,
  trade: Rss,
  digital: Radio,
};

// ─── Timeline Card ───────────────────────────────────────────────────────────

function CoverageCard({
  item,
  index,
  isLast,
}: {
  item: MediaCoverageItem;
  index: number;
  isLast: boolean;
}) {
  const Icon = OUTLET_ICON[item.outletType];

  return (
    <Reveal variant="left" delay={index * 100}>
      <div className="relative pl-8 md:pl-12 pb-8 md:pb-10 last:pb-0 group">
        {/* Connector line */}
        {!isLast && (
          <div
            className="absolute left-[13px] md:left-[17px] top-8 bottom-0 w-px bg-gradient-to-b from-gold/40 via-white/10 to-transparent"
            aria-hidden="true"
          />
        )}

        {/* Dot */}
        <div
          className={cn(
            "absolute left-0 top-1.5 w-[26px] h-[26px] md:w-[34px] md:h-[34px] rounded-full border-2 flex items-center justify-center transition-all duration-300",
            "bg-green-deep group-hover:bg-gold/10",
            "border-gold/50 group-hover:border-gold",
          )}
        >
          <Icon size={12} className="text-gold" />
        </div>

        {/* Card */}
        <article className="card-hover bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-sm p-4 md:p-5 group-hover:border-gold/25">
          {/* Meta row */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Icon size={13} className="text-gold/80" />
              <span className="text-gold font-semibold text-xs md:text-sm tracking-wide uppercase">
                {item.publication}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <Calendar size={11} />
              <span>{item.date}</span>
            </div>
          </div>

          {/* Title */}
          <h4 className="font-display font-bold text-white text-sm md:text-base leading-snug group-hover:text-gold transition-colors duration-300">
            {item.articleTitle}
          </h4>

          {/* Excerpt */}
          {item.excerpt && (
            <p className="mt-2 text-white/60 text-sm leading-relaxed">
              {item.excerpt}
            </p>
          )}

          {/* Source — link only when a real permalink exists */}
          <div className="mt-4 pt-3 border-t border-white/10">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-300",
                  "text-gold hover:text-gold-light",
                )}
                aria-label={`Read article: ${item.articleTitle}`}
              >
                <ExternalLink size={13} />
                <span>Read Article</span>
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ) : (
              <p className="text-white/40 text-xs leading-relaxed">
                {item.publication}, {item.date} — supplied by AATMA. No online
                archive copy available.
              </p>
            )}
          </div>
        </article>
      </div>
    </Reveal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MediaCoverageTimeline({
  items = DEFAULT_MEDIA_COVERAGE,
  className,
  showHeader = true,
}: MediaCoverageTimelineProps) {
  return (
    <div className={cn("w-full", className)}>
      {showHeader && (
        <Reveal variant="fade" delay={0}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
            <h3 className="font-display font-bold text-white text-base md:text-lg tracking-wide">
              Media Coverage
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </Reveal>
      )}

      <div className="mt-4">
        {items.map((item, i) => (
          <CoverageCard
            key={item.id}
            item={item}
            index={i}
            isLast={i === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default MediaCoverageTimeline;
