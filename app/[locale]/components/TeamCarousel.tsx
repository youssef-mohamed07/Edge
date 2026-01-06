"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { TypewriterTitle } from "./TypewriterTitle";

/**
 * مقاسات الصور المطلوبة:
 * - صور أعضاء الفريق الرئيسية: 400 × 600 بكسل (نسبة 2:3)
 * - الصورة المصغرة في الكارت: 80 × 80 بكسل (مربعة)
 */

interface TeamMember {
  name: string;
  role: string;
  image: string | null;
}

interface TeamCarouselProps {
  members: TeamMember[];
  isRTL: boolean;
  title: string;
  subtitle?: string;
}

export function TeamCarousel({
  members,
  isRTL,
  title,
  subtitle,
}: TeamCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const activeMember = members[activeIndex];

  // Auto-play
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % members.length);
    }, 5000);
  }, [members.length]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying && isVisible && !isHovering) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying, isVisible, isHovering, startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardInteraction = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % members.length);
    handleCardInteraction((activeIndex + 1) % members.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
    handleCardInteraction((activeIndex - 1 + members.length) % members.length);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-16 lg:py-24 overflow-hidden bg-alabaster-grey"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-royal-azure/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-true-cobalt/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-royal-azure/3 to-transparent rounded-full" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23122d8b' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div 
            className={`${isRTL ? "text-right lg:order-1" : "lg:order-1"} transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Badge */}
            {subtitle && (
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-royal-azure/10 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                <span className="w-2 h-2 bg-royal-azure rounded-full animate-pulse" />
                <span className={`text-sm font-semibold text-royal-azure ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {subtitle}
                </span>
              </div>
            )}

            {/* Title */}
            <div className="mb-8">
              <TypewriterTitle
                text={title}
                isVisible={isVisible}
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-true-cobalt leading-[1.1] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              />
            </div>

            {/* Active Member Card - Premium Design */}
            <div 
              className={`group relative bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 max-w-sm ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-royal-azure via-true-cobalt to-royal-azure" />
              
              <div className={`flex items-center gap-5 p-5 ${isRTL ? "flex-row-reverse" : ""}`}>
                {/* Member Image */}
                <div className="relative">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-royal-azure/10 group-hover:ring-royal-azure/20 transition-all duration-300">
                    {activeMember?.image ? (
                      <Image
                        src={activeMember.image}
                        alt={activeMember.name}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-royal-azure to-true-cobalt flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {activeMember?.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-white shadow-sm" />
                </div>

                {/* Text */}
                <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                  <h3 className={`text-xl font-bold text-true-cobalt mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {activeMember?.name}
                  </h3>
                  <p className={`text-royal-azure font-medium text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {activeMember?.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className={`flex items-center gap-4 mt-8 ${isRTL ? "justify-end flex-row-reverse" : ""}`}>
              {/* Arrow buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-royal-azure hover:text-white hover:border-royal-azure transition-all duration-300 group"
                  aria-label="Previous"
                >
                  <svg className={`w-5 h-5 text-true-cobalt group-hover:text-white transition-colors ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-royal-azure hover:text-white hover:border-royal-azure transition-all duration-300 group"
                  aria-label="Next"
                >
                  <svg className={`w-5 h-5 text-true-cobalt group-hover:text-white transition-colors ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {members.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCardInteraction(index)}
                    aria-label={`View ${members[index].name}`}
                    className={`relative h-2.5 rounded-full transition-all duration-500 overflow-hidden ${
                      index === activeIndex
                        ? "w-8 bg-royal-azure"
                        : "w-2.5 bg-true-cobalt/20 hover:bg-true-cobalt/40"
                    }`}
                  >
                    {index === activeIndex && isAutoPlaying && (
                      <span 
                        className="absolute inset-0 bg-true-cobalt/30 origin-left"
                        style={{
                          animation: "progress 5s linear infinite"
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Counter */}
              <div className="text-sm text-true-cobalt/50 font-medium">
                <span className="text-royal-azure font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="mx-1">/</span>
                <span>{String(members.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          {/* Right - Cards Stack */}
          <div
            className={`relative flex items-center justify-center h-[380px] sm:h-[450px] md:h-[520px] lg:order-2 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Glow effect behind active card */}
            <div 
              className="absolute w-64 h-80 bg-royal-azure/20 rounded-3xl blur-3xl transition-all duration-500"
              style={{
                transform: `translateX(${(activeIndex - Math.floor(members.length / 2)) * 20}px)`
              }}
            />

            {/* Cards */}
            <div className="relative flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
              {members.map((member, index) => {
                const isActive = index === activeIndex;
                const distance = Math.abs(index - activeIndex);

                return (
                  <button
                    key={index}
                    onClick={() => handleCardInteraction(index)}
                    onMouseEnter={() => window.innerWidth >= 768 && handleCardInteraction(index)}
                    onFocus={() => handleCardInteraction(index)}
                    aria-label={`${member.name} - ${member.role}`}
                    aria-pressed={isActive}
                    className="relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-royal-azure/30 cursor-pointer group"
                    style={{
                      width: isActive ? "clamp(220px, 35vw, 300px)" : "clamp(55px, 8vw, 80px)",
                      height: isActive ? "clamp(340px, 55vw, 480px)" : "clamp(280px, 45vw, 400px)",
                      filter: isActive ? "none" : "grayscale(100%)",
                      opacity: isActive ? 1 : 0.7 + (0.1 * (3 - distance)),
                      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      zIndex: isActive ? 20 : 10 - distance,
                      borderRadius: isActive ? "28px" : "20px",
                      boxShadow: isActive 
                        ? "0 25px 50px -12px rgba(18, 45, 139, 0.35), 0 0 0 1px rgba(255,255,255,0.1)" 
                        : "0 10px 30px -10px rgba(0,0,0,0.2)",
                      transform: isActive ? "scale(1)" : `scale(${0.95 - distance * 0.02})`,
                    }}
                  >
                    {/* Image */}
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, 300px"
                        className="object-cover transition-transform duration-700"
                        style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
                        priority={index <= 1}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-true-cobalt via-royal-azure to-true-cobalt flex items-center justify-center">
                        <span
                          className="text-white font-bold transition-all duration-500"
                          style={{ fontSize: isActive ? "clamp(3rem, 8vw, 5rem)" : "clamp(1rem, 2vw, 1.5rem)" }}
                        >
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay - Active */}
                    <div
                      className="absolute inset-0 transition-all duration-500 pointer-events-none"
                      style={{
                        background: isActive
                          ? "linear-gradient(to top, rgba(18, 45, 139, 0.95) 0%, rgba(18, 45, 139, 0.6) 25%, rgba(18, 45, 139, 0.1) 50%, transparent 70%)"
                          : "linear-gradient(to top, rgba(18, 45, 139, 0.5) 0%, rgba(18, 45, 139, 0.2) 50%, transparent 100%)",
                      }}
                    />

                    {/* Shine effect on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
                        transform: "translateX(-100%)",
                        animation: isActive ? "shine 2s ease-in-out infinite" : "none"
                      }}
                    />

                    {/* Active Content */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 transition-all duration-500 pointer-events-none"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(30px)",
                      }}
                    >
                      {/* Role badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        <span className={`text-white/90 text-xs font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                          {isRTL ? "عضو مجلس الإدارة" : "Board Member"}
                        </span>
                      </div>
                      
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}>
                        {member.name}
                      </h3>
                      <p className={`text-white/80 text-sm sm:text-base ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}>
                        {member.role}
                      </p>
                    </div>

                    {/* Vertical Name - Inactive */}
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none"
                      style={{ opacity: isActive ? 0 : 1 }}
                    >
                      <div className="relative">
                        <p
                          className="text-white font-bold text-[10px] sm:text-xs tracking-[0.2em] whitespace-nowrap uppercase"
                          style={{
                            writingMode: "vertical-rl",
                            textOrientation: "mixed",
                            transform: "rotate(180deg)",
                            textShadow: "0 2px 10px rgba(0,0,0,0.3)"
                          }}
                        >
                          {member.name.split(" ")[0]}
                        </p>
                      </div>
                    </div>

                    {/* Border glow for active */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-[28px] border-2 border-white/20 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}