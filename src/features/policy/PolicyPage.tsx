import { ScrollText, Scale, Landmark, ShieldCheck } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BentoCard } from "@/components/ui/bento-card";
import PageLayout from "@/components/ui/PageLayout";

interface PolicyCard {
  icon: React.ReactNode;
  title: string;
  body: string;
  colSpan?: 1 | 2 | 3;
}

const POLICY_CARDS: PolicyCard[] = [
  {
    icon: <ScrollText className="w-6 h-6" strokeWidth={1.5} />,
    title: "Assam Agarwood Promotion Policy 2020",
    body: "The landmark state policy that legalised the entire agarwood trade chain — plantation, harvesting, processing, transit, and sale — on non-forest land. Effective 2021 with a 5-year initial term, it provides incentives for nursery creation, sapling distribution, cultivation and processing support, R&D, and training and marketing assistance.",
    colSpan: 2,
  },
  {
    icon: <Scale className="w-6 h-6" strokeWidth={1.5} />,
    title: "CITES & International Trade",
    body: "Aquilaria malaccensis has been on CITES Appendix II since 1995. India's successful 2024 Review of Significant Trade outcome secured a formal export quota: 1,51,080 kg/year of chips & powder and 7,050 kg/year of oil for 2024–2027. Assam's share: 1,19,400 kg chips + 5,560 kg oil.",
    colSpan: 2,
  },
  {
    icon: <Landmark className="w-6 h-6" strokeWidth={1.5} />,
    title: "Assam Cabinet Decision 2019",
    body: "In July 2019, the Assam Cabinet approved growing and cutting of Agar and Chandan trees on non-forest lands up to 35 bighas (later refined to 5 hectares) without permission — the culmination of nearly 20 years of AATMA advocacy.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
    title: "Agarwood Export Promotion Cell 2026",
    body: "In May 2026, the Ministry of Commerce constituted a dedicated Agarwood Export Promotion Cell, bringing together CHEMEXCIL and SHEFEXIL for focused export promotion, exporter facilitation, and market development.",
  },
];

/**
 * Policy page — dedicated route for policy and regulatory information.
 */
export function PolicyPage() {
  return (
    <PageLayout
      badge="Policy & Regulation"
      badgeIcon={<ScrollText size={14} />}
      title={
        <>
          Policy &amp; <span className="text-gold">Legal Framework</span>
        </>
      }
      subtitle="The regulatory journey of Assam's agarwood trade — from decades of informal commerce to a formal, legal, and internationally recognised framework."
      heroPaddingBottom="pb-12"
    >
      <section className="relative pb-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <BentoGrid>
            {POLICY_CARDS.map((card, i) => (
              <BentoCard
                key={i}
                title={card.title}
                description={card.body}
                icon={card.icon}
                colSpan={card.colSpan}
              />
            ))}
          </BentoGrid>
        </div>
      </section>
    </PageLayout>
  );
}

export default PolicyPage;
