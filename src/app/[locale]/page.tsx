import Link from "next/link";
import { notFound } from "next/navigation";
import HomeCarousel, { type Slide } from "@/components/HomeCarousel";
import { getActiveCategories, getAllProjects } from "@/lib/projects";
import { getHome } from "@/lib/site";
import {
  categoryLabel,
  isLocale,
  pick,
  type Locale,
} from "@/lib/i18n";

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  const home = getHome();
  const tagline = pick(locale, home.tagline, home.taglineHe);

  const slides: Slide[] = getAllProjects()
    .filter((p) => p.featured)
    .map((p) => ({
      src: p.cover,
      alt: p.coverAlt || p.title,
      title: pick(locale, p.title, p.titleHe),
      meta: `${categoryLabel(p.category, locale)} · ${p.year}`,
      href: `/${locale}/work/${p.slug}`,
    }));

  const categories = getActiveCategories();

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-28 md:py-32">
      {/* Tagline — first thing visible */}
      <p className="mb-4 max-w-xl text-center font-serif text-2xl font-light leading-snug text-ink md:text-3xl">
        {tagline}
      </p>

      {/* Category nav — single row on desktop */}
      <nav className="mb-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 md:mb-16 md:max-w-none md:flex-nowrap md:gap-x-6">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/${locale}/category/${c.slug}`}
            className="link-underline label text-muted transition-colors hover:text-ink"
          >
            {locale === "he" ? c.he : c.en}
          </Link>
        ))}
      </nav>

      <HomeCarousel slides={slides} />
    </section>
  );
}
