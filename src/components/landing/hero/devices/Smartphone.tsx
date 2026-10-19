import type { ReactNode } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";

/** A modern smartphone: thin bezels, camera cutout, side buttons, status bar. Screen is 214×454. */
export function Smartphone({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[232px] rounded-[44px] bg-navy-950 p-[9px] shadow-float ring-1 ring-white/10">
      {/* Side buttons */}
      <span className="absolute -left-[3px] top-[96px] h-[28px] w-[3px] rounded-l-sm bg-navy-950" />
      <span className="absolute -left-[3px] top-[136px] h-[46px] w-[3px] rounded-l-sm bg-navy-950" />
      <span className="absolute -right-[3px] top-[120px] h-[64px] w-[3px] rounded-r-sm bg-navy-950" />

      <div className="relative flex h-[454px] flex-col overflow-hidden rounded-[35px] bg-linear-to-b from-surface to-white">
        {/* Camera cutout */}
        <span className="absolute left-1/2 top-[10px] z-10 h-[22px] w-[76px] -translate-x-1/2 rounded-full bg-navy-950" />

        {/* Status bar */}
        <div className="flex h-[40px] shrink-0 items-center justify-between px-[24px] pt-[4px] text-[11px] font-semibold text-navy">
          <span>9:41</span>
          <span className="flex items-center gap-[4px]">
            <Signal className="size-[12px]" strokeWidth={2.5} />
            <Wifi className="size-[12px]" strokeWidth={2.5} />
            <BatteryFull className="size-[15px]" strokeWidth={2} />
          </span>
        </div>

        <div className="min-h-0 flex-1">{children}</div>

        {/* Home indicator */}
        <span className="mx-auto mb-[8px] mt-[4px] h-[4px] w-[96px] shrink-0 rounded-full bg-navy/80" />
      </div>
    </div>
  );
}