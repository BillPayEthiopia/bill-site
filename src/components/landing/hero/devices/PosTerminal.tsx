"use client";

import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BatteryFull } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import type { PosStage } from "@/content/hero";
import { EASE_BRAND } from "@/lib/motion";
import { cn, formatETB } from "@/lib/utils";

/**
 * The terminal lies back and turns slightly, like a device resting on a counter:
 * the printer end recedes, the keypad end comes toward you.
 */
const SLANT: CSSProperties = {
  transform: "perspective(900px) rotateX(22deg) rotateZ(12deg)",
};

/** Digit, plus the small letters printed on real terminal keys. */
const KEYS: [string, string][] = [
  ["1", "QZ"], ["2", "ABC"], ["3", "DEF"],
  ["4", "GHI"], ["5", "JKL"], ["6", "MNO"],
  ["7", "PRS"], ["8", "TUV"], ["9", "WXY"],
  ["F", ""], ["0", ""], [".", ""],
];

/** Raised plastic key: a faint highlight on top, a dark edge underneath. */
const key =
  "bg-linear-to-b from-[#3d424b] to-[#1b1e23] shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_2px_0_rgb(0_0_0/0.55)]";

/** The contactless symbol. With `pulse`, its waves ripple outward. */
function Contactless({ pulse = false, className }: { pulse?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion();
  const animated = pulse && !reduceMotion;
  const arcs = ["M7 9.5a3.5 3.5 0 0 1 0 5", "M10.5 7a7 7 0 0 1 0 10", "M14 4.5a10.5 10.5 0 0 1 0 15"];

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" className={className}>
      {arcs.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          animate={animated ? { opacity: [0.25, 1, 0.25] } : { opacity: 1 }}
          transition={
            animated
              ? { duration: 1.4, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
          }
        />
      ))}
    </svg>
  );
}

/** A countertop card terminal: printer head, recessed screen, raised keypad. About 150×345. */
export function PosTerminal({ stage, amount }: { stage: PosStage; amount: number }) {
  const approved = stage === "approved";

  return (
    <div className="relative w-[148px]" style={SLANT}>
      {/* Receipt, printing out from behind the printer cover */}
      <motion.div
        className="absolute inset-x-[30px] bottom-[calc(100%-14px)] overflow-hidden"
        initial={false}
        animate={{ height: approved ? 46 : 0 }}
        transition={{ duration: 0.9, delay: approved ? 0.35 : 0, ease: EASE_BRAND }}
      >
        <div className="absolute inset-x-0 top-0 h-[46px] bg-white px-[7px] pt-[6px] shadow-card">
          <p className="text-[6px] font-semibold uppercase tracking-wider text-mortar">Approved</p>
          <p className="font-display text-[9px] font-bold tabular-nums text-navy">ETB {formatETB(amount)}</p>
          <div className="mt-[4px] space-y-[3px]">
            <span className="block h-[2px] w-3/4 rounded bg-line" />
            <span className="block h-[2px] w-1/2 rounded bg-line" />
          </div>
        </div>
      </motion.div>

      {/* Printer head */}
      <div className="relative z-10 h-[46px] rounded-b-[12px] rounded-t-[34px] bg-linear-to-b from-[#464c56] to-[#1d2127] shadow-[5px_6px_0_#0d0f12]">
        <span className="absolute inset-x-[26px] top-[9px] h-[3px] rounded-full bg-black/70 shadow-[0_1px_0_rgb(255_255_255/0.12)]" />
        <div className="absolute inset-x-0 bottom-[9px] flex justify-center">
          <Logo variant="reversed" className="w-[40px]" />
        </div>
      </div>

      {/* Body */}
      <div className="relative -mt-[8px] rounded-b-[30px] rounded-t-[10px] bg-linear-to-b from-[#f2f4f7] via-[#dde1e7] to-[#c3c9d2] px-[12px] pb-[24px] pt-[16px] shadow-[5px_6px_0_#9aa1ab,0_28px_40px_-12px_rgb(27_52_97/0.5)]">
        {/* Recessed screen */}
        <div className="rounded-[12px] bg-[#171a1f] p-[5px] shadow-[inset_0_2px_4px_rgb(0_0_0/0.6)]">
          <div className="relative h-[86px] overflow-hidden rounded-[7px] bg-linear-to-b from-white to-[#eef2f7]">
            <div className="flex items-center justify-between px-[6px] pt-[4px] text-[6px] font-semibold text-navy/70">
              <span>10:00</span>
              <BatteryFull className="size-[9px]" />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {approved ? (
                <motion.div
                  key="approved"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_BRAND }}
                  className="flex flex-col items-center pt-[3px] text-center"
                >
                  <span className="flex size-[26px] items-center justify-center rounded-full bg-aqua text-navy">
                    <svg viewBox="0 0 24 24" className="size-[14px]" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <motion.path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.15, ease: EASE_BRAND }}
                      />
                    </svg>
                  </span>
                  <p className="mt-[4px] font-display text-[11px] font-bold text-navy">Approved</p>
                  <p className="text-[7px] tabular-nums text-mortar">ETB {formatETB(amount)}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.35, ease: EASE_BRAND }}
                  className="flex flex-col items-center pt-[2px] text-center"
                >
                  <p className="text-[6px] uppercase tracking-wider text-mortar">Amount</p>
                  <p className="font-display text-[13px] font-bold tabular-nums text-navy">ETB {formatETB(amount)}</p>
                  <Contactless pulse className="mt-[3px] size-[20px] text-blue" />
                  <p className="mt-[1px] text-[6px] text-mortar">Insert or tap card</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Function keys and navigation button */}
        <div className="mt-[9px] flex items-center gap-[4px] px-[2px]">
          <span className={cn("h-[9px] flex-1 rounded-[3px]", key)} />
          <span className={cn("h-[9px] flex-1 rounded-[3px]", key)} />
          <span className={cn("size-[16px] shrink-0 rounded-full", key)} />
          <span className={cn("h-[9px] flex-1 rounded-[3px]", key)} />
          <span className={cn("h-[9px] flex-1 rounded-[3px]", key)} />
        </div>

        {/* Keypad */}
        <div className="mt-[9px] grid grid-cols-3 gap-x-[7px] gap-y-[6px]">
          {KEYS.map(([digit, letters]) => (
            <span key={digit} className={cn("flex h-[15px] items-center justify-center gap-[2px] rounded-[5px] text-white", key)}>
              <span className="text-[8px] font-bold leading-none">{digit}</span>
              {letters && <span className="text-[4px] font-semibold leading-none text-white/70">{letters}</span>}
            </span>
          ))}
        </div>

        {/* Cancel, clear, enter */}
        <div className="mt-[7px] grid grid-cols-3 gap-x-[7px]">
          <span className="flex h-[14px] items-center justify-center rounded-[5px] bg-linear-to-b from-[#f0646a] to-[#c9343b] text-[7px] font-bold text-white/90 shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_2px_0_#8f2228]">
            ✕
          </span>
          <span className="flex h-[14px] items-center justify-center rounded-[5px] bg-linear-to-b from-[#f9cf6b] to-[#dca431] text-[8px] font-bold text-[#7a5a12] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_2px_0_#9c7116]">
            ‹
          </span>
          <span className="flex h-[14px] items-center justify-center rounded-[5px] bg-linear-to-b from-[#45c98a] to-[#1f9a60] text-[7px] font-bold text-white/90 shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_2px_0_#146a41]">
            ○
          </span>
        </div>

        {/* Card slot (empty) */}
        <span className="absolute inset-x-[24px] bottom-[12px] h-[4px] rounded-full bg-[#2a2e35] shadow-[inset_0_1px_2px_rgb(0_0_0/0.7),0_1px_0_rgb(255_255_255/0.6)]" />
      </div>
    </div>
  );
}