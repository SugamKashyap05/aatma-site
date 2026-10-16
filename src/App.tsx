import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { DeviceProvider } from "@/context/DeviceContext";
import { HomePage } from "@/features/home/HomePage";
import ChallengesSection from "@/features/home/ChallengesSection";
import KineticGrid from "@/components/ui/kinetic-grid";
import ScrollManager from "@/components/ui/ScrollManager";

const BooksPage = lazy(() => import("@/features/books/BooksPage").then(m => ({ default: m.BooksPage })));
const PressPage = lazy(() => import("@/features/press/PressPage").then(m => ({ default: m.PressPage })));
const HistoryPage = lazy(() => import("@/features/history/HistoryPage").then(m => ({ default: m.HistoryPage })));
const PolicyPage = lazy(() => import("@/features/policy/PolicyPage").then(m => ({ default: m.PolicyPage })));
const ResearchPage = lazy(() => import("@/features/research/ResearchPage").then(m => ({ default: m.ResearchPage })));
const NewsIndex = lazy(() => import("@/features/news/NewsIndex").then(m => ({ default: m.NewsIndex })));
const NewsArticleView = lazy(() => import("@/features/news/NewsArticleView").then(m => ({ default: m.NewsArticleView })));
const ResourceCenterPage = lazy(() => import("@/features/resources/ResourceCenterPage").then(m => ({ default: m.ResourceCenterPage })));
const NotFoundPage = lazy(() => import("@/features/notFound/NotFoundPage").then(m => ({ default: m.NotFoundPage })));

function SpaRedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for path in query parameter (from 404.html redirect)
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("path");
    if (redirectPath) {
      // Remove the query parameter and navigate to the path
      navigate(redirectPath, { replace: true });
      return;
    }

    // Fallback: check sessionStorage
    const redirect = sessionStorage.getItem("spa-redirect");
    if (redirect) {
      sessionStorage.removeItem("spa-redirect");
      if (location.pathname === "/" || location.pathname === "/aatma-site/") {
        navigate(redirect, { replace: true });
      }
    }
  }, [navigate, location.pathname, location.search]);

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
        <ScrollManager />
        {/* Skip link — first focusable element, so keyboard users can jump past
            the fixed navbar to the page content. Targets #main-content, which
            every route renders on its content wrapper (see
            docs/HOMEPAGE_REDESIGN_PLAN.md §8). */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-sm focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-green-deep focus:outline-none"
        >
          Skip to main content
        </a>
        <div className="relative flex flex-col min-h-screen bg-green-deep text-white antialiased overflow-x-hidden">
          {/* Fixed KineticGrid background — behind everything including hero */}
          <KineticGrid />

          {/* Route-specific content */}
          <Routes>
            <Route path="/__challenges-probe" element={<ChallengesSection />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<Suspense fallback={<div className="min-h-screen bg-green-deep" />}><BooksPage /></Suspense>} />
            <Route path="/press" element={<Suspense fallback={<div className="min-h-screen bg-green-deep" />}><PressPage /></Suspense>} />
            <Route path="/history" element={<Suspense fallback={<div className="min-h-screen bg-green-deep" />}><HistoryPage /></Suspense>} />
            <Route path="/policy" element={<Suspense fallback={<div className="min-h-screen bg-green-deep" />}><PolicyPage /></Suspense>} />
            <Route path="/research" element={<Suspense fallback={<div className="min-h-screen bg-green-deep" />}><ResearchPage /></Suspense>} />
                        <Route path="/news" element={<Suspense fallback={<div className="min-h-screen bg-green-deep" />}><NewsIndex /></Suspense>} />
            <Route path="/news/:slug" element={<Suspense fallback={<div className="min-h-screen bg-green-deep" />}><NewsArticleView /></Suspense>} />
            <Route path="/resources" element={<Suspense fallback={<div className="min-h-screen bg-green-deep" />}><ResourceCenterPage /></Suspense>} />
                        <Route path="*" element={<Suspense fallback={<div className="min-h-screen bg-green-deep" />}><NotFoundPage /></Suspense>} />
          </Routes>
        </div>
      </DeviceProvider>
    </BrowserRouter>
  );
}
