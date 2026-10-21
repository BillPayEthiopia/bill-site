import Image from "next/image";
import type { LucideIcon } from "lucide-react";

type PhotoPanelProps = {
  image?: string;
  alt: string;
  icon: LucideIcon;
  /** Load immediately, for a photo in the hero. */
  priority?: boolean;
};

/** A large rounded photo with an icon chip. Shows a brand gradient until the photo exists. */
export function PhotoPanel({ image, alt, icon: Icon, priority = false }: PhotoPanelProps) {
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-panel bg-linear-to-br from-blue-50 via-aqua-50 to-white shadow-float">
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="size-28 text-blue/15" aria-hidden="true" />
        </div>
      )}

      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy/30 via-transparent to-transparent" />

      <span className="absolute bottom-5 left-5 flex size-12 items-center justify-center rounded-xl bg-white/90 text-blue shadow-sm backdrop-blur">
        <Icon className="size-6" aria-hidden="true" />
      </span>
    </div>
  );
}