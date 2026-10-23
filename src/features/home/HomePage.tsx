import { AatmaHero } from "@/features/hero/AatmaHero";
import { AboutOverview as About } from "@/features/about/AboutOverview";
import { AgarStory } from "@/features/agarStory/AgarStory";
import { SanchiPaatSection } from "@/features/home/SanchiPaatSection";
import { FormationSection } from "@/features/home/FormationSection";
import { CriticalEraSection } from "@/features/home/CriticalEraSection";
import { AchievementSection } from "@/features/home/AchievementSection";
import { NdfFindingsSection } from "@/features/home/NdfFindingsSection";
import { RulesSection } from "@/features/home/RulesSection";
import { ChallengesSection } from "@/features/home/ChallengesSection";
import { PressTeaser } from "@/features/home/PressTeaser";
import { PresidentMessage } from "@/features/home/PresidentMessage";
import { LatestNewsTeaser } from "@/features/news/LatestNewsTeaser";
import { Footer } from "@/features/footer/Footer";
import { ImmersiveNavbar } from "@/components/ui/ImmersiveNavbar";
import { VideoBackground } from "@/components/ui/VideoBackground";

import { Reveal } from "@/components/ui/reveal";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
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
 */
export function HomePage() {
  const { tier } = useDevice();
  const isMobile = tier === "mobile";

  return (
    <>
      <VideoBackground />
      <ImmersiveNavbar />

      <main id="main-content" tabIndex={-1}>
        <AatmaHero />
        <div className="relative z-10">
          {/* Background system — subtle ambient motion behind all sections.
              Integrates the AmbientMotion component from t_e9033508 to create
              a cohesive forest-atmosphere experience across the home page.
              Uses "green" theme to match the site's deep-green identity,
              with reduced-motion support for accessibility. */}
          <AmbientMotion
            variant="fog"
            theme="green"
            layers={isMobile ? 1 : 2}
            speed={isMobile ? 60 : 45}
          />
          {/* Home content flows directly from the hero without a decorative stripe. */}
          {/* Positive rootMargin on Reveal wrappers ensures sections reach
              opacity:1 before the browser's lazy-load threshold, so lazy images
              inside actually load instead of being deferred forever. */}
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <About deviceTier={tier} />
          </Reveal>
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <SanchiPaatSection />
          </Reveal>
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <AgarStory deviceTier={tier} />
          </Reveal>
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <FormationSection />
          </Reveal>
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <CriticalEraSection />
          </Reveal>
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <AchievementSection />
          </Reveal>
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <NdfFindingsSection />
          </Reveal>
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <RulesSection />
          </Reveal>
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <ChallengesSection />
          </Reveal>
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <PressTeaser />
          </Reveal>
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <LatestNewsTeaser />
          </Reveal>
          <Reveal variant="fade" delay={0} rootMargin="0px 0px 300px 0px">
            <PresidentMessage />
          </Reveal>
        </div>
      </main>
      <Footer deviceTier={tier} />
    </>
  );
}

export default HomePage;
