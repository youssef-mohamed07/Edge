"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "../components/ScrollReveal";

interface ProductCategory {
  title: string;
  slug: string;
  image: string;
  description: string;
  features: string[];
}

interface ProductCategoriesSectionProps {
  locale: string;
  isRTL: boolean;
  productCategories: ProductCategory[];
}

export function ProductCategoriesSection({
  locale,
  isRTL,
  productCategories,
}: ProductCategoriesSectionProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2
              className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              {isRTL ? "فئات المنتجات" : "Product Categories"}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((product, index) => (
            <ScrollReveal key={product.slug} delay={index * 100}>
              <Link
                href={`/${locale}/products/${product.slug}`}
                className={`group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full border border-gray-100 hover:border-[#1A4AFF]/20 ${
                  isRTL ? "text-right" : ""
                }`}
              >
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover overlay arrow */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-500">
                      <svg
                        className={`w-6 h-6 text-[#122D8B] ${isRTL ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className={`text-xl text-[#122D8B] mb-2 font-bold uppercase tracking-wide group-hover:text-[#1A4AFF] transition-colors ${
                      isRTL ? "font-[var(--font-cairo)]" : ""
                    }`}
                  >
                    {product.title}
                  </h3>
                  <p
                    className={`text-[#122D8B]/60 text-sm mb-4 line-clamp-2 ${
                      isRTL ? "font-[var(--font-cairo)]" : ""
                    }`}
                  >
                    {product.description}
                  </p>

                  <ul className={`space-y-2 ${isRTL ? "text-right" : ""}`}>
                    {product.features.slice(0, 4).map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-2 text-sm text-[#122D8B]/70 ${
                          isRTL ? "flex-row-reverse font-[var(--font-cairo)]" : ""
                        }`}
                      >
                        <div className="w-1.5 h-1.5 bg-[#1A4AFF] rounded-full flex-shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* View details hint */}
                  <div
                    className={`mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-[#1A4AFF] font-semibold text-sm ${
                      isRTL ? "flex-row-reverse font-[var(--font-cairo)]" : ""
                    }`}
                  >
                    <span className="group-hover:underline">
                      {isRTL ? "عرض التفاصيل" : "View Details"}
                    </span>
                    <svg
                      className={`w-4 h-4 transform group-hover:translate-x-1 transition-transform ${
                        isRTL ? "rotate-180 group-hover:-translate-x-1" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
