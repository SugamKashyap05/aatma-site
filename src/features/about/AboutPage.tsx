import PageLayout from "@/components/ui/PageLayout";
import { Reveal } from "@/components/ui/reveal";
import { TreePine, Users, Award, Globe } from "lucide-react";

const STATS = [
  { icon: TreePine, value: "1976", label: "AATMA formed" },
  { icon: Users, value: "800+", label: "Members" },
  { icon: Award, value: "22", label: "Years of advocacy" },
  { icon: Globe, value: "NDF", label: "Study cited" },
];

export function AboutPage() {
  return (
    <PageLayout
      badge="About AATMA"
      badgeIcon={<TreePine size={14} />}
      title="All Assam Agar Traders & Agaroil Manufacturers Association"
      subtitle="AATMA represents the agarwood trade and agaroil manufacturing sector of Assam — connecting farmers, traders, and policymakers since 1976."
    >
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal variant="fade" delay={0}>
              <div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-cream mb-6">
                  Representing Assam's agarwood sector
                </h2>
                <p className="text-cream/80 text-base md:text-lg leading-relaxed mb-4">
                  AATMA is the All Assam Agar Traders and Agaroil Manufacturers Association,
                  established in 1976. The association represents the interests of agarwood
                  traders, agaroil manufacturers, and farmers across Assam.
                </p>
                <p className="text-cream/70 text-sm md:text-base leading-relaxed">
                  The association works with government bodies, research institutions, and
                  international organizations to promote sustainable agarwood cultivation,
                  trade practices, and conservation efforts.
                </p>
              </div>
            </Reveal>
            <Reveal variant="fade" delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="glass-card rounded-lg p-5 text-center">
                    <stat.icon className="w-6 h-6 text-gold-light mx-auto mb-2" aria-hidden="true" />
                    <div className="font-display text-2xl md:text-3xl font-bold text-cream mb-1">
                      {stat.value}
                    </div>
                    <div className="text-cream/60 text-xs md:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default AboutPage;
