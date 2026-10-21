import type { ReactNode } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { contactInfo } from "@/content/contact";

function Row({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 border-b border-white/10 py-5 first:pt-0 last:border-0 last:pb-0">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-aqua/15 text-aqua">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-aqua">{label}</p>
        <div className="mt-1 text-white">{children}</div>
      </div>
    </li>
  );
}

const linkClass = "font-medium transition-colors duration-200 hover:text-aqua";

/** Every way to reach the team, on a navy card. */
export function ContactDetails() {
  const { email, phone, whatsapp, address, mapUrl, hours } = contactInfo;

  return (
    <div className="relative isolate overflow-hidden rounded-panel bg-navy p-8 text-white/70 shadow-float sm:p-10">
      <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-aqua/20 blur-3xl" />

      <h2 className="font-display text-2xl font-bold text-white">Reach us directly</h2>

      <ul className="mt-8">
        <Row icon={Mail} label="Email">
          <a href={`mailto:${email}`} className={linkClass}>{email}</a>
        </Row>
        <Row icon={Phone} label="Call us">
          <a href={phone.href} className={linkClass}>{phone.label}</a>
        </Row>
        <Row icon={MessageCircle} label="WhatsApp">
          <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {whatsapp.label}
          </a>
        </Row>
        <Row icon={MapPin} label="Visit us">
          <address className="not-italic">
            {address[0]}
            <br />
            {address[1]}
          </address>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 font-display text-sm font-semibold text-aqua"
          >
            Open in Maps
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </Row>
        <Row icon={Clock} label="Office hours">
          {hours.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </Row>
      </ul>
    </div>
  );
}