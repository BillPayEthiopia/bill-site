import type { LucideIcon } from "lucide-react";
import { Activity, Fingerprint, Lock, ShieldAlert } from "lucide-react";


export type SecurityPoint = { title: string; description: string; icon: LucideIcon };

export const securityContent = {
  eyebrow: "Trust & security",
  title: ["Your trust", "matters."],
  description:
    "We follow strict security practices and industry standards to keep your data and transactions safe, always.",
  cta: { label: "Learn more about security", href: "#get-started" },

  points: [
    { title: "Advanced encryption", description: "Your data is protected in transit and at rest.", icon: Lock },
    { title: "Fraud prevention", description: "Real-time monitoring and risk controls on every payment.", icon: ShieldAlert },
    { title: "Data privacy", description: "Your information stays yours. We never sell it.", icon: Fingerprint },
    { title: "Reliable uptime", description: "Infrastructure built to keep your business running.", icon: Activity },
  ] satisfies SecurityPoint[],

  panel: {
    title: ["Built for Ethiopia.", "Ready for what's next."],
    /** Path under /public. Leave undefined until the photo exists. */
    image: undefined as string | undefined,
    alt: "The Addis Ababa skyline in daylight",
  },
};