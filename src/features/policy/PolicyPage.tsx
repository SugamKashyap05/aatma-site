import { ScrollText, Scale, Landmark, ShieldCheck } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BentoCard } from "@/components/ui/bento-card";
import PageLayout from "@/components/ui/PageLayout";
import PolicyNav from "@/features/policy/PolicyNav";
import RulesSection from "@/features/policy/RulesSection";
import { ComparisonTable, COMPARISON_ROW_COUNT } from "@/features/policy/ComparisonTable";
import CitesCompliance from "@/features/policy/CitesCompliance";
import RegistrationProcessWalkthrough from "@/features/policy/RegistrationProcessWalkthrough";
import OnlinePlatformGuidance from "@/features/policy/OnlinePlatformGuidance";
import { PolicyDataSection } from "@/features/policy/PolicyDataSection";
import { Reveal } from "@/components/ui/reveal";

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
      {/* Hero cards */}
      <section className="relative pb-16 md:pb-20 overflow-hidden">
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

      {/* Main content with sidebar nav */}
      <div className="relative pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-10">
            {/* Sidebar navigation */}
            <PolicyNav />

            {/* Content sections */}
            <div className="flex-1 min-w-0">
              <RulesSection />

              {/* Section 3: Comparison Table */}
              <section id="comparison" className="relative pb-20 md:pb-28">
                <Reveal variant="fade" delay={0}>
                  <div className="mb-12 md:mb-16">
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-1.5 rounded-sm mb-4">
                      <ScrollText size={14} />
                      Section 3
                    </span>
                    <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-3">
                      2000 vs 2022 <span className="text-gold">Comparison</span>
                    </h2>
                    <p className="text-white/70 text-base md:text-lg max-w-3xl">
                      A comprehensive comparison of the Assam Wood Based Industries Rules 2000
                      and 2022 across {COMPARISON_ROW_COUNT} key aspects — showing how the regulatory framework
                      evolved from restrictive control to promotive development.
                    </p>
                  </div>
                </Reveal>
                <ComparisonTable />
              </section>

              <CitesCompliance />
              <RegistrationProcessWalkthrough />
              <OnlinePlatformGuidance />
              <PolicyDataSection />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default PolicyPage;
