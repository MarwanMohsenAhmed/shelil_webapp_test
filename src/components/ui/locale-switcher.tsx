"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("localeSwitcher");
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "en" ? "ar" : "en";

  function handleToggle() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={t("toggle")}
      title={nextLocale === "ar" ? "العربية" : "English"}
      className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center gap-1 rounded-full text-ink/80 transition-all hover:bg-white/80 hover:text-ink hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet ${className}`}
    >
      <Globe className="h-5 w-5 stroke-[2.5]" />
      <span className="sr-only">
        {nextLocale === "ar" ? "العربية" : "English"}
      </span>
    </button>
  );
}
