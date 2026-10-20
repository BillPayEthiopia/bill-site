"use client";

import { useId } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export type RibbonConfig = {
  /** Two shapes with the same structure; the ribbon breathes between them. */
  shapes: [string, string];
  className: string;
  /** Color of the glow that travels along the ribbon. Leave out for no glow. */
  glowClassName?: string;
  /** Seconds for one breath. Use different values so ribbons never move in sync. */
  breathe: number;
  /** When this ribbon's glow first sets off, in seconds. */
  glowDelay?: number;
  /** How far the ribbon moves over the first 600px of scrolling, in px. */
  parallax?: number;
};

type FlowingRibbonsProps = {
  ribbons: RibbonConfig[];
  viewBox: string;
  className?: string;
  strokeWidth?: number;
};

const GLOW_LENGTH = 0.14;
const GLOW_TRAVEL = 3.4;
const GLOW_PAUSE = 4.5;

function Ribbon({ ribbon, still, strokeWidth, filterId }: {
  ribbon: RibbonConfig;
  still: boolean;
  strokeWidth: number;
  filterId: string;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, ribbon.parallax ?? 0]);
  const [from, to] = ribbon.shapes;
  const breathe = {
    duration: ribbon.breathe,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  };

  return (
    <motion.g style={{ y: still ? 0 : y }}>
      <motion.path
        d={from}
        animate={still ? undefined : { d: [from, to], transition: breathe }}
        className={ribbon.className}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {!still && ribbon.glowClassName && (
        <motion.path
          d={from}
          pathLength={1}
          strokeDasharray={`${GLOW_LENGTH} ${1 + GLOW_LENGTH}`}
          filter={`url(#${filterId})`}
          className={ribbon.glowClassName}
          strokeWidth={strokeWidth - 6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ strokeDashoffset: GLOW_LENGTH }}
          animate={{ d: [from, to], strokeDashoffset: [GLOW_LENGTH, -1] }}
          transition={{
            d: breathe,
            strokeDashoffset: {
              duration: GLOW_TRAVEL,
              delay: ribbon.glowDelay ?? 0,
              repeat: Infinity,
              repeatDelay: GLOW_PAUSE,
              ease: [0.45, 0, 0.55, 1],
            },
          }}
        />
      )}
    </motion.g>
  );
}

/** Decorative ribbons that slowly breathe, with soft glows travelling along them. */
export function FlowingRibbons({ ribbons, viewBox, className, strokeWidth = 36 }: FlowingRibbonsProps) {
  const still = useReducedMotion() ?? false;
  // SVG filter ids can't contain the special characters React's useId produces.
  const filterId = `glow-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      className={cn("overflow-visible", className)}
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <filter id={filterId} x="-20%" y="-100%" width="140%" height="300%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      {ribbons.map((ribbon, index) => (
        <Ribbon key={index} ribbon={ribbon} still={still} strokeWidth={strokeWidth} filterId={filterId} />
      ))}
    </svg>
  );
}