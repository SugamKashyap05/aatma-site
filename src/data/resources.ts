// ─── Resource Center Data ────────────────────────────────────────────────────
// Central data source for the Resource Center / Downloads page.
//
// Every entry below traces to a real document: either a file supplied by the
// client or a published Government of Assam gazette. Nothing here is invented —
// titles, dates and descriptions restate what the source document actually
// says, and the `source` field records where each file came from so a visitor
// can see the provenance for themselves.

export type ResourceCategoryId =
  | "press-notes"
  | "policy-documents"
  | "research-papers"
  | "registration-forms"
  | "cites-documentation";

/** Coarse document type. Exposed in markup as `data-doc-type` and used by the filter. */
export type ResourceDocType = "press" | "policy" | "research" | "form" | "cites";

export interface ResourceDocument {
  id: string;
  title: string;
  category: ResourceCategoryId;
  /** Coarse type emitted as `data-doc-type` and matched by the filter. */
  docType: ResourceDocType;
  /** ISO date of the document itself. Omitted when the source is undated. */
  date?: string;
  fileType: "PDF" | "DOCX" | "XLSX" | "PPTX" | "ZIP" | "JPEG";
  fileSize: string;
  /** Page count, where known. */
  pageCount?: number;
  tags: string[];
  description: string;
  /** Where the document comes from — rendered on the card. */
  source: string;
  /** False when the file has not been produced yet — renders a "not yet published" state. */
  available?: boolean;
  /** Path inside `public/`. Resolve with `assetUrl()` before use. */
  downloadPath?: string;
}

export interface ResourceCategory {
  id: ResourceCategoryId;
  label: string;
  description: string;
}

export interface ResourceFilterOption {
  id: ResourceDocType | "all";
  label: string;
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "press-notes",
    label: "Press Notes",
    description: "AATMA's media-facing material — press notes and correspondence with the Government of Assam.",
  },
  {
    id: "policy-documents",
    label: "Policy Documents",
    description:
      "Gazette documents for the Wood-Based Industries and Trees Outside Forest rules.",
  },
  {
    id: "research-papers",
    label: "Research Papers",
    description:
      "Field-survey records and research summaries on the agarwood trade.",
  },
  {
    id: "registration-forms",
    label: "Registration Forms",
    description:
      "The prescribed application forms for registering an agarwood-based industrial unit under the 2022 rules.",
  },
  {
    id: "cites-documentation",
    label: "CITES Documentation",
    description:
      "The prescribed CITES-linked certificate an exporter applies for alongside a CITES export permit.",
  },
];

// ─── Filter options ───────────────────────────────────────────────────────────

export const RESOURCE_FILTERS: ResourceFilterOption[] = [
  { id: "all", label: "All documents" },
  { id: "press", label: "Press" },
  { id: "policy", label: "Policy" },
  { id: "research", label: "Research" },
  { id: "form", label: "Forms" },
  { id: "cites", label: "CITES" },
];

// ─── Documents ───────────────────────────────────────────────────────────────

export const RESOURCE_DOCUMENTS: ResourceDocument[] = [
  // ── Press Notes ────────────────────────────────────────────────────────────
  {
    id: "press-note-2023",
    title: "AATMA Press Note — Notification of the Wood-Based Industries Rules, 2022",
    category: "press-notes",
    docType: "press",
    date: "2023-01-14",
    fileType: "PDF",
    fileSize: "5.6 KB",
    pageCount: 2,
    tags: ["press-note", "wbi-rules", "2023"],
    description:
      "AATMA's press note welcoming the notification of the Assam Wood-Based Industries (Promotion and Development) Rules 2022 and the Assam Trees Outside Forest (Sustainable Management) Rules 2022, issued at Hojai.",
    source: "AATMA press note, 14 January 2023",
    available: true,
    downloadPath: "resources/press-note-2023-01-14.pdf",
  },

  {
    id: "letter-to-hcm-2023",
    title: "Letter to the Hon'ble Chief Minister of Assam",
    category: "press-notes",
    docType: "press",
    date: "2023-01-14",
    fileType: "PDF",
    fileSize: "5.7 KB",
    pageCount: 2,
    tags: ["letter", "chief-minister", "2023"],
    description:
      "AATMA's letter to Chief Minister Himanta Biswa Sarma acknowledging the notification of the 2022 rules and describing the 23-year wait for reform.",
    source: "AATMA letter to the Chief Minister, 14 January 2023",
    available: true,
    downloadPath: "resources/letter-to-hcm-2023-01-14.pdf",
  },

  // ── Policy Documents ───────────────────────────────────────────────────────
  {
    id: "policy-wbi-rules-2022",
    title: "Assam Wood-Based Industries (Promotion and Development) Rules, 2022",
    category: "policy-documents",
    docType: "policy",
    date: "2023-01-12",
    fileType: "PDF",
    fileSize: "2.6 MB",
    pageCount: 67,
    tags: ["rules", "2022", "gazette", "regulatory"],
    description:
      "The Assam Gazette (Extraordinary) notification No. 20, eCF No. 237152, dated 12 January 2023 — rules that replaced the 2000 framework and classed agarwood units as secondary wood-based industries; the gazette includes the prescribed forms. AATMA's 14 January 2023 press note describes the rules as fully CITES compliant.",
    source: "Assam Gazette (Extraordinary), 12 January 2023",
    available: true,
    downloadPath: "resources/wbi-rules-2022-gazette.pdf",
  },
  {
    id: "policy-tof-rules-2022",
    title: "Assam Trees Outside Forest (Sustainable Management) Rules, 2022",
    category: "policy-documents",
    docType: "policy",
    date: "2022-12-09",
    fileType: "PDF",
    fileSize: "1.3 MB",
    pageCount: 25,
    tags: ["rules", "2022", "gazette", "plantation"],
    description:
      "The gazette notification governing agar trees grown on non-forest land — plantation registration, felling and transit permits.",
    source: "Assam Gazette (Extraordinary)",
    available: true,
    downloadPath: "resources/tof-rules-2022-gazette.pdf",
  },

  // ── Press Notes (additional client-supplied) ───────────────────────────────
  {
    id: "aatma-press-release-2008",
    title: "AATMA Press Release — 21 February 2008",
    category: "press-notes",
    docType: "press",
    date: "2008-02-21",
    fileType: "JPEG",
    fileSize: "—",
    tags: ["press-release", "cites", "2008"],
    description:
      "Press release from the All Assam Agar Traders & Agaroil Manufacturers' Association (AATMA) regarding CITES regulations, the 2005 rules, endangered species, and sandalwood.",
    source: "AATMA press release, 21 February 2008",
    available: true,
    downloadPath: "resources/aatma-press-release-2008-02-21.jpeg",
  },

  // ── Policy Documents (additional client-supplied) ─────────────────────────
  {
    id: "gauhati-hc-writ-2007",
    title: "Gauhati High Court Writ Petition — M/s North East Aromatics",
    category: "policy-documents",
    docType: "policy",
    date: "2007-11-14",
    fileType: "JPEG",
    fileSize: "—",
    tags: ["legal", "court", "2007"],
    description:
      "W.P(c) No. 6284/2007 — M/s North East Aromatics v. State of Assam & Ors. A legal filing concerning the agar trade and forest regulations.",
    source: "Legal document",
    available: true,
    downloadPath: "resources/gauhati-hc-writ-2007.jpeg",
  },
  {
    id: "aatma-notice-2023",
    title: "AATMA Official Notice — Registration Fee Table",
    category: "policy-documents",
    docType: "policy",
    date: "2023-01-11",
    fileType: "JPEG",
    fileSize: "—",
    tags: ["notice", "registration", "fees"],
    description:
      "AATMA notice regarding Assam Wood Based Industries Rules 2000 and Trees Outside Forest Rules 2022 registration fees, signed by the General Secretary.",
    source: "Official notice, 11 January 2023",
    available: true,
    downloadPath: "resources/aatma-notice-2023-01-11.jpeg",
  },

  // ── Research Papers ────────────────────────────────────────────────────────
  {
    id: "research-plantation-survey",
    title: "Agarwood Plantation Survey — Salona, Nagaon (Page 41)",
    category: "research-papers",
    docType: "research",
    date: "2026-07-24",
    fileType: "JPEG",
    fileSize: "—",
    tags: ["survey", "plantation", "nagaon"],
    description:
      "Page 41 of a report titled 'Photographs of Agarwood plantation sites' — field photos from Salona, Nagaon, Assam with GPS coordinates.",
    source: "Field survey document, 24 July 2026",
    available: true,
    downloadPath: "research/plantation-survey-p41.jpeg",
  },
  {
    id: "research-distillation-survey",
    title: "Traditional Agarwood Oil Distillation Units — Annexure 2",
    category: "research-papers",
    docType: "research",
    date: "2026-07-22",
    fileType: "JPEG",
    fileSize: "—",
    tags: ["survey", "distillation", "field", "golaghat"],
    description:
      "Annexure 2: Photographs for the Field — Traditional agarwood oil distillation units in Golaghat, Jorhat, Sivasagar & Hojai districts.",
    source: "Field survey document, 22–26 July 2026",
    available: true,
    downloadPath: "research/distillation-survey-annexure.jpeg",
  },

  {
    id: "research-agar-ndf-summary-2024",
    title: "Summary of Non-Detriment Findings of Agar Trees (Aquilaria malaccensis)",
    category: "research-papers",
    docType: "research",
    fileType: "PDF",
    fileSize: "297.4 KB",
    pageCount: 3,
    tags: ["NDF", "agarwood", "population", "trade", "2024"],
    description: "Summary of the MoEF&CC-commissioned Non-Detriment Findings study prepared by the Botanical Survey of India. Includes population estimates, proposed export quotas, product valuations and trade findings.",
    source: "MoEF&CC-commissioned study; Botanical Survey of India report submitted February 2024. The figures are confirmed verified by the association.",
    available: true,
    downloadPath: "resources/agar-ndf-summary-2024.pdf",
  },

  // ── Registration Forms ─────────────────────────────────────────────────────
  {
    id: "form-xvii-registration",
    title: "Form XVII — Application for Registration Certificate (Agarwood-Based Industrial Units)",
    category: "registration-forms",
    docType: "form",
    date: "2023-01-12",
    fileType: "PDF",
    fileSize: "611 KB",
    pageCount: 2,
    tags: ["registration", "form", "agarwood", "2022-rules"],
    description:
      "The prescribed application for a registration certificate to establish, relocate, expand or operate a secondary wood-based industry (agarwood unit), reproduced from the 2022 rules gazette.",
    source: "Prescribed form — Assam WBI (Promotion and Development) Rules 2022 gazette",
    available: true,
    downloadPath: "resources/wbi-form-xvii-registration.pdf",
  },

  // ── CITES Documentation ────────────────────────────────────────────────────
  {
    id: "cites-form-xxv-lpc",
    title: "Form XXV — Legal Procurement Certificate (Agar Wood Derivatives)",
    category: "cites-documentation",
    docType: "cites",
    date: "2023-01-12",
    fileType: "PDF",
    fileSize: "316 KB",
    pageCount: 1,
    tags: ["cites", "legal-procurement-certificate", "export", "2022-rules"],
    description:
      "The prescribed Legal Procurement Certificate for agarwood derivatives — the document an exporter applies for together with a CITES export permit from the CITES Management Authority.",
    source: "Prescribed form — Assam WBI (Promotion and Development) Rules 2022 gazette",
    available: true,
    downloadPath: "resources/cites-form-xxv-lpc.pdf",
  },
];
