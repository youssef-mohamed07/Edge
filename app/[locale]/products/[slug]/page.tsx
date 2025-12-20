import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isValidLocale, siteUrl, getDirection } from "../../../i18n/config";
import { getDictionary } from "../../../i18n/dictionaries";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Chatbot } from "../../components/layout/Chatbot";
import { PageHero } from "../../components/PageHero";
import { supabase } from "../../../../lib/supabase";
import productsJson from "../../../../data/products.json";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

interface Product {
  id: string;
  slug: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  longDescription: { en: string; ar: string };
  image: string;
  gallery: string[];
  features: { en: string[]; ar: string[] };
  specifications: { en: Record<string, string>; ar: Record<string, string> };
  category: string;
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!error && data) {
      return {
        id: data.id,
        slug: data.slug,
        title: { en: data.title_en, ar: data.title_ar },
        description: { en: data.description_en, ar: data.description_ar },
        longDescription: { en: data.long_description_en, ar: data.long_description_ar },
        image: data.image,
        gallery: data.gallery || [],
        features: { en: data.features_en || [], ar: data.features_ar || [] },
        specifications: { en: data.specifications_en || {}, ar: data.specifications_ar || {} },
        category: data.category,
      };
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
  
  // Fallback to JSON
  const jsonProduct = productsJson.products.find((p) => p.slug === slug);
  if (jsonProduct) {
    return {
      id: jsonProduct.id,
      slug: jsonProduct.slug,
      title: jsonProduct.title as { en: string; ar: string },
      description: jsonProduct.description as { en: string; ar: string },
      longDescription: jsonProduct.longDescription as { en: string; ar: string },
      image: jsonProduct.image,
      gallery: jsonProduct.gallery,
      features: jsonProduct.features as { en: string[]; ar: string[] },
      specifications: jsonProduct.specifications as unknown as { en: Record<string, string>; ar: Record<string, string> },
      category: jsonProduct.category,
    };
  }
  return null;
}

async function getRelatedProducts(category: string, currentSlug: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .neq("slug", currentSlug)
      .limit(3);

    if (!error && data && data.length > 0) {
      return data.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: { en: p.title_en, ar: p.title_ar },
        description: { en: p.description_en, ar: p.description_ar },
        longDescription: { en: p.long_description_en, ar: p.long_description_ar },
        image: p.image,
        gallery: p.gallery || [],
        features: { en: p.features_en || [], ar: p.features_ar || [] },
        specifications: { en: p.specifications_en || {}, ar: p.specifications_ar || {} },
        category: p.category,
      }));
    }
  } catch (error) {
    console.error("Error fetching related products:", error);
  }
  
  return productsJson.products
    .filter((p) => p.category === category && p.slug !== currentSlug)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title as { en: string; ar: string },
      description: p.description as { en: string; ar: string },
      longDescription: p.longDescription as { en: string; ar: string },
      image: p.image,
      gallery: p.gallery,
      features: p.features as { en: string[]; ar: string[] },
      specifications: p.specifications as unknown as { en: Record<string, string>; ar: Record<string, string> },
      category: p.category,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const product = await getProduct(slug);
  if (!product) return {};

  const isRTL = locale === "ar";
  const title = isRTL ? product.title.ar : product.title.en;
  const description = isRTL ? product.description.ar : product.description.en;
  const currentUrl = `${siteUrl}/${locale}/products/${slug}`;

  return {
    title: `${title} | ${isRTL ? "إيدج للملابس" : "EDGE for Garments"}`,
    description,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/products/${slug}`,
        ar: `${siteUrl}/ar/products/${slug}`,
        "x-default": `${siteUrl}/en/products/${slug}`,
      },
    },
    openGraph: { title, description, images: [product.image] },
  };
}

export const revalidate = 0;

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const product = await getProduct(slug);
  if (!product) notFound();

  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const title = isRTL ? product.title.ar : product.title.en;
  const description = isRTL ? product.description.ar : product.description.en;
  const longDescription = isRTL ? product.longDescription.ar : product.longDescription.en;
  const features = isRTL ? product.features.ar : product.features.en;
  const specifications = isRTL ? product.specifications.ar : product.specifications.en;

  const relatedProducts = await getRelatedProducts(product.category, slug);
  const galleryImages = product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <main className="min-h-screen bg-[#D8DDE9] overflow-x-hidden" dir={dir}>
      <Navbar locale={locale} dict={dict} />

      <PageHero
        title={title}
        subtitle={description}
        image={galleryImages[0]}
        isRTL={isRTL}
        breadcrumbs={[
          { label: isRTL ? "الرئيسية" : "Home", href: `/${locale}` },
          { label: isRTL ? "المنتجات" : "Products", href: `/${locale}/products` },
          { label: title },
        ]}
      />

      <section className="py-12 lg:py-20 bg-[#D8DDE9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`grid lg:grid-cols-2 gap-12 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-[#D8DDE9] relative overflow-hidden">
                <Image src={galleryImages[0]} alt={title} fill className="object-cover" priority />
              </div>
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {galleryImages.slice(1).map((img, idx) => (
                    <div key={idx} className="aspect-square bg-[#D8DDE9] relative overflow-hidden">
                      <Image src={img} alt={`${title} ${idx + 2}`} fill className="object-cover hover:scale-105 transition-transform" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={isRTL ? "text-right" : ""}>
              <h1 className={`text-3xl lg:text-4xl font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{title}</h1>
              <p className={`text-lg text-[#122D8B]/70 mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{description}</p>
              <p className={`text-[#122D8B]/60 mb-8 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{longDescription}</p>

              <div className="mb-8">
                <h3 className={`text-lg font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{isRTL ? "المميزات" : "Features"}</h3>
                <ul className="space-y-3">
                  {features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center gap-3 text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      <div className="w-2 h-2 bg-[#1A4AFF] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Link href={`/${locale}/contact`} className={`px-8 py-4 bg-[#1A4AFF] text-white font-semibold text-sm uppercase tracking-wide hover:bg-[#122D8B] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "اطلب عرض سعر" : "Request Quote"}
                </Link>
                <Link href={`/${locale}/contact`} className={`px-8 py-4 border-2 border-[#122D8B] text-[#122D8B] font-semibold text-sm uppercase tracking-wide hover:bg-[#122D8B] hover:text-white transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "اطلب عينة" : "Request Sample"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {Object.keys(specifications).length > 0 && (
        <section className="py-16 bg-[#D8DDE9]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className={`text-2xl font-bold text-[#122D8B] mb-8 ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>{isRTL ? "المواصفات" : "Specifications"}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className={`bg-white p-6 border border-[#D8DDE9] ${isRTL ? "text-right" : ""}`}>
                  <div className={`text-sm text-[#122D8B]/50 uppercase tracking-wide mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{key}</div>
                  <div className={`text-lg font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="py-16 bg-[#D8DDE9]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className={`text-2xl font-bold text-[#122D8B] mb-8 ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>{isRTL ? "منتجات ذات صلة" : "Related Products"}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((relProduct) => {
                const relTitle = isRTL ? relProduct.title.ar : relProduct.title.en;
                const relDesc = isRTL ? relProduct.description.ar : relProduct.description.en;
                return (
                  <Link key={relProduct.slug} href={`/${locale}/products/${relProduct.slug}`} className="group">
                    <div className="aspect-[4/3] bg-[#D8DDE9] relative overflow-hidden mb-4">
                      <Image src={relProduct.image} alt={relTitle} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className={`absolute bottom-0 w-0 h-1 bg-[#1A4AFF] group-hover:w-full transition-all duration-300 ${isRTL ? "right-0" : "left-0"}`} />
                    </div>
                    <h3 className={`text-lg font-bold text-[#122D8B] mb-2 ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>{relTitle}</h3>
                    <p className={`text-sm text-[#122D8B]/60 ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>{relDesc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-[#122D8B]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className={`text-2xl lg:text-3xl font-bold text-white mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{isRTL ? "هل أنت مهتم بهذا المنتج؟" : "Interested in this product?"}</h2>
          <p className={`text-white/70 mb-8 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{isRTL ? "تواصل معنا اليوم للحصول على عرض سعر مخصص أو لمناقشة متطلباتك" : "Contact us today for a custom quote or to discuss your requirements"}</p>
          <Link href={`/${locale}/contact`} className={`inline-flex items-center px-8 py-4 bg-[#1A4AFF] text-white font-semibold text-sm uppercase tracking-wide hover:bg-white hover:text-[#122D8B] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "تواصل معنا" : "Contact Us"}
          </Link>
        </div>
      </section>

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
