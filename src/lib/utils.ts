/** Joins class names, skipping false/null/undefined values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const etbFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats a number as an amount, e.g. 2450 → "2,450.00". */
export function formatETB(value: number) {
  return etbFormatter.format(value);
}