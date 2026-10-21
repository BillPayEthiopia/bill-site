"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactInfo, contactPage } from "@/content/contact";

const labelClass = "font-display text-sm font-semibold text-navy";
const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-navy placeholder:text-navy/35 " +
  "transition-[border-color,box-shadow] duration-300 focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/10";

/**
 * Opens the visitor's email app with the message filled in.
 * No server needed. Swap for a form service or API route later if you want submissions stored.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const subject = `[Billpay] ${get("topic")}: ${get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone") || "-"}`,
      `Organization: ${get("organization") || "-"}`,
      "",
      get("message"),
    ].join("\n");

    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-panel border border-line bg-white p-6 shadow-float sm:p-10">
      <h2 className="font-display text-2xl font-bold">Send us a message</h2>
      <p className="mt-2">Tell us what you need and the right team will get back to you.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Full name</span>
          <input name="name" required autoComplete="name" placeholder="Abebe Kebede" className={fieldClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={fieldClass} />
        </label>
        <label className="block">
          <span className={labelClass}>
            Phone <span className="font-normal text-navy/40">(optional)</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+251 9..." className={fieldClass} />
        </label>
        <label className="block">
          <span className={labelClass}>
            Organization <span className="font-normal text-navy/40">(optional)</span>
          </span>
          <input name="organization" autoComplete="organization" placeholder="Company or institution" className={fieldClass} />
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>What can we help with?</span>
          <span className="relative block">
            <select name="topic" required defaultValue={contactPage.topics[0]} className={`${fieldClass} appearance-none pr-11`}>
              {contactPage.topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-navy/50" aria-hidden="true" />
          </span>
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>Message</span>
          <textarea name="message" required rows={5} placeholder="Tell us a little about what you're looking for." className={`${fieldClass} resize-y`} />
        </label>
      </div>

      <Button type="submit" size="lg" arrow className="mt-8 w-full sm:w-auto">
        Send message
      </Button>

      {sent && (
        <p role="status" className="mt-5 rounded-xl bg-aqua-50 p-4 text-sm text-navy">
          Your email app should open with your message ready to send. If it doesn't, email us at{" "}
          <a href={`mailto:${contactInfo.email}`} className="font-semibold text-blue underline underline-offset-2">
            {contactInfo.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}