import Image from "next/image";
import { ArrowLeft, ArrowRight, Rocket, Sparkle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export async function LatestIssue() {
  const t = await getTranslations("latestIssue");
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const CtaIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-paper py-8 sm:py-12 md:py-16" id="latest-issue">
      {/* Mobile standard rounded card background (< md) with margins and rounded boundaries */}
      <div
        aria-hidden="true"
        className="absolute inset-x-3.5 sm:inset-x-6 inset-y-2 rounded-3xl sm:rounded-[2.5rem] bg-sky border border-ink/5 shadow-xs md:hidden"
      />

      {/* Desktop SVG background (>= md) */}
      <div
        aria-hidden="true"
        className={`hidden md:block absolute inset-x-0 bottom-0 top-3 bg-cover bg-center ${isRtl ? "scale-x-[-1]" : ""}`}
        style={{ backgroundImage: "url('/images/latest-section-bg.svg')" }}
      />
      <div className="section-container relative grid items-center gap-10 py-10 sm:py-12 md:py-12 grid-cols-1 lg:grid-cols-[minmax(15rem,0.75fr)_minmax(0,1.15fr)] xl:grid-cols-[minmax(15rem,0.75fr)_minmax(0,1.15fr)_13rem] lg:gap-16 px-6 sm:px-8 md:px-0">
        <div className="mx-auto w-[min(67vw,19rem)] lg:w-full">
          <div className="float-gently relative rotate-[-5deg] drop-shadow-[0_18px_16px_rgba(23,54,109,0.2)] transition-transform duration-300 hover:rotate-0">
            <Image
              alt="Shelil Issue 12, Reach for the Stars magazine cover"
              className="h-auto w-full"
              height={522}
              sizes="(max-width: 1024px) 67vw, 19rem"
              src="/images/issue-12-cover.png"
              width={383}
            />
            <span className="absolute -end-3 top-5 rounded-full bg-ocean px-3 py-1 text-[0.6rem] font-extrabold uppercase tracking-wide text-white shadow-sm">
              {t("newBadge")}
            </span>
          </div>
        </div>

        <div className="max-w-xl text-center lg:text-start">
          <p className="eyebrow text-ocean">{t("label")}</p>
          <h2 className="display-title mt-2 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] text-ink">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-ink/75 sm:text-base sm:leading-7 lg:mx-0">
            {t("body")}
          </p>
          <a className="kid-button mt-7" href="#newsletter">
            {t("cta")}
            <CtaIcon className="size-4" strokeWidth={3} />
          </a>
        </div>

        <aside className="hidden text-center text-ink xl:block">
          <div className="relative mx-auto flex size-24 items-center justify-center rounded-full border-2 border-dashed border-ink/25">
            <Rocket className={`size-11 text-ocean ${isRtl ? "-rotate-45" : "rotate-45"}`} strokeWidth={1.7} />
            <Sparkle className="absolute -end-2 -top-3 size-5 text-sun" fill="currentColor" />
          </div>
          <p className="mt-5 text-sm leading-6 text-ink/70 whitespace-pre-line">
            {t("aside")}
          </p>
        </aside>
      </div>
    </section>
  );
}
