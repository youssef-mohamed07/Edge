"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations = {
  en: {
    // Navbar
    "nav.home": "HOME",
    "nav.about": "ABOUT",
    "nav.products": "PRODUCTS",
    "nav.services": "OUR SERVICES",
    "nav.portfolio": "PORTFOLIO",
    "nav.contact": "CONTACT",
    "nav.getInTouch": "Get in touch",

    // Hero Section
    "hero.title": "PREMIUM DENIM & GARMENT MANUFACTURING",
    "hero.subtitle": "High-quality ready-made garments using advanced production cycles. From fabric inspection to final QC, we deliver excellence at every step.",
    "hero.cta": "Explore Products",

    // About Section
    "about.label": "ABOUT US",
    "about.title": "Crafting Excellence in Every Stitch",
    "about.description": "EDGE for Garments is a leading manufacturer specializing in premium denim and ready-made garments. With state-of-the-art facilities and decades of expertise, we deliver exceptional quality from concept to completion.",
    "about.experience": "Years Experience",
    "about.clients": "Happy Clients",
    "about.products": "Products Made",
    "about.learnMore": "Learn More",

    // Services Section
    "services.label": "OUR SERVICES",
    "services.title": "Comprehensive Manufacturing Solutions",
    "services.subtitle": "From design to delivery, we offer end-to-end garment manufacturing services",

    // Service Items
    "service.cutting.title": "Precision Cutting",
    "service.cutting.desc": "Advanced CAD/CAM cutting systems ensuring accuracy and minimal waste in every production run.",
    "service.sewing.title": "Expert Sewing",
    "service.sewing.desc": "Skilled craftsmen using modern machinery to deliver perfect stitching and finishing.",
    "service.washing.title": "Denim Washing",
    "service.washing.desc": "Specialized washing techniques including stone wash, acid wash, and enzyme treatments.",
    "service.quality.title": "Quality Control",
    "service.quality.desc": "Rigorous multi-stage inspection process ensuring every garment meets international standards.",
    "service.design.title": "Design & Development",
    "service.design.desc": "Creative design team bringing your vision to life with trend-forward styles and patterns.",

    // Products Section
    "products.label": "OUR PRODUCTS",
    "products.title": "Premium Garment Collection",
    "products.subtitle": "Discover our range of high-quality denim and ready-made garments",
    "products.viewAll": "View All Products",

    // Product Items
    "product.jeans.title": "Denim Jeans",
    "product.jeans.desc": "Premium quality denim jeans with various washes and fits",
    "product.jackets.title": "Denim Jackets",
    "product.jackets.desc": "Stylish denim jackets for all seasons",
    "product.shirts.title": "Casual Shirts",
    "product.shirts.desc": "Comfortable and trendy casual shirts",
    "product.pants.title": "Chino Pants",
    "product.pants.desc": "Classic chino pants for everyday wear",

    // Portfolio/Process Section
    "portfolio.label": "OUR PROCESS",
    "portfolio.title": "Your Partner In Fashion Manufacturing",
    "portfolio.subtitle": "We follow a rigorous process to ensure the highest quality in every garment we produce.",
    "portfolio.trusted": "Trusted by",
    "portfolio.brands": "brands worldwide",
    "portfolio.step1.title": "Design & Sampling",
    "portfolio.step1.desc": "We work closely with you to develop patterns, select fabrics, and create samples that meet your specifications.",
    "portfolio.step2.title": "Production Planning",
    "portfolio.step2.desc": "Our team plans every detail — from material sourcing to production timelines — ensuring efficiency.",
    "portfolio.step3.title": "Manufacturing",
    "portfolio.step3.desc": "Using state-of-the-art equipment, our skilled workers bring your designs to life with precision.",
    "portfolio.step4.title": "Quality & Delivery",
    "portfolio.step4.desc": "Every garment undergoes strict quality checks before being carefully packaged and shipped.",

    // Partners Section
    "partners.title": "Trusted By Leading Brands",

    // Testimonials Section
    "testimonials.label": "TESTIMONIALS",
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle": "Hear from brands who trust us with their manufacturing needs",

    // FAQ Section
    "faq.label": "FAQ",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Find answers to common questions about our services",
    "faq.q1": "What is your minimum order quantity (MOQ)?",
    "faq.a1": "Our standard MOQ is 500 pieces per style/color. However, we can discuss flexible arrangements for new partnerships or sample orders.",
    "faq.q2": "What types of garments do you manufacture?",
    "faq.a2": "We specialize in denim products including jeans, jackets, and shirts. We also produce casual wear, chinos, and custom garments based on client specifications.",
    "faq.q3": "How long does production take?",
    "faq.a3": "Production time varies based on order complexity and quantity. Typically, standard orders take 4-6 weeks from approval of samples to delivery.",
    "faq.q4": "Do you provide design and sampling services?",
    "faq.a4": "Yes, our experienced design team can help develop patterns, suggest fabrics, and create samples. We work closely with clients from concept to final product.",
    "faq.q5": "What quality certifications do you have?",
    "faq.a5": "We maintain ISO 9001 quality management certification and comply with international standards including OEKO-TEX and WRAP certification.",
    "faq.q6": "Can you handle international shipping?",
    "faq.a6": "Absolutely. We have extensive experience in international logistics and can arrange FOB, CIF, or door-to-door delivery based on your requirements.",

    // Values Section
    "values.label": "OUR VALUES",
    "values.title": "What Drives Us Forward",
    "values.quality.title": "Quality First",
    "values.quality.desc": "Every garment undergoes rigorous quality checks to ensure it meets international standards.",
    "values.innovation.title": "Innovation",
    "values.innovation.desc": "We continuously invest in new technologies and techniques to stay ahead of industry trends.",
    "values.sustainability.title": "Sustainability",
    "values.sustainability.desc": "Committed to eco-friendly practices and reducing our environmental footprint.",
    "values.partnership.title": "Partnership",
    "values.partnership.desc": "We build long-term relationships with our clients, growing together as trusted partners.",

    // Footer
    "footer.newsletter.title": "Subscribe to Our Newsletter",
    "footer.newsletter.subtitle": "Stay updated with our latest news and offers",
    "footer.newsletter.placeholder": "Enter your email",
    "footer.newsletter.button": "Subscribe",
    "footer.description": "Leading manufacturer of premium denim and ready-made garments with decades of expertise.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.contactInfo": "Contact Info",
    "footer.rights": "All rights reserved.",
    "footer.address": "Industrial Area, 10th of Ramadan City, Egypt",

    // Contact Page
    "contact.title": "Get In Touch",
    "contact.subtitle": "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    "contact.form.name": "Your Name",
    "contact.form.email": "Email Address",
    "contact.form.subject": "Subject",
    "contact.form.message": "Your Message",
    "contact.form.send": "Send Message",
  },
  ar: {
    // Navbar
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.products": "المنتجات",
    "nav.services": "خدماتنا",
    "nav.portfolio": "أعمالنا",
    "nav.contact": "تواصل معنا",
    "nav.getInTouch": "تواصل معنا",

    // Hero Section
    "hero.title": "تصنيع الدنيم والملابس الجاهزة الفاخرة",
    "hero.subtitle": "ملابس جاهزة عالية الجودة باستخدام دورات إنتاج متقدمة. من فحص الأقمشة إلى مراقبة الجودة النهائية، نقدم التميز في كل خطوة.",
    "hero.cta": "استكشف المنتجات",

    // About Section
    "about.label": "من نحن",
    "about.title": "نصنع التميز في كل غرزة",
    "about.description": "إيدج للملابس هي شركة رائدة في تصنيع الدنيم الفاخر والملابس الجاهزة. بفضل مرافقنا الحديثة وخبرتنا الممتدة لعقود، نقدم جودة استثنائية من الفكرة إلى الإنجاز.",
    "about.experience": "سنوات الخبرة",
    "about.clients": "عملاء سعداء",
    "about.products": "منتج مصنّع",
    "about.learnMore": "اعرف المزيد",

    // Services Section
    "services.label": "خدماتنا",
    "services.title": "حلول تصنيع شاملة",
    "services.subtitle": "من التصميم إلى التسليم، نقدم خدمات تصنيع ملابس متكاملة",

    // Service Items
    "service.cutting.title": "قص دقيق",
    "service.cutting.desc": "أنظمة قص CAD/CAM متقدمة تضمن الدقة وأقل هدر في كل عملية إنتاج.",
    "service.sewing.title": "خياطة احترافية",
    "service.sewing.desc": "حرفيون مهرة يستخدمون آلات حديثة لتقديم خياطة وتشطيب مثالي.",
    "service.washing.title": "غسيل الدنيم",
    "service.washing.desc": "تقنيات غسيل متخصصة تشمل الغسيل الحجري والحمضي ومعالجات الإنزيم.",
    "service.quality.title": "مراقبة الجودة",
    "service.quality.desc": "عملية فحص صارمة متعددة المراحل تضمن أن كل قطعة تلبي المعايير الدولية.",
    "service.design.title": "التصميم والتطوير",
    "service.design.desc": "فريق تصميم إبداعي يحول رؤيتك إلى واقع بأساليب وأنماط عصرية.",

    // Products Section
    "products.label": "منتجاتنا",
    "products.title": "مجموعة الملابس الفاخرة",
    "products.subtitle": "اكتشف مجموعتنا من الدنيم والملابس الجاهزة عالية الجودة",
    "products.viewAll": "عرض جميع المنتجات",

    // Product Items
    "product.jeans.title": "جينز دنيم",
    "product.jeans.desc": "جينز دنيم عالي الجودة بغسلات وقصات متنوعة",
    "product.jackets.title": "جاكيتات دنيم",
    "product.jackets.desc": "جاكيتات دنيم أنيقة لجميع المواسم",
    "product.shirts.title": "قمصان كاجوال",
    "product.shirts.desc": "قمصان كاجوال مريحة وعصرية",
    "product.pants.title": "بناطيل تشينو",
    "product.pants.desc": "بناطيل تشينو كلاسيكية للارتداء اليومي",

    // Portfolio/Process Section
    "portfolio.label": "عمليتنا",
    "portfolio.title": "شريكك في تصنيع الأزياء",
    "portfolio.subtitle": "نتبع عملية صارمة لضمان أعلى جودة في كل قطعة ملابس ننتجها.",
    "portfolio.trusted": "موثوق من",
    "portfolio.brands": "علامة تجارية حول العالم",
    "portfolio.step1.title": "التصميم والعينات",
    "portfolio.step1.desc": "نعمل معك عن كثب لتطوير الباترونات واختيار الأقمشة وإنشاء عينات تلبي مواصفاتك.",
    "portfolio.step2.title": "تخطيط الإنتاج",
    "portfolio.step2.desc": "فريقنا يخطط لكل تفصيلة - من توريد المواد إلى الجداول الزمنية للإنتاج - لضمان الكفاءة.",
    "portfolio.step3.title": "التصنيع",
    "portfolio.step3.desc": "باستخدام معدات حديثة، يحول عمالنا المهرة تصميماتك إلى واقع بدقة متناهية.",
    "portfolio.step4.title": "الجودة والتسليم",
    "portfolio.step4.desc": "كل قطعة ملابس تخضع لفحوصات جودة صارمة قبل التغليف والشحن بعناية.",

    // Partners Section
    "partners.title": "موثوق من العلامات التجارية الرائدة",

    // Testimonials Section
    "testimonials.label": "آراء العملاء",
    "testimonials.title": "ماذا يقول عملاؤنا",
    "testimonials.subtitle": "استمع للعلامات التجارية التي تثق بنا في احتياجاتها التصنيعية",

    // FAQ Section
    "faq.label": "الأسئلة الشائعة",
    "faq.title": "الأسئلة المتكررة",
    "faq.subtitle": "اعثر على إجابات للأسئلة الشائعة حول خدماتنا",
    "faq.q1": "ما هو الحد الأدنى لكمية الطلب (MOQ)؟",
    "faq.a1": "الحد الأدنى القياسي لدينا هو 500 قطعة لكل تصميم/لون. ومع ذلك، يمكننا مناقشة ترتيبات مرنة للشراكات الجديدة أو طلبات العينات.",
    "faq.q2": "ما أنواع الملابس التي تصنعونها؟",
    "faq.a2": "نتخصص في منتجات الدنيم بما في ذلك الجينز والجاكيتات والقمصان. كما ننتج الملابس الكاجوال والتشينو والملابس المخصصة حسب مواصفات العميل.",
    "faq.q3": "كم يستغرق الإنتاج؟",
    "faq.a3": "يختلف وقت الإنتاج بناءً على تعقيد الطلب والكمية. عادةً، تستغرق الطلبات القياسية 4-6 أسابيع من الموافقة على العينات حتى التسليم.",
    "faq.q4": "هل تقدمون خدمات التصميم والعينات؟",
    "faq.a4": "نعم، فريق التصميم ذو الخبرة لدينا يمكنه المساعدة في تطوير الباترونات واقتراح الأقمشة وإنشاء العينات. نعمل عن كثب مع العملاء من الفكرة إلى المنتج النهائي.",
    "faq.q5": "ما شهادات الجودة التي لديكم؟",
    "faq.a5": "نحافظ على شهادة إدارة الجودة ISO 9001 ونلتزم بالمعايير الدولية بما في ذلك شهادة OEKO-TEX و WRAP.",
    "faq.q6": "هل يمكنكم التعامل مع الشحن الدولي؟",
    "faq.a6": "بالتأكيد. لدينا خبرة واسعة في اللوجستيات الدولية ويمكننا ترتيب التسليم FOB أو CIF أو من الباب للباب بناءً على متطلباتك.",

    // Values Section
    "values.label": "قيمنا",
    "values.title": "ما يدفعنا للأمام",
    "values.quality.title": "الجودة أولاً",
    "values.quality.desc": "كل قطعة ملابس تخضع لفحوصات جودة صارمة لضمان استيفائها للمعايير الدولية.",
    "values.innovation.title": "الابتكار",
    "values.innovation.desc": "نستثمر باستمرار في التقنيات والأساليب الجديدة للبقاء في صدارة اتجاهات الصناعة.",
    "values.sustainability.title": "الاستدامة",
    "values.sustainability.desc": "ملتزمون بالممارسات الصديقة للبيئة وتقليل بصمتنا البيئية.",
    "values.partnership.title": "الشراكة",
    "values.partnership.desc": "نبني علاقات طويلة الأمد مع عملائنا، وننمو معاً كشركاء موثوقين.",

    // Footer
    "footer.newsletter.title": "اشترك في نشرتنا الإخبارية",
    "footer.newsletter.subtitle": "ابقَ على اطلاع بآخر أخبارنا وعروضنا",
    "footer.newsletter.placeholder": "أدخل بريدك الإلكتروني",
    "footer.newsletter.button": "اشتراك",
    "footer.description": "شركة رائدة في تصنيع الدنيم الفاخر والملابس الجاهزة بخبرة عقود.",
    "footer.quickLinks": "روابط سريعة",
    "footer.services": "الخدمات",
    "footer.contactInfo": "معلومات التواصل",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.address": "المنطقة الصناعية، مدينة العاشر من رمضان، مصر",

    // Contact Page
    "contact.title": "تواصل معنا",
    "contact.subtitle": "نحب أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.",
    "contact.form.name": "اسمك",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.subject": "الموضوع",
    "contact.form.message": "رسالتك",
    "contact.form.send": "إرسال الرسالة",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with "en" to match server-side rendering
  const [language, setLanguageState] = useState<Language>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved language from localStorage after hydration
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "ar")) {
      setLanguageState(savedLang);
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = savedLang;
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      // Update document direction and lang
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
      localStorage.setItem("language", language);
    }
  }, [language, isHydrated]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div style={{ visibility: isHydrated ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
