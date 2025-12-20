"use client";

import {
  ReliabilityIcon,
  QualityIcon,
  ProfessionalismIcon,
  InnovationIcon,
  TransparencyIcon,
  FlexibilityIcon,
} from "../../components/Icons";
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
        { icon: ReliabilityIcon, title: "الموثوقية", description: "تسليم مستمر وشراكات يمكنك الاعتماد عليها." },
        { icon: QualityIcon, title: "الجودة والدقة", description: "اهتمام دقيق بالتفاصيل في كل غرزة ودرزة." },
        { icon: ProfessionalismIcon, title: "الاحترافية", description: "معايير رائدة في الصناعة وحرفية متخصصة." },
        { icon: InnovationIcon, title: "الابتكار", description: "تبني التقنيات الجديدة وأساليب التصنيع الحديثة." },
        { icon: TransparencyIcon, title: "الشفافية", description: "تواصل مفتوح وعمليات واضحة طوال الطريق." },
        { icon: FlexibilityIcon, title: "المرونة", description: "حلول قابلة للتكيف لتلبية متطلباتك الفريدة." },
      ]
    : [
        { icon: ReliabilityIcon, title: "Reliability", description: "Consistent delivery and dependable partnerships you can count on." },
        { icon: QualityIcon, title: "Quality & Precision", description: "Meticulous attention to detail in every stitch and seam." },
        { icon: ProfessionalismIcon, title: "Professionalism", description: "Industry-leading standards and expert craftsmanship." },
        { icon: InnovationIcon, title: "Innovation", description: "Embracing new technologies and manufacturing methods." },
        { icon: TransparencyIcon, title: "Transparency", description: "Open communication and clear processes throughout." },
        { icon: FlexibilityIcon, title: "Flexibility", description: "Adaptable solutions to meet your unique requirements." },
      ];

  return (
    <section id="values" className="py-20 lg:py-32 bg-[#D8DDE9]" dir={dir}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
        <div className="text-center mb-16">
          <span className={`text-[#1A4AFF] text-sm font-semibold uppercase tracking-wider block mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {dict.values.label}
          </span>
          <TypewriterTitle
            text={dict.values.title}
            isVisible={true}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
          />
        </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <ScrollReveal key={value.title} delay={index * 150} direction={index % 2 === 0 ? "up" : "fade"}>
            <div
              className={`bg-white p-8 border border-[#D8DDE9] hover:border-[#1A4AFF]/50 
                transition-all duration-500 ease-out group cursor-pointer
                hover:shadow-xl hover:shadow-[#1A4AFF]/10 hover:-translate-y-2 hover:scale-[1.02]
                ${isRTL ? "text-right" : ""}`}
            >
              <div className={`mb-6 ${isRTL ? "flex justify-end" : ""}`}>
                <div className="relative">
                  <value.icon className="w-12 h-12 text-[#122D8B] group-hover:text-[#1A4AFF] transition-all duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#1A4AFF]/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-10 blur-xl" />
                </div>
              </div>
              <h3
                className={`text-lg text-[#122D8B] mb-3 font-bold uppercase tracking-wide transition-colors duration-300 group-hover:text-[#1A4AFF] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              >
                {value.title}
              </h3>
              <p className={`text-[#122D8B]/60 text-sm leading-relaxed transition-colors duration-300 group-hover:text-[#122D8B]/80 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {value.description}
              </p>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
