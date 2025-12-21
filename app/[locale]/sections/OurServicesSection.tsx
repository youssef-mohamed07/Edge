"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";

interface OurServicesSectionProps {
  locale: Locale;
  dict: Dictionary;
}

function TypewriterTitle({ text, isVisible, isRTL }: { text: string; isVisible: boolean; isRTL: boolean }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    setIsTyping(true);
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [isVisible, text]);

  return (
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-true-cobalt ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
      {displayedText}
      {isTyping && <span className="animate-pulse text-royal-azure">|</span>}
    </h2>
  );
}

export function OurServicesSection({ locale }: OurServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const title = isRTL ? "خدماتنا" : "Our Services";

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
          title: "إنتاج الملابس",
          description: "تصنيع ملابس متكامل من القص إلى التشطيب",
          image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop",
        },
        {
          id: 3,
          title: "مراقبة الجودة",
          description: "عمليات جودة صارمة تضمن معايير منتج فاخرة",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        },
        {
          id: 4,
          title: "تصميم مخصص",
          description: "تصاميم مخصصة تتناسب مع هوية علامتك التجارية",
          image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=600&fit=crop",
        },
        {
          id: 5,
          title: "توريد الأقمشة",
          description: "اختيار أقمشة فاخرة من موردين عالميين موثوقين",
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop",
        },
      ]
    : [
        {
          id: 1,
          title: "Denim Manufacturing",
          description: "Premium quality denim production with advanced washing techniques",
          image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&h=600&fit=crop",
        },
        {
          id: 2,
          title: "Garment Production",
          description: "Full-scale garment manufacturing from cutting to finishing",
          image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop",
        },
        {
          id: 3,
          title: "Quality Control",
          description: "Rigorous QC processes ensuring premium product standards",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        },
        {
          id: 4,
          title: "Custom Design",
          description: "Tailored designs to match your brand identity and vision",
          image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=600&fit=crop",
        },
        {
          id: 5,
          title: "Fabric Sourcing",
          description: "Premium fabric selection from trusted global suppliers",
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop",
        },
      ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000);
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
      return { transform: "translateX(105%) scale(0.9)", opacity: 0.7, zIndex: 5 };
    } else if (adjustedDiff === -1) {
      return { transform: "translateX(-105%) scale(0.9)", opacity: 0.7, zIndex: 5 };
    } else if (adjustedDiff === 2) {
      return { transform: "translateX(200%) scale(0.8)", opacity: 0.3, zIndex: 1 };
    } else if (adjustedDiff === -2) {
      return { transform: "translateX(-200%) scale(0.8)", opacity: 0.3, zIndex: 1 };
    } else {
      return {
        transform: adjustedDiff > 0 ? "translateX(300%) scale(0.7)" : "translateX(-300%) scale(0.7)",
        opacity: 0,
        zIndex: 0,
      };
    }
  };

  return (
    <section ref={sectionRef} className="py-8 lg:py-10 px-6 lg:px-12 bg-alabaster-grey overflow-hidden" dir={dir}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <TypewriterTitle text={title} isVisible={isVisible} isRTL={isRTL} />
          <p className={`text-gray-600 mt-4 text-lg max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL 
              ? "نقدم حلول تصنيع ملابس متكاملة، نتعامل مع كل خطوة بعناية ودقة واتساق"
              : "We offer complete garment manufacturing solutions, handling every step with care, precision, and consistency."}
          </p>
        </div>

        <div className={`relative h-[450px] md:h-[500px] flex items-center justify-center transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className="absolute w-[300px] md:w-[380px] transition-all duration-500 ease-out"
              style={getCardStyle(index)}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/5" }}>
                <Image src={service.image} alt={service.title} fill className="object-cover" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(18, 45, 139, 0.95) 0%, rgba(18, 45, 139, 0.5) 50%, rgba(18, 45, 139, 0.2) 100%)",
                  }}
                />
                <div className={`absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white ${isRTL ? "text-right" : ""}`}>
                  <h3 className={`text-xl lg:text-2xl font-bold mb-3 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {service.title}
                  </h3>
                  <p className={`text-white/80 text-sm lg:text-base leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`flex justify-center gap-3 mt-8 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-royal-azure w-8" : "bg-royal-azure/30 hover:bg-royal-azure/50"
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
