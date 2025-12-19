"use client";

import { useState, useEffect } from "react";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";

// Real Google Reviews
const reviews = [
  {
    id: 1,
    name: "محمد مرسي تميم",
    nameEn: "Mohamed Morsy Tamim",
    rating: 5,
    quote: "مصنع متخصص فالجينز للسوق المحلي و التصدير ...محترمين جدا و ملتزمين",
    quoteEn: "A factory specialized in jeans for local market and export... very professional and committed",
    initial: "م",
    initialEn: "M",
    color: "bg-green-500",
  },
  {
    id: 2,
    name: "مجدي نوفل",
    nameEn: "Magdy Nofal",
    rating: 5,
    quote: "من افضل الإمكان الموجوده والمعامله سهله ولينه والناس كلها بتحب بعضها",
    quoteEn: "One of the best places, easy and smooth dealings, and everyone loves each other",
    initial: "م",
    initialEn: "M",
    color: "bg-cyan-500",
  },
  {
    id: 3,
    name: "Mohamed Gadou",
    nameEn: "Mohamed Gadou",
    rating: 5,
    quote: "منتجاتهم فوق الممتازة",
    quoteEn: "Their products are beyond excellent",
    initial: "M",
    initialEn: "M",
    color: "bg-blue-500",
  },
  {
    id: 4,
    name: "أسامة الهواشي",
    nameEn: "Usama Elhawashy",
    rating: 5,
    quote: "ممتاز",
    quoteEn: "Excellent",
    initial: "أ",
    initialEn: "U",
    color: "bg-orange-500",
  },
  {
    id: 5,
    name: "Mohamed Atef",
    nameEn: "Mohamed Atef",
    rating: 5,
    quote: "احب هذا المكان",
    quoteEn: "I love this place",
    initial: "M",
    initialEn: "M",
    color: "bg-purple-500",
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

interface TestimonialSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function TestimonialSection({ locale, dict }: TestimonialSectionProps) {
  const [activeIndex, setActiveIndex] = useState(1);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJw_A5OCWf-RQRIMNBKb8Zpv0";

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const totalItems = reviews.length;

    let adjustedDiff = diff;
    if (diff > totalItems / 2) adjustedDiff = diff - totalItems;
    if (diff < -totalItems / 2) adjustedDiff = diff + totalItems;

    if (adjustedDiff === 0) {
      return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 10 };
    } else if (adjustedDiff === 1 || adjustedDiff === -totalItems + 1) {
      return { transform: "translateX(110%) scale(0.85)", opacity: 0.5, zIndex: 5 };
    } else if (adjustedDiff === -1 || adjustedDiff === totalItems - 1) {
      return { transform: "translateX(-110%) scale(0.85)", opacity: 0.5, zIndex: 5 };
    } else {
      return {
        transform: adjustedDiff > 0 ? "translateX(200%) scale(0.7)" : "translateX(-200%) scale(0.7)",
        opacity: 0,
        zIndex: 1,
      };
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FA] overflow-hidden" dir={dir}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className={`text-[#1A4AFF] text-sm font-semibold uppercase tracking-wider block mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "آراء العملاء" : "Testimonials"}
          </span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {dict.testimonials.title}
          </h2>
          <div className="flex items-center justify-center gap-2 text-[#122D8B]/60">
            <GoogleIcon />
            <span className={`text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "تقييمات حقيقية من Google" : "Real reviews from Google"}
            </span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative h-[380px] flex items-center justify-center mb-12">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="absolute w-[320px] md:w-[400px] transition-all duration-500 ease-out cursor-pointer"
              style={getCardStyle(index)}
              onClick={() => setActiveIndex(index)}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg h-full">
                {/* Avatar */}
                <div className="flex justify-center mb-5">
                  <div className={`w-20 h-20 ${review.color} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md`}>
                    {isRTL ? review.initial : review.initialEn}
                  </div>
                </div>
                
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= review.rating} />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className={`text-[#122D8B]/70 text-center leading-relaxed mb-5 min-h-[60px] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                >
                  &ldquo;{isRTL ? review.quote : review.quoteEn}&rdquo;
                </p>

                {/* Name */}
                <div className="text-center">
                  <h4 className={`font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? review.name : review.nameEn}
                  </h4>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <GoogleIcon />
                    <span className="text-[#122D8B]/40 text-xs">Google Review</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mb-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-[#1A4AFF] w-8" : "bg-[#1A4AFF]/30 hover:bg-[#1A4AFF]/50"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Add Review CTA */}
        <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="w-14 h-14 bg-[#1A4AFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <GoogleIcon />
            </div>
            <div className={isRTL ? "text-right" : ""}>
              <h3 className={`text-lg font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "شاركنا رأيك" : "Share Your Experience"}
              </h3>
              <p className={`text-[#122D8B]/60 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "نقدر رأيك! اكتب تقييمك على Google" : "We value your feedback! Write a review on Google"}
              </p>
            </div>
          </div>
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 bg-[#122D8B] text-white font-semibold rounded-full hover:bg-[#1A4AFF] transition-colors whitespace-nowrap ${isRTL ? "flex-row-reverse font-[var(--font-cairo)]" : ""}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {isRTL ? "اكتب تقييم" : "Write a Review"}
          </a>
        </div>
      </div>
    </section>
  );
}
