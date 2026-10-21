import type { ReactNode } from "react";

/** A navy stage with soft glows, for showing an illustration beside text. */
export function VisualPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex aspect-[5/4] items-center justify-center overflow-hidden rounded-panel bg-navy p-8 shadow-float">
      <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 size-72 rounded-full bg-aqua/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-24 -left-16 -z-10 size-72 rounded-full bg-blue/40 blur-3xl" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]"
      />
      {children}
    </div>
  );
}