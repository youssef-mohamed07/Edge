"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LocationIcon, PhoneIcon, EmailIcon, WhatsAppIcon } from "../../components/Icons";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";
import { PageHero } from "../components/PageHero";

// Animated Counter Component
function AnimatedCounter({ end, suffix, isVisible, duration = 2000 }: { end: number; suffix: string; isVisible: boolean; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const frameRef = useRef<number | undefined>(undefined);

  const animate = useCallback(() => {
    const startTime = performance.now();
    
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };
    
    frameRef.current = requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    if (isVisible) {
      animate();
    }
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isVisible, animate]);

  return (
    <>
      {count}<span className="text-[#1A4AFF]">{suffix}</span>
    </>
  );
}

interface ContactPageContentProps {
  locale: Locale;
  dict: Dictionary;
}

export function ContactPageContent({ locale, dict }: ContactPageContentProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  // Animation states
  const [cardsVisible, setCardsVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const createObserver = (setter: (v: boolean) => void) =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setter(true);
      }, observerOptions);

    const cardsObserver = createObserver(setCardsVisible);
    const formObserver = createObserver(setFormVisible);
    const statsObserver = createObserver(setStatsVisible);

    if (cardsRef.current) cardsObserver.observe(cardsRef.current);
    if (formRef.current) formObserver.observe(formRef.current);
    if (statsRef.current) statsObserver.observe(statsRef.current);

    return () => {
      cardsObserver.disconnect();
      formObserver.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const contactInfo = isRTL
    ? [
        { icon: LocationIcon, title: "العنوان", details: ["المنطقة الصناعية، جنوب بورسعيد", "مجمع 58 مصنع، مصنع رقم 65 و 66"], color: "from-blue-500 to-blue-600" },
        { icon: PhoneIcon, title: "الهاتف", details: ["+201222493500"], links: ["tel:+201222493500"], color: "from-emerald-500 to-emerald-600" },
        { icon: EmailIcon, title: "البريد الإلكتروني", details: ["info@edgeforgarments.com"], links: ["mailto:info@edgeforgarments.com"], color: "from-purple-500 to-purple-600" },
        { icon: WhatsAppIcon, title: "واتساب", details: ["+201222493500"], links: ["https://wa.me/201222493500"], color: "from-green-500 to-green-600" },
      ]
    : [
        { icon: LocationIcon, title: "Address", details: ["Industrial zone, South of Port Said", "58 Factories Complex, factory No.65 & No.66"], color: "from-blue-500 to-blue-600" },
        { icon: PhoneIcon, title: "Phone", details: ["+201222493500"], links: ["tel:+201222493500"], color: "from-emerald-500 to-emerald-600" },
        { icon: EmailIcon, title: "Email", details: ["info@edgeforgarments.com"], links: ["mailto:info@edgeforgarments.com"], color: "from-purple-500 to-purple-600" },
        { icon: WhatsAppIcon, title: "WhatsApp", details: ["+201222493500"], links: ["https://wa.me/201222493500"], color: "from-green-500 to-green-600" },
      ];

  const stats = isRTL
    ? [
        { value: 24, label: "ساعة للرد", suffix: "h" },
        { value: 15, label: "سنة خبرة", suffix: "+" },
        { value: 50, label: "علامة تجارية", suffix: "+" },
        { value: 100, label: "رضا العملاء", suffix: "%" },
      ]
    : [
        { value: 24, label: "Hour Response", suffix: "h" },
        { value: 15, label: "Years Experience", suffix: "+" },
        { value: 50, label: "Brand Partners", suffix: "+" },
        { value: 100, label: "Client Satisfaction", suffix: "%" },
      ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        isRTL={isRTL}
        breadcrumbs={[
          { label: isRTL ? "الرئيسية" : "Home", href: `/${locale}` },
          { label: isRTL ? "تواصل معنا" : "Contact" },
        ]}
      />

      {/* Contact Info Cards */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className={`group relative bg-white p-8 border border-[#D8DDE9] rounded-xl shadow-sm hover:shadow-xl hover:border-[#1A4AFF]/30 transition-all duration-500 overflow-hidden ${
                  isRTL ? "text-right" : "text-center"
                } ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient accent on hover */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${info.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} text-white mb-5 group-hover:scale-110 transition-transform duration-300 ${isRTL ? "" : "mx-auto"}`}>
                  <info.icon className="w-6 h-6" />
                </div>
                
                <h3 className={`text-[#122D8B] font-bold uppercase tracking-wide mb-4 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {info.title}
                </h3>
                
                {info.details.map((detail, i) => (
                  <p key={`${info.title}-${i}`} className={`text-[#122D8B]/60 text-sm leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {info.links ? (
                      <a href={info.links[i]} className="hover:text-[#1A4AFF] transition-colors duration-300 inline-flex items-center gap-1">
                        {detail}
                        <svg className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-[#122D8B] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${index * 150}ms`, transition: "all 0.6s ease-out" }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} isVisible={statsVisible} duration={2000} />
                </div>
                <div className={`text-white/70 text-sm uppercase tracking-wider ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={formRef} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 ${isRTL ? "direction-rtl" : ""}`}>
            {/* Form */}
            <div className={`${isRTL ? "lg:order-2 text-right" : ""} ${formVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`} style={{ transition: "all 0.8s ease-out" }}>
              <div className="mb-8">
                <span className={`text-[#1A4AFF] text-sm font-semibold uppercase tracking-wider block mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "راسلنا" : "Get in Touch"}
                </span>
                <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "أرسل لنا رسالة" : "Send Us a Message"}
                </h2>
                <p className={`text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL
                    ? "املأ النموذج أدناه وسيتواصل معك فريقنا خلال 24 ساعة."
                    : "Fill out the form below and our team will get back to you within 24 hours."}
                </p>
              </div>

              {submitStatus === "success" && (
                <div className={`mb-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className={`text-emerald-800 font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً." : "Your message was sent successfully! We'll be in touch soon."}
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className={`mb-6 p-5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className={`text-red-800 font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "An error occurred. Please try again."}
                  </p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {dict.contact.form.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3.5 border-2 border-[#D8DDE9] rounded-lg focus:border-[#1A4AFF] focus:ring-4 focus:ring-[#1A4AFF]/10 focus:outline-none transition-all duration-300 ${
                        isRTL ? "text-right font-[var(--font-cairo)]" : ""
                      }`}
                      placeholder={isRTL ? "أدخل اسمك" : "Enter your name"}
                    />
                  </div>
                  <div className="group">
                    <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "اسم الشركة" : "Company Name"}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3.5 border-2 border-[#D8DDE9] rounded-lg focus:border-[#1A4AFF] focus:ring-4 focus:ring-[#1A4AFF]/10 focus:outline-none transition-all duration-300 ${
                        isRTL ? "text-right font-[var(--font-cairo)]" : ""
                      }`}
                      placeholder={isRTL ? "اسم شركتك (اختياري)" : "Your company (optional)"}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {dict.contact.form.email} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3.5 border-2 border-[#D8DDE9] rounded-lg focus:border-[#1A4AFF] focus:ring-4 focus:ring-[#1A4AFF]/10 focus:outline-none transition-all duration-300 ${
                        isRTL ? "text-right" : ""
                      }`}
                      placeholder={isRTL ? "example@company.com" : "example@company.com"}
                    />
                  </div>
                  <div>
                    <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "رقم الهاتف" : "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3.5 border-2 border-[#D8DDE9] rounded-lg focus:border-[#1A4AFF] focus:ring-4 focus:ring-[#1A4AFF]/10 focus:outline-none transition-all duration-300 ${
                        isRTL ? "text-right" : ""
                      }`}
                      placeholder={isRTL ? "+20 xxx xxx xxxx" : "+20 xxx xxx xxxx"}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {dict.contact.form.subject} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3.5 border-2 border-[#D8DDE9] rounded-lg focus:border-[#1A4AFF] focus:ring-4 focus:ring-[#1A4AFF]/10 focus:outline-none transition-all duration-300 bg-white cursor-pointer ${
                      isRTL ? "text-right font-[var(--font-cairo)]" : ""
                    }`}
                  >
                    <option value="">{isRTL ? "اختر موضوعاً" : "Select a subject"}</option>
                    <option value="Request a Quote">{isRTL ? "طلب عرض سعر" : "Request a Quote"}</option>
                    <option value="Sample Request">{isRTL ? "طلب عينة" : "Sample Request"}</option>
                    <option value="Partnership Inquiry">{isRTL ? "استفسار شراكة" : "Partnership Inquiry"}</option>
                    <option value="General Inquiry">{isRTL ? "استفسار عام" : "General Inquiry"}</option>
                    <option value="Other">{isRTL ? "أخرى" : "Other"}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {dict.contact.form.message} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3.5 border-2 border-[#D8DDE9] rounded-lg focus:border-[#1A4AFF] focus:ring-4 focus:ring-[#1A4AFF]/10 focus:outline-none transition-all duration-300 resize-none ${
                      isRTL ? "text-right font-[var(--font-cairo)]" : ""
                    }`}
                    placeholder={isRTL ? "اكتب رسالتك هنا..." : "Write your message here..."}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full sm:w-auto px-10 py-4 bg-[#1A4AFF] text-white font-semibold tracking-wide rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#1A4AFF]/30 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRTL ? "font-[var(--font-cairo)]" : ""
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {isRTL ? "جاري الإرسال..." : "Sending..."}
                      </>
                    ) : (
                      <>
                        {dict.contact.form.send}
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-[#122D8B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </form>
            </div>

            {/* Map & Info Side */}
            <div className={`${isRTL ? "lg:order-1" : ""} ${formVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transition: "all 0.8s ease-out", transitionDelay: "200ms" }}>
              <div className="aspect-[4/3] bg-[#D8DDE9] relative overflow-hidden rounded-2xl shadow-lg mb-8">
                <iframe
                  src="https://maps.google.com/maps?q=%D9%85%D8%B5%D9%86%D8%B9%20%D8%A5%D9%8A%D8%AF%D8%AC%20%D9%84%D9%84%D9%85%D9%84%D8%A7%D8%A8%D8%B3%20%D8%A7%D9%84%D8%AC%D8%A7%D9%87%D8%B2%D8%A9&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>

              <div className={`p-8 bg-gradient-to-br from-gray-50 to-white border border-[#D8DDE9] rounded-2xl ${isRTL ? "text-right" : ""}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#122D8B] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl text-[#122D8B] font-bold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "ساعات العمل" : "Office Hours"}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className={`flex justify-between items-center p-4 bg-white rounded-xl border border-[#D8DDE9]/50 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className={`text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {isRTL ? "الأحد - الخميس" : "Sunday - Thursday"}
                      </span>
                    </div>
                    <span className="text-[#122D8B] font-semibold">{isRTL ? "8:00 ص - 5:00 م" : "8:00 AM - 5:00 PM"}</span>
                  </div>
                  <div className={`flex justify-between items-center p-4 bg-white rounded-xl border border-[#D8DDE9]/50 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className={`text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {isRTL ? "الجمعة - السبت" : "Friday - Saturday"}
                      </span>
                    </div>
                    <span className={`text-[#122D8B] font-semibold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "مغلق" : "Closed"}
                    </span>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="mt-6 pt-6 border-t border-[#D8DDE9]">
                  <p className={`text-sm text-[#122D8B]/60 mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "تواصل سريع:" : "Quick contact:"}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://wa.me/201222493500"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20bd5a] transition-colors duration-300"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span className="text-sm">WhatsApp</span>
                    </a>
                    <a
                      href="tel:+201222493500"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#122D8B] text-white rounded-xl font-medium hover:bg-[#1A4AFF] transition-colors duration-300"
                    >
                      <PhoneIcon className="w-5 h-5" />
                      <span className="text-sm">{isRTL ? "اتصل الآن" : "Call Now"}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
