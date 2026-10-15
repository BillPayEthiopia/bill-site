"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { EASE_BRAND } from "@/lib/motion";
import { formatETB } from "@/lib/utils";

const LINE = "M0 64 C 24 60, 36 50, 56 52 S 92 40, 112 42 S 148 24, 168 28 S 204 12, 240 8";
const AREA = `${LINE} L 240 88 L 0 88 Z`;

export function VolumeCard({ total }: { total: number }) {
  const reduceMotion = useReducedMotion();
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => `ETB ${formatETB(v)}`);
  const hasAnimated = useRef(false);

  // Count up to the total. First time slowly, later updates quickly.
  useEffect(() => {
    if (reduceMotion) {
      value.set(total);
      return;
    }
    const first = !hasAnimated.current;
    hasAnimated.current = true;
    const controls = animate(value, total, {
      duration: first ? 1.8 : 0.8,
      delay: first ? 0.9 : 0.1,
      ease: EASE_BRAND,
    });
    return () => controls.stop();
  }, [reduceMotion, total, value]);

  return (
    <div className="w-[17rem] rounded-card border border-line/60 bg-white p-4 shadow-float">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider">Total volume</p>
        <span className="text-[11px]">This week</span>
      </div>
      <motion.p className="mt-1 font-display text-xl font-bold tabular-nums text-navy">{display}</motion.p>

      <svg viewBox="0 0 240 88" className="mt-3 h-20 w-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="hero-volume-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--color-aqua)", stopOpacity: 0.35 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-aqua)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        <motion.path
          d={AREA}
          fill="url(#hero-volume-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        />
        <motion.path
          d={LINE}
          className="stroke-blue"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.9, ease: EASE_BRAND }}
        />
        <motion.circle
          cx={240}
          cy={8}
          r={4}
          className="fill-blue"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.4, type: "spring", bounce: 0.5 }}
        />
        {!reduceMotion && (
          <motion.circle
            cx={240}
            cy={8}
            className="fill-aqua"
            initial={{ r: 4, opacity: 0 }}
            animate={{ r: [4, 12], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, delay: 2.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </svg>
    </div>
  );
}