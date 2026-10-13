import { Sprout, Users, Shield, Rocket, Handshake, TreePine } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { assetUrl } from "@/lib/utils";

/**
 * ResearchSections — science-communication content blocks for the /research page.
 * Covers rhizosphere biology, biopesticides, PGPR, and the AAU partnership.
 * Each section is accessible (semantic headings, alt text on images).
 */

/**
 * Section illustration sourced from `public/research/`.
 *
 * Serves AVIF -> WebP -> PNG so every browser gets the smallest format it
 * supports, and routes the path through `assetUrl` so it resolves correctly
 * under the GitHub Pages subpath (a bare "/research/..." would 404 in prod).
 *
 * Images are square (1024x1024) and render into a ~560px column, so the
 * intrinsic size is declared to reserve layout space and avoid CLS.
 */
function SectionFigure({
  slug,
  alt,
  padded = false,
}: {
  slug: string;
  alt: string;
  padded?: boolean;
}) {
  return (
    <figure className="relative">
      <picture>
        <source srcSet={assetUrl(`research/${slug}.avif`)} type="image/avif" />
        <source srcSet={assetUrl(`research/${slug}.webp`)} type="image/webp" />
        <img
          src={assetUrl(`research/${slug}.png`)}
          alt={alt}
          className={`w-full h-auto rounded-sm border border-white/10 bg-white/[0.03]${padded ? " p-4" : ""}`}
          loading="lazy"
          decoding="async"
          width={1024}
          height={1024}
        />
      </picture>
    </figure>
  );
}

function SectionHeading({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal variant="fade" delay={0}>
      <div className="mb-8 md:mb-10">
        <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-1.5 rounded-sm mb-4">
          {icon}
        </span>
        <h2 id={id} className="font-display font-bold text-2xl md:text-3xl text-white mb-3 scroll-mt-24">
          {title}
        </h2>
        {children && (
          <p className="text-white/70 text-base md:text-lg max-w-3xl leading-relaxed">
            {children}
          </p>
        )}
      </div>
    </Reveal>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 p-4 md:p-5 bg-gold/[0.06] border border-gold/20 rounded-sm">
      <p className="text-white/60 text-sm leading-relaxed">
        <span className="text-gold font-semibold">Note: </span>
        {children}
      </p>
    </div>
  );
}

export function RhizosphereSection() {
  return (
    <section id="rhizosphere-mycoflora" className="relative pb-16 md:pb-20 scroll-mt-24">
      <SectionHeading
        id="rhizosphere-heading"
        icon={<Sprout size={14} />}
        title="Rhizosphere Mycoflora"
      >
        What are soil fungi?
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4 text-white/70 text-base leading-relaxed">
          <p>
            In the thin layer of soil around plant roots — the <strong className="text-white/90">rhizosphere</strong> — 
            fungi form vast networks that act like underground internet cables, sharing water and nutrients between plants.
          </p>
          <p>
            These fungal threads help plants absorb phosphorus and nitrogen, improve soil structure, 
            and increase resilience to drought. Think of them as the soil's natural fertilizer and 
            water-retention system.
          </p>
          <Callout>
            Though <em>The Agarwood Trade of Assam</em> did not contain specific data on rhizosphere fungi, 
            scientists worldwide recognize their essential role in sustainable agriculture.
          </Callout>
        </div>
        <SectionFigure
          slug="rhizosphere-mycoflora"
          alt="Illustration of a plant with an extensive root system in a soil cross-section, surrounded by soil microbe icons representing fungi, bacteria, and plant-growth bacteria in the rhizosphere"
        />
      </div>
    </section>
  );
}

export function MicrobialWorkforceSection() {
  return (
    <section id="microbial-workforce" className="relative pb-16 md:pb-20 scroll-mt-24">
      <SectionHeading
        id="microbial-workforce-heading"
        icon={<Users size={14} />}
        title="The Microbial Workforce"
      >
        Bacteria & Actinomycetes
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4 text-white/70 text-base leading-relaxed">
          <p>
            <strong className="text-white/90">Bacteria</strong> are tiny, single-cell organisms that break down 
            organic matter, turning dead leaves and roots into plant-food. <strong className="text-white/90">Actinomycetes</strong>, 
            a special group of bacteria, give soil its earthy smell and help suppress harmful pathogens.
          </p>
          <div className="space-y-2">
            <p className="text-white/80 font-medium">Everyday analogies:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li><strong className="text-white/80">Bacteria</strong> = the recycling crew, converting waste into nutrients</li>
              <li><strong className="text-white/80">Actinomycetes</strong> = the soil's security team, guarding against disease-causing microbes</li>
            </ul>
          </div>
          <Callout>
            <em>The Agarwood Trade of Assam</em> reported no microbial count data, but numerous studies 
            show that a teaspoon of healthy soil can hold billions of these beneficial workers.
          </Callout>
        </div>
        <SectionFigure
          slug="microbial-workforce"
          alt="Illustration of soil microorganisms — rod-shaped bacteria, branching actinomycetes filaments, and spore-like cells — among organic soil particles"
          padded
        />
      </div>
    </section>
  );
}

export function BiopesticideSection() {
  return (
    <section id="biopesticide-potential" className="relative pb-16 md:pb-20 scroll-mt-24">
      <SectionHeading
        id="biopesticide-heading"
        icon={<Shield size={14} />}
        title="Biopesticide Potential"
      >
        Nature's own pest control
      </SectionHeading>

      <div className="max-w-3xl space-y-4 text-white/70 text-base leading-relaxed">
        <p>
          Certain microbes produce compounds that inhibit or kill insect pests and plant diseases, 
          offering a chemical-free alternative to synthetic pesticides.
        </p>
        <p>
          These beneficial microbes can be applied as seed coatings or soil sprays, where they 
          out-compete or directly attack harmful organisms, reducing the need for chemical sprays.
        </p>
        <Callout>
          While <em>The Agarwood Trade of Assam</em> did not mention biopesticide applications, 
          field trials with bacterial and fungal biopesticides have demonstrated effective pest 
          management in crops like rice, vegetables, and fruit trees.
        </Callout>
      </div>
    </section>
  );
}

export function PGPRSection() {
  return (
    <section id="pgpr-cultivation" className="relative pb-16 md:pb-20 scroll-mt-24">
      <SectionHeading
        id="pgpr-heading"
        icon={<Rocket size={14} />}
        title="PGPR for Cultivation"
      >
        Plant Growth-Promoting Rhizobacteria (PGPR)
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4 text-white/70 text-base leading-relaxed">
          <p>
            <strong className="text-white/90">PGPR</strong> are friendly bacteria that live on root surfaces 
            and help plants grow better by:
          </p>
          <ul className="list-disc list-inside space-y-1 text-white/60">
            <li>Fixing nitrogen from the air</li>
            <li>Solubilizing locked-up phosphorus</li>
            <li>Producing growth-hormone-like substances</li>
          </ul>
          <p className="text-white/80 font-medium">Practical benefits for farmers:</p>
          <ul className="list-disc list-inside space-y-1 text-white/60">
            <li>Higher yields with less fertilizer</li>
            <li>Improved root development</li>
            <li>Greater tolerance to salty or dry conditions</li>
          </ul>
          <Callout>
            Although <em>The Agarwood Trade of Assam</em> gave no PGPR details, many farms worldwide 
            already use PGPR-based products to cut input costs and boost sustainability.
          </Callout>
        </div>
        <SectionFigure
          slug="pgpr-cultivation"
          alt="Scientific diagram of plant-microbe interaction in the rhizosphere, showing roots, soil bacteria, and curved arrows indicating the exchange of nutrients and sugars around the root zone"
        />
      </div>
    </section>
  );
}

export function AAUPartnershipSection() {
  return (
    <section id="aau-partnership" className="relative pb-16 md:pb-20 scroll-mt-24">
      <SectionHeading
        id="aau-heading"
        icon={<Handshake size={14} />}
        title="AAU Partnership"
      >
        Collaborating for knowledge
      </SectionHeading>

      <div className="max-w-3xl space-y-4 text-white/70 text-base leading-relaxed">
        <p>
          The <strong className="text-white/90">Assam Agricultural University (AAU)</strong> partnership aims 
          to bring scientific research on soil microbes directly to farmers through workshops, field 
          demonstrations, and easy-to-understand guides.
        </p>
        <div className="space-y-2">
          <p className="text-white/80 font-medium">What the partnership does:</p>
          <ul className="list-disc list-inside space-y-1 text-white/60">
            <li>Translates complex microbiology into practical advice</li>
            <li>Tests local microbial isolates for suitability in Assam's agro-ecosystems</li>
            <li>Shares results via farmer-friendly materials and training sessions</li>
          </ul>
        </div>
        <Callout>
          <em>The Agarwood Trade of Assam</em> did not contain partnership specifics, but such 
          collaborations are vital for turning laboratory discoveries into real-world farming improvements.
        </Callout>
      </div>
    </section>
  );
}

export function ConservationHabitatSection() {
  return (
    <section id="conservation-habitat" className="relative pb-16 md:pb-20 scroll-mt-24">
      <SectionHeading
        id="conservation-heading"
        icon={<Sprout size={14} />}
        title="Conservation & Habitat"
      >
        Protecting the wild Aquilaria
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4 text-white/70 text-base leading-relaxed">
          <p>
            Wild <strong className="text-white/90">Aquilaria</strong> trees are the genetic reservoir of the 
            agarwood trade. Found in the forests of Assam and the Northeast, these trees are increasingly 
            threatened by habitat loss and over-harvesting.
          </p>
          <p>
            Conservation of wild populations is essential — not only for biodiversity but for the long-term 
            sustainability of the agarwood industry. Plantation cultivation reduces pressure on wild stands, 
            but natural habitats must be preserved.
          </p>
          <Callout>
            <em>The Agarwood Trade of Assam</em> did not contain specific conservation data, but the 
            importance of habitat protection is widely recognized in the sector.
          </Callout>
        </div>
        <SectionFigure
          slug="conservation-habitat"
          alt="Wild Aquilaria tree in Assam forest habitat — natural light, documentary style"
        />
      </div>
    </section>
  );
}

export function MarketPerfumerySection() {
  return (
    <section id="market-perfumery" className="relative pb-16 md:pb-20 scroll-mt-24">
      <SectionHeading
        id="perfumery-heading"
        icon={<Rocket size={14} />}
        title="Agar Oil & Perfumery"
      >
        The golden essence
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4 text-white/70 text-base leading-relaxed">
          <p>
            <strong className="text-white/90">Agar oil</strong> — the essential oil distilled from agarwood — 
            is one of the most prized raw materials in perfumery. Known as <em>oud</em> in the Middle East, 
            it has been traded for centuries.
          </p>
          <p>
            The oil is produced through a careful distillation process that can take days. The resulting 
            golden liquid is used in high-end fragrances, incense, and traditional medicine.
          </p>
          <Callout>
            <em>The Agarwood Trade of Assam</em> documented the distillation craft but did not contain 
            specific perfumery market data.
          </Callout>
        </div>
        <SectionFigure
          slug="market-perfumery"
          alt="Agar oil distillation and perfumery — copper stills, glass vials, golden oil"
        />
      </div>
    </section>
  );
}

export function PlantationGrowthSection() {
  return (
    <section id="plantation-growth" className="relative pb-16 md:pb-20 scroll-mt-24">
      <SectionHeading
        id="plantation-heading"
        icon={<TreePine size={14} />}
        title="Plantation Growth"
      >
        From forest to farm
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4 text-white/70 text-base leading-relaxed">
          <p>
            The shift from wild collection to <strong className="text-white/90">plantation cultivation</strong>{" "}
            has been transformative for the agarwood sector. Farmers across Assam now grow Aquilaria 
            in homesteads and dedicated plantations.
          </p>
          <p>
            A joint survey by AATMA and the Assam Government revealed more than{" "}
            <strong className="text-white/90">crores of agar trees</strong> in private collection in Assam 
            alone, with similar reports from Tripura and Nagaland.
          </p>
          <Callout>
            <em>The Agarwood Trade of Assam</em> reported no plantation growth data, but the sector's 
            expansion is well-documented in subsequent surveys.
          </Callout>
        </div>
        <SectionFigure
          slug="plantation-growth"
          alt="Agar plantation rows — saplings, farmer at work, daylight"
        />
      </div>
    </section>
  );
}
