// ─── Resource Center Data ────────────────────────────────────────────────────
// Central data source for the Resource Center / Downloads page.
// Each document carries a metadata schema (title, category, date, fileType,
// tags) to support future tagging, search, and filtering.

export type ResourceCategoryId =
  | "press-notes"
  | "policy-documents"
  | "research-papers"
  | "registration-forms"
  | "cites-documentation";

export interface ResourceDocument {
  id: string;
  title: string;
  category: ResourceCategoryId;
  date: string; // ISO date string
  fileType: "PDF" | "DOCX" | "XLSX" | "PPTX" | "ZIP";
  fileSize: string;
  tags: string[];
  description: string;
  /** False when the file has not been produced yet — renders a "not yet published" state. */
  available?: boolean;
  downloadPath?: string;
}

export interface ResourceCategory {
  id: ResourceCategoryId;
  label: string;
  description: string;
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "press-notes",
    label: "Press Notes",
    description:
      "Official press releases, media statements, and announcements from AATMA — covering policy milestones, events, and organisational updates.",
  },
  {
    id: "policy-documents",
    label: "Policy Documents",
    description:
      "Government policies, regulatory frameworks, cabinet decisions, and official guidelines governing the agarwood trade in Assam and India.",
  },
  {
    id: "research-papers",
    label: "Research Papers",
    description:
      "Academic studies, empirical research, and knowledge publications from AATMA's research wing and partner institutions.",
  },
  {
    id: "registration-forms",
    label: "Registration Forms",
    description:
      "Official forms for grower registration, nursery licensing, trade permits, and other regulatory compliance requirements.",
  },
  {
    id: "cites-documentation",
    label: "CITES Documentation",
    description:
      "CITES and international trade compliance material for agarwood.",
  },
];

// ─── Documents ───────────────────────────────────────────────────────────────

export const RESOURCE_DOCUMENTS: ResourceDocument[] = [
  // Press Notes
  {
    id: "press-note-wbi-2023",
    title: "AATMA Press Note — WBI (Promotion and Development) Rules 2022",
    category: "press-notes",
    date: "2023-01-14",
    fileType: "DOCX",
    fileSize: "14 KB",
    tags: ["press-note", "wbi-rules", "2023"],
    description:
      "AATMA's press note on the notification of the Assam Wood Based Industries (Promotion and Development) Rules 2022, issued at the Hojai head office press meet.",
    available: false,
  },
  {
    id: "letter-to-hcm-2023",
    title: "Letter to the Hon'ble Chief Minister — Gratitude for the Revival of the Agarwood Trade",
    category: "press-notes",
    date: "2023-01-14",
    fileType: "DOCX",
    fileSize: "14 KB",
    tags: ["letter", "chief-minister", "2023"],
    description:
      "AATMA's letter to the Chief Minister thanking the State government for repealing the WBI Rules 2000 and notifying the 2022 framework.",
    available: false,
  },
  {
    id: "press-meet-record-2023",
    title: "Press Meet Record — AATMA Head Office, Hojai",
    category: "press-notes",
    date: "2023-01-14",
    fileType: "PDF",
    fileSize: "850 KB",
    tags: ["press-meet", "hojai", "2023"],
    description:
      "Scanned record of the 14 January 2023 press conference held at the AATMA head office in Hojai.",
    available: false,
  },

  // Policy Documents
  {
    id: "policy-wbi-rules-2022",
    title: "Assam Wood Based Industries (Promotion and Development) Rules, 2022",
    category: "policy-documents",
    date: "2023-01-12",
    fileType: "PDF",
    fileSize: "11 KB",
    tags: ["rules", "2022", "gazette", "regulatory"],
    description:
      "The gazette notification (No. 20, eCF No. 237152, dated 12 January 2023) notifying the 2022 rules that replace the restrictive 2000 framework.",
    available: true,
    downloadPath: "/policy-documents/aatma-policy-documents.pdf",
  },

  // Research Papers
  {
    id: "research-agar-trade-note",
    title: "A Brief Note on the Agar Trade",
    category: "research-papers",
    date: "2023-01-01",
    fileType: "DOCX",
    fileSize: "21 KB",
    tags: ["trade", "reference"],
    description:
      "AATMA's reference note on the agarwood trade, supplied as background material for the website.",
    available: false,
  },
  {
    id: "research-history-of-agar",
    title: "A Brief History of Agar",
    category: "research-papers",
    date: "2023-01-01",
    fileType: "PDF",
    fileSize: "91 KB",
    tags: ["history", "reference"],
    description:
      "AATMA's historical account of the agarwood trade, the source for the site's history section.",
    available: false,
  },
];
