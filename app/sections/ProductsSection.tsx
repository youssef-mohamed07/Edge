"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader, Button } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";

export function ProductsSection() {
  const { t, dir } = useLanguage();

  const products = dir === "rtl"
    ? [
        { title: "جينز", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80", slug: "jeans" },
        { title: "جاكيتات دنيم", image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80", slug: "denim-jackets" },
        { title: "ملابس العمل", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80", slug: "workwear" },
        { title: "قمصان", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80", slug: "shirts" },
        { title: "ملابس مخصصة", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80", slug: "custom" },
        { title: "علامة خاصة", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80", slug: "private-label" },
      ]
    : [
        { title: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80", slug: "jeans" },
        { title: "Denim Jackets", image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80", slug: "denim-jackets" },
        { title: "Workwear", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80", slug: "workwear" },
        { title: "Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80", slug: "shirts" },
        { title: "Custom Garments", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80", slug: "custom" },
        { title: "Private Label", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80", slug: "private-label" },
      ];

  return (
    <section id="products" className="py-20 lg:py-32 bg-white" dir={dir}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeader
          title={t("products.label")}
          subtitle={t("products.subtitle")}
        />

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <Link
              href={`/products/${product.slug}`}
              key={product.title}
              className="group cursor-pointer block"
            >
              {/* Image Container */}
              <div className="aspect-[4/5] bg-[#D8DDE9] relative overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122D8B]/40 to-transparent" />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#122D8B]/0 group-hover:bg-[#122D8B]/20 transition-colors" />
                {/* Corner Accent */}
                <div className={`absolute bottom-0 w-0 h-1 bg-[#1A4AFF] group-hover:w-full transition-all duration-300 ${dir === "rtl" ? "right-0" : "left-0"}`} />
              </div>

              {/* Title */}
              <h3
                className={`text-lg text-[#122D8B] font-bold uppercase tracking-wide relative inline-block ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}
                style={{ fontFamily: dir === "rtl" ? "var(--font-cairo), sans-serif" : "'Arial Black', 'Bebas Neue', sans-serif" }}
              >
                {product.title}
                <span className={`absolute bottom-[-4px] w-0 h-[3px] bg-[#1A4AFF] group-hover:w-full transition-all duration-300 ${dir === "rtl" ? "right-0" : "left-0"}`} />
              </h3>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button href="/products" variant="outline">
            {t("products.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
}
