"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

const testimonialsEn = [
  {
    id: 1,
    name: "Ahmed Al-Sheikh",
    role: "CEO, Fashion House International",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "Working with EDGE for Garments has transformed our supply chain. Their attention to quality and commitment to deadlines is unmatched.",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Sourcing Director, Urban Wear Co.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    quote: "The quality of denim production exceeded our expectations. EDGE has become our go-to manufacturer for all premium lines.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Operations Manager, Pacific Brands",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "From fabric inspection to final QC, every step was handled with precision. The turnaround time was impressive.",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Brand Manager, Denim Republic",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "EDGE's attention to detail is remarkable. They understand the fashion industry's demands and deliver consistently.",
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Founder, Street Style Co.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    quote: "Outstanding service and quality. Our partnership with EDGE has helped us scale our production significantly.",
  },
];

const testimonialsAr = [
  {
    id: 1,
    name: "أحمد الشيخ",
    role: "الرئيس التنفيذي، فاشن هاوس إنترناشيونال",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "العمل مع إيدج للملابس حوّل سلسلة التوريد لدينا. اهتمامهم بالجودة والتزامهم بالمواعيد لا مثيل له.",
  },
  {
    id: 2,
    name: "سارة ميتشل",
    role: "مديرة التوريد، أوربان وير",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    quote: "جودة إنتاج الدنيم فاقت توقعاتنا. أصبحت إيدج المصنع المفضل لدينا لجميع الخطوط الفاخرة.",
  },
  {
    id: 3,
    name: "مايكل تشن",
    role: "مدير العمليات، باسيفيك براندز",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "من فحص الأقمشة إلى مراقبة الجودة النهائية، تم التعامل مع كل خطوة بدقة.",
  },
  {
    id: 4,
    name: "إيما رودريجيز",
    role: "مديرة العلامة التجارية، دنيم ريبابليك",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "اهتمام إيدج بالتفاصيل رائع. يفهمون متطلبات صناعة الأزياء ويقدمون باستمرار.",
  },
  {
    id: 5,
    name: "جيمس ويلسون",
    role: "مؤسس، ستريت ستايل",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    quote: "خدمة وجودة متميزة. شراكتنا مع إيدج ساعدتنا على التوسع بشكل كبير.",
  },
];

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const { language, dir } = useLanguage();

  const testimonials = language === "ar" ? testimonialsAr : testimonialsEn;
  const title = language === "ar" ? "آراء العملاء" : "Testimonials";

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const totalItems = testimonials.length;
    
    let adjustedDiff = diff;
    if (diff > totalItems / 2) adjustedDiff = diff - totalItems;
    if (diff < -totalItems / 2) adjustedDiff = diff + totalItems;

    if (adjustedDiff === 0) {
      return {
        transform: "translateX(0) scale(1)",
        opacity: 1,
        zIndex: 10,
      };
    } else if (adjustedDiff === 1 || adjustedDiff === -totalItems + 1) {
      return {
        transform: "translateX(110%) scale(0.85)",
        opacity: 0.5,
        zIndex: 5,
      };
    } else if (adjustedDiff === -1 || adjustedDiff === totalItems - 1) {
      return {
        transform: "translateX(-110%) scale(0.85)",
        opacity: 0.5,
        zIndex: 5,
      };
    } else {
      return {
        transform: adjustedDiff > 0 ? "translateX(200%) scale(0.7)" : "translateX(-200%) scale(0.7)",
        opacity: 0,
        zIndex: 1,
      };
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B]"
            style={{ fontFamily: language === "ar" ? "var(--font-cairo), sans-serif" : "inherit" }}
          >
            {title}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative h-[400px] flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="absolute w-[320px] md:w-[380px] transition-all duration-500 ease-out cursor-pointer"
              style={getCardStyle(index)}
              onClick={() => setActiveIndex(index)}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg h-full">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#1A4AFF]/20">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Quote */}
                <p 
                  className="text-[#122D8B]/70 text-center leading-relaxed mb-6"
                  style={{ fontFamily: language === "ar" ? "var(--font-cairo), sans-serif" : "inherit" }}
                  dir={dir}
                >
                  {language === "ar" ? `"${testimonial.quote}"` : `"${testimonial.quote}"`}
                </p>

                {/* Author */}
                <div className="text-center">
                  <h4 
                    className="font-bold text-[#122D8B]"
                    style={{ fontFamily: language === "ar" ? "var(--font-cairo), sans-serif" : "inherit" }}
                  >
                    {testimonial.name}
                  </h4>
                  <p 
                    className="text-[#122D8B]/50 text-sm"
                    style={{ fontFamily: language === "ar" ? "var(--font-cairo), sans-serif" : "inherit" }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-[#1A4AFF] w-8"
                  : "bg-[#1A4AFF]/30 hover:bg-[#1A4AFF]/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
