import { BookOpen, Globe2, Heart, Lightbulb, Palette } from "lucide-react";
import { getTranslations } from "next-intl/server";

const featureDefs = [
  { key: "greatStories", icon: BookOpen, color: "bg-coral" },
  { key: "funActivities", icon: Lightbulb, color: "bg-sun" },
  { key: "amazingFacts", icon: Globe2, color: "bg-mint" },
  { key: "creativeCorner", icon: Palette, color: "bg-violet" },
  { key: "positiveValues", icon: Heart, color: "bg-coral" },
] as const;

export async function Features() {
  const t = await getTranslations("features");

  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-8 sm:pb-20 sm:pt-10">
      <div className="section-container relative grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-5 sm:gap-x-4 md:gap-x-7">
        {featureDefs.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              className="group text-center col-span-1 last:col-span-2 sm:last:col-span-1"
              key={feature.key}
            >
              <div className={`mx-auto flex size-[4.15rem] items-center justify-center rounded-full ${feature.color} shadow-[0_5px_0_rgba(23,54,109,0.14)] transition-transform duration-200 group-hover:-translate-y-1 sm:size-[4.8rem]`}>
                <Icon className="size-7 text-white sm:size-8" strokeWidth={2.5} />
              </div>
              <h2 className="mt-4 text-sm font-extrabold text-ink">{t(`${feature.key}.title`)}</h2>
              <p className="mx-auto mt-1 max-w-[10rem] text-xs leading-5 text-ink/65">{t(`${feature.key}.description`)}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
