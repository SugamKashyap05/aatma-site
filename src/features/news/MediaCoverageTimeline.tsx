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
  url: string;
  outletType: MediaOutletType;
  excerpt?: string;
}

interface MediaCoverageTimelineProps {
  items?: MediaCoverageItem[];
  className?: ClassValue;
  showHeader?: boolean;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_MEDIA_COVERAGE: MediaCoverageItem[] = [
  {
    id: "coverage-2023-01",
    publication: "The Assam Tribune",
    articleTitle:
      "AATMA welcomes Assam Wood Based Industries Rules, calls it a new era for agarwood trade",
    date: "15 January 2023",
    url: "https://assamtribune.com",
    outletType: "regional",
    excerpt:
      "Traders' association expresses gratitude over the notification of the Assam Wood Based Industries (Promotion and Development) Rules 2022.",
  },
  {
    id: "coverage-2023-02",
    publication: "EastMojo",
    articleTitle:
      "Assam's agarwood industry gets a boost with new state rules",
    date: "22 January 2023",
    url: "https://www.eastmojo.com",
    outletType: "digital",
    excerpt:
      "The new rules open the door for legal cultivation and trade of agarwood, ending decades of regulatory uncertainty.",
  },
  {
    id: "coverage-2024-01",
    publication: "The Hindu BusinessLine",
    articleTitle:
      "India secures CITES export quota for agarwood after sustained advocacy",
    date: "12 March 2024",
    url: "https://www.thehindubusinessline.com",
    outletType: "national",
    excerpt:
      "A quota of 1,51,080 kg/year of agarwood chips and powder has been secured for 2024–2027, a landmark for Indian producers.",
  },
  {
    id: "coverage-2024-02",
    publication: "Echo of Assam",
    articleTitle:
      "Assam agarwood goes global: CITES quota a game-changer for Hojai traders",
    date: "18 March 2024",
    url: "https://echoofassam.com",
    outletType: "regional",
    excerpt:
      "Local traders and manufacturers celebrate the international recognition of agarwood as a sustainable trade commodity.",
  },
  {
    id: "coverage-2025-01",
    publication: "The Economic Times",
    articleTitle:
      "Assam ships first legal agarwood consignment worth Rs 2.35 crore",
    date: "8 September 2025",
    url: "https://economictimes.indiatimes.com",
    outletType: "national",
    excerpt:
      "100 kg of premium agarwood chips dispatched to Saudi Arabia and 12 kg to the UAE in Assam's first legally approved commercial export.",
  },
  {
    id: "coverage-2025-02",
    publication: "The Hindu",
    articleTitle:
      "Agarwood exports: How Assam's 'liquid gold' is reaching global markets",
    date: "22 September 2025",
    url: "https://www.thehindu.com",
    outletType: "national",
    excerpt:
      "AATMA members reflect on the 50-year journey from unregulated trade to formal international exports.",
  },
  {
    id: "coverage-2026-01",
    publication: "PIB Delhi",
    articleTitle:
      "Agarwood Export Promotion Cell constituted to boost India's agarwood trade",
    date: "5 May 2026",
    url: "https://pib.gov.in",
    outletType: "national",
    excerpt:
      "The Ministry of Commerce brings together CHEMEXCIL and SHEFEXIL in a dedicated cell to promote agarwood exports.",
  },
  {
    id: "coverage-2026-02",
    publication: "Krishi Jagran",
    articleTitle:
      "From Hojai to the world: The agarwood revolution in Assam",
    date: "15 June 2026",
    url: "https://krishijagran.com",
    outletType: "trade",
    excerpt:
      "AATMA's 50-year advocacy journey has transformed agarwood from a banned forest produce to a legally traded global commodity.",
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

          {/* Link */}
          <div className="mt-4 pt-3 border-t border-white/10">
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
