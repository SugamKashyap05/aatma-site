/**
 * navigation.ts — the single source of truth for what the site calls its
 * routes and home-page sections.
 *
 * Before this module existed the navbar and the footer each carried their own
 * copy of the page list, and the footer's "Quick Links" column was additionally
 * a copy of the *home section* list — so it pointed `Press` at `/#press` (the
 * home page's own teaser) while the navbar pointed `Press Releases` at the
 * `/press` route. The two navigation surfaces disagreed about what "Press"
 * meant, and the `/resources` route was missing from both copies of the
 * active-page check.
 *
 * Keeping them here means a new route is added in one place and every surface
 * picks it up, and the labels can no longer drift.
 *
 * `routeUrl()` (in `src/components/ui/Navbar.tsx`) is what makes these paths
 * correct on the GitHub Pages subpath: a bare `/history` resolves against the
 * domain root and 404s in production.
 */

export interface NavPageLink {
  /** Root-absolute route path, as used by `<Link to>`. */
  path: string;
  /** Visitor-facing label. */
  label: string;
}

export interface NavHomeSection {
  /** The `id` of the `<section>` on the home page. */
  id: string;
  /** Visitor-facing label. */
  label: string;
}

/** Order matters — this is the order the navbar renders in. */
export const NAV_PAGE_LINKS: NavPageLink[] = [
  { path: "/books", label: "Books" },
  { path: "/press", label: "Press Releases" },
  { path: "/news", label: "News" },
  { path: "/history", label: "History" },
  { path: "/policy", label: "Policy" },
  { path: "/research", label: "Research" },
  { path: "/resources", label: "Resources" },
];

/** Order matters — this is the order the home sections render in. */
export const NAV_HOME_SECTIONS: NavHomeSection[] = [
  { id: "about", label: "About" },
  { id: "sanchi-paat", label: "Sanchi Paat" },
  { id: "agar-story", label: "Agar Story" },
  { id: "formation", label: "Formation" },
  { id: "critical-era", label: "Critical Era" },
  { id: "achievement", label: "Achievement" },
  { id: "ndf-findings", label: "NDF Findings" },
  { id: "rules", label: "Rules 2022" },
  { id: "challenges", label: "Challenges" },
  { id: "press", label: "Press & Media" },
];
