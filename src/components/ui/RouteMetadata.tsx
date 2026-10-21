import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AATMA } from "@/data/content";

/**
 * RouteMetadata — per-route `<title>` and meta tags.
 *
 * Every route owns its own metadata rather than inheriting the home title from
 * `index.html`, because GitHub Pages serves one `index.html` for every URL: a
 * crawler or a reader who lands on `/history` otherwise sees “AATMA — All Assam
 * Agar Traders and Agar Oil Manufacturers Association” as the title of a
 * page about the timeline, and nothing states the association's name on the
 * deep-linked article itself.
 *
 * `noindex` is set deliberately on two kinds of route:
 *  - `/__challenges-probe`, a throwaway verification probe, and
 *  - the 404 route, so a crawler does not index the site's own error page.
 *
 * The home route deliberately sets nothing: `index.html` already carries the
 * canonical `<title>`, description and canonical URL, and re-deriving them
 * here would risk a second source of truth drifting out of step.
 */

const HOME_TITLE = "AATMA — All Assam Agar Traders and Agar Oil Manufacturers Association";

export interface RouteMeta {
  /** `<title>` for the route. Falls back to `HOME_TITLE` when absent. */
  title?: string;
  /** `<meta name="description">`. */
  description?: string;
  /** When true, the route asks search engines not to index it. */
  noindex?: boolean;
}

const HOME_DESC = "AATMA (All Assam Agar Traders and Agar Oil Manufacturers Association), established in 1976, represents Assam's agarwood trade and agaroil manufacturing sector.";

const ROUTE_META: Record<string, RouteMeta> = {
  "/books": {
    title: `Books & Publications — ${AATMA.shortName}`,
    description:
      "Client-supplied publications: the AGAR scan and seminar proceedings, available to browse and download.",
  },
  "/press": {
    title: `Press & Media — ${AATMA.shortName}`,
    description:
      "Client-supplied AATMA press note, letter, and press-meet material, presented with separate source labels.",
  },
  "/history": {
    title: `History & Timeline — ${AATMA.shortName}`,
    description:
      "AATMA's client-supplied history and timeline, from formation in 1976 through milestones recorded in 2026.",
  },
  "/policy": {
    title: `Policy & Regulation — ${AATMA.shortName}`,
    description:
      "Client-supplied policy documents and AATMA material about the WBI Rules, ToF Rules, and CITES.",
  },
  "/research": {
    title: `Research & Digital Library — ${AATMA.shortName}`,
    description:
      "Client-supplied newspaper figures and AATMA material on agarwood research and trade, with source labels.",
  },
  "/news": {
    title: `News & Media Coverage — ${AATMA.shortName}`,
    description:
      "Client-supplied newspaper clippings and summaries; publication details are stated only where verified.",
  },
  "/resources": {
    title: `Resource Center — ${AATMA.shortName}`,
    description:
      "Client-supplied rules, forms, a history note, and seminar abstracts available to read and download.",
  },
  "/about": {
    title: `About — ${AATMA.shortName}`,
    description:
      "AATMA represents the agarwood trade and agaroil manufacturing sector of Assam, established in 1976.",
  },
  "/contact": {
    title: `Contact — ${AATMA.shortName}`,
    description:
      "Contact the All Assam Agar Traders and Agaroil Manufacturers Association.",
  },
};

/** Canonical URL for a route, resolved against the site's own base path. */
export function getCanonicalUrl(pathname: string): string {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const path = pathname === "/" ? "" : pathname.replace(/^\/+/, "");
  return `https://sugamkashyap05.github.io/aatma-site/${path}`;
}

function setMeta(name: string, content: string, key: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

/**
 * Applies route metadata on route change and restores the home title and
 * description on unmount, so returning to `/` or leaving the app does not
 * leave a deep route's title behind.
 */
export function RouteMetadata({
  meta,
  children,
}: {
  meta: RouteMeta;
  children: ReactNode;
}) {
  const location = useLocation();

  useEffect(() => {
    document.title = meta.title ?? HOME_TITLE;

    setCanonical(getCanonicalUrl(location.pathname));
    setMeta("description", meta.description ?? HOME_DESC);
    setMeta("robots", meta.noindex ? "noindex, nofollow" : "index, follow");
    setMeta("og:title", meta.title ?? HOME_TITLE, "property");
    setMeta(
      "og:description",
      meta.description ?? HOME_DESC,
      "property",
    );
    setMeta("og:url", getCanonicalUrl(location.pathname), "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", AATMA.shortName, "property");
    setMeta("twitter:card", "summary");

    return () => {
      document.title = HOME_TITLE;
      setMeta("description", HOME_DESC);
    };
  }, [meta, location.pathname]);

  return <>{children}</>;
}

/** Metadata for the 404 route — deliberately not indexable. */
export const NOT_FOUND_META: RouteMeta = {
  title: `Page not found — ${AATMA.shortName}`,
  description:
    "The page you were looking for does not exist or has been moved. Return to the AATMA home page.",
  noindex: true,
};

export { ROUTE_META, HOME_DESC, HOME_TITLE };
