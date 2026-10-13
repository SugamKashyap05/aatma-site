/**
 * news.ts — single typed source of truth for news/blog articles.
 *
 * Seed data is traced to client-supplied clippings transcribed verbatim in
 * docs/CLIENT_MATERIAL_RESEARCH.md (§1, §2, §3). No fabricated entries.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface NewsArticle {
  id: string;          // stable slug, kebab-case
  slug: string;        // url segment, kebab-case
  title: string;
  outlet: string;      // publication name
  date: string;        // ISO format "YYYY-MM-DD"
  outletType: "national" | "regional" | "digital" | "trade";
  excerpt: string;     // 1–2 sentences
  body?: string;       // markdown-ish plain text for detail view
  sourceUrl?: string;  // ONLY a real article permalink, never a bare homepage
  sourceNote?: string; // citation when no permalink exists
  verified: boolean;   // true only if traced to a real clipping
}

// ─── Seed Data ───────────────────────────────────────────────────────────────

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "coverage-2023-ht",
    slug: "aatma-thanks-cm-sarma-2023",
    title:
      "AATMA thanks CM Sarma for restoring glory of agar wood-based industries in Assam",
    outlet: "Hindustan Times",
    date: "2023-01-17",
    outletType: "national",
    excerpt:
      "Reports the press conference held at the AATMA head office in Hojai on 14 January 2023. Members thanked the State government for repealing the WBI Rules 2000 and notifying the WBI (Promotion and Development) Rules 2022 on 12 January 2023, recognising agarwood units as Secondary Wood Based Industries.",
    body: `Reports the press conference held at the AATMA head office in Hojai on 14 January 2023. Members thanked the State government for repealing the WBI (Establishment and Regulation) Rules 2000 and notifying the WBI (Promotion and Development) Rules 2022 on 12 January 2023, recognising agarwood units as Secondary Wood Based Industries.

Named people: Ataur Rahman (President, AATMA), Helal Uddin (General Secretary, AATMA), Chandra Mohan Patowary (Minister of Forests, Government of Assam), Dr Himanta Biswa Sarma (Chief Minister).

Key claims:
- About 1,000 agar wood-based industries in Assam
- Locations: Hojai, Golaghat, Sibsagar, Nagaon, Jorhat, Majuli, Karimganj, Cachar, Dima Hasao, Boroland
- Categorisation as Secondary Wood Based Industries; liberation from the licence regime
- Simplified registration by Registration Committees at Conservator of Forests level
- Fully CITES compliant; paves the way for revival and for import/re-export/export
- Registration valid five years; units may operate from present locations
- Units categorised micro, small, medium, large by aggregate capacity
- Recognition of the Assam Trees Outside Forest (Sustainable Management) Rules 2022
- Benefits small and marginal farmers, the distillation industry, and traders; employment for lakhs of skilled workers`,
    sourceNote:
      "Hindustan Times, 17 January 2023 — supplied by AATMA. No online archive copy available.",
    verified: true,
  },
  {
    id: "coverage-2023-at-winds",
    slug: "winds-of-change-2023",
    title: "Wood-based industries: Winds of change soon",
    outlet: "The Assam Tribune",
    date: "2023-08-02",
    outletType: "regional",
    excerpt:
      "PJ Vijayakar traces the sector's contraction following the Supreme Court's Godavarman order, from 588 primary wood-based industries to roughly 206 today, and sets out the 62-day and 74-day registration limits under the 2022 Rules.",
    body: `PJ Vijayakar traces the sector's contraction following the Supreme Court's Godavarman Thirumulpad v. Union of India order, from 588 primary wood-based industries to roughly 206 today.

Industry counts (primary WBIs):
- Pre-Godavarman: 588 — 502 saw mills, 57 plywood mills, 27 veneer mills, 2 ply-cum-veneer mills
- Post: reduced by 66% → ~206 primary WBIs now functional in Assam

Agarwood units under the 2000 regime:
- ~1,500 agarwood-based units, "basically cottage industries"
- Required to shift to notified Industrial Estates and obtain licence
- Owners were not willing to relocate → the agarwood industry "suffered a major setback"

The 2022 Rules:
- Notified under Chief Minister Himanta Biswa Sarma
- Paradigm shift: forest department moves from regulator to facilitator
- Two categories: units requiring licence vs not, based on machinery and raw material
- Only primary WBIs need a licence and must be in notified Industrial Estates
- Secondary WBIs (agarwood, katha, furniture) require registration only
- Agarwood units de-licensed and classed as secondary WBIs
- Registration enables a legal procurement certificate for exports under CITES

Time limits:
- Licence/registration valid five years
- Procedure fully online, drastically reducing human interface
- Max 74 days for fresh licence or renewal (primary WBIs) per 5-year period
- Max 62 days for fresh registration or renewal (secondary WBIs) per 5-year period`,
    sourceNote:
      "The Assam Tribune, 2 August 2023 (p.6) — supplied by AATMA. No online archive copy available.",
    verified: true,
  },
  {
    id: "coverage-2024-at-prospects",
    slug: "prospects-assam-agarwood-2024",
    title: "Prospects of Assam's agarwood industry",
    outlet: "The Assam Tribune",
    date: "2024-11-18",
    outletType: "regional",
    excerpt:
      "PJ Vijayakar reports on the Non-detriment Findings study submitted by the Botanical Survey of India in February 2024: Assam holds over 82% of India's agarwood trees, 11.437 crore outside forest areas, with Golaghat district alone at 4.5 crore.",
    body: `PJ Vijayakar reports on the Non-detriment Findings (NDF) study submitted by the Botanical Survey of India in February 2024.

Conservation status:
- Agarwood is critically endangered on the IUCN Red List
- Listed under CITES Appendix II — export permitted only if it does not harm species survival

Tree population (per the NDF report):
- Assam holds over 82% of India's agarwood trees — 11.437 crore trees outside forest areas
- Golaghat district: 4.5 crore (highest concentration in the state)
- Other key districts: Jorhat, Sivasagar, Karimganj, Cachar
- Tripura is second nationally with 1.515 crore

Policy framework:
- January 2023 — Assam notified the WBI (Promotion & Development) Rules 2022 and the ToF (Sustainable Management) Rules 2022
- Agar listed as an exempt species (Schedule-III) — simplifies harvest and transport within Assam
- Assam Agarwood Promotion Policy, 2020 also notified

Institutional infrastructure:
- Assam Agar International Trade Centre to be established in Golaghat district
- Aims to eliminate middlemen and give farmers/traders direct access to national and international buyers

Market data:
- 2018–2022 global agarwood chips market grew at 7.7% CAGR, reaching $44.05 billion (~Rs 3,52,405.6 crore) by 2023
- Projected $64 billion (~Rs 5,12,000 crore) by 2029
- High-quality agarwood ~Rs 1 lakh per kg internationally; agar oil up to Rs 80,000 per kg

Export quota (per NDF study):
- Assam secured 79% of the country's export quota for agarwood and agar oil
- 1.194 lakh kg agarwood chips per annum
- 5,560 kg agar oil per annum`,
    sourceNote:
      "The Assam Tribune, 18 November 2024 — supplied by AATMA. No online archive copy available.",
    verified: true,
  },
];

// ─── Helper Predicates ───────────────────────────────────────────────────────

/**
 * Returns all news articles.
 */
export function getAllNews(): NewsArticle[] {
  return NEWS_ARTICLES;
}

/**
 * Lookup a news article by its slug.
 */
export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((article) => article.slug === slug);
}

/**
 * Filter news articles by year extracted from the ISO date field.
 */
export function getNewsByYear(year: number): NewsArticle[] {
  return NEWS_ARTICLES.filter(
    (article) => new Date(article.date).getFullYear() === year,
  );
}

/**
 * Filter news articles by outlet type.
 */
export function getNewsByOutletType(
  type: NewsArticle["outletType"],
): NewsArticle[] {
  return NEWS_ARTICLES.filter((article) => article.outletType === type);
}
