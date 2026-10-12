import { cn, assetUrl, type ClassValue } from "@/lib/utils";
import {
  ArrowUpRight,
  Calendar,
  Download,
  FileText,
  Megaphone,
  ScrollText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger } from "@/components/ui/reveal";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PressRelease {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  pdfPath: string;
  /** False when the PDF is not yet published — the card renders without a
   *  download link rather than shipping a link that 404s. */
  available?: boolean;
  fileName: string;
  size: string;
  featured?: boolean;
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const DEFAULT_RELEASES: PressRelease[] = [
  {
    id: "press-note-2023",
    title:
      "AATMA Press Note — Assam Wood Based Industries (Promotion and Development) Rules 2022",
    date: "14 January 2023",
    category: "Press Release",
    summary:
      "AATMA expresses extreme gratitude over notification of Assam Wood Based Industries (Promotion and Development) Rules 2022 on 12th January 2023, thanking Hon'ble Chief Minister Dr Himanta Biswa Sarma for visionary leadership.",
    pdfPath: "/press/aatma-press-note-2023-01-14.pdf",
    available: true,
    fileName: "AATMA-Press-Note-2023-01-14.pdf",
    size: "5.6 KB",
    featured: true,
  },
  {
    id: "letter-to-hcm-2023",
    title:
      "Letter to Hon'ble Chief Minister — Gratitude for Agarwood Trade Revival",
    date: "14 January 2023",
    category: "Official Letter",
    summary:
      "AATMA's letter to Shri Himanta Biswa Sarma ji acknowledging the path-breaking reforms and seeking consent to felicitate him at a public meeting in Hojai.",
    pdfPath: "/press/aatma-letter-to-hcm-2023-01-14.pdf",
    available: true,
    fileName: "AATMA-Letter-to-HCM-2023-01-14.pdf",
    size: "5.7 KB",
  },
  {
    id: "cites-quota-2024",
    title:
      "CITES Export Quota Secured — India's Agarwood Trade Breakthrough",
    date: "02 March 2024",
    category: "Press Release",
    summary:
      "India's successful trading proposal at CITES secures a formal export quota of 1,51,080 kg/year of agarwood chips & powder, marking a landmark achievement for the sector.",
    pdfPath: "/press/aatma-cites-quota-2024-03-02.pdf",
    available: false,
    fileName: "AATMA-CITES-Quota-2024-03-02.pdf",
    size: "6.1 KB",
  },
  {
    id: "first-export-2025",
    title:
      "Assam's First Legal Agarwood Export — A New Era for the Industry",
    date: "18 June 2025",
    category: "Press Release",
    summary:
      "Assam ships its first legally approved commercial consignment: 100 kg of premium agarwood chips to Saudi Arabia and 12 kg to the UAE, worth a combined ₹2.35 crore.",
    pdfPath: "/press/aatma-first-export-2025-06-18.pdf",
    available: false,
    fileName: "AATMA-First-Export-2025-06-18.pdf",
    size: "5.9 KB",
  },
];

// ─── Press Release Card ──────────────────────────────────────────────────────

function PressReleaseCard({
  release,
  index,
}: {
  release: PressRelease;
  index: number;
}) {
  return (
    <Reveal
      variant="up"
      delay={index * 120}
      className={cn(release.featured && "md:col-span-2")}
    >
      <article
        className={cn(
          "card-hover group relative h-full flex flex-col bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-sm overflow-hidden",
          release.featured && "border-gold/30 bg-white/[0.10]"
        )}
      >
        {/* Category strip */}
        <div
          className={cn(
            "px-5 py-2.5 flex items-center justify-between border-b border-white/10",
            release.featured ? "bg-gold/10" : "bg-white/[0.04]"
          )}
        >
          <div className="flex items-center gap-2">
            {release.category === "Press Release" ? (
              <Megaphone size={14} className="text-gold" />
            ) : (
              <ScrollText size={14} className="text-gold" />
            )}
            <span
              className={cn(
                "text-xs font-semibold tracking-[0.12em] uppercase",
                release.featured ? "text-gold" : "text-white/70"
              )}
            >
              {release.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <Calendar size={12} />
            <span>{release.date}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          <h3
            className={cn(
              "font-display font-bold leading-snug text-white group-hover:text-gold transition-colors duration-300",
              release.featured ? "text-lg md:text-xl" : "text-base md:text-lg"
            )}
          >
            {release.title}
          </h3>
          <p className="mt-3 text-white/60 text-sm md:text-base leading-relaxed flex-1">
            {release.summary}
          </p>

          {/* Meta + download */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <FileText size={12} />
              <span>PDF</span>
              <span className="text-white/20">|</span>
              <span>{release.size}</span>
            </div>
            {release.available ? (
              <a
                href={assetUrl(release.pdfPath)}
                download={release.fileName}
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-300 group/dl",
                  release.featured
                    ? "text-gold hover:text-gold-light"
                    : "text-white/70 hover:text-gold"
                )}
                aria-label={`Download ${release.title}`}
              >
                <Download size={14} />
                <span>Download</span>
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover/dl:translate-x-0.5 group-hover/dl:-translate-y-0.5"
                />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-white/35">
                <FileText size={14} />
                <span>Not yet published</span>
              </span>
            )}
          </div>
        </div>

        {/* Featured badge */}
        {release.featured && (
          <div className="absolute top-2.5 right-2.5">
            <Badge
              variant="default"
              className="text-[10px] tracking-wider uppercase h-5 px-2 shadow-lg"
            >
              Key Release
            </Badge>
          </div>
        )}
      </article>
    </Reveal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function PressReleaseArchive({
  releases = DEFAULT_RELEASES,
  className,
  showHeader = true,
}: {
  releases?: PressRelease[];
  className?: ClassValue;
  showHeader?: boolean;
}) {
  return (
    <div className={cn("max-w-5xl mx-auto", className)}>
      {showHeader && (
        <Reveal variant="fade" delay={0}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
            <h3 className="font-display font-bold text-white text-base md:text-lg tracking-wide">
              Press Release Archive
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </Reveal>
      )}

      <Stagger staggerMs={120} className="grid md:grid-cols-2 gap-6">
        {releases.map((release, i) => (
          <PressReleaseCard key={release.id} release={release} index={i} />
        ))}
      </Stagger>
    </div>
  );
}

export default PressReleaseArchive;
