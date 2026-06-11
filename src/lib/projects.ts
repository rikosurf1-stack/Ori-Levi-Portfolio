import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { GalleryImage, Project } from "./types";

const projectsDir = path.join(process.cwd(), "content/projects");

function normalizeImages(raw: unknown): GalleryImage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item): GalleryImage | null => {
      if (typeof item === "string") return { src: item };
      if (item && typeof item === "object" && "src" in item) {
        const obj = item as { src?: string; alt?: string };
        if (!obj.src) return null;
        return { src: obj.src, alt: obj.alt };
      }
      return null;
    })
    .filter((i): i is GalleryImage => i !== null);
}

function parseProject(file: string): Project {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(projectsDir, file), "utf8");
  const { data } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    category: data.category ?? "",
    year: String(data.year ?? ""),
    location: data.location || undefined,
    description: data.description ?? "",
    cover: data.cover ?? "",
    coverAlt: data.coverAlt || data.title,
    featured: Boolean(data.featured),
    order: typeof data.order === "number" ? data.order : 999,
    images: normalizeImages(data.images),
  };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".md"))
    .map(parseProject)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

/** Returns the project that follows the given slug (wraps around). */
export function getNextProject(slug: string): Project | undefined {
  const all = getAllProjects();
  if (all.length < 2) return undefined;
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  return all[(index + 1) % all.length];
}
