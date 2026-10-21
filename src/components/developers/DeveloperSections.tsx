import { ArrowRight, Check, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { NavyBackground } from "@/components/landing/NavyBackground";
import { TwoLineTitle } from "@/components/page/TwoLineTitle";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { developersPage } from "@/content/developersPage";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

const ACTORS = {
  you: { label: "Your server", className: "bg-white/10 text-white" },
  billpay: { label: "Billpay", className: "bg-aqua/15 text-aqua" },
  customer: { label: "Customer", className: "bg-blue/40 text-white" },
};

/** Five cards showing who does what, joined by arrows on desktop. */
export function PaymentFlow() {
  const { eyebrow, title, description, steps } = developersPage.flow;

  return (
    <section id="flow" aria-labelledby="flow-title" className="relative isolate scroll-mt-20 overflow-hidden py-28 text-white/70 lg:py-36">
      <NavyBackground />
      <WaveDivider position="top" fill="fill-white" />
      <WaveDivider position="bottom" fill="fill-white" />

      <Container>
        <Reveal>
          <SectionHeading
            id="flow-title"
            tone="light"
            eyebrow={eyebrow}
            title={<TwoLineTitle title={title} accent="text-aqua" />}
            description={description}
          />
        </Reveal>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ actor, title, description, icon: Icon }, index) => (
            <Reveal as="li" key={title} delay={index * 0.08} className="relative h-full">
              <div className="flex h-full flex-col rounded-card border border-white/10 bg-white/4 p-5 backdrop-blur transition-[border-color,translate] duration-500 ease-brand hover:-translate-y-1 hover:border-aqua/40">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-aqua/15 text-aqua">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-semibold tabular-nums text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className={cn("mt-5 w-fit rounded-full px-2.5 py-0.5 font-display text-[11px] font-semibold", ACTORS[actor].className)}>
                  {ACTORS[actor].label}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed">{description}</p>
              </div>

              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-[1.375rem] top-1/2 z-10 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-navy text-aqua lg:flex"
                >
                  <ArrowRight className="size-3.5" />
                </span>
              )}
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Numbered steps joined by a line, each with its explanation beside its code. */
export function Quickstart() {
  const { eyebrow, title, description, steps } = developersPage.quickstart;

  return (
    <section id="quickstart" aria-labelledby="quickstart-title" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading id="quickstart-title" eyebrow={eyebrow} title={<TwoLineTitle title={title} />} description={description} />
        </Reveal>

        <ol className="mt-16 space-y-14 lg:space-y-20">
          {steps.map((step, index) => (
            <li key={step.title} className="relative pl-14 sm:pl-16">
              {/* Line to the next step */}
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-14 left-5 top-12 w-px bg-linear-to-b from-blue/40 to-line lg:-bottom-20"
                />
              )}
              <span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white ring-4 ring-blue-50">
                {index + 1}
              </span>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
                <Reveal>
                  <h3 className="pt-1.5 font-display text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-relaxed">{step.description}</p>
                  {step.note && (
                    <p className="mt-5 flex gap-3 rounded-xl border border-aqua/30 bg-aqua-50 p-4 text-sm leading-relaxed text-navy">
                      <Lightbulb className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden="true" />
                      {step.note}
                    </p>
                  )}
                </Reveal>
                <Reveal delay={0.1} className="min-w-0">
                  <CodeBlock file={step.file} code={step.code} />
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Sandbox (light card) beside Production (navy card). */
export function Environments() {
  const { eyebrow, title, description, items } = developersPage.environments;

  return (
    <section id="environments" aria-labelledby="environments-title" className="scroll-mt-20 bg-surface py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading id="environments-title" eyebrow={eyebrow} title={<TwoLineTitle title={title} />} description={description} />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {items.map((env, index) => {
            const live = env.mode === "live";
            return (
              <Reveal key={env.name} delay={index * 0.12} className="h-full">
                <div
                  className={cn(
                    "flex h-full flex-col rounded-panel border p-8 sm:p-10",
                    live ? "border-navy bg-navy text-white/70 shadow-float" : "border-line bg-white shadow-card",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={cn("font-display text-2xl font-bold", live && "text-white")}>{env.name}</h3>
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-display text-xs font-semibold",
                        live ? "bg-aqua text-navy" : "bg-blue-50 text-blue",
                      )}
                    >
                      <span className={cn("size-1.5 rounded-full", live ? "bg-navy" : "bg-blue")} aria-hidden="true" />
                      {env.tag}
                    </span>
                  </div>
                  <p className="mt-3 leading-relaxed">{env.description}</p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {env.points.map((point) => (
                      <li key={point} className={cn("flex items-center gap-3 font-medium", live ? "text-white" : "text-navy")}>
                        <span
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-full",
                            live ? "bg-aqua/20 text-aqua" : "bg-aqua/20 text-blue",
                          )}
                        >
                          <Check className="size-3" aria-hidden="true" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <p className={cn("mt-8 overflow-x-auto rounded-lg px-4 py-3 font-mono text-xs text-aqua", live ? "bg-white/10" : "bg-navy-950")}>
                    {env.key}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}