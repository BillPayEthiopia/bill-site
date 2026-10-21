import { BadgeCheck, ClipboardCheck, Lock, ShieldAlert } from "lucide-react";
import { Float } from "@/components/animations/Float";
import { ShieldBadge } from "@/components/landing/security/ShieldBadge";
import { VisualPanel } from "@/components/page/VisualPanel";

const CHIPS = [
  { label: "Encrypted", icon: Lock, position: "left-[6%] top-[14%]", delay: 0 },
  { label: "KYC verified", icon: BadgeCheck, position: "right-[6%] top-[24%]", delay: 1.2 },
  { label: "AML monitored", icon: ShieldAlert, position: "bottom-[20%] left-[8%]", delay: 0.6 },
  { label: "Audit logged", icon: ClipboardCheck, position: "bottom-[10%] right-[8%]", delay: 1.8 },
];

/** The drawing shield, surrounded by floating security checks. */
export function SecurityVisual() {
  return (
    <VisualPanel>
      <div className="scale-150">
        <ShieldBadge />
      </div>

      <div aria-hidden="true" className="absolute inset-0">
        {CHIPS.map(({ label, icon: Icon, position, delay }) => (
          <Float key={label} delay={delay} distance={8} className={`absolute ${position}`}>
            <span className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-display text-xs font-semibold text-navy shadow-float">
              <span className="flex size-6 items-center justify-center rounded-full bg-aqua/20 text-blue">
                <Icon className="size-3.5" />
              </span>
              {label}
            </span>
          </Float>
        ))}
      </div>
    </VisualPanel>
  );
}