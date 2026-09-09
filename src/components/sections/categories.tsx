import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

const categoryDefs = [
  { image: "/images/category-stories.png", color: "bg-coral", hover: "hover:border-coral/45" },
  { image: "/images/category-science.png", color: "bg-leaf", hover: "hover:border-leaf/45" },
  { image: "/images/category-arts.png", color: "bg-violet", hover: "hover:border-violet/45" },
  { image: "/images/category-games.png", color: "bg-ocean", hover: "hover:border-ocean/45" },
  { image: "/images/category-health.png", color: "bg-tangerine", hover: "hover:border-tangerine/45" },
];

type CategoryItem = {
  title: string;
  description: string;
};

export async function Categories() {
  const t = await getTranslations("categories");
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const CtaIcon = isRtl ? ArrowLeft : ArrowRight;

  const items = t.raw("items") as CategoryItem[];

  return (
    <section className="relative overflow-hidden bg-paper py-16 sm:py-20" id="categories">
      <div className="section-container relative">
        <header className="mx-auto mb-11 max-w-2xl text-center">
          <p className="eyebrow flex items-center justify-center gap-2 text-ocean">
            <Sparkles className="size-4 text-sun" fill="currentColor" />
            {t("label")}
          </p>
          <h2 className="display-title mt-2 text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.95] text-ink">
            {t("title")}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {items.map((category, index) => {
            const def = categoryDefs[index % categoryDefs.length];
            return (
              <article className={`group overflow-hidden rounded-[1.65rem] border-2 border-ink/8 bg-white shadow-[0_5px_0_rgba(23,54,109,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_0_rgba(23,54,109,0.11)] ${def.hover}`} key={category.title}>
                <div className="relative aspect-[1.28] overflow-hidden bg-sky/45">
                  <Image
                    alt={`${category.title} illustration`}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    src={def.image}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-sm font-extrabold text-ink">{category.title}</h3>
                  <p className="mt-1 min-h-10 text-xs leading-5 text-ink/65">{category.description}</p>
                  <a className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-extrabold text-white transition-transform hover:scale-[1.03] ${def.color}`} href="#newsletter">
                    {t("cta")} <CtaIcon className="size-3" strokeWidth={3} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
