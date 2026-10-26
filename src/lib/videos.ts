import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { VideoItem } from "./types";

const videosDir = path.join(process.cwd(), "content/videos");

function parseVideo(file: string): VideoItem {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(videosDir, file), "utf8");
  const { data } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    titleHe: data.title_he || undefined,
    vimeoId: String(data.vimeo_id ?? ""),
    orientation: data.orientation === "horizontal" ? "horizontal" : "vertical",
    description: data.description || undefined,
    descriptionHe: data.description_he || undefined,
    order: typeof data.order === "number" ? data.order : 999,
  };
}

export function getAllVideos(): VideoItem[] {
  if (!fs.existsSync(videosDir)) return [];
  return fs
    .readdirSync(videosDir)
    .filter((f) => f.endsWith(".md"))
    .map(parseVideo)
    .sort((a, b) => a.order - b.order);
}
