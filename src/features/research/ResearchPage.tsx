import { BookOpen, Microscope, FileText, TreePine } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BentoCard } from "@/components/ui/bento-card";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal } from "@/components/ui/reveal";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";
import type { PublicationProvenance } from "@/data/books";
import { TradeDataSection } from "@/features/research/TradeDataSection";
import { ResearchFindings } from "@/features/research/ResearchFindings";

interface ResearchCard {
  icon: React.ReactNode;
  title: string;
  body: string;
  provenance: PublicationProvenance;
  colSpan?: 1 | 2 | 3;
}

const RESEARCH_CARDS: ResearchCard[] = [
  {
    icon: <Microscope className="w-6 h-6" strokeWidth={1.5} />,
    title: "National seminar on agar plantation",
    provenance: "client-publication",
    body: "AATMA's national seminar on the scope and dimension of agar (Aquilaria spp.) plantation in the North Eastern Region was held at the Assam Administrative Staff College, Guwahati, in November 2000. The client-supplied February 2001 proceedings scan is available in the Books route.",
    colSpan: 2,
  },
  {
    icon: <TreePine className="w-6 h-6" strokeWidth={1.5} />,
    title: "Cultivation & market data",
    provenance: "client-press-estimate",
    body: "Tree counts, district shares, export figures and commodity prices for Assam's agarwood sector. Every figure is taken from the client-supplied Assam Tribune report of 18 November 2024 and labelled on the page as a press estimate — not as AATMA research.",
  },
  {
    icon: <FileText className="w-6 h-6" strokeWidth={1.5} />,
    title: "Policy documents",
    provenance: "client-supplied-document",
    body: "The Wood-Based Industries (Promotion and Development) Rules 2022 and Trees Outside Forest (Sustainable Management) Rules 2022 are linked below. AATMA's press note and letter to the Chief Minister are listed separately in Resources.",
  },
];

/**
 * Research page — dedicated route for client-supplied research material.
 * Contains only client publications, the client-supplied 18 Nov 2024 press
 * report figures (labelled as press estimates), and the policy documents
 * supplied by AATMA. No site-authored science prose is included.
 */
export function ResearchPage() {
  return (
    <PageLayout
      badge="Research & Publications"
      badgeIcon={<BookOpen size={14} />}
      title={<>Research &amp; <span className="text-gold-light">Knowledge</span></>}
      subtitle="Client-supplied publications, documents, and labelled press estimates. Nothing else is presented as AATMA research."
      heroPaddingBottom="pb-12"
    >
      <section className="relative pb-16 overflow-hidden" aria-label="Research publications overview">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <BentoGrid>
            {RESEARCH_CARDS.map((card) => (
              <BentoCard
                key={card.title}
                title={card.title}
                description={card.body}
                icon={card.icon}
                colSpan={card.colSpan}
              >
                <ProvenanceBadge provenance={card.provenance} className="mt-4" />
              </BentoCard>
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28" aria-labelledby="trade-data-heading">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal variant="fade" delay={0}>
            <h2
              id="trade-data-heading"
              className="font-display font-bold text-white text-lg md:text-xl tracking-wide mb-3"
            >
              Trade &amp; Conservation Data
            </h2>
            <p className="text-cream/75 text-sm leading-relaxed max-w-3xl">
              Figures below are drawn from the client-supplied 18 November 2024
              press report and labelled as press estimates. They indicate scale
              and direction, not audited AATMA statistics.
            </p>
          </Reveal>

          <TradeDataSection />
        </div>
      </section>
      <ResearchFindings />
    </PageLayout>
  );
}

export default ResearchPage;
