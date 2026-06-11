import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import MotionReveal from "@/components/MotionReveal";
import {
  getAllProjects,
  getNextProject,
  getProject,
} from "@/lib/projects";
import {
  categoryByKey,
  categoryLabel,
  isLocale,
  LOCALES,
  pick,
  t,
  type Locale,
} from "@/lib/i18n";

export function generateStaticParams() {
  const slugs = getAllProjects().map((p) => p.slug);
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project — Ori Levi" };
  const locale = isLocale(params.locale) ? (params.locale as Locale) : "en";
  return {
    title: `${pick(locale, project.title, project.titleHe)} — Ori Levi`,
    description: pick(locale, project.description, project.descriptionHe),
  };
}

export default function ProjectPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const project = getProject(params.slug);
  if (!project) notFound();

  const tr = t(locale);
  const next = getNextProject(project.slug);
  const title = pick(locale, project.title, project.titleHe);
  const description = pick(locale, project.description, project.descriptionHe);
  const location = project.location
    ? pick(locale, project.location, project.locationHe)
    : undefined;
  const cat = categoryByKey(project.category);

  return (
    <article>
      {/* Immersive cover */}
      <div className="relative h-[78svh] w-full overflow-hidden bg-char md:h-[88svh]">
        <Image
          src={project.cover}
          alt={project.coverAlt || title}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-char/20 via-transparent to-char/45" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-10 md:pb-16">
          <div className="mx-auto max-w-page text-paper">
            <p className="label text-paper/80">
              {categoryLabel(project.category, locale)}
              {location ? ` — ${location}` : ""}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-extralight leading-none md:text-7xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta + description */}
      <div className="px-6 py-16 md:px-10 md:py-28">
        <div className="mx-auto max-w-page">
          {cat && (
            <MotionReveal>
              <Link
                href={`/${locale}/category/${cat.slug}`}
                className="label link-underline text-muted"
              >
                {tr.project.backTo} {locale === "he" ? cat.he : cat.en}
              </Link>
            </MotionReveal>
          )}
          <MotionReveal>
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-4">
                <dl className="space-y-6">
                  <div>
                    <dt className="label text-muted">{tr.project.category}</dt>
                    <dd className="mt-2 font-serif text-xl font-light">
                      {categoryLabel(project.category, locale)}
                    </dd>
                  </div>
                  {location && (
                    <div>
                      <dt className="label text-muted">
                        {tr.project.location}
                      </dt>
                      <dd className="mt-2 font-serif text-xl font-light">
                        {location}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="label text-muted">{tr.project.year}</dt>
                    <dd className="mt-2 font-serif text-xl font-light">
                      {project.year}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="md:col-span-8">
                <p className="font-serif text-2xl font-light leading-relaxed text-ink/85 md:text-3xl md:leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>

      {/* Editorial gallery */}
      <div className="px-6 pb-24 md:px-10 md:pb-36">
        <div className="mx-auto max-w-page">
          <Gallery images={project.images} />
        </div>
      </div>

      {/* Next project */}
      {next && (
        <Link
          href={`/${locale}/work/${next.slug}`}
          className="group relative block h-[52svh] w-full overflow-hidden bg-char md:h-[64svh]"
        >
          <Image
            src={next.cover}
            alt={next.coverAlt || next.title}
            fill
            quality={88}
            sizes="100vw"
            className="object-cover opacity-80 transition-all duration-[1600ms] ease-editorial group-hover:scale-[1.04] group-hover:opacity-95"
          />
          <div className="absolute inset-0 bg-char/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-paper">
            <p className="label text-paper/80">{tr.project.next}</p>
            <p className="mt-4 font-serif text-4xl font-extralight md:text-6xl">
              {pick(locale, next.title, next.titleHe)}
            </p>
          </div>
        </Link>
      )}
    </article>
  );
}
