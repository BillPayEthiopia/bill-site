/** Decorative layers behind the hero. Purely visual, hidden from screen readers. */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Base wash: soft blue fading to white */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-50 via-white to-white" />

      {/* Fine dot grid, faded out toward the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(27_52_97/0.07)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent)]" />

      {/* Soft color glows */}
      <div className="absolute -right-40 -top-40 size-[42rem] rounded-full bg-aqua/20 blur-3xl" />
      <div className="absolute -left-48 top-1/3 size-[32rem] rounded-full bg-blue/10 blur-3xl" />

      {/* Three drifting ribbons, echoing the logo's three bands */}
      <svg
        className="absolute -bottom-12 left-0 h-64 w-[140%] animate-drift"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 150 C 240 90, 420 230, 720 160 S 1200 60, 1440 120" className="stroke-navy/6" strokeWidth="36" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d="M0 190 C 240 130, 420 270, 720 200 S 1200 100, 1440 160" className="stroke-aqua/20" strokeWidth="36" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d="M0 230 C 240 170, 420 310, 720 240 S 1200 140, 1440 200" className="stroke-blue/10" strokeWidth="36" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Fade the bottom edge into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white to-transparent" />
    </div>
  );
}