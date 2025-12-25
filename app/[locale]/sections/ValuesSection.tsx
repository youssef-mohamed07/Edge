"use client";

import Image from "next/image";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";
import { ScrollReveal } from "../components/ScrollReveal";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface ValuesSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function ValuesSection({ locale, dict }: ValuesSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const values = isRTL
    ? [
        { title: "الموثوقية", label: "الثقة", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
        { title: "الجودة والدقة", label: "الجودة", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
        { title: "الاحترافية", label: "الخبرة", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
        { title: "الابتكار", label: "التطوير", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80" },
        { title: "الشفافية", label: "الوضوح", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
        { title: "المرونة", label: "التكيف", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
      ]
    : [
        { title: "Reliability", label: "Trust", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
        { title: "Quality & Precision", label: "Quality", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
        { title: "Professionalism", label: "Expertise", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
        { title: "Innovation", label: "Development", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80" },
        { title: "Transparency", label: "Clarity", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
        { title: "Flexibility", label: "Adaptability", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
      ];

  const icons = [
    <svg key="reliability" className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    <svg key="quality" className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg key="professionalism" className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    <svg key="innovation" className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    <svg key="transparency" className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    <svg key="flexibility" className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  ];

  return (
    <section id="values" className="py-20 lg:py-32 bg-gradient-to-b from-[#e8eef5] to-[#dce5f0]" dir={dir}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <TypewriterTitle
              text={dict.values.title}
              isVisible={true}
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-true-cobalt ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
            />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((value, index) => (
            <ScrollReveal key={value.title} delay={index * 100} direction="up">
              <div className="relative h-[200px] rounded-[2rem] overflow-hidden group cursor-pointer">
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-true-cobalt/90 via-true-cobalt/40 to-transparent" />
                <div className={`absolute bottom-0 left-0 right-0 p-6 ${isRTL ? "text-right" : ""}`}>
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                    <div className="w-8 h-8 rounded-lg bg-royal-azure flex items-center justify-center">
                      {icons[index]}
                    </div>
                    <span className={`text-white/70 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {value.label}
                    </span>
                  </div>
                  <h4 className={`text-white font-bold text-xl ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {value.title}
                  </h4>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
