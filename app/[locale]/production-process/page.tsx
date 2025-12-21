import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, siteUrl, getDirection } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Chatbot } from "../components/layout/Chatbot";
import { PageHero } from "../components/PageHero";
import { AnimatedServiceStep, type IconName } from "./AnimatedServiceStep";
import { WhySetsUsApart } from "./WhySetsUsApart";
import { AIGuideSection } from "../sections/AIGuideSection";
import { FAQSection } from "../sections/FAQSection";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const isRTL = locale === "ar";
  const currentUrl = `${siteUrl}/${locale}/production-process`;

  return {
    title: isRTL
      ? "عملية الإنتاج | إيدج للملابس"
      : "Production Process | EDGE for Garments",
    description: isRTL
      ? "عملية تصنيع متكاملة من البداية للنهاية مصممة للجودة والكفاءة"
      : "A complete end-to-end manufacturing process designed for quality and efficiency",
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/production-process`,
        ar: `${siteUrl}/ar/production-process`,
        "x-default": `${siteUrl}/en/production-process`,
      },
    },
  };
}

export default async function ProductionProcessPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const services: Array<{
    iconName: IconName;
    title: string;
    image: string;
    description: string;
    details: string[];
  }> = isRTL
    ? [
        {
          iconName: "FabricInspectionIcon",
          title: "فحص الأقمشة",
          image:
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
          description:
            "فحوصات جودة صارمة على جميع المواد الواردة لضمان أعلى المعايير.",
          details: [
            "نظام فحص 4 نقاط",
            "التحقق من اتساق الألوان",
            "اختبار الانكماش",
            "تحليل الوزن والتركيب",
          ],
        },
        {
          iconName: "CuttingIcon",
          title: "القص",
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
          description: "قص دقيق بآلات متقدمة لأنماط دقيقة وأقل هدر.",
          details: [
            "صنع الباترون CAD/CAM",
            "آلات فرد أوتوماتيكية",
            "أنظمة قص محوسبة",
            "استخدام أمثل للقماش",
          ],
        },
        {
          iconName: "SewingIcon",
          title: "الخياطة",
          image:
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
          description:
            "خياطة احترافية بأيدي حرفيين مهرة باستخدام معدات صناعية.",
          details: [
            "آلات دنيم متخصصة",
            "آلات غرزة سلسلة متعددة الإبر",
            "أتمتة العراوي والأزرار",
            "فحص جودة مباشر",
          ],
        },
        {
          iconName: "WashingIcon",
          title: "الغسيل",
          image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
          description: "تقنيات غسيل متخصصة للحصول على التشطيبات المطلوبة.",
          details: [
            "غسيل حجري وإنزيمي",
            "تبييض وصبغ",
            "معالجات تنعيم",
            "خيارات صديقة للبيئة",
          ],
        },
        {
          iconName: "EmbroideryIcon",
          title: "التطريز والطباعة",
          image:
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
          description: "خدمات تطريز وطباعة مخصصة للعلامات التجارية.",
          details: [
            "آلات تطريز متعددة الرؤوس",
            "طباعة الشاشة الحريرية",
            "طباعة النقل الحراري",
            "النقش بالليزر",
          ],
        },
        {
          iconName: "PackagingIcon",
          title: "التغليف ومراقبة الجودة",
          image:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
          description: "مراقبة جودة شاملة وتغليف احترافي للتسليم.",
          details: [
            "فحص نهائي 100%",
            "مسح كشف المعادن",
            "كي وطي احترافي",
            "وثائق التصدير",
          ],
        },
      ]
    : [
        {
          iconName: "FabricInspectionIcon",
          title: "Fabric Inspection",
          image:
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
          description:
            "Rigorous quality checks on all incoming materials to ensure premium standards.",
          details: [
            "4-point inspection system",
            "Color consistency verification",
            "Shrinkage testing",
            "Weight and composition analysis",
          ],
        },
        {
          iconName: "CuttingIcon",
          title: "Cutting",
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
          description:
            "Precision cutting with advanced machinery for accurate patterns and minimal waste.",
          details: [
            "CAD/CAM pattern making",
            "Automatic spreading machines",
            "Computerized cutting systems",
            "Optimal fabric utilization",
          ],
        },
        {
          iconName: "SewingIcon",
          title: "Sewing",
          image:
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
          description:
            "Expert stitching by skilled craftsmen using industrial-grade equipment.",
          details: [
            "Specialized denim machinery",
            "Multi-needle chain stitch machines",
            "Bartack and buttonhole automation",
            "Inline quality inspection",
          ],
        },
        {
          iconName: "WashingIcon",
          title: "Washing",
          image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
          description:
            "Specialized washing techniques for desired finishes and fabric treatment.",
          details: [
            "Stone wash and enzyme wash",
            "Bleaching and tinting",
            "Softening treatments",
            "Eco-friendly wash options",
          ],
        },
        {
          iconName: "EmbroideryIcon",
          title: "Embroidery & Printing",
          image:
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
          description:
            "Custom embroidery and printing services for branding and design elements.",
          details: [
            "Multi-head embroidery machines",
            "Screen printing",
            "Heat transfer printing",
            "Laser engraving",
          ],
        },
        {
          iconName: "PackagingIcon",
          title: "Packaging & Final QC",
          image:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
          description:
            "Comprehensive quality control and professional packaging for delivery.",
          details: [
            "100% final inspection",
            "Metal detection scanning",
            "Professional pressing and folding",
            "Export documentation",
          ],
        },
      ];

  return (
    <main className="min-h-screen bg-alabaster-grey overflow-x-hidden">
      <Navbar locale={locale} dict={dict} />

      {/* Page Hero */}
      <PageHero
        title={isRTL ? "عملية إنتاج" : "production process"}
        subtitleTemplate={
          isRTL ? "(word)" : "(word)"
        }
        subtitleRotatingWords={
          isRTL
            ? ["مستدامة", "دقيقة", "موثوقة", "متكاملة"]
            : ["sustainable", "precision", "reliable", "complete"]
        }
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
        isRTL={isRTL}
        breadcrumbs={[
          { label: isRTL ? "الرئيسية" : "Home", href: `/${locale}` },
          { label: isRTL ? "الإنتاج" : "Production" },
        ]}
      />

      {/* Production Cycle */}
      <section className="py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-6">
            <TypewriterTitle
              text={isRTL ? "دورة الإنتاج" : "Production Cycle"}
              isVisible={true}
              className={`text-3xl md:text-4xl font-bold text-true-cobalt ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            />
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <AnimatedServiceStep
                key={service.title}
                index={index}
                title={service.title}
                description={service.description}
                details={service.details}
                image={service.image}
                iconName={service.iconName}
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <WhySetsUsApart isRTL={isRTL} />

      {/* AI Guide Section */}
      <AIGuideSection locale={locale} />

      {/* FAQ Section */}
      <FAQSection locale={locale} dict={dict} />

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
