import { cn, assetUrl, type ClassValue } from "@/lib/utils";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import {
  ArrowUpRight,
  Download,
  FileText,
  FolderOpen,
  Palette,
  User,
  Newspaper,
} from "lucide-react";
import { Reveal, Stagger } from "@/components/ui/reveal";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DownloadItem {
  id: string;
  name: string;
  description: string;
  fileSize: string;
  pdfPath: string;
  /** False when the PDF has not been produced yet — the card renders a
   *  "not yet published" state instead of a link that resolves to the SPA
   *  fallback HTML in dev and a hard 404 in production. */
  available?: boolean;
  fileName: string;
  category: "press-kit" | "brand" | "fact-sheet" | "bio" | "other";
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const DEFAULT_DOWNLOADS: DownloadItem[] = [
  {
    id: "press-kit-2024",
    name: "AATMA Press Kit 2024",
    description:
      "Complete press kit with organisation overview, key milestones, leadership profiles, and high-resolution logos for media use.",
    fileSize: "2.4 MB",
    pdfPath: "/press/aatma-press-kit-2024.pdf",
    available: false,
    fileName: "AATMA-Press-Kit-2024.pdf",
    category: "press-kit",
  },
  {
    id: "brand-guidelines",
    name: "Brand Guidelines",
    description:
      "Official brand identity guidelines including logo usage, colour palette, typography standards, and tone of voice for consistent representation.",
    fileSize: "1.8 MB",
    pdfPath: "/press/aatma-brand-guidelines.pdf",
    available: false,
    fileName: "AATMA-Brand-Guidelines.pdf",
    category: "brand",
  },
  {
    id: "fact-sheet",
    name: "Agarwood Sector Fact Sheet",
    description:
      "Key statistics and facts about the agarwood industry in Assam — production figures, export data, economic impact, and regulatory framework.",
    fileSize: "890 KB",
    pdfPath: "/press/aatma-fact-sheet.pdf",
    available: false,
    fileName: "AATMA-Fact-Sheet.pdf",
    category: "fact-sheet",
  },
  {
    id: "executive-bio",
    name: "Executive Committee Bios",
    description:
      "Biographies of AATMA's executive committee members — their backgrounds, roles, and contributions to the agarwood industry revival.",
    fileSize: "1.2 MB",
    pdfPath: "/press/aatma-executive-bios.pdf",
    available: false,
    fileName: "AATMA-Executive-Bios.pdf",
    category: "bio",
  },
];

// ─── Category Icon Map ────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<DownloadItem["category"], typeof FileText> = {
  "press-kit": FolderOpen,
  brand: Palette,
  "fact-sheet": Newspaper,
  bio: User,
  other: FileText,
};

// ─── Download Card ───────────────────────────────────────────────────────────

function DownloadCard({
  item,
  index,
}: {
  item: DownloadItem;
  index: number;
}) {
  const Icon = CATEGORY_ICONS[item.category] ?? FileText;

  return (
    <Reveal variant="up" delay={index * 100}>
      <article className="card-hover group relative h-full flex flex-col bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-sm overflow-hidden">
        {/* Category strip */}
        <div className="px-5 py-2.5 flex items-center justify-between border-b border-white/10 bg-white/[0.04]">
          <div className="flex items-center gap-2">
            <Icon size={14} className="text-gold" />
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-white/70">
              {item.category.replace("-", " ")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <FileText size={12} />
            <span>PDF</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          <h3 className="font-display font-bold text-base md:text-lg leading-snug text-white group-hover:text-gold transition-colors duration-300">
            {item.name}
          </h3>
          <p className="mt-3 text-white/60 text-sm leading-relaxed flex-1">
            {item.description}
          </p>

          {/* Meta + download */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <span className="text-white/40 text-xs">{item.fileSize}</span>
            {item.available ? (
              <a
                href={assetUrl(item.pdfPath)}
                download={item.fileName}
                className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-white/70 hover:text-gold transition-colors duration-300 group/dl"
                aria-label={`Download ${item.name}`}
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
      </article>
    </Reveal>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function PressDownloads({
  downloads = DEFAULT_DOWNLOADS,
  className,
  deviceTier,
  showHeader = true,
}: {
  /** Array of download items. Defaults to DEFAULT_DOWNLOADS if not provided. */
  downloads?: DownloadItem[];
  className?: ClassValue;
  deviceTier?: "mobile" | "tablet" | "desktop";
  /** Show the section header block (badge, title, subtitle). Default true. */
  showHeader?: boolean;
}) {
  const isMobile = deviceTier === "mobile";

  return (
    <section
      id="press-downloads"
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20 text-white",
        className,
      )}
    >
      <AmbientMotion
        variant={isMobile ? "fog" : "clouds"}
        theme="light"
        layers={isMobile ? 1 : 2}
        speed={isMobile ? 60 : 50}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        {showHeader && (
          <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
            <Reveal variant="fade" delay={0}>
              <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-1.5 rounded-sm mb-4">
                <Download size={14} />
                Downloads
              </span>
            </Reveal>
            <Reveal variant="up" delay={100}>
              <h2 className="font-display font-bold text-xl md:text-3xl lg:text-4xl leading-tight mb-6">
                Downloadable <span className="text-gold">resources</span>
              </h2>
            </Reveal>
            <Reveal variant="fade" delay={200}>
              <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
                Press kits, brand guidelines, fact sheets, and other official
                documents available for download.
              </p>
            </Reveal>
          </div>
        )}

        {/* Downloads grid */}
        <div className="max-w-5xl mx-auto">
          <Stagger staggerMs={120} className="grid sm:grid-cols-2 gap-6">
            {downloads.map((item, i) => (
              <DownloadCard key={item.id} item={item} index={i} />
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

export default PressDownloads;
