export type FooterLink = { label: string; href: string };

export type SocialLink = {
  label: string;
  href: string;
  /** Official single-color SVG under /public/social. It's painted in the current text color. */
  icon: string;
};

export const footerContent = {
  tagline: "Payments for a stronger tomorrow.",
  description:
    "Billpay is a payment gateway that helps businesses in Ethiopia accept and manage digital payments. A TAK Tech venture.",
  location: "Addis Ababa, Ethiopia",

  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/billpay", icon: "/social/linkedin.svg" },
    { label: "X", href: "https://x.com/billpay", icon: "/social/x.svg" },
    { label: "Facebook", href: "https://www.facebook.com/billpay", icon: "/social/facebook.svg" },
    { label: "Instagram", href: "https://www.instagram.com/billpay", icon: "/social/instagram.svg" },
    { label: "Telegram", href: "https://t.me/billpay", icon: "/social/telegram.svg" },
  ] as SocialLink[],

  /** e.g. { label: "Privacy Policy", href: "/privacy" }. Add once the pages exist. */
  legal: [] as FooterLink[],
};