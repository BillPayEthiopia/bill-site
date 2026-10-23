"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Float } from "@/components/animations/Float";
import { heroDemo, METHOD_LABELS, type DemoTransaction, type PosStage } from "@/content/hero";
import { EASE_BRAND } from "@/lib/motion";
import { DashboardScreen } from "./devices/DashboardScreen";
import { Laptop } from "./devices/Laptop";
import { PosTerminal } from "./devices/PosTerminal";
import { Tablet } from "./devices/Tablet";
import { TabletScreen } from "./devices/TabletScreen";

/** Online payments land on the dashboard every 7.4s; the first one sooner. */
const ONLINE_MS = { first: 3700, every: 7400 };
/** POS payments land between the online ones. */
const POS_MS = { firstReady: 7900, ready: 3300, approved: 4100 };

/**
 * Resting tilt in degrees. The side under the headline leans away, so the devices
 * feel like they sit behind the text. Set both to 0 for a flat look.
 */
const BASE_TILT = { x: 0, y: 0 };

type DeviceId = "laptop" | "tablet" | "pos";
type Placement = { x: number; y: number; scale?: number };
type Composition = { width: number; height: number; place: Record<DeviceId, Placement> };

/*
 * Design canvases. Devices are drawn at real size and positioned in px,
 * then the whole canvas is scaled to fit the stage.
 *
 * The laptop is the centered anchor. The POS (left) and tablet (right) come
 * forward at the bottom corners, covering only the laptop's edges, so its
 * chart and payments list stay readable.
 */

const FULL: Composition = {
  width: 760,
  height: 490,
  place: {
    laptop: { x: 80, y: 0 },
    pos: { x: 100, y: 165, scale: 0.92 },
    tablet: { x: 486, y: 266, scale: 0.85 },
  },
};

/** Phones: the same arrangement, smaller. */
const COMPACT: Composition = {
  width: 420,
  height: 420,
  place: {
    laptop: { x: 24, y: 0, scale: 0.62 },
    pos: { x: 8, y: 150, scale: 0.7 },
    tablet: { x: 226, y: 210, scale: 0.6 },
  },
};

/** Picks the composition for this screen and scales it to the stage's width. */
function useComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ comp: FULL, scale: 1 });

  // Layout effect: measured before the first paint, so devices never jump into place.
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const wide = window.matchMedia("(min-width: 640px)");

    const update = () => {
      const comp = wide.matches ? FULL : COMPACT;
      setLayout({ comp, scale: element.clientWidth / comp.width });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    wide.addEventListener("change", update);
    return () => {
      observer.disconnect();
      wide.removeEventListener("change", update);
    };
  }, []);

  return [ref, layout] as const;
}

type DeviceProps = {
  place: Placement;
  depth: number;
  delay: number;
  float?: { distance: number; duration: number; delay: number };
  children: ReactNode;
};

/** Positions one device, rises it in on load, and optionally floats it. */
function Device({ place, depth, delay, float, children }: DeviceProps) {
  return (
    <motion.div
      className="absolute origin-top-left"
      style={{ left: place.x, top: place.y, z: depth, scale: place.scale ?? 1 }}
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: EASE_BRAND }}
    >
      {float ? <Float {...float}>{children}</Float> : children}
    </motion.div>
  );
}

export function HeroVisual() {
  const [stageRef, { comp, scale }] = useComposition();
  const inView = useInView(stageRef, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const live = !reduceMotion && inView;

  // ---- Shared ledger: every payment lands in the dashboard and tablet ----
  const [transactions, setTransactions] = useState<DemoTransaction[]>(heroDemo.initialTransactions);
  const [total, setTotal] = useState(heroDemo.baseVolume);
  const [count, setCount] = useState(heroDemo.baseCount);
  const nextId = useRef(heroDemo.initialTransactions.length);

  const record = useCallback((amount: number, method: string) => {
    const id = nextId.current++;
    setTransactions((previous) => [{ id, kind: "received" as const, amount, method }, ...previous].slice(0, 4));
    setTotal((current) => current + amount);
    setCount((current) => current + 1);
  }, []);

  // ---- Online payments: arrive on the dashboard on a steady rhythm ----
  const [onlineCycle, setOnlineCycle] = useState(0);

  useEffect(() => {
    if (!live) return;
    const timer = window.setTimeout(
      () => {
        const order = heroDemo.orders[onlineCycle % heroDemo.orders.length];
        record(order.amount, METHOD_LABELS[order.method]);
        setOnlineCycle((current) => current + 1);
      },
      onlineCycle === 0 ? ONLINE_MS.first : ONLINE_MS.every,
    );
    return () => window.clearTimeout(timer);
  }, [live, onlineCycle, record]);

  // ---- POS: tap to pay → approved ----
  const [posStage, setPosStage] = useState<PosStage>("ready");
  const [posCycle, setPosCycle] = useState(0);
  const posAmount = heroDemo.posOrders[posCycle % heroDemo.posOrders.length];

  useEffect(() => {
    if (!live) return;
    const wait =
      posStage === "approved" ? POS_MS.approved : posCycle === 0 ? POS_MS.firstReady : POS_MS.ready;
    const timer = window.setTimeout(() => {
      if (posStage === "ready") {
        setPosStage("approved");
        record(posAmount, "POS · Card");
      } else {
        setPosStage("ready");
        setPosCycle((current) => current + 1);
      }
    }, wait);
    return () => window.clearTimeout(timer);
  }, [live, posStage, posCycle, posAmount, record]);

  // Reduced motion: show the finished, successful state, standing still.
  const posShown: PosStage = reduceMotion ? "approved" : posStage;
  const today = heroDemo.todayBase + (total - heroDemo.baseVolume);

  // ---- 3D tilt: a resting angle, plus a gentle lean toward the mouse ----
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [BASE_TILT.y - 5, BASE_TILT.y + 5]), spring);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [BASE_TILT.x + 4, BASE_TILT.x - 4]), spring);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    // Decorative: hidden from screen readers so sample data is never read as real.
    <div
      ref={stageRef}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="relative mx-auto aspect-[420/420] w-full max-w-[26rem] sm:aspect-[760/490] sm:max-w-[44rem] lg:max-w-none"
    >
      {/* Glows behind the devices */}
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-aqua/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 size-1/3 rounded-full bg-blue/15 blur-3xl" />

      {/* The design canvas, scaled to fit */}
      <div
        className="absolute left-0 top-0 origin-top-left [perspective:1600px]"
        style={{ width: comp.width, height: comp.height, transform: `scale(${scale})` }}
      >
        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative size-full">
          <Device place={comp.place.laptop} depth={0} delay={0.15}>
            <Laptop>
              <DashboardScreen total={total} count={count} transactions={transactions} />
            </Laptop>
          </Device>

          <Device place={comp.place.tablet} depth={20} delay={0.45} float={{ distance: 6, duration: 7, delay: 1.2 }}>
            <Tablet>
              <TabletScreen today={today} />
            </Tablet>
          </Device>

          <Device place={comp.place.pos} depth={30} delay={0.65} float={{ distance: 7, duration: 5.5, delay: 0 }}>
            <PosTerminal stage={posShown} amount={posAmount} />
          </Device>
        </motion.div>
      </div>
    </div>
  );
}