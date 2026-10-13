import { useState, useMemo } from "react";
import { assetUrl, cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Calendar, MapPin, Radio } from "lucide-react";

// ─── Named-Speaker Sanitizer (defined first, applied at module load) ─────────
// Per client requirement: "No named attribution in published quotes."
// Speaker 2 = "likely Ataur Rahman" stays inference. Label speakers S1/S2/S3.
// Names are stripped at module init so raw text never enters the component state.

const NAMED_INDIVIDUALS = [
  // English variants
  "Ataur Rahman",
  "Helal Uddin",
  "Anwar Hussain",
  "Ramesh Nath",
  // Assamese variants (in spoken content)
  "আতাউৰ ৰহমান",
  "হেলালুদ্দিন",
  "আনোৱাৰ হুছেইন",
  "ৰমেশ নাথ",
  // Hindi variants (in spoken content)
  "अताउर रहमान",
  "हेलालुद्दीन",
  "अंवार हुसैन",
  "रमेश नाथ",
];

function sanitizeNames(text: string): string {
  let result = text;
  for (const name of NAMED_INDIVIDUALS) {
    result = result.replace(
      new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
      "[name withheld]"
    );
  }
  return result;
}

// ─── Transcript Loading (sanitized at module init) ────────────────────────────

const transcriptFiles = import.meta.glob(
  "../../../docs/TRANSCRIPT_PRESS_MEET_2023-01-14*.md",
  { query: "?raw", import: "default", eager: true }
) as Record<string, string>;

const TRANSCRIPTS = {
  assamese:
    sanitizeNames(transcriptFiles["../../../docs/TRANSCRIPT_PRESS_MEET_2023-01-14.md"] ?? ""),
  english:
    sanitizeNames(transcriptFiles["../../../docs/TRANSCRIPT_PRESS_MEET_2023-01-14_EN.md"] ?? ""),
  hindi:
    sanitizeNames(transcriptFiles["../../../docs/TRANSCRIPT_PRESS_MEET_2023-01-14_HI.md"] ?? ""),
} as const;

type LanguageKey = keyof typeof TRANSCRIPTS;

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpeakerBlock {
  speaker: string;
  timestamp: string;
  content: string;
}

// ─── Parser ───────────────────────────────────────────────────────────────────

function parseTranscript(raw: string): SpeakerBlock[] {
  if (!raw) return [];

  const blocks: SpeakerBlock[] = [];
  let currentBlock: SpeakerBlock | null = null;

  for (const line of raw.split("\n")) {
    const headingMatch = line.match(
      /^#{2,4}\s+(?:Speaker|वक्ता)\s*(\d+)\s*[—–-]\s*(.+?)$/
    );

    if (headingMatch) {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = {
        speaker: `S${headingMatch[1]}`,
        timestamp: headingMatch[2].trim(),
        content: "",
      };
    } else if (currentBlock) {
      currentBlock.content += line + "\n";
    }
  }

  if (currentBlock) blocks.push(currentBlock);

  return blocks.map((block) => ({
    ...block,
    content: cleanContent(block.content),
  }));
}

function cleanContent(content: string): string {
  return content
    .trim()
    .replace(/^[""]+|[""]+$/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^>\s?/gm, "")
    .trim();
}

// ─── Component ────────────────────────────────────────────────────────────────

const LANGUAGES: { key: LanguageKey; label: string }[] = [
  { key: "assamese", label: "Assamese" },
  { key: "english", label: "English" },
  { key: "hindi", label: "Hindi" },
];

export function PressMeetSection({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<LanguageKey>("english");

  const blocks = useMemo(
    () => parseTranscript(TRANSCRIPTS[activeTab]),
    [activeTab]
  );

  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Video player */}
        <Reveal variant="fade" delay={0}>
          <div className="mb-12">
            <video
              controls
              preload="metadata"
              poster={assetUrl("press-meet/IMG-P02_press-meet-hero.jpg")}
              className="w-full rounded-sm border border-white/10 bg-black"
            >
              <source src={assetUrl("press-meet/v2-tiny.mp4")} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Reveal>

        {/* Transcript tabs */}
        <Reveal variant="up" delay={100}>
          <div className="mb-8">
            <div className="flex gap-2 mb-6">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.key}
                  onClick={() => setActiveTab(lang.key)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-sm transition-colors",
                    activeTab === lang.key
                      ? "bg-gold text-green-deep"
                      : "bg-white/10 text-white/70 hover:text-white"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {blocks.map((block, i) => (
                <div
                  key={i}
                  className="bg-white/[0.05] border border-white/10 rounded-sm p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gold font-semibold text-sm">
                      {block.speaker}
                    </span>
                    <span className="text-white/40 text-xs">
                      {block.timestamp}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {block.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Event metadata */}
        <Reveal variant="fade" delay={200}>
          <div className="bg-white/[0.05] border border-white/10 rounded-sm p-6">
            <h3 className="font-display font-bold text-white text-lg mb-4">
              Event Details
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-gold mt-0.5" />
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wide">
                    Date & Time
                  </div>
                  <div className="text-white/90 text-sm">
                    14 January 2023, 6:00 PM
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5" />
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wide">
                    Venue
                  </div>
                  <div className="text-white/90 text-sm">
                    Head Office, Main Road, Hojai–782435
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Radio size={16} className="text-gold mt-0.5" />
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wide">
                    Broadcasters
                  </div>
                  <div className="text-white/90 text-sm">
                    Asom First, News To Newsaxom
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default PressMeetSection;
