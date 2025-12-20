import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { isValidLocale, siteUrl, getDirection } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Chatbot } from "../components/layout/Chatbot";
import {
  ReliabilityIcon,
  QualityIcon,
  ProfessionalismIcon,
  InnovationIcon,
  TransparencyIcon,
  FlexibilityIcon,
} from "../../components/Icons";
import { PageHero } from "../components/PageHero";
import { Timeline } from "../components/Timeline";
import { LocationsMapSection } from "../sections/LocationsMapSection";
import { TeamCarousel } from "../components/TeamCarousel";
import { FAQSection } from "../sections/FAQSection";
import { PartnersSection } from "../sections/PartnersSection";
import { ScrollReveal } from "../components/ScrollReveal";

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
        { year: "2008", title: "تأسيس الشركة", description: "تأسست إيدج في المنطقة الحرة ببورسعيد" },
        { year: "2012", title: "التوسع الدولي", description: "بدأنا خدمة العلامات التجارية الأوروبية" },
        { year: "2016", title: "تطوير المنشأة", description: "توسيع القدرة الإنتاجية بنسبة 200%" },
        { year: "2020", title: "التركيز على الاستدامة", description: "تطبيق الممارسات الصديقة للبيئة" },
        { year: "2024", title: "التحول الرقمي", description: "اعتماد تقنيات الصناعة 4.0" },
      ]
    : [
        { year: "2008", title: "Company Founded", description: "EDGE established in Port Said Free Zone" },
        { year: "2012", title: "International Expansion", description: "Started serving European brands" },
        { year: "2016", title: "Facility Upgrade", description: "Expanded production capacity by 200%" },
        { year: "2020", title: "Sustainability Focus", description: "Implemented eco-friendly practices" },
        { year: "2024", title: "Digital Transformation", description: "Adopted Industry 4.0 technologies" },
      ];

  const values = isRTL
    ? [
        { icon: ReliabilityIcon, title: "الموثوقية", description: "تسليم ثابت وشراكات يمكن الاعتماد عليها" },
        { icon: QualityIcon, title: "الجودة", description: "اهتمام دقيق بالتفاصيل في كل غرزة" },
        { icon: ProfessionalismIcon, title: "الاحترافية", description: "معايير رائدة في الصناعة وخبرة عالية" },
        { icon: InnovationIcon, title: "الابتكار", description: "تبني التقنيات والأساليب الجديدة" },
        { icon: TransparencyIcon, title: "الشفافية", description: "تواصل مفتوح وعمليات واضحة" },
        { icon: FlexibilityIcon, title: "المرونة", description: "حلول قابلة للتكيف مع المتطلبات الفريدة" },
      ]
    : [
        { icon: ReliabilityIcon, title: "Reliability", description: "Consistent delivery and dependable partnerships" },
        { icon: QualityIcon, title: "Quality", description: "Meticulous attention to detail in every stitch" },
        { icon: ProfessionalismIcon, title: "Professionalism", description: "Industry-leading standards and expertise" },
        { icon: InnovationIcon, title: "Innovation", description: "Embracing new technologies and methods" },
        { icon: TransparencyIcon, title: "Transparency", description: "Open communication and clear processes" },
        { icon: FlexibilityIcon, title: "Flexibility", description: "Adaptable solutions for unique requirements" },
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
    <main className="min-h-screen bg-white">
      <Navbar locale={locale} dict={dict} />

      {/* Page Hero with Stats */}
      <PageHero
        title={isRTL ? "عن إيدج" : "About EDGE"}
        subtitle={
          isRTL
            ? "شركة مصرية رائدة في تصنيع الدنيم الفاخر والملابس الجاهزة للعلامات التجارية العالمية منذ عام 2008."
            : "A leading Egyptian manufacturer delivering premium denim and woven garments to brands worldwide since 2008."
        }
        image="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
        isRTL={isRTL}
        breadcrumbs={[
          { label: isRTL ? "الرئيسية" : "Home", href: `/${locale}` },
          { label: isRTL ? "عن إيدج" : "About" },
        ]}
        stats={stats}
      />

      {/* Timeline */}
      <Timeline
        milestones={milestones}
        isRTL={isRTL}
        title={isRTL ? "رحلتنا" : "Our Journey"}
      />

      {/* About Company Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction={isRTL ? "right" : "left"} delay={0}>
              <div className={`${isRTL ? "text-right lg:order-2" : "lg:order-1"}`}>
                <p className={`text-[#1A4AFF] font-semibold mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "عن شركتنا" : "ABOUT OUR COMPANY"}
                </p>
                <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "إيدج للملابس" : "EDGE for Garments"}
                </h2>
                <p className={`text-[#122D8B]/70 mb-6 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL
                    ? "نحن مصنع موجه 100% للسوق المحلي/التصدير للملابس الجاهزة المنسوجة. ننتج علامتنا التجارية الخاصة، EDGE، لمنتجات الجينز للرجال والأطفال والنساء بما في ذلك الجينز والجاكيتات والشورتات ومنتجات الجينز المتنوعة الأخرى."
                    : "We are 100% local/exporter market oriented manufacturer for readymade woven garments. We produce our own brand, EDGE, of Men's, Kids, and Women's Jean products including jeans, jackets, shorts, and various other jeans products."}
                </p>
                <p className={`text-[#122D8B]/70 mb-6 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL
                    ? "نقدم أيضاً خدمة التصدير دولياً، وتصنيع الجينز حسب الطلب بناءً على طلبات العملاء الصناعية. نحن موجودون في مجمع الصناعات الصغيرة جنوب بورسعيد، بورسعيد، مصر."
                    : "We also offer the service of exporting internationally, and custom making jeans based on clients industrial requests. We are located at Port Said South Small Industries Complex, Port Said, Egypt."}
                </p>
                <p className={`text-[#122D8B]/70 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL
                    ? "تتكون عملية التصنيع لدينا من القص والتطريز والطباعة والخياطة والغسيل والتشطيب باستخدام أحدث الآلات والتقنيات العالية لتحقيق ذلك."
                    : "Our manufacturing process consists of cutting, embroidery, printing, sewing, washing and finishing while using the most modern and high tech machinery to accomplish this."}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction={isRTL ? "left" : "right"} delay={200}>
              <div className={`relative h-[400px] lg:h-[500px] ${isRTL ? "lg:order-1" : "lg:order-2"}`}>
                <Image
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                  alt="EDGE Factory"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Layout with Team Images on Sides */}
      <section className="py-12 lg:py-16 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {/* Left Image - Team Member */}
            <ScrollReveal direction="left" delay={0} className="h-full">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="https://edgeforgarments.com/wp-content/uploads/2020/09/shleel.jpg"
                  alt={isRTL ? "السيد شليل" : "Elsayed Sheleil"}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122D8B]/80 via-transparent to-transparent" />
                <div className={`absolute bottom-6 ${isRTL ? "right-6" : "left-6"}`}>
                  <p className={`text-white font-bold text-lg ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "السيد شليل" : "Elsayed Sheleil"}
                  </p>
                  <p className={`text-white/70 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "رئيس مجلس الإدارة" : "Chairman"}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Center Content with Mission & Vision */}
            <ScrollReveal direction="up" delay={200} className="h-full">
              <div className="flex flex-col gap-4 h-full">
                {/* Mission Card */}
                <div className="bg-[#1A4AFF] rounded-3xl p-8 text-white flex-1 flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}>
                    {isRTL ? "مهمتنا" : "Our Mission"}
                  </h3>
                  <p className={`text-white/90 text-sm leading-relaxed ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}>
                    {isRTL
                      ? "إنتاج ملابس دنيم عالية الجودة تجمع بين الراحة والمتانة والأناقة، مع الحفاظ على الممارسات الأخلاقية وتجاوز توقعات العملاء."
                      : "To produce high-quality denim and apparel that combine comfort, durability, and style, while maintaining ethical practices and exceeding customer expectations."}
                  </p>
                </div>

                {/* Vision Card */}
                <div className="bg-[#1E1E2D] rounded-3xl p-8 text-white flex-1 flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}>
                    {isRTL ? "رؤيتنا" : "Our Vision"}
                  </h3>
                  <p className={`text-white/80 text-sm leading-relaxed ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}>
                    {isRTL
                      ? "أن نكون شركة تصنيع رائدة معروفة بالجودة والابتكار والاستدامة."
                      : "To be a leading manufacturer recognized for quality, innovation, and sustainability."}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Image - Team Member */}
            <ScrollReveal direction="right" delay={400} className="h-full">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="https://edgeforgarments.com/wp-content/uploads/2020/09/shehab.jpg"
                  alt={isRTL ? "محمد شهاب" : "Mohamed Shehab"}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122D8B]/80 via-transparent to-transparent" />
                <div className={`absolute bottom-6 ${isRTL ? "right-6" : "left-6"}`}>
                  <p className={`text-white font-bold text-lg ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "محمد شهاب" : "Mohamed Shehab"}
                  </p>
                  <p className={`text-white/70 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "المدير التنفيذي" : "Executive Director"}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Section - Interactive Carousel */}
      <TeamCarousel
        members={teamMembers}
        isRTL={isRTL}
        title={isRTL ? "أعضاء الفريق" : "Team Members"}
        subtitle={isRTL ? "فريقنا الخبير" : "OUR EXPERT TEAM"}
      />

      {/* Values */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: "#F8F9FB" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "قيمنا" : "Our Values"}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} direction="up" delay={index * 100}>
                <div
                  className={`p-8 bg-white border border-[#D8DDE9] hover:border-[#1A4AFF]/30 transition-colors group rounded-xl hover:shadow-lg ${
                    isRTL ? "text-right" : ""
                  }`}
                >
                  <value.icon
                    className={`w-12 h-12 text-[#122D8B] group-hover:text-[#1A4AFF] transition-colors mb-6 ${
                      isRTL ? "mr-0 ml-auto" : ""
                    }`}
                  />
                  <h3 className={`text-lg text-[#122D8B] mb-3 font-bold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {value.title}
                  </h3>
                  <p className={`text-[#122D8B]/60 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Code of Conduct Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "سياسة قواعد السلوك" : "Code of Conduct Policy"}
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollReveal direction="left" delay={100}>
              <div className={`p-8 border border-[#D8DDE9] rounded-xl hover:shadow-lg transition-shadow ${isRTL ? "text-right" : ""}`}>
                <h3 className={`text-xl font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "حماية ممتلكات الشركة" : "Protection of Company Property"}
                </h3>
                <p className={`text-[#122D8B]/70 mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL
                    ? "يجب على جميع الموظفين التعامل مع ممتلكات شركتنا، سواء كانت مادية أو غير ملموسة، باحترام وعناية. يجب على الموظفين عدم إساءة استخدام معدات الشركة أو استخدامها بشكل تافه."
                    : "All employees should treat our company's property, whether material or intangible, with respect and care. Employees shouldn't misuse company equipment or use it frivolously."}
                </p>
                <p className={`text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL
                    ? "يجب احترام جميع أنواع الملكية الفكرية. وهذا يشمل العلامات التجارية وحقوق النشر والممتلكات الأخرى (المعلومات والتقارير وما إلى ذلك). يجب على الموظفين استخدامها فقط لإكمال واجباتهم الوظيفية."
                    : "Should respect all kinds of incorporeal property. This includes trademarks, copyright and other property (information, reports etc.) Employees should use them only to complete their job duties."}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={200}>
              <div className={`p-8 border border-[#D8DDE9] rounded-xl hover:shadow-lg transition-shadow ${isRTL ? "text-right" : ""}`}>
                <h3 className={`text-xl font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "السلامة من الحرائق" : "Fire Safety"}
                </h3>
                <p className={`text-[#122D8B]/70 mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL
                    ? "خطة إخلاء الحريق سارية المفعول. يحتوي كل طابق من المنشأة على خطة إخلاء من الحريق. صندوق مكافحة الحرائق: معدات مكافحة حرائق كافية في صندوق مكافحة حرائق موضوع في كل طابق."
                    : "Fire Evacuation Plan in effect. Each floor of the facility contains a Fire Evacuation Plan. Fire Fighting Box: Sufficient firefighting equipment in a fire fighting box placed on each floor."}
                </p>
                <p className={`text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL
                    ? "خطة الإخلاء سارية المفعول ومرئية للموظفين مع مسار الإخلاء محدد بوضوح بأسهم ذات رؤوس حمراء تحدد المسار الدقيق للإخلاء."
                    : "Evacuation plan in effect and visible to employees with evacuation route clearly marked by arrows with red arrow heads marking the exact route of evacuation."}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Locations Map Section */}
      <LocationsMapSection locale={locale} />

      {/* Partners Section */}
      <PartnersSection locale={locale} dict={dict} />

      {/* FAQ Section */}
      <FAQSection locale={locale} dict={dict} />

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
