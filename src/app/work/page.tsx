import type { Metadata } from "next";
import MotionReveal from "@/components/MotionReveal";
import ProjectGrid from "@/components/ProjectGrid";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — Ori Levi",
  description:
    "Selected commercial lifestyle projects across hospitality, wellness, food & beverage, fashion and events.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="px-6 pb-24 pt-32 md:px-10 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-page">
        <MotionReveal>
          <header className="mb-16 max-w-3xl md:mb-24">
            <p className="label text-muted">Selected Work</p>
            <h1 className="mt-5 font-serif text-4xl font-extralight leading-[1.1] md:text-6xl">
              Visual stories for hospitality, wellness, food, fashion and
              lifestyle brands.
            </h1>
          </header>
        </MotionReveal>

        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
