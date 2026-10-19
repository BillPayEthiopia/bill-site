"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { EASE_BRAND } from "@/lib/motion";
import { formatETB } from "@/lib/utils";

const FORMATS = {
  etb: (v: number) => `ETB ${formatETB(v)}`,
  count: (v: number) => Math.round(v).toLocaleString("en-US"),
};

type CountUpProps = {
  value: number;
  kind: keyof typeof FORMATS;
  className?: string;
};

/** Counts up to `value` the first time, then glides to each new value. */
export function CountUp({ value, kind, className }: CountUpProps) {
  const reduceMotion = useReducedMotion();
  const current = useMotionValue(0);
  const display = useTransform(current, FORMATS[kind]);
  const first = useRef(true);

  useEffect(() => {
    if (reduceMotion) {
      current.set(value);
      return;
    }
    const isFirst = first.current;
    first.current = false;
    const controls = animate(current, value, {
      duration: isFirst ? 1.8 : 0.8,
      delay: isFirst ? 1 : 0.1,
      ease: EASE_BRAND,
    });
    return () => controls.stop();
  }, [current, reduceMotion, value]);

  return <motion.span className={className}>{display}</motion.span>;
}