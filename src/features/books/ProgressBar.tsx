import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  const pct = Math.round(progress * 100);

  return (
    <div
      className={cn(
        "fixed top-14 left-0 right-0 h-0.5 bg-white/10 z-30",
        className
      )}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gold transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
      <span className="sr-only">{pct}% read</span>
    </div>
  );
}
