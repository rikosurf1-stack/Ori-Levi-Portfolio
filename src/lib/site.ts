import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { AboutContent, ContactContent, HomeContent } from "./types";

const siteDir = path.join(process.cwd(), "content/site");

function read(file: string) {
  return matter(fs.readFileSync(path.join(siteDir, file), "utf8"));
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
    heroImages,
  };
}

export function getAbout(): AboutContent {
  const { data, content } = read("about.md");
  const paragraphs = content
    .trim()
    .split(/\n\n+/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);

  return {
    portrait: data.portrait ?? "",
    headline: data.headline ?? "",
    paragraphs,
  };
}

export function getContact(): ContactContent {
  const { data } = read("contact.md");
  return {
    whatsapp: String(data.whatsapp ?? ""),
    instagram: String(data.instagram ?? "").replace(/^@/, ""),
    email: data.email ?? "",
    background: data.background ?? "",
  };
}
