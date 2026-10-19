import type { ReactNode } from "react";

/** A landscape tablet: even bezels all round, camera on the side. Screen is 290×196. */
export function Tablet({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[310px] rounded-[22px] bg-navy-950 p-[10px] shadow-float ring-1 ring-white/10">
      <span className="absolute left-[3px] top-1/2 size-[4px] -translate-y-1/2 rounded-full bg-white/25" />
      <div className="h-[196px] overflow-hidden rounded-[12px] bg-white">{children}</div>
    </div>
  );
}