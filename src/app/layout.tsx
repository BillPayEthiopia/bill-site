import type { Metadata } from "next";
import { satoshi } from "@/lib/fonts";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Billpay",
    template: "%s · Billpay",
  },
  description:
    "Billpay is a payment gateway that helps businesses and institutions in Ethiopia accept and manage digital payments.",
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body>
        <MotionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:font-display focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}