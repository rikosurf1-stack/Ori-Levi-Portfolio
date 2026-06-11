export type GalleryImage = {
  src: string;
  alt?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  location?: string;
  description: string;
  cover: string;
  coverAlt?: string;
  featured?: boolean;
  order?: number;
  images: GalleryImage[];
};

export type HomeContent = {
  name: string;
  tagline: string;
  heroImages: string[];
};

export type AboutContent = {
  portrait: string;
  headline: string;
  paragraphs: string[];
};

export type ContactContent = {
  whatsapp: string;
  instagram: string;
  email: string;
  background: string;
};
