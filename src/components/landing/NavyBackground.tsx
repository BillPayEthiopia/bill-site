/** Decorative layers for navy sections. Purely visual, hidden from screen readers. */
export function NavyBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-navy to-navy-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="absolute -right-40 -top-40 size-[36rem] rounded-full bg-aqua/15 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 size-[30rem] rounded-full bg-blue/30 blur-3xl" />
      <svg className="absolute -bottom-10 left-0 h-56 w-[140%] animate-drift" viewBox="0 0 1440 260" preserveAspectRatio="none" fill="none">
        <path d="M0 150 C 240 90, 420 230, 720 160 S 1200 60, 1440 120" className="stroke-white/4" strokeWidth="36" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d="M0 190 C 240 130, 420 270, 720 200 S 1200 100, 1440 160" className="stroke-aqua/15" strokeWidth="36" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d="M0 230 C 240 170, 420 310, 720 240 S 1200 140, 1440 200" className="stroke-blue/30" strokeWidth="36" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}