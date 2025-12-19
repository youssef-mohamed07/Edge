"use client";

import { useState } from "react";
import Link from "next/link";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";

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

interface FAQSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function FAQSection({ locale, dict }: FAQSectionProps) {
  const [openId, setOpenId] = useState<number | null>(1);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const faqs = [
    { id: 1, question: dict.faq.q1, answer: dict.faq.a1 },
    { id: 2, question: dict.faq.q2, answer: dict.faq.a2 },
    { id: 3, question: dict.faq.q3, answer: dict.faq.a3 },
    { id: 4, question: dict.faq.q4, answer: dict.faq.a4 },
    { id: 5, question: dict.faq.q5, answer: dict.faq.a5 },
    { id: 6, question: dict.faq.q6, answer: dict.faq.a6 },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className={`mb-14 ${isRTL ? "text-right" : "text-center"}`}>
          <span className={`text-[#1A4AFF] text-sm font-semibold uppercase tracking-wider block mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "الأسئلة الشائعة" : "FAQ"}
          </span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {dict.faq.title}
          </h2>
          <p className={`text-[#122D8B]/60 text-lg ${isRTL ? "font-[var(--font-cairo)]" : "max-w-xl mx-auto"}`}>
            {dict.faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className={`w-full px-6 py-5 flex items-center hover:bg-[#F8F9FA]/50 transition-colors ${
                  isRTL ? "flex-row-reverse justify-end text-right" : "justify-between text-left"
                }`}
              >
                <span className={`font-semibold text-[#122D8B] ${isRTL ? "pr-4 font-[var(--font-cairo)]" : "pr-4"}`}>
                  {faq.question}
                </span>
                <ChevronIcon isOpen={openId === faq.id} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openId === faq.id ? "max-h-96" : "max-h-0"}`}>
                <p className={`px-6 pb-5 text-[#122D8B]/70 leading-relaxed ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className={`text-[#122D8B]/60 mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "لا زال لديك أسئلة؟" : "Still have questions?"}
          </p>
          <Link
            href={`/${locale}/contact`}
            className={`inline-flex items-center gap-2 text-[#1A4AFF] font-semibold hover:gap-3 transition-all duration-300 ${
              isRTL ? "font-[var(--font-cairo)]" : ""
            }`}
          >
            {isRTL ? "تواصل مع فريقنا" : "Contact our team"}
            <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
