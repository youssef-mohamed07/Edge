"use client";

import Image from "next/image";
import Link from "next/link";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";
import { ScrollReveal } from "../components/ScrollReveal";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface AboutSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function AboutSection({ locale, dict }: AboutSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const keyPoints = isRTL
    ? ["دورة إنتاج كاملة", "معايير دولية", "جودة مضمونة", "تسليم في الموعد"]
    : ["Full Production Cycle", "International Standards", "Quality Guaranteed", "Timely Delivery"];

  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Side */}
          <ScrollReveal direction={isRTL ? "left" : "right"} delay={200} className="self-start lg:order-2">
          <div className="relative">
            <div className="p-4 relative">
              <div
                className={`absolute top-0 w-6 h-6 border-t-2 border-powder-blue ${
                  isRTL ? "right-0 border-r-2" : "left-0 border-l-2"
                }`}
              />
              <div
                className={`absolute bottom-0 w-6 h-6 border-b-2 border-powder-blue ${
                  isRTL ? "left-0 border-l-2" : "right-0 border-r-2"
                }`}
              />

              <div className="aspect-[4/3] bg-alabaster-grey relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                  alt="EDGE Factory - Garment Manufacturing"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-true-cobalt/30 to-transparent" />
              </div>
            </div>

            {/* Stats Badge */}
            <div
              className={`absolute -bottom-6 bg-true-cobalt text-white p-6 hidden lg:block ${
                isRTL ? "-left-6 text-right" : "-right-6"
              }`}
            >
              <div className="text-3xl font-bold">15+</div>
              <div className={`text-sm text-white/80 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {dict.about.experience}
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal direction={isRTL ? "right" : "left"} className="self-start lg:order-1">
          <div className={`${isRTL ? "text-right" : ""}`}>
            <div className="mb-8">
              <TypewriterTitle
                text={isRTL ? "من نحن" : "About Us"}
                isVisible={true}
                className={`text-3xl md:text-4xl lg:text-5xl font-bold text-true-cobalt ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              />
            </div>

            <p
              className={`text-true-cobalt/70 text-lg leading-relaxed mb-6 ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              {isRTL ? (
                <>
                  <strong className="text-true-cobalt font-[var(--font-cairo)]">إيدج للملابس</strong>{" "}
                  <span className="text-true-cobalt" dir="ltr">
                    (EDGE for Garments)
                  </span>{" "}
                  هي شركة مصرية رائدة في تصنيع الدنيم الفاخر والملابس الجاهزة، مقرها بورسعيد.
                </>
              ) : (
                <>
                  <strong className="text-true-cobalt">EDGE for Garments</strong> is a leading Egyptian
                  manufacturer based in Port Said, specializing in premium denim and woven garments.
                </>
              )}
            </p>

            <p className={`text-true-cobalt/70 leading-relaxed mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL
                ? "منشأتنا الحديثة تتولى دورة الإنتاج الكاملة - من فحص الأقمشة الأولي مروراً بالقص والخياطة والغسيل والتشطيب، وصولاً إلى التغليف النهائي ومراقبة الجودة."
                : "Our state-of-the-art facility handles the complete production cycle — from initial fabric inspection through cutting, sewing, washing, and finishing, to final packaging and quality control."}
            </p>

            {/* Key Points */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {keyPoints.map((point) => (
                <div
                  key={point}
                  className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}
                >
                  {isRTL ? (
                    <>
                      <span className="text-true-cobalt font-medium font-[var(--font-cairo)]">{point}</span>
                      <div className="w-2 h-2 bg-royal-azure flex-shrink-0" />
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-royal-azure flex-shrink-0" />
                      <span className="text-true-cobalt font-medium">{point}</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/about`}
              className={`inline-flex items-center px-6 py-3 border-2 border-true-cobalt text-true-cobalt font-semibold text-sm uppercase tracking-wide hover:bg-true-cobalt hover:text-white transition-all ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              {dict.about.learnMore}
            </Link>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
