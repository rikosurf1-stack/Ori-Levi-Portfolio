import Link from "next/link";
import { getContact } from "@/lib/site";
import { t, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const contact = getContact();
  const tr = t(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
        <div>
          <p className="font-sans text-sm uppercase tracking-wordmark">
            Ori&nbsp;Levi
          </p>
          <p className="mt-3 max-w-xs font-serif text-lg font-light leading-snug text-ink/70">
            {tr.footer.tagline}
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href={`/${locale}/about`} className="label link-underline">
            {tr.nav.about}
          </Link>
          <Link href={`/${locale}/contact`} className="label link-underline">
            {tr.nav.contact}
          </Link>
          <a
            href={`https://instagram.com/${contact.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="label link-underline"
          >
            Instagram
          </a>
        </nav>
      </div>
      <div className="mx-auto max-w-page px-6 pb-8 md:px-10">
        <p className="label text-muted">
          © {year} Ori Levi — {tr.footer.rights}
        </p>
      </div>
    </footer>
  );
}
