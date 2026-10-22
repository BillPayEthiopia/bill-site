/*
 * Three layers of water at the bottom of the hero, echoing the logo's three bands.
 * Each layer is a repeating wave twice the screen width that drifts sideways forever,
 * while gently rising and falling. Pure CSS: no JavaScript, very light.
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

/** Back to front: far and slow, then nearer and quicker. */
const LAYERS: Layer[] = [
  { baseline: 64, amplitude: 22, wavelength: 720, drift: 32, bob: 7, className: "fill-aqua/15" },
  { baseline: 88, amplitude: 16, wavelength: 480, drift: 22, reverse: true, bob: 5.5, className: "fill-blue/10" },
  { baseline: 112, amplitude: 12, wavelength: 360, drift: 15, bob: 4.5, className: "fill-white" },
];

export function HeroWaves() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden sm:h-48">
      {LAYERS.map((layer, index) => (
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