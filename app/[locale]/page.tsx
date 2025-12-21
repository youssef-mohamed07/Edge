import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, siteUrl, type Locale } from "../i18n/config";
import { getDictionary } from "../i18n/dictionaries";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Chatbot } from "./components/layout/Chatbot";
import {
  HeroSection,
  QuoteSection,
  OurServicesSection,
  AIAgentFormSection,
  PartnersSection,
  ProductsSection,
  PortfolioSection,
  FactoryVideoSection,
  TestimonialSection,
  AIGuideSection,
  LocationsMapSection,
  FAQSection,
} from "./sections";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Generate metadata for this specific page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (!isValidLocale(locale)) {
    return {};
  }

  const dict = getDictionary(locale);
  const currentUrl = `${siteUrl}/${locale}`;

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en`,
        ar: `${siteUrl}/ar`,
        "x-default": `${siteUrl}/en`,
      },
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-alabaster-grey overflow-x-hidden">
      <Navbar locale={locale} dict={dict} />
      <HeroSection locale={locale} dict={dict} />
      <QuoteSection locale={locale} />
      <OurServicesSection locale={locale} dict={dict} />
      <PartnersSection locale={locale} dict={dict} />
      <ProductsSection locale={locale} dict={dict} />
      <PortfolioSection locale={locale} dict={dict} />
      <AIAgentFormSection locale={locale} />
      <FactoryVideoSection locale={locale} />
      <TestimonialSection locale={locale} dict={dict} />
       <AIGuideSection locale={locale} />
  
      <LocationsMapSection locale={locale} />
          <FAQSection locale={locale} dict={dict} />
     
      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
