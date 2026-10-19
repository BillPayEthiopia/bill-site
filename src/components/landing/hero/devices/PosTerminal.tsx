"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import type { PosStage } from "@/content/hero";
import { EASE_BRAND } from "@/lib/motion";
import { formatETB } from "@/lib/utils";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

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

/** A handheld card terminal: screen, keypad, and a receipt that prints on approval. About 128×230. */
export function PosTerminal({ stage, amount }: { stage: PosStage; amount: number }) {
  const approved = stage === "approved";

  return (
    <div className="relative w-[128px]">
      {/* Receipt printing out of the top slot */}
      <motion.div
        className="absolute inset-x-[24px] bottom-[calc(100%-12px)] overflow-hidden"
        initial={false}
        animate={{ height: approved ? 36 : 0 }}
        transition={{ duration: 0.9, delay: approved ? 0.3 : 0, ease: EASE_BRAND }}
      >
        <div className="absolute inset-x-0 top-0 h-[36px] bg-white px-[6px] pt-[5px] shadow-card">
          <p className="text-[6px] font-semibold uppercase tracking-wider text-mortar">Approved</p>
          <p className="font-display text-[8px] font-bold tabular-nums text-navy">ETB {formatETB(amount)}</p>
        </div>
      </motion.div>

      <div className="relative rounded-[22px] bg-linear-to-b from-navy to-navy-950 p-[10px] pt-[16px] shadow-float ring-1 ring-white/10">
        {/* Printer slot */}
        <span className="absolute inset-x-[20px] top-[6px] h-[4px] rounded-full bg-navy-950 ring-1 ring-white/10" />

        {/* Screen */}
        <div className="relative h-[104px] overflow-hidden rounded-[10px] bg-white">
          <div className="flex items-center justify-between px-[8px] pt-[6px]">
            <Logo variant="monogram" className="w-[12px]" />
            <Contactless className="size-[11px] text-blue" />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {approved ? (
              <motion.div
                key="approved"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE_BRAND }}
                className="flex flex-col items-center pt-[6px] text-center"
              >
                <span className="flex size-[30px] items-center justify-center rounded-full bg-aqua text-navy">
                  <svg viewBox="0 0 24 24" className="size-[16px]" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.15, ease: EASE_BRAND }}
                    />
                  </svg>
                </span>
                <p className="mt-[5px] font-display text-[11px] font-bold text-navy">Approved</p>
                <p className="text-[8px] tabular-nums text-mortar">ETB {formatETB(amount)}</p>
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE_BRAND }}
                className="flex flex-col items-center pt-[4px] text-center"
              >
                <p className="text-[7px] uppercase tracking-wider text-mortar">Amount</p>
                <p className="font-display text-[12px] font-bold tabular-nums text-navy">ETB {formatETB(amount)}</p>
                <Contactless pulse className="mt-[4px] size-[26px] text-blue" />
                <p className="text-[7px] text-mortar">Tap to pay</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Keypad: numbers, then cancel / clear / enter */}
        <div className="mt-[9px] grid grid-cols-3 gap-[5px]">
          {KEYS.map((key) => (
            <span key={key} className="flex h-[14px] items-center justify-center rounded-[4px] bg-white/10 text-[7px] font-semibold text-white/70">
              {key}
            </span>
          ))}
          <span className="h-[14px] rounded-[4px] bg-[#e5484d]/85" />
          <span className="h-[14px] rounded-[4px] bg-[#f5b74f]/85" />
          <span className="h-[14px] rounded-[4px] bg-success/90" />
        </div>
      </div>
    </div>
  );
}