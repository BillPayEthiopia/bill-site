"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { howItWorksContent } from "@/content/howItWorks";
import { cn } from "@/lib/utils";

/** Scroll progress (0–1) at which step i lights up. */
function threshold(index: number, count: number) {
  return 0.08 + (index / (count - 1)) * 0.84;
}

/** The line between step i and step i+1. Fills as progress moves between their thresholds. */
function Connector({ progress, from, to }: { progress: MotionValue<number>; from: number; to: number }) {
  const fill = useTransform(progress, [from, to], [0, 1]);

  return (
    <>
      {/* Vertical, on phones and tablets */}
      <div aria-hidden="true" className="absolute bottom-0 left-7 top-16 w-0.5 -translate-x-1/2 bg-line lg:hidden">
        <motion.div className="size-full origin-top bg-linear-to-b from-blue to-aqua" style={{ scaleY: fill }} />
      </div>
      {/* Horizontal, on desktop. Spans the column plus the grid gap to reach the next tile. */}
      <div aria-hidden="true" className="absolute left-1/2 top-7 hidden h-0.5 w-[calc(100%+2rem)] bg-line lg:block">
        <motion.div className="size-full origin-left bg-linear-to-r from-blue to-aqua" style={{ scaleX: fill }} />
      </div>
    </>
  );
}

export function StepsTimeline() {
  const { steps } = howItWorksContent;
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 when the list's top reaches 85% down the screen, 1 when its bottom reaches 55%.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const complete = useMotionValue(1);
  const progress = reduceMotion ? complete : smooth;

  const [reached, setReached] = useState(0);
  useMotionValueEvent(smooth, "change", (value) => {
    const count = steps.filter((_, index) => value >= threshold(index, steps.length)).length;
    setReached((previous) => (previous === count ? previous : count));
  });
  const done = reduceMotion ? steps.length : reached;

  return (
    <ol ref={ref} className="grid lg:grid-cols-3 lg:gap-8">
      {steps.map(({ title, description, icon: Icon }, index) => {
        const active = index < done;
        const last = index === steps.length - 1;

        return (
          <li
            key={title}
            className={cn(
              "relative flex gap-5 lg:flex-col lg:items-center lg:text-center",
              !last && "pb-12 lg:pb-0",
            )}
          >
            {!last && (
              <Connector
                progress={progress}
                from={threshold(index, steps.length)}
                to={threshold(index + 1, steps.length)}
              />
            )}

            <div className="relative z-10 shrink-0">
              <div
                className={cn(
                  "flex size-14 items-center justify-center rounded-2xl border transition-[background-color,border-color,color,box-shadow,scale] duration-500 ease-brand",
                  active
                    ? "scale-105 border-navy bg-navy text-white shadow-lift"
                    : "border-line bg-white text-blue shadow-card",
                )}
              >
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <span
                className={cn(
                  "absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full font-display text-xs font-bold transition-colors duration-500",
                  active ? "bg-aqua text-navy" : "bg-navy-50 text-navy",
                )}
              >
                {index + 1}
              </span>
            </div>

            <div className="pt-1 lg:max-w-xs lg:pt-6">
              <h3 className="font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}