import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { isValidLocale, siteUrl, getDirection, type Locale } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Chatbot } from "../components/layout/Chatbot";
import {
  FabricInspectionIcon,
  CuttingIcon,
  SewingIcon,
  WashingIcon,
  EmbroideryIcon,
  PackagingIcon,
} from "../../components/Icons";
import { PageHero } from "../components/PageHero";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const isRTL = locale === "ar";
  const currentUrl = `${siteUrl}/${locale}/services`;

  return {
    title: isRTL ? "خدماتنا | إيدج للملابس" : "Our Services | EDGE for Garments",
    description: isRTL
      ? "عملية تصنيع متكاملة من البداية للنهاية مصممة للجودة والكفاءة"
      : "A complete end-to-end manufacturing process designed for quality and efficiency",
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/services`,
        ar: `${siteUrl}/ar/services`,
        "x-default": `${siteUrl}/en/services`,
      },
    },
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const services = isRTL
    ? [
        {
          icon: FabricInspectionIcon,
          title: "فحص الأقمشة",
          image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
          description: "فحوصات جودة صارمة على جميع المواد الواردة لضمان أعلى المعايير.",
          details: ["نظام فحص 4 نقاط", "التحقق من اتساق الألوان", "اختبار الانكماش", "تحليل الوزن والتركيب"],
        },
        {
          icon: CuttingIcon,
          title: "القص",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
          description: "قص دقيق بآلات متقدمة لأنماط دقيقة وأقل هدر.",
          details: ["صنع الباترون CAD/CAM", "آلات فرد أوتوماتيكية", "أنظمة قص محوسبة", "استخدام أمثل للقماش"],
        },
        {
          icon: SewingIcon,
          title: "الخياطة",
          image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
          description: "خياطة احترافية بأيدي حرفيين مهرة باستخدام معدات صناعية.",
          details: ["آلات دنيم متخصصة", "آلات غرزة سلسلة متعددة الإبر", "أتمتة العراوي والأزرار", "فحص جودة مباشر"],
        },
        {
          icon: WashingIcon,
          title: "الغسيل",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
          description: "تقنيات غسيل متخصصة للحصول على التشطيبات المطلوبة.",
          details: ["غسيل حجري وإنزيمي", "تبييض وصبغ", "معالجات تنعيم", "خيارات صديقة للبيئة"],
        },
        {
          icon: EmbroideryIcon,
          title: "التطريز والطباعة",
          image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
          description: "خدمات تطريز وطباعة مخصصة للعلامات التجارية.",
          details: ["آلات تطريز متعددة الرؤوس", "طباعة الشاشة الحريرية", "طباعة النقل الحراري", "النقش بالليزر"],
        },
        {
          icon: PackagingIcon,
          title: "التغليف ومراقبة الجودة",
          image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
          description: "مراقبة جودة شاملة وتغليف احترافي للتسليم.",
          details: ["فحص نهائي 100%", "مسح كشف المعادن", "كي وطي احترافي", "وثائق التصدير"],
        },
      ]
    : [
        {
          icon: FabricInspectionIcon,
          title: "Fabric Inspection",
          image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
          description: "Rigorous quality checks on all incoming materials to ensure premium standards.",
          details: ["4-point inspection system", "Color consistency verification", "Shrinkage testing", "Weight and composition analysis"],
        },
        {
          icon: CuttingIcon,
          title: "Cutting",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
          description: "Precision cutting with advanced machinery for accurate patterns and minimal waste.",
          details: ["CAD/CAM pattern making", "Automatic spreading machines", "Computerized cutting systems", "Optimal fabric utilization"],
        },
        {
          icon: SewingIcon,
          title: "Sewing",
          image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
          description: "Expert stitching by skilled craftsmen using industrial-grade equipment.",
          details: ["Specialized denim machinery", "Multi-needle chain stitch machines", "Bartack and buttonhole automation", "Inline quality inspection"],
        },
        {
          icon: WashingIcon,
          title: "Washing",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
          description: "Specialized washing techniques for desired finishes and fabric treatment.",
          details: ["Stone wash and enzyme wash", "Bleaching and tinting", "Softening treatments", "Eco-friendly wash options"],
        },
        {
          icon: EmbroideryIcon,
          title: "Embroidery & Printing",
          image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
          description: "Custom embroidery and printing services for branding and design elements.",
          details: ["Multi-head embroidery machines", "Screen printing", "Heat transfer printing", "Laser engraving"],
        },
        {
          icon: PackagingIcon,
          title: "Packaging & Final QC",
          image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
          description: "Comprehensive quality control and professional packaging for delivery.",
          details: ["100% final inspection", "Metal detection scanning", "Professional pressing and folding", "Export documentation"],
        },
      ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar locale={locale} dict={dict} />

      {/* Page Hero */}
      <PageHero
        title={isRTL ? "خدماتنا" : "Our Services"}
        subtitle={
          isRTL
            ? "عملية تصنيع متكاملة من البداية للنهاية مصممة للجودة والكفاءة. من القماش إلى الملابس الجاهزة، نتولى كل شيء."
            : "A complete end-to-end manufacturing process designed for quality and efficiency. From fabric to finished garment, we handle it all."
        }
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
        isRTL={isRTL}
        breadcrumbs={[
          { label: isRTL ? "الرئيسية" : "Home", href: `/${locale}` },
          { label: isRTL ? "خدماتنا" : "Services" },
        ]}
      />

      {/* Production Cycle */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "دورة الإنتاج" : "Production Cycle"}
            </h2>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.title} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                  <div className={`text-[#B6C6E1] text-sm mb-4 font-bold uppercase tracking-wide ${isRTL ? "text-right" : ""}`}>
                    {isRTL ? `الخطوة ${String(index + 1).padStart(2, "0")}` : `STEP ${String(index + 1).padStart(2, "0")}`}
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <service.icon className="w-16 h-16 text-[#122D8B]" />
                    <h2 className={`text-2xl md:text-3xl text-[#122D8B] font-bold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {service.title}
                    </h2>
                  </div>
                  <p className={`text-[#122D8B]/70 text-lg mb-6 ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>
                    {service.description}
                  </p>
                  <ul className={`space-y-3 ${isRTL ? "text-right" : ""}`}>
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-[#1A4AFF] flex-shrink-0" />
                        <span className={`text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`aspect-video bg-[#D8DDE9] relative overflow-hidden ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
                >
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                  <div className={`absolute top-4 w-8 h-8 border-t-2 border-[#1A4AFF] ${isRTL ? "right-4 border-r-2" : "left-4 border-l-2"}`} />
                  <div className={`absolute bottom-4 w-8 h-8 border-b-2 border-[#1A4AFF] ${isRTL ? "left-4 border-l-2" : "right-4 border-r-2"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
