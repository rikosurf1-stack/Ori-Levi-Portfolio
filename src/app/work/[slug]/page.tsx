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

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project — Ori Levi" };
  return {
    title: `${project.title} — Ori Levi`,
    description: project.description,
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);

  return (
    <article>
      {/* Immersive cover */}
      <div className="relative h-[78svh] w-full overflow-hidden bg-ink md:h-[88svh]">
        <Image
          src={project.cover}
          alt={project.coverAlt || project.title}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/40" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-10 md:pb-16">
          <div className="mx-auto max-w-page text-paper">
            <p className="label text-paper/80">
              {project.category}
              {project.location ? ` — ${project.location}` : ""}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-extralight leading-none md:text-7xl">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta + description */}
      <div className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-page">
          <MotionReveal>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-4">
                <dl className="space-y-6">
                  <div>
                    <dt className="label text-muted">Category</dt>
                    <dd className="mt-2 font-serif text-xl font-light">
                      {project.category}
                    </dd>
                  </div>
                  {project.location && (
                    <div>
                      <dt className="label text-muted">Location</dt>
                      <dd className="mt-2 font-serif text-xl font-light">
                        {project.location}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="label text-muted">Year</dt>
                    <dd className="mt-2 font-serif text-xl font-light">
                      {project.year}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="md:col-span-8">
                <p className="font-serif text-2xl font-light leading-relaxed text-ink/85 md:text-3xl md:leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>

      {/* Editorial gallery */}
      <div className="px-6 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-page">
          <Gallery images={project.images} />
        </div>
      </div>

      {/* Next project */}
      {next && (
        <Link
          href={`/work/${next.slug}`}
          className="group relative block h-[52svh] w-full overflow-hidden bg-ink md:h-[64svh]"
        >
          <Image
            src={next.cover}
            alt={next.coverAlt || next.title}
            fill
            quality={88}
            sizes="100vw"
            className="object-cover opacity-80 transition-all duration-[1600ms] ease-editorial group-hover:scale-[1.04] group-hover:opacity-95"
          />
          <div className="absolute inset-0 bg-ink/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-paper">
            <p className="label text-paper/80">Next Project</p>
            <p className="mt-4 font-serif text-4xl font-extralight md:text-6xl">
              {next.title}
            </p>
          </div>
        </Link>
      )}
    </article>
  );
}
