"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // On the home page the header floats in white over the hero.
  const overHero = isHome && !open;
  const tone = overHero ? "text-paper" : "text-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${
        isHome ? "" : "bg-paper/85 backdrop-blur-sm"
      }`}
    >
      <div
        className={`mx-auto flex max-w-page items-center justify-between px-6 py-6 md:px-10 md:py-7 ${tone} transition-colors duration-500`}
      >
        <Link
          href="/"
          className="font-sans text-sm font-medium uppercase tracking-wordmark"
          aria-label="Ori Levi — home"
        >
          Ori&nbsp;Levi
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`label link-underline ${
                  active ? "opacity-100" : "opacity-80 hover:opacity-100"
                } transition-opacity`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="label md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-paper transition-all duration-500 ease-editorial md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {NAV.map((item) => (
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
