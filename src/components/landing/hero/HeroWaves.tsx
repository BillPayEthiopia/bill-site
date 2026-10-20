import { FlowingRibbons, type RibbonConfig } from "@/components/ui/FlowingRibbons";

/** Three ribbons, echoing the logo's three bands. */
const RIBBONS: RibbonConfig[] = [
  {
    shapes: [
      "M0 150 C 240 90, 420 230, 720 160 S 1200 60, 1440 120",
      "M0 135 C 260 115, 400 205, 720 175 S 1180 75, 1440 105",
    ],
    className: "stroke-navy/6",
    glowClassName: "stroke-aqua/50",
    breathe: 9,
    glowDelay: 0.8,
    parallax: -24,
  },
  {
    shapes: [
      "M0 190 C 240 130, 420 270, 720 200 S 1200 100, 1440 160",
      "M0 178 C 260 152, 400 248, 720 214 S 1180 118, 1440 146",
    ],
    className: "stroke-aqua/20",
    glowClassName: "stroke-blue/35",
    breathe: 11,
    glowDelay: 3,
  },
  {
    shapes: [
      "M0 230 C 240 170, 420 310, 720 240 S 1200 140, 1440 200",
      "M0 222 C 260 190, 400 288, 720 252 S 1180 158, 1440 188",
    ],
    className: "stroke-blue/10",
    glowClassName: "stroke-aqua/40",
    breathe: 13,
    glowDelay: 5.2,
    parallax: 24,
  },
];

export function HeroWaves() {
  return (
    <FlowingRibbons
      ribbons={RIBBONS}
      viewBox="0 0 1440 260"
      strokeWidth={36}
      className="absolute inset-x-0 -bottom-12 h-64 w-full"
    />
  );
}