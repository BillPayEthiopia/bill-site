import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official Billpay logo files with their true proportions (from each SVG's viewBox).
 * Brand rules :
 *  - Never stretch, recolor, rotate, or add effects to the logo.
 *  - Full logo minimum width: 32px on screen. Use the monogram below that.
 *  - Keep clear space around it (half the monogram's height) free of other elements.
 */


const LOGOS = {
  /** Navy wordmark: for white and light backgrounds. */
  "full-color": { src: "/logos/billpay-horizontal-full-color.svg", width: 662, height: 194 },
  /** White wordmark: for navy and dark backgrounds. */
  reversed: { src: "/logos/billpay-horizontal-reversed.svg", width: 662, height: 194 },
  /** Wave mark only: for small spaces such as icons. */
  monogram: { src: "/logos/billpay-monogram.svg", width: 560, height: 584 },
} as const;

type LogoProps = {
  variant?: keyof typeof LOGOS;
  /** Set the displayed width with a Tailwind class, e.g. "w-32". Height follows automatically. */
  className?: string;
  /** Load immediately. Use for logos visible on first screen (the navbar). */
  priority?: boolean;
};

export function Logo({ variant = "full-color", className, priority = false }: LogoProps) {
  const logo = LOGOS[variant];
  return (
    <Image
      src={logo.src}
      alt="Billpay"
      width={logo.width}
      height={logo.height}
      priority={priority}
      className={cn("h-auto select-none", className)}
      draggable={false}
    />
  );
}