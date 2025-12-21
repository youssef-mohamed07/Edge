import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { isValidLocale, siteUrl, getDirection } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Chatbot } from "../components/layout/Chatbot";
import { PageHero } from "../components/PageHero";
import { Timeline } from "../components/Timeline";
import { LocationsMapSection } from "../sections/LocationsMapSection";
import { TeamCarousel } from "../components/TeamCarousel";
import { FAQSection } from "../sections/FAQSection";
import { AIGuideSection } from "../sections/AIGuideSection";
import { PartnersSection } from "../sections/PartnersSection";
import { ScrollReveal } from "../components/ScrollReveal";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const isRTL = locale === "ar";
  const currentUrl = `${siteUrl}/${locale}/about`;

  return {
    title: isRTL ? "عن إيدج | إيدج للملابس" : "About Us | EDGE for Garments",
    description: isRTL
      ? "شركة مصرية رائدة في تصنيع الدنيم الفاخر والملابس الجاهزة منذ 2008"
      : "A leading Egyptian manufacturer delivering premium denim and woven garments since 2008",
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/about`,
        ar: `${siteUrl}/ar/about`,
        "x-default": `${siteUrl}/en/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const milestones = isRTL
    ? [
        { year: "2017", title: "التأسيس", description: "تأسست في جنوب بورسعيد بمصنع 2,400 متر مربع ورؤية واضحة." },
        { year: "2020", title: "شهادة الجودة", description: "حصلنا على شهادة Sedex للجودة، مؤكدين الممارسات الأخلاقية والمسؤولة." },
        { year: "2022", title: "التوسع", description: "توسعنا إلى 26,000 متر مربع، ننتج 8,000 قطعة يومياً مع 216 موظف ماهر." },
        { year: "2025", title: "الريادة", description: "معترف بنا كشركة رائدة في تصنيع الملابس في مصر، موثوق بها من العلامات المحلية والدولية." },
      ]
    : [
        { year: "2017", title: "Founded", description: "Founded in South Port Said with a 2,400 m² factory and a clear vision." },
        { year: "2020", title: "Quality Certification", description: "Achieved Sedex quality certification, confirming ethical and responsible practices." },
        { year: "2022", title: "Expansion", description: "Expanded to 26,000 m², producing 8,000 garments daily with 216 skilled employees." },
        { year: "2025", title: "Industry Leader", description: "Recognized as a leading garment manufacturer in Egypt, trusted by local and international brands." },
      ];

  const values = isRTL
    ? [
        { title: "الموثوقية", description: "تسليم ثابت وشراكات يمكن الاعتماد عليها", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
        { title: "الجودة", description: "اهتمام دقيق بالتفاصيل في كل غرزة", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
        { title: "الاحترافية", description: "معايير رائدة في الصناعة وخبرة عالية", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
        { title: "الابتكار", description: "تبني التقنيات والأساليب الجديدة", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80" },
        { title: "الشفافية", description: "تواصل مفتوح وعمليات واضحة", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
        { title: "المرونة", description: "حلول قابلة للتكيف مع المتطلبات الفريدة", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
      ]
    : [
        { title: "Reliability", description: "Consistent delivery and dependable partnerships", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
        { title: "Quality", description: "Meticulous attention to detail in every stitch", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
        { title: "Professionalism", description: "Industry-leading standards and expertise", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
        { title: "Innovation", description: "Embracing new technologies and methods", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80" },
        { title: "Transparency", description: "Open communication and clear processes", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
        { title: "Flexibility", description: "Adaptable solutions for unique requirements", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
      ];

  const stats = isRTL
    ? [
        { number: "450,000", label: "جينز سنوياً" },
        { number: "150,000", label: "جاكيت سنوياً" },
        { number: "133", label: "ماكينة" },
        { number: "150", label: "عامل" },
      ]
    : [
        { number: "450,000", label: "Jeans Annually" },
        { number: "150,000", label: "Jackets Annually" },
        { number: "133", label: "Machines" },
        { number: "150", label: "Workers" },
      ];

  const teamMembers = isRTL
    ? [
        { name: "السيد شليل", role: "رئيس مجلس الإدارة / المدير العام", image: "https://edgeforgarments.com/wp-content/uploads/2020/09/shleel.jpg" },
        { name: "محمد شهاب", role: "المدير التنفيذي", image: "https://edgeforgarments.com/wp-content/uploads/2020/09/shehab.jpg" },
        { name: "محمد طه", role: "الرئيس التنفيذي", image: "https://edgeforgarments.com/wp-content/uploads/2020/09/taha1.jpg" },
        { name: "أسامة رمضان", role: "المدير العام", image: null },
      ]
    : [
        { name: "Elsayed Sheleil", role: "Chairman / Managing Director", image: "https://edgeforgarments.com/wp-content/uploads/2020/09/shleel.jpg" },
        { name: "Mohamed Shehab", role: "Executive Director", image: "https://edgeforgarments.com/wp-content/uploads/2020/09/shehab.jpg" },
        { name: "Mohamed Taha", role: "Chief Executive Officer (CEO)", image: "https://edgeforgarments.com/wp-content/uploads/2020/09/taha1.jpg" },
        { name: "Osama Ramadan", role: "General Manager", image: null },
      ];

  return (
    <main className="min-h-screen bg-alabaster-grey overflow-x-hidden">
      <Navbar locale={locale} dict={dict} />

      {/* Custom About Hero */}
      <PageHero
        title={isRTL ? "عن إيدج" : "About us"}
        subtitle={
          isRTL
            ? "منذ 2017، تقوم إيدج للملابس بتحويل الأفكار إلى دنيم عالي الجودة وملابس جاهزة، بدقة وعناية وموثوقية."
            : "Since 2017, Edge for Garments has been transforming ideas into high-quality denim and ready-made apparel, with precision, care, and reliability."
        }
        image="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
        isRTL={isRTL}
        breadcrumbs={[
          { label: isRTL ? "الرئيسية" : "Home", href: `/${locale}` },
          { label: isRTL ? "عن إيدج" : "About" },
        ]}
        stats={stats}
      />

      {/* About Company Section */}
      <section className="py-12 lg:py-16 bg-alabaster-grey">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction={isRTL ? "right" : "left"} delay={0}>
              <div className={`${isRTL ? "text-right lg:order-2" : "lg:order-1"}`}>
                <p className={`text-royal-azure font-semibold mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "عن شركتنا" : "ABOUT OUR COMPANY"}
                </p>
                <h2 className={`text-3xl md:text-4xl font-bold text-true-cobalt mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "إيدج للملابس" : "EDGE for Garments"}
                </h2>
                <p className={`text-true-cobalt/70 mb-6 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL
                    ? "نحن مصنع موجه 100% للسوق المحلي/التصدير للملابس الجاهزة المنسوجة. ننتج علامتنا التجارية الخاصة، EDGE، لمنتجات الجينز للرجال والأطفال والنساء بما في ذلك الجينز والجاكيتات والشورتات ومنتجات الجينز المتنوعة الأخرى."
                    : "We are 100% local/exporter market oriented manufacturer for readymade woven garments. We produce our own brand, EDGE, of Men's, Kids, and Women's Jean products including jeans, jackets, shorts, and various other jeans products."}
                </p>
                <p className={`text-true-cobalt/70 mb-6 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL
                    ? "نقدم أيضاً خدمة التصدير دولياً، وتصنيع الجينز حسب الطلب بناءً على طلبات العملاء الصناعية. نحن موجودون في مجمع الصناعات الصغيرة جنوب بورسعيد، بورسعيد، مصر."
                    : "We also offer the service of exporting internationally, and custom making jeans based on clients industrial requests. We are located at Port Said South Small Industries Complex, Port Said, Egypt."}
                </p>
                <p className={`text-true-cobalt/70 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL
                    ? "تتكون عملية التصنيع لدينا من القص والتطريز والطباعة والخياطة والغسيل والتشطيب باستخدام أحدث الآلات والتقنيات العالية لتحقيق ذلك."
                    : "Our manufacturing process consists of cutting, embroidery, printing, sewing, washing and finishing while using the most modern and high tech machinery to accomplish this."}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction={isRTL ? "left" : "right"} delay={200}>
              <div className={`relative h-[400px] lg:h-[500px] ${isRTL ? "lg:order-1" : "lg:order-2"}`}>
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="EDGE Factory"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section - Premium Bento Grid Design */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-alabaster-grey to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <ScrollReveal direction="up" delay={0}>
            <div className={`text-center mb-12 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              <span className="inline-block px-4 py-1.5 bg-royal-azure/10 text-royal-azure text-sm font-semibold rounded-full mb-4">
                {isRTL ? "من نحن" : "WHO WE ARE"}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-true-cobalt">
                {isRTL ? "مهمتنا ورؤيتنا" : "Our Mission & Vision"}
              </h2>
            </div>
          </ScrollReveal>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-[200px]">
            {/* Mission Card - Large */}
            <ScrollReveal direction={isRTL ? "right" : "left"} delay={100} className="lg:col-span-7 md:row-span-2">
              <div className={`relative h-full rounded-[2rem] overflow-hidden group ${isRTL ? "text-right" : ""}`}>
                {/* Background Image */}
                <Image
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80"
                  alt={isRTL ? "مهمتنا" : "Our Mission"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-royal-azure/95 via-royal-azure/85 to-true-cobalt/90" />
                
                {/* Content */}
                <div className={`relative h-full p-8 lg:p-10 flex flex-col justify-between ${isRTL ? "items-end" : ""}`}>
                  <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="h-px flex-1 bg-white/20" />
                  </div>
                  
                  <div>
                    <h3 className={`text-3xl lg:text-4xl font-bold text-white mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "مهمتنا" : "Our Mission"}
                    </h3>
                    <p className={`text-white/90 text-lg leading-relaxed max-w-xl ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL
                        ? "إنتاج ملابس دنيم عالية الجودة تجمع بين الراحة والمتانة والأناقة، مع الحفاظ على الممارسات الأخلاقية وتجاوز توقعات العملاء."
                        : "To produce high-quality denim and apparel that combine comfort, durability, and style, while maintaining ethical practices and exceeding customer expectations."}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision Card - Stacked */}
            <ScrollReveal direction={isRTL ? "left" : "right"} delay={200} className="lg:col-span-5 md:row-span-2">
              <div className={`relative h-full rounded-[2rem] overflow-hidden group ${isRTL ? "text-right" : ""}`}>
                {/* Background Image */}
                <Image
                  src="https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80"
                  alt={isRTL ? "رؤيتنا" : "Our Vision"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-true-cobalt/95 via-[#1a1a2e]/90 to-[#16213e]/95" />
                
                {/* Content */}
                <div className={`relative h-full p-8 lg:p-10 flex flex-col justify-between ${isRTL ? "items-end" : ""}`}>
                  <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  
                  <div>
                    <h3 className={`text-3xl lg:text-4xl font-bold text-white mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "رؤيتنا" : "Our Vision"}
                    </h3>
                    <p className={`text-white/80 text-lg leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL
                        ? "أن نكون شركة تصنيع رائدة معروفة بالجودة والابتكار والاستدامة."
                        : "To be a leading manufacturer recognized for quality, innovation, and sustainability."}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Production Line Card */}
            <ScrollReveal direction="up" delay={300} className="lg:col-span-4">
              <div className="relative h-full rounded-[2rem] overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                  alt={isRTL ? "خط الإنتاج" : "Production Line"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-true-cobalt/90 via-true-cobalt/40 to-transparent" />
                <div className={`absolute bottom-0 left-0 right-0 p-6 ${isRTL ? "text-right" : ""}`}>
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                    <div className="w-8 h-8 rounded-lg bg-royal-azure flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <span className={`text-white/70 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "التصنيع" : "Manufacturing"}
                    </span>
                  </div>
                  <h4 className={`text-white font-bold text-xl ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "خط الإنتاج" : "Production Line"}
                  </h4>
                </div>
              </div>
            </ScrollReveal>

            {/* Quality Control Card */}
            <ScrollReveal direction="up" delay={400} className="lg:col-span-4">
              <div className="relative h-full rounded-[2rem] overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80"
                  alt={isRTL ? "مراقبة الجودة" : "Quality Control"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-true-cobalt/90 via-true-cobalt/40 to-transparent" />
                <div className={`absolute bottom-0 left-0 right-0 p-6 ${isRTL ? "text-right" : ""}`}>
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                    <div className="w-8 h-8 rounded-lg bg-royal-azure flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className={`text-white/70 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "الجودة" : "Quality"}
                    </span>
                  </div>
                  <h4 className={`text-white font-bold text-xl ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "مراقبة الجودة" : "Quality Control"}
                  </h4>
                </div>
              </div>
            </ScrollReveal>

            {/* Innovation Card */}
            <ScrollReveal direction="up" delay={500} className="lg:col-span-4">
              <div className="relative h-full rounded-[2rem] overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
                  alt={isRTL ? "الابتكار" : "Innovation"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-true-cobalt/90 via-true-cobalt/40 to-transparent" />
                <div className={`absolute bottom-0 left-0 right-0 p-6 ${isRTL ? "text-right" : ""}`}>
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                    <div className="w-8 h-8 rounded-lg bg-royal-azure flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <span className={`text-white/70 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "التطوير" : "Development"}
                    </span>
                  </div>
                  <h4 className={`text-white font-bold text-xl ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "الابتكار والتقنية" : "Innovation & Tech"}
                  </h4>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Partners Section (Logos) */}
      <PartnersSection locale={locale} dict={dict} />

      {/* Timeline - Our Success Story */}
      <Timeline
        milestones={milestones}
        isRTL={isRTL}
        title={isRTL ? "قصة نجاحنا" : "Our Success Story"}
      />

      {/* Team Section - Interactive Carousel */}
      <TeamCarousel
        members={teamMembers}
        isRTL={isRTL}
        title={isRTL ? "تعرف على مجلس الإدارة" : "Meet Our Board of Directors"}
        subtitle={isRTL ? "فريقنا الخبير" : "OUR EXPERT TEAM"}
      />

      {/* Values */}
      <section className="py-12 lg:py-16 bg-alabaster-grey">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal direction="up" delay={0}>
            <div className="mb-8 text-center">
              <TypewriterTitle
                text={isRTL ? "قيمنا" : "Our Values"}
                isVisible={true}
                className={`text-3xl md:text-4xl font-bold text-true-cobalt ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} direction="up" delay={index * 100}>
                <div
                  className={`group relative rounded-3xl overflow-hidden aspect-square transition-all duration-700`}
                >
                  {/* Background Image */}
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-true-cobalt/80 transition-all duration-500 group-hover:bg-true-cobalt/90" />
                  
                  {/* Content */}
                  <div className={`absolute inset-0 p-8 flex flex-col justify-end ${isRTL ? "text-right" : ""}`}>
                    <h3
                      className={`text-white text-xl font-bold mb-2 transition-transform duration-500 group-hover:-translate-y-2 ${
                        isRTL ? "font-[var(--font-cairo)]" : ""
                      }`}
                    >
                      {value.title}
                    </h3>
                    <p
                      className={`text-white/80 text-sm transition-all duration-500 group-hover:text-white ${
                        isRTL ? "font-[var(--font-cairo)]" : ""
                      }`}
                    >
                      {value.description}
                    </p>
                    
                    {/* Animated line */}
                    <div
                      className={`h-0.5 bg-royal-azure mt-4 transition-all duration-500 w-12 group-hover:w-full ${
                        isRTL ? "origin-right ml-auto" : "origin-left"
                      }`}
                    />
                  </div>

                  {/* Corner accent */}
                  <div
                    className={`absolute top-4 w-8 h-8 border-t-2 border-royal-azure ${
                      isRTL ? "right-4 border-r-2" : "left-4 border-l-2"
                    }`}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Map Section */}
      <LocationsMapSection locale={locale} />

       {/* AI Guide Section */}
      <AIGuideSection locale={locale} /> 
      
      {/* FAQ Section */}
      <FAQSection locale={locale} dict={dict} />

     

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
