"use client";

import Image from "next/image";
import { SectionHeader, Button } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";

export function AboutSection() {
  const { t, dir } = useLanguage();

  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side - Right in EN, Left in AR (handled by dir + consistent ordering) */}
          <div className="relative lg:order-2">
            <div className="p-4 relative">
              {/* Corner decorations */}
              <div className={`absolute top-0 w-6 h-6 border-t-2 border-[#B6C6E1] ${dir === "rtl" ? "right-0 border-r-2" : "left-0 border-l-2"}`} />
              <div className={`absolute bottom-0 w-6 h-6 border-b-2 border-[#B6C6E1] ${dir === "rtl" ? "left-0 border-l-2" : "right-0 border-r-2"}`} />
              
              <div className="aspect-[4/3] bg-[#D8DDE9] relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                  alt="EDGE Factory - Garment Manufacturing"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#122D8B]/30 to-transparent" />
                <div className={`absolute top-4 w-16 h-16 border-2 border-white/30 ${dir === "rtl" ? "left-4" : "right-4"}`} />
                <div className={`absolute bottom-4 w-12 h-12 border-2 border-[#1A4AFF]/30 ${dir === "rtl" ? "right-4" : "left-4"}`} />
              </div>
            </div>

            {/* Stats Badge */}
            <div className={`absolute -bottom-6 bg-[#122D8B] text-white p-6 hidden lg:block ${dir === "rtl" ? "-left-6 text-right" : "-right-6"}`}>
              <div className="text-3xl font-bold">15+</div>
              <div className={`text-sm text-white/80 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>{t("about.experience")}</div>
            </div>
          </div>

          {/* Content Side - Left in EN, Right in AR */}
          <div className={`${dir === "rtl" ? "text-right" : ""} lg:order-1`}>
            <SectionHeader
              title={t("about.label")}
              subtitle=""
              centered={false}
            />

            <p className={`text-[#122D8B]/70 text-lg leading-relaxed mb-6 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
              {dir === "rtl" ? (
                <>
                  <strong className="text-[#122D8B] font-[var(--font-cairo)]">إيدج للملابس</strong>{" "}
                  <span className="text-[#122D8B]" dir="ltr">(EDGE for Garments)</span>{" "}
                  هي شركة مصرية رائدة في تصنيع الدنيم الفاخر والملابس الجاهزة، مقرها بورسعيد.
                </>
              ) : (
                <>
                  <strong className="text-[#122D8B]">EDGE for Garments</strong> is a leading Egyptian manufacturer based in Port Said, specializing in premium denim and woven garments.
                </>
              )}
            </p>

            <p className={`text-[#122D8B]/70 leading-relaxed mb-6 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
              {dir === "rtl" 
                ? "منشأتنا الحديثة تتولى دورة الإنتاج الكاملة - من فحص الأقمشة الأولي مروراً بالقص والخياطة والغسيل والتشطيب، وصولاً إلى التغليف النهائي ومراقبة الجودة. كل خطوة تُنفذ بدقة وعناية."
                : "Our state-of-the-art facility handles the complete production cycle — from initial fabric inspection through cutting, sewing, washing, and finishing, to final packaging and quality control. Every step is executed with precision and care."}
            </p>

            <p className={`text-[#122D8B]/70 leading-relaxed mb-8 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
              {dir === "rtl"
                ? "نخدم بفخر العلامات التجارية المحلية والدولية، ونقدم جودة ثابتة تلبي أعلى معايير الصناعة."
                : "We proudly serve both local and international brands, delivering consistent quality that meets the highest industry standards."}
            </p>

            {/* Key Points */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {dir === "rtl" ? [
                "دورة إنتاج كاملة",
                "معايير دولية",
                "جودة مضمونة",
                "تسليم في الموعد",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 flex-row-reverse justify-end">
                  <span className="text-[#122D8B] font-medium font-[var(--font-cairo)]">{point}</span>
                  <div className="w-2 h-2 bg-[#1A4AFF] flex-shrink-0" />
                </div>
              )) : [
                "Full Production Cycle",
                "International Standards",
                "Quality Guaranteed",
                "Timely Delivery",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#1A4AFF] flex-shrink-0" />
                  <span className="text-[#122D8B] font-medium">{point}</span>
                </div>
              ))}
            </div>

            <Button href="/about" variant="outline">
              {t("about.learnMore")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
