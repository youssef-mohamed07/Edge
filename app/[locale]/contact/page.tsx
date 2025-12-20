import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, siteUrl, type Locale } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Chatbot } from "../components/layout/Chatbot";
import { ContactPageContent } from "./ContactPageContent";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const dict = getDictionary(locale);
  const currentUrl = `${siteUrl}/${locale}/contact`;

  return {
    title: `${dict.contact.title} | EDGE for Garments`,
    description: dict.contact.subtitle,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/contact`,
        ar: `${siteUrl}/ar/contact`,
        "x-default": `${siteUrl}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#D8DDE9]">
      <Navbar locale={locale} dict={dict} />
      <ContactPageContent locale={locale} dict={dict} />
      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
