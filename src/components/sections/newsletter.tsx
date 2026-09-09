"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

export function Newsletter() {
  const t = useTranslations("newsletter");
  const [isSubscribed, setIsSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubscribed(true);
  }

  return (
    <section className="bg-paper py-16 sm:py-20" id="newsletter">
      <div className="section-container">
        <div className="rounded-3xl bg-ink px-8 py-10 sm:px-12 sm:py-12 md:px-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_minmax(18rem,0.85fr)] lg:gap-12 lg:items-center">
            {/* Copy */}
            <div>
              <p className="font-nunito text-xs font-extrabold uppercase tracking-widest text-sun">
                {t("label")}
              </p>
              <h2 className="display-title mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-[1] text-white">
                {t("title")}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
                {t("body")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full">
              <label className="sr-only" htmlFor="newsletter-email">
                {t("placeholder")}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("placeholder")}
                  aria-describedby="newsletter-status"
                  className="min-h-11 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-sun focus:bg-white/15"
                />
                <button
                  type="submit"
                  className="kid-button shrink-0 border-0 text-ink"
                >
                  {t("submit")}
                </button>
              </div>
              <p
                id="newsletter-status"
                aria-live="polite"
                className="mt-3 min-h-5 text-xs font-bold text-sun"
              >
                {isSubscribed ? t("success") : ""}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
