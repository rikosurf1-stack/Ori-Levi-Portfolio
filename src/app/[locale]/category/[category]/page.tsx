import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MotionReveal from "@/components/MotionReveal";
import ProjectGrid from "@/components/ProjectGrid";
import {
  getActiveCategories,
  getProjectsByCategoryKey,
} from "@/lib/projects";
import {
  CATEGORY_DESCRIPTIONS,
  categoryBySlug,
  isLocale,
  LOCALES,
  pick,
  t,
  type Locale,
} from "@/lib/i18n";

export function generateStaticParams() {
  const cats = getActiveCategories();
  return LOCALES.flatMap((locale) =>
    cats.map((c) => ({ locale, category: c.slug })),
  );
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { locale: string; category: string };
}): Metadata {
  const cat = categoryBySlug(params.category);
  const locale = isLocale(params.locale) ? params.locale : "en";
  const label = cat ? (locale === "he" ? cat.he : cat.en) : "Work";
  return { title: `${label} — Ori Levi` };
}

export default function CategoryPage({
  params,
}: {
  params: { locale: string; category: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const cat = categoryBySlug(params.category);
  if (!cat) notFound();

  const projects = getProjectsByCategoryKey(cat.key);
  const tr = t(locale);
  const desc = CATEGORY_DESCRIPTIONS[cat.slug];

  return (
    <div className="px-6 pb-24 pt-32 md:px-10 md:pb-40 md:pt-44">
      <div className="mx-auto max-w-page">
        <MotionReveal>
          <header className="mb-16 md:mb-28">
            <Link
              href={`/${locale}`}
              className="label link-underline text-muted"
            >
              {tr.category.back}
            </Link>
            <h1 className="mt-6 font-serif text-5xl font-extralight leading-[1.05] md:text-8xl">
              {locale === "he" ? cat.he : cat.en}
            </h1>
            {desc && (
              <div className="mt-8 max-w-2xl space-y-4 font-sans text-base leading-relaxed text-ink/70 md:mt-10">
                {pick(locale, desc.en, desc.he)
                  .split("\n\n")
                  .map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
              </div>
            )}
          </header>
        </MotionReveal>

        {projects.length > 0 ? (
          <ProjectGrid projects={projects} locale={locale} />
        ) : (
          <p className="font-serif text-2xl font-light text-muted">
            {tr.category.empty}
          </p>
        )}
      </div>
    </div>
  );
}
