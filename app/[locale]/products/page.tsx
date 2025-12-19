import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isValidLocale, siteUrl, getDirection } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Chatbot } from "../components/layout/Chatbot";
import { PageHero } from "../components/PageHero";
import { supabase } from "../../../lib/supabase";
import productsJson from "../../../data/products.json";

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

  const capabilities = isRTL
    ? [
        { label: "الحد الأدنى للطلب", value: "500 قطعة" },
        { label: "مدة التسليم", value: "45-60 يوم" },
        { label: "تطوير العينات", value: "7-14 يوم" },
        { label: "الطاقة السنوية", value: "+1M قطعة" },
      ]
    : [
        { label: "Minimum Order Quantity", value: "500 pcs" },
        { label: "Lead Time", value: "45-60 days" },
        { label: "Sample Development", value: "7-14 days" },
        { label: "Annual Capacity", value: "1M+ pieces" },
      ];

  return (
    <main className="min-h-screen bg-white">
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
      />

      <section className="py-8 border-b border-[#D8DDE9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.label} className={`text-center lg:text-left ${isRTL ? "lg:text-right" : ""}`}>
                <div className={`text-[#122D8B]/50 text-sm uppercase tracking-wide mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{cap.label}</div>
                <div className={`text-[#122D8B] text-xl font-bold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{cap.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "فئات المنتجات" : "Product Categories"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((product) => (
              <div key={product.slug} className={`group border border-[#D8DDE9] hover:border-[#1A4AFF]/30 transition-all ${isRTL ? "text-right" : ""}`}>
                <div className="aspect-[4/3] bg-[#D8DDE9] relative overflow-hidden">
                  <Image src={product.image} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute bottom-0 w-0 h-1 bg-[#1A4AFF] group-hover:w-full transition-all duration-300 ${isRTL ? "right-0" : "left-0"}`} />
                </div>

                <div className="p-6">
                  <h3 className={`text-xl text-[#122D8B] mb-3 font-bold uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{product.title}</h3>
                  <p className={`text-[#122D8B]/60 text-sm mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{product.description}</p>

                  <ul className={`space-y-2 mb-6 ${isRTL ? "text-right" : ""}`}>
                    {product.features.map((feature) => (
                      <li key={feature} className={`flex items-center gap-2 text-sm text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        <div className="w-1.5 h-1.5 bg-[#1A4AFF] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={`/${locale}/products/${product.slug}`} className={`text-[#1A4AFF] font-semibold text-sm uppercase tracking-wide hover:text-[#122D8B] transition-colors inline-flex items-center gap-2 ${isRTL ? "flex-row-reverse font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "عرض التفاصيل" : "View Details"}
                    <span>{isRTL ? "←" : "→"}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
