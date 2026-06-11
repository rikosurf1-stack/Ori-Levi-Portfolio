export const LOCALES = ["en", "he"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "he" ? "rtl" : "ltr";
}

/** Pick the right value for the active language, falling back to English. */
export function pick(locale: Locale, en: string, he?: string): string {
  if (locale === "he" && he && he.trim().length > 0) return he;
  return en;
}

/**
 * The work fields. `key` is the canonical English value stored on each project
 * (matches `category` in the Markdown). `slug` is the URL. Order here sets order
 * on the home screen.
 */
export const CATEGORIES = [
  { slug: "hospitality", key: "Hospitality", en: "Hospitality", he: "אירוח" },
  { slug: "wellness", key: "Wellness", en: "Wellness", he: "וולנס" },
  {
    slug: "food-beverage",
    key: "Food & Beverage",
    en: "Food & Beverage",
    he: "אוכל ומשקאות",
  },
  { slug: "fashion", key: "Fashion", en: "Fashion", he: "אופנה" },
  { slug: "lifestyle", key: "Lifestyle", en: "Lifestyle", he: "לייפסטייל" },
  { slug: "events", key: "Events", en: "Events", he: "אירועים" },
  { slug: "retreats", key: "Retreats", en: "Retreats", he: "ריטריטים" },
] as const;

export type Category = (typeof CATEGORIES)[number];

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoryByKey(key: string): Category | undefined {
  return CATEGORIES.find((c) => c.key === key);
}

export function categoryLabel(key: string, locale: Locale): string {
  const c = categoryByKey(key);
  if (!c) return key;
  return locale === "he" ? c.he : c.en;
}

type Dict = {
  nav: { about: string; contact: string; work: string };
  home: { eyebrow: string };
  category: { back: string; empty: string; index: string };
  project: {
    category: string;
    location: string;
    year: string;
    next: string;
    backTo: string;
  };
  about: { eyebrow: string; workingAcross: string; cta: string };
  contact: {
    eyebrow: string;
    headline: string;
    sub: string;
    whatsapp: string;
    instagram: string;
  };
  footer: { tagline: string; rights: string };
  notFound: { title: string; back: string };
  language: { label: string };
};

const DICTIONARIES: Record<Locale, Dict> = {
  en: {
    nav: { about: "About", contact: "Contact", work: "Work" },
    home: { eyebrow: "Explore by field" },
    category: {
      back: "All work",
      empty: "Selected work in this field is coming soon.",
      index: "Projects",
    },
    project: {
      category: "Category",
      location: "Location",
      year: "Year",
      next: "Next Project",
      backTo: "Back to",
    },
    about: {
      eyebrow: "About",
      workingAcross: "Working across",
      cta: "Start a Project",
    },
    contact: {
      eyebrow: "Contact",
      headline: "Let’s create something worth remembering.",
      sub: "Available worldwide for hospitality, wellness, food & beverage, fashion and lifestyle commissions.",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
    },
    footer: {
      tagline:
        "Commercial lifestyle photography for brands that care how they are seen.",
      rights: "All rights reserved",
    },
    notFound: { title: "This page wandered off.", back: "Back Home" },
    language: { label: "עברית" },
  },
  he: {
    nav: { about: "אודות", contact: "יצירת קשר", work: "עבודות" },
    home: { eyebrow: "עיון לפי תחום" },
    category: {
      back: "כל העבודות",
      empty: "עבודות נבחרות בתחום זה יתווספו בקרוב.",
      index: "פרויקטים",
    },
    project: {
      category: "תחום",
      location: "מיקום",
      year: "שנה",
      next: "הפרויקט הבא",
      backTo: "חזרה ל",
    },
    about: {
      eyebrow: "אודות",
      workingAcross: "תחומי עבודה",
      cta: "בואו ניצור פרויקט",
    },
    contact: {
      eyebrow: "יצירת קשר",
      headline: "בואו ניצור משהו ששווה לזכור.",
      sub: "זמין לעבודות ברחבי העולם — אירוח, וולנס, אוכל ומשקאות, אופנה ולייפסטייל.",
      whatsapp: "וואטסאפ",
      instagram: "אינסטגרם",
    },
    footer: {
      tagline: "צילום לייפסטייל מסחרי למותגים שאכפת להם איך הם נראים.",
      rights: "כל הזכויות שמורות",
    },
    notFound: { title: "הדף הזה אבד בדרך.", back: "חזרה לעמוד הבית" },
    language: { label: "EN" },
  },
};

export function t(locale: Locale): Dict {
  return DICTIONARIES[locale];
}
