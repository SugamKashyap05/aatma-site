import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ScrollText,
  Building2,
  User,
  Globe,
  FileText,
  CreditCard,
  Search,
  ClipboardCheck,
  Award,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  FileCheck,
  AlertTriangle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WalkthroughStep {
  stepNumber: number;
  title: string;
  description: string;
  actionItems: string[];
  requiredDocuments: string[];
  responsibleAuthority: string;
  timeline: string;
  icon: React.ReactNode;
  decisionPoint?: {
    condition: string;
    approvedPath: string;
    rejectedPath: string;
  };
  conditional?: boolean;
  source: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const WALKTHROUGH_STEPS: WalkthroughStep[] = [
  {
    stepNumber: 1,
    title: "Determine Applicable Rule Set",
    description:
      "Identify which regulatory framework applies to your operation. The 2022 rules introduced two parallel regimes.",
    actionItems: [
      "Assess whether your operation is a processing unit (agar oil extraction, wood processing) or a plantation (growing agar trees on non-forest land)",
      "Processing units → Assam Wood Based Industries (Promotion and Development) Rules 2022",
      "Plantations → Assam Trees Outside Forest (Sustainable Management) Rules 2022",
      "Both rule sets operate on a common end-to-end online platform",
    ],
    requiredDocuments: [
      "Proof of business/operation type",
      "Land ownership or lease documents (for plantations)",
    ],
    responsibleAuthority: "Applicant (self-assessment)",
    timeline: "Before starting the application process",
    icon: <ScrollText className="w-5 h-5" strokeWidth={1.5} />,
    source: "Doc 2",
  },
  {
    stepNumber: 2,
    title: "Unit Classification",
    description:
      "Processing units are classified by aggregate capacity into four categories. This determines the regulatory tier applicable to your unit.",
    actionItems: [
      "Determine your unit's aggregate capacity",
      "Classify as Micro, Small, Medium, or Large unit",
      "This categorization provides necessary impetus for small traders to conduct trade in an affordable manner",
    ],
    requiredDocuments: [
      "Unit capacity details (machinery, infrastructure)",
      "Production capacity declaration",
    ],
    responsibleAuthority: "Applicant (self-declaration)",
    timeline: "Before registration application",
    icon: <Building2 className="w-5 h-5" strokeWidth={1.5} />,
    source: "Doc 2",
  },
  {
    stepNumber: 3,
    title: "Identify Registration Committee",
    description:
      "Registration is handled by Registration Committees at the level of the Conservator of Forests concerned. These committees provide local accessibility for applicants.",
    actionItems: [
      "Identify the Conservator of Forests office relevant to your district",
      "Locate the Registration Committee under that office",
      "Note: Predominant industry locations include Hojai, Golaghat, and Sibasagar",
    ],
    requiredDocuments: [],
    responsibleAuthority: "Conservator of Forests (concerned)",
    timeline: "Before submitting application",
    icon: <User className="w-5 h-5" strokeWidth={1.5} />,
    source: "Doc 2",
  },
  {
    stepNumber: 4,
    title: "Online Platform Registration",
    description:
      "Both rule sets operate on a complete and interactive end-to-end online platform for traders and planters. The platform provides complete transparency and timely permissions by reducing human interface.",
    actionItems: [
      "Access the online platform (URL not specified in source documents)",
      "Create an account / register as a trader or planter",
      "Complete the online application form",
      "Upload required documents",
    ],
    requiredDocuments: [
      "Identity proof (Aadhaar / PAN)",
      "Business registration documents",
      "Address proof of unit/plantation",
    ],
    responsibleAuthority: "Online platform (Assam Forest Department)",
    timeline: "Initial setup: 1–2 days",
    icon: <Globe className="w-5 h-5" strokeWidth={1.5} />,
    source: "Doc 2",
  },
  {
    stepNumber: 5,
    title: "Submit Application & Documents",
    description:
      "Submit your registration application along with all required documents through the online platform or to the Registration Committee.",
    actionItems: [
      "Complete the application form with accurate details",
      "Attach all required documents",
      "Verify all information before submission",
      "Units can function from present locations after obtaining registration — no relocation required",
    ],
    requiredDocuments: [
      "Completed application form",
      "Unit classification documents",
      "Land/lease documents (for plantations)",
      "Identity and address proof",
      "CITES compliance declaration (if applicable)",
    ],
    responsibleAuthority: "Registration Committee, Conservator of Forests",
    timeline: "Submission: 1 day; Processing: varies",
    icon: <FileText className="w-5 h-5" strokeWidth={1.5} />,
    source: "Doc 2",
  },
  {
    stepNumber: 6,
    title: "Fee Payment",
    description:
      "Pay the applicable registration fees as prescribed under the 2022 rules. Fee amounts are not specified in the source documents.",
    actionItems: [
      "Check the applicable fee schedule on the online platform or with the Registration Committee",
      "Pay fees through the prescribed mode",
      "Retain payment receipts for records",
    ],
    requiredDocuments: ["Payment receipt / transaction record"],
    responsibleAuthority: "Registration Committee / Online platform",
    timeline: "At time of application or as notified",
    icon: <CreditCard className="w-5 h-5" strokeWidth={1.5} />,
    source: "Not specified in source documents",
  },
  {
    stepNumber: 7,
    title: "Verification & Inspection",
    description:
      "The Registration Committee verifies the application and may conduct physical inspection of the unit or plantation.",
    actionItems: [
      "Cooperate with the Registration Committee during verification",
      "Provide access to unit/plantation for physical inspection",
      "Address any queries or deficiencies raised by the committee",
    ],
    requiredDocuments: [
      "Original documents for verification",
      "Access to premises for inspection",
    ],
    responsibleAuthority: "Registration Committee, Conservator of Forests",
    timeline: "Varies (not specified in source documents)",
    icon: <Search className="w-5 h-5" strokeWidth={1.5} />,
    source: "Implied from Doc 2",
  },
  {
    stepNumber: 8,
    title: "Decision: Approval or Rejection",
    description:
      "The Registration Committee reviews the application and makes a decision. This is a critical decision point in the process.",
    actionItems: [
      "If approved: Proceed to certificate issuance",
      "If rejected: Address the deficiencies identified and reapply",
    ],
    requiredDocuments: [],
    responsibleAuthority: "Registration Committee, Conservator of Forests",
    timeline: "Varies (not specified in source documents)",
    icon: <ClipboardCheck className="w-5 h-5" strokeWidth={1.5} />,
    decisionPoint: {
      condition: "Application reviewed by Registration Committee",
      approvedPath:
        "Registration certificate issued — valid for 5 years. Unit can function from present location.",
      rejectedPath:
        "Deficiencies communicated. Applicant may address issues and reapply.",
    },
    source: "Doc 2",
  },
  {
    stepNumber: 9,
    title: "Certificate Issuance",
    description:
      "Upon approval, the registration certificate is issued. Registration is valid for five (5) years.",
    actionItems: [
      "Receive registration certificate (download from platform or collect from office)",
      "Verify all details on the certificate",
      "Display certificate at unit premises as required",
    ],
    requiredDocuments: ["Registration certificate"],
    responsibleAuthority: "Registration Committee, Conservator of Forests",
    timeline: "After approval decision",
    icon: <Award className="w-5 h-5" strokeWidth={1.5} />,
    source: "Doc 2",
  },
  {
    stepNumber: 10,
    title: "CITES Compliance (Ongoing)",
    description:
      "The 2022 rules are fully CITES compliant. Compliance enables import, re-export, and export of agar wood products. This is an ongoing obligation.",
    actionItems: [
      "Maintain CITES compliance for all import/re-export/export activities",
      "The rules paved way for revival of Agar Wood Industries and import and re-export as well as export of domestic agar wood products",
      "Prior to 2022, CITES verification by DFO was a mandatory step that caused trade disruptions when denied (as in Oct 2005)",
    ],
    requiredDocuments: [
      "CITES permits (for import/re-export/export)",
      "Compliance records",
    ],
    responsibleAuthority: "Registration Committee / Forest Department",
    timeline: "Ongoing throughout registration validity",
    icon: <Globe className="w-5 h-5" strokeWidth={1.5} />,
    source: "Doc 1, Doc 2",
  },
  {
    stepNumber: 11,
    title: "Renewal",
    description:
      "Registration is valid for five (5) years. Renewal must be obtained before expiry through the same process.",
    actionItems: [
      "Initiate renewal process before registration expiry",
      "Apply through the same Registration Committees at Conservator of Forests level",
      "Renewal process would be through the same online platform",
    ],
    requiredDocuments: [
      "Existing registration certificate",
      "Updated documents (if any changes)",
      "Renewal application form",
    ],
    responsibleAuthority: "Registration Committee, Conservator of Forests",
    timeline: "Before expiry of 5-year validity period",
    icon: <RefreshCw className="w-5 h-5" strokeWidth={1.5} />,
    source: "Doc 2",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * RegistrationProcessWalkthrough — step-by-step guide for registering
 * under the Assam Wood Based Industries Rules 2022 and Trees Outside
 * Forest Rules 2022. Covers the full end-to-end journey from
 * classification to renewal, with decision points and conditional steps.
 */
export function RegistrationProcessWalkthrough() {
  return (
    <section id="registration" className="relative pb-20 md:pb-28 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <Reveal variant="fade" delay={0}>
          <div className="mb-12 md:mb-16">
            <span className="glass-surface-subtle inline-flex items-center gap-2 text-gold-light text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-4">
              <ClipboardCheck size={14} />
              Step-by-Step Guide
            </span>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-3">
              Registration Process{" "}
              <span className="text-gold-light">Walkthrough</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl">
              The complete end-to-end journey for registering your agar wood
              business or plantation under the 2022 rules — from initial
              classification to certificate renewal.
            </p>
          </div>
        </Reveal>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-white/20 to-transparent hidden sm:block"
            aria-hidden="true"
          />

          <div className="space-y-8 md:space-y-10">
            {WALKTHROUGH_STEPS.map((step, index) => (
              <Reveal
                key={step.stepNumber}
                variant="up"
                delay={index * 50}
              >
                <div className="relative flex gap-4 md:gap-6">
                  {/* Step number circle */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className={cn(
                        "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-colors",
                        step.decisionPoint
                          ? "bg-gold/20 border-gold text-gold-light"
                          : "bg-green-deep border-gold/40 text-gold-light",
                      )}
                    >
                      <span className="font-display font-bold text-lg md:text-xl">
                        {step.stepNumber}
                      </span>
                    </div>
                  </div>

                  {/* Step content card */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        "bg-white/[0.06] backdrop-blur-sm border rounded-sm p-5 md:p-6 transition-colors",
                        step.decisionPoint
                          ? "border-gold/40"
                          : "border-white/15",
                      )}
                    >
                      {/* Header row */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-gold-light mt-0.5 shrink-0">
                          {step.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-display font-bold text-lg md:text-xl text-white leading-snug">
                            {step.title}
                          </h3>
                          <p className="text-cream/75 text-sm mt-1 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Action items */}
                      <div className="mt-4 space-y-2">
                        <p className="text-gold-light text-xs font-semibold tracking-wider uppercase">
                          Action Items
                        </p>
                        <ul className="space-y-1.5">
                          {step.actionItems.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-white/70 text-sm leading-relaxed"
                            >
                              <span className="text-gold-light mt-1.5 shrink-0">
                                ▸
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Required documents */}
                      {step.requiredDocuments.length > 0 && (
                        <div className="mt-4">
                          <p className="text-gold-light text-xs font-semibold tracking-wider uppercase mb-2 flex items-center gap-1.5">
                            <FileCheck className="w-3.5 h-3.5" />
                            Required Documents
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {step.requiredDocuments.map((doc, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-white/70 border-white/20 text-xs font-normal"
                              >
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Metadata row */}
                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream/75">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gold-light" />
                          {step.responsibleAuthority}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gold-light" />
                          {step.timeline}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-gold-light" />
                          Source: {step.source}
                        </span>
                      </div>

                      {/* Decision point */}
                      {step.decisionPoint && (
                        <div className="mt-5 border-t border-gold/20 pt-4">
                          <p className="text-gold-light text-xs font-semibold tracking-wider uppercase mb-3 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Decision Point
                          </p>
                          <p className="text-white/70 text-sm mb-3">
                            {step.decisionPoint.condition}
                          </p>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {/* Approved path */}
                            <div className="bg-green-900/30 border border-green-500/30 rounded-sm p-3">
                              <div className="flex items-center gap-2 mb-1.5">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-green-400 text-sm font-semibold">
                                  If Approved
                                </span>
                              </div>
                              <p className="text-cream/75 text-xs leading-relaxed">
                                {step.decisionPoint.approvedPath}
                              </p>
                            </div>
                            {/* Rejected path */}
                            <div className="bg-red-900/20 border border-red-500/30 rounded-sm p-3">
                              <div className="flex items-center gap-2 mb-1.5">
                                <XCircle className="w-4 h-4 text-red-400" />
                                <span className="text-red-400 text-sm font-semibold">
                                  If Rejected
                                </span>
                              </div>
                              <p className="text-cream/75 text-xs leading-relaxed">
                                {step.decisionPoint.rejectedPath}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistrationProcessWalkthrough;
