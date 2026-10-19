"use client";

import { motion } from "motion/react";
import { heroDemo } from "@/content/hero";
import { EASE_BRAND } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CountUp } from "../CountUp";

/** In-store overview: today's sales, sales through the day, and the split by channel. */
export function TabletScreen({ today }: { today: number }) {
  const { hourly, channels } = heroDemo;

  return (
    <div className="flex h-full flex-col bg-surface p-[12px] text-navy">
      <div className="flex items-center justify-between">
        <p className="font-display text-[11px] font-bold">Today’s sales</p>
        <span className="rounded-full bg-white px-[6px] py-[2px] text-[7px] font-semibold uppercase tracking-wider text-mortar ring-1 ring-line">
          Sample data
        </span>
      </div>
      <CountUp kind="etb" value={today} className="mt-[2px] block font-display text-[18px] font-bold tabular-nums" />

      <div className="mt-[8px] flex min-h-0 flex-1 gap-[12px]">
        <div className="flex flex-1 items-end gap-[5px] rounded-[10px] bg-white p-[8px] ring-1 ring-line">
          {hourly.map((height, index) => (
            <motion.span
              key={index}
              className={cn(
                "flex-1 origin-bottom rounded-t-[3px]",
                index === hourly.length - 1 ? "bg-aqua" : "bg-blue/70",
              )}
              style={{ height: `${height}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.06, ease: EASE_BRAND }}
            />
          ))}
        </div>

        <ul className="w-[104px] space-y-[7px] self-center">
          {channels.map(({ label, share }) => (
            <li key={label}>
              <div className="flex justify-between text-[8px]">
                <span>{label}</span>
                <span className="font-semibold tabular-nums">{share}%</span>
              </div>
              <div className="mt-[2px] h-[3px] rounded-full bg-line">
                <div className="h-full rounded-full bg-blue" style={{ width: `${share}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}