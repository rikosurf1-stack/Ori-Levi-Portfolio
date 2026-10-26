"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isLocale, LOCALES, t, type Locale } from "@/lib/i18n";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const tr = t(locale);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const other: Locale = locale === "en" ? "he" : "en";
  const switchPath = (() => {
    const seg = pathname.split("/");
    if (seg[1] && isLocale(seg[1])) {
      seg[1] = other;
      return seg.join("/") || `/${other}`;
    }
    return `/${other}`;
  })();

  const nav = [
    { href: `/${locale}/about`, label: tr.nav.about },
    { href: `/${locale}/contact`, label: tr.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-5 text-ink md:px-10 md:py-6">
        <Link
          href={`/${locale}`}
          className="font-sans text-sm font-medium uppercase tracking-wordmark"
          aria-label="Ori Levi — home"
        >
          Ori&nbsp;Levi
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`label link-underline ${
                pathname.startsWith(item.href)
                  ? "opacity-100"
                  : "opacity-80 hover:opacity-100"
              } transition-opacity`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={switchPath}
            className="label text-muted transition-opacity hover:text-ink"
            lang={other}
          >
            {tr.language.label}
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-5 md:hidden">
          <Link
            href={switchPath}
            className="label text-muted"
            lang={other}
            onClick={() => setOpen(false)}
          >
            {tr.language.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="label"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? "×" : "—"}
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-paper transition-all duration-500 ease-editorial md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-serif text-4xl font-light text-ink"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
