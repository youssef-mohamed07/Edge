"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getDirection, type Locale } from "../../i18n/config";

interface QuoteSectionProps {
  locale: Locale;
}

function AnimatedWord({ word, index, isVisible }: { word: string; index: number; isVisible: boolean }) {
  return (
    <span
      className={`inline-block transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {word}&nbsp;
    </span>
  );
}

export function QuoteSection({ locale }: QuoteSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const quoteText = isRTL
    ? "ما بدأ كـ 100 متر مربع في 2017 أصبح الآن أكثر من 2,400 متر مربع. دليل على ما يمكن أن يبنيه الالتزام."
    : "What began as 100 m² in 2017 is now 2,400+ m². Proof of what commitment can build.";

  const authorName = isRTL ? "السيد شليل" : "Mr Sayed Al Shelil";
  const authorRole = isRTL ? "رئيس مجلس الإدارة" : "Chairman";

  const words = quoteText.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 lg:py-10 bg-gradient-to-b from-white to-[#F8F9FB] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#1A4AFF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#122D8B]/5 rounded-full blur-3xl" />
      
      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative">
        {/* Quote Icon */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <svg
            className="w-16 h-16 text-[#1A4AFF]/20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* Quote Text */}
        <blockquote className="text-center mb-10">
          <p
            className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#122D8B] leading-relaxed ${
              isRTL ? "font-[var(--font-cairo)]" : ""
            }`}
          >
            {words.map((word, index) => (
              <AnimatedWord key={index} word={word} index={index} isVisible={isVisible} />
            ))}
          </p>
        </blockquote>

        {/* Author */}
        <div
          className={`flex flex-col items-center gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${words.length * 100 + 300}ms` }}
        >
          {/* Author Image */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1A4AFF]/20">
            <Image
              src="https://edgeforgarments.com/wp-content/uploads/2020/09/shleel.jpg"
              alt={authorName}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
          
          {/* Author Info */}
          <div className="text-center">
            <p className={`text-lg font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {authorName}
            </p>
            <p className={`text-sm text-[#122D8B]/60 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {authorRole}
            </p>
          </div>

          {/* Decorative Line */}
          <div className="w-16 h-1 bg-gradient-to-r from-[#1A4AFF] to-[#122D8B] rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
