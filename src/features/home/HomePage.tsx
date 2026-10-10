import { ParallaxHero } from "@/features/hero/ParallaxHero";
import { About } from "@/features/about/About";
import { AgarStory } from "@/features/agarStory/AgarStory";
import { Milestones } from "@/features/milestones/Milestones";
import { Members } from "@/features/members/Members";
import { PressSection } from "@/features/news/PressSection";
import { Contact } from "@/features/contact/Contact";
import { Footer } from "@/features/footer/Footer";
import { Navbar } from "@/components/ui/Navbar";
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
 */
export function HomePage() {
  const { tier } = useDevice();

  return (
    <>
      <ParallaxHero />
      <div className="relative z-10">
        <Navbar />
        <Reveal variant="fade" delay={0}>
          <About deviceTier={tier} />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <AgarStory deviceTier={tier} />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <Milestones deviceTier={tier} />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <Members deviceTier={tier} />
        </Reveal>
        <Reveal variant="fade" delay={0}>
          <PressSection deviceTier={tier} />
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
