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
  fileType: "PDF" | "DOCX" | "XLSX" | "PPTX" | "ZIP";
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
    description:
      "AATMA's own media-facing material — press notes, the signed originals, and correspondence with the Government of Assam.",
  },
  {
    id: "policy-documents",
    label: "Policy Documents",
    description:
      "The Government of Assam gazette notifications that govern the agarwood trade, reproduced in full.",
  },
  {
    id: "research-papers",
    label: "Research Papers",
    description:
      "AATMA's reference material on the agarwood trade and its published seminar proceedings.",
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
    id: "press-note-signed-2023",
    title: "AATMA Press Note — Signed Copy (Hojai, 14 January 2023)",
    category: "press-notes",
    docType: "press",
    date: "2023-01-14",
    fileType: "PDF",
    fileSize: "850 KB",
    pageCount: 1,
    tags: ["press-note", "signed", "2023"],
    description:
      "Scanned original of the 14 January 2023 press note, signed by AATMA's President and General Secretary.",
    source: "AATMA press note (signed scan), 14 January 2023",
    available: true,
    downloadPath: "resources/press-note-signed-2023-01-14.pdf",
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
      "The Assam Gazette (Extraordinary) notification No. 20, eCF No. 237152, dated 12 January 2023 — the rules that replaced the 2000 framework, classed agarwood units as secondary wood-based industries and made the regime fully CITES compliant. Includes the prescribed forms.",
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
      "The gazette notification governing agar trees grown on non-forest land — plantation registration, felling and transit permits — notified alongside the wood-based industries rules.",
    source: "Assam Gazette (Extraordinary)",
    available: true,
    downloadPath: "resources/tof-rules-2022-gazette.pdf",
  },

  // ── Research Papers ────────────────────────────────────────────────────────
  {
    id: "research-history-of-agar",
    title: "A Brief History of Agar & the Agar Trade",
    category: "research-papers",
    docType: "research",
    fileType: "PDF",
    fileSize: "91 KB",
    pageCount: 4,
    tags: ["history", "trade", "reference"],
    description:
      "AATMA's account of the agarwood trade — from the sanchi-paat era and the Hojai distillation trade through the 2000 rules and the campaign that led to the 2022 reforms.",
    source: "AATMA reference note (client document, undated)",
    available: true,
    downloadPath: "resources/brief-history-of-agar.pdf",
  },
  {
    id: "research-seminar-abstracts-2000",
    title: "Abstracts of Papers — National Seminar on Agar (Aquilaria spp.) Plantation",
    category: "research-papers",
    docType: "research",
    date: "2000-11-22",
    fileType: "PDF",
    fileSize: "840 KB",
    pageCount: 15,
    tags: ["seminar", "2000", "abstracts", "plantation"],
    description:
      "Collected abstracts of papers presented at the national seminar on the scope and dimension of agar plantation in the North East, organised by AATMA at the Assam Administrative Staff College, Guwahati.",
    source: "AATMA seminar publication, 22–23 November 2000",
    available: true,
    downloadPath: "resources/seminar-abstracts-2000.pdf",
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
