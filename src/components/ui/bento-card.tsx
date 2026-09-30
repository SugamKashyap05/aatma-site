import { cn } from "@/lib/utils";
import { motion, type Variants } from "motion/react";
import React, { type ReactNode } from "react";

export interface BentoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  colSpan?: 1 | 2 | 3;
  className?: string;
  children?: ReactNode;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function BentoCard({
  title,
  description,
  icon,
  colSpan = 1,
  className,
  children,
}: BentoCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "card-hover relative group bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-sm overflow-hidden p-5 md:p-6",
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "md:col-span-3",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,60,42,0)_0%,rgba(0,0,0,0.25)_100%)] pointer-events-none" />

      <div className="relative z-10">
        {icon && (
          <div className="text-gold mb-4">
            {icon}
          </div>
        )}
        <h3 className="font-display font-bold text-lg md:text-xl text-white mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          {description}
        </p>
        {children}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default BentoCard;
