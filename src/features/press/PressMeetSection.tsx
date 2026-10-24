import { useState, useMemo } from "react";
import { assetUrl, cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { ArrowDown, Calendar, MapPin, Radio } from "lucide-react";

// ─── Transcript Loading ──────────────────────────────────────────────────────
// Transcripts are pre-sanitized by scripts/sanitize-transcripts.mjs into docs/web/.
// Loading via ?raw embeds the sanitized text at build time — named individuals
// never enter the JS bundle. Regenerate docs/web/ after editing docs/.

import assameseTranscript from "../../../docs/web/TRANSCRIPT_PRESS_MEET_2023-01-14.md?raw";
import englishTranscript from "../../../docs/web/TRANSCRIPT_PRESS_MEET_2023-01-14_EN.md?raw";
import hindiTranscript from "../../../docs/web/TRANSCRIPT_PRESS_MEET_2023-01-14_HI.md?raw";

const TRANSCRIPTS = {
  assamese: assameseTranscript,
  english: englishTranscript,
  hindi: hindiTranscript,
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
    } else if (/^#{1,6}\s+/.test(line)) {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = null;
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
  const [transcriptOpen, setTranscriptOpen] = useState(false);

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
              preload="none"
              aria-label="Client-supplied video of the AATMA press meet on 14 January 2023"
              poster={assetUrl("press-meet/IMG-P02_press-meet-hero.jpg")}
              className="w-full rounded-sm border border-white/10 bg-black"
            >
              <source src={assetUrl("press-meet/v2-tiny.mp4")} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Reveal>

        {/* Transcript — one collapsed card behind a "Read transcription"
            toggle (the same Read more pattern as FormationSection.tsx) so the
            video stays the focus of the section; the full text is one click
            away instead of filling the page beneath the clip. */}
        <Reveal variant="up" delay={100}>
          <div className="glass-surface rounded-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-white text-lg">
                  Transcript
                </h3>
                <p className="mt-1.5 text-cream/75 text-sm leading-relaxed max-w-2xl">
                  The full remarks delivered at the press meet, in the
                  speakers&rsquo; own words — available in Assamese, English,
                  and Hindi.
                </p>
              </div>
              <button
                type="button"
                aria-expanded={transcriptOpen}
                aria-controls="press-meet-transcript-body"
                data-transcript-toggle
                onClick={() => setTranscriptOpen((current) => !current)}
                className="group inline-flex min-h-11 items-center gap-2 rounded-sm border border-gold/50 bg-glass-card px-5 py-2.5 text-sm font-semibold tracking-wide text-gold-light transition-colors hover:border-gold hover:bg-green-deep/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light motion-reduce:transition-none shrink-0"
              >
                {transcriptOpen ? "Show less" : "Read transcription"}
                <ArrowDown
                  size={16}
                  aria-hidden="true"
                  focusable="false"
                  className={cn(
                    "transition-transform motion-reduce:transition-none",
                    transcriptOpen && "rotate-180"
                  )}
                />
              </button>
            </div>

            {transcriptOpen && (
              <div id="press-meet-transcript-body" className="mt-6">
                <div className="flex gap-2 mb-6">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.key}
                      type="button"
                      aria-pressed={activeTab === lang.key}
                      onClick={() => setActiveTab(lang.key)}
                      className={cn(
                        "px-4 py-2 min-h-[44px] text-sm font-medium rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light",
                        activeTab === lang.key
                          ? "bg-gold text-green-deep"
                          : "bg-glass-surface-subtle text-cream/90 hover:text-cream"
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
                      className="glass-surface rounded-sm p-4"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gold-light font-semibold text-sm">
                          {block.speaker}
                        </span>
                        <span className="text-cream/75 text-xs">
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
            )}
          </div>
        </Reveal>

        {/* Event metadata */}
        <Reveal variant="fade" delay={200}>
          <div className="glass-surface rounded-sm p-6">
            <h3 className="font-display font-bold text-white text-lg mb-4">
              Event Details
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-gold-light mt-0.5" />
                <div>
                  <div className="text-cream/75 text-xs uppercase tracking-wide">
                    Date & Time
                  </div>
                  <div className="text-white/90 text-sm">
                    14 January 2023, 6:00 PM
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-light mt-0.5" />
                <div>
                  <div className="text-cream/75 text-xs uppercase tracking-wide">
                    Venue
                  </div>
                  <div className="text-white/90 text-sm">
                    AATMA Head Office, Hojai
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Radio size={16} className="text-gold-light mt-0.5" />
                <div>
                  <div className="text-cream/75 text-xs uppercase tracking-wide">
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
