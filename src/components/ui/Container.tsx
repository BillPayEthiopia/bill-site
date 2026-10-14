import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Centers content at the site's standard width with responsive side padding. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10", className)}
      {...props}
    />
  );
}