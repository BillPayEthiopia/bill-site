"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** The wavy edge, left to right, in two shapes it breathes between. */
const EDGES: [string, string] = [
  "M0 34 C 240 70, 480 6, 720 38 S 1200 74, 1440 30",
  "M0 44 C 260 58, 460 18, 720 30 S 1180 62, 1440 42",
];

/** The neighbouring section's color fills everything above the edge. */
const FILLS: [string, string] = [`${EDGES[0]} V0 H0 Z`, `${EDGES[1]} V0 H0 Z`];

const BREATHE = { duration: 10, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const };

type WaveDividerProps = {
  position: "top" | "bottom";
  /** The neighbouring section's background, e.g. "fill-white" or "fill-surface". */
  fill: string;
  /** Aqua line along the edge with a travelling glow. Best on navy sections. */
  accent?: boolean;
  className?: string;
};

/** A soft, slowly breathing wave where one section meets the next. */
export function WaveDivider({ position, fill, accent = true, className }: WaveDividerProps) {
  const still = useReducedMotion() ?? false;
  const filterId = `edge-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      fill="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-0 h-10 w-full sm:h-14 lg:h-20",
        position === "top" ? "top-0" : "bottom-0 -scale-y-100",
        className,
      )}
    >
      <defs>
        <filter id={filterId} x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <motion.path d={FILLS[0]} animate={still ? undefined : { d: FILLS, transition: BREATHE }} className={fill} />

      {accent && (
        <>
          <motion.path
            d={EDGES[0]}
            animate={still ? undefined : { d: EDGES, transition: BREATHE }}
            className="stroke-aqua/35"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
          {!still && (
            <motion.path
              d={EDGES[0]}
              pathLength={1}
              strokeDasharray="0.12 1.12"
              filter={`url(#${filterId})`}
              className="stroke-aqua"
              strokeWidth={4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ strokeDashoffset: 0.12 }}
              animate={{ d: EDGES, strokeDashoffset: [0.12, -1] }}
              transition={{
                d: BREATHE,
                strokeDashoffset: { duration: 4, delay: 1, repeat: Infinity, repeatDelay: 5, ease: [0.45, 0, 0.55, 1] },
              }}
            />
          )}
        </>
      )}
    </svg>
  );
}