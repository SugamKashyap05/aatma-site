import { History, Leaf, Ship, Users, Gavel, Award, ScrollText, ArrowRight, ArrowDown } from "lucide-react";
import type { ElementType, ReactNode } from "react";
import { InteractiveTimeline } from "@/components/ui/InteractiveTimeline";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal } from "@/components/ui/reveal";
import { useDevice } from "@/context/DeviceContext";
import { cn, assetUrl } from "@/lib/utils";

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
              <Icon size={16} className="text-gold" />
            </span>
            <span className="text-gold text-xs font-semibold tracking-[0.22em] uppercase">
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

function EventCard({
  date,
  title,
  children,
}: {
  date: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal variant="up" delay={60}>
      <div className="relative pl-8 md:pl-10 pb-8 md:pb-10 border-l border-white/10 last:border-l-0 last:pb-0">
        <span className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-gold shadow-lg shadow-gold/40" />
        <span className="inline-block text-gold text-xs font-bold tracking-widest uppercase mb-1.5">
          {date}
        </span>
        <h3 className="text-white font-semibold text-base md:text-lg mb-2">{title}</h3>
        <div className="text-white/65 text-sm md:text-base leading-relaxed space-y-2">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

function PersonalityCard({
  name,
  role,
  deceased,
}: {
  name: string;
  role: string;
  deceased?: boolean;
}) {
  const displayName = deceased ? `(L) ${name}` : name;
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/8 transition-colors">
      <p className="text-gold font-semibold text-sm md:text-base mb-1">{displayName}</p>
      <p className="text-white/60 text-xs md:text-sm leading-relaxed">{role}</p>
    </div>
  );
}

// Image with overlay caption
function ImageSection({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <Reveal variant="scale" delay={120} className={cn("relative rounded-xl overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-48 md:h-64 lg:h-80 object-cover"
      />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white/90 text-sm md:text-base">{caption}</p>
        </div>
      )}
    </Reveal>
  );
}

// Main page
export function HistoryPage() {
  const { tier } = useDevice();

  return (
    <PageLayout
      badge="Our History"
      badgeIcon={<History size={14} />}
      title={
        <>
          The story of <span className="text-gold">Agar</span> in Assam
        </>
      }
      subtitle="From ancient Sanchi paat to the 2022 resolution — a comprehensive history of the agarwood trade and the association that shaped it."
      heroPaddingBottom="pb-0"
    >
      {/* 1. Hero Banner */}
      <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src={assetUrl("history/hero-banner.jpg")}
          alt="Ancient Indian marketplace trading agarwood (oudh) — warm earthy tones"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <Reveal variant="up" delay={200}>
            <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              A journey through centuries — from the sacred Sanchi paat of Vaishnav saints
              to the modern global agarwood trade, and the association that fought for its recognition.
            </p>
          </Reveal>
          <Reveal variant="fade" delay={400}>
            <div className="mt-4 flex items-center gap-2 text-gold/70 text-sm">
              <ArrowDown size={16} className="animate-bounce" />
              <span>Scroll to explore</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Ancient Roots */}
      <HistorySection
        id="ancient-roots"
        icon={Leaf}
        kicker="Cultural Heritage"
        title="Ancient roots of Agar in Assam"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            <Para>
              The Agar Tree — known locally as the <strong className="text-gold">Sanchi plant</strong> —
              is one of the precious gifts of nature, deeply associated with the culture of Assam
              and North Eastern India since ancient times.
            </Para>
            <Para>
              The bark of the agar tree, called <strong className="text-gold">Sanchi paat</strong>,
              was used for writing scriptures. The renowned Vaishnav saints of Assam —{" "}
              <strong className="text-gold">Srimanta Sankar Dev</strong>,{" "}
              <strong className="text-gold">Madhav Deb</strong>, and{" "}
              <strong className="text-gold">Damudar Deb</strong> — used Sanchipat for their sacred
              writings. Since then, the Assamese people of upper Assam planted the Sanchi plant in
              their homesteads, where it became a part of ritual.
            </Para>
            <Para>
              <strong className="text-gold">Agaru</strong> (agarwood) has been an inseparable puja
              article of Hindus since ancient times. Botanically, it belongs to the genus{" "}
              <em>Aquilaria</em> of the family <em>Thymelaeaceae</em>.
            </Para>
            <Para>
              Agarwood chips (black resinous wood) and Agar Oil (Essential Oil) Attar are among the
              most useful and oldest raw materials for perfume. The trade in Agar is currently
              spread over the Indian sub-continent, the Middle East, European countries, and
              South East Asia.
            </Para>
          </div>
          <ImageSection
            src={assetUrl("history/ancient-roots.png")}
            alt="Traditional Indian devotional painting of Vaishnav saint with agarwood"
            caption="Vaishnav saints used Sanchi paat for writing scriptures"
          />
        </div>
      </HistorySection>

      {/* 3. Interactive Timeline */}
      <HistorySection
        id="timeline"
        icon={ScrollText}
        kicker="Interactive Timeline · 1905–2026"
        title="A century of agar trade history"
        className="bg-white/[0.02]"
      >
        <Para>
          Explore the key moments that shaped the agarwood trade in Assam — from early oil
          extraction in Sylhet to the landmark 2022 resolution. Click on any event to learn more.
        </Para>
        <InteractiveTimeline />
      </HistorySection>

      {/* 4. AATMA Formation Story (1976) */}
      <HistorySection
        id="aatma-formation"
        icon={Users}
        kicker="AATMA Formation · 1976"
        title="The birth of an association"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            <Para>
              The trade, being a cottage-based industry in the unorganised sector, suffered many
              obstacles — largely due to lack of knowledge on the part of traders as well as law
              enforcement agencies. Undue and uncalled-for interference posed hurdles to the safe
              sailing of the trade. Prominent traders of Hojai area felt the need to form an
              association for the improvement and expansion of the trade.
            </Para>
            <EventCard date="1976" title="AATMA is formed">
              <p>
                <strong className="text-gold">
                  ALL ASSAM AGAR TRADERS AND AGAR OIL MANUFACTURERS ASSOCIATION (AATMA)
                </strong>{" "}
                was formed in <strong className="text-gold">1976</strong> with its Head Office at{" "}
                <strong className="text-gold">Hojai</strong>. Duly registered vide{" "}
                <strong className="text-gold">664 of 1978-79</strong>.
              </p>
              <div className="mt-3 grid sm:grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">Founding President</p>
                  <p className="text-white/80 text-sm">(L) Hazi Anfar Ali</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">Founding Secretary</p>
                  <p className="text-white/80 text-sm">(L) Hazi Samsul Islam</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">Office Bearer</p>
                  <p className="text-white/80 text-sm">(L) Binay Kumar Paul</p>
                </div>
              </div>
            </EventCard>
            <EventCard date="2000" title="Re-organisation">
              <p>
                AATMA was re-organised in a General Meeting at Hojai.{" "}
                <strong className="text-gold">Shri Ataur Rahman</strong> became President and{" "}
                <strong className="text-gold">(L) Jamal Uddin Choudhury</strong> became General
                Secretary, with its Executive body.
              </p>
            </EventCard>
            <EventCard date="22–23 November" title="National Seminar at Guwahati">
              <p>
                AATMA organised a <strong className="text-gold">National level seminar</strong> on
                Scope &amp; Dimension of Agar (<em>Aquilaria</em> spp.) plantation in North Eastern
                Region, held at <strong className="text-gold">Administrative Staff College, Guwahati</strong>.
                Presided over by <strong className="text-gold">Dr. P.K. Hajra</strong>, Ex-Director
                of the Botanical Survey of India.
              </p>
              <p>
                The seminar was an eye-opener — entrepreneurs started commercial plantation in
                private land across Assam, Nagaland, Tripura, and Manipur. A joint survey by AATMA
                and Assam Govt revealed more than <strong className="text-gold">crores of agar trees</strong>{" "}
                in private collection in Assam alone, with similar reports from Tripura and Nagaland.
                Lakhs of people are now involved in cultivation and the agar trade.
              </p>
            </EventCard>
          </div>
          <ImageSection
            src={assetUrl("history/aatma-formation.png")}
            alt="1970s Indian office meeting — documentary style, AATMA formation era"
            caption="The modest 1970s office where AATMA was born"
          />
        </div>
      </HistorySection>

      {/* 5. Critical Era (2000–2022) */}
      <HistorySection
        id="critical-era"
        icon={Gavel}
        kicker="The Critical Era · 2000–2022"
        title="Struggle, setback, and eventual victory"
        className="bg-white/[0.02]"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            <EventCard date="2000" title="Assam Wood Based Industries Rules, 2000">
              <p>
                Govt. of Assam framed the{" "}
                <strong className="text-gold">
                  "Assam Wood Based Industries (Establishment and Regulation) Rules, 2000"
                </strong>
                , making agar oil extracting units fall under wood-based industries and pushing
                growers and traders into uncertainty.
              </p>
            </EventCard>
            <EventCard date="26.6.2000" title="Memorandum to the Chief Minister">
              <p>
                AATMA met the then Chief Minister of Assam and submitted a{" "}
                <strong className="text-gold">Memorandum</strong> urging exclusion of agar oil
                extracting units from the Rules. Grounds: traders collected raw materials from
                private cultivation and legal imports. They also requested declaring agar wood
                industries as <strong className="text-gold">agro-based industry</strong>. Nothing
                concrete was done.
              </p>
            </EventCard>
            <EventCard date="October 2005" title="DFO Hojai refusal — a devastating blow">
              <p>
                Agar processing units survived on imports till 2005. Verification of consignments
                by the DFO was done for CITES compliance. In October 2005, the then{" "}
                <strong className="text-gold">DFO of Hojai, Shri Siv Kumar, IFS</strong>, denied
                verification unlawfully on the alleged verbal instruction of the then Forest
                Minister.
              </p>
              <p>
                About <strong className="text-gold">6–7 processing units</strong> suffered huge
                losses. As many as <strong className="text-gold">7–8 business houses</strong>{" "}
                shifted to Meghalaya and abroad. The prospect of a viable industry was crippled —
                leading to huge loss of industries and foreign currency that could have been earned
                from exports.
              </p>
            </EventCard>
            <EventCard date="01.03.2006" title="Central Empowered Committee">
              <p>
                The <strong className="text-gold">Central Empowered Committee</strong> agreed to
                certain changes and recommended incorporating Agarwood industries in{" "}
                <strong className="text-gold">Secondary Wood Based Industry</strong> — settable
                outside designated Industrial Areas. Unfortunately, the{" "}
                <strong className="text-gold">Assam Cabinet did not approve</strong> the
                recommendation.
              </p>
            </EventCard>
            <EventCard date="2017" title="Forest Minister's keen interest">
              <p>
                The then <strong className="text-gold">Forest Minister, Smt Pramila Rani Brahma</strong>,
                took keen interest. At her behest, a proposal for inclusion of Agar wood industry
                in "Secondary Wood Based Industry" by way of exclusion from the Rules, 2000 was
                submitted to the Govt.
              </p>
            </EventCard>
            <EventCard date="2022" title="Resolution at last">
              <p>
                Thanks to the present dynamic Chief Minister of Assam,{" "}
                <strong className="text-gold">Shri Himanta Biswa Sarma</strong>, his government
                looked afresh and positively at the vexed issue. New rules were made:{" "}
                <strong className="text-gold">
                  "Assam Wood Based Industries (Promotion &amp; Development) Rules, 2022"
                </strong>
                . Agar Wood Industries are now declared as{" "}
                <strong className="text-gold">Secondary Wood Based Industries</strong> —
                liberalising and simplifying the trade from the grip of strict laws.
              </p>
            </EventCard>
          </div>
          <ImageSection
            src={assetUrl("history/critical-era.png")}
            alt="Modern agarwood trading market — contemporary commercial photography"
            caption="The modern agarwood trade that emerged from decades of struggle"
          />
        </div>
      </HistorySection>

      {/* 6. Key Personalities */}
      <HistorySection
        id="key-personalities"
        icon={Award}
        kicker="Key Personalities"
        title="The people behind the movement"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <PersonalityCard name="Srimanta Sankar Dev" role="Vaishnav saint of Assam; used Sanchipat for writing scriptures" />
          <PersonalityCard name="Madhav Deb" role="Vaishnav saint of Assam; used Sanchipat for writing scriptures" />
          <PersonalityCard name="Damudar Deb" role="Vaishnav saint of Assam; used Sanchipat for writing scriptures" />
          <PersonalityCard name="Jhanu Sen" role="Barpather entrepreneur; Mahaldar (Lessee); collected from Karbi Anglong &amp; Nagaland" deceased />
          <PersonalityCard name="Bhusan Sen" role="Barpather entrepreneur; Mahaldar (Lessee); collected from Karbi Anglong &amp; Nagaland" />
          <PersonalityCard name="Jogesh Deb" role="Barpather entrepreneur; Mahaldar (Lessee); collected from Karbi Anglong &amp; Nagaland" />
          <PersonalityCard name="Hazi Mastafauddin Gaoburha" role="Hojai distillation pioneer (late 1960s)" deceased />
          <PersonalityCard name="Ajmal Ali" role="Hojai distillation pioneer (late 1960s)" deceased />
          <PersonalityCard name="Hazi Anfar Ali" role="Hojai distillation pioneer; AATMA founding President" deceased />
          <PersonalityCard name="Hazi Samsul Islam" role="AATMA founding Secretary" deceased />
          <PersonalityCard name="Binay Kumar Paul" role="AATMA founding office bearer" deceased />
          <PersonalityCard name="Ataur Rahman" role="AATMA President (2000 re-organisation)" />
          <PersonalityCard name="Jamal Uddin Choudhury" role="AATMA General Secretary (2000 re-organisation)" deceased />
          <PersonalityCard name="Dr. P.K. Hajra" role="Ex-Director, Botanical Survey of India; presided over the National Seminar (22–23 Nov)" />
          <PersonalityCard name="Shri Siv Kumar, IFS" role="DFO Hojai (Oct 2005); denied verification of consignments" />
          <PersonalityCard name="Smt Pramila Rani Brahma" role="Forest Minister of Assam (2017); took keen interest in agar industry" />
          <PersonalityCard name="Shri Himanta Biswa Sarma" role="Chief Minister of Assam (2022); introduced the 2022 Rules" />
        </div>
      </HistorySection>

      {/* 7. Cultural Significance */}
      <HistorySection
        id="cultural-significance"
        icon={Leaf}
        kicker="Cultural Significance"
        title="Agar in culture, religion, and economy"
        className="bg-white/[0.02]"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            <Para>
              Agar (Sanchi plant) has been intertwined with Assamese and North Eastern Indian culture
              since ancient times, primarily through the use of its bark (<strong className="text-gold">Sanchi paat</strong>)
              for writing scriptures by Vaishnav saints.
            </Para>
            <Para>
              <strong className="text-gold">Agaru</strong> remains an essential puja (ritual) article
              for Hindus, underscoring its religious importance.
            </Para>
            <Para>
              Agarwood chips and agar oil are among the oldest raw materials used in perfumery,
              linking the region to global fragrance traditions.
            </Para>
            <Para>
              The agar trade has historically contributed to the economic livelihood of communities
              in Assam, Nagaland, Manipur, Tripura, and neighboring regions, evolving from forest-based
              collection to plantation and international commerce.
            </Para>
            <Para>
              Cultural practices such as planting Sanchi in homesteads and using agar in rituals have
              helped preserve traditional knowledge and biodiversity.
            </Para>
            <Para>
              The recognition of agar wood industries as Secondary Wood Based Industries in 2022
              acknowledges both the cultural heritage and economic potential of the sector, supporting
              sustainable plantation and trade.
            </Para>
          </div>
          <ImageSection
            src={assetUrl("history/cultural-significance.jpg")}
            alt="Agarwood/oudh in Hindu temple ceremony with incense smoke"
            caption="Agarwood has been an inseparable puja article since ancient times"
          />
        </div>
      </HistorySection>

      {/* 8. Footer / CTA */}
      <section id="history-cta" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal variant="up" delay={0}>
            <div className="bg-gold/8 border border-gold/25 rounded-xl p-8 md:p-12 text-center">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
                Explore more of <span className="text-gold">AATMA's</span> work
              </h2>
              <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-8">
                Learn about the policy framework, research initiatives, and publications that
                support the agarwood trade in Assam.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/policy"
                  className="inline-flex items-center gap-2 bg-gold text-green-deep font-semibold px-6 py-3 rounded-lg hover:bg-gold-light transition-colors"
                >
                  <ScrollText size={18} />
                  Policy &amp; Regulation
                </a>
                <a
                  href="/research"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  Research
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/books"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  Books
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

export default HistoryPage;
