import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { DeviceProvider } from "@/context/DeviceContext";
import { HomePage } from "@/features/home/HomePage";
import { AboutPage } from "@/features/about/AboutPage";
import { ContactPage } from "@/features/contact/ContactPage";
import ScrollManager from "@/components/ui/ScrollManager";
import { RouteMetadata, ROUTE_META, NOT_FOUND_META, type RouteMeta } from "@/components/ui/RouteMetadata";

const BooksPage = lazy(() => import("@/features/books/BooksPage").then(m => ({ default: m.BooksPage })));
const PressPage = lazy(() => import("@/features/press/PressPage").then(m => ({ default: m.PressPage })));
const HistoryPage = lazy(() => import("@/features/history/HistoryPage").then(m => ({ default: m.HistoryPage })));
const PolicyPage = lazy(() => import("@/features/policy/PolicyPage").then(m => ({ default: m.PolicyPage })));
const ResearchPage = lazy(() => import("@/features/research/ResearchPage").then(m => ({ default: m.ResearchPage })));
const NewsIndex = lazy(() => import("@/features/news/NewsIndex").then(m => ({ default: m.NewsIndex })));
const NewsArticleView = lazy(() => import("@/features/news/NewsArticleView").then(m => ({ default: m.NewsArticleView })));
const ResourceCenterPage = lazy(() => import("@/features/resources/ResourceCenterPage").then(m => ({ default: m.ResourceCenterPage })));
const NotFoundPage = lazy(() => import("@/features/notFound/NotFoundPage").then(m => ({ default: m.NotFoundPage })));

const FALLBACK = <div className="min-h-screen bg-green-deep" />;

/**
 * Wraps a lazy route so its `<title>` and meta tags are applied as soon as the
 * route matches, not after the chunk finishes loading — a reader or crawler
 * that lands on a deep URL sees the right title immediately.
 *
 * The element itself is memoised: `RouteMetadata` re-renders on every
 * `useLocation()` change (it reads the pathname to build the canonical URL),
 * and without this boundary that re-render would remount the lazy component.
 */
function RouteMetaRoute({ meta, children }: { meta: RouteMeta; children: ReactNode }) {
  const element = (
    <Suspense fallback={FALLBACK}>{children}</Suspense>
  );
  return <RouteMetadata meta={meta}>{element}</RouteMetadata>;
}

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
        <div className="relative flex flex-col min-h-screen bg-green-deep text-white antialiased overflow-x-clip">
          {/* Route-specific content */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<RouteMetaRoute meta={ROUTE_META["/about"]}><AboutPage /></RouteMetaRoute>} />
            <Route path="/contact" element={<RouteMetaRoute meta={ROUTE_META["/contact"]}><ContactPage /></RouteMetaRoute>} />
            <Route path="/books" element={<RouteMetaRoute meta={ROUTE_META["/books"]}><BooksPage /></RouteMetaRoute>} />
            <Route path="/press" element={<RouteMetaRoute meta={ROUTE_META["/press"]}><PressPage /></RouteMetaRoute>} />
            <Route path="/history" element={<RouteMetaRoute meta={ROUTE_META["/history"]}><HistoryPage /></RouteMetaRoute>} />
            <Route path="/policy" element={<RouteMetaRoute meta={ROUTE_META["/policy"]}><PolicyPage /></RouteMetaRoute>} />
            <Route path="/research" element={<RouteMetaRoute meta={ROUTE_META["/research"]}><ResearchPage /></RouteMetaRoute>} />
                        <Route path="/news" element={<RouteMetaRoute meta={ROUTE_META["/news"]}><NewsIndex /></RouteMetaRoute>} />
            {/* An individual clipping sets its own title in `NewsArticleView`,
                which overrides this one once the article is known. */}
            <Route path="/news/:slug" element={<RouteMetaRoute meta={ROUTE_META["/news"]}><NewsArticleView /></RouteMetaRoute>} />
            <Route path="/resources" element={<RouteMetaRoute meta={ROUTE_META["/resources"]}><ResourceCenterPage /></RouteMetaRoute>} />
            <Route path="*" element={<RouteMetaRoute meta={NOT_FOUND_META}><NotFoundPage /></RouteMetaRoute>} />
          </Routes>
        </div>
      </DeviceProvider>
    </BrowserRouter>
  );
}
