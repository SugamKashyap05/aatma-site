import { assetUrl } from "@/lib/utils";

type AatmaLogoProps = {
  alt: string;
  className: string;
  loading?: "eager" | "lazy";
};

/** The exact organization logo supplied for site and browser-brand placements. */
export function AatmaLogo({
  alt,
  className,
  loading = "lazy",
}: AatmaLogoProps) {
  return (
    <img
      src={assetUrl("brand/aatma-logo.jpg")}
      alt={alt}
      className={`object-contain ${className}`}
      width={1100}
      height={1296}
      loading={loading}
      decoding="async"
    />
  );
}
