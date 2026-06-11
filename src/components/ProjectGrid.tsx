import type { Project } from "@/lib/types";
import MotionReveal from "./MotionReveal";
import ProjectCard from "./ProjectCard";

/**
 * Two-column editorial grid. Every second card is nudged down to create the
 * staggered rhythm of a printed portfolio rather than a uniform gallery.
 */
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
      {projects.map((project, i) => (
        <div key={project.slug} className={i % 2 === 1 ? "md:mt-32" : ""}>
          <MotionReveal delay={(i % 2) * 0.08}>
            <ProjectCard project={project} priority={i < 2} />
          </MotionReveal>
        </div>
      ))}
    </div>
  );
}
