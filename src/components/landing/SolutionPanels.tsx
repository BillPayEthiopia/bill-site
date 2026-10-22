"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type PanelItem = {
  title: string;
  description: string;
  href: string;
  image?: string;
  alt: string;
  /** A rendered icon element, e.g. <Landmark className="size-5" />. */
  icon: ReactNode;
};

/** A row of photo panels. One is open; hovering, tapping, or tabbing to another opens it. */
export function SolutionPanels({ items }: { items: PanelItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="flex flex-col gap-3 lg:h-[32rem] lg:flex-row">
      {items.map((item, index) => {
        const open = index === active;

        return (
          <li
            key={item.title}
            onMouseEnter={() => setActive(index)}
            className={cn(
              "relative isolate overflow-hidden rounded-card bg-navy shadow-card",
              "transition-[flex-grow,height,box-shadow] duration-700 ease-brand",
              open ? "h-[26rem] shadow-float lg:h-auto lg:flex-[4]" : "h-20 lg:h-auto lg:flex-1",
            )}
          >
            {/* Photo, or a brand gradient until the photo exists */}
            {item.image ? (
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className={cn(
                  "-z-10 object-cover transition-transform duration-1000 ease-brand",
                  open ? "scale-100" : "scale-110",
                )}
              />
            ) : (
              <div className="absolute inset-0 -z-10 bg-linear-to-br from-blue via-navy to-navy-950" />
            )}

            {/* Darkening, stronger on closed panels so their labels stay readable */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 -z-10 transition-colors duration-700",
                open ? "bg-linear-to-t from-navy via-navy/50 to-navy/5" : "bg-navy/70",
              )}
            />

            {/* Closed: icon and title (vertical on desktop) */}
            <button
              type="button"
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              aria-expanded={open}
              tabIndex={open ? -1 : 0}
              className={cn(
                "absolute inset-0 flex items-center gap-4 p-5 text-left transition-opacity",
                "lg:flex-col lg:items-start lg:justify-between",
                open ? "pointer-events-none opacity-0 duration-200" : "opacity-100 duration-500 delay-200",
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-aqua backdrop-blur">
                {item.icon}
              </span>
              <span className="font-display text-base font-bold text-white lg:rotate-180 lg:[writing-mode:vertical-rl]">
                {item.title}
              </span>
            </button>

            {/* Open: full details. Fixed width on desktop so text doesn't reflow while the panel grows. */}
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 p-6 transition-[opacity,translate] sm:p-8 lg:w-[30rem]",
                open
                  ? "translate-y-0 opacity-100 duration-500 delay-300"
                  : "pointer-events-none translate-y-4 opacity-0 duration-200",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-aqua text-navy">{item.icon}</span>
                <span className="font-display text-sm font-semibold tabular-nums text-white/50">
                  {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">{item.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">{item.description}</p>
              <Link
                href={item.href}
                tabIndex={open ? 0 : -1}
                className="group/link mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-sm font-semibold text-navy transition-colors duration-300 hover:bg-aqua"
              >
                Learn more
                <ArrowRight
                  className="size-4 transition-transform duration-300 ease-brand group-hover/link:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}