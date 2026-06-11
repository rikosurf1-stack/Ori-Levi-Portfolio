import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { AboutContent, ContactContent, HomeContent } from "./types";

const siteDir = path.join(process.cwd(), "content/site");

function read(file: string) {
  return matter(fs.readFileSync(path.join(siteDir, file), "utf8"));
}

function toParagraphs(value: unknown): string[] {
  if (typeof value !== "string") return [];
  return value
    .trim()
    .split(/\n\n+/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

export function getHome(): HomeContent {
  const { data } = read("home.md");
  const heroImages = Array.isArray(data.heroImages)
    ? data.heroImages
        .map((h: unknown) =>
          typeof h === "string" ? h : (h as { src?: string })?.src,
        )
        .filter((s: unknown): s is string => typeof s === "string")
    : [];

  return {
    name: data.name ?? "Ori Levi",
    tagline: data.tagline ?? "Commercial Lifestyle Photographer",
    taglineHe: data.tagline_he || undefined,
    heroImages,
  };
}

export function getAbout(): AboutContent {
  const { data, content } = read("about.md");
  // Body can live in front matter (`body` / `body_he`) or, for English, the
  // Markdown body. Front matter takes precedence when present.
  const enParas =
    toParagraphs(data.body).length > 0
      ? toParagraphs(data.body)
      : toParagraphs(content);

  return {
    portrait: data.portrait ?? "",
    headline: data.headline ?? "",
    headlineHe: data.headline_he || undefined,
    paragraphs: enParas,
    paragraphsHe: toParagraphs(data.body_he),
  };
}

export function getContact(): ContactContent {
  const { data } = read("contact.md");
  return {
    whatsapp: String(data.whatsapp ?? ""),
    instagram: String(data.instagram ?? "").replace(/^@/, ""),
    background: data.background ?? "",
  };
}
