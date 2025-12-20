"use client";

import Image from "next/image";
import Link from "next/link";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";
import productsData from "../../../data/products.json";
import { ScrollReveal } from "../components/ScrollReveal";

interface ProductsSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function ProductsSection({ locale, dict }: ProductsSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const products = productsData.products.slice(0, 4).map((p) => ({
    title: isRTL ? p.title.ar : p.title.en,
    image: p.image,
    slug: p.slug,
  }));

  return (
    <section id="products" className="py-8 lg:py-10 bg-[#F8F9FB]" dir={dir}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal>
        <div className="text-center mb-6">
          <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "منتجاتنا" : "Our Products"}
          </h2>
          <p className={`text-[#122D8B]/60 max-w-xl mx-auto ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {dict.products.subtitle}
          </p>
        </div>
        </ScrollReveal>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, index) => (
            <ScrollReveal key={product.title} delay={index * 100}>
            <Link href={`/${locale}/products/${product.slug}`} className="group block">
              <div className="aspect-[3/4] bg-white relative overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122D8B]/70 via-[#122D8B]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className={`text-white text-sm font-bold ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}>
                    {product.title}
                  </h3>
                </div>
              </div>
            </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal delay={400}>
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/products`}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-[#122D8B] text-white font-semibold text-sm rounded-lg hover:bg-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
          >
            {dict.products.viewAll}
            <span>{isRTL ? "←" : "→"}</span>
          </Link>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
