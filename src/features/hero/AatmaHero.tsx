import { assetUrl } from "@/lib/utils";

/**
 * A static, source-faithful homepage hero using a client-supplied tree image.
 * The image is described visually without identifying its species or location.
 */
export function AatmaHero() {
  return (
    <section
      aria-labelledby="aatma-hero-title"
      className="relative overflow-hidden text-cream"
    >
      <div className="mx-auto grid min-h-[88svh] max-w-7xl items-center gap-10 px-6 pb-12 pt-28 md:grid-cols-2 md:gap-12 md:pb-16 md:pt-32">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-light sm:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Established 1976 · Hojai, Assam
          </p>
          <h1
            id="aatma-hero-title"
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            All Assam Agar Traders and Agar Oil Manufacturers
            <span className="mt-2 block text-gold-light">Association — AATMA</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            Representing the agarwood trade and agaroil manufacturing sector of
            Assam.
          </p>
          <a
            href="#about"
            className="mt-8 inline-flex min-h-11 items-center border border-gold/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-light transition-colors hover:bg-gold-light hover:text-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
          >
            Discover AATMA
          </a>
        </div>

        <figure className="relative mx-auto w-full max-w-xl md:ml-auto">
          <div className="relative aspect-[5/4] overflow-hidden border border-gold/35 bg-green-deep">
            <img
              src={assetUrl("client-images/aatma-tree-plantation.jpg")}
              alt="Photograph showing rows of trees and a grassy path"
              width={1000}
              height={800}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-deep/35 via-transparent to-transparent"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          />
        </figure>
      </div>
    </section>
  );
}
