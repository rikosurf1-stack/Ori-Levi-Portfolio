import type { Metadata } from "next";
import { Inter, Spectral } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ori Levi — Commercial Lifestyle Photographer",
  description:
    "Ori Levi is a commercial lifestyle photographer creating premium visual stories for hospitality, wellness, food & beverage, fashion and lifestyle brands.",
  openGraph: {
    title: "Ori Levi — Commercial Lifestyle Photographer",
    description:
      "Premium visual stories for hospitality, wellness, food & beverage, fashion and lifestyle brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spectral.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />

        {/*
          Netlify Identity: lets an email-invite link redirect into the CMS.
          Only does anything once the site is deployed to Netlify with Identity on.
        */}
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
