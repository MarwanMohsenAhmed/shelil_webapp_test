import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { SketchArrow } from "@/components/icons/sketch-arrow";
import { ArcText } from "@/components/typography/arc-text";

const headlineColors = ["text-ink", "text-tangerine", "text-coral"];
const headlineRotations = ["-rotate-1", "rotate-1", "rotate-0"];

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const isRtl = locale === "ar";

  const headline = t.raw("headline") as string[];
  const CtaIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20"
    >
      {/* Mobile background illustration (< md) */}
      <Image
        alt="A child reading Shalel magazine with a puppy in a bright garden"
        className={`pointer-events-none object-cover select-none object-bottom md:hidden ${
          isRtl ? "scale-x-[-1]" : ""
        }`}
        fill
        priority
        sizes="100vw"
        src="/images/hero-mobile.jpg"
      />

      {/* Desktop background illustration (>= md) */}
      <Image
        alt="A child reading Shalel magazine with a puppy in a bright garden"
        className={`pointer-events-none object-cover select-none hidden md:block ${
          isRtl
            ? "scale-x-[-1] md:object-[36%_100%] lg:object-bottom"
            : "md:object-[64%_100%] lg:object-bottom"
        }`}
        fill
        priority
        sizes="100vw"
        src="/images/hero-world.png"
      />

      {/* Main Content Container */}
      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col items-start max-w-xl lg:max-w-[530px] xl:max-w-[570px]">
          {/* Arched Kicker / Subtitle */}
          <div className="mb-1 sm:mb-2 ps-1 self-start text-ocean">
            <ArcText
              text={t("kicker")}
              isRtl={isRtl}
              width={isRtl ? 260 : 310}
              height={46}
              curve={15}
              className="h-10 sm:h-11 md:h-12 w-auto"
            />
          </div>

          {/* 3-Tier Display Headline with playful tilts */}
          <h1 className="font-fredoka font-bold text-[clamp(3.2rem,6.5vw,6rem)] leading-[0.93] tracking-[-0.015em] flex flex-col drop-shadow-[0_2px_0_rgba(23,54,109,0.06)] select-none">
            {headline.map((line, index) => (
              <span
                key={index}
                className={`inline-block ${
                  isRtl ? "origin-bottom-right" : "origin-bottom-left"
                } ${headlineColors[index % headlineColors.length]} ${
                  headlineRotations[index % headlineRotations.length]
                }`}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* Description Body Text */}
          <p className="mt-5 sm:mt-6 max-w-[430px] font-nunito font-bold sm:font-extrabold text-ink/85 text-[clamp(0.98rem,1.2vw,1.15rem)] leading-[1.58]">
            {t("body")}
          </p>

          {/* Call-to-Action Button */}
          <div className="mt-7 sm:mt-8">
            <a
              href="#latest-issue"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-sun hover:bg-[#ffbe1a] px-7 py-3 sm:px-8 sm:py-3.5 text-ink font-fredoka font-bold text-base sm:text-lg shadow-[0_4px_0_rgba(23,54,109,0.16)] hover:shadow-[0_6px_0_rgba(23,54,109,0.22)] active:shadow-[0_1px_0_rgba(23,54,109,0.2)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-150"
            >
              <span>{t("cta")}</span>
              <CtaIcon
                className={`size-5 stroke-[2.8] transition-transform duration-200 ${
                  isRtl
                    ? "group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Hand-drawn Callout Annotation ("Stories that make kids imagine" + Sketched Arrow) */}
      <div
        className={`pointer-events-none absolute top-[22%] sm:top-[20%] md:top-[19%] lg:top-[17%] z-10 select-none hidden sm:flex flex-col items-center rotate-[-3deg] ${
          isRtl
            ? "left-[4%] sm:left-[8%] md:left-[10%] lg:left-[12%] xl:left-[15%]"
            : "right-[4%] sm:right-[8%] md:right-[10%] lg:right-[12%] xl:right-[15%]"
        }`}
        aria-hidden="true"
      >
        <div
          className={`font-normal text-[clamp(1.4rem,2.2vw,2.1rem)] text-ink leading-[1.12] text-center whitespace-pre ${
            isRtl ? "font-cairo font-bold tracking-normal" : "font-patrick tracking-wide"
          }`}
        >
          {t("callout")}
        </div>

        {/* Hand-drawn whimsical curved sketch arrow pointing to the child & book */}
        <SketchArrow
          className={`size-10 sm:size-11 md:size-12 text-ink mt-0.5 ms-4 sm:ms-6 -rotate-6 ${
            isRtl ? "-scale-x-100" : ""
          }`}
        />
      </div>
    </section>
  );
}
