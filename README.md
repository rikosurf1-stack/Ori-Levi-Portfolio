# Ori Levi — Portfolio

A premium, project-first portfolio website for **Ori Levi, Commercial Lifestyle
Photographer**. Built to feel like the work of a high-end creative studio, and to be
maintained by a non-technical person through a visual editor at `/admin`.

> **Just want to add a project or change text?** You don't need this file.
> Read **[GUIDE.md](GUIDE.md)** — it's written in plain language.

---

## Tech stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | framer-motion (subtle) |
| Content | Markdown files in `/content` (parsed with `gray-matter`) |
| Editor | Decap CMS at `/admin` (Git-based, no database) |
| Hosting | Netlify |

Fonts: **Spectral** (editorial serif, for headlines) + **Inter** (UI/body).

---

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Build for production with `npm run build`.

---

## Project structure

```
content/
  projects/            ← one Markdown file per project (the portfolio)
  site/                ← home.md, about.md, contact.md (editable copy & settings)
public/
  admin/               ← Decap CMS (the /admin editor) + its config.yml
  images/uploads/      ← photos uploaded through the CMS land here
src/
  app/                 ← pages (home, work, work/[slug], about, contact, 404)
  components/          ← Header, Footer, Hero, ProjectGrid, Gallery, etc.
  lib/                 ← content loaders (projects.ts, site.ts) + types.ts
```

### How content becomes pages

- `src/lib/projects.ts` reads every `content/projects/*.md`, sorts by `order`, and
  feeds the Work grid and project pages. The filename is the URL slug.
- `src/lib/site.ts` reads `content/site/*.md` for the hero, About and Contact.
- The project **gallery layout is automatic** — the photographer only uploads images;
  `src/components/Gallery.tsx` arranges them into an editorial rhythm of full-width
  frames and two-up pairs.

### Images

`next/image` serves responsive, high-quality images (quality 86–90, no aggressive
compression). The demo content uses `picsum.photos` placeholders (allowed in
`next.config.mjs`). Real photos uploaded via `/admin` are stored locally and need no
config. To paste an Unsplash link, that domain is already allowed too.

---

## Deployment (Netlify) — short version

1. Push this repo to GitHub.
2. Netlify → **Add new site → Import from GitHub**. Build settings are auto-detected
   from `netlify.toml`.
3. Enable **Identity** and, under Identity → Services, **Git Gateway**.
4. Invite Ori's email under Identity → Invite users. He sets a password and edits at
   `https://your-site/admin/`.

Full, click-by-click instructions (including connecting a custom domain) are in
**[GUIDE.md](GUIDE.md)**.

---

## Things to replace before launch

- `content/site/contact.md` → real **WhatsApp number** and **email**
  (currently placeholders).
- Swap the demo `picsum.photos` imagery for Ori's real photographs via `/admin`.

## Upgrade path

If the photo library grows very large, the content layer can be moved to **Sanity**
(hosted image CDN) without changing the front-end components — they only depend on the
`Project` type in `src/lib/types.ts`.
