"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export function PortfolioSection() {
  const { t, dir } = useLanguage();

  const processSteps = dir === "rtl"
    ? [
        {
          id: 1,
          title: "اختيار الأقمشة",
          description: "أقمشة عالية الجودة من موردين موثوقين حول العالم",
        },
        {
          id: 2,
          title: "التصميم والباترون",
          description: "خبراء في صنع الباترون وتخصيص التصميم لعلامتك التجارية",
        },
        {
          id: 3,
          title: "الإنتاج",
          description: "تصنيع حديث مع رقابة جودة صارمة",
        },
        {
          id: 4,
          title: "الجودة والتسليم",
          description: "فحص نهائي وتسليم في الموعد إلى وجهتك",
        },
      ]
    : [
        {
          id: 1,
          title: "Fabric Selection",
          description: "Premium quality fabrics sourced from trusted suppliers worldwide",
        },
        {
          id: 2,
          title: "Design & Pattern",
          description: "Expert pattern making and design customization for your brand",
        },
        {
          id: 3,
          title: "Production",
          description: "State-of-the-art manufacturing with strict quality control",
        },
        {
          id: 4,
          title: "Quality & Delivery",
          description: "Final inspection and timely delivery to your destination",
        },
      ];

  return (
    <section className="py-20 lg:py-28 bg-white" dir={dir}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image - Right in EN, Left in AR */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
              alt="Our Process"
              fill
              className="object-cover"
            />
          </div>

          {/* Process Steps - Left in EN, Right in AR */}
          <div className={`${dir === "rtl" ? "text-right" : ""} lg:order-1`}>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] mb-10 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
              {dir === "rtl" ? "عمليتنا" : "Our process"}
            </h2>

            <div className="space-y-8">
              {processSteps.map((step) => (
                <div key={step.id} className="flex gap-5">
                  {/* Number */}
                  <div className="flex-shrink-0 w-10 h-10 bg-[#122D8B] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.id}
                  </div>
                  
                  {/* Content */}
                  <div className={dir === "rtl" ? "text-right" : ""}>
                    <h3 className={`text-lg font-bold text-[#122D8B] mb-1 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                      {step.title}
                    </h3>
                    <p className={`text-[#122D8B]/60 text-sm leading-relaxed ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trusted By */}
        <div className="mt-20 text-center">
          <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-[#122D8B] ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
            {dir === "rtl" ? "موثوق من أكثر من 2,000 علامة تجارية حول العالم" : "Trusted by 2,000+ brands worldwide"}
          </h3>
        </div>
      </div>
    </section>
  );
}
