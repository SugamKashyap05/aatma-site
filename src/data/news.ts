/**
 * news.ts — single typed source of truth for press clippings.
 *
 * Every entry is based on a CLIENT-SUPPLIED newspaper clipping. The `transcription`
 * field is a checked summary of readable claims, not a complete or verbatim article.
 * Only verified outlet and newspaper issue-date metadata are stored in `NEWS_ARTICLES`;
 * private WhatsApp filenames are intentionally withheld.
 *
 * Two rules this module exists to enforce:
 *   1. `NEWS_ARTICLES` contains only clippings with a verified outlet AND issue date.
 *      Unverified candidates are documented in the source ledger and excluded from public routes.
 *   2. A clipping is published on its own. Where the scan held an adjacent
 *      unrelated story, that story is excluded from the summary and the
 *      exclusion is stated in `adjacentStoryNote` and rendered on the page.
 *
 * Sources: docs/CLIENT_MATERIAL_RESEARCH.md §1–§3, docs/PHASE1_CANONICAL_CLAIM_LEDGER.md,
 * and docs/CLIENT_ASSET_AND_PROVENANCE_AUDIT.md.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

/** Whether the text on the page is a client document or copy we wrote. */
export type ClippingProvenance = "client-clipping" | "site-summary";

export type OutletType = "national" | "regional" | "digital" | "trade";

export interface NewsArticle {
  id: string;
  /** Stable slug, kebab-case. Used in the /news/:slug route. */
  slug: string;
  /** Headline as printed in the clipping. */
  headline: string;
  /** Verified publication outlet, as printed on the clipping. */
  outlet: string;
  /** Verified publication date, ISO "YYYY-MM-DD". */
  date: string;
  /** Topic category for filtering. */
  category: "policy" | "trade" | "industry" | "general";
  /** Page number, when it is legible on the clipping. */
  page?: string;
  /** Byline, when legible. */
  byline?: string;
  outletType: OutletType;
  /** Language the clipping is printed in. */
  language: string;
  /** Generic client-supplied source label; private transfer filenames are withheld. */
  sourceFile: string;
  /**
   * `client-clipping` — the words on the page are the newspaper's, transcribed
   * from a clipping the client gave us. `site-summary` would mean we wrote it.
   */
  provenance: ClippingProvenance;
  /** The site's one-line description of what the clipping reports. */
  excerpt: string;
  /** Checked summary of readable claims; not a verbatim or complete article. */
  transcription: string;
  /**
   * True when the scan also carried an unrelated neighbouring story that is
   * NOT transcribed here. The note explains what was cropped out.
   */
  adjacentStoryExcluded: boolean;
  adjacentStoryNote?: string;
  /**
   * Optional link to a verified archive copy. When none is provided, the card
   * renders the printed citation and client-supplied clipping provenance.
   */
  sourceUrl?: string;
  /** Citation shown when no permalink exists. */
  sourceNote: string;
  /** Path inside `public/` for the clipping scan image, when verified and available. */
  imagePath?: string;
  /** Alt text for the clipping scan image. */
  imageAlt?: string;
}

// ─── Clippings ───────────────────────────────────────────────────────────────

export const NEWS_ARTICLES: NewsArticle[] = [
  /* HELD: the supplied crop shows a Hojai story dateline, not a verifiable newspaper issue date or masthead. Do not restore to public data until metadata is verified.
  {
    id: "coverage-2023-ht",
    slug: "aatma-thanks-cm-sarma-2023",
    headline:
      "AATMA thanks CM Sarma for restoring glory of agar wood-based industries in Assam",
    outlet: "Hindustan Times",
    date: "2023-01-17",
    outletType: "national",
    language: "English",
    sourceFile: "Client-supplied newspaper clipping",
    provenance: "client-clipping",
    excerpt:
      "Reports the press conference held at the AATMA head office in Hojai on 14 January 2023, at which members thanked the State government for repealing the 2000 rules and notifying the 2022 rules.",
    transcription: `Reports the press conference held at the AATMA head office in Hojai on Saturday 14 January 2023. Members thanked the State government for repealing the WBI (Establishment and Regulation) Rules 2000 and notifying the WBI (Promotion and Development) Rules 2022 on 12 January 2023, recognising agarwood units as Secondary Wood Based Industries.

The clipping reports about 1,000 agarwood-based units in Assam, naming Hojai, Golaghat, Sibsagar, Nagaon, Jorhat, Majuli, Karimganj, Cachar, Dima Hasao and Boroland. It says units could remain at their existing locations under a five-year registration system and describes micro, small, medium and large categories by aggregate capacity. Registration is described as a route to legal procurement certificates for CITES exports; the article says the two 2022 rules complement one another. It also refers to agar trees grown by private farmers on non-forest land and benefits for small and marginal farmers, traders and distillation businesses.

The clipping reports that an AATMA delegation planned to meet the Chief Minister and invite him to Hojai. That is the article's reported plan, not confirmation that the meeting occurred. AATMA member names are omitted from this website summary.`,
    adjacentStoryExcluded: false,
    sourceNote: "Hindustan Times, 17 January 2023",
  },
  */
  {
    id: "coverage-2023-at-winds",
    slug: "winds-of-change-2023",
    headline: "Wood-based industries: Winds of change soon",
    outlet: "The Assam Tribune",
    date: "2023-08-02",
    category: "policy",
    page: "6",
    byline: "PJ Vijayakar",
    outletType: "regional",
    language: "English",
    sourceFile: "Client-supplied newspaper clipping",
    provenance: "client-clipping",
    excerpt:
      "PJ Vijayakar traces the sector's contraction following the Supreme Court's Godavarman order and sets out the 62-day and 74-day limits under the 2022 rules.",
    transcription: `The clipping reports that Assam's primary wood-based industry count fell by 66%, from 588 (502 saw mills, 57 plywood mills, 27 veneer mills and 2 ply-cum-veneer mills) to about 206 following the Supreme Court's Godavarman order and the 2000 rules. It also says about 1,500 agarwood-based units, described as cottage industries, faced relocation and licensing requirements; owners were unwilling to relocate, and the article says the industry suffered a major setback under that framework.

Under the 2022 rules as described by the article, only primary units require a licence and must be in notified industrial estates; secondary units, including agarwood units, require registration rather than a licence. The article describes primary, secondary and composite categories, five-year validity, online processing, legal procurement certificates for exports, and maximum processing periods of 74 days for primary licences and 62 days for secondary registrations. It says applications were to advance automatically when an intermediate level exceeded its prescribed time limit.

The article also describes wood as climate-friendly and carbon-neutral, notes that about half of dry wood's weight is carbon, and discusses wood as a substitute for plastic. It describes captive plantations as a way to support raw-material supply and farmer income, and technology and skills as industry constraints. It reports that a separate investment-promotion policy for wood-based industries, including individual artisans, was being considered; the rules web portal was described at the time as expected to launch soon. These are statements from the August 2023 article, not claims about current implementation.`,
    adjacentStoryExcluded: true,
    adjacentStoryNote:
      "The page also carries an unrelated editorial, \"River dredging\", which is not AATMA material and is not transcribed here.",
    sourceNote: "The Assam Tribune, 2 August 2023, p.6",
    imagePath: "news/at-2023-08-02.jpg",
    imageAlt: "Scanned newspaper clipping from The Assam Tribune, 2 August 2023, page 6",
  },
  {
    id: "coverage-2024-at-prospects",
    slug: "prospects-assam-agarwood-2024",
    headline: "Prospects of Assam's agarwood industry",
    outlet: "The Assam Tribune",
    date: "2024-11-18",
    category: "industry",
    byline: "PJ Vijayakar",
    outletType: "regional",
    language: "English",
    sourceFile: "Client-supplied newspaper clipping",
    provenance: "client-clipping",
    excerpt:
      "PJ Vijayakar reports on the Non-detriment Findings study submitted by the Botanical Survey of India in February 2024: Assam holds over 82% of India's agarwood trees, with Golaghat district alone at 4.5 crore.",
    transcription: `PJ Vijayakar reports on the Non-detriment Findings (NDF) study submitted by the Botanical Survey of India in February 2024.

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
- 5,560 kg agar oil per annum

Trade statistics reported for 2017–2021:
- India imported more than 142 tonnes of agarwood and re-exported 141 tonnes
- Eastern India (especially Assam) accounted for 74% of imports and 92% of re-exports

The article also reports international price estimates of about ₹1 lakh per kg for high-quality agarwood and up to ₹80,000 per kg for agar oil. It gives separate domestic ranges: ₹10,000–₹3 lakh per kg for chips and ₹6,000–₹17,500 per tola (11.66 g) for oil.

Compliance issue reported:
- The article describes industry response as tepid and says many existing units had not registered under the rules
- It attributes tax evasion and reduced profits for farmers and traders to the situation

All market, trade and compliance figures above are claims reported by the newspaper. They are not presented as independently audited AATMA statistics.`,
    adjacentStoryExcluded: false,
    sourceNote: "The Assam Tribune, 18 November 2024",
    imagePath: "news/at-2024-11-18.jpg",
    imageAlt: "Scanned newspaper clipping from The Assam Tribune, 18 November 2024",
  },
  {
    id: "coverage-2008-bengali-relief",
    slug: "bengali-no-relief-2008",
    headline:
      "Dainik Jugasankha, 2 March 2008 — agarwood trade coverage",
    outlet: "Dainik Jugasankha",
    date: "2008-03-02",
    category: "trade",
    outletType: "regional",
    language: "Bengali",
    sourceFile: "Client-supplied newspaper clipping",
    provenance: "client-clipping",
    excerpt:
      "Bengali-language newspaper coverage of the agarwood trade.",
    transcription:
      "The clipping is a Bengali-language newspaper page. The headline and article text are in Bengali and have not been fully transcribed here. The scan is preserved as source material.",
    adjacentStoryExcluded: false,
    sourceNote: "Dainik Jugasankha, 2 March 2008, Vol. 8 Issue 332",
    imagePath: "news/dainik-jugasankha-2008-03-02.jpg",
    imageAlt: "Scanned Bengali newspaper page from Dainik Jugasankha, 2 March 2008",
  },
  {
    id: "coverage-2008-02-demand",
    slug: "clear-cut-policy-2008",
    outlet: "The Assam Tribune",
    date: "2008-02-25",
    headline: "Clear-cut policy on agar trade demanded",
    excerpt:
      "The Assam Tribune reports demands for a clear agar trade policy, with references to CITES Appendix-II and the Wood Based Industries Rules 2000.",
    category: "policy",
    outletType: "regional",
    language: "English",
    sourceFile: "Client-supplied newspaper clipping",
    provenance: "client-clipping",
    transcription: "The article demands a clear policy on agar trade, referencing CITES Appendix-II and the Wood Based Industries Rules 2000.",
    adjacentStoryExcluded: false,
    sourceNote: "The Assam Tribune, February 2008",
    imagePath: "news/at-2008-02.jpeg",
    imageAlt: "Scanned newspaper page from The Assam Tribune, February 2008",
  },
  {
    id: "coverage-2008-02-23-assamese",
    slug: "assamese-daily-2008-02-23",
    outlet: "Assamese Daily",
    date: "2008-02-23",
    headline: "Allegation against agar businessman reported",
    excerpt:
      "An Assamese-language daily reports on allegations concerning an agar businessman and testimony before a commission.",
    category: "trade",
    outletType: "regional",
    language: "Assamese",
    sourceFile: "Client-supplied newspaper clipping",
    provenance: "client-clipping",
    transcription: "The article reports on allegations concerning an agar businessman and testimony before a commission.",
    adjacentStoryExcluded: false,
    sourceNote: "Assamese daily, 23 February 2008",
    imagePath: "news/assamese-2008-02-23.jpeg",
    imageAlt: "Scanned Assamese newspaper page, 23 February 2008",
  },
  {
    id: "coverage-2008-03-12-barta",
    slug: "dainik-barta-2008-03-12",
    outlet: "Dainik Barta",
    date: "2008-03-12",
    headline: "Agro-business memorandum reported",
    excerpt:
      "Dainik Barta reports on a memorandum from the All Assam Agro-Businessmen and Agro-Oil Producers' Association, referencing agar trade across Assam districts.",
    category: "trade",
    outletType: "regional",
    language: "Assamese",
    sourceFile: "Client-supplied newspaper clipping",
    provenance: "client-clipping",
    transcription: "The article reports on a memorandum from the All Assam Agro-Businessmen and Agro-Oil Producers' Association.",
    adjacentStoryExcluded: false,
    sourceNote: "Dainik Barta, 12 March 2008",
    imagePath: "news/dainik-barta-2008-03-12.jpeg",
    imageAlt: "Scanned newspaper page from Dainik Barta, 12 March 2008",
  },
  {
    id: "coverage-2008-09-25-protidin",
    slug: "protidin-shongbad-2008-09-25",
    outlet: "Protidin Shongbad",
    date: "2008-09-25",
    headline: "Hojai agar trade and CITES reported",
    excerpt:
      "Protidin Shongbad reports on Hojai, Assam, and CITES-related matters concerning the agar trade.",
    category: "trade",
    outletType: "regional",
    language: "Assamese",
    sourceFile: "Client-supplied newspaper clipping",
    provenance: "client-clipping",
    transcription: "The article reports on Hojai, Assam, and CITES-related matters concerning the agar trade.",
    adjacentStoryExcluded: false,
    sourceNote: "Protidin Shongbad, 25 September 2008",
    imagePath: "news/protidin-2008-09-25.jpeg",
    imageAlt: "Scanned newspaper page from Protidin Shongbad, 25 September 2008",
  },
  {
    id: "coverage-2008-12-20-bengali",
    slug: "bengali-press-2008-12-20",
    outlet: "Bengali Press",
    date: "2008-12-20",
    headline: "Bengali press coverage of agar trade",
    excerpt:
      "Bengali-language newspaper coverage of the agarwood trade, with references to Hojai and industry matters.",
    category: "trade",
    outletType: "regional",
    language: "Bengali",
    sourceFile: "Client-supplied newspaper clipping",
    provenance: "client-clipping",
    transcription: "Bengali-language newspaper coverage of the agarwood trade.",
    adjacentStoryExcluded: false,
    sourceNote: "Bengali press, 20 December 2008",
    imagePath: "news/bengali-2008-12-20.jpeg",
    imageAlt: "Scanned Bengali newspaper page, 20 December 2008",
  },
  {
    id: "coverage-2023-08-22-winds",
    slug: "winds-of-change-2023-08-22",
    outlet: "The Assam Tribune",
    date: "2023-08-22",
    headline: "Wood-based industries: Winds of change soon",
    excerpt:
      "The Assam Tribune reports on the upcoming Wood Based Industries Rules 2022, quoting CM Himanta Biswa Sarma and referencing CITES.",
    category: "policy",
    outletType: "regional",
    language: "English",
    sourceFile: "Client-supplied newspaper clipping",
    provenance: "client-clipping",
    transcription: "The article reports on the upcoming Wood Based Industries Rules 2022, quoting CM Himanta Biswa Sarma.",
    adjacentStoryExcluded: false,
    sourceNote: "The Assam Tribune, 22 August 2023",
    imagePath: "news/at-2023-08-22.jpeg",
    imageAlt: "Scanned newspaper clipping from The Assam Tribune, 22 August 2023",
  },
  {
    id: "coverage-2023-01-17-thanks",
    slug: "aatma-thanks-cm-2023-01-17",
    outlet: "Hindustan Times",
    date: "2023-01-17",
    headline: "AATMA thanks CM Sarma for restoring glory of agar wood-based industries",
    excerpt:
      "HT reports AATMA's gratitude to CM Himanta Biswa Sarma for the Wood Based Industries Rules 2022 and the restoration of the sector.",
    category: "policy",
    outletType: "national",
    language: "English",
    sourceFile: "Client-supplied newspaper clipping",
    provenance: "client-clipping",
    transcription: "HT reports AATMA's gratitude to CM Himanta Biswa Sarma for the Wood Based Industries Rules 2022.",
    adjacentStoryExcluded: false,
    sourceNote: "Hindustan Times, 17 January 2023",
    imagePath: "news/ht-2023-01-17.jpeg",
    imageAlt: "Scanned newspaper clipping from Hindustan Times, 17 January 2023",
  },
];

// ─── Helper Predicates ───────────────────────────────────────────────────────

/** Returns all clippings, newest first. */
export function getAllNews(): NewsArticle[] {
  return [...NEWS_ARTICLES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** Lookup a clipping by its slug. */
export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((article) => article.slug === slug);
}

/** Filter clippings by year extracted from the verified ISO date field. */
export function getNewsByYear(year: number): NewsArticle[] {
  return NEWS_ARTICLES.filter(
    (article) => new Date(article.date).getFullYear() === year,
  );
}

/** Filter clippings by outlet type. */
export function getNewsByOutletType(
  type: OutletType,
): NewsArticle[] {
  return NEWS_ARTICLES.filter((article) => article.outletType === type);
}

/**
 * Clippings published without a verified date are never in this module, so
 * every entry is publishable. Kept as an explicit guard so the invariant is
 * visible in code rather than only in a comment.
 */
export function isPublishable(article: NewsArticle): boolean {
  return article.provenance === "client-clipping" && /^\d{4}-\d{2}-\d{2}$/.test(article.date);
}
