import { History, Leaf, ScrollText, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

import PageLayout from "@/components/ui/PageLayout";
import { InteractiveTimeline } from "@/components/ui/InteractiveTimeline";
import { Reveal } from "@/components/ui/reveal";

import { HISTORY_CHAPTERS } from "@/data/history-chapters";
import { HistoryChapterSection } from "@/features/history/HistoryChapter";
import { HistoryDataSection } from "@/features/history/HistoryDataSection";

// Section wrapper
function HistorySection({
  id,
  icon: Icon,
  kicker,
  title,
  children,
  className,
}: {
  id: string;
  icon: React.ElementType;
  kicker: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 md:py-20 ${className ?? ""}`}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="fade" delay={0}>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-gold/15">
              <Icon size={16} className="text-gold-light" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">
              {kicker}
            </span>
          </div>
        </Reveal>
        <Reveal variant="up" delay={80}>
          <h2 className="mb-8 max-w-3xl font-display text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

// Main page
export function HistoryPage() {
  return (
    <PageLayout
      badge="Our History"
      badgeIcon={<History size={14} />}
      title={
        <>
          The story of <span className="text-gold-light">Agar</span> in Assam
        </>
      }
      subtitle="The association's own account of the agarwood trade — from Sanchi paat to the Assam Wood Based Industries (Promotion & Development) Rules, 2022, notified 12 January 2023."
      heroPaddingBottom="pb-12"
    >
      {/* Chapters — the client's own eight-section history, in the document's order */}
      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="fade" delay={0}>
          <p className="max-w-prose text-base leading-relaxed text-white/75 md:text-lg">
            This is the association&rsquo;s own account, transcribed from the association&rsquo;s own document <em>A Brief History of Agar</em> and kept in
            its original wording. Eight chapters, in the document&rsquo;s own
            order.
          </p>
        </Reveal>

        {HISTORY_CHAPTERS.map((chapter, index) => (
          <HistoryChapterSection
            key={chapter.id}
            chapter={chapter}
            flip={index % 2 === 1}
          />
        ))}
      </div>

      {/* Timeline — a summary of the dated records */}
      <HistorySection
        id="timeline"
        icon={ScrollText}
        kicker="Interactive Timeline · 1905–2026"
        title="A century of agar trade history"
        className="bg-white/[0.02]"
      >
        <Reveal variant="up" delay={120}>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
            The dated records behind the chapters above — from early oil
            extraction in Sylhet to AATMA&rsquo;s participation in the 2026 AIDC
            workshop. Select any entry to read its detail.
          </p>
        </Reveal>
        <InteractiveTimeline />
      </HistorySection>

      {/* Where the record concentrates */}
      <HistorySection
        id="record-density"
        icon={Leaf}
        kicker="Reading the Record"
        title="Where the timeline concentrates"
      >
        <HistoryDataSection />
      </HistorySection>

      {/* Footer / CTA */}
      <section id="history-cta" className="scroll-mt-20 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal variant="up" delay={0}>
            <div className="rounded-xl border border-gold/25 bg-gold/8 p-8 text-center md:p-12">
              <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
                Explore more of <span className="text-gold-light">AATMA&rsquo;s</span> work
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-base text-white/70 md:text-lg">
                Learn about the policy framework, research initiatives, and
                publications that support the agarwood trade in Assam.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/policy"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-green-deep transition-colors hover:bg-gold-light active:bg-gold-light"
                >
                  <ScrollText size={18} />
                  Policy &amp; Regulation
                </Link>
                <Link
                  to="/research"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20 active:bg-white/20"
                >
                  <BookOpen size={18} />
                  Research &amp; Data
                </Link>
                <Link
                  to="/books"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20 active:bg-white/20"
                >
                  Books
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

export default HistoryPage;
