import localFont from "next/font/local";

/**
 * Satoshi — BillPay's official title typeface (Visual Identity Guide, p.23).
 * A variable font: one file covers every weight from 300 to 900.
 */
export const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.ttf",
  weight: "300 900",
  variable: "--font-satoshi",
  display: "swap",
});