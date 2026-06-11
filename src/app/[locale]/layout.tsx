import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Inter, Spectral, Assistant, Frank_Ruhl_Libre } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { dir, isLocale, LOCALES, type Locale } from "@/lib/i18n";

// Latin faces
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-en-sans",
  display: "swap",
});
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-en-serif",
  display: "swap",
});

// Hebrew faces (clean sans + elegant serif) for a seamless RTL experience
const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-he-sans",
  display: "swap",
});
const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500"],
  variable: "--font-he-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ori Levi — Commercial Lifestyle Photographer",
  description:
    "Premium visual stories for hospitality, wellness, food & beverage, fashion and lifestyle brands.",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  // Map the active language onto the generic --font-sans / --font-serif vars.
  const fontVars =
    locale === "he"
      ? { "--font-sans": "var(--font-he-sans)", "--font-serif": "var(--font-he-serif)" }
      : { "--font-sans": "var(--font-en-sans)", "--font-serif": "var(--font-en-serif)" };

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${inter.variable} ${spectral.variable} ${assistant.variable} ${frankRuhl.variable}`}
      style={fontVars as CSSProperties}
    >
      <body className="font-sans antialiased">
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />

        {/* Netlify Identity: enables the /admin email-invite login once deployed. */}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", function (user) {
                if (!user) {
                  window.netlifyIdentity.on("login", function () {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
