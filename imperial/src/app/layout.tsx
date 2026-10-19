import type { Metadata, Viewport } from "next";
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

const ORIGIN = "https://imperial-development.vercel.app";
const TITLE = `${site.name} — Real websites, live in three days`;

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: {
    default: TITLE,
    template: `%s — ${site.name}`,
  },
  description: site.lede,
  applicationName: site.name,
  authors: [{ name: site.name, url: ORIGIN }],
  creator: site.email,
  publisher: site.name,
  keywords: [
    "web development agency",
    "Next.js agency",
    "e-commerce development",
    "SaaS development",
    "New Delhi",
    "India web agency",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: site.lede,
    url: ORIGIN,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.headline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: site.lede,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ede7da" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0c" },
  ],
};

/* Runs before first paint:
   1. adds .js so scroll-reveal content starts hidden (JS-off users see
      everything, and hydration never flashes visible-then-hidden)
   2. reads the saved accent so the page never flashes lime and then swaps.
   Delete both if you lock the site to one theme and drop the reveals. */
const themeInit = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('imperial-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  alternateName: site.shortName,
  url: ORIGIN,
  logo: `${ORIGIN}/icon.svg`,
  image: `${ORIGIN}/og.png`,
  email: site.email,
  description: site.lede,
  foundingDate: `${site.founded}-01-01`,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "Worldwide" },
  ],
  knowsAbout: [
    "Web development",
    "Next.js",
    "E-commerce",
    "SaaS",
    "Design systems",
    "DevOps",
    "AI integration",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.email,
    availableLanguage: ["en"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="lime"
      className={`${instrument.variable} ${inter.variable}`}
    >
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
