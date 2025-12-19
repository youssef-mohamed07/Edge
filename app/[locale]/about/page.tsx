import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { isValidLocale, siteUrl, getDirection, type Locale } from "../../i18n/config";
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

  const compliancePoints = isRTL
    ? [
        "لا نسمح بعمالة الأطفال أو العمل القسري",
        "سلامة الموظفين هي أولويتنا القصوى",
        "تدريبات الإخلاء من الحريق شهرياً",
        "الامتثال للقانون",
        "يجب على جميع الموظفين حماية شرعية شركتنا",
        "نتوقع من الموظفين أن يكونوا أخلاقيين ومسؤولين",
      ]
    : [
        "Does not allow child or forced labor",
        "Employee safety is our top priority",
        "Fire drills conducted monthly",
        "Compliance with law",
        "All employees must protect our company's legality",
        "We expect employees to be ethical and responsible",
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

  const businessInfo = isRTL
    ? {
        natureOfBusiness: "مصنع للسوق المحلي ومصدر للملابس الجاهزة المنسوجة",
        termsOfBusiness: "FOB، اعتماد مستندي عند الاطلاع، عقد، CMWP",
        markets: "السوق المحلي 100% – خطة الولايات المتحدة 100%",
      }
    : {
        natureOfBusiness: "Manufacturer for local market & Exporter of Readymade woven Garments",
        termsOfBusiness: "FOB, L/C at sight, Contract, CMWP",
        markets: "Local Market 100% – Plan USA 100%",
      };

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
      <section className="py-20 lg:py-32" style={{ backgroundColor: "#F8F9FB" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "رحلتنا" : "Our Journey"}
            </h2>
          </div>

          <div className="relative">
            <div className={`absolute top-0 bottom-0 w-0.5 bg-[#B6C6E1] ${isRTL ? "right-8 lg:right-1/2" : "left-8 lg:left-1/2"}`} />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 ${
                    isRTL
                      ? index % 2 === 0
                        ? "lg:flex-row-reverse"
                        : "lg:flex-row"
                      : index % 2 === 0
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`absolute w-4 h-4 bg-[#1A4AFF] z-10 ${
                      isRTL ? "right-8 lg:right-1/2 translate-x-1/2" : "left-8 lg:left-1/2 -translate-x-1/2"
                    }`}
                  />

                  <div
                    className={`lg:w-1/2 ${
                      isRTL
                        ? `pr-20 lg:pr-0 ${index % 2 === 0 ? "lg:pl-16 lg:text-left" : "lg:pr-16 lg:text-right"}`
                        : `pl-20 lg:pl-0 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`
                    }`}
                  >
                    <div className="text-[#1A4AFF] font-bold text-2xl mb-2">{milestone.year}</div>
                    <h3 className={`text-[#122D8B] font-bold text-lg mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
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

      {/* About Company Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? "lg:flex-row-reverse" : ""}`}>
            <div className={isRTL ? "text-right" : ""}>
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
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                alt="EDGE Factory"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: "#F8F9FB" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "الامتثال والأخلاقيات" : "Compliance & Ethics"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compliancePoints.map((point, index) => (
              <div
                key={index}
                className={`p-6 bg-white border border-[#D8DDE9] flex items-start gap-4 ${isRTL ? "text-right" : ""}`}
              >
                <div className="w-8 h-8 bg-[#1A4AFF] text-white flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <p className={`text-[#122D8B]/80 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Info Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-8 border border-[#D8DDE9] ${isRTL ? "text-right" : ""}`}>
              <h3 className={`text-lg font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "طبيعة العمل" : "Nature of Business"}
              </h3>
              <p className={`text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{businessInfo.natureOfBusiness}</p>
            </div>
            <div className={`p-8 border border-[#D8DDE9] ${isRTL ? "text-right" : ""}`}>
              <h3 className={`text-lg font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "شروط العمل" : "Terms of Business"}
              </h3>
              <p className={`text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{businessInfo.termsOfBusiness}</p>
            </div>
            <div className={`p-8 border border-[#D8DDE9] ${isRTL ? "text-right" : ""}`}>
              <h3 className={`text-lg font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "الأسواق" : "Markets"}
              </h3>
              <p className={`text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{businessInfo.markets}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Vision Section */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: "#122D8B" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className={isRTL ? "text-right" : ""}>
              <p className="text-[#1A4AFF] font-semibold mb-2">{isRTL ? "نحن خبراء" : "WE ARE EXPERT"}</p>
              <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "فلسفتنا" : "Our Philosophy"}
              </h2>
              <p className={`text-white/80 mb-6 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL
                  ? "نتبنى موقفاً ديناميكياً يسمح لنا بأن نكون في طليعة الموضة وعلى دراية بالتغيرات السريعة في اتجاهات الموضة في السوق. هذا يسمح لنا بالقدرة على توقع متطلبات السوق والتكيف وفقاً لذلك."
                  : "We employ a dynamic attitude that allows us to be fashion forward and aware of the rapid changes in fashion trends in the market. This allows us to be able to foresee the demands of the market and adapt accordingly."}
              </p>
              <p className={`text-white/80 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL
                  ? "نجري حواراً مستمراً مع تجار التجزئة، والبحث والتطوير في المواد وتقنيات المعالجة، ونتعاون مع أفضل الموردين في الصناعة."
                  : "We conduct ongoing dialogue with retailers, research and development of materials and processing techniques, and collaborate with the best suppliers in the industry."}
              </p>
            </div>
            <div className={isRTL ? "text-right" : ""}>
              <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "رؤيتنا" : "Our Vision"}
              </h2>
              <p className={`text-white/80 mb-6 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL
                  ? "في هذا السوق شديد التنافسية، تسعى شركة إيدج للملابس لتكون في عملية مستمرة من التوسع والتحسين مع دمج أحدث الابتكارات التكنولوجية لضمان أفضل المنتجات في الملابس الجاهزة لعملائنا."
                  : "In this highly competitive market, Edge Garments Co. strives to be in a continuous process of expansion and enhancement while incorporating the latest technological innovations in order to ensure our customers the best products in readymade garments."}
              </p>
              <p className={`text-white/80 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL
                  ? "طاقتنا اليومية الحالية هي 1,000 قطعة. المصنع لديه القدرة والمساحة لإنتاج 5 أضعاف معدل الإنتاج هذا، ولهذا السبب لدى إيدج هدف لتوسيع إنتاجها اليومي إلى 5,000 قطعة دون المساس بجودة المنتجات والخدمات."
                  : "Our current daily capacity is 1,000 pcs. The factory has the ability and space to produce 5x this production rate which is why Edge has a goal of expanding its daily production to 5,000 pieces without compromising quality of products and services."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className={`text-[#1A4AFF] font-semibold mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "فريقنا الخبير" : "OUR EXPERT TEAM"}
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "أعضاء الفريق" : "Team Members"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className={`text-center p-6 border border-[#D8DDE9] hover:border-[#1A4AFF]/30 transition-colors`}>
                {member.image ? (
                  <div className="w-24 h-24 mx-auto mb-4 relative overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-[#122D8B] mx-auto mb-4 flex items-center justify-center rounded-full">
                    <span className="text-white text-3xl font-bold">{member.name.charAt(0)}</span>
                  </div>
                )}
                <h3 className={`text-lg font-bold text-[#122D8B] mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {member.name}
                </h3>
                <p className={`text-[#122D8B]/60 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: "#F8F9FB" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "قيمنا" : "Our Values"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className={`p-8 bg-white border border-[#D8DDE9] hover:border-[#1A4AFF]/30 transition-colors group ${
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
            ))}
          </div>
        </div>
      </section>

      {/* Code of Conduct Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "سياسة قواعد السلوك" : "Code of Conduct Policy"}
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className={`p-8 border border-[#D8DDE9] ${isRTL ? "text-right" : ""}`}>
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
            <div className={`p-8 border border-[#D8DDE9] ${isRTL ? "text-right" : ""}`}>
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
          </div>
        </div>
      </section>

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
