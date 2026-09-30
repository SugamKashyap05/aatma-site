import { Link } from "react-router-dom";
import { AATMA } from "@/data/content";
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";
import { cn, type ClassValue } from "@/lib/utils";
import { useRef, useState } from "react";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import { Reveal, Stagger } from "@/components/ui/reveal";

interface AboutProps {
  className?: ClassValue;
  deviceTier?: "mobile" | "tablet" | "desktop";
}

const SCRIPT: Record<string, string> = {
  en: `
    For fifty years, AATMA has stood as the voice of Assam's agarwood trade — linking the traders, distillers, cultivators, and manufacturers whose daily work sustains one of India's most valuable forest-derived industries.

    Born in Hojai, the heartland of agarwood in the Northeast, the association has carried its members through every phase of the sector's difficult history: the long years of informal, often illegal trade; the turning point of the 2000 Guwahati seminar that brought external knowledge and technical depth for the first time; the patient advocacy that culminated in the 2019 Cabinet decision; and the policy landmark of the 2020 Assam Agarwood Promotion Policy that finally legalised the entire trade chain on non-forest land.

    Today, AATMA operates at the centre of a sector that is opening to legitimate global commerce. Agarwood — Aquilaria malaccensis, a species now critically endangered in the wild — has been cultivated, distilled, and traded in Assam for generations. The oil, worth tens of thousands of dollars per kilogram, and the resinous chips, prized across perfumery and traditional medicine, are the fruit of a craft that sits at the intersection of agriculture, forestry, and heritage.

    AATMA's ongoing work spans member representation, policy engagement, knowledge sharing, and the promotion of a legal, sustainable agarwood economy that secures the livelihoods of the families who depend on it.
  `.trim(),
  as: `
    ইউনিয়নৰ দশকসমূহ ধৰি আটমা অসমৰ আগৰ বাণিজ্যৰ স্বৰ হিচাপে থাকি আহিছে — ব্যৱসায়ী, স্বচালক, চাষী আৰু উৎপাদকসকলৰ প্ৰতিবেচন কৰি যিয়ে ভাৰতৰ আটাইতকৈ মূল্যবান বানৰপদাৰ্থ শিল্পক বাঁচাই ৰাখে।

    নেপা উত্তৰ-পূৰ্বাঞ্চলৰ আগৰকেন্দ্ৰ হৈছে হজাই, সংস্থাটোৱে শিল্পৰ কঠিন ইতিহাসৰ প্ৰতিটো ধাপত সদস্যবৃন্দক নিয়াই যাই: দীৰ্ঘ বছৰ বৈধ নহোৱা, প্ৰায়ে অবৈধ বাণিজ্য; ২০০০ চনৰ গুৱাহাটী সেমিনাৰৰ পথপ্ৰদৰ্শক কাল য'ত প্ৰথমবাৰে বাহিৰৰ জ্ঞান আৰু প্ৰযুক্তিগত গভীৰতা আহে; ২০১৯ চনৰ মন্ত্ৰীপৰিষদৰ সিদ্ধান্তলৈ প্ৰায় ২০ বছৰ লড়াই; আৰু ২০২০ চনৰ অসম আগৰবোৰ বিকাশ নীতিয়ে অন্ততঃ বনৰ বাহিৰৰ ভূমিত বাণিজ্যৰ চেইনটো নিয়মবদ্ধ কৰি দি।

    আজি, আটমা শিল্পটোৰ বৈধ বিশ্ববাণিজ্যলৈ মুকলি হোৱাৰ কেন্দ্ৰত কাম কৰে। আগৰ — Aquaillaria malaccensis, বৰ্তমান বনত গভীৰভাৱে বিপন্ন প্ৰজাতি — অসমত প্ৰজন্মে প্ৰজন্মে চাষ, জ্বলন আৰু বাণিজ্য কৰি আহিছে। তেল, কিলোগ্ৰামত হাজাৰা হাজাৰ ডলাৰ মূল্যৰ, আৰু রেজিনযুক্ত টুকুৰীসমূহ, সুগন্ধি আৰু প্ৰথাগত ঔষধৰ পাহৰত মূৰীয়া, কৃষি, বনবিজ্ঞান আৰু ঐতিহ্যৰ ছেদত অৱস্থিত এক শিল্পৰ ফল।

    আটমাৰ চলি থকা কাম সমূহত ম সদস্য প্ৰতিনিধিত্ব, নীতি যোগাযোগ, জ্ঞান বিনিময়, আৰু বৈধ, টেকসই আগৰ অৰ্থনীতিৰ বিকাশ — যিটো শিল্পত ওলাই দিয়া পৰিয়ালবোৰৰ জীৱিকা নিৰাপদ কৰে — অন্তৰ্ভুক্ত।
  `.trim(),
};

export function About({ className, deviceTier }: AboutProps) {
  const [lang, setLang] = useState<"en" | "as">("en");
  const langRef = useRef(lang);
  langRef.current = lang;
  const isMobile = deviceTier === "mobile";

  return (
    <section
      id="about"
      className={cn(
        "relative min-h-screen flex flex-col items-center pt-20 pb-16 overflow-hidden scroll-mt-20 text-white",
        className
      )}
    >
      <AmbientMotion
        variant={isMobile ? "fog" : "fog"}
        theme="green"
        layers={isMobile ? 1 : 2}
        speed={isMobile ? 60 : undefined}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.45))] pointer-events-none" />

      <Reveal variant="scale" delay={0} className="absolute top-12 left-6 z-10">
        <SealCard />
      </Reveal>

      <div className="max-w-6xl mx-auto w-full px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="fade" delay={0}>
            <span className="inline-block text-gold text-xs md:text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-sm mb-6">
              About AATMA
            </span>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <div className="backdrop-blur-sm bg-white/[0.08] border border-white/15 rounded-sm p-6 md:p-8">
              <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight max-w-3xl text-center mb-6 drop-shadow-lg">
                Five decades<br />
                at the heart{" "}
                <span className="text-gold">of the agar trade</span>
              </h2>
              <div className="relative z-10 max-w-4xl mx-auto">
                <div
                  className={cn(
                    "divide-y divide-white/10 text-sm md:text-base text-center leading-relaxed text-white/95 transition-all duration-700 ease-out",
                    "opacity-100 translate-y-0",
                  )}
                >
                  <p
                    className={
                      langRef.current === "en" ? "font-sans" : "font-assamese"
                    }
                    style={{
                      minHeight: "220px",
                      textAlign: "center",
                    }}
                  >
                    {lang === "en" ? SCRIPT.en : SCRIPT.as}
                  </p>
                  <button
                    onClick={() => setLang(lang === "en" ? "as" : "en")}
                    className="mt-6 mb-6 inline-flex items-center gap-2 text-gold text-sm font-medium tracking-wide self-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-sm transition-all duration-300"
                  >
                    {lang === "en" ? "অসমীয়াত পঢ়ক" : "Read in English"}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Stagger staggerMs={120}>
          {[
            { label: "Established", value: "1976", subtext: "50 years of advocacy" },
            { label: "Trade Members", value: "~2 Lakh", subtext: "livelihoods across Assam" },
            { label: "First Legal Export", value: "2025", subtext: "112 kg to Saudi Arabia & UAE" },
            { label: "CITES Quota (2024–27)", value: "1.51 Lakh kg", subtext: "chips & powder / year for India" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card-hover relative group backdrop-blur-sm bg-white/[0.12] border border-white/10 rounded-sm p-5 md:p-6 text-center"
            >
              <div className="font-display text-3xl md:text-4xl text-gold font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-white/70 text-xs md:text-sm font-medium tracking-wide uppercase">
                {stat.label}
              </div>
              <div className="text-white/50 text-xs mt-1">{stat.subtext}</div>
              <div className="mt-3 text-white/20 group-hover:text-gold/40 transition-colors duration-300 text-2xl">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="inline-block w-5 h-5">
                  <path d="M12 2 L15 8 L22 9 L17 14 L18 21 L12 18 L6 21 L7 14 L2 9 L9 8 Z" />
                </svg>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function SealCard() {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" aria-hidden="true" focusable="false">
        <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="var(--color-green-deep)" strokeWidth="0.75" />
        <g fill="var(--color-gold)">
          <circle cx="50" cy="18" r="2" />
          <circle cx="50" cy="42" r="2" />
          <circle cx="50" cy="58" r="2" />
          <circle cx="50" cy="82" r="2" />
          <circle cx="82" cy="50" r="2" />
          <circle cx="18" cy="50" r="2" />
          <circle cx="69" cy="31" r="2" />
          <circle cx="31" cy="31" r="2" />
          <circle cx="69" cy="69" r="2" />
          <circle cx="31" cy="69" r="2" />
        </g>
        <circle cx="50" cy="38" r="4.5" fill="var(--color-gold)" />
        <g stroke="var(--color-gold)" strokeWidth="1" fill="none">
          <path d="M50 42 L50 38 M50 38 L50 34 M50 34 Q60 30 72 38" />
          <path d="M50 42 L50 38 M50 38 L50 34 M50 34 Q40 30 28 38" />
        </g>
        <path d="M33 72 Q50 60 67 72 L64 79 Q50 72 36 79 Z" fill="var(--color-gold)" />
      </svg>
      <span className="font-display text-xs text-gold/80 text-center leading-tight tracking-wide">
        AATMA
        <br />
        <span className="text-white/60 text-[10px]">Est. 1976 · Hojai</span>
      </span>
    </div>
  );
}
