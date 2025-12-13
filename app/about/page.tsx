"use client";

import Image from "next/image";
import { Navbar, Footer, Chatbot } from "../components/layout";
import { SectionHeader, Button } from "../components/ui";
import {
  ReliabilityIcon,
  QualityIcon,
  ProfessionalismIcon,
  InnovationIcon,
  TransparencyIcon,
  FlexibilityIcon,
} from "../components/Icons";
import { useLanguage } from "../context/LanguageContext";

const milestonesData = {
  en: [
    { year: "2008", title: "Company Founded", description: "EDGE established in Port Said Free Zone" },
    { year: "2012", title: "International Expansion", description: "Started serving European brands" },
    { year: "2016", title: "Facility Upgrade", description: "Expanded production capacity by 200%" },
    { year: "2020", title: "Sustainability Focus", description: "Implemented eco-friendly practices" },
    { year: "2024", title: "Digital Transformation", description: "Adopted Industry 4.0 technologies" },
  ],
  ar: [
    { year: "2008", title: "تأسيس الشركة", description: "تأسست إيدج في المنطقة الحرة ببورسعيد" },
    { year: "2012", title: "التوسع الدولي", description: "بدأنا خدمة العلامات التجارية الأوروبية" },
    { year: "2016", title: "تطوير المنشأة", description: "توسيع القدرة الإنتاجية بنسبة 200%" },
    { year: "2020", title: "التركيز على الاستدامة", description: "تطبيق الممارسات الصديقة للبيئة" },
    { year: "2024", title: "التحول الرقمي", description: "اعتماد تقنيات الصناعة 4.0" },
  ],
};

const valuesData = {
  en: [
    { icon: ReliabilityIcon, title: "Reliability", description: "Consistent delivery and dependable partnerships" },
    { icon: QualityIcon, title: "Quality", description: "Meticulous attention to detail in every stitch" },
    { icon: ProfessionalismIcon, title: "Professionalism", description: "Industry-leading standards and expertise" },
    { icon: InnovationIcon, title: "Innovation", description: "Embracing new technologies and methods" },
    { icon: TransparencyIcon, title: "Transparency", description: "Open communication and clear processes" },
    { icon: FlexibilityIcon, title: "Flexibility", description: "Adaptable solutions for unique requirements" },
  ],
  ar: [
    { icon: ReliabilityIcon, title: "الموثوقية", description: "تسليم ثابت وشراكات يمكن الاعتماد عليها" },
    { icon: QualityIcon, title: "الجودة", description: "اهتمام دقيق بالتفاصيل في كل غرزة" },
    { icon: ProfessionalismIcon, title: "الاحترافية", description: "معايير رائدة في الصناعة وخبرة عالية" },
    { icon: InnovationIcon, title: "الابتكار", description: "تبني التقنيات والأساليب الجديدة" },
    { icon: TransparencyIcon, title: "الشفافية", description: "تواصل مفتوح وعمليات واضحة" },
    { icon: FlexibilityIcon, title: "المرونة", description: "حلول قابلة للتكيف مع المتطلبات الفريدة" },
  ],
};

const statsData = {
  en: [
    { number: "15+", label: "Years Experience" },
    { number: "500+", label: "Skilled Workers" },
    { number: "50+", label: "Brand Partners" },
    { number: "1M+", label: "Garments Annually" },
  ],
  ar: [
    { number: "+15", label: "سنوات الخبرة" },
    { number: "+500", label: "عامل ماهر" },
    { number: "+50", label: "شريك تجاري" },
    { number: "+1M", label: "قطعة سنوياً" },
  ],
};

export default function AboutPage() {
  const { language, t, dir } = useLanguage();
  const isRTL = dir === "rtl";
  
  const milestones = milestonesData[language];
  const values = valuesData[language];
  const stats = statsData[language];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header with Background Image */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
            alt="EDGE Factory Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#122D8B]/85" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`max-w-3xl ${isRTL ? "mr-0 ml-auto text-right" : ""}`}>
            <div className={`w-16 h-1 bg-[#1A4AFF] mb-8 ${isRTL ? "mr-0 ml-auto" : ""}`} />
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl text-white font-bold uppercase tracking-wide mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
            >
              {isRTL ? "عن إيدج" : "About EDGE"}
            </h1>
            <p className={`text-white/80 text-lg lg:text-xl leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL 
                ? "شركة مصرية رائدة في تصنيع الدنيم الفاخر والملابس الجاهزة للعلامات التجارية العالمية منذ عام 2008."
                : "A leading Egyptian manufacturer delivering premium denim and woven garments to brands worldwide since 2008."}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side - Left in AR, Right in EN */}
            <div className={`relative ${isRTL ? "lg:order-2" : "lg:order-2"}`}>
              <div className="p-4 relative">
                {/* Corner decorations */}
                <div className={`absolute top-0 w-6 h-6 border-t-2 border-[#B6C6E1] ${isRTL ? "right-0 border-r-2" : "left-0 border-l-2"}`} />
                <div className={`absolute bottom-0 w-6 h-6 border-b-2 border-[#B6C6E1] ${isRTL ? "left-0 border-l-2" : "right-0 border-r-2"}`} />
                
                <div className="aspect-[4/3] bg-[#D8DDE9] relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                    alt={isRTL ? "مصنع إيدج - التميز في التصنيع" : "EDGE Factory - Manufacturing Excellence"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#122D8B]/30 to-transparent" />
                  <div className={`absolute top-4 w-16 h-16 border-2 border-white/30 ${isRTL ? "left-4" : "right-4"}`} />
                  <div className={`absolute bottom-4 w-12 h-12 border-2 border-[#1A4AFF]/30 ${isRTL ? "right-4" : "left-4"}`} />
                </div>
              </div>

              {/* Stats Badge */}
              <div className={`absolute -bottom-6 bg-[#122D8B] text-white p-6 hidden lg:block ${isRTL ? "-left-6 text-right" : "-right-6"}`}>
                <div className="text-3xl font-bold">{isRTL ? "+15" : "15+"}</div>
                <div className={`text-sm text-white/80 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "سنوات الخبرة" : "Years Experience"}
                </div>
              </div>
            </div>

            {/* Content Side - Right in AR, Left in EN */}
            <div className={`${isRTL ? "text-right lg:order-1" : "lg:order-1"}`}>
              <SectionHeader title={isRTL ? "قصتنا" : "Our Story"} centered={false} />
              <div className={`space-y-4 text-[#122D8B]/70 -mt-10 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                <p>
                  {isRTL ? (
                    <>
                      تأسست <strong className="text-[#122D8B]">إيدج للملابس</strong> عام 2008 برؤية لإحداث ثورة في تصنيع الملابس في مصر. تقع في المنطقة الحرة الاستراتيجية ببورسعيد، وقد نمونا من ورشة صغيرة إلى شركة رائدة في التصنيع تخدم العلامات التجارية العالمية.
                    </>
                  ) : (
                    <>
                      Founded in 2008, <strong className="text-[#122D8B]">EDGE for Garments</strong> began 
                      with a vision to revolutionize garment manufacturing in Egypt. Located in the strategic 
                      Port Said Free Zone, we&apos;ve grown from a small workshop to a leading manufacturer 
                      serving international brands.
                    </>
                  )}
                </p>
                <p>
                  {isRTL 
                    ? "تميزت رحلتنا بالتحسين المستمر والاستثمار في التكنولوجيا والالتزام الراسخ بالجودة. اليوم، نشغل منشأة حديثة مجهزة بأحدث الآلات ويعمل بها أكثر من 500 محترف ماهر."
                    : "Our journey has been marked by continuous improvement, investment in technology, and an unwavering commitment to quality. Today, we operate a state-of-the-art facility equipped with the latest machinery and staffed by over 500 skilled professionals."}
                </p>
                <p>
                  {isRTL
                    ? "نتخصص في الدنيم والملابس المنسوجة، ونقدم دورة إنتاج كاملة تضمن مراقبة الجودة في كل مرحلة. من فحص القماش إلى التغليف النهائي، كل قطعة ملابس تغادر منشأتنا تلبي أعلى المعايير الدولية."
                    : "We specialize in denim and woven garments, offering a complete production cycle that ensures quality control at every stage. From fabric inspection to final packaging, every garment that leaves our facility meets the highest international standards."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ backgroundColor: "#122D8B" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-4xl md:text-5xl text-white font-bold mb-2"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  {stat.number}
                </div>
                <div className={`text-white/60 text-sm uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: "#F8F9FB" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            title={isRTL ? "رحلتنا" : "Our Journey"}
            subtitle={isRTL ? "محطات رئيسية في قصة نمونا" : "Key milestones in our growth story"}
          />

          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute top-0 bottom-0 w-0.5 bg-[#B6C6E1] ${isRTL ? "right-8 lg:right-1/2" : "left-8 lg:left-1/2"}`} />

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 ${
                    isRTL 
                      ? (index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row")
                      : (index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse")
                  }`}
                >
                  {/* Dot */}
                  <div className={`absolute w-4 h-4 bg-[#1A4AFF] z-10 ${isRTL ? "right-8 lg:right-1/2 translate-x-1/2" : "left-8 lg:left-1/2 -translate-x-1/2"}`} />

                  {/* Content */}
                  <div className={`lg:w-1/2 ${isRTL 
                    ? `pr-20 lg:pr-0 ${index % 2 === 0 ? "lg:pl-16 lg:text-left" : "lg:pr-16 lg:text-right"}`
                    : `pl-20 lg:pl-0 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`
                  }`}>
                    <div
                      className="text-[#1A4AFF] font-bold text-2xl mb-2"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      {milestone.year}
                    </div>
                    <h3
                      className={`text-[#122D8B] font-bold text-lg mb-1 uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                      style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', sans-serif" }}
                    >
                      {milestone.title}
                    </h3>
                    <p className={`text-[#122D8B]/60 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            title={isRTL ? "قيمنا" : "Our Values"}
            subtitle={isRTL ? "المبادئ التي توجه كل ما نقوم به" : "The principles that guide everything we do"}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className={`p-8 border border-[#D8DDE9] hover:border-[#1A4AFF]/30 transition-colors group ${isRTL ? "text-right" : ""}`}
              >
                <value.icon className={`w-12 h-12 text-[#122D8B] group-hover:text-[#1A4AFF] transition-colors mb-6 ${isRTL ? "mr-0 ml-auto" : ""}`} />
                <h3
                  className={`text-lg text-[#122D8B] mb-3 font-bold uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                  style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
                >
                  {value.title}
                </h3>
                <p className={`text-[#122D8B]/60 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  );
}
