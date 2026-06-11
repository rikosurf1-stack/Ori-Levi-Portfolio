import type { Metadata } from "next";
import Image from "next/image";
import { getContact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Ori Levi",
  description:
    "Get in touch with Ori Levi to commission commercial lifestyle photography.",
};

export default function ContactPage() {
  const contact = getContact();
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`;
  const instagramHref = `https://instagram.com/${contact.instagram}`;

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink px-6 py-32">
      {/* Photographic background */}
      {contact.background && (
        <Image
          src={contact.background}
          alt=""
          fill
          priority
          quality={88}
          sizes="100vw"
          className="object-cover opacity-70"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />

      <div className="relative w-full max-w-2xl text-center text-paper">
        <p className="label text-paper/80">Contact</p>
        <h1 className="mt-6 font-serif text-4xl font-extralight leading-[1.15] md:text-6xl">
          Let&rsquo;s create something
          <br className="hidden sm:block" /> worth remembering.
        </h1>
        <p className="mx-auto mt-7 max-w-md font-sans text-base leading-relaxed text-paper/80">
          Available worldwide for hospitality, wellness, food &amp; beverage,
          fashion and lifestyle commissions.
        </p>

        {/* Call-to-action buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-paper px-9 py-4 text-center font-sans text-[11px] uppercase tracking-label text-ink transition-colors duration-300 hover:bg-paper/90 sm:w-auto"
          >
            WhatsApp
          </a>
          <a
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full border border-paper/50 px-9 py-4 text-center font-sans text-[11px] uppercase tracking-label text-paper transition-colors duration-300 hover:border-paper hover:bg-paper/10 sm:w-auto"
          >
            Instagram
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-paper/75">
          <a
            href={`mailto:${contact.email}`}
            className="link-underline font-sans text-sm"
          >
            {contact.email}
          </a>
          <a
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-sans text-sm"
          >
            @{contact.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}
