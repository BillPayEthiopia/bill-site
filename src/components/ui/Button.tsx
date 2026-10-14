import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "outline-inverse";
type Size = "md" | "lg";

const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden " +
  "whitespace-nowrap rounded-full font-display font-semibold " +
  "transition-[background-color,color,border-color,box-shadow,translate,scale] duration-300 ease-brand " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-50";

/** A soft light streak that sweeps across the button once on hover. */
const shine =
  "before:pointer-events-none before:absolute before:inset-y-0 before:-left-2/5 before:-z-10 " +
  "before:w-2/5 before:bg-linear-to-r before:from-transparent before:via-white/30 " +
  "before:to-transparent hover:before:animate-shine";

const variants: Record<Variant, string> = {
  primary: cn("bg-navy text-white hover:bg-blue hover:shadow-lift", shine),
  accent: cn(
    "bg-aqua text-navy hover:shadow-glow focus-visible:outline-aqua",
    shine,
  ),
  outline:
    "border border-navy/20 bg-white/60 text-navy hover:border-navy/40 hover:bg-navy-50",
  "outline-inverse":
    "border border-white/30 text-white hover:border-white/70 hover:bg-white/10 focus-visible:outline-aqua",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

type StyleProps = {
  variant?: Variant;
  size?: Size;
  /** Adds an animated forward arrow after the label. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = StyleProps &
  Omit<ComponentProps<typeof Link>, keyof StyleProps>;

type NativeButtonProps = StyleProps &
  Omit<ComponentProps<"button">, keyof StyleProps> & { href?: undefined };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

/** Returns the button classes, for styling elements that aren't <Button>. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<StyleProps, "variant" | "size" | "className"> = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Two arrows in a clipped box: one exits right as the other enters from the left. */
function ArrowLoop() {
  const arrow = "absolute inset-0 size-4 transition-transform duration-300 ease-brand";
  return (
    <span className="relative -mr-0.5 inline-flex size-4 shrink-0 overflow-hidden" aria-hidden="true">
      <ArrowRight className={cn(arrow, "group-hover:translate-x-[150%]")} />
      <ArrowRight className={cn(arrow, "translate-x-[-150%] group-hover:translate-x-0")} />
    </span>
  );
}

export function Button(props: ButtonProps) {
  // With an href, it navigates, so render a real link.
  if (props.href !== undefined) {
    const { variant, size, arrow, className, children, ...linkProps } = props;
    return (
      <Link className={buttonClasses({ variant, size, className })} {...linkProps}>
        {children}
        {arrow && <ArrowLoop />}
      </Link>
    );
  }

  // Otherwise it performs an action, so render a real button.
  const { variant, size, arrow, className, children, type = "button", ...buttonProps } = props;
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...buttonProps}>
      {children}
      {arrow && <ArrowLoop />}
    </button>
  );
}