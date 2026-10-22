"use client";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselProps = {
  /** <li> items. Set each one's width, e.g. "w-[85%] sm:w-[46%] lg:w-[30%]". */
  children: ReactNode;
  label: string;
};

const arrowClass =
  "flex size-11 items-center justify-center rounded-full border border-line bg-white text-navy shadow-card " +
  "transition-[background-color,color,border-color,opacity] duration-300 ease-brand " +
  "hover:border-navy hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-35";

/** A horizontal row you can drag, swipe, or step through with arrows. Snaps to cards. */
export function Carousel({ children, label }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });
  const [dragging, setDragging] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);

  function update() {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= max - 4);
    setProgress(max > 0 ? track.scrollLeft / max : 1);
  }

  useEffect(() => {
    update();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  /** Moves one card left or right. */
  function step(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = card ? card.offsetWidth + gap : track.clientWidth * 0.8;
    track.scrollBy({ left: distance * direction, behavior: "smooth" });
  }

  /** After a drag, glide to the card closest to the left edge. */
  function settle() {
    const track = trackRef.current;
    if (!track) return;
    const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const items = Array.from(track.children) as HTMLElement[];
    const target = items.reduce(
      (best, item) => {
        const left = item.offsetLeft - padding;
        return Math.abs(left - track.scrollLeft) < Math.abs(best - track.scrollLeft) ? left : best;
      },
      Infinity,
    );
    track.scrollTo({ left: target, behavior: "smooth" });
    // Turn snapping back on once the glide has finished.
    window.setTimeout(() => setDragging(false), 450);
  }

  // ---- Mouse dragging (touch screens already swipe natively) ----
  function handlePointerDown(event: PointerEvent<HTMLUListElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0 || !trackRef.current) return;
    drag.current = { active: true, moved: false, startX: event.clientX, startScroll: trackRef.current.scrollLeft };
  }

  function handlePointerMove(event: PointerEvent<HTMLUListElement>) {
    const state = drag.current;
    const track = trackRef.current;
    if (!state.active || !track) return;
    const dx = event.clientX - state.startX;
    if (!state.moved && Math.abs(dx) > 5) {
      state.moved = true;
      setDragging(true);
      track.setPointerCapture(event.pointerId);
    }
    if (state.moved) track.scrollLeft = state.startScroll - dx;
  }

  function handlePointerUp() {
    const state = drag.current;
    if (!state.active) return;
    state.active = false;
    if (state.moved) settle();
  }

  /** A drag that ends over a link shouldn't open it. */
  function handleClickCapture(event: MouseEvent) {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={trackRef}
        onScroll={update}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
        onDragStart={(event) => event.preventDefault()}
        className={cn(
          // Bleeds to the screen edge on small screens, with room above and below for hover lift and shadows.
          "relative -mx-5 -my-6 flex gap-5 overflow-x-auto px-5 py-6 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10",
          "scroll-px-5 sm:scroll-px-8 lg:scroll-px-10 [&::-webkit-scrollbar]:hidden",
          dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory",
        )}
      >
        {children}
      </ul>

      {/* Progress and arrows */}
      <div className="mt-8 flex items-center gap-6">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-linear-to-r from-blue to-aqua transition-[width] duration-200"
            style={{ width: `${Math.max(progress, 0.08) * 100}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous" className={arrowClass}>
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next" className={arrowClass}>
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}