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
      "CITES permits, export quotas, Review of Significant Trade documents, and international trade compliance materials.",
  },
];

// ─── Documents ───────────────────────────────────────────────────────────────

export const RESOURCE_DOCUMENTS: ResourceDocument[] = [
  // Press Notes
  {
    id: "press-2024-annual",
    title: "AATMA Annual Press Statement 2024",
    category: "press-notes",
    date: "2024-12-15",
    fileType: "PDF",
    fileSize: "1.2 MB",
    tags: ["annual", "statement", "2024"],
    description:
      "Annual summary of AATMA's activities, achievements, and outlook for the agarwood sector in 2024.",
    available: false,
  },
  {
    id: "press-export-cell",
    title: "Export Promotion Cell Announcement",
    category: "press-notes",
    date: "2026-05-10",
    fileType: "PDF",
    fileSize: "890 KB",
    tags: ["export", "commerce", "2026"],
    description:
      "Press note on the Ministry of Commerce constituting the Agarwood Export Promotion Cell in May 2026.",
    available: false,
  },
  {
    id: "press-policy-2020",
    title: "Assam Agarwood Promotion Policy Launch",
    category: "press-notes",
    date: "2020-09-01",
    fileType: "PDF",
    fileSize: "1.5 MB",
    tags: ["policy", "launch", "2020"],
    description:
      "Official press release marking the launch of the Assam Agarwood Promotion Policy 2020.",
    available: false,
  },

  // Policy Documents
  {
    id: "policy-2020-full",
    title: "Assam Agarwood Promotion Policy 2020 — Full Text",
    category: "policy-documents",
    date: "2020-09-01",
    fileType: "PDF",
    fileSize: "3.8 MB",
    tags: ["policy", "2020", "assam", "full-text"],
    description:
      "Complete text of the landmark Assam Agarwood Promotion Policy 2020, covering plantation, harvesting, processing, transit, and sale provisions.",
    available: false,
  },
  {
    id: "policy-cabinet-2019",
    title: "Assam Cabinet Decision 2019 — Agar & Chandan",
    category: "policy-documents",
    date: "2019-07-15",
    fileType: "PDF",
    fileSize: "2.1 MB",
    tags: ["cabinet", "2019", "decision"],
    description:
      "Cabinet decision approving growing and cutting of Agar and Chandan trees on non-forest lands up to 35 bighas without permission.",
    available: false,
  },
  {
    id: "policy-rules-2022",
    title: "Assam Wood Based Industries Rules 2022",
    category: "policy-documents",
    date: "2022-03-10",
    fileType: "PDF",
    fileSize: "4.2 MB",
    tags: ["rules", "2022", "regulatory"],
    description:
      "The 2022 rules replacing the 2000 framework — shifting from restrictive control to promotive development of the agarwood sector.",
    available: false,
  },

  // Research Papers
  {
    id: "research-trade-assam",
    title: "The Agarwood Trade of Assam — Comprehensive Study",
    category: "research-papers",
    date: "2023-06-20",
    fileType: "PDF",
    fileSize: "5.6 MB",
    tags: ["trade", "assam", "comprehensive"],
    description:
      "A comprehensive digital publication covering resin formation, cultivation practices, distillation craft, and the global market for Assam's agarwood.",
    available: false,
  },
  {
    id: "research-seminar-2000",
    title: "Seminar on Agar Plantation in the Northeast — Proceedings",
    category: "research-papers",
    date: "2000-11-05",
    fileType: "PDF",
    fileSize: "8.4 MB",
    tags: ["seminar", "northeast", "proceedings"],
    description:
      "Proceedings of the 2000 Guwahati seminar co-organised by AATMA — an early contribution to building a knowledge base for agar cultivation.",
    available: false,
  },
  {
    id: "research-economics",
    title: "Cultivation & Economic Studies — Cost-Benefit Analysis",
    category: "research-papers",
    date: "2022-08-15",
    fileType: "PDF",
    fileSize: "2.9 MB",
    tags: ["economics", "cultivation", "cost-benefit"],
    description:
      "Empirical studies finding that every ₹100 invested in agar cultivation can yield ₹623 in net benefit, with yield optimization and infection technique analysis.",
    available: false,
  },

  // Registration Forms
  {
    id: "form-grower",
    title: "Grower Registration Form",
    category: "registration-forms",
    date: "2024-01-10",
    fileType: "PDF",
    fileSize: "450 KB",
    tags: ["grower", "registration", "form"],
    description:
      "Official registration form for agarwood growers under the Assam Agarwood Promotion Policy 2020.",
    available: false,
  },
  {
    id: "form-nursery",
    title: "Nursery Licensing Application",
    category: "registration-forms",
    date: "2024-01-10",
    fileType: "PDF",
    fileSize: "520 KB",
    tags: ["nursery", "licensing", "application"],
    description:
      "Application form for obtaining a nursery license for agarwood sapling production and distribution.",
    available: false,
  },
  {
    id: "form-trade-permit",
    title: "Trade Permit Application",
    category: "registration-forms",
    date: "2024-02-01",
    fileType: "PDF",
    fileSize: "480 KB",
    tags: ["trade", "permit", "application"],
    description:
      "Application form for trade permits covering transit, processing, and sale of agarwood products.",
    available: false,
  },

  // CITES Documentation
  {
    id: "cites-quota-2024",
    title: "CITES Export Quota 2024–2027 — India",
    category: "cites-documentation",
    date: "2024-01-01",
    fileType: "PDF",
    fileSize: "1.8 MB",
    tags: ["cites", "quota", "export", "2024-2027"],
    description:
      "Formal export quota: 1,51,080 kg/year of chips & powder and 7,050 kg/year of oil for 2024–2027. Assam's share: 1,19,400 kg chips + 5,560 kg oil.",
    available: false,
  },
  {
    id: "cites-rst-2024",
    title: "Review of Significant Trade — 2024 Outcome",
    category: "cites-documentation",
    date: "2024-06-30",
    fileType: "PDF",
    fileSize: "2.3 MB",
    tags: ["cites", "rst", "review", "2024"],
    description:
      "India's successful 2024 Review of Significant Trade outcome for Aquilaria malaccensis, securing the formal export quota.",
    available: false,
  },
  {
    id: "cites-permit-template",
    title: "CITES Permit Application Template",
    category: "cites-documentation",
    date: "2024-01-01",
    fileType: "PDF",
    fileSize: "380 KB",
    tags: ["cites", "permit", "template"],
    description:
      "Standard template for CITES permit applications for international trade in agarwood products.",
    available: false,
  },
];
