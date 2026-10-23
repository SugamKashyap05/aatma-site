/**
 * Where a work shown on this site actually comes from.
 *
 * - `client-publication` — a document supplied or issued by AATMA and
 *   reproduced here with their client-provided provenance.
 */
export type PublicationProvenance =
  | "client-publication"
  | "client-press-estimate"
  | "client-supplied-document"
  | "client-verified-study"
  | "site-summary";

export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  body: string[];
  image?: string;
  page?: number;
  bookPage?: number;
  pageStart?: number;
  pageEnd?: number;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  format: string;
  chapterCount: number;
  filePath: string;
  readerMode?: "embedded-pdf";
  /** Presentation for scanned page-image publications. */
  readerStyle?: "flipbook" | "page-strip";
  coverImage?: string;
  coverGradient: string;
  wordCount: number;
  readingTime: number;
  language: string;
  publisher: string;
  isbn: string;
  /** Year printed on the publication itself. Omitted for site-authored summaries. */
  publishedYear?: number;
  totalPages?: number;
  /** Distinguishes a real AATMA publication from site-authored editorial copy. */
  provenance: PublicationProvenance;
  /** Visitor-facing statement of where this work comes from. */
  provenanceNote: string;
  /**
   * Claims inside this work that still have no traceable client-supplied
   * source. Rendered as a visible "pending source" note so nothing here is
   * read as verified. Absent when every claim traces to a client document.
   */
  unverifiedClaims?: string[];
  chapters: Chapter[];
}

export const BOOKS: Book[] = [
  {
    id: "agar-original",
    slug: "agar-original",
    title: "AGAR — History & Scope of Plantation: A Perspective",
    author: "Dr. M. Ahmed and Dr. P. Gogoi",
    description:
      "The original AGAR publication by Dr. M. Ahmed and Dr. P. Gogoi — a comprehensive visual document on the agarwood trade, its history, cultivation, and significance to Assam.",
    format: "pdf",
    chapterCount: 26,
    filePath: "books/agar.pdf",
    coverImage: "books/agar/pages/page-001.jpg",
    readerStyle: "flipbook",
    coverGradient: "from-green-deep via-green-mid to-green-light",
    wordCount: 0,
    readingTime: 0,
    language: "English",
    publisher: "AATMA",
    isbn: "",
    publishedYear: 2000,
    totalPages: 31,
    provenance: "client-publication",
    provenanceNote:
      "An AATMA publication — first print September 2000, published by the association. Authors Dr. M. Ahmed and Dr. P. Gogoi, read from the scanned title and imprint pages. Reproduced here from the association's scan; no external hosting dependency is used.",
    chapters: [
      { id: "front-matter", title: "Front Matter", image: "books/agar/pages/page-001.jpg", body: [], page: 1, bookPage: 1, pageStart: 1, pageEnd: 6 },
      { id: "introduction", title: "Introduction", image: "books/agar/pages/page-007.jpg", body: [], page: 7, bookPage: 1, pageStart: 7, pageEnd: 8 },
      { id: "history-of-agarwood", title: "History of Agarwood", image: "books/agar/pages/page-007.jpg", body: [], page: 7, bookPage: 1, pageStart: 7, pageEnd: 8 },
      { id: "commercial-development", title: "Commercial Development", image: "books/agar/pages/page-009.jpg", body: [], page: 9, bookPage: 3, pageStart: 9, pageEnd: 10 },
      { id: "use-of-sanchipat", title: "Use of Sanchipat", image: "books/agar/pages/page-011.jpg", body: [], page: 11, bookPage: 5, pageStart: 11, pageEnd: 11 },
      { id: "distribution", title: "Distribution", image: "books/agar/pages/page-011.jpg", body: [], page: 11, bookPage: 5, pageStart: 11, pageEnd: 11 },
      { id: "the-tree", title: "The Tree", image: "books/agar/pages/page-012.jpg", body: [], page: 12, bookPage: 6, pageStart: 12, pageEnd: 13 },
      { id: "how-the-tree-becomes-valuable", title: "How the Tree becomes so valuable", image: "books/agar/pages/page-012.jpg", body: [], page: 12, bookPage: 6, pageStart: 12, pageEnd: 13 },
      { id: "raising-plantation", title: "Raising Plantation", image: "books/agar/pages/page-014.jpg", body: [], page: 14, bookPage: 8, pageStart: 14, pageEnd: 14 },
      { id: "soil-and-climate", title: "Soil and Climate", image: "books/agar/pages/page-014.jpg", body: [], page: 14, bookPage: 8, pageStart: 14, pageEnd: 14 },
      { id: "propagation", title: "Propagation", image: "books/agar/pages/page-015.jpg", body: [], page: 15, bookPage: 9, pageStart: 15, pageEnd: 15 },
      { id: "planting", title: "Planting", image: "books/agar/pages/page-016.jpg", body: [], page: 16, bookPage: 10, pageStart: 16, pageEnd: 16 },
      { id: "silvicultural-characteristics", title: "Silvicultural Characteristics", image: "books/agar/pages/page-017.jpg", body: [], page: 17, bookPage: 11, pageStart: 17, pageEnd: 17 },
      { id: "agar-in-homestead", title: "Agar in Homestead Planting", image: "books/agar/pages/page-018.jpg", body: [], page: 18, bookPage: 12, pageStart: 18, pageEnd: 18 },
      { id: "agar-in-agroforestry", title: "Agar in Agro-forestry", image: "books/agar/pages/page-019.jpg", body: [], page: 19, bookPage: 13, pageStart: 19, pageEnd: 19 },
      { id: "agar-in-tea-gardens", title: "Agar in Tea gardens", image: "books/agar/pages/page-019.jpg", body: [], page: 19, bookPage: 13, pageStart: 19, pageEnd: 19 },
      { id: "present-status-ne-india", title: "Present status of Agar Tree in the NE India", image: "books/agar/pages/page-020.jpg", body: [], page: 20, bookPage: 14, pageStart: 20, pageEnd: 24 },
      { id: "population-status-trends", title: "Population Status and Trends", image: "books/agar/pages/page-020.jpg", body: [], page: 20, bookPage: 14, pageStart: 20, pageEnd: 24 },
      { id: "artificial-regeneration", title: "Status in Artificial Regeneration", image: "books/agar/pages/page-025.jpg", body: [], page: 25, bookPage: 19, pageStart: 25, pageEnd: 25 },
      { id: "promotional-activities", title: "Promotional Activities", image: "books/agar/pages/page-026.jpg", body: [], page: 26, bookPage: 20, pageStart: 26, pageEnd: 26 },
      { id: "cultural-treatment", title: "Cultural Treatment to Augment Oil Formation", image: "books/agar/pages/page-027.jpg", body: [], page: 27, bookPage: 21, pageStart: 27, pageEnd: 27 },
      { id: "detection-harvestable", title: "Detection of Harvestable trees", image: "books/agar/pages/page-028.jpg", body: [], page: 28, bookPage: 22, pageStart: 28, pageEnd: 28 },
      { id: "harvesting", title: "Harvesting", image: "books/agar/pages/page-029.jpg", body: [], page: 29, bookPage: 23, pageStart: 29, pageEnd: 29 },
      { id: "harvesting-season", title: "Harvesting Season", image: "books/agar/pages/page-030.jpg", body: [], page: 30, bookPage: 24, pageStart: 30, pageEnd: 30 },
      { id: "yield", title: "Yield", image: "books/agar/pages/page-030.jpg", body: [], page: 30, bookPage: 24, pageStart: 30, pageEnd: 30 },
      { id: "future-prospects", title: "Future Prospects as a Plantation Crop", image: "books/agar/pages/page-031.jpg", body: [], page: 31, bookPage: 25, pageStart: 31, pageEnd: 31 },
    ],
  },
  {
    id: "proceedings-agar-plantation-2001",
    slug: "proceedings-agar-plantation-2001",
    title: "Proceedings of Seminar on Scope & Dimension of Agar Plantation in NE Region",
    author: "Edited by M. Ahmed, P. Gogoi, and G. U. Ahmed",
    description:
      "A 128-page scanned proceedings volume. The cover identifies the publication as an AATMA volume dated February 2001.",
    format: "PDF scan",
    chapterCount: 0,
    // Hosted on GitHub Releases, not in the repo: at 107 MiB it exceeds GitHub's
    // 100 MiB per-file limit for repository contents. The in-page reader uses the
    // per-page scans under public/books/proceedings/pages/, so only the download
    // action depends on this URL.
    filePath:
      "https://github.com/SugamKashyap05/aatma-site/releases/download/proceedings-2001/proceedings-seminar-2001.pdf",
    readerStyle: "flipbook",
    coverImage: "books/covers/proceedings-seminar-2001.png",
    coverGradient: "from-green-deep via-green-mid to-green-light",
    wordCount: 0,
    readingTime: 0,
    language: "Not specified",
    publisher: "AATMA",
    isbn: "",
    publishedYear: 2001,
    totalPages: 128,
    provenance: "client-publication",
    provenanceNote:
      "Scanned proceedings. The cover names AATMA, lists the editors, and gives the date as Feb 2001. Reproduced unaltered.",
    chapters: [
      { id: "chapter-1", title: "Front Matter", body: [], image: "books/proceedings/pages/page-001.jpg", page: 1, bookPage: 1, pageStart: 1, pageEnd: 6 },
      { id: "chapter-2", title: "Keynote Address", body: [], image: "books/proceedings/pages/page-007.jpg", page: 7, bookPage: 7, pageStart: 7, pageEnd: 12 },
      { id: "chapter-3", title: "Session I: Agar Plantation Scope", body: [], image: "books/proceedings/pages/page-013.jpg", page: 13, bookPage: 13, pageStart: 13, pageEnd: 20 },
      { id: "chapter-4", title: "Session II: Cultivation Practices", body: [], image: "books/proceedings/pages/page-021.jpg", page: 21, bookPage: 21, pageStart: 21, pageEnd: 30 },
      { id: "chapter-5", title: "Session III: Soil & Climate", body: [], image: "books/proceedings/pages/page-031.jpg", page: 31, bookPage: 31, pageStart: 31, pageEnd: 40 },
      { id: "chapter-6", title: "Session IV: Propagation Methods", body: [], image: "books/proceedings/pages/page-041.jpg", page: 41, bookPage: 41, pageStart: 41, pageEnd: 50 },
      { id: "chapter-7", title: "Session V: Plantation Management", body: [], image: "books/proceedings/pages/page-051.jpg", page: 51, bookPage: 51, pageStart: 51, pageEnd: 60 },
      { id: "chapter-8", title: "Session VI: Harvesting Techniques", body: [], image: "books/proceedings/pages/page-061.jpg", page: 61, bookPage: 61, pageStart: 61, pageEnd: 70 },
      { id: "chapter-9", title: "Session VII: Oil Extraction", body: [], image: "books/proceedings/pages/page-071.jpg", page: 71, bookPage: 71, pageStart: 71, pageEnd: 80 },
      { id: "chapter-10", title: "Session VIII: Marketing & Trade", body: [], image: "books/proceedings/pages/page-081.jpg", page: 81, bookPage: 81, pageStart: 81, pageEnd: 90 },
      { id: "chapter-11", title: "Session IX: Regulatory Framework", body: [], image: "books/proceedings/pages/page-091.jpg", page: 91, bookPage: 91, pageStart: 91, pageEnd: 100 },
      { id: "chapter-12", title: "Session X: Future Prospects", body: [], image: "books/proceedings/pages/page-101.jpg", page: 101, bookPage: 101, pageStart: 101, pageEnd: 110 },
      { id: "chapter-13", title: "Session XI: Case Studies", body: [], image: "books/proceedings/pages/page-111.jpg", page: 111, bookPage: 111, pageStart: 111, pageEnd: 120 },
      { id: "chapter-14", title: "Closing Session", body: [], image: "books/proceedings/pages/page-121.jpg", page: 121, bookPage: 121, pageStart: 121, pageEnd: 128 },
    ],
  },
  {
    id: "seminar-abstracts-2000",
    slug: "seminar-abstracts-2000",
    title:
      "Seminar on Scope & Dimension of Agar (Aquilaria spp.) Plantation in N.E. Region — Abstracts of Papers",
    author: "AATMA",
    description:
      "Abstracts of the thirteen papers presented at the seminar held 22–23 November 2000 at the Assam Administrative Staff College, Khanapara, Guwahati. The contents page lists them across two technical sessions.",
    format: "PDF scan",
    chapterCount: 4,
    filePath: "books/abstracts-2000.pdf",
    readerStyle: "flipbook",
    coverImage: "books/abstracts/pages/page-001.png",
    coverGradient: "from-green-deep via-green-mid to-green-light",
    wordCount: 0,
    readingTime: 0,
    language: "English",
    publisher: "AATMA",
    isbn: "",
    publishedYear: 2000,
    totalPages: 15,
    provenance: "client-publication",
    provenanceNote:
      "An AATMA publication — abstracts of papers presented at the seminar held 22–23 November 2000 at the Assam Administrative Staff College, Khanapara, Guwahati, organised by the association. Reproduced here from the association's scan; no external hosting dependency is used.",
    // Page scans are the association's 200 ppi bilevel images, served as PNG:
    // the source has only two pixel values, so JPEG cannot represent it
    // losslessly and costs ~9x the bytes for a near-identical result.
    // `page` is the printed page number; `pageStart`/`pageEnd` are the
    // scan-page range the reader navigates (cover and contents are unnumbered).
    chapters: [
      { id: "cover", title: "Cover", body: [], image: "books/abstracts/pages/page-001.png", page: 1, pageStart: 1, pageEnd: 1 },
      { id: "contents", title: "Contents", body: [], image: "books/abstracts/pages/page-002.png", page: 2, pageStart: 2, pageEnd: 2 },
      { id: "session-i", title: "Technical Session I — 22 November 2000", body: [], image: "books/abstracts/pages/page-003.png", page: 1, pageStart: 3, pageEnd: 8 },
      { id: "session-ii", title: "Technical Session II — 23 November 2000", body: [], image: "books/abstracts/pages/page-009.png", page: 7, pageStart: 9, pageEnd: 15 },
    ],
  },
];
