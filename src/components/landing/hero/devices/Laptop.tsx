import type { ReactNode } from "react";

/** A laptop: dark lid with a thin bezel and camera, over a slim aluminium base. Screen is 520×325. */
export function Laptop({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-[600px] flex-col items-center">
      <div className="relative w-[540px] rounded-t-[18px] bg-navy-950 p-[10px] pb-[14px] shadow-float ring-1 ring-white/10">
        <span className="absolute left-1/2 top-[3px] size-[4px] -translate-x-1/2 rounded-full bg-white/25" />
        <div className="h-[325px] overflow-hidden rounded-[6px] bg-white">{children}</div>
      </div>

      {/* Base, with the opening notch */}
      <div className="relative h-[16px] w-[600px] rounded-b-[14px] rounded-t-[3px] bg-linear-to-b from-[#e8ecf3] to-[#b8c1cf] shadow-[0_18px_30px_-12px_rgb(27_52_97/0.45)]">
        <span className="absolute left-1/2 top-0 h-[5px] w-[96px] -translate-x-1/2 rounded-b-[6px] bg-[#97a2b4]/60" />
      </div>
    </div>
  );
}