"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ValueCard {
  title: string;
  description: string;
  image: string;
}

interface WhySetsUsApartProps {
  isRTL: boolean;
}

export function WhySetsUsApart({ isRTL }: WhySetsUsApartProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const values: ValueCard[] = isRTL
    ? [
        {
          title: "الجودة",
          description: "نضمن أعلى المعايير في كل مرحلة من مراحل الإنتاج.",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        },
        {
          title: "الابتكار",
          description: "نطور باستمرار تصاميم وتقنيات جديدة للبقاء في صدارة صناعة الدنيم.",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
        },
        {
          title: "الاستدامة",
          description: "نحن ملتزمون بالتصنيع المسؤول بيئياً وأخلاقياً.",
          image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80",
        },
        {
          title: "رضا العملاء",
          description: "نركز على فهم وتلبية توقعات عملائنا.",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
        },
        {
          title: "النزاهة",
          description: "ندير أعمالنا بصدق وشفافية.",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
        },
        {
          title: "الموثوقية",
          description: "نسلم في الوقت المحدد، في كل مرة، لبناء الثقة مع كل طلب.",
          image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
        },
      ]
    : [
        {
          title: "Quality",
          description: "We ensure the highest standards in every stage of production.",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        },
        {
          title: "Innovation",
          description: "We constantly develop new designs and techniques to stay ahead in the denim industry.",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
        },
        {
          title: "Sustainability",
          description: "We are committed to environmentally responsible and ethical manufacturing.",
          image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80",
        },
        {
          title: "Customer Satisfaction",
          description: "We focus on understanding and meeting our clients' expectations.",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
        },
        {
          title: "Integrity",
          description: "We conduct our business with honesty and transparency.",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
        },
        {
          title: "Reliability",
          description: "We deliver on time, every time, building trust with every order.",
          image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
        },
      ];

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          titleObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleCards((prev) => new Set([...prev, index]));
              cardObserver.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section className="py-8 lg:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2
          ref={titleRef}
          className={`text-3xl md:text-4xl font-bold text-[#122D8B] mb-8 transition-all duration-700 ${
            isRTL ? "font-[var(--font-cairo)] text-right" : ""
          } ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {isRTL ? "ما يميزنا في إدارة إنتاجك" : "What sets us apart in managing your production"}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`group relative rounded-3xl overflow-hidden aspect-square cursor-pointer transition-all duration-700 ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <Image
                src={value.image}
                alt={value.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#122D8B]/80 transition-all duration-500 group-hover:bg-[#122D8B]/90" />
              
              {/* Content */}
              <div className={`absolute inset-0 p-8 flex flex-col justify-end ${isRTL ? "text-right" : ""}`}>
                <h3
                  className={`text-white text-xl font-bold mb-2 transition-transform duration-500 group-hover:-translate-y-2 ${
                    isRTL ? "font-[var(--font-cairo)]" : ""
                  }`}
                >
                  {value.title}
                </h3>
                <p
                  className={`text-white/80 text-sm transition-all duration-500 group-hover:text-white ${
                    isRTL ? "font-[var(--font-cairo)]" : ""
                  }`}
                >
                  {value.description}
                </p>
                
                {/* Animated line */}
                <div
                  className={`h-0.5 bg-[#1A4AFF] mt-4 transition-all duration-500 origin-left group-hover:w-full ${
                    visibleCards.has(index) ? "w-12" : "w-0"
                  } ${isRTL ? "origin-right ml-auto" : ""}`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                />
              </div>

              {/* Corner accent */}
              <div
                className={`absolute top-4 w-8 h-8 border-t-2 border-[#1A4AFF] transition-all duration-500 ${
                  isRTL ? "right-4 border-r-2" : "left-4 border-l-2"
                } ${visibleCards.has(index) ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
