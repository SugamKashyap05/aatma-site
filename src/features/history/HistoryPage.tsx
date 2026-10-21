import { History, Leaf, ScrollText, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import type { ElementType, ReactNode } from "react";
import { InteractiveTimeline } from "@/components/ui/InteractiveTimeline";

import PageLayout from "@/components/ui/PageLayout";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

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
  icon: ElementType;
  kicker: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-20 scroll-mt-20", className)}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal variant="fade" delay={0}>
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gold/15 border border-gold/30">
              <Icon size={16} className="text-gold-light" />
            </span>
            <span className="text-gold-light text-xs font-semibold tracking-[0.22em] uppercase">
              {kicker}
            </span>
          </div>
        </Reveal>
        <Reveal variant="up" delay={80}>
          <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-8 leading-tight">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

// Content blocks
function Para({ children }: { children: ReactNode }) {
  return (
    <p className="text-white/75 text-base md:text-lg leading-relaxed mb-4 max-w-3xl">
      {children}
    </p>
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
      subtitle="Key events in the agarwood trade and AATMA's history, from Sanchi paat to the 2022 Rules, enacted 12 January 2023."
      heroPaddingBottom="pb-0"
    >

      {/* Ancient Roots */}
      <HistorySection
        id="ancient-roots"
        icon={Leaf}
        kicker="Cultural Heritage"
        title="Ancient roots of Agar in Assam"
      >
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-4">
            <Para>
              The Agar Tree — known locally as the <strong className="text-gold-light">Sanchi plant</strong> —
              is one of the precious gifts of nature, deeply associated with the culture of Assam
              and North Eastern India.
            </Para>
            <Para>
              The bark of the agar tree, called <strong className="text-gold-light">Sanchi paat</strong>,
              was used for writing scriptures. The renowned Vaishnav saints of Assam —{" "}
              <strong className="text-gold-light">Srimanta Sankar Dev</strong>,{" "}
              <strong className="text-gold-light">Madhav Deb</strong>, and{" "}
              <strong className="text-gold-light">Damudar Deb</strong> — used Sanchipat for their sacred
              writings. Since then, the Assamese people of upper Assam planted the Sanchi plant in
              their homesteads, where it became a part of ritual.
            </Para>
            <Para>
              <strong className="text-gold-light">Agaru</strong> (agarwood) is described as a puja
              article of Hindus. Botanically, it belongs to the genus{" "}
              <em>Aquilaria</em> of the family <em>Thymeleaceae</em>.
            </Para>
            <Para>
              Agarwood chips (black resinous wood) and Agar Oil (Essential Oil) Attar are among the
              most useful and oldest raw materials for perfume. The trade in Agar is currently
              spread over the Indian sub-continent, the Middle East, European countries, and
              South East Asia.
            </Para>
          </div>

        </div>
      </HistorySection>

      {/* Interactive Timeline — canonical AATMA timeline */}
      <HistorySection
        id="timeline"
        icon={ScrollText}
        kicker="Interactive Timeline · 1905–2026"
        title="A century of agar trade history"
        className="bg-white/[0.02]"
      >
        <Para>
          Explore the key moments that shaped the agarwood trade in Assam — from early oil
          extraction in Sylhet to AATMA's participation in the 2026 AIDC workshop.
        </Para>
        <InteractiveTimeline />



      </HistorySection>

      {/* Cultural Significance */}
      <HistorySection
        id="cultural-significance"
        icon={Leaf}
        kicker="Cultural Significance"
        title="Cultural and commercial uses of agar"
        className="bg-white/[0.02]"
      >
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-4">
            <Para>
              Agar (Sanchi plant) has been intertwined with Assamese and North Eastern Indian culture
              since ancient times, primarily through the use of its bark (<strong className="text-gold-light">Sanchi paat</strong>)
              for writing scriptures by Vaishnav saints.
            </Para>
            <Para>
              <strong className="text-gold-light">Agaru</strong> remains an essential puja (ritual) article
              for Hindus, underscoring its religious importance.
            </Para>
            <Para>
              Agarwood chips (black resinous wood) and agar oil (essential oil) attar are among the
              most useful and oldest raw materials for perfume.
            </Para>
          </div>

        </div>
      </HistorySection>

      {/* Footer / CTA */}
      <section id="history-cta" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal variant="up" delay={0}>
            <div className="bg-gold/8 border border-gold/25 rounded-xl p-8 md:p-12 text-center">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
                Explore more of <span className="text-gold-light">AATMA's</span> work
              </h2>
              <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-8">
                Learn about the policy framework, research initiatives, and publications that
                support the agarwood trade in Assam.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {/*
                  These were raw `href="/policy"` anchors. On the GitHub Pages
                  subpath (`/aatma-site/`) a root-absolute path resolves against
                  the DOMAIN root, so each of them 404s in production while
                  working in dev, where the base is `/`. Using <Link> makes
                  React Router resolve them against the basename.
                */}
                <Link
                  to="/policy"
                  className="inline-flex items-center gap-2 bg-gold text-green-deep font-semibold px-6 py-3 rounded-lg hover:bg-gold-light active:bg-gold-light transition-colors min-h-[44px]"
                >
                  <ScrollText size={18} />
                  Policy &amp; Regulation
                </Link>
                <Link
                  to="/research"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 active:bg-white/20 transition-colors border border-white/20 min-h-[44px]"
                >
                  <BookOpen size={18} />
                  Research &amp; Data
                </Link>
                <Link
                  to="/books"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 active:bg-white/20 transition-colors border border-white/20 min-h-[44px]"
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
