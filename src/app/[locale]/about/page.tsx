import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MotionReveal from "@/components/MotionReveal";
import SmoothImage from "@/components/SmoothImage";
import { getAbout } from "@/lib/site";
import { getActiveCategories } from "@/lib/projects";
import { isLocale, pick, t, type Locale } from "@/lib/i18n";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "en";
  return {
    title: locale === "he" ? "אודות — Ori Levi" : "About — Ori Levi",
  };
}

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const about = getAbout();
  const tr = t(locale);
  const paragraphs =
    locale === "he" && about.paragraphsHe.length > 0
      ? about.paragraphsHe
      : about.paragraphs;
  const disciplines = getActiveCategories();

  return (
    <div className="px-6 pb-24 pt-32 md:px-10 md:pb-40 md:pt-44">
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Portrait */}
          <div className="md:col-span-5">
            <MotionReveal>
              <SmoothImage
                src={about.portrait}
                alt="Ori Levi"
                aspectClassName="aspect-[4/5]"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </MotionReveal>
          </div>

          {/* Copy */}
          <div className="md:col-span-7 md:ps-8">
            <MotionReveal>
              <p className="label text-muted">{tr.about.eyebrow}</p>
              <h1 className="mt-5 max-w-2xl font-serif text-3xl font-extralight leading-[1.25] md:text-5xl md:leading-[1.2]">
                {pick(locale, about.headline, about.headlineHe)}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="mt-10 max-w-xl space-y-6 font-sans text-base leading-relaxed text-ink/75 md:mt-12">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <div className="mt-12 border-t border-line pt-8">
                <p className="label text-muted">{tr.about.workingAcross}</p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  {disciplines.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/${locale}/category/${d.slug}`}
                        className="link-underline font-serif text-lg font-light"
                      >
                        {locale === "he" ? d.he : d.en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="mt-12">
                <Link
                  href={`/${locale}/contact`}
                  className="label link-underline text-ink"
                >
                  {tr.about.cta}
                </Link>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
