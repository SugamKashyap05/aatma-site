import { ChevronRight } from "lucide-react";
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
    Agar Tree or Sanchi plant is one of the precious gifts of nature and deeply associated with the culture of Assam & North eastern India since ancient time. Bark of agar tree called sanchi paat was used for writing scripture. The renown Vaishnab saints of Assam — Srimanta Sankar Dev, Madhav Deb and Damudar Deb — used Sanchipat for writing scriptures. Since than the Assamese people of upper Assam planted Sanchi plant in their homestead which become a part of ritual. Agaru is an inseparable puja article of Hindus since ancient time.

    Agar scientifically known by the generic name Aquilaria of family Thymeleaceae. Main species found in India are Aquilaria malaccensis, Aquilaria Agalocha and Aquilaria khasiana. Agarwood chips (Black resinous wood) and Agar Oil (Essential Oil) Attar are most useful and oldest raw materials for perfume. Thus agar is a highly commercially useful plant.
  `.trim(),
  as: `
    এজন মূল্যবান প্ৰকৃতিৰ উপহাৰ হৈছে আগাৰ বা সাঁচী গছ, আৰু প্ৰাচীন কালৰ পৰা অসম আৰু উত্তৰ-পূৰ্বাঞচলৰ সংস্কৃতিৰ লগত ইয়াৰ গভীৰ সম্পৰ্ক আছে। আগাৰ গছৰ বাকল সাঁচী পাত বুলি পুৰণি ধৰ্মগ্ৰন্থ লিখিবলৈ ব্যৱহাৰ কৰা হৈছিল। অসমৰ বিখ্যাত বৈষ্ণব সন্ত শ্ৰীমন্ত শংকৰ দেব, মাধৱ দেব আৰু দামোদৰ দেবে সাঁচীপাত ব্যৱহাৰ কৰি ধৰ্মগ্ৰন্থ লিখিছিল। তেতিয়াৰ পৰা ওপৰৰ অসমৰ অসমীয়া লোকে সাঁচী গছ নিজৰ ঘৰত লগাই ধৰ্মীয় অনুষ্ঠানৰ অংশ হৈ পেলায়। আগাৰু প্ৰাচীন কালৰ পৰা হিন্দুসকলৰ অবিচ্ছেদ্য পূজা সামগ্রী।

    আগাৰ বৈজ্ঞানিকভাৱে জেনেৰিক নাম Aquilaria, পৰিয়াল Thymeleaceae। ভাৰতত পোৱা মুখ্য প্ৰজাতিবোৰ হৈছে Aquilaria malaccensis, Aquilaria Agalocha আৰু Aquilaria khasiana। আগাৰড চিপছ (ক'লা ৰেজিনযুক্ত কাঠ) আৰু আগাৰ অইল (এচেনচিয়েল অইল) আত্তৰ সুগন্ধি উদ্যোগৰ বাবে সবাতোকৈ উপযোগী আৰু পুৰণি কাঁচামাল। গতিকে আগাৰ এটা অতি বাণিজ্যিকভাৱে উপযোগী গছ।
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
        "relative min-h-screen flex flex-col items-center pt-20 pb-16 overflow-hidden scroll-mt-20 text-agar-body",
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
            <span className="bg-glass-card backdrop-blur-xl border border-white/20 inline-block text-agar-label text-xs md:text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-6">
              About AATMA
            </span>
          </Reveal>

          <Reveal variant="up" delay={100} rootMargin="0px 0px 300px 0px">
            <div className="bg-glass-card backdrop-blur-xl border border-white/20 rounded-sm p-6 md:p-8 shadow-lg">
              <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight max-w-3xl text-center mb-6 drop-shadow-lg text-agar-title">
                A Precious Gift<br />
                <span className="text-agar-label">of Nature</span>
              </h2>
              <div className="grid">
                <div
                  className={cn(
                    "text-sm md:text-base leading-relaxed text-agar-body transition-all duration-700 ease-out",
                    "opacity-100 translate-y-0"
                  )}
                >
                  <p
                    className={
                      langRef.current === "en" ? "font-sans" : "font-assamese"
                    }
                    style={{ textAlign: "left" }}
                  >
                    {lang === "en" ? SCRIPT.en : SCRIPT.as}
                  </p>
                  <button
                    onClick={() => setLang(lang === "en" ? "as" : "en")}
                    className="mt-6 mb-6 inline-flex items-center gap-2 text-agar-label text-sm font-medium tracking-wide self-center bg-glass-card backdrop-blur-xl border border-white/20 hover:bg-green-deep/95 px-5 py-2.5 rounded-sm transition-all duration-300 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
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
            { label: "Established", value: "1976" },

          ].map((stat) => (
            <div
              key={stat.label}
              className="card-hover bg-glass-card backdrop-blur-xl border border-white/20 shadow-lg relative group rounded-sm p-5 md:p-6 text-center"
            >
              <div className="font-display text-3xl md:text-4xl text-agar-label font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-agar-body text-xs md:text-sm font-medium tracking-wide uppercase">
                {stat.label}
              </div>

              <div className="mt-3 text-agar-icon group-hover:text-agar-label group-active:text-agar-label transition-colors duration-300 text-2xl">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="inline-block w-5 h-5" aria-hidden="true" focusable="false">
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
      <span className="font-display text-xs text-agar-label text-center leading-tight tracking-wide">
        AATMA
        <br />
        <span className="text-agar-body text-[10px]">Est. 1976 · Hojai</span>
      </span>
    </div>
  );
}
