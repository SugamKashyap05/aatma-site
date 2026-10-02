import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
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

const BooksPage = lazy(() => import("@/features/books/BooksPage").then(m => ({ default: m.BooksPage })));

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

function SpaRedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirect = sessionStorage.getItem("spa-redirect");
    if (redirect) {
      sessionStorage.removeItem("spa-redirect");
      // Only navigate if we're at the root (the redirect target)
      if (location.pathname === "/" || location.pathname === "/aatma-site/") {
        navigate(redirect, { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  return null;
}

export default function App() {
  // Vite exposes the configured base as BASE_URL:
  //   dev            -> "/"
  //   CI (GH Pages)  -> "/aatma-site/"
  //   local build    -> "./"   (relative base)
  // React Router needs a rooted path without a trailing slash. Passing "./"
  // through naively yields ".", which is not a valid basename and renders nothing.
  const rawBase = import.meta.env.BASE_URL;
  const basename =
    rawBase === "./" || rawBase === "" ? "/" : rawBase.replace(/\/$/, "") || "/";

  return (
    <BrowserRouter basename={basename}>
      <DeviceProvider>
        <SpaRedirectHandler />
        <div className="relative flex flex-col min-h-screen bg-green-deep text-white antialiased overflow-x-hidden">
          {/* Fixed KineticGrid background — behind everything including hero */}
          <KineticGrid />

          {/* Route-specific content */}
          <Routes>
            <Route path="/books" element={<Suspense fallback={<div className="min-h-screen bg-green-deep" />}><BooksPage /></Suspense>} />
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
