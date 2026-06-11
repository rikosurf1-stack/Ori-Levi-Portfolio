import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { categoryLabel, pick, type Locale } from "@/lib/i18n";

export default function ProjectCard({
  project,
  locale,
  priority = false,
}: {
  project: Project;
  locale: Locale;
  priority?: boolean;
}) {
  const title = pick(locale, project.title, project.titleHe);

  return (
    <Link href={`/${locale}/work/${project.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-line/50">
        <Image
          src={project.cover}
          alt={project.coverAlt || title}
          fill
          priority={priority}
          quality={86}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1600ms] ease-editorial group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl font-light leading-tight md:text-3xl">
          {title}
        </h3>
        <span className="label shrink-0 text-muted">
          {categoryLabel(project.category, locale)}
          <span className="mx-1.5 opacity-50">·</span>
          {project.year}
        </span>
      </div>
    </Link>
  );
}
