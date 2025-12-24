"use client";

import { useState, useEffect, useRef } from "react";
import { getDirection, type Locale } from "../../i18n/config";
import { ScrollReveal } from "../components/ScrollReveal";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface AIAgentFormSectionProps {
  locale: Locale;
}

interface Question {
  id: string;
  question: string;
  questionAr: string;
  type?: "mcq" | "dropdown";
  options?: { value: string; label: string; labelAr: string }[];
}

const countryCodes = [
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+962", country: "Jordan", flag: "🇯🇴" },
  { code: "+961", country: "Lebanon", flag: "🇱🇧" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+91", country: "India", flag: "🇮🇳" },
];

const allCountries = [
  { name: "Afghanistan", flag: "🇦🇫" }, { name: "Albania", flag: "🇦🇱" }, { name: "Algeria", flag: "🇩🇿" }, { name: "Andorra", flag: "🇦🇩" },
  { name: "Angola", flag: "🇦🇴" }, { name: "Antigua and Barbuda", flag: "🇦🇬" }, { name: "Argentina", flag: "🇦🇷" }, { name: "Armenia", flag: "🇦🇲" },
  { name: "Australia", flag: "🇦🇺" }, { name: "Austria", flag: "🇦🇹" }, { name: "Azerbaijan", flag: "🇦🇿" }, { name: "Bahamas", flag: "🇧🇸" },
  { name: "Bahrain", flag: "🇧🇭" }, { name: "Bangladesh", flag: "🇧🇩" }, { name: "Barbados", flag: "🇧🇧" }, { name: "Belarus", flag: "🇧🇾" },
  { name: "Belgium", flag: "🇧🇪" }, { name: "Belize", flag: "🇧🇿" }, { name: "Benin", flag: "🇧🇯" }, { name: "Bhutan", flag: "🇧🇹" },
  { name: "Bolivia", flag: "🇧🇴" }, { name: "Bosnia and Herzegovina", flag: "🇧🇦" }, { name: "Botswana", flag: "🇧🇼" }, { name: "Brazil", flag: "🇧🇷" },
  { name: "Brunei", flag: "🇧🇳" }, { name: "Bulgaria", flag: "🇧🇬" }, { name: "Burkina Faso", flag: "🇧🇫" }, { name: "Burundi", flag: "🇧🇮" },
  { name: "Cabo Verde", flag: "🇨🇻" }, { name: "Cambodia", flag: "🇰🇭" }, { name: "Cameroon", flag: "🇨🇲" }, { name: "Canada", flag: "🇨🇦" },
  { name: "Central African Republic", flag: "🇨🇫" }, { name: "Chad", flag: "🇹🇩" }, { name: "Chile", flag: "🇨🇱" }, { name: "China", flag: "🇨🇳" },
  { name: "Colombia", flag: "🇨🇴" }, { name: "Comoros", flag: "🇰🇲" }, { name: "Congo (DRC)", flag: "🇨🇩" }, { name: "Congo (Republic)", flag: "🇨🇬" },
  { name: "Costa Rica", flag: "🇨🇷" }, { name: "Croatia", flag: "🇭🇷" }, { name: "Cuba", flag: "🇨🇺" }, { name: "Cyprus", flag: "🇨🇾" },
  { name: "Czech Republic", flag: "🇨🇿" }, { name: "Denmark", flag: "🇩🇰" }, { name: "Djibouti", flag: "🇩🇯" }, { name: "Dominica", flag: "🇩🇲" },
  { name: "Dominican Republic", flag: "🇩🇴" }, { name: "Ecuador", flag: "🇪🇨" }, { name: "Egypt", flag: "🇪🇬" }, { name: "El Salvador", flag: "🇸🇻" },
  { name: "Equatorial Guinea", flag: "🇬🇶" }, { name: "Eritrea", flag: "🇪🇷" }, { name: "Estonia", flag: "🇪🇪" }, { name: "Eswatini", flag: "🇸🇿" },
  { name: "Ethiopia", flag: "🇪🇹" }, { name: "Fiji", flag: "🇫🇯" }, { name: "Finland", flag: "🇫🇮" }, { name: "France", flag: "🇫🇷" },
  { name: "Gabon", flag: "🇬🇦" }, { name: "Gambia", flag: "🇬🇲" }, { name: "Georgia", flag: "🇬🇪" }, { name: "Germany", flag: "🇩🇪" },
  { name: "Ghana", flag: "🇬🇭" }, { name: "Greece", flag: "🇬🇷" }, { name: "Grenada", flag: "🇬🇩" }, { name: "Guatemala", flag: "🇬🇹" },
  { name: "Guinea", flag: "🇬🇳" }, { name: "Guinea-Bissau", flag: "🇬🇼" }, { name: "Guyana", flag: "🇬🇾" }, { name: "Haiti", flag: "🇭🇹" },
  { name: "Honduras", flag: "🇭🇳" }, { name: "Hungary", flag: "🇭🇺" }, { name: "Iceland", flag: "🇮🇸" }, { name: "India", flag: "🇮🇳" },
  { name: "Indonesia", flag: "🇮🇩" }, { name: "Iran", flag: "🇮🇷" }, { name: "Iraq", flag: "🇮🇶" }, { name: "Ireland", flag: "🇮🇪" },
  { name: "Israel", flag: "🇮🇱" }, { name: "Italy", flag: "🇮🇹" }, { name: "Ivory Coast", flag: "🇨🇮" }, { name: "Jamaica", flag: "🇯🇲" },
  { name: "Japan", flag: "🇯🇵" }, { name: "Jordan", flag: "🇯🇴" }, { name: "Kazakhstan", flag: "🇰🇿" }, { name: "Kenya", flag: "🇰🇪" },
  { name: "Kiribati", flag: "🇰🇮" }, { name: "Kosovo", flag: "🇽🇰" }, { name: "Kuwait", flag: "🇰🇼" }, { name: "Kyrgyzstan", flag: "🇰🇬" },
  { name: "Laos", flag: "🇱🇦" }, { name: "Latvia", flag: "🇱🇻" }, { name: "Lebanon", flag: "🇱🇧" }, { name: "Lesotho", flag: "🇱🇸" },
  { name: "Liberia", flag: "🇱🇷" }, { name: "Libya", flag: "🇱🇾" }, { name: "Liechtenstein", flag: "🇱🇮" }, { name: "Lithuania", flag: "🇱🇹" },
  { name: "Luxembourg", flag: "🇱🇺" }, { name: "Madagascar", flag: "🇲🇬" }, { name: "Malawi", flag: "🇲🇼" }, { name: "Malaysia", flag: "🇲🇾" },
  { name: "Maldives", flag: "🇲🇻" }, { name: "Mali", flag: "🇲🇱" }, { name: "Malta", flag: "🇲🇹" }, { name: "Marshall Islands", flag: "🇲🇭" },
  { name: "Mauritania", flag: "🇲🇷" }, { name: "Mauritius", flag: "🇲🇺" }, { name: "Mexico", flag: "🇲🇽" }, { name: "Micronesia", flag: "🇫🇲" },
  { name: "Moldova", flag: "🇲🇩" }, { name: "Monaco", flag: "🇲🇨" }, { name: "Mongolia", flag: "🇲🇳" }, { name: "Montenegro", flag: "🇲🇪" },
  { name: "Morocco", flag: "🇲🇦" }, { name: "Mozambique", flag: "🇲🇿" }, { name: "Myanmar", flag: "🇲🇲" }, { name: "Namibia", flag: "🇳🇦" },
  { name: "Nauru", flag: "🇳🇷" }, { name: "Nepal", flag: "🇳🇵" }, { name: "Netherlands", flag: "🇳🇱" }, { name: "New Zealand", flag: "🇳🇿" },
  { name: "Nicaragua", flag: "🇳🇮" }, { name: "Niger", flag: "🇳🇪" }, { name: "Nigeria", flag: "🇳🇬" }, { name: "North Korea", flag: "🇰🇵" },
  { name: "North Macedonia", flag: "🇲🇰" }, { name: "Norway", flag: "🇳🇴" }, { name: "Oman", flag: "🇴🇲" }, { name: "Pakistan", flag: "🇵🇰" },
  { name: "Palau", flag: "🇵🇼" }, { name: "Palestine", flag: "🇵🇸" }, { name: "Panama", flag: "🇵🇦" }, { name: "Papua New Guinea", flag: "🇵🇬" },
  { name: "Paraguay", flag: "🇵🇾" }, { name: "Peru", flag: "🇵🇪" }, { name: "Philippines", flag: "🇵🇭" }, { name: "Poland", flag: "🇵🇱" },
  { name: "Portugal", flag: "🇵🇹" }, { name: "Qatar", flag: "🇶🇦" }, { name: "Romania", flag: "🇷🇴" }, { name: "Russia", flag: "🇷🇺" },
  { name: "Rwanda", flag: "🇷🇼" }, { name: "Saint Kitts and Nevis", flag: "🇰🇳" }, { name: "Saint Lucia", flag: "🇱🇨" }, { name: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
  { name: "Samoa", flag: "🇼🇸" }, { name: "San Marino", flag: "🇸🇲" }, { name: "Sao Tome and Principe", flag: "🇸🇹" }, { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Senegal", flag: "🇸🇳" }, { name: "Serbia", flag: "🇷🇸" }, { name: "Seychelles", flag: "🇸🇨" }, { name: "Sierra Leone", flag: "🇸🇱" },
  { name: "Singapore", flag: "🇸🇬" }, { name: "Slovakia", flag: "🇸🇰" }, { name: "Slovenia", flag: "🇸🇮" }, { name: "Solomon Islands", flag: "🇸🇧" },
  { name: "Somalia", flag: "🇸🇴" }, { name: "South Africa", flag: "🇿🇦" }, { name: "South Korea", flag: "🇰🇷" }, { name: "South Sudan", flag: "🇸🇸" },
  { name: "Spain", flag: "🇪🇸" }, { name: "Sri Lanka", flag: "🇱🇰" }, { name: "Sudan", flag: "🇸🇩" }, { name: "Suriname", flag: "🇸🇷" },
  { name: "Sweden", flag: "🇸🇪" }, { name: "Switzerland", flag: "🇨🇭" }, { name: "Syria", flag: "🇸🇾" }, { name: "Taiwan", flag: "🇹🇼" },
  { name: "Tajikistan", flag: "🇹🇯" }, { name: "Tanzania", flag: "🇹🇿" }, { name: "Thailand", flag: "🇹🇭" }, { name: "Timor-Leste", flag: "🇹🇱" },
  { name: "Togo", flag: "🇹🇬" }, { name: "Tonga", flag: "🇹🇴" }, { name: "Trinidad and Tobago", flag: "🇹🇹" }, { name: "Tunisia", flag: "🇹🇳" },
  { name: "Turkey", flag: "🇹🇷" }, { name: "Turkmenistan", flag: "🇹🇲" }, { name: "Tuvalu", flag: "🇹🇻" }, { name: "Uganda", flag: "🇺🇬" },
  { name: "Ukraine", flag: "🇺🇦" }, { name: "United Arab Emirates", flag: "🇦🇪" }, { name: "United Kingdom", flag: "🇬🇧" }, { name: "United States", flag: "🇺🇸" },
  { name: "Uruguay", flag: "🇺🇾" }, { name: "Uzbekistan", flag: "🇺🇿" }, { name: "Vanuatu", flag: "🇻🇺" }, { name: "Vatican City", flag: "🇻🇦" },
  { name: "Venezuela", flag: "🇻🇪" }, { name: "Vietnam", flag: "🇻🇳" }, { name: "Yemen", flag: "🇾🇪" }, { name: "Zambia", flag: "🇿🇲" },
  { name: "Zimbabwe", flag: "🇿🇼" }
];

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
    id: "location",
    question: "Where are you based?",
    questionAr: "أين موقعك؟",
    type: "dropdown",
  },
  {
    id: "consultation",
    question: "Would you like a direct consultation with our team?",
    questionAr: "هل تريد استشارة مباشرة مع فريقنا؟",
    options: [
      { value: "call", label: "Yes, call me", labelAr: "نعم، اتصلوا بي" },
      { value: "whatsapp", label: "Yes, WhatsApp me", labelAr: "نعم، واتساب" },
      { value: "email", label: "Yes, email me", labelAr: "نعم، راسلوني" },
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
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = allCountries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const selectedCountry = allCountries.find((c) => c.name === answers["location"]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / (questions.length + 1)) * 100;
  const consultationType = answers["consultation"];

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
    const contactInfo = (consultationType === "call" || consultationType === "whatsapp") ? `${countryCode}${phone}` : email;
    if (!contactInfo.trim()) return;
    
    setIsSubmitting(true);
    const formData = {
      email: consultationType === "email" ? email : "",
      phone: (consultationType === "call" || consultationType === "whatsapp") ? `${countryCode}${phone}` : "",
      whatsapp: consultationType === "whatsapp" ? `${countryCode}${phone}` : "",
      contactMethod: consultationType,
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
    setPhone("");
    setCountryCode("+20");
    setIsComplete(false);
  };

  const isContactValid = () => {
    if (consultationType === "call" || consultationType === "whatsapp") {
      return phone.trim().length >= 8;
    }
    return email.trim().length > 0 && email.includes("@");
  };

  return (
    <section id="ai-agent" ref={sectionRef} dir={isRTL ? "rtl" : "ltr"} className="py-8 lg:py-10 relative overflow-visible z-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-true-cobalt/90" />

      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-royal-azure/10 rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-royal-azure/5 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-2 h-2 bg-royal-azure rounded-full animate-pulse" />
              <span className={`text-white/90 text-sm font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "مساعد ذكي" : "AI Assistant"}
              </span>
            </div>
            <div className="mb-4">
              <TypewriterTitle
                text={isRTL ? "دعنا نساعدك" : "Let Our AI Agent Help You"}
                isVisible={true}
                className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              />
            </div>
            <p className={`text-white/70 text-lg max-w-2xl mx-auto ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "أجب على بعض الأسئلة السريعة وسنقوم بتخصيص الحل المثالي لك" : "Answer a few quick questions and we'll tailor the perfect solution for you"}
            </p>
          </div>
        </ScrollReveal>

        {/* Progress Bar */}
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-8">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-royal-azure to-[#4169E1] rounded-full transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Question Card */}
        <ScrollReveal direction="up" delay={200}>
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
              <button onClick={handleReset} className={`px-6 py-3 bg-white/10 hover:bg-white/20 text-white transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "إرسال طلب آخر" : "Submit Another Request"}
              </button>
            </div>
          ) : currentStep < questions.length ? (
            <div key={currentQuestion.id}>
              <h3 className={`text-xl md:text-2xl font-bold text-white mb-8 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? currentQuestion.questionAr : currentQuestion.question}
              </h3>
              
              {currentQuestion.type === "dropdown" ? (
                /* Custom Country Dropdown with Search and Flags */
                <div className="relative" ref={dropdownRef}>
                  {/* Selected Value / Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    className={`w-full px-5 py-4 bg-white/10 border border-white/20 text-white focus:outline-none focus:border-royal-azure flex items-center justify-between transition-colors hover:bg-white/15 ${isRTL ? "flex-row-reverse font-[var(--font-cairo)]" : ""}`}
                  >
                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                      {selectedCountry ? (
                        <>
                          <span className="text-2xl">{selectedCountry.flag}</span>
                          <span>{selectedCountry.name}</span>
                        </>
                      ) : (
                        <span className="text-white/50">{isRTL ? "اختر بلدك..." : "Select your country..."}</span>
                      )}
                    </div>
                    <svg className={`w-5 h-5 text-white/60 transition-transform ${countryDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Panel */}
                  {countryDropdownOpen && (
                    <div className="absolute z-[9999] w-full mt-2 bg-[#1e3a5f] border border-white/20 shadow-2xl overflow-hidden">
                      {/* Search Input */}
                      <div className="p-3 border-b border-white/10">
                        <div className="relative">
                          <svg className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 ${isRTL ? "right-3" : "left-3"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder={isRTL ? "ابحث عن بلد..." : "Search country..."}
                            className={`w-full py-2 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-royal-azure ${isRTL ? "pr-10 pl-4 font-[var(--font-cairo)]" : "pl-10 pr-4"}`}
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* Country List */}
                      <div className="max-h-64 overflow-y-auto">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country) => (
                            <button
                              key={country.name}
                              type="button"
                              onClick={() => {
                                setAnswers((prev) => ({ ...prev, [currentQuestion.id]: country.name }));
                                setCountryDropdownOpen(false);
                                setCountrySearch("");
                                setTimeout(() => {
                                  if (currentStep < questions.length - 1) {
                                    setCurrentStep((prev) => prev + 1);
                                  } else {
                                    setCurrentStep(questions.length);
                                  }
                                }, 300);
                              }}
                              className={`w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10 transition-colors ${
                                answers[currentQuestion.id] === country.name ? "bg-royal-azure/30" : ""
                              } ${isRTL ? "flex-row-reverse font-[var(--font-cairo)]" : ""}`}
                            >
                              <span className="text-2xl">{country.flag}</span>
                              <span className="font-medium">{country.name}</span>
                              {answers[currentQuestion.id] === country.name && (
                                <svg className={`w-5 h-5 text-royal-azure ${isRTL ? "mr-auto" : "ml-auto"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          ))
                        ) : (
                          <div className={`px-4 py-6 text-center text-white/50 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                            {isRTL ? "لم يتم العثور على نتائج" : "No countries found"}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* MCQ Options */
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={`group p-5 border-2 transition-colors ${
                        answers[currentQuestion.id] === option.value
                          ? "bg-royal-azure border-royal-azure text-white"
                          : "bg-white/10 border-white/20 text-white hover:bg-white/5 hover:border-white/40"
                      }`}
                    >
                      <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          answers[currentQuestion.id] === option.value ? "bg-white border-white" : "border-white/40"
                        }`}>
                          {answers[currentQuestion.id] === option.value && (
                            <svg className="w-4 h-4 text-royal-azure" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              )}

              {answers[currentQuestion.id] === "other" && currentQuestion.type !== "dropdown" && (
                <div className="mt-6">
                  <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <input
                      type="text"
                      value={otherInputs[currentQuestion.id] || ""}
                      onChange={(e) => setOtherInputs((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                      placeholder={isRTL ? "اكتب إجابتك هنا..." : "Type your answer here..."}
                      className={`flex-1 px-5 py-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-royal-azure ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                    />
                    <button
                      onClick={handleOtherSubmit}
                      disabled={!otherInputs[currentQuestion.id]?.trim()}
                      className="px-6 py-4 bg-royal-azure hover:bg-royal-azure/80 disabled:opacity-50 text-white"
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
              {consultationType === "call" || consultationType === "whatsapp" ? (
                <>
                  <h3 className={`text-xl md:text-2xl font-bold text-white mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL 
                      ? (consultationType === "whatsapp" ? "أدخل رقم الواتساب" : "أدخل رقم هاتفك")
                      : (consultationType === "whatsapp" ? "Enter your WhatsApp number" : "Enter your phone number")
                    }
                  </h3>
                  <p className={`text-white/60 mb-8 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL 
                      ? (consultationType === "whatsapp" ? "سنتواصل معك عبر واتساب" : "سنتصل بك قريباً")
                      : (consultationType === "whatsapp" ? "We'll contact you on WhatsApp" : "We'll call you soon")
                    }
                  </p>
                  <div className="space-y-4">
                    {/* Phone Input Fields - Stack vertically on mobile, side by side on larger screens */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full sm:w-32 px-4 py-4 bg-white/10 border border-white/20 text-white focus:outline-none focus:border-royal-azure"
                        dir="ltr"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code} className="bg-true-cobalt text-white">
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="1234567890"
                        className="flex-1 px-5 py-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-royal-azure"
                        dir="ltr"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={!isContactValid() || isSubmitting}
                      className={`w-full px-8 py-4 bg-royal-azure hover:bg-royal-azure/80 disabled:opacity-50 text-white font-semibold flex items-center justify-center gap-2 ${isRTL ? "font-[var(--font-cairo)] flex-row-reverse" : ""}`}
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
                </>
              ) : (
                <>
                  <h3 className={`text-xl md:text-2xl font-bold text-white mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                  </h3>
                  <p className={`text-white/60 mb-8 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "سنراسلك قريباً" : "We'll email you soon"}
                  </p>
                  <div className="space-y-4">
                    {/* Email Input and Submit Button - Stack vertically with consistent spacing */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@company.com"
                        className="flex-1 px-5 py-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-royal-azure"
                        dir="ltr"
                      />
                      <button
                        onClick={handleSubmit}
                        disabled={!isContactValid() || isSubmitting}
                        className={`px-8 py-4 bg-royal-azure hover:bg-royal-azure/80 disabled:opacity-50 text-white font-semibold flex items-center justify-center gap-2 sm:w-auto w-full ${isRTL ? "font-[var(--font-cairo)] flex-row-reverse" : ""}`}
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
                  </div>
                </>
              )}
              <button onClick={handleBack} className={`mt-8 flex items-center gap-2 text-white/60 hover:text-white ${isRTL ? "flex-row-reverse" : ""}`}>
                <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>{isRTL ? "السابق" : "Back"}</span>
              </button>
            </div>
          )}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
