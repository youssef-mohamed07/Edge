"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";

interface OurServicesSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function OurServicesSection({ locale }: OurServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

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

  const services = isRTL
    ? [
        {
          id: 1,
          title: "تصنيع الدنيم",
          description: "إنتاج دنيم عالي الجودة بتقنيات غسيل متقدمة",
          image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&h=600&fit=crop",
        },
        {
          id: 2,
          title: "تصميم مخصص",
          description: "تصاميم مخصصة تتناسب مع هوية علامتك التجارية ورؤيتك",
          image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=600&fit=crop",
        },
        {
          id: 3,
          title: "توريد الأقمشة",
          description: "اختيار أقمشة فاخرة من موردين عالميين موثوقين",
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop",
        },
        {
          id: 4,
          title: "القص",
          description: "قص دقيق باستخدام معدات متقدمة لتحقيق أقصى كفاءة للقماش ودقة عالية.",
          image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop",
        },
        {
          id: 5,
          title: "الخياطة",
          description: "خياطة عالية المستوى من فنيين مهرة لضمان المتانة والتشطيب الراقي.",
          image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=600&fit=crop",
        },
        {
          id: 6,
          title: "الغسيل",
          description: "عمليات غسيل وتشطيب متخصصة تعزز أداء القماش وملمسه ومظهره.",
          image: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=800&h=600&fit=crop",
        },
        {
          id: 7,
          title: "التعبئة",
          description: "فحص نهائي وتعبئة احترافية لضمان استيفاء المنتجات لمعايير التصدير والتسليم.",
          image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
        },
      ]
    : [
        {
          id: 1,
          title: "Denim Jeans Manufacturing",
          description: "Premium quality denim production with advanced washing techniques",
          image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&h=600&fit=crop",
        },
        {
          id: 2,
          title: "Custom Design",
          description: "Tailored designs to match your brand identity and vision",
          image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=600&fit=crop",
        },
        {
          id: 3,
          title: "Fabric Sourcing",
          description: "Premium fabric selection from trusted global suppliers",
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop",
        },
        {
          id: 4,
          title: "Cutting",
          description: "Precision cutting using advanced equipment to maximize fabric efficiency and accuracy.",
          image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop",
        },
        {
          id: 5,
          title: "Sewing",
          description: "High-standard stitching carried out by skilled technicians to ensure durability and refined finishing.",
          image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=600&fit=crop",
        },
        {
          id: 6,
          title: "Laundry",
          description: "Specialized washing and finishing processes that enhance fabric performance, texture, and appearance.",
          image: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=800&h=600&fit=crop",
        },
        {
          id: 7,
          title: "Packing",
          description: "Final inspection and professional packing to ensure products meet export and delivery standards.",
          image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
        },
      ];

  // Auto slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [services.length]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const totalItems = services.length;

    let adjustedDiff = diff;
    if (diff > totalItems / 2) adjustedDiff = diff - totalItems;
    if (diff < -totalItems / 2) adjustedDiff = diff + totalItems;

    if (adjustedDiff === 0) {
      return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 10 };
    } else if (adjustedDiff === 1) {
      return { transform: "translateX(90%) scale(0.85)", opacity: 0.8, zIndex: 8 };
    } else if (adjustedDiff === -1) {
      return { transform: "translateX(-90%) scale(0.85)", opacity: 0.8, zIndex: 8 };
    } else if (adjustedDiff === 2) {
      return { transform: "translateX(170%) scale(0.7)", opacity: 0.5, zIndex: 5 };
    } else if (adjustedDiff === -2) {
      return { transform: "translateX(-170%) scale(0.7)", opacity: 0.5, zIndex: 5 };
    } else {
      return {
        transform: adjustedDiff > 0 ? "translateX(250%) scale(0.6)" : "translateX(-250%) scale(0.6)",
        opacity: 0,
        zIndex: 0,
      };
    }
  };

  return (
    <section ref={sectionRef} className="py-12 lg:py-16 px-6 lg:px-12 bg-alabaster-grey overflow-hidden" dir={dir}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-true-cobalt ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "عملية التصنيع لدينا" : "Our Manufacturing Process"}
          </h2>
          <p className={`text-gray-600 mt-4 text-lg max-w-4xl mx-auto ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL 
              ? "عملية التصنيع لدينا متكاملة بالكامل ومراقبة بعناية لضمان جودة متسقة في كل مرحلة."
              : "Our manufacturing process is fully integrated and carefully controlled to ensure consistent quality at every stage."}
          </p>
        </div>

        {/* Carousel */}
        <div className={`relative h-[420px] md:h-[480px] flex items-center justify-center transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className="absolute w-[260px] md:w-[320px] transition-all duration-500 ease-out cursor-pointer"
              style={getCardStyle(index)}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl" style={{ aspectRatio: "3/4" }}>
                <Image src={service.image} alt={service.title} fill className="object-cover" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(18, 45, 139, 0.95) 0%, rgba(18, 45, 139, 0.5) 40%, rgba(18, 45, 139, 0.1) 100%)",
                  }}
                />
                <div className={`absolute bottom-0 left-0 right-0 p-6 text-white ${isRTL ? "text-right" : ""}`}>
                  <h3 className={`text-xl font-bold mb-3 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {service.title}
                  </h3>
                  <p className={`text-white/85 text-sm leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots & Learn More Button */}
        <div className={`flex flex-col items-center gap-6 mt-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Dots */}
          <div className="flex justify-center gap-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 flex-shrink-0 ${
                  index === activeIndex ? "bg-royal-azure w-8 min-w-[32px] max-w-[32px]" : "bg-royal-azure/30 hover:bg-royal-azure/50 w-3 min-w-[12px] max-w-[12px]"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Learn More Button */}
          <Link
            href={`/${locale}/production-process`}
            className={`inline-flex items-center gap-2 px-8 py-3 bg-true-cobalt text-white font-medium hover:bg-true-cobalt/90 transition-all duration-300 shadow-lg hover:shadow-xl ${
              isRTL ? "flex-row-reverse font-[var(--font-cairo)]" : ""
            }`}
          >
            {isRTL ? "اعرف المزيد" : "Learn More"}
            <svg 
              className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
