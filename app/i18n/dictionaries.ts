import type { Locale } from "./config";

// Dictionary type definition
export interface Dictionary {
  // Navbar
  nav: {
    home: string;
    about: string;
    products: string;
    services: string;
    blog: string;
    contact: string;
    getInTouch: string;
  };
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  // About Section
  about: {
    label: string;
    title: string;
    description: string;
    experience: string;
    clients: string;
    products: string;
    learnMore: string;
  };
  // Services Section
  services: {
    label: string;
    title: string;
    subtitle: string;
  };
  // Service Items
  service: {
    cutting: { title: string; desc: string };
    sewing: { title: string; desc: string };
    washing: { title: string; desc: string };
    quality: { title: string; desc: string };
    design: { title: string; desc: string };
  };
  // Products Section
  products: {
    label: string;
    title: string;
    subtitle: string;
    viewAll: string;
  };
  // Product Items
  product: {
    jeans: { title: string; desc: string };
    jackets: { title: string; desc: string };
    shirts: { title: string; desc: string };
    pants: { title: string; desc: string };
  };
  // Portfolio/Process Section
  portfolio: {
    label: string;
    title: string;
    subtitle: string;
    trusted: string;
    brands: string;
    step1: { title: string; desc: string };
    step2: { title: string; desc: string };
    step3: { title: string; desc: string };
    step4: { title: string; desc: string };
  };
  // Partners Section
  partners: {
    title: string;
  };
  // Testimonials Section
  testimonials: {
    label: string;
    title: string;
    subtitle: string;
  };
  // FAQ Section
  faq: {
    label: string;
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
    q6: string;
    a6: string;
  };
  // Values Section
  values: {
    label: string;
    title: string;
    quality: { title: string; desc: string };
    innovation: { title: string; desc: string };
    sustainability: { title: string; desc: string };
    partnership: { title: string; desc: string };
  };
  // Footer
  footer: {
    newsletter: {
      title: string;
      subtitle: string;
      placeholder: string;
      button: string;
    };
    description: string;
    quickLinks: string;
    services: string;
    contactInfo: string;
    rights: string;
    address: string;
  };
  // Contact Page
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
    };
  };
  // Metadata
  metadata: {
    title: string;
    description: string;
  };
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      home: "HOME",
      about: "ABOUT",
      products: "PRODUCTS",
      services: "PRODUCTION",
      blog: "BLOG",
      contact: "CONTACT",
      getInTouch: "Get in touch",
    },
    hero: {
      title: "Crafting Garments with Quality",
      subtitle: "(Reliability Trust)",
      cta: "Get started today",
    },
    about: {
      label: "ABOUT US",
      title: "Crafting Excellence in Every Stitch",
      description: "EDGE for Garments is a leading manufacturer specializing in premium denim and ready-made garments. With state-of-the-art facilities and decades of expertise, we deliver exceptional quality from concept to completion.",
      experience: "Years Experience",
      clients: "Happy Clients",
      products: "Products Made",
      learnMore: "Learn More",
    },
    services: {
      label: "OUR SERVICES",
      title: "Comprehensive Manufacturing Solutions",
      subtitle: "From design to delivery, we offer end-to-end garment manufacturing services",
    },
    service: {
      cutting: {
        title: "Precision Cutting",
        desc: "Advanced CAD/CAM cutting systems ensuring accuracy and minimal waste in every production run.",
      },
      sewing: {
        title: "Expert Sewing",
        desc: "Skilled craftsmen using modern machinery to deliver perfect stitching and finishing.",
      },
      washing: {
        title: "Denim Washing",
        desc: "Specialized washing techniques including stone wash, acid wash, and enzyme treatments.",
      },
      quality: {
        title: "Quality Control",
        desc: "Rigorous multi-stage inspection process ensuring every garment meets international standards.",
      },
      design: {
        title: "Design & Development",
        desc: "Creative design team bringing your vision to life with trend-forward styles and patterns.",
      },
    },
    products: {
      label: "OUR PRODUCTS",
      title: "Premium Garment Collection",
      subtitle: "Discover our range of high-quality denim and ready-made garments",
      viewAll: "View All Products",
    },
    product: {
      jeans: {
        title: "Denim Jeans",
        desc: "Premium quality denim jeans with various washes and fits",
      },
      jackets: {
        title: "Denim Jackets",
        desc: "Stylish denim jackets for all seasons",
      },
      shirts: {
        title: "Casual Shirts",
        desc: "Comfortable and trendy casual shirts",
      },
      pants: {
        title: "Chino Pants",
        desc: "Classic chino pants for everyday wear",
      },
    },
    portfolio: {
      label: "OUR PROCESS",
      title: "Your Partner In Fashion Manufacturing",
      subtitle: "We follow a rigorous process to ensure the highest quality in every garment we produce.",
      trusted: "Trusted by",
      brands: "brands worldwide",
      step1: {
        title: "Design & Sampling",
        desc: "We work closely with you to develop patterns, select fabrics, and create samples that meet your specifications.",
      },
      step2: {
        title: "Production Planning",
        desc: "Our team plans every detail — from material sourcing to production timelines — ensuring efficiency.",
      },
      step3: {
        title: "Manufacturing",
        desc: "Using state-of-the-art equipment, our skilled workers bring your designs to life with precision.",
      },
      step4: {
        title: "Quality & Delivery",
        desc: "Every garment undergoes strict quality checks before being carefully packaged and shipped.",
      },
    },
    partners: {
      title: "Trusted By Leading Brands",
    },
    testimonials: {
      label: "TESTIMONIALS",
      title: "What Our Clients Say",
      subtitle: "Hear from brands who trust us with their manufacturing needs",
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our services",
      q1: "What is your minimum order quantity (MOQ)?",
      a1: "Our standard MOQ is 500 pieces per style/color. However, we can discuss flexible arrangements for new partnerships or sample orders.",
      q2: "What types of garments do you manufacture?",
      a2: "We specialize in denim products including jeans, jackets, and shirts. We also produce casual wear, chinos, and custom garments based on client specifications.",
      q3: "How long does production take?",
      a3: "Production time varies based on order complexity and quantity. Typically, standard orders take 4-6 weeks from approval of samples to delivery.",
      q4: "Do you provide design and sampling services?",
      a4: "Yes, our experienced design team can help develop patterns, suggest fabrics, and create samples. We work closely with clients from concept to final product.",
      q5: "What quality certifications do you have?",
      a5: "We maintain ISO 9001 quality management certification and comply with international standards including OEKO-TEX and WRAP certification.",
      q6: "Can you handle international shipping?",
      a6: "Absolutely. We have extensive experience in international logistics and can arrange FOB, CIF, or door-to-door delivery based on your requirements.",
    },
    values: {
      label: "OUR VALUES",
      title: "What Drives Us Forward",
      quality: {
        title: "Quality First",
        desc: "Every garment undergoes rigorous quality checks to ensure it meets international standards.",
      },
      innovation: {
        title: "Innovation",
        desc: "We continuously invest in new technologies and techniques to stay ahead of industry trends.",
      },
      sustainability: {
        title: "Sustainability",
        desc: "Committed to eco-friendly practices and reducing our environmental footprint.",
      },
      partnership: {
        title: "Partnership",
        desc: "We build long-term relationships with our clients, growing together as trusted partners.",
      },
    },
    footer: {
      newsletter: {
        title: "Subscribe to Our Newsletter",
        subtitle: "Stay updated with our latest news and offers",
        placeholder: "Enter your email",
        button: "Subscribe",
      },
      description: "Leading manufacturer of premium denim and ready-made garments with decades of expertise.",
      quickLinks: "Quick Links",
      services: "Services",
      contactInfo: "Contact Info",
      rights: "All rights reserved.",
      address: "Industrial Area, 10th of Ramadan City, Egypt",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      form: {
        name: "Your Name",
        email: "Email Address",
        subject: "Subject",
        message: "Your Message",
        send: "Send Message",
      },
    },
    metadata: {
      title: "EDGE for Garments | Premium Denim & Garment Manufacturing",
      description: "Egyptian manufacturer specializing in high-quality denim and woven garments. Full production cycle from inspection to packaging. Serving local and international brands.",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      products: "المنتجات",
      services: "الإنتاج",
      blog: "المدونة",
      contact: "تواصل معنا",
      getInTouch: "تواصل معنا",
    },
    hero: {
      title: "صناعة الملابس بجودة عالية",
      subtitle: "(الموثوقية والثقة)",
      cta: "ابدأ اليوم",
    },
    about: {
      label: "من نحن",
      title: "نصنع التميز في كل غرزة",
      description: "إيدج للملابس هي شركة رائدة في تصنيع الدنيم الفاخر والملابس الجاهزة. بفضل مرافقنا الحديثة وخبرتنا الممتدة لعقود، نقدم جودة استثنائية من الفكرة إلى الإنجاز.",
      experience: "سنوات الخبرة",
      clients: "عملاء سعداء",
      products: "منتج مصنّع",
      learnMore: "اعرف المزيد",
    },
    services: {
      label: "خدماتنا",
      title: "حلول تصنيع شاملة",
      subtitle: "من التصميم إلى التسليم، نقدم خدمات تصنيع ملابس متكاملة",
    },
    service: {
      cutting: {
        title: "قص دقيق",
        desc: "أنظمة قص CAD/CAM متقدمة تضمن الدقة وأقل هدر في كل عملية إنتاج.",
      },
      sewing: {
        title: "خياطة احترافية",
        desc: "حرفيون مهرة يستخدمون آلات حديثة لتقديم خياطة وتشطيب مثالي.",
      },
      washing: {
        title: "غسيل الدنيم",
        desc: "تقنيات غسيل متخصصة تشمل الغسيل الحجري والحمضي ومعالجات الإنزيم.",
      },
      quality: {
        title: "مراقبة الجودة",
        desc: "عملية فحص صارمة متعددة المراحل تضمن أن كل قطعة تلبي المعايير الدولية.",
      },
      design: {
        title: "التصميم والتطوير",
        desc: "فريق تصميم إبداعي يحول رؤيتك إلى واقع بأساليب وأنماط عصرية.",
      },
    },
    products: {
      label: "منتجاتنا",
      title: "مجموعة الملابس الفاخرة",
      subtitle: "اكتشف مجموعتنا من الدنيم والملابس الجاهزة عالية الجودة",
      viewAll: "عرض جميع المنتجات",
    },
    product: {
      jeans: {
        title: "جينز دنيم",
        desc: "جينز دنيم عالي الجودة بغسلات وقصات متنوعة",
      },
      jackets: {
        title: "جاكيتات دنيم",
        desc: "جاكيتات دنيم أنيقة لجميع المواسم",
      },
      shirts: {
        title: "قمصان كاجوال",
        desc: "قمصان كاجوال مريحة وعصرية",
      },
      pants: {
        title: "بناطيل تشينو",
        desc: "بناطيل تشينو كلاسيكية للارتداء اليومي",
      },
    },
    portfolio: {
      label: "عمليتنا",
      title: "شريكك في تصنيع الأزياء",
      subtitle: "نتبع عملية صارمة لضمان أعلى جودة في كل قطعة ملابس ننتجها.",
      trusted: "موثوق من",
      brands: "علامة تجارية حول العالم",
      step1: {
        title: "التصميم والعينات",
        desc: "نعمل معك عن كثب لتطوير الباترونات واختيار الأقمشة وإنشاء عينات تلبي مواصفاتك.",
      },
      step2: {
        title: "تخطيط الإنتاج",
        desc: "فريقنا يخطط لكل تفصيلة - من توريد المواد إلى الجداول الزمنية للإنتاج - لضمان الكفاءة.",
      },
      step3: {
        title: "التصنيع",
        desc: "باستخدام معدات حديثة، يحول عمالنا المهرة تصميماتك إلى واقع بدقة متناهية.",
      },
      step4: {
        title: "الجودة والتسليم",
        desc: "كل قطعة ملابس تخضع لفحوصات جودة صارمة قبل التغليف والشحن بعناية.",
      },
    },
    partners: {
      title: "موثوق من العلامات التجارية الرائدة",
    },
    testimonials: {
      label: "آراء العملاء",
      title: "ماذا يقول عملاؤنا",
      subtitle: "استمع للعلامات التجارية التي تثق بنا في احتياجاتها التصنيعية",
    },
    faq: {
      label: "الأسئلة الشائعة",
      title: "الأسئلة المتكررة",
      subtitle: "اعثر على إجابات للأسئلة الشائعة حول خدماتنا",
      q1: "ما هو الحد الأدنى لكمية الطلب (MOQ)؟",
      a1: "الحد الأدنى القياسي لدينا هو 500 قطعة لكل تصميم/لون. ومع ذلك، يمكننا مناقشة ترتيبات مرنة للشراكات الجديدة أو طلبات العينات.",
      q2: "ما أنواع الملابس التي تصنعونها؟",
      a2: "نتخصص في منتجات الدنيم بما في ذلك الجينز والجاكيتات والقمصان. كما ننتج الملابس الكاجوال والتشينو والملابس المخصصة حسب مواصفات العميل.",
      q3: "كم يستغرق الإنتاج؟",
      a3: "يختلف وقت الإنتاج بناءً على تعقيد الطلب والكمية. عادةً، تستغرق الطلبات القياسية 4-6 أسابيع من الموافقة على العينات حتى التسليم.",
      q4: "هل تقدمون خدمات التصميم والعينات؟",
      a4: "نعم، فريق التصميم ذو الخبرة لدينا يمكنه المساعدة في تطوير الباترونات واقتراح الأقمشة وإنشاء العينات. نعمل عن كثب مع العملاء من الفكرة إلى المنتج النهائي.",
      q5: "ما شهادات الجودة التي لديكم؟",
      a5: "نحافظ على شهادة إدارة الجودة ISO 9001 ونلتزم بالمعايير الدولية بما في ذلك شهادة OEKO-TEX و WRAP.",
      q6: "هل يمكنكم التعامل مع الشحن الدولي؟",
      a6: "بالتأكيد. لدينا خبرة واسعة في اللوجستيات الدولية ويمكننا ترتيب التسليم FOB أو CIF أو من الباب للباب بناءً على متطلباتك.",
    },
    values: {
      label: "قيمنا",
      title: "ما يدفعنا للأمام",
      quality: {
        title: "الجودة أولاً",
        desc: "كل قطعة ملابس تخضع لفحوصات جودة صارمة لضمان استيفائها للمعايير الدولية.",
      },
      innovation: {
        title: "الابتكار",
        desc: "نستثمر باستمرار في التقنيات والأساليب الجديدة للبقاء في صدارة اتجاهات الصناعة.",
      },
      sustainability: {
        title: "الاستدامة",
        desc: "ملتزمون بالممارسات الصديقة للبيئة وتقليل بصمتنا البيئية.",
      },
      partnership: {
        title: "الشراكة",
        desc: "نبني علاقات طويلة الأمد مع عملائنا، وننمو معاً كشركاء موثوقين.",
      },
    },
    footer: {
      newsletter: {
        title: "اشترك في نشرتنا الإخبارية",
        subtitle: "ابقَ على اطلاع بآخر أخبارنا وعروضنا",
        placeholder: "أدخل بريدك الإلكتروني",
        button: "اشتراك",
      },
      description: "شركة رائدة في تصنيع الدنيم الفاخر والملابس الجاهزة بخبرة عقود.",
      quickLinks: "روابط سريعة",
      services: "الخدمات",
      contactInfo: "معلومات التواصل",
      rights: "جميع الحقوق محفوظة.",
      address: "المنطقة الصناعية، مدينة العاشر من رمضان، مصر",
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "نحب أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.",
      form: {
        name: "اسمك",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "رسالتك",
        send: "إرسال الرسالة",
      },
    },
    metadata: {
      title: "إيدج للملابس | تصنيع الدنيم والملابس الفاخرة",
      description: "مصنع مصري متخصص في الدنيم والملابس المنسوجة عالية الجودة. دورة إنتاج كاملة من الفحص إلى التغليف. نخدم العلامات التجارية المحلية والدولية.",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}
