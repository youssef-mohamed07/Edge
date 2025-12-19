"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";
import { ScrollReveal } from "../components/ScrollReveal";

interface PortfolioSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function PortfolioSection({ locale, dict }: PortfolioSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const processSteps = [
    { id: 1, title: dict.portfolio.step1.title, description: dict.portfolio.step1.desc },
    { id: 2, title: dict.portfolio.step2.title, description: dict.portfolio.step2.desc },
    { id: 3, title: dict.portfolio.step3.title, description: dict.portfolio.step3.desc },
    { id: 4, title: dict.portfolio.step4.title, description: dict.portfolio.step4.desc },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          processSteps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, index]);
            }, index * 300);
          });
          observer.disconnect();
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
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white" dir={dir}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <ScrollReveal direction={isRTL ? "left" : "right"} delay={200}>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
              alt="Our Process"
              fill
              className="object-cover"
            />
          </div>
          </ScrollReveal>

          {/* Process Steps */}
          <ScrollReveal direction={isRTL ? "right" : "left"}>
          <div className={`${isRTL ? "text-right" : ""} lg:order-1`}>
            <span className={`text-[#1A4AFF] text-sm font-semibold uppercase tracking-wider block mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "كيف نعمل" : "How We Work"}
            </span>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] mb-14 ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              {dict.portfolio.label}
            </h2>

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-start gap-5 flex-row transition-all duration-500 ${
                    visibleSteps.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#122D8B] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.id}
                  </div>
                  <div className="flex-1 text-start">
                    <h3 className={`text-lg font-bold text-[#122D8B] mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {step.title}
                    </h3>
                    <p className={`text-[#122D8B]/60 text-sm leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
