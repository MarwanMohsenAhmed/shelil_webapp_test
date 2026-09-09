import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { LatestIssue } from "@/components/sections/latest-issue";
import { Categories } from "@/components/sections/categories";
import { Benefits } from "@/components/sections/benefits";
import { Newsletter } from "@/components/sections/newsletter";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper">
      <main>
        <Hero />
        <Features />
        <LatestIssue />
        <Categories />
        <Benefits />
        <Newsletter />
      </main>
    </div>
  );
}
