import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getContact } from "@/lib/site";
import { isLocale, t, type Locale } from "@/lib/i18n";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "en";
  return {
    title: locale === "he" ? "יצירת קשר — Ori Levi" : "Contact — Ori Levi",
  };
}

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const contact = getContact();
  const tr = t(locale);
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`;
  const instagramHref = `https://instagram.com/${contact.instagram}`;

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-char px-6 py-32">
      {contact.background && (
        <Image
          src={contact.background}
          alt=""
          fill
          priority
          quality={88}
          sizes="100vw"
          className="object-cover opacity-65"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-char/65 via-char/45 to-char/75" />

      <div className="relative w-full max-w-2xl text-center text-paper">
        <p className="label text-paper/80">{tr.contact.eyebrow}</p>
        <h1 className="mt-6 font-serif text-4xl font-extralight leading-[1.15] md:text-6xl">
          {tr.contact.headline}
        </h1>
        <p className="mx-auto mt-7 max-w-md font-sans text-base leading-relaxed text-paper/80">
          {tr.contact.sub}
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-paper px-9 py-4 text-center font-sans text-[11px] uppercase tracking-label text-ink transition-colors duration-300 hover:bg-paper/90 sm:w-auto"
          >
            {tr.contact.whatsapp}
          </a>
          <a
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full border border-paper/50 px-9 py-4 text-center font-sans text-[11px] uppercase tracking-label text-paper transition-colors duration-300 hover:border-paper hover:bg-paper/10 sm:w-auto"
          >
            {tr.contact.instagram}
          </a>
        </div>

      </div>
    </section>
  );
}
