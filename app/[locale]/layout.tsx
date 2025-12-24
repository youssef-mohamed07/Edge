import type { Metadata } from "next";
import { Manrope, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isValidLocale, getDirection, siteUrl, type Locale } from "../i18n/config";
import { getDictionary } from "../i18n/dictionaries";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Generate metadata with proper SEO tags
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!isValidLocale(locale)) {
    return {};
  }

  const dict = getDictionary(locale);
  const currentUrl = `${siteUrl}/${locale}`;

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: [
      "garment manufacturing",
      "denim",
      "Egypt",
      "Port Said",
      "woven garments",
      "workwear",
      "custom garments",
    ],
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en`,
        ar: `${siteUrl}/ar`,
        "x-default": `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: currentUrl,
      siteName: "EDGE for Garments",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale - return 404 for invalid locales
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dir = getDirection(locale);
  const currentUrl = `${siteUrl}/${locale}`;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* Favicon - multiple sizes for better visibility */}
        <link rel="icon" href="/logo-original.png" type="image/png" sizes="any" />
        <link rel="icon" href="/logo-original.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/logo-original.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/logo-original.png" sizes="180x180" />
        <link rel="shortcut icon" href="/logo-original.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* hreflang tags for all language versions */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
        <link rel="alternate" hrefLang="ar" href={`${siteUrl}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en`} />
      </head>
      <body className={`${manrope.variable} ${cairo.variable} antialiased overflow-x-hidden`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
