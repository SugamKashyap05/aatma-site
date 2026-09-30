"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  badge?: string;
}

interface TimelineProps {
  items?: TimelineItem[];
  className?: string;
}

const defaultItems: TimelineItem[] = [
  {
    year: "1976",
    title: "AATMA is established in Hojai, Assam",
    description:
      "A group of agar traders and agaroil manufacturers come together to form a collective body representing their shared interests — at a time when the agar trade operated largely outside formal regulation.",
    image: "linear-gradient(135deg, #1a3c2a 0%, #2d5a3d 50%, #1a3c2a 100%)",
    badge: "Foundation",
  },
  {
    year: "1978–79",
    title: "Registered under the Registrar of Societies",
    description:
      "AATMA receives formal registration — Reg. No. 664 of 78–79 — giving the association legal standing to represent its members and engage with government authorities.",
    image: "linear-gradient(135deg, #2d5a3d 0%, #1a3c2a 50%, #2d5a3d 100%)",
    badge: "Registration",
  },
  {
    year: "2000",
    title: "Seminar at Assam Administrative Staff College, Guwahati",
    description:
      "AATMA connects with outside agar expertise for the first time — a landmark seminar that opens the association to broader knowledge, technical input, and wider networks.",
    image: "linear-gradient(135deg, #1a3c2a 0%, #3d7a54 50%, #1a3c2a 100%)",
    badge: "Turning Point",
  },
  {
    year: "2019",
    title: "Assam Cabinet liberalises agar cultivation & felling",
    description:
      "In July 2019, the Assam Cabinet approves growing and cutting of Agar and Chandan trees on non-forest lands up to 35 bighas without permission — the culmination of nearly 20 years of advocacy.",
    image: "linear-gradient(135deg, #2d5a3d 0%, #c9a84c 50%, #2d5a3d 100%)",
    badge: "Major Victory",
  },
  {
    year: "2020",
    title: "Assam Agarwood Promotion Policy 2020",
    description:
      "The state legalises the entire agarwood trade chain — plantation, harvesting, processing, transit, and sale — bringing agar out of the ambit of forest produce regulations.",
    image: "linear-gradient(135deg, #1a3c2a 0%, #2d5a3d 50%, #c9a84c 100%)",
    badge: "Policy Landmark",
  },
  {
    year: "2024",
    title: "CITES export quota secured for India",
    description:
      "India secures a formal export quota: 1,51,080 kg/year of chips & powder and 7,050 kg/year of oil for 2024–2027. Assam's share: 1,19,400 kg chips + 5,560 kg oil.",
    image: "linear-gradient(135deg, #3d7a54 0%, #1a3c2a 50%, #2d5a3d 100%)",
    badge: "Global Opening",
  },
  {
    year: "2025",
    title: "Assam's first legal agarwood export",
    description:
      "Assam ships its first legally approved commercial consignment: 100 kg of premium agarwood chips to Saudi Arabia and 12 kg to the UAE — worth a combined ₹2.35 crore.",
    image: "linear-gradient(135deg, #c9a84c 0%, #2d5a3d 50%, #1a3c2a 100%)",
    badge: "New Era",
  },
  {
    year: "2026",
    title: "Agarwood Export Promotion Cell constituted",
    description:
      "In May 2026, the Ministry of Commerce constitutes a dedicated Agarwood Export Promotion Cell, bringing together CHEMEXCIL and SHEFEXIL for focused export promotion.",
    image: "linear-gradient(135deg, #1a3c2a 0%, #c9a84c 50%, #3d7a54 100%)",
    badge: "National Stage",
  },
];

export const Timeline = ({
  items = defaultItems,
  className,
}: TimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeRef = buttonRefs.current[activeIndex];
    if (activeRef) {
      activeRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [activeIndex]);

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-12 gap-6">
        {/* Year selector — left column */}
        <div className="relative flex flex-col items-center shrink-0 w-full lg:w-auto lg:col-span-1 col-span-12">
          <div
            className="flex flex-row lg:flex-col gap-3 lg:h-[500px] overflow-auto no-scrollbar md:snap-y snap-x lg:py-20 lg:px-0 px-20 snap-mandatory w-full"
            style={{ scrollBehavior: "smooth" }}
          >
            {items.map((item, index) => (
              <Button
                variant={activeIndex === index ? "default" : "outline"}
                key={item.year}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "rounded-full px-5! transition-all duration-300 shrink-0 snap-center",
                  activeIndex === index
                    ? "bg-gold text-green-deep border-gold shadow-lg shadow-gold/30"
                    : "border-white/20 text-white/60 hover:text-white hover:border-gold/40"
                )}
              >
                <span className="text-sm font-medium tracking-tight">
                  {item.year}
                </span>
              </Button>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-green-deep to-transparent pointer-events-none z-10 lg:block hidden" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-green-deep to-transparent pointer-events-none z-10 lg:block hidden" />
        </div>

        {/* Content area — right column */}
        <div className="flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full overflow-hidden lg:col-span-11 col-span-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.year}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-1 grid lg:grid-cols-11 grid-cols-1 items-center gap-6 w-full"
            >
              {/* Text content */}
              <div className="flex-1 flex flex-col items-start gap-3 xl:ps-10 xl:pe-16 lg:col-span-6">
                <Badge
                  variant="secondary"
                  className="rounded-full h-6 px-3 py-1 font-normal bg-white/10 text-gold border border-gold/30"
                >
                  {activeItem.badge}
                </Badge>
                <h2 className="text-5xl md:text-5xl lg:text-8xl font-medium tracking-tight text-gold font-display">
                  {activeItem.year}
                </h2>
                <h3 className="text-2xl font-medium text-white leading-tight font-display">
                  {activeItem.title}
                </h3>
                <p className="sm:text-lg text-base text-white/70 leading-relaxed max-w-xl">
                  {activeItem.description}
                </p>
              </div>

              {/* Image area */}
              <div className="w-full flex flex-col gap-4 lg:ps-5 lg:col-span-5">
                <div
                  className="w-full rounded-lg overflow-hidden bg-white/5 max-h-68 md:max-h-91 aspect-11/9 md:aspect-6/3 lg:aspect-11/9"
                  role="img"
                  aria-label={`Milestone image: ${activeItem.title}`}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: activeItem.image }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-16 h-16 text-white/20"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                </div>

                {activeItem.link && (
                  <a
                    href={activeItem.link}
                    target="_blank"
                    className="flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors group"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:-rotate-45 duration-200 transition-all" />
                  </a>
                )}
                {!activeItem.link && (
                  <a
                    href="#contact"
                    className="flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors text-left group"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:-rotate-45 duration-200 transition-all" />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
