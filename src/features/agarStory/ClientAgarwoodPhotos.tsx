import { assetUrl } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

const PHOTOS = [
  {
    path: "client-images/agarwood/agarwood-raw-pieces.jpg",
    alt: "Irregular pieces of dark agarwood arranged on a white surface.",
    caption: "Photograph of agarwood pieces.",
    width: 960,
    height: 1280,
  },
  {
    path: "client-images/agarwood/distillation-vessel.jpg",
    alt: "A large covered vessel and connected equipment inside a small processing building.",
    caption: "Photograph of distillation equipment.",
    width: 2252,
    height: 4000,
  },
  {
    path: "client-images/agarwood/agarwood-chips-hand.jpg",
    alt: "A hand holding several dark wood chips above a larger pile of similar pieces.",
    caption: "Close-up of agarwood chips.",
    width: 1024,
    height: 768,
  },
  {
    path: "client-images/agarwood/agarwood-liquid-dark-sample.jpg",
    alt: "A graduated glass flask containing a dark liquid sample, set on a white counter.",
    caption: "Dark liquid sample in a graduated flask.",
    width: 960,
    height: 1280,
  },
  {
    path: "client-images/agarwood/agarwood-liquid-amber-samples.jpg",
    alt: "Two graduated glass bottles filled with amber and pale liquid samples.",
    caption: "Amber and pale liquid samples in graduated glass bottles.",
    width: 960,
    height: 1280,
  },
];

/** Safe, object-focused photos from the client-supplied asset set. */
export function ClientAgarwoodPhotos() {
  return (
    <section className="mb-16" aria-labelledby="client-agarwood-photos-heading">
      <Reveal variant="fade" delay={0}>
        <div className="mb-6 max-w-3xl">
          <h3 id="client-agarwood-photos-heading" className="font-display text-xl font-bold text-white md:text-2xl">
            Agarwood photographs
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-cream/75">
            Captions describe only visible subject matter. No grade, quality, origin, or performance claim is inferred from these images.
          </p>
        </div>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {PHOTOS.map((photo, index) => (
          <Reveal key={photo.path} variant="up" delay={index * 80}>
            <figure className="glass-surface overflow-hidden rounded-sm">
              <img
                src={assetUrl(photo.path)}
                alt={photo.alt}
                className="h-64 w-full object-cover"
                loading="eager"
                decoding="async"
                width={photo.width}
                height={photo.height}
              />
              <figcaption className="p-4 text-sm leading-relaxed text-cream/80">
                {photo.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
