import Image from "next/image";
import Link from "next/link";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";
import productsData from "../../../data/products.json";

interface ProductsSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function ProductsSection({ locale, dict }: ProductsSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const products = productsData.products.map((p) => ({
    title: isRTL ? p.title.ar : p.title.en,
    image: p.image,
    slug: p.slug,
  }));

  return (
    <section id="products" className="py-20 lg:py-32 bg-white" dir={dir}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className={`text-[#1A4AFF] text-sm font-semibold uppercase tracking-wider block mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {dict.products.label}
          </span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "منتجاتنا" : "Our Products"}
          </h2>
          <p className={`text-[#122D8B]/60 text-lg max-w-2xl mx-auto ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {dict.products.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <Link href={`/${locale}/products/${product.slug}`} key={product.title} className="group cursor-pointer block">
              <div className="aspect-[4/5] bg-[#D8DDE9] relative overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122D8B]/40 to-transparent" />
                <div className="absolute inset-0 bg-[#122D8B]/0 group-hover:bg-[#122D8B]/20 transition-colors" />
                <div
                  className={`absolute bottom-0 w-0 h-1 bg-[#1A4AFF] group-hover:w-full transition-all duration-300 ${
                    isRTL ? "right-0" : "left-0"
                  }`}
                />
              </div>
              <h3
                className={`text-lg text-[#122D8B] font-bold uppercase tracking-wide relative inline-block ${
                  isRTL ? "font-[var(--font-cairo)]" : ""
                }`}
              >
                {product.title}
                <span
                  className={`absolute bottom-[-4px] w-0 h-[3px] bg-[#1A4AFF] group-hover:w-full transition-all duration-300 ${
                    isRTL ? "right-0" : "left-0"
                  }`}
                />
              </h3>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/products`}
            className={`inline-flex items-center px-6 py-3 border-2 border-[#122D8B] text-[#122D8B] font-semibold text-sm uppercase tracking-wide hover:bg-[#122D8B] hover:text-white transition-all ${
              isRTL ? "font-[var(--font-cairo)]" : ""
            }`}
          >
            {dict.products.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
