"use client";

import { useState } from "react";
import Image from "next/image";
import { LocationIcon, PhoneIcon, EmailIcon, WhatsAppIcon } from "../../components/Icons";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";
import { PageHero } from "../components/PageHero";

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

  const contactInfo = isRTL
    ? [
        { icon: LocationIcon, title: "العنوان", details: ["المنطقة الصناعية، جنوب بورسعيد", "مجمع 58 مصنع، مصنع رقم 65 و 66"] },
        { icon: PhoneIcon, title: "الهاتف", details: ["+201222493500"], links: ["tel:+201222493500"] },
        { icon: EmailIcon, title: "البريد الإلكتروني", details: ["info@edgeforgarments.com"], links: ["mailto:info@edgeforgarments.com"] },
        { icon: WhatsAppIcon, title: "واتساب", details: ["+201222493500"], links: ["https://wa.me/201222493500"] },
      ]
    : [
        { icon: LocationIcon, title: "Address", details: ["Industrial zone, South of Port Said", "58 Factories Complex, factory No.65 & No.66"] },
        { icon: PhoneIcon, title: "Phone", details: ["+201222493500"], links: ["tel:+201222493500"] },
        { icon: EmailIcon, title: "Email", details: ["info@edgeforgarments.com"], links: ["mailto:info@edgeforgarments.com"] },
        { icon: WhatsAppIcon, title: "WhatsApp", details: ["+201222493500"], links: ["https://wa.me/201222493500"] },
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
      {/* Page Hero */}
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
      <section className="py-12 border-b border-[#D8DDE9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <div key={info.title} className={`text-center p-6 border border-[#D8DDE9] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                <info.icon className="w-8 h-8 text-[#1A4AFF] mx-auto mb-4" />
                <h3 className={`text-[#122D8B] font-bold uppercase tracking-wide mb-3 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={`${info.title}-${i}`} className="text-[#122D8B]/60 text-sm">
                    {info.links ? (
                      <a href={info.links[i]} className="hover:text-[#1A4AFF] transition-colors">
                        {detail}
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

      {/* Contact Form Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 ${isRTL ? "direction-rtl" : ""}`}>
            {/* Form */}
            <div className={isRTL ? "lg:order-2 text-right" : ""}>
              <h2 className={`text-2xl font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "أرسل لنا رسالة" : "Send Us a Message"}
              </h2>
              <p className={`text-[#122D8B]/70 mb-8 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL
                  ? "املأ النموذج أدناه وسيتواصل معك فريقنا خلال 24 ساعة."
                  : "Fill out the form below and our team will get back to you within 24 hours."}
              </p>

              {submitStatus === "success" && (
                <div className={`mb-6 p-4 bg-green-50 border border-green-200 rounded-lg ${isRTL ? "text-right" : ""}`}>
                  <p className={`text-green-800 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "تم إرسال رسالتك بنجاح!" : "Your message was sent successfully!"}
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className={`mb-6 p-4 bg-red-50 border border-red-200 rounded-lg ${isRTL ? "text-right" : ""}`}>
                  <p className={`text-red-800 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "An error occurred. Please try again."}
                  </p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {dict.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors ${
                        isRTL ? "text-right font-[var(--font-cairo)]" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "اسم الشركة" : "Company Name"}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors ${
                        isRTL ? "text-right font-[var(--font-cairo)]" : ""
                      }`}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {dict.contact.form.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors ${
                        isRTL ? "text-right" : ""
                      }`}
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
                      className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors ${
                        isRTL ? "text-right" : ""
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {dict.contact.form.subject} *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors bg-white ${
                      isRTL ? "text-right font-[var(--font-cairo)]" : ""
                    }`}
                  >
                    <option value="">{isRTL ? "اختر موضوعاً" : "Select a subject"}</option>
                    <option value="Request a Quote">{isRTL ? "طلب عرض سعر" : "Request a Quote"}</option>
                    <option value="Sample Request">{isRTL ? "طلب عينة" : "Sample Request"}</option>
                    <option value="Partnership Inquiry">{isRTL ? "استفسار شراكة" : "Partnership Inquiry"}</option>
                    <option value="Other">{isRTL ? "أخرى" : "Other"}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {dict.contact.form.message} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors resize-none ${
                      isRTL ? "text-right font-[var(--font-cairo)]" : ""
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-8 py-4 bg-[#1A4AFF] text-white font-semibold tracking-wide hover:bg-[#122D8B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRTL ? "font-[var(--font-cairo)]" : ""
                  }`}
                >
                  {isSubmitting ? (isRTL ? "جاري الإرسال..." : "Sending...") : dict.contact.form.send}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className={isRTL ? "lg:order-1" : ""}>
              <div className="aspect-video bg-[#D8DDE9] relative mb-8 overflow-hidden rounded-lg">
                <iframe
                  src="https://maps.google.com/maps?q=%D9%85%D8%B5%D9%86%D8%B9%20%D8%A5%D9%8A%D8%AF%D8%AC%20%D9%84%D9%84%D9%85%D9%84%D8%A7%D8%A8%D8%B3%20%D8%A7%D9%84%D8%AC%D8%A7%D9%87%D8%B2%D8%A9&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>

              <div className={`p-8 border border-[#D8DDE9] ${isRTL ? "text-right" : ""}`}>
                <h3 className={`text-xl text-[#122D8B] mb-6 font-bold uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "ساعات العمل" : "Office Hours"}
                </h3>
                <div className="space-y-4">
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className={`text-[#122D8B]/60 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "الأحد - الخميس" : "Sunday - Thursday"}
                    </span>
                    <span className="text-[#122D8B] font-medium">{isRTL ? "8:00 ص - 5:00 م" : "8:00 AM - 5:00 PM"}</span>
                  </div>
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className={`text-[#122D8B]/60 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "الجمعة - السبت" : "Friday - Saturday"}
                    </span>
                    <span className={`text-[#122D8B] font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "مغلق" : "Closed"}
                    </span>
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
