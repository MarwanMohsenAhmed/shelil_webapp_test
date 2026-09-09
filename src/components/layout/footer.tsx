"use client";

import { useTranslations } from "next-intl";
import { Logo } from "@/components/icons/logo";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect height="20" rx="5" width="20" x="2" y="2" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9C2 9 2 12 2 12s0 3 .4 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9C22 15 22 12 22 12s0-3-.4-4.8Z" />
      <path d="m10 15 5-3-5-3v6Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", Icon: InstagramIcon, href: "#" },
  { label: "YouTube", Icon: YoutubeIcon, href: "#" },
];

export function Footer() {
  const footerT = useTranslations("footer");
  const navT = useTranslations("nav");

  const footerLinks = [
    { label: navT("home"), href: "#home" },
    { label: navT("issues"), href: "#latest-issue" },
    { label: navT("stories"), href: "#categories" },
    { label: navT("activities"), href: "#categories" },
    { label: navT("about"), href: "#why-shelil" },
    { label: navT("contact"), href: "#newsletter" },
  ];

  return (
    <footer className="bg-paper border-t border-ink/10 py-10">
      <div className="section-container">
        {/* Top row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Logo */}
          <a href="#home" aria-label="Shalel home">
            <Logo size="sm" />
          </a>

          {/* Nav links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-nunito text-sm font-bold text-ink/60 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-3">
            {socialLinks.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-all hover:border-ink/40 hover:text-ink"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-ink/10 pt-6 text-xs text-ink/45 sm:flex-row">
          <p>{footerT("copyright")}</p>
          <p className="font-bold text-ink/55">{footerT("tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
