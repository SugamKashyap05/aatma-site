import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ParallaxHero } from "@/features/hero/ParallaxHero";
import { About } from "@/features/about/About";
import { AgarStory } from "@/features/agarStory/AgarStory";
import { Milestones } from "@/features/milestones/Milestones";
import { Members } from "@/features/members/Members";
import { NewsSection } from "@/features/news/News";
import { Contact } from "@/features/contact/Contact";
import { Footer } from "@/features/footer/Footer";
import { Navbar } from "@/components/ui/Navbar";
import KineticGrid from "@/components/ui/kinetic-grid";
import { DeviceProvider, useDevice } from "@/context/DeviceContext";

function PostHeroShell() {
  const { tier } = useDevice();
  return (
    <div className="relative z-10">
      <Navbar deviceTier={tier} />
      <About deviceTier={tier} />
      <AgarStory deviceTier={tier} />
      <Milestones deviceTier={tier} />
      <Members deviceTier={tier} />
      <NewsSection deviceTier={tier} />
      <Contact deviceTier={tier} />
      <Footer deviceTier={tier} />
    </div>
  );
}

export default function App() {
  // Vite exposes the configured base as BASE_URL (e.g. "/aatma-site/").
  // React Router needs it without the trailing slash.
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  return (
    <BrowserRouter basename={basename}>
      <DeviceProvider>
        <div className="relative flex flex-col min-h-screen bg-green-deep text-white antialiased overflow-x-hidden">
          {/* Fixed KineticGrid background — behind everything including hero */}
          <KineticGrid />

          {/* Homepage parallax hero — rendered only on route "/" */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ParallaxHero />
                </>
              }
            />
          </Routes>

          {/* Persistent sections (below the fold) — KineticGrid shows through */}
          <PostHeroShell />
        </div>
      </DeviceProvider>
    </BrowserRouter>
  );
}
