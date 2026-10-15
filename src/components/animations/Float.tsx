"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type FloatProps = {
  children: ReactNode;
  /** How far it rises, in pixels. */
  distance?: number;
  /** Seconds for one full up-and-down cycle. */
  duration?: number;
  delay?: number;
  className?: string;
};

/** Gently bobs its content up and down, forever. Disabled for reduced motion. */
export function Float({ children, distance = 10, duration = 6, delay = 0, className }: FloatProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reduceMotion ? undefined : { y: [0, -distance, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}