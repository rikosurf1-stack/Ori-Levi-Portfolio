export type GalleryImage = {
  src: string;
  alt?: string;
};

/** Raw project as stored in Markdown (both languages present). */
export type Project = {
  slug: string;
  title: string;
  titleHe?: string;
  category: string; // canonical English key, e.g. "Hospitality"
  year: string;
  location?: string;
  locationHe?: string;
  description: string;
  descriptionHe?: string;
  cover: string;
  coverAlt?: string;
  featured?: boolean;
  order?: number;
  images: GalleryImage[];
};

export type HomeContent = {
  name: string;
  tagline: string;
  taglineHe?: string;
  heroImages: string[];
};

export type AboutContent = {
  portrait: string;
  headline: string;
  headlineHe?: string;
  paragraphs: string[];
  paragraphsHe: string[];
};

export type ContactContent = {
  whatsapp: string;
  instagram: string;
  background: string;
};
