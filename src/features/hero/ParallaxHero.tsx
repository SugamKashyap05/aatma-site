import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { HERO_IMAGES, srcSetFor, type HeroImage } from "@/assets/hero";

interface ParallaxLayer {
  image: HeroImage;
  alt: string;
  speedX: number;
  speedY: number;
  speedZ: number;
  rotation: number;
  distance: number;
  className?: string;
  zIndex: number;
  initialTop: string;
  initialLeft: string;
  width: string;
  /** `sizes` hint for the browser's srcset picker. */
  sizes: string;
}

interface ParallaxHeroProps {
  layers?: ParallaxLayer[];
  title?: string;
  className?: string;
}

/**
 * Layer ordering and motion constants. Images come from the generated manifest
 * (see scripts/optimize-hero-images.mjs) rather than remote CDN URLs.
 *
 * `sizes` is the honest rendered width per layer, which is what makes the
 * responsive selection actually pick a small file on mobile.
 */
const layerSpec: Omit<ParallaxLayer, "image">[] = [
  {
    alt: "background", speedX: 0.03, speedY: 0.038, speedZ: 0, rotation: 0, distance: -200,
    zIndex: 1, initialTop: "calc(50% - 50px)", initialLeft: "calc(50% + 0px)", width: "3200px",
    sizes: "100vw",
  },
  {
    alt: "fog-7", speedX: 0.27, speedY: 0.32, speedZ: 0, rotation: 0, distance: 850,
    zIndex: 2, initialTop: "calc(50% - 100px)", initialLeft: "calc(50% + 300px)", width: "1900px",
    sizes: "(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1900px",
  },
  {
    alt: "mountain-10", speedX: 0.095, speedY: 0.005, speedZ: 0, rotation: 0, distance: 1110,
    zIndex: 3, initialTop: "calc(50% + 169px)", initialLeft: "calc(50% + 330px)", width: "1200px",
    sizes: "(max-width: 640px) 640px, 1200px",
  },
  {
    alt: "fog-6", speedX: 0.25, speedY: 0.28, speedZ: 0, rotation: 0, distance: 1400,
    zIndex: 4, initialTop: "calc(50% + 285px)", initialLeft: "calc(50%)", width: "2200px",
    sizes: "(max-width: 640px) 640px, 1600px",
    className: "opacity-30",
  },
  {
    alt: "mountain-9", speedX: 0.125, speedY: 0.155, speedZ: 0.15, rotation: 0.02, distance: 1700,
    zIndex: 51, initialTop: "calc(50% + 313px)", initialLeft: "calc(50% - 557px)", width: "670px",
    sizes: "(max-width: 640px) 640px, 670px",
  },
  {
    alt: "fog-5", speedX: 0.16, speedY: 0.105, speedZ: 0, rotation: 0, distance: 1900,
    zIndex: 7, initialTop: "calc(50% + 360px)", initialLeft: "calc(50% + 40px)", width: "650px",
    sizes: "(max-width: 640px) 640px, 650px",
  },
  {
    alt: "mountain-7", speedX: 0.1, speedY: 0.1, speedZ: 0, rotation: 0.09, distance: 2000,
    zIndex: 19, initialTop: "calc(50% + 223px)", initialLeft: "calc(50% + 495px)", width: "738px",
    sizes: "(max-width: 640px) 640px, 738px",
  },
  {
    alt: "mountain-6", speedX: 0.065, speedY: 0.05, speedZ: 0.05, rotation: 0.12, distance: 2300,
    zIndex: 18, initialTop: "calc(50% + 120px)", initialLeft: "calc(50% + 590px)", width: "408px",
    sizes: "(max-width: 640px) 408px, 408px",
  },
  {
    alt: "fog-4", speedX: 0.135, speedY: 0.1, speedZ: 0, rotation: 0, distance: 2400,
    zIndex: 11, initialTop: "calc(50% + 223px)", initialLeft: "calc(50% + 460px)", width: "590px",
    sizes: "(max-width: 640px) 590px, 590px",
    className: "opacity-50",
  },
  {
    alt: "mountain-5", speedX: 0.08, speedY: 0.05, speedZ: 0.13, rotation: 0.1, distance: 2550,
    zIndex: 12, initialTop: "calc(50% + 320px)", initialLeft: "calc(50% + 230px)", width: "725px",
    sizes: "(max-width: 640px) 640px, 725px",
  },
  {
    alt: "fog-3", speedX: 0.11, speedY: 0.018, speedZ: 0, rotation: 0, distance: 2800,
    zIndex: 113, initialTop: "calc(50% + 210px)", initialLeft: "calc(50% + 5px)", width: "1600px",
    sizes: "(max-width: 640px) 640px, 1600px",
  },
  {
    alt: "mountain-4", speedX: 0.059, speedY: 0.024, speedZ: 0.35, rotation: 0.14, distance: 3200,
    zIndex: 15, initialTop: "calc(50% + 196px)", initialLeft: "calc(50% - 698px)", width: "1100px",
    sizes: "(max-width: 640px) 640px, 1100px",
  },
  {
    alt: "mountain-3", speedX: 0.04, speedY: 0.018, speedZ: 0.32, rotation: 0.05, distance: 3400,
    zIndex: 20, initialTop: "calc(50% - 20px)", initialLeft: "calc(50% + 750px)", width: "630px",
    sizes: "(max-width: 640px) 630px, 630px",
  },
  {
    alt: "fog-2", speedX: 0.15, speedY: 0.0115, speedZ: 0, rotation: 0, distance: 3600,
    zIndex: 16, initialTop: "calc(50% - 20px)", initialLeft: "calc(50% + 698px)", width: "1100px",
    sizes: "(max-width: 640px) 640px, 1100px",
  },
  {
    alt: "mountain-2", speedX: 0.0235, speedY: 0.013, speedZ: 0.42, rotation: 0.15, distance: 3800,
    zIndex: 17, initialTop: "calc(50% + 256px)", initialLeft: "calc(50% + 528px)", width: "800px",
    sizes: "(max-width: 640px) 640px, 800px",
  },
  {
    alt: "mountain-1", speedX: 0.027, speedY: 0.018, speedZ: 0.53, rotation: 0.2, distance: 4000,
    zIndex: 18, initialTop: "calc(50% + 196px)", initialLeft: "calc(50% - 728px)", width: "1100px",
    sizes: "(max-width: 640px) 640px, 1100px",
  },
  {
    alt: "fog-1", speedX: 0.12, speedY: 0.01, speedZ: 0, rotation: 0, distance: 4200,
    zIndex: 21, initialTop: "calc(100% - 355px)", initialLeft: "calc(50% + 100px)", width: "1900px",
    sizes: "(max-width: 640px) 640px, 1900px",
    className: "opacity-50",
  },
];

const defaultLayers: ParallaxLayer[] = layerSpec.map((spec, i) => ({
  ...spec,
  image: HERO_IMAGES[i],
}));

export function ParallaxHero({
  layers = defaultLayers,
  title = "AATMA",
  className,
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  const [rotateDegree, setRotateDegree] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newXValue = e.clientX - window.innerWidth / 2;
      const newYValue = e.clientY - window.innerHeight / 2;
      const newRotateDegree = (newXValue / (window.innerWidth / 2)) * 20;
      setXValue(newXValue);
      setYValue(newYValue);
      setRotateDegree(newRotateDegree);
      updateLayers(e.clientX, newXValue, newYValue, newRotateDegree);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduced]);

  const updateLayers = (
    _cursorPosition: number,
    xVal: number,
    yVal: number,
    rotateDeg: number
  ) => {
    layerRefs.current.forEach((el, index) => {
      if (!el) return;
      const layer = layers[index];
      const { speedX, speedY, speedZ, rotation } = layer;
      const computedLeft = parseFloat(
        getComputedStyle(el).left.replace("px", "")
      );
      const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
      const zValue = (el.getBoundingClientRect().left - window.innerWidth / 2) * isInLeft * 0.1;

      if (!reduced) {
        el.style.transform = `perspective(2300px) translateZ(${
          zValue * speedZ
        }px) rotateY(${rotateDeg * rotation}deg) translateX(calc(-50% + ${
          -xVal * speedX
        }px)) translateY(calc(-50% + ${yVal * speedY}px))`;
      }
    });

    if (textRef.current && !reduced) {
      const textSpeedX = 0.07, textSpeedY = 0.05, textSpeedZ = 0.08, textRotation = 0.04;
      const rect = textRef.current.getBoundingClientRect();
      const isInLeft = rect.left < window.innerWidth / 2 ? 1 : -1;
      const zValue = (rect.left - window.innerWidth / 2) * isInLeft * 0.1;

      textRef.current.style.transform = `perspective(2300px) translateZ(${
        zValue * textSpeedZ
      }px) rotateY(${rotateDeg * textRotation}deg) translateX(calc(-50% + ${
        -xVal * textSpeedX
      }px)) translateY(calc(-50% + ${yVal * textSpeedY}px))`;
    }
  };

  return (
    <main
      ref={containerRef}
      className={cn(
        "relative h-screen w-full overflow-hidden bg-gradient-to-b from-green-deep via-green-mid to-green-deep",
        className
      )}
    >
      <div className="absolute inset-0 z-[100] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.85))]" />

      {layers.map((layer, index) => {
        const isBackground = index === 0;
        return (
          <picture key={layer.alt}>
            {/* AVIF first — ~3x smaller than WebP for these alpha-heavy layers. */}
            <source
              type="image/avif"
              srcSet={srcSetFor(layer.image, "avif")}
              sizes={layer.sizes}
            />
            <source
              type="image/webp"
              srcSet={srcSetFor(layer.image, "webp")}
              sizes={layer.sizes}
            />
            <img
              ref={(el) => { if (el) layerRefs.current[index] = el; }}
              src={layer.image.fallback}
              alt={layer.alt}
              width={layer.image.variants[layer.image.variants.length - 1]?.w}
              height={Math.round(
                (layer.image.variants[layer.image.variants.length - 1]?.w ?? 1) /
                  layer.image.aspect
              )}
              // Only the full-bleed background blocks first paint; every other
              // layer is decorative and can arrive late.
              loading={isBackground ? "eager" : "lazy"}
              fetchPriority={isBackground ? "high" : "low"}
              decoding="async"
              className={cn(
                "hero-layer absolute pointer-events-none transition-transform duration-[450ms] ease-out",
                layer.className
              )}
              style={{
                width: layer.width,
                top: layer.initialTop,
                left: layer.initialLeft,
                zIndex: layer.zIndex,
                transform: "translate(-50%, -50%)",
              }}
            />
          </picture>
        );
      })}

      <div
        ref={textRef}
        className="absolute z-[9] text-white text-center pointer-events-auto transition-transform duration-[450ms] ease-out flex flex-col items-center justify-center"
        style={{
          top: "calc(50% - 80px)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
        }}
      >
        <span className="inline-block self-start mb-4 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm text-cream-dark">
          Established 1976 · Hojai, Assam
        </span>
        <h1 className="font-display font-bold text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.85] max-md:text-[clamp(1.8rem,5vw,4rem)] max-sm:text-[clamp(1.2rem,3.5vw,2.8rem)] drop-shadow-lg">
          All Assam Agar Traders<br />& Agaroil Manufacturers'
          <span className="block md:inline font-normal text-[0.42em] mt-2 md:mt-0 md:ml-3 tracking-[0.18em] uppercase text-gold-light">
            Association — AATMA
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-center text-white/70 text-sm md:text-base font-light leading-relaxed drop-shadow">
          Five decades representing the agarwood trade and agaroil manufacturing sector of Assam — from the distillation hub of Hojai to the global markets of the Middle East.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-7 py-3 bg-gold text-green-deep font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30"
          >
            Discover AATMA
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-transparent text-white border border-white/30 font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-white/10 hover:border-gold/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </main>
  );
}
