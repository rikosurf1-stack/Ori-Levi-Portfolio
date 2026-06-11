import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

export default function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-line/50">
        <Image
          src={project.cover}
          alt={project.coverAlt || project.title}
          fill
          priority={priority}
          quality={86}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1600ms] ease-editorial group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl font-light leading-tight md:text-3xl">
          {project.title}
        </h3>
        <span className="label shrink-0 text-muted">
          {project.category}
          <span className="mx-1.5 opacity-50">·</span>
          {project.year}
        </span>
      </div>
    </Link>
  );
}
