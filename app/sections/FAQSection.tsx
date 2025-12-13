"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-[#1A4AFF] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);
  const { t, dir } = useLanguage();

  const faqs = [
    {
      id: 1,
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      id: 2,
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      id: 3,
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      id: 4,
      question: t("faq.q4"),
      answer: t("faq.a4"),
    },
    {
      id: 5,
      question: t("faq.q5"),
      answer: t("faq.a5"),
    },
    {
      id: 6,
      question: t("faq.q6"),
      answer: t("faq.a6"),
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`mb-14 ${dir === "rtl" ? "text-right" : "text-center"}`}>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] mb-4 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
            {t("faq.title")}
          </h2>
          <p className={`text-[#122D8B]/60 ${dir === "rtl" ? "font-[var(--font-cairo)]" : "max-w-xl mx-auto"}`}>
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className={`w-full px-6 py-5 flex items-center hover:bg-[#F8F9FA]/50 transition-colors ${dir === "rtl" ? "flex-row-reverse justify-end text-right" : "justify-between text-left"}`}
              >
                <span className={`font-semibold text-[#122D8B] ${dir === "rtl" ? "pr-4 font-[var(--font-cairo)]" : "pr-4"}`}>
                  {faq.question}
                </span>
                <ChevronIcon isOpen={openId === faq.id} />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className={`px-6 pb-5 text-[#122D8B]/70 leading-relaxed ${dir === "rtl" ? "text-right font-[var(--font-cairo)]" : ""}`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className={`mt-12 ${dir === "rtl" ? "text-right" : "text-center"}`}>
          <p className={`text-[#122D8B]/60 mb-4 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
            {dir === "rtl" ? "لا زال لديك أسئلة؟" : "Still have questions?"}
          </p>
          <a
            href="/contact"
            className={`inline-flex items-center gap-2 text-[#1A4AFF] font-semibold hover:gap-3 transition-all duration-300 ${dir === "rtl" ? "flex-row-reverse font-[var(--font-cairo)]" : ""}`}
          >
            {dir === "rtl" ? "تواصل مع فريقنا" : "Contact our team"}
            <svg className={`w-5 h-5 ${dir === "rtl" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
