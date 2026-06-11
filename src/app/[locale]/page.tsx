import Link from "next/link";
import { notFound } from "next/navigation";
import MotionReveal from "@/components/MotionReveal";
import { getActiveCategories } from "@/lib/projects";
import { getHome } from "@/lib/site";
import { isLocale, pick, type Locale } from "@/lib/i18n";

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const home = getHome();
  const categories = getActiveCategories();

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-32 text-center">
      <MotionReveal y={16}>
        <p className="label text-muted">
          {pick(locale, home.tagline, home.taglineHe)}
        </p>
      </MotionReveal>

      <nav className="mt-12 flex flex-col items-center md:mt-16">
        {categories.map((c, i) => (
          <MotionReveal key={c.slug} delay={0.07 * (i + 1)} y={14}>
            <Link
              href={`/${locale}/category/${c.slug}`}
              className="link-underline block py-2.5 font-serif text-3xl font-extralight leading-tight text-ink/90 transition-colors duration-300 hover:text-ink md:text-5xl md:py-3"
            >
              {locale === "he" ? c.he : c.en}
            </Link>
          </MotionReveal>
        ))}
      </nav>
    </section>
  );
}
