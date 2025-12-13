"use client";

import { SectionHeader } from "../components/ui";
import {
  ReliabilityIcon,
  QualityIcon,
  ProfessionalismIcon,
  InnovationIcon,
  TransparencyIcon,
  FlexibilityIcon,
} from "../components/Icons";
import { useLanguage } from "../context/LanguageContext";

export function ValuesSection() {
  const { dir } = useLanguage();

  const values = dir === "rtl"
    ? [
        {
          icon: ReliabilityIcon,
          title: "الموثوقية",
          description: "تسليم مستمر وشراكات يمكنك الاعتماد عليها.",
        },
        {
          icon: QualityIcon,
          title: "الجودة والدقة",
          description: "اهتمام دقيق بالتفاصيل في كل غرزة ودرزة.",
        },
        {
          icon: ProfessionalismIcon,
          title: "الاحترافية",
          description: "معايير رائدة في الصناعة وحرفية متخصصة.",
        },
        {
          icon: InnovationIcon,
          title: "الابتكار",
          description: "تبني التقنيات الجديدة وأساليب التصنيع الحديثة.",
        },
        {
          icon: TransparencyIcon,
          title: "الشفافية",
          description: "تواصل مفتوح وعمليات واضحة طوال الطريق.",
        },
        {
          icon: FlexibilityIcon,
          title: "المرونة",
          description: "حلول قابلة للتكيف لتلبية متطلباتك الفريدة.",
        },
      ]
    : [
        {
          icon: ReliabilityIcon,
          title: "Reliability",
          description: "Consistent delivery and dependable partnerships you can count on.",
        },
        {
          icon: QualityIcon,
          title: "Quality & Precision",
          description: "Meticulous attention to detail in every stitch and seam.",
        },
        {
          icon: ProfessionalismIcon,
          title: "Professionalism",
          description: "Industry-leading standards and expert craftsmanship.",
        },
        {
          icon: InnovationIcon,
          title: "Innovation",
          description: "Embracing new technologies and manufacturing methods.",
        },
        {
          icon: TransparencyIcon,
          title: "Transparency",
          description: "Open communication and clear processes throughout.",
        },
        {
          icon: FlexibilityIcon,
          title: "Flexibility",
          description: "Adaptable solutions to meet your unique requirements.",
        },
      ];

  return (
    <section id="values" className="py-20 lg:py-32" style={{ backgroundColor: "rgba(182, 198, 225, 0.3)" }} dir={dir}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeader
          title={dir === "rtl" ? "لماذا تختار إيدج" : "Why Choose EDGE"}
          subtitle={dir === "rtl" ? "قيمنا الأساسية تقود كل ما نفعله، وتضمن التميز في كل قطعة ملابس." : "Our core values drive everything we do, ensuring excellence in every garment."}
        />

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className={`bg-white p-8 border border-[#D8DDE9] hover:border-[#1A4AFF]/30 transition-colors group ${dir === "rtl" ? "text-right" : ""}`}
            >
              <div className={`mb-6 ${dir === "rtl" ? "flex justify-end" : ""}`}>
                <value.icon className="w-12 h-12 text-[#122D8B] group-hover:text-[#1A4AFF] transition-colors" />
              </div>
              <h3
                className={`text-lg text-[#122D8B] mb-3 font-bold uppercase tracking-wide ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}
                style={{ fontFamily: dir === "rtl" ? "var(--font-cairo), sans-serif" : "'Arial Black', 'Bebas Neue', sans-serif" }}
              >
                {value.title}
              </h3>
              <p className={`text-[#122D8B]/60 text-sm leading-relaxed ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
