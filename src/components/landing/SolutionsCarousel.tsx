"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { solutionsContent, type Solution } from "@/content/solutions";
import { cn } from "@/lib/utils";

const items = solutionsContent.items;

const pad = (n: number) => String(n).padStart(2, "0");

const sideArrow =
  "absolute top-[30%] z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-navy shadow-float " +
  "transition-[background-color,color,border-color,opacity,scale] duration-300 ease-brand " +
  "hover:scale-105 hover:border-navy hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-0 lg:flex";

const smallArrow =
  "flex size-10 items-center justify-center rounded-full border border-line bg-white text-navy shadow-card " +
  "transition-[background-color,color,opacity] duration-300 ease-brand hover:bg-navy hover:text-white " +
  "disabled:pointer-events-none disabled:opacity-35 lg:hidden";

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  const { title, eyebrow, description, href, icon: Icon, image, alt } = solution;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-[translate,box-shadow] duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-float">
      {/* Photo */}
      <div className="relative aspect-4/3 overflow-hidden bg-navy">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            draggable={false}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 85vw"
            className="object-cover transition-transform duration-1000 ease-brand group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-blue via-navy to-navy-950">
            <Icon className="size-20 text-white/10" aria-hidden="true" />
          </div>
        )}

        {/* Navy fade at the bottom, so the eyebrow is always readable */}
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/10 to-transparent" />

        <span className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-xl bg-white/90 text-blue shadow-sm backdrop-blur transition-[background-color,color,rotate] duration-500 ease-brand group-hover:-rotate-6 group-hover:bg-aqua group-hover:text-navy">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-navy/40 px-2.5 py-1 font-display text-xs font-semibold tabular-nums text-white/90 backdrop-blur">
          {pad(index + 1)} / {pad(items.length)}
        </span>
        <p className="absolute bottom-4 left-5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-aqua">
          {eyebrow}
        </p>
      </div>

      {/* Text */}
      <div className="relative flex flex-1 flex-col p-6">
        {/* Blue-to-aqua line that draws across on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-6 top-0 h-0.5 origin-left scale-x-0 rounded-full bg-linear-to-r from-blue to-aqua transition-transform duration-500 ease-brand group-hover:scale-x-100"
        />
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed">{description}</p>
        <Link
          href={href}
          draggable={false}
          className="group/link mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-blue"
        >
          Learn more
          <ArrowRight
            className="size-4 transition-transform duration-300 ease-brand group-hover/link:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

/** Solution cards: three at a time on desktop. Drag, swipe, use the arrows, or click a dot. */
export function SolutionsCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState(0);
  const [maxIndex, setMaxIndex] = useState(Math.max(0, items.length - 3));

  /** Card step width and how far the row can go, read from the real layout. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return null;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap) || 0;
    const padding = parseFloat(style.paddingLeft) || 0;
    const step = first.offsetWidth + gap;
    const visible = Math.max(1, Math.round((track.clientWidth - padding * 2 + gap) / step));
    return { track, step, maxIndex: Math.max(0, items.length - visible) };
  }, []);

  const update = useCallback(() => {
    const m = measure();
    if (!m) return;
    setMaxIndex(m.maxIndex);
    setActive(Math.min(m.maxIndex, Math.round(m.track.scrollLeft / m.step)));
  }, [measure]);

  useEffect(() => {
    update();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, [update]);

  function goTo(index: number) {
    const m = measure();
    if (!m) return;
    const target = Math.max(0, Math.min(m.maxIndex, index));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    m.track.scrollTo({ left: target * m.step, behavior: reduce ? "auto" : "smooth" });
  }

  // ---- Mouse dragging (touch screens swipe natively) ----
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
    if (!state.moved) return;
    const m = measure();
    if (m) goTo(Math.round(m.track.scrollLeft / m.step));
    // Turn snapping back on once the glide has finished.
    window.setTimeout(() => setDragging(false), 450);
  }

  /** A drag that ends over a link shouldn't open it. */
  function handleClickCapture(event: MouseEvent) {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  }

  const atStart = active <= 0;
  const atEnd = active >= maxIndex;

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Solutions" onKeyDown={handleKeyDown}>
      <div className="relative">
        <button type="button" onClick={() => goTo(active - 1)} disabled={atStart} aria-label="Previous solutions" className={cn(sideArrow, "-left-6")}>
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>

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
            // Extra room around the cards so hover lift and shadows aren't cut off
            "-mx-3 -my-6 flex gap-5 overflow-x-auto px-3 py-6 scroll-px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory",
          )}
        >
          {items.map((solution, index) => (
            <li
              key={solution.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
              className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <SolutionCard solution={solution} index={index} />
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => goTo(active + 1)} disabled={atEnd} aria-label="Next solutions" className={cn(sideArrow, "-right-6")}>
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* Dots, with arrows beside them on smaller screens */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button type="button" onClick={() => goTo(active - 1)} disabled={atStart} aria-label="Previous solutions" className={smallArrow}>
          <ArrowLeft className="size-4" aria-hidden="true" />
        </button>

        <div className="flex items-center">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to position ${index + 1}`}
              aria-current={index === active || undefined}
              className="p-1.5"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-[width,background-color] duration-500 ease-brand",
                  index === active ? "w-8 bg-linear-to-r from-blue to-aqua" : "w-2 bg-navy/15 hover:bg-navy/30",
                )}
              />
            </button>
          ))}
        </div>

        <button type="button" onClick={() => goTo(active + 1)} disabled={atEnd} aria-label="Next solutions" className={smallArrow}>
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}