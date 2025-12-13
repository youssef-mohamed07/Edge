"use client";

import Image from "next/image";
import { Navbar, Footer, Chatbot } from "../components/layout";
import { SectionHeader, Button } from "../components/ui";
import {
  FabricInspectionIcon,
  CuttingIcon,
  SewingIcon,
  WashingIcon,
  EmbroideryIcon,
  PackagingIcon,
} from "../components/Icons";
import { useLanguage } from "../context/LanguageContext";

const servicesData = {
  en: [
    {
      icon: FabricInspectionIcon,
      title: "Fabric Inspection",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
      description: "Rigorous quality checks on all incoming materials to ensure premium standards.",
      details: [
        "4-point inspection system",
        "Color consistency verification",
        "Shrinkage testing",
        "Weight and composition analysis",
        "Defect documentation and reporting",
      ],
    },
    {
      icon: CuttingIcon,
      title: "Cutting",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      description: "Precision cutting with advanced machinery for accurate patterns and minimal waste.",
      details: [
        "CAD/CAM pattern making",
        "Automatic spreading machines",
        "Computerized cutting systems",
        "Optimal fabric utilization",
        "Quality checks on cut pieces",
      ],
    },
    {
      icon: SewingIcon,
      title: "Sewing",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
      description: "Expert stitching by skilled craftsmen using industrial-grade equipment.",
      details: [
        "Specialized denim machinery",
        "Multi-needle chain stitch machines",
        "Bartack and buttonhole automation",
        "Inline quality inspection",
        "Skilled workforce training",
      ],
    },
    {
      icon: WashingIcon,
      title: "Washing",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      description: "Specialized washing techniques for desired finishes and fabric treatment.",
      details: [
        "Stone wash and enzyme wash",
        "Bleaching and tinting",
        "Softening treatments",
        "Distressing and whiskering",
        "Eco-friendly wash options",
      ],
    },
    {
      icon: EmbroideryIcon,
      title: "Embroidery & Printing",
      image: "https://images.unsplash.com/photo-1558171813-6be261e62c1c?w=800&q=80",
      description: "Custom embroidery and printing services for branding and design elements.",
      details: [
        "Multi-head embroidery machines",
        "Screen printing",
        "Heat transfer printing",
        "Laser engraving",
        "Custom labeling solutions",
      ],
    },
    {
      icon: PackagingIcon,
      title: "Packaging & Final QC",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      description: "Comprehensive quality control and professional packaging for delivery.",
      details: [
        "100% final inspection",
        "Metal detection scanning",
        "Professional pressing and folding",
        "Custom packaging solutions",
        "Export documentation",
      ],
    },
  ],
  ar: [
    {
      icon: FabricInspectionIcon,
      title: "فحص الأقمشة",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
      description: "فحوصات جودة صارمة على جميع المواد الواردة لضمان أعلى المعايير.",
      details: [
        "نظام فحص 4 نقاط",
        "التحقق من اتساق الألوان",
        "اختبار الانكماش",
        "تحليل الوزن والتركيب",
        "توثيق العيوب والإبلاغ عنها",
      ],
    },
    {
      icon: CuttingIcon,
      title: "القص",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      description: "قص دقيق بآلات متقدمة لأنماط دقيقة وأقل هدر.",
      details: [
        "صنع الباترون CAD/CAM",
        "آلات فرد أوتوماتيكية",
        "أنظمة قص محوسبة",
        "استخدام أمثل للقماش",
        "فحوصات جودة على القطع المقصوصة",
      ],
    },
    {
      icon: SewingIcon,
      title: "الخياطة",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
      description: "خياطة احترافية بأيدي حرفيين مهرة باستخدام معدات صناعية.",
      details: [
        "آلات دنيم متخصصة",
        "آلات غرزة سلسلة متعددة الإبر",
        "أتمتة العراوي والأزرار",
        "فحص جودة مباشر",
        "تدريب القوى العاملة الماهرة",
      ],
    },
    {
      icon: WashingIcon,
      title: "الغسيل",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      description: "تقنيات غسيل متخصصة للحصول على التشطيبات المطلوبة ومعالجة الأقمشة.",
      details: [
        "غسيل حجري وإنزيمي",
        "تبييض وصبغ",
        "معالجات تنعيم",
        "تعتيق وتجعيد",
        "خيارات غسيل صديقة للبيئة",
      ],
    },
    {
      icon: EmbroideryIcon,
      title: "التطريز والطباعة",
      image: "https://images.unsplash.com/photo-1558171813-6be261e62c1c?w=800&q=80",
      description: "خدمات تطريز وطباعة مخصصة للعلامات التجارية وعناصر التصميم.",
      details: [
        "آلات تطريز متعددة الرؤوس",
        "طباعة الشاشة الحريرية",
        "طباعة النقل الحراري",
        "النقش بالليزر",
        "حلول الملصقات المخصصة",
      ],
    },
    {
      icon: PackagingIcon,
      title: "التغليف ومراقبة الجودة النهائية",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      description: "مراقبة جودة شاملة وتغليف احترافي للتسليم.",
      details: [
        "فحص نهائي 100%",
        "مسح كشف المعادن",
        "كي وطي احترافي",
        "حلول تغليف مخصصة",
        "وثائق التصدير",
      ],
    },
  ],
};

const additionalServicesData = {
  en: [
    { title: "Product Development", description: "From concept to sample, we help develop your designs into production-ready garments." },
    { title: "Sourcing", description: "Access to premium fabrics and trims through our established supplier network." },
    { title: "Private Label", description: "Complete white-label manufacturing with your branding and specifications." },
    { title: "Logistics", description: "Efficient shipping and customs handling from our Port Said location." },
  ],
  ar: [
    { title: "تطوير المنتجات", description: "من الفكرة إلى العينة، نساعدك في تطوير تصميماتك إلى ملابس جاهزة للإنتاج." },
    { title: "التوريد", description: "الوصول إلى أقمشة وإكسسوارات فاخرة من خلال شبكة الموردين الراسخة لدينا." },
    { title: "العلامة الخاصة", description: "تصنيع كامل بعلامتك التجارية ومواصفاتك." },
    { title: "الخدمات اللوجستية", description: "شحن فعال وتخليص جمركي من موقعنا في بورسعيد." },
  ],
};

const processStepsData = {
  en: [
    { step: "01", title: "Inquiry", desc: "Share your requirements and specifications" },
    { step: "02", title: "Sampling", desc: "We develop samples for your approval" },
    { step: "03", title: "Production", desc: "Full-scale manufacturing begins" },
    { step: "04", title: "Delivery", desc: "Quality checked and shipped on time" },
  ],
  ar: [
    { step: "01", title: "الاستفسار", desc: "شارك متطلباتك ومواصفاتك" },
    { step: "02", title: "العينات", desc: "نطور عينات لموافقتك" },
    { step: "03", title: "الإنتاج", desc: "يبدأ التصنيع على نطاق واسع" },
    { step: "04", title: "التسليم", desc: "فحص الجودة والشحن في الوقت المحدد" },
  ],
};

export default function ServicesPage() {
  const { language, dir } = useLanguage();
  const isRTL = dir === "rtl";
  
  const services = servicesData[language];
  const additionalServices = additionalServicesData[language];
  const processSteps = processStepsData[language];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header with Background Image */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="Services Background"
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
              {isRTL ? "خدماتنا" : "Our Services"}
            </h1>
            <p className={`text-white/80 text-lg lg:text-xl leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL 
                ? "عملية تصنيع متكاملة من البداية للنهاية مصممة للجودة والكفاءة. من القماش إلى الملابس الجاهزة، نتولى كل شيء."
                : "A complete end-to-end manufacturing process designed for quality and efficiency. From fabric to finished garment, we handle it all."}
            </p>
          </div>
        </div>
      </section>

      {/* Production Cycle */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            title={isRTL ? "دورة الإنتاج" : "Production Cycle"}
            subtitle={isRTL ? "ست مراحل شاملة تضمن الجودة في كل خطوة" : "Six comprehensive stages ensuring quality at every step"}
          />

          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center`}
              >
                {/* Content */}
                <div className={isRTL ? (index % 2 === 1 ? "lg:order-1" : "lg:order-2") : (index % 2 === 1 ? "lg:order-2" : "")}>
                  <div
                    className={`text-[#B6C6E1] text-sm mb-4 font-bold uppercase tracking-wide ${isRTL ? "text-right" : ""}`}
                    style={{ fontFamily: "'Arial Black', sans-serif" }}
                  >
                    {isRTL ? `الخطوة ${String(index + 1).padStart(2, "0")}` : `STEP ${String(index + 1).padStart(2, "0")}`}
                  </div>
                  <div className={`flex items-center gap-4 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <service.icon className="w-16 h-16 text-[#122D8B]" />
                    <h2
                      className={`text-2xl md:text-3xl text-[#122D8B] font-bold uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                      style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
                    >
                      {service.title}
                    </h2>
                  </div>
                  <p className={`text-[#122D8B]/70 text-lg mb-6 ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>{service.description}</p>
                  <ul className={`space-y-3 ${isRTL ? "text-right" : ""}`}>
                    {service.details.map((detail) => (
                      <li key={detail} className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                        {!isRTL && <div className="w-2 h-2 bg-[#1A4AFF] flex-shrink-0" />}
                        <span className={`text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{detail}</span>
                        {isRTL && <div className="w-2 h-2 bg-[#1A4AFF] flex-shrink-0" />}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image */}
                <div className={`aspect-video bg-[#D8DDE9] relative overflow-hidden ${isRTL ? (index % 2 === 1 ? "lg:order-2" : "lg:order-1") : (index % 2 === 1 ? "lg:order-1" : "")}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute top-4 w-8 h-8 border-t-2 border-[#1A4AFF] ${isRTL ? "right-4 border-r-2" : "left-4 border-l-2"}`} />
                  <div className={`absolute bottom-4 w-8 h-8 border-b-2 border-[#1A4AFF] ${isRTL ? "left-4 border-l-2" : "right-4 border-r-2"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: "#F8F9FB" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            title={isRTL ? "خدمات إضافية" : "Additional Services"}
            subtitle={isRTL ? "بالإضافة للتصنيع، نقدم دعم كامل لعلامتك التجارية" : "Beyond manufacturing, we offer complete support for your brand"}
          />

          <div className="grid md:grid-cols-2 gap-6">
            {additionalServices.map((service) => (
              <div
                key={service.title}
                className={`bg-white p-8 border border-[#D8DDE9] hover:border-[#1A4AFF]/30 transition-colors ${isRTL ? "text-right" : ""}`}
              >
                <h3
                  className={`text-xl text-[#122D8B] mb-3 font-bold uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                  style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
                >
                  {service.title}
                </h3>
                <p className={`text-[#122D8B]/60 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            title={isRTL ? "كيف نعمل" : "How We Work"}
            subtitle={isRTL ? "عملية مبسطة من الاستفسار إلى التسليم" : "A streamlined process from inquiry to delivery"}
          />

          <div className={`grid md:grid-cols-4 gap-8 ${isRTL ? "direction-rtl" : ""}`}>
            {processSteps.map((item, index) => (
              <div key={item.step} className="text-center relative">
                {index < 3 && (
                  <div className={`hidden md:block absolute top-8 w-[80%] h-0.5 bg-[#B6C6E1] ${isRTL ? "right-[60%]" : "left-[60%]"}`} />
                )}
                <div
                  className="w-16 h-16 mx-auto mb-4 bg-[#122D8B] text-white flex items-center justify-center text-xl font-bold"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  {item.step}
                </div>
                <h3
                  className={`text-lg text-[#122D8B] mb-2 font-bold uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                  style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className={`text-[#122D8B]/60 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{item.desc}</p>
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
