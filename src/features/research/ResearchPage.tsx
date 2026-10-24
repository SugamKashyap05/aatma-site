import { BookOpen, Microscope, FileText, TreePine } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BentoCard } from "@/components/ui/bento-card";
import PageLayout from "@/components/ui/PageLayout";
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
    body: "AATMA's national seminar on the scope and dimension of agar (Aquilaria spp.) plantation in the North Eastern Region was held at the Assam Administrative Staff College, Guwahati, in November 2000. The February 2001 proceedings scan is available in the Books route.",
    colSpan: 2,
  },
  {
    icon: <TreePine className="w-6 h-6" strokeWidth={1.5} />,
    title: "Cultivation & market data",
    provenance: "client-verified-study",
    body: "Tree population, district estimates, export quotas, trade records, and product valuations reproduced from the MoEF&CC-commissioned NDF study summary prepared by the Botanical Survey of India (February 2024). These PDF figures are confirmed verified by the association.",
  },
  {
    icon: <FileText className="w-6 h-6" strokeWidth={1.5} />,
    title: "Policy documents",
    provenance: "client-supplied-document",
    body: "The Wood-Based Industries (Promotion and Development) Rules 2022 and Trees Outside Forest (Sustainable Management) Rules 2022 are linked below. AATMA's press note and letter to the Chief Minister are listed separately in Resources.",
  },
];

/**
 * Research page — dedicated route for association research material.
 * Presents the MoEF&CC / BSI NDF summary and its figures,
 * confirmed as verified for publication, plus association publications
 * and policy documents. Newspaper estimates are not used as data sources.
 */
export function ResearchPage() {
  return (
    <PageLayout
      badge="Research & Publications"
      badgeIcon={<BookOpen size={14} />}
      title={<>Research &amp; <span className="text-gold-light">Knowledge</span></>}
      subtitle="Publications, documents, and findings from the MoEF&CC-commissioned Non-Detriment Findings study prepared by the Botanical Survey of India."
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

      <section className="relative pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6"><TradeDataSection /></div>
      </section>
      <ResearchFindings />
    </PageLayout>
  );
}

export default ResearchPage;
