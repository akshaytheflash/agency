import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imperial-development.vercel.app"),
  title: {
    default: `${site.name} — Real websites, live in three days`,
    template: `%s — ${site.name}`,
  },
  description: site.lede,
  keywords: [
    "web development agency",
    "Next.js agency",
    "e-commerce development",
    "SaaS development",
    "New Delhi",
    "India web agency",
  ],
  openGraph: {
    title: `${site.name} — Real websites, live in three days`,
    description: site.lede,
    url: "https://imperial-development.vercel.app",
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Real websites, live in three days`,
    description: site.lede,
  },
  robots: { index: true, follow: true },
};

/* Runs before first paint:
   1. adds .js so scroll-reveal content starts hidden (JS-off users see
      everything, and hydration never flashes visible-then-hidden)
   2. reads the saved accent so the page never flashes lime and then swaps.
   Delete both if you lock the site to one theme and drop the reveals. */
const themeInit = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('imperial-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  email: site.email,
  foundingDate: site.founded,
  description: site.lede,
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrument.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
