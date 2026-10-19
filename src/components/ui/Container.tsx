import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Centers content at the site's standard width.
 * Side padding grows smoothly with the screen (20px on phones, up to 64px on large monitors),
 * and the width opens up on 1536px+ screens so big monitors aren't mostly margin.
 */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-page px-[clamp(1.25rem,4vw,4rem)] 2xl:max-w-page-wide",
        className,
      )}
      {...props}
    />
  );
}