import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface VideoBackgroundProps {
  /** Per-section opacity override (0-1). Use data-video-opacity on sections. */
  className?: string;
}

/**
 * Fixed video background with a parallaxed glassmorphism overlay.
 *
 * - Video: fixed, full-viewport, muted autoplay loop. Saturated/brightness
 *   reduced so it sits behind content without overwhelming text.
 * - Glass layer: backdrop-blur + translucent white, parallaxed at 8% scroll
 *   speed via GSAP ScrollTrigger (scrubbed, tied to scrollbar).
 * - prefers-reduced-motion: parallax is skipped entirely; glass layer
 *   renders in its final state.
 * - Video preload="metadata" — does not download full file until scroll.
 */
export function VideoBackground({ className }: VideoBackgroundProps) {
  const glassRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const glass = glassRef.current;
    const video = videoRef.current;
    if (!glass || !video) return;

    // Pause video when tab is hidden (performance)
    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Parallax on glass layer only — video stays fixed
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let ctx: gsap.Context | undefined;

    if (!prefersReduced) {
      ctx = gsap.context(() => {
        gsap.to(glass, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });
      });
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      ctx?.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      className={cn("fixed inset-0 z-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {/* Video layer — fixed, no parallax (GPU cost) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "saturate(0.85) brightness(0.7)",
        }}
      >
        <source
          src="/assets/backgrounds/misty-pine-dawn-web.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark tint for text readability */}
      <div className="absolute inset-0 bg-green-deep/40" />

      {/* Glassmorphism parallax layer */}
      <div
        ref={glassRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px) saturate(110%)",
          WebkitBackdropFilter: "blur(12px) saturate(110%)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      />
    </div>
  );
}

export default VideoBackground;
