/**
 * Shared animation timing for Motion (JavaScript animations).
 * Mirrors --ease-brand in globals.css so CSS and JS motion feel identical.
 */
export const EASE_BRAND: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
} as const;