import { assetUrl } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

const PHOTOS = [
  {
    path: "client-images/agarwood/agarwood-raw-pieces.jpg",
    alt: "Irregular pieces of dark agarwood arranged on a white surface.",
    caption: "A client-supplied photograph of agarwood pieces.",
    width: 960,
    height: 1280,
  },
  {
    path: "client-images/agarwood/distillation-vessel.jpg",
    alt: "A large covered vessel and connected equipment inside a small processing building.",
    caption: "A client-supplied photograph of distillation equipment.",
    width: 2252,
    height: 4000,
  },
  {
    path: "client-images/agarwood/agarwood-chips-hand.jpg",
    alt: "A hand holding several dark wood chips above a larger pile of similar pieces.",
    caption: "A client-supplied close-up of agarwood chips.",
    width: 1024,
    height: 768,
  },
  {
    path: "client-images/agarwood/agarwood-chips-white.jpg",
    alt: "Raw agarwood chips arranged on a white fabric surface.",
    caption: "A client-supplied photograph of raw agarwood chips.",
    width: 960,
    height: 1280,
  },
  {
    path: "client-images/agarwood/agarwood-chips-hand-2.jpg",
    alt: "A hand holding a pile of dark agarwood chips.",
    caption: "A client-supplied close-up of agarwood chips in hand.",
    width: 1024,
    height: 768,
  },
];

const NATURE_PHOTOS = [
  {
    path: "client-images/nature/forest-1.jpg",
    alt: "Dense forest plantation with tall trees and green canopy.",
    caption: "A client-supplied photograph of an agarwood plantation.",
    width: 1280,
    height: 720,
  },
  {
    path: "client-images/nature/forest-2.jpg",
    alt: "Dense forest plantation with tall trees and a dirt path.",
    caption: "A client-supplied photograph of a forest plantation.",
    width: 1280,
    height: 720,
  },
];

/** Safe, object-focused photos from the client-supplied asset set. */
export function ClientAgarwoodPhotos() {
  const allPhotos = [...PHOTOS, ...NATURE_PHOTOS];
  return (
    <section className="mb-16" aria-labelledby="client-agarwood-photos-heading">
      <Reveal variant="fade" delay={0}>
        <div className="mb-6 max-w-3xl">
          <h3 id="client-agarwood-photos-heading" className="font-display text-xl font-bold text-white md:text-2xl">
            Client-supplied agarwood photographs
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
