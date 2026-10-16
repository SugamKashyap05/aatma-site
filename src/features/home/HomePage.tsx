import { ParallaxHero } from "@/features/hero/ParallaxHero";
import { About } from "@/features/about/About";
import { AgarStory } from "@/features/agarStory/AgarStory";
import { SanchiPaatSection } from "@/features/home/SanchiPaatSection";
import { FormationSection } from "@/features/home/FormationSection";
import { CriticalEraSection } from "@/features/home/CriticalEraSection";
import { AchievementSection } from "@/features/home/AchievementSection";
import { NdfFindingsSection } from "@/features/home/NdfFindingsSection";
import { RulesSection } from "@/features/home/RulesSection";
import { ChallengesSection } from "@/features/home/ChallengesSection";
import { PressSection } from "@/features/news/PressSection";
import { LatestNewsTeaser } from "@/features/news/LatestNewsTeaser";
import { Contact } from "@/features/contact/Contact";
import { Footer } from "@/features/footer/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { GamosaBorder } from "@/components/ui/GamosaBorder";
import { Reveal } from "@/components/ui/reveal";
import { useDevice } from "@/context/DeviceContext";

/**
 * Home page — aggregates all single-page sections into one route.
 * Renders the hero, navigation, and all content sections below.
 *
 * Scroll reveal: each content section is wrapped in a <Reveal> at this
 * wrapper level so the section fades in as a whole when it enters the
 * viewport. The Reveal component uses IntersectionObserver and disconnects
 * after first trigger, so animations fire once. Internal Reveal/Stagger
 * usage inside each section component is untouched — their timing and
 * staggering are preserved.
 *
 * GamosaBorder dividers separate major section groups:
 *   1. After Hero (hero → content transition)
 *   2. After Sanchi Paat (heritage → trade narrative)
 *   3. After Achievement (victory → ongoing work)
 */
export function HomePage() {
  const { tier } = useDevice();

  return (
    <>
      <ParallaxHero />
      <div className="relative z-10">
        <Navbar />
        <GamosaBorder />
        <Reveal variant="fade" delay={0}>
          <About deviceTier={tier} />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <SanchiPaatSection />
        </Reveal>
        <GamosaBorder />
        <Reveal variant="fade" delay={0}>
          <AgarStory deviceTier={tier} />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <FormationSection />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <CriticalEraSection />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <AchievementSection />
        </Reveal>
        <GamosaBorder />
        <Reveal variant="fade" delay={0}>
          <NdfFindingsSection />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <RulesSection />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <ChallengesSection />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <PressSection deviceTier={tier} />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <LatestNewsTeaser />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <Contact deviceTier={tier} />
        </Reveal>
        <Footer deviceTier={tier} />
      </div>
    </>
  );
}

export default HomePage;
