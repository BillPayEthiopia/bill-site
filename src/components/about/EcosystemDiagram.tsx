"use client";

import { motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { aboutContent } from "@/content/about";

/** Five points around the centre, as % of the square, clockwise from the top. */
const POSITIONS: [number, number][] = [
  [50, 12],
  [86, 38],
  [72, 81],
  [28, 81],
  [14, 38],
];

/** Billpay at the centre, connected to everyone it serves, with payments pulsing both ways. */
export function EcosystemDiagram() {
  const { nodes } = aboutContent.overview;
  const still = useReducedMotion() ?? false;

  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <div className="absolute inset-[18%] rounded-full bg-aqua/15 blur-3xl" />

      {/* Connections and pulses */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
        <circle cx="50" cy="50" r="38" className="fill-none stroke-blue/10" strokeWidth="0.3" strokeDasharray="1 1.5" />
        {POSITIONS.map(([x, y], index) => {
          // Alternate direction: payments flow in to Billpay and out to the network.
          const inbound = index % 2 === 1;
          return (
            <g key={index}>
              <line x1="50" y1="50" x2={x} y2={y} className="stroke-blue/20" strokeWidth="0.4" />
              {!still && (
                <motion.circle
                  r="1.3"
                  className="fill-aqua"
                  initial={{ cx: inbound ? x : 50, cy: inbound ? y : 50, opacity: 0 }}
                  animate={{
                    cx: inbound ? [x, 50] : [50, x],
                    cy: inbound ? [y, 50] : [50, y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ duration: 2.2, delay: index * 0.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Billpay at the centre */}
      <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-float ring-1 ring-navy/8 sm:size-28">
        {!still && (
          <motion.span
            className="absolute inset-0 rounded-full ring-2 ring-aqua"
            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <Logo variant="monogram" className="w-10 sm:w-12" />
      </div>

      {/* The network */}
      {nodes.map(({ label, icon: Icon }, index) => {
        const [x, y] = POSITIONS[index];
        return (
          <div
            key={label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl bg-white px-3 py-2.5 shadow-card ring-1 ring-line"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue">
              <Icon className="size-4.5" />
            </span>
            <span className="whitespace-nowrap font-display text-xs font-semibold text-navy">{label}</span>
          </div>
        );
      })}
    </div>
  );
}