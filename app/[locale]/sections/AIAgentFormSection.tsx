"use client";

import { useState, useEffect, useRef } from "react";
import { getDirection, type Locale } from "../../i18n/config";

interface AIAgentFormSectionProps {
  locale: Locale;
}

interface Question {
  id: string;
  question: string;
  questionAr: string;
  options: { value: string; label: string; labelAr: string }[];
}

const questions: Question[] = [
  {
    id: "garmentType",
    question: "What type of garments are you interested in producing?",
    questionAr: "ما نوع الملابس التي ترغب في إنتاجها؟",
    options: [
      { value: "tshirts", label: "T-shirts", labelAr: "تيشيرتات" },
      { value: "jeans", label: "Jeans / Denim", labelAr: "جينز / دنيم" },
      { value: "polo", label: "Polo shirts", labelAr: "بولو شيرت" },
      { value: "jackets", label: "Jackets", labelAr: "جاكيتات" },
      { value: "sportswear", label: "Sportswear", labelAr: "ملابس رياضية" },
      { value: "uniforms", label: "Uniforms", labelAr: "يونيفورم" },
      { value: "technical", label: "Technical fabrics", labelAr: "أقمشة تقنية" },
      { value: "other", label: "Other", labelAr: "أخرى" },
    ],
  },
  {
    id: "quantity",
    question: "What is your typical order quantity?",
    questionAr: "ما هي كمية الطلب المعتادة لديك؟",
    options: [
      { value: "less500", label: "Less than 500 pcs", labelAr: "أقل من 500 قطعة" },
      { value: "500-1000", label: "500 – 1,000 pcs", labelAr: "500 - 1,000 قطعة" },
      { value: "1000-5000", label: "1,000 – 5,000 pcs", labelAr: "1,000 - 5,000 قطعة" },
      { value: "more5000", label: "More than 5,000 pcs", labelAr: "أكثر من 5,000 قطعة" },
      { value: "other", label: "Other", labelAr: "أخرى" },
    ],
  },
  {
    id: "services",
    question: "Which services do you need?",
    questionAr: "ما الخدمات التي تحتاجها؟",
    options: [
      { value: "cutting", label: "Cutting & Sewing", labelAr: "قص وخياطة" },
      { value: "washing", label: "Washing & Finishing", labelAr: "غسيل وتشطيب" },
      { value: "embroidery", label: "Embroidery / Printing", labelAr: "تطريز / طباعة" },
      { value: "full", label: "Full Production & Delivery", labelAr: "إنتاج كامل وتوصيل" },
      { value: "other", label: "Other", labelAr: "أخرى" },
    ],
  },
  {
    id: "timeline",
    question: "What's your preferred production timeline?",
    questionAr: "ما هو الجدول الزمني المفضل للإنتاج؟",
    options: [
      { value: "2weeks", label: "Less than 2 weeks", labelAr: "أقل من أسبوعين" },
      { value: "2-4weeks", label: "2 – 4 weeks", labelAr: "2 - 4 أسابيع" },
      { value: "1-2months", label: "1 – 2 months", labelAr: "1 - 2 شهر" },
      { value: "flexible", label: "Flexible", labelAr: "مرن" },
      { value: "other", label: "Other", labelAr: "أخرى" },
    ],
  },
  {
    id: "market",
    question: "Target market?",
    questionAr: "السوق المستهدف؟",
    options: [
      { value: "local", label: "Local", labelAr: "محلي" },
      { value: "international", label: "International", labelAr: "دولي" },
      { value: "both", label: "Both", labelAr: "كلاهما" },
      { value: "other", label: "Other", labelAr: "أخرى" },
    ],
  },
  {
    id: "consultation",
    question: "Would you like a direct consultation with our team?",
    questionAr: "هل تريد استشارة مباشرة مع فريقنا؟",
    options: [
      { value: "call", label: "Yes, call me", labelAr: "نعم، اتصلوا بي" },
      { value: "email", label: "Yes, email me", labelAr: "نعم، راسلوني" },
      { value: "info", label: "No, just provide info", labelAr: "لا، فقط أرسلوا المعلومات" },
      { value: "other", label: "Other", labelAr: "أخرى" },
    ],
  },
];

export function AIAgentFormSection({ locale }: AIAgentFormSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [otherInputs, setOtherInputs] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
  }, []);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / (questions.length + 1)) * 100;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    if (value !== "other") {
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setCurrentStep(questions.length);
        }
      }, 300);
    }
  };

  const handleOtherSubmit = () => {
    if (otherInputs[currentQuestion.id]?.trim()) {
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setCurrentStep(questions.length);
        }
      }, 300);
    }
  };

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setIsSubmitting(true);
    const formData = {
      email,
      answers: questions.map((q) => ({
        question: q.question,
        answer: answers[q.id] === "other" ? otherInputs[q.id] : answers[q.id],
      })),
    };
    try {
      await fetch("/api/ai-agent-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsComplete(true);
    } catch {
      setIsComplete(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setOtherInputs({});
    setEmail("");
    setIsComplete(false);
  };

  return (
    <section ref={sectionRef} dir={isRTL ? "rtl" : "ltr"} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-[#122D8B]/90" />

      {/* Decorative - no blur effects to prevent jitter */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1A4AFF]/10 rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1A4AFF]/5 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="w-2 h-2 bg-[#1A4AFF] rounded-full animate-pulse" />
            <span className={`text-white/90 text-sm font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "مساعد ذكي" : "AI Assistant"}
            </span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "دعنا نساعدك" : "Let Our AI Agent Help You"}
          </h2>
          <p className={`text-white/70 text-lg max-w-2xl mx-auto ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "أجب على بعض الأسئلة السريعة وسنقوم بتخصيص الحل المثالي لك" : "Answer a few quick questions and we'll tailor the perfect solution for you"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1A4AFF] to-[#4169E1] rounded-full transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20">
          {isComplete ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold text-white mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "شكراً لك!" : "Thank You!"}
              </h3>
              <p className={`text-white/70 mb-8 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "تم استلام طلبك. سيتواصل معك فريقنا قريباً." : "Your request has been received. Our team will contact you soon."}
              </p>
              <button onClick={handleReset} className={`px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "إرسال طلب آخر" : "Submit Another Request"}
              </button>
            </div>
          ) : currentStep < questions.length ? (
            <div key={currentQuestion.id}>
              <h3 className={`text-xl md:text-2xl font-bold text-white mb-8 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? currentQuestion.questionAr : currentQuestion.question}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`group p-5 rounded-2xl border-2 transition-colors ${
                      answers[currentQuestion.id] === option.value
                        ? "bg-[#1A4AFF] border-[#1A4AFF] text-white"
                        : "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${
                        answers[currentQuestion.id] === option.value ? "bg-white border-white" : "border-white/40"
                      }`}>
                        {answers[currentQuestion.id] === option.value && (
                          <svg className="w-4 h-4 text-[#1A4AFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {isRTL ? option.labelAr : option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {answers[currentQuestion.id] === "other" && (
                <div className="mt-6">
                  <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <input
                      type="text"
                      value={otherInputs[currentQuestion.id] || ""}
                      onChange={(e) => setOtherInputs((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                      placeholder={isRTL ? "اكتب إجابتك هنا..." : "Type your answer here..."}
                      className={`flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#1A4AFF] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                    />
                    <button
                      onClick={handleOtherSubmit}
                      disabled={!otherInputs[currentQuestion.id]?.trim()}
                      className="px-6 py-4 bg-[#1A4AFF] hover:bg-[#1A4AFF]/80 disabled:opacity-50 text-white rounded-xl"
                    >
                      <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {currentStep > 0 && (
                <button onClick={handleBack} className={`mt-8 flex items-center gap-2 text-white/60 hover:text-white ${isRTL ? "flex-row-reverse" : ""}`}>
                  <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>{isRTL ? "السابق" : "Back"}</span>
                </button>
              )}
            </div>
          ) : (
            <div>
              <h3 className={`text-xl md:text-2xl font-bold text-white mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "أخيراً، أدخل بريدك الإلكتروني" : "Finally, enter your email"}
              </h3>
              <p className={`text-white/60 mb-8 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "سنرسل لك تفاصيل الحل المخصص لك" : "We'll send you the details of your customized solution"}
              </p>
              <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@company.com"
                  className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#1A4AFF]"
                  dir="ltr"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!email.trim() || isSubmitting}
                  className={`px-8 py-4 bg-[#1A4AFF] hover:bg-[#1A4AFF]/80 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center gap-2 ${isRTL ? "font-[var(--font-cairo)] flex-row-reverse" : ""}`}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <>
                      <span>{isRTL ? "إرسال" : "Submit"}</span>
                      <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              <button onClick={handleBack} className={`mt-8 flex items-center gap-2 text-white/60 hover:text-white ${isRTL ? "flex-row-reverse" : ""}`}>
                <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>{isRTL ? "السابق" : "Back"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
