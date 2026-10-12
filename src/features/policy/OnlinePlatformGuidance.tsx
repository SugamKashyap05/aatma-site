import { Reveal } from "@/components/ui/reveal";
import {
  Globe,
  UserPlus,
  LayoutDashboard,
  FileText,
  Upload,
  Search,
  CreditCard,
  Award,
  ShieldCheck,
  Wrench,
  Phone,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";

// ─── Provenance ───────────────────────────────────────────────────────────────

/**
 * Every claim in this section is tagged with where it came from, and the tag is
 * rendered visibly rather than kept as an internal field.
 *
 * The distinction matters: "Inferred from Doc 2" means a human read AATMA's
 * source document and reconstructed a plausible procedure from it. It is NOT a
 * transcription of the document, and it is not an official publication of the
 * Assam Forest Department. Presenting inference as documented fact is the exact
 * failure this tagging exists to prevent.
 */
const PROVENANCE_STYLES: Record<string, string> = {
  // Reconstructed from AATMA's documents — amber, because it needs scrutiny.
  "Inferred from Doc 2":
    "bg-amber-400/10 text-amber-300/90 border-amber-400/25",
  "Reconstructed — not in source docs":
    "bg-amber-400/10 text-amber-300/90 border-amber-400/25",
  // Not documented anywhere — neutral, because it claims nothing.
  "General Guidance":
    "bg-white/10 text-white/70 border-white/20",
  "Gap noted":
    "bg-white/10 text-white/70 border-white/20",
  // Transcribed from a named source — green, because it is verifiable.
  "Source: Doc 2":
    "bg-emerald-400/10 text-emerald-300/90 border-emerald-400/25",
};

function ProvenanceTag({ source }: { source: string }) {
  const style =
    PROVENANCE_STYLES[source] ?? "bg-white/10 text-white/70 border-white/20";
  return (
    <span
      className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded border ${style}`}
    >
      {source}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLATFORM_OVERVIEW = {
  what: "Both the Assam Wood Based Industries (Promotion and Development) Rules 2022 and the Assam Trees Outside Forest (Sustainable Management) Rules 2022 operate on a single, complete, and interactive end-to-end online platform for traders and planters.",
  objectives: [
    "Complete transparency — all application statuses, approval stages, and decisions are visible to applicants in real time",
    "Timely permissions — the platform is designed to reduce delays in granting registrations, approvals, and permits",
    "Reduced human interface — minimizes in-person visits to forest department offices, reducing opportunities for rent-seeking and bureaucratic delays",
  ],
  users: [
    { type: "Agar Wood Based Industry units (Micro, Small, Medium, Large)", purpose: "Registration, renewal, compliance reporting", rule: "Wood Based Industries Rules 2022" },
    { type: "Agar tree plantation owners / farmers", purpose: "Plantation registration, felling permits, transportation permits", rule: "Trees Outside Forest Rules 2022" },
    { type: "Traders / intermediaries", purpose: "Permits for purchase, sale, and movement of agar wood", rule: "Both rules" },
    { type: "Forest Department officials", purpose: "Application review, approval, verification", rule: "Both rules" },
  ],
};

const WORKFLOWS = [
  { category: "Wood Based Industries Rules 2022", items: [
    { name: "Unit Registration", desc: "Register a new agar wood based industry unit (Micro/Small/Medium/Large) with the Registration Committee", source: "Inferred from Doc 2" },
    { name: "Registration Renewal", desc: "Renew an existing registration before its 5-year expiry", source: "Inferred from Doc 2" },
    { name: "Unit Category Change", desc: "Apply to change unit category (e.g., Small to Medium) if capacity changes", source: "General Guidance" },
    { name: "CITES Compliance Reporting", desc: "Submit periodic reports on import/re-export activities for CITES compliance", source: "General Guidance" },
    { name: "Certificate Download", desc: "Download registration certificates and compliance reports", source: "General Guidance" },
  ]},
  { category: "Trees Outside Forest Rules 2022", items: [
    { name: "Plantation Registration", desc: "Register an agar tree plantation on non-forest land", source: "Inferred from Doc 2" },
    { name: "Felling Permit", desc: "Apply for permission to fell agar trees from registered plantations", source: "Inferred from Doc 2" },
    { name: "Transportation Permit", desc: "Apply for permits to transport harvested agar wood to processing units", source: "Inferred from Doc 2" },
    { name: "Certificate Download", desc: "Download plantation registration certificates and permits", source: "General Guidance" },
  ]},
];

const DOCUMENT_CHECKLIST = {
  industry: [
    "Proof of identity of proprietor/partners/directors (Aadhaar/PAN/Passport)",
    "Proof of ownership/rental agreement of premises",
    "Unit location map/survey plan",
    "Installed capacity certificate (from chartered engineer)",
    "Trade license from local municipal body",
    "GST registration certificate",
    "Bank account details (cancelled cheque)",
    "Passport-size photographs of proprietor/partners",
  ],
  plantation: [
    "Proof of identity (Aadhaar)",
    "Land ownership records (patta/land deed)",
    "Plantation survey map with GPS coordinates",
    "Number and species of agar trees planted",
    "Year of plantation and planting details",
  ],
};

const TROUBLESHOOTING = [
  { category: "Login Issues", items: [
    { issue: "Invalid credentials", solution: "Check caps lock; use Forgot Password to reset" },
    { issue: "Account locked", solution: "Wait 30 minutes or contact platform helpdesk" },
    { issue: "OTP not received", solution: "Wait 2 minutes; check registered number; request OTP again" },
    { issue: "Session timed out", solution: "Log in again; save work before stepping away" },
  ]},
  { category: "Application Issues", items: [
    { issue: "Form validation error", solution: "Check all required fields; ensure correct formats" },
    { issue: "File upload failed", solution: "Ensure file is PDF/JPG/PNG and under size limit" },
    { issue: "Duplicate application", solution: "Track existing application; withdraw before re-submitting" },
    { issue: "Payment gateway timeout", solution: "Wait and retry; auto-refund if failed" },
  ]},
  { category: "Document Issues", items: [
    { issue: "Document rejected — illegible", solution: "Re-scan at 300 DPI or higher" },
    { issue: "Document rejected — wrong type", solution: "Upload correct document type" },
    { issue: "Document rejected — expired", solution: "Upload valid, current document" },
  ]},
];

const QUICK_GUIDES = [
  {
    title: "Registering a New Agar Wood Based Industry Unit",
    steps: [
      "Determine your unit category (Micro / Small / Medium / Large) based on aggregate capacity",
      "Create an account on the online platform",
      "Gather required documents (industry checklist)",
      "Fill the registration application form",
      "Upload documents",
      "Pay the registration fee",
      "Track application status",
      "On approval, download registration certificate. Valid for 5 years",
    ],
  },
  {
    title: "Registering a New Agar Tree Plantation",
    steps: [
      "Create an account on the online platform",
      "Gather required documents (plantation checklist)",
      "Fill the plantation registration application form",
      "Upload documents",
      "Pay the registration fee",
      "Track application status",
      "On approval, download plantation registration certificate",
    ],
  },
  {
    title: "Obtaining a Felling Permit",
    steps: [
      "Log in to the platform",
      "Select Felling Permit from available services",
      "Provide details: plantation registration number, trees to be felled, reason",
      "Upload any required documents",
      "Pay the permit fee",
      "Track application status",
      "On approval, download the felling permit",
    ],
  },
  {
    title: "Obtaining a Transportation Permit",
    steps: [
      "Log in to the platform",
      "Select Transportation Permit from available services",
      "Provide details: source, destination, quantity, vehicle details",
      "Upload supporting documents (felling permit, invoice)",
      "Pay the permit fee",
      "Track application status",
      "On approval, download the transportation permit",
    ],
  },
  {
    title: "Renewing an Expiring Registration",
    steps: [
      "Watch for renewal reminders (sent 90/60/30 days before expiry)",
      "Log in to the platform",
      "Select Renewal from available services",
      "Verify existing details and update if changed",
      "Upload any new/updated documents",
      "Pay the renewal fee",
      "Track application status",
      "On approval, download the renewed registration certificate",
    ],
  },
];

const GAPS = [
  "Platform URL",
  "Exact fee amounts",
  "Detailed document checklist",
  "Processing timelines",
  "Helpdesk contact details",
  "CITES Appendix/Schedule references",
  "Species-level CITES listing",
  "Penalty provisions",
  "Appeal process for rejected applications",
  "Platform technical specifications",
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * OnlinePlatformGuidance — comprehensive online platform guidance section
 * for the /policy page. Covers account creation, workflows, document upload,
 * status tracking, fee payment, certificates, troubleshooting, and quick guides.
 */
export function OnlinePlatformGuidance() {
  return (
    <section id="platform" className="relative pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <Reveal variant="fade" delay={0}>
          <div className="mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-1.5 rounded-sm mb-4">
              <Globe size={14} />
              Section 6
            </span>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-3">
              Online Platform <span className="text-gold">Guidance</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl">
              Guidance for using the end-to-end online platform — from account creation
              to certificate download. Every item is tagged with its provenance; see the
              notice below before relying on any procedure described here.
            </p>
          </div>
        </Reveal>

        {/* Provenance notice — this section reconstructs procedures, it does not
            reproduce an official publication. Say so before the reader acts on it. */}
        <Reveal variant="fade" delay={50}>
          <div
            role="note"
            className="mb-12 bg-amber-400/[0.07] border border-amber-400/30 rounded-lg p-5 flex items-start gap-4"
          >
            <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-amber-200 text-sm font-semibold">
                Reconstructed guidance — verify before relying on it
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                This section is compiled from AATMA&rsquo;s source documents and general
                regulatory practice. It is <strong className="text-white/90">not an official
                publication of the Assam Forest Department</strong>, and the platform&rsquo;s
                actual screens, field names, fees, and timelines may differ. Items marked{" "}
                <ProvenanceTag source="Inferred from Doc 2" /> were reconstructed from AATMA&rsquo;s
                correspondence rather than transcribed from it; items marked{" "}
                <ProvenanceTag source="General Guidance" /> reflect standard practice for
                comparable registration systems and are not documented for this platform at all.
                Confirm current procedures with the Forest Department before acting.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Platform overview */}
        <Reveal variant="fade" delay={100}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-gold" />
              Platform Overview
            </h3>
            <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {PLATFORM_OVERVIEW.what}{" "}
                <ProvenanceTag source="Source: Doc 2" />
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {PLATFORM_OVERVIEW.objectives.map((obj, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/10 rounded-sm p-3">
                    <p className="text-white/70 text-xs leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
              <h4 className="text-gold text-xs font-semibold tracking-wider uppercase mb-3">
                Who Uses the Platform
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-white/50 text-xs font-semibold">User Type</th>
                      <th className="py-2 pr-4 text-white/50 text-xs font-semibold">Purpose</th>
                      <th className="py-2 text-white/50 text-xs font-semibold">Applicable Rule</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PLATFORM_OVERVIEW.users.map((user, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-2 pr-4 text-white/70 text-xs">{user.type}</td>
                        <td className="py-2 pr-4 text-white/60 text-xs">{user.purpose}</td>
                        <td className="py-2 text-white/50 text-xs">{user.rule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Account creation */}
        <Reveal variant="fade" delay={150}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-gold" />
              Account Creation & Login
            </h3>
            <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
              <div className="space-y-4 text-sm text-white/70 leading-relaxed">
                <p>
                  <ProvenanceTag source="General Guidance" /> The platform requires
                  user account creation before submitting any application. Standard practice for
                  Indian government e-governance platforms:
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-white/60">
                  <li>Navigate to the platform URL (see Platform Overview above)</li>
                  <li>Click "New User Registration" or "Sign Up"</li>
                  <li>Provide: full name, mobile number, email, Aadhaar number, username, password</li>
                  <li>Verify mobile number via OTP</li>
                  <li>Verify email address via confirmation link</li>
                </ol>
                <p className="text-white/50 text-xs italic">
                  Platform URL not specified in source documents. Likely hosted on assamforest.in
                  or the Assam e-District portal.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Workflows */}
        <Reveal variant="fade" delay={200}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              Available Workflows
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {WORKFLOWS.map((group, gi) => (
                <div key={gi} className="bg-white/[0.04] border border-white/10 rounded-lg p-5">
                  <h4 className="font-display font-bold text-white text-sm mb-3">{group.category}</h4>
                  <ul className="space-y-3">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-white/80 text-sm font-medium">{item.name}</p>
                          <p className="text-white/50 text-xs">{item.desc}</p>
                          <div className="mt-1.5">
                            <ProvenanceTag source={item.source} />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Document checklist */}
        <Reveal variant="fade" delay={250}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-gold" />
              Document Checklist
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/[0.04] border border-white/10 rounded-lg p-5">
                <h4 className="font-display font-bold text-white text-sm mb-3">
                  Industry Unit Registration
                </h4>
                <ul className="space-y-2">
                  {DOCUMENT_CHECKLIST.industry.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/60 text-xs">
                      <span className="text-gold/60 mt-0.5 shrink-0">{i + 1}.</span>
                      {doc}
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <ProvenanceTag source="Reconstructed — not in source docs" />
                </div>
              </div>
              <div className="bg-white/[0.04] border border-white/10 rounded-lg p-5">
                <h4 className="font-display font-bold text-white text-sm mb-3">
                  Plantation Registration
                </h4>
                <ul className="space-y-2">
                  {DOCUMENT_CHECKLIST.plantation.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/60 text-xs">
                      <span className="text-gold/60 mt-0.5 shrink-0">{i + 1}.</span>
                      {doc}
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <ProvenanceTag source="Reconstructed — not in source docs" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Status tracking */}
        <Reveal variant="fade" delay={300}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-gold" />
              Tracking Application Status
            </h3>
            <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
              <p className="text-white/70 text-sm mb-4">
                The platform provides real-time status tracking. Application states include:
              </p>
              <div className="flex flex-wrap gap-2">
                {["Submitted", "Under Scrutiny", "Query Raised", "Approved", "Rejected"].map((status) => (
                  <span
                    key={status}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70"
                  >
                    {status}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-white/50 text-xs">
                Expected timelines: Initial scrutiny 7-15 working days; Committee review 15-30 working days; Total 30-45 working days.{" "}
                <ProvenanceTag source="General Guidance" />
              </p>
            </div>
          </div>
        </Reveal>

        {/* Fee payment */}
        <Reveal variant="fade" delay={350}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gold" />
              Fee Payment
            </h3>
            <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
              <p className="text-white/70 text-sm mb-3">
                Fee amounts are not specified in source documents.{" "}
                <ProvenanceTag source="Gap noted" />
              </p>
              <p className="text-white/60 text-sm mb-3">
                <ProvenanceTag source="General Guidance" /> Standard payment methods: Net Banking, Debit/Credit Card, UPI, NEFT/RTGS.
                Small and Micro units may be eligible for fee concessions.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Certificate download */}
        <Reveal variant="fade" delay={400}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              Certificate Download
            </h3>
            <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
              <p className="text-white/70 text-sm mb-3">
                <ProvenanceTag source="General Guidance" /> Approved certificates are available as PDF downloads with digital
                signature and QR code verification. Certificates can be verified by anyone on the
                platform's verification page.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Compliance reporting */}
        <Reveal variant="fade" delay={450}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold" />
              Compliance Reporting
            </h3>
            <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
              <p className="text-white/70 text-sm mb-3">
                <ProvenanceTag source="General Guidance" /> Registered units may be required to submit:
              </p>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gold/60 mt-1 shrink-0">▸</span>
                  Annual Return — production volume, raw material source, product sales
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold/60 mt-1 shrink-0">▸</span>
                  CITES Compliance Report — for units engaged in import/re-export
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold/60 mt-1 shrink-0">▸</span>
                  Change of Particulars Report — proprietorship, address, capacity changes
                </li>
              </ul>
              <p className="mt-4 text-white/50 text-xs">
                Renewal reminders sent 90/60/30 days before expiry. Registration valid for 5 years.{" "}
                <ProvenanceTag source="Source: Doc 2" />
              </p>
            </div>
          </div>
        </Reveal>

        {/* Troubleshooting */}
        <Reveal variant="fade" delay={500}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-gold" />
              Troubleshooting
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {TROUBLESHOOTING.map((group, gi) => (
                <div key={gi} className="bg-white/[0.04] border border-white/10 rounded-lg p-4">
                  <h4 className="font-display font-bold text-white text-xs mb-3">{group.category}</h4>
                  <ul className="space-y-2">
                    {group.items.map((item, i) => (
                      <li key={i}>
                        <p className="text-white/70 text-xs font-medium">{item.issue}</p>
                        <p className="text-white/50 text-xs">{item.solution}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Quick reference guides */}
        <Reveal variant="fade" delay={550}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold" />
              Quick Reference Guides
            </h3>
            <div className="space-y-4">
              {QUICK_GUIDES.map((guide, gi) => (
                <div key={gi} className="bg-white/[0.04] border border-white/10 rounded-lg p-5">
                  <h4 className="font-display font-bold text-white text-sm mb-3">
                    {guide.title}
                  </h4>
                  <ol className="space-y-1.5">
                    {guide.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-white/60 text-xs">
                        <span className="text-gold/60 font-semibold shrink-0">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Help resources */}
        <Reveal variant="fade" delay={600}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-gold" />
              Help Resources & Contacts
            </h3>
            <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
              <div className="space-y-3 text-sm text-white/70">
                <p>
                  <strong className="text-white/90">Assam Forest Department</strong> — Aranya Bhawan,
                  Panjabari, Guwahati, Assam 781037. Website: assamforest.in
                </p>
                <p>
                  <strong className="text-white/90">Registration Committee</strong> — At the level of
                  Conservator of Forests concerned{" "}
                  <ProvenanceTag source="Source: Doc 2" />
                </p>
                <p>
                  <strong className="text-white/90">AATMA</strong> — Agar Wood Traders and Manufacturers
                  Association can assist with understanding the 2022 rules and navigating registration
                </p>
                <p className="text-white/50 text-xs italic">
                  Escalation: Platform helpdesk → Conservator of Forests → PCCF Assam → Forest Minister's office → AATMA
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Gaps */}
        <Reveal variant="fade" delay={650}>
          <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-gold" />
              Information Gaps
            </h3>
            <p className="text-white/60 text-sm mb-3">
              The following information is not available in the source documents:
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {GAPS.map((gap, i) => (
                <div key={i} className="flex items-start gap-2 text-white/50 text-xs">
                  <Info className="w-3 h-3 mt-0.5 shrink-0 text-white/30" />
                  {gap}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Cross-reference */}
        <Reveal variant="fade" delay={700}>
          <div className="mt-8 bg-gold/5 border border-gold/20 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-gold shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white/80 text-sm leading-relaxed">
                <strong className="text-gold">Related:</strong> The online platform is the primary
                interface for registration. See the{" "}
                <a href="#registration" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">
                  Registration Walkthrough
                </a>{" "}
                for the step-by-step process, and the{" "}
                <a href="#cites" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">
                  CITES Compliance
                </a>{" "}
                section for how CITES reporting integrates with the platform.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default OnlinePlatformGuidance;
