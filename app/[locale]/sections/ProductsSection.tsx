"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";
import productsData from "../../../data/products.json";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface ProductsSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function ProductsSection({ locale, dict }: ProductsSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const title = isRTL ? "منتجاتنا" : "Our Products";

  const products = productsData.products.slice(0, 4).map((p) => ({
    title: isRTL ? p.title.ar : p.title.en,
    image: p.image,
    slug: p.slug,
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="py-8 lg:py-10 bg-alabaster-grey" dir={dir}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-true-cobalt mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            <TypewriterTitle text={title} isVisible={isVisible} />
          </h2>
          <p className={`text-true-cobalt/60 max-w-xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"} ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {dict.products.subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, index) => (
            <div
              key={product.title}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <Link href={`/${locale}/products/${product.slug}`} className="group block">
                <div className="aspect-[3/4] bg-white relative overflow-hidden rounded-xl shadow-sm">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-true-cobalt/70 via-true-cobalt/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className={`text-white text-sm font-bold ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}>
                      {product.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={`text-center mt-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "800ms" }}>
          <Link
            href={`/${locale}/products`}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-true-cobalt text-white font-semibold text-sm rounded-lg hover:bg-royal-azure transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
          >
            {dict.products.viewAll}
            <span>{isRTL ? "←" : "→"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
