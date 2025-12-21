"use client";

import { useState, useRef, useEffect } from "react";
import { getDirection, type Locale } from "../../i18n/config";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface AIGuideSectionProps {
  locale: Locale;
}

export function AIGuideSection({ locale }: AIGuideSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Trigger chatbot with the message
      const chatbotEvent = new CustomEvent("openChatbot", {
        detail: { message: inputValue },
      });
      window.dispatchEvent(chatbotEvent);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <section ref={sectionRef} className="py-8 lg:py-10 bg-alabaster-grey">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Subtitle */}
          <p className={`text-true-cobalt/70 text-sm md:text-base font-medium mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "مساعدنا الذكي يوجه متطلباتك." : "Our AI agent guides your requirements."}
          </p>

          {/* Main Question */}
          <div className="mb-10">
            <TypewriterTitle
              text={isRTL 
                ? "هل لديك أقمشة أو تصميمات معينة في ذهنك؟" 
                : "Do you have specific fabrics or designs in mind?"}
              isVisible={isVisible}
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-true-cobalt ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
            />
          </div>

          {/* Input Field */}
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRTL ? "اكتب هنا" : "Type here"}
              className={`w-full px-8 py-4 border-2 border-true-cobalt/20 rounded-full text-center text-true-cobalt placeholder-true-cobalt/40 focus:outline-none focus:border-royal-azure transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
            />
            {inputValue && (
              <button
                type="submit"
                className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-royal-azure text-white rounded-full flex items-center justify-center hover:bg-true-cobalt transition-colors ${isRTL ? "left-2" : "right-2"}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
