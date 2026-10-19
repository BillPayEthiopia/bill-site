"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/* Drawing space. The SVG stretches it to the hero's full width. */
const WIDTH = 1440;
const HEIGHT = 260;
const SEGMENTS = 48;

/* Wave shape: a long swell plus a shorter ripple moving the other way. */
const LONG = (2 * Math.PI) / 900;
const SHORT = (2 * Math.PI) / 380;

/* Cursor response: how high the ribbons rise, and how wide the swell is. */
const MAX_LIFT = 42;
const SPREAD = 180;

type Ribbon = { base: number; phase: number; lift: number; className: string };

/** Three ribbons, echoing the logo's three bands. */
const RIBBONS: Ribbon[] = [
  { base: 150, phase: 0, lift: 1, className: "stroke-navy/6" },
  { base: 190, phase: 0.9, lift: 0.8, className: "stroke-aqua/20" },
  { base: 230, phase: 1.8, lift: 0.6, className: "stroke-blue/10" },
];

/** Builds one ribbon's path for a moment in time, with a swell under the cursor. */
function buildPath({ base, phase, lift }: Ribbon, time: number, pointerX: number, pointerLift: number) {
  const points: [number, number][] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const x = (i / SEGMENTS) * WIDTH;
    const wave =
      Math.sin(x * LONG + time * 0.35 + phase) * 34 +
      Math.sin(x * SHORT - time * 0.6 + phase * 1.7) * 12;
    const swell = pointerLift * lift * Math.exp(-((x - pointerX) ** 2) / (2 * SPREAD ** 2));
    points.push([x, base + wave - swell]);
  }

  // Smooth curve: each point becomes a control point, joined at the midpoints.
  let d = `M0 ${points[0][1].toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const [nextX, nextY] = points[i + 1];
    d += ` Q${x.toFixed(1)} ${y.toFixed(1)} ${((x + nextX) / 2).toFixed(1)} ${((y + nextY) / 2).toFixed(1)}`;
  }
  const [lastX, lastY] = points[points.length - 1];
  return `${d} L${lastX} ${lastY.toFixed(1)}`;
}

/** Eases `value` toward `target` at the same speed on 60Hz and 120Hz screens. */
function approach(value: number, target: number, rate: number, dt: number) {
  return value + (target - value) * (1 - Math.pow(1 - rate, dt * 60));
}

export function HeroWaves() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    const section = svg?.closest("section");
    // Reduced motion: keep the still waves rendered on the server.
    if (!svg || !section || reduceMotion) return;

    const pointer = { x: WIDTH / 2, targetX: WIDTH / 2, lift: 0, targetLift: 0 };
    let time = 0;
    let scrollBoost = 0;
    let lastScroll = window.scrollY;
    let lastFrame = 0;
    let frame = 0;

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const rect = svg!.getBoundingClientRect();
      pointer.targetX = ((event.clientX - rect.left) / rect.width) * WIDTH;
      // Stronger the closer the cursor is to the waves.
      const distance = Math.max(0, rect.top - event.clientY);
      pointer.targetLift = MAX_LIFT * Math.exp(-distance / 350);
    }

    function onPointerLeave() {
      pointer.targetLift = 0;
    }

    function onScroll() {
      const y = window.scrollY;
      scrollBoost += Math.abs(y - lastScroll) * 0.0015;
      lastScroll = y;
    }

    function tick(now: number) {
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      pointer.x = approach(pointer.x, pointer.targetX, 0.06, dt);
      pointer.lift = approach(pointer.lift, pointer.targetLift, 0.05, dt);

      // Scrolling pushes the waves forward, then the push fades out.
      time += dt + scrollBoost;
      scrollBoost *= Math.pow(0.9, dt * 60);

      RIBBONS.forEach((ribbon, index) => {
        pathRefs.current[index]?.setAttribute("d", buildPath(ribbon, time, pointer.x, pointer.lift));
      });

      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (frame) return;
      lastFrame = performance.now();
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    }

    // Only animate while the hero is on screen.
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    observer.observe(svg);

    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      observer.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduceMotion]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="absolute inset-x-0 -bottom-12 h-64 w-full"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      fill="none"
    >
      {RIBBONS.map((ribbon, index) => (
        <path
          key={ribbon.base}
          ref={(element) => {
            pathRefs.current[index] = element;
          }}
          d={buildPath(ribbon, 0, WIDTH / 2, 0)}
          className={ribbon.className}
          strokeWidth="36"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}