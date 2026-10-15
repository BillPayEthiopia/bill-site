"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_BRAND } from "@/lib/motion";

/** A shield outline and checkmark that draw themselves when scrolled into view. */
export function ShieldBadge() {
  const reduceMotion = useReducedMotion();

  const draw = (delay: number) => ({
    initial: reduceMotion ? { pathLength: 1 } : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: "0px 0px -60px 0px" },
    transition: { duration: 1.1, delay, ease: EASE_BRAND },
  });

  return (
    <div
      aria-hidden="true"
      className="relative flex size-24 items-center justify-center rounded-2xl bg-white shadow-float ring-1 ring-navy/8"
    >
      {!reduceMotion && (
        <motion.span
          className="absolute inset-0 rounded-2xl ring-2 ring-aqua"
          initial={{ opacity: 0, scale: 1 }}
          whileInView={{ opacity: [0, 0.6, 0], scale: [1, 1.25, 1.25] }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 2.1, repeat: Infinity, repeatDelay: 1.5, ease: "easeOut" }}
        />
      )}
      <svg viewBox="0 0 48 48" className="size-14" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M24 4 L40 10 V22 C40 32 33 40 24 44 C15 40 8 32 8 22 V10 Z"
          className="stroke-navy"
          strokeWidth={2.5}
          {...draw(0)}
        />
        <motion.path
          d="M24 4 L40 10 V22 C40 32 33 40 24 44 C15 40 8 32 8 22 V10 Z"
          className="fill-blue-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
        />
        <motion.path d="M17 24 l5 5 l9 -10" className="stroke-aqua" strokeWidth={3.5} {...draw(0.9)} />
      </svg>
    </div>
  );
}