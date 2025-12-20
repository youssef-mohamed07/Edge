import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, siteUrl, getDirection } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Chatbot } from "../components/layout/Chatbot";
import { PageHero } from "../components/PageHero";
import { supabase } from "../../../lib/supabase";
import productsJson from "../../../data/products.json";
import { ProductCategoriesSection } from "./ProductCategoriesSection";

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface Product {
  id: string;
  slug: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
  features: { en: string[]; ar: string[] };
}

async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: { en: p.title_en, ar: p.title_ar },
        description: { en: p.description_en, ar: p.description_ar },
        image: p.image,
        features: { en: p.features_en || [], ar: p.features_ar || [] },
      }));
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  
  // Fallback to JSON
  return productsJson.products.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    image: p.image,
    features: p.features,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const isRTL = locale === "ar";
  const currentUrl = `${siteUrl}/${locale}/products`;

  return {
    title: isRTL ? "منتجاتنا | إيدج للملابس" : "Our Products | EDGE for Garments",
    description: isRTL
      ? "ملابس عالية الجودة مصنوعة بدقة. من الدنيم الكلاسيكي إلى التصميمات المخصصة"
      : "Quality garments crafted with precision. From classic denim to custom designs",
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/products`,
        ar: `${siteUrl}/ar/products`,
        "x-default": `${siteUrl}/en/products`,
      },
    },
  };
}

export const revalidate = 0; // Disable caching to always fetch fresh data

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const products = await getProducts();
  
  const productCategories = products.map((p) => ({
    title: isRTL ? p.title.ar : p.title.en,
    slug: p.slug,
    image: p.image,
    description: isRTL ? p.description.ar : p.description.en,
    features: isRTL ? p.features.ar : p.features.en,
  }));

  const stats = isRTL
    ? [
        { number: "500", label: "الحد الأدنى للطلب", suffix: " قطعة" },
        { number: "45-60", label: "مدة التسليم", suffix: " يوم" },
        { number: "7-14", label: "تطوير العينات", suffix: " يوم" },
        { number: "1M+", label: "الطاقة السنوية", suffix: " قطعة" },
      ]
    : [
        { number: "500", label: "Minimum Order", suffix: " pcs" },
        { number: "45-60", label: "Lead Time", suffix: " days" },
        { number: "7-14", label: "Sample Dev", suffix: " days" },
        { number: "1M+", label: "Annual Capacity", suffix: "" },
      ];

  return (
    <main className="min-h-screen bg-[#D8DDE9]">
      <Navbar locale={locale} dict={dict} />

      <PageHero
        title={isRTL ? "منتجاتنا" : "Our Products"}
        subtitle={isRTL
          ? "ملابس عالية الجودة مصنوعة بدقة. من الدنيم الكلاسيكي إلى التصميمات المخصصة، نصنع منتجات تلبي أعلى المعايير."
          : "Quality garments crafted with precision. From classic denim to custom designs, we manufacture products that meet the highest standards."}
        image="https://images.unsplash.com/photo-1542272604-787c3835535d?w=1920&q=80"
        isRTL={isRTL}
        breadcrumbs={[
          { label: isRTL ? "الرئيسية" : "Home", href: `/${locale}` },
          { label: isRTL ? "منتجاتنا" : "Products" },
        ]}
        stats={stats.map(s => ({ number: s.number + s.suffix, label: s.label }))}
      />

      <ProductCategoriesSection 
        locale={locale}
        isRTL={isRTL}
        productCategories={productCategories}
      />

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
