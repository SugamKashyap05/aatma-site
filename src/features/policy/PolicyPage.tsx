import { ScrollText, Building2, Globe } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BentoCard } from "@/components/ui/bento-card";
import PageLayout from "@/components/ui/PageLayout";
import PolicyNav from "@/features/policy/PolicyNav";
import RulesSection from "@/features/policy/RulesSection";
import { ComparisonTable } from "@/features/policy/ComparisonTable";
import CitesCompliance from "@/features/policy/CitesCompliance";


import { PolicyDataSection } from "@/features/policy/PolicyDataSection";
import GazetteCitations from "@/features/policy/GazetteCitations";
import { Reveal } from "@/components/ui/reveal";

interface PolicyCard {
  icon: React.ReactNode;
  title: string;
  body: string;
  colSpan?: 1 | 2 | 3;
}

const POLICY_CARDS: PolicyCard[] = [
  {
    icon: <Building2 className="w-6 h-6" strokeWidth={1.5} />,
    title: "Wood Based Industries Rules 2022",
    body: "The primary regulatory framework for agar wood processing units in Assam — notified 12 January 2023, replacing the restrictive 2000 rules with a promotive, developmental regime. Registration valid for 5 years.",
    colSpan: 2,
  },
  {
    icon: <Globe className="w-6 h-6" strokeWidth={1.5} />,
    title: "CITES & International Trade",
    body: "AATMA's 14 January 2023 press note describes the 2022 rules as fully CITES compliant and says they pave the way for import, re-export, and export of agar wood products.",
    colSpan: 2,
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
          Policy &amp; <span className="text-gold-light">Legal Framework</span>
        </>
      }
      subtitle="A summary of client-supplied material and cited Assam Gazette notifications, from the 2000 rules to the 2022 framework."
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
                    <span className="glass-surface-subtle inline-flex items-center gap-2 text-gold-light text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-4">
                      <ScrollText size={14} />
                      Section 3
                    </span>
                    <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-3">
                      2000 vs 2022 <span className="text-gold-light">Comparison</span>
                    </h2>
                    <p className="text-white/70 text-base md:text-lg max-w-3xl">
                      Client-supplied material compares the Assam Wood Based Industries Rules 2000
                      and 2022. The table distinguishes source statements from editorial trend labels.
                    </p>
                  </div>
                </Reveal>
                <ComparisonTable />
              </section>

              <CitesCompliance />

              <PolicyDataSection />
              <GazetteCitations />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default PolicyPage;
