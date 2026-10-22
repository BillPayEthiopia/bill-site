import { cn } from "@/lib/utils";

/*
 * Three layers of water, echoing the logo's three bands. Each layer is a repeating
 * wave twice the container width that drifts sideways forever while gently rising
 * and falling. Pure CSS: no JavaScript, very light.
 */

const WIDTH = 2880; // two copies of a 1440 design width, so the drift loops seamlessly
const HEIGHT = 160;

/** A smooth wave across the full width, filled down to the bottom. */
function wavePath(baseline: number, amplitude: number, wavelength: number) {
  const half = wavelength / 2;
  let d = `M0 ${baseline} Q ${wavelength / 4} ${baseline - amplitude} ${half} ${baseline}`;
  for (let x = half; x < WIDTH; x += half) d += ` T ${x + half} ${baseline}`;
  return `${d} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`;
}

type Layer = {
  baseline: number;
  amplitude: number;
  /** Must divide 1440 evenly, so the loop has no seam. */
  wavelength: number;
  /** Seconds for one full drift. Slower layers feel further away. */
  drift: number;
  reverse?: boolean;
  /** Seconds for one rise and fall. */
  bob: number;
  className: string;
};

const SHAPES = [
  { baseline: 64, amplitude: 22, wavelength: 720, drift: 32, bob: 7 },
  { baseline: 88, amplitude: 16, wavelength: 480, drift: 22, reverse: true, bob: 5.5 },
  { baseline: 112, amplitude: 12, wavelength: 360, drift: 15, bob: 4.5 },
];

/** Back to front. Light: front layer is white, melting into the next section. */
const TONES: Record<"light" | "dark", string[]> = {
  light: ["fill-aqua/15", "fill-blue/10", "fill-white"],
  dark: ["fill-blue/15", "fill-aqua/[0.07]", "fill-blue/20"],
};

type WavesProps = {
  tone?: "light" | "dark";
  /** Position and height, e.g. "absolute inset-x-0 bottom-0 h-48". */
  className?: string;
};

export function Waves({ tone = "light", className }: WavesProps) {
  const layers: Layer[] = SHAPES.map((shape, index) => ({ ...shape, className: TONES[tone][index] }));

  return (
    <div aria-hidden="true" className={cn("pointer-events-none overflow-hidden", className)}>
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{ animation: `wave-bob ${layer.bob}s ease-in-out ${index * -1.5}s infinite alternate` }}
        >
          <div
            className="absolute inset-y-0 left-0 w-[200%]"
            style={{ animation: `wave-drift ${layer.drift}s linear infinite${layer.reverse ? " reverse" : ""}` }}
          >
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" className="size-full">
              <path d={wavePath(layer.baseline, layer.amplitude, layer.wavelength)} className={layer.className} />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}