"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, Chatbot } from "../components/layout";
import { SectionHeader, Button } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";

const productCategoriesData = {
  en: [
    {
      title: "Jeans",
      slug: "jeans",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      description: "Classic and modern denim jeans for men, women, and children",
      features: ["Slim, Regular, Relaxed fits", "Various washes available", "Premium denim quality", "Custom designs welcome"],
    },
    {
      title: "Denim Jackets",
      slug: "denim-jackets",
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
      description: "Premium denim outerwear with various styles and finishes",
      features: ["Trucker jackets", "Sherpa lined options", "Custom branding", "Various wash treatments"],
    },
    {
      title: "Workwear",
      slug: "workwear",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
      description: "Durable professional apparel built to last",
      features: ["Heavy-duty construction", "Reinforced stitching", "Multiple pocket options", "Safety compliant designs"],
    },
    {
      title: "Shirts",
      slug: "shirts",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
      description: "Woven shirts and casual wear for all occasions",
      features: ["Denim shirts", "Chambray options", "Casual and formal styles", "Custom patterns"],
    },
    {
      title: "Custom Garments",
      slug: "custom",
      image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
      description: "Tailored manufacturing for your unique designs",
      features: ["Your designs, our expertise", "Full development support", "Prototype to production", "Flexible MOQs"],
    },
    {
      title: "Private Label",
      slug: "private-label",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
      description: "White-label solutions for your brand",
      features: ["Complete branding package", "Custom labels and tags", "Packaging solutions", "Quality guaranteed"],
    },
  ],
  ar: [
    {
      title: "جينز",
      slug: "jeans",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      description: "جينز دنيم كلاسيكي وعصري للرجال والنساء والأطفال",
      features: ["قصات ضيقة وعادية ومريحة", "غسلات متنوعة متاحة", "جودة دنيم فاخرة", "تصميمات مخصصة مرحب بها"],
    },
    {
      title: "جاكيتات دنيم",
      slug: "denim-jackets",
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
      description: "ملابس خارجية دنيم فاخرة بأنماط وتشطيبات متنوعة",
      features: ["جاكيتات تراكر", "خيارات مبطنة بالشيربا", "علامات تجارية مخصصة", "معالجات غسيل متنوعة"],
    },
    {
      title: "ملابس العمل",
      slug: "workwear",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
      description: "ملابس مهنية متينة مصممة لتدوم",
      features: ["بناء شديد التحمل", "خياطة معززة", "خيارات جيوب متعددة", "تصميمات متوافقة مع السلامة"],
    },
    {
      title: "قمصان",
      slug: "shirts",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
      description: "قمصان منسوجة وملابس كاجوال لجميع المناسبات",
      features: ["قمصان دنيم", "خيارات شامبراي", "أنماط كاجوال ورسمية", "أنماط مخصصة"],
    },
    {
      title: "ملابس مخصصة",
      slug: "custom",
      image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
      description: "تصنيع مخصص لتصميماتك الفريدة",
      features: ["تصميماتك، خبرتنا", "دعم تطوير كامل", "من النموذج للإنتاج", "حد أدنى مرن للطلب"],
    },
    {
      title: "العلامة الخاصة",
      slug: "private-label",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
      description: "حلول العلامة البيضاء لعلامتك التجارية",
      features: ["حزمة علامة تجارية كاملة", "ملصقات وبطاقات مخصصة", "حلول التغليف", "جودة مضمونة"],
    },
  ],
};

const capabilitiesData = {
  en: [
    { label: "Minimum Order Quantity", value: "500 pcs" },
    { label: "Lead Time", value: "45-60 days" },
    { label: "Sample Development", value: "7-14 days" },
    { label: "Annual Capacity", value: "1M+ pieces" },
  ],
  ar: [
    { label: "الحد الأدنى للطلب", value: "500 قطعة" },
    { label: "مدة التسليم", value: "45-60 يوم" },
    { label: "تطوير العينات", value: "7-14 يوم" },
    { label: "الطاقة السنوية", value: "+1M قطعة" },
  ],
};

const qualityItemsData = {
  en: [
    "AQL 2.5 standard inspection",
    "100% final product check",
    "Metal detection scanning",
    "Measurement verification",
    "Color consistency testing",
    "Wash durability testing",
  ],
  ar: [
    "فحص معيار AQL 2.5",
    "فحص 100% للمنتج النهائي",
    "مسح كشف المعادن",
    "التحقق من القياسات",
    "اختبار اتساق الألوان",
    "اختبار متانة الغسيل",
  ],
};

export default function ProductsPage() {
  const { language, dir } = useLanguage();
  const isRTL = dir === "rtl";
  
  const productCategories = productCategoriesData[language];
  const capabilities = capabilitiesData[language];
  const qualityItems = qualityItemsData[language];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header with Background Image */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=1920&q=80"
            alt="Products Background"
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
              {isRTL ? "منتجاتنا" : "Our Products"}
            </h1>
            <p className={`text-white/80 text-lg lg:text-xl leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL 
                ? "ملابس عالية الجودة مصنوعة بدقة. من الدنيم الكلاسيكي إلى التصميمات المخصصة، نصنع منتجات تلبي أعلى المعايير."
                : "Quality garments crafted with precision. From classic denim to custom designs, we manufacture products that meet the highest standards."}
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Bar */}
      <section className="py-8 border-b border-[#D8DDE9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.label} className={`text-center lg:text-left ${isRTL ? "lg:text-right" : ""}`}>
                <div className={`text-[#122D8B]/50 text-sm uppercase tracking-wide mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {cap.label}
                </div>
                <div
                  className={`text-[#122D8B] text-xl font-bold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                  style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', sans-serif" }}
                >
                  {cap.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            title={isRTL ? "فئات المنتجات" : "Product Categories"}
            subtitle={isRTL ? "استكشف مجموعتنا من الملابس الفاخرة وحلول التصنيع" : "Explore our range of premium garments and manufacturing solutions"}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((product) => (
              <div
                key={product.slug}
                className={`group border border-[#D8DDE9] hover:border-[#1A4AFF]/30 transition-all ${isRTL ? "text-right" : ""}`}
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-[#D8DDE9] relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute bottom-0 w-0 h-1 bg-[#1A4AFF] group-hover:w-full transition-all duration-300 ${isRTL ? "right-0" : "left-0"}`} />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className={`text-xl text-[#122D8B] mb-3 font-bold uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                    style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
                  >
                    {product.title}
                  </h3>
                  <p className={`text-[#122D8B]/60 text-sm mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{product.description}</p>
                  
                  <ul className={`space-y-2 mb-6 ${isRTL ? "text-right" : ""}`}>
                    {product.features.map((feature) => (
                      <li key={feature} className={`flex items-center gap-2 text-sm text-[#122D8B]/70 ${isRTL ? "flex-row-reverse justify-end font-[var(--font-cairo)]" : ""}`}>
                        {isRTL ? (
                          <>
                            {feature}
                            <div className="w-1.5 h-1.5 bg-[#1A4AFF] flex-shrink-0" />
                          </>
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 bg-[#1A4AFF] flex-shrink-0" />
                            {feature}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/products/${product.slug}`}
                    className={`text-[#1A4AFF] font-semibold text-sm uppercase tracking-wide hover:text-[#122D8B] transition-colors inline-flex items-center gap-2 ${isRTL ? "flex-row-reverse font-[var(--font-cairo)]" : ""}`}
                  >
                    {isRTL ? "عرض التفاصيل" : "View Details"}
                    <span>{isRTL ? "←" : "→"}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: "#F8F9FB" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={isRTL ? "lg:order-1 text-right" : "lg:order-2"}>
              <SectionHeader title={isRTL ? "ضمان الجودة" : "Quality Assurance"} centered={false} />
              <div className={`space-y-4 text-[#122D8B]/70 -mt-10 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                <p>
                  {isRTL 
                    ? "كل منتج يغادر منشأتنا يخضع لمراقبة جودة صارمة. نطبق عملية فحص شاملة تضمن الاتساق والتميز في كل قطعة ملابس."
                    : "Every product that leaves our facility undergoes rigorous quality control. We implement a comprehensive inspection process that ensures consistency and excellence in every garment."}
                </p>
                <p>
                  {isRTL ? "معايير الجودة لدينا تشمل:" : "Our quality standards include:"}
                </p>
                <ul className={`space-y-3 ${isRTL ? "w-full text-right" : ""}`}>
                  {qualityItems.map((item) => (
                    <li key={item} className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                      {isRTL ? (
                        <>
                          <span>{item}</span>
                          <div className="w-2 h-2 bg-[#1A4AFF] flex-shrink-0" />
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-[#1A4AFF] flex-shrink-0" />
                          <span>{item}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`relative ${isRTL ? "lg:order-2" : "lg:order-1"}`}>
              <div className="p-4 relative">
                {/* Corner decorations */}
                <div className={`absolute top-0 w-6 h-6 border-t-2 border-[#B6C6E1] ${isRTL ? "right-0 border-r-2" : "left-0 border-l-2"}`} />
                <div className={`absolute bottom-0 w-6 h-6 border-b-2 border-[#B6C6E1] ${isRTL ? "left-0 border-l-2" : "right-0 border-r-2"}`} />
                
                <div className="aspect-[4/3] bg-[#D8DDE9] relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                    alt={isRTL ? "مراقبة الجودة" : "Quality Control"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#122D8B]/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  );
}
