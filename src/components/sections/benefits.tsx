import Image from "next/image";
import { Check, Sparkle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

const benefitColors = ["bg-leaf", "bg-violet", "bg-ocean", "bg-tangerine"];

export async function Benefits() {
  const t = await getTranslations("benefits");
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const items = t.raw("items") as string[];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24" id="why-shelil">
      <div className="section-container grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
        <div className="relative mx-auto w-full max-w-xl">
          <Sparkle aria-hidden="true" className="absolute start-[12%] top-[15%] z-10 size-6 text-sun" fill="currentColor" />
          <div className="absolute inset-x-[6%] bottom-[14%] top-[18%] rounded-[45%] bg-coral/12" />
          <Image
            alt="A girl happily reading a magazine beside her cat"
            className={`relative h-auto w-full select-none ${isRtl ? "scale-x-[-1]" : ""}`}
            height={887}
            sizes="(max-width: 1024px) 100vw, 45vw"
            src="/images/reading-girl.png"
            width={1774}
          />
        </div>

        <div className="max-w-xl text-center lg:text-start">
          <p className="eyebrow text-violet">{t("label")}</p>
          <h2 className="display-title mt-2 text-[clamp(2.35rem,4.4vw,4.25rem)] leading-[0.96] text-ink">
            {t("title")}
          </h2>
          <div className="mt-8 grid gap-4 text-start sm:grid-cols-2">
            {items.map((label, index) => (
              <div className="flex items-start gap-3" key={label}>
                <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${benefitColors[index % benefitColors.length]}`}>
                  <Check className="size-3.5 text-white" strokeWidth={4} />
                </span>
                <span className="text-sm font-extrabold leading-5 text-ink">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
