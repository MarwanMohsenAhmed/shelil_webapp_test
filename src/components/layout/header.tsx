"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "@/components/icons/logo";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";

export function Header() {
  const t = useTranslations("header");
  const navT = useTranslations("nav");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  const navLinks = [
    { label: navT("home"), href: "#home" },
    { label: navT("issues"), href: "#latest-issue" },
    { label: navT("stories"), href: "#categories" },
    { label: navT("activities"), href: "#categories" },
    { label: navT("about"), href: "#why-shelil" },
  ];

  return (
    <header className="absolute top-0 inset-x-0 z-40 w-full">
      {/* Desktop Wave Background Graphic from assets/navbar_bg.svg (>= md) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden md:block md:h-[132px] w-full overflow-hidden"
      >
        <Image
          src="/images/navbar_bg.svg"
          alt=""
          fill
          className={`object-cover ${isRtl ? "scale-x-[-1]" : ""}`}
          priority
        />
      </div>

      {/* Navigation Content Bar Container */}
      <div className="section-container relative pt-2.5 sm:pt-3 md:pt-3 md:pb-4">
        {/* On mobile: rounded pill bar with margins, padding, and its own self-contained background. On desktop: standard flex row */}
        <div className="relative flex items-center justify-between rounded-2xl sm:rounded-3xl bg-[#F2FAFE]/95 backdrop-blur-md border border-ink/10 shadow-sm px-3 py-1.5 sm:px-4 sm:py-2 md:rounded-none md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none md:p-0">
          {/* Logo */}
          <a
            href="#home"
            aria-label={t("logoLabel")}
            onClick={() => setActiveHref("#home")}
            className="relative z-10 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          >
            <Logo />
          </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="relative z-10 hidden items-center gap-6 lg:gap-8 md:flex"
        >
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <div key={link.label} className="relative flex flex-col items-center">
                <a
                  href={link.href}
                  onClick={() => setActiveHref(link.href)}
                  className={`font-fredoka text-[1.05rem] lg:text-[1.12rem] tracking-wide transition-colors duration-150 py-1 ${
                    isActive
                      ? "font-bold text-ocean hover:text-ocean/90"
                      : "font-semibold text-ink/85 hover:text-coral"
                  }`}
                >
                  {link.label}
                </a>

                {/* Playful Yellow Curved Squiggle Under Active Link */}
                {isActive && (
                  <svg
                    className="absolute -bottom-1.5 w-7 sm:w-8 h-2 text-sun pointer-events-none"
                    viewBox="0 0 36 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.5 4.5C9.5 7 24 7.5 33.5 2.5"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          {/* Search Button & Expandable Input */}
          <div className="relative flex items-center">
            {searchOpen ? (
              <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-md border border-ink/15 animate-in fade-in zoom-in-95 duration-150">
                <Search className="h-4 w-4 text-ink/60 shrink-0" />
                <input
                  type="text"
                  placeholder={t("searchLabel")}
                  autoFocus
                  className="w-36 sm:w-48 bg-transparent text-xs sm:text-sm text-ink outline-none placeholder:text-ink/40"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="text-ink/60 hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label={t("searchLabel")}
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-ink/80 transition-all hover:bg-white/80 hover:text-ink hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
              >
                <Search className="h-5 w-5 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* Language Switcher */}
          <LocaleSwitcher />

          {/* Log In Pill Button */}
          <a
            href="#newsletter"
            className="hidden sm:inline-flex items-center justify-center font-nunito font-extrabold text-xs md:text-sm text-ink px-4 py-1.5 md:px-5 md:py-2 rounded-full border-2 border-ink/20 hover:border-ink/50 bg-white/40 hover:bg-white transition-all shadow-xs"
          >
            {t("logIn")}
          </a>

          {/* Subscribe Pill Button */}
          <a
            href="#newsletter"
            className="inline-flex items-center justify-center font-fredoka font-bold text-xs sm:text-sm text-ink bg-sun hover:bg-[#ffbe1a] px-4 py-1.5 sm:px-5 sm:py-2 rounded-full shadow-[0_3px_0_rgba(23,54,109,0.18)] hover:shadow-[0_4px_0_rgba(23,54,109,0.22)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            {t("subscribe")}
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileMenuOpen}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 stroke-[2.5]" />
            ) : (
              <Menu className="h-6 w-6 stroke-[2.5]" />
            )}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="section-container md:hidden relative z-50 pt-2 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="rounded-3xl border-2 border-ink/10 bg-white/95 backdrop-blur-md p-5 shadow-xl">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setActiveHref(link.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between rounded-2xl px-4 py-2.5 font-fredoka text-lg transition-colors ${
                      isActive
                        ? "bg-sky text-ocean font-bold"
                        : "text-ink font-semibold hover:bg-sky/50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-sun" />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-ink/10 flex flex-col gap-2.5">
              <a
                href="#newsletter"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center font-nunito font-extrabold text-ink py-2 rounded-full border-2 border-ink/20 hover:border-ink/40"
              >
                {t("logIn")}
              </a>
              <a
                href="#newsletter"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center font-fredoka font-bold text-ink bg-sun hover:bg-[#ffbe1a] py-2.5 rounded-full shadow-[0_3px_0_rgba(23,54,109,0.18)]"
              >
                {t("subscribe")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
