"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getDirection, type Locale } from "../../i18n/config";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface Location {
  id: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  country: string;
  countryAr: string;
  x: number;
  y: number;
  isHQ?: boolean;
  flagEmoji?: string;
}

const locations: Location[] = [
  { id: "usa", nameEn: "United States", nameAr: "الولايات المتحدة", descEn: "North America Partner", descAr: "شريك أمريكا الشمالية", country: "USA", countryAr: "أمريكا", x: 23, y: 43, flagEmoji: "🇺🇸" },
  { id: "uk", nameEn: "United Kingdom", nameAr: "المملكة المتحدة", descEn: "European Partner", descAr: "الشريك الأوروبي", country: "UK", countryAr: "بريطانيا", x: 47, y: 29, flagEmoji: "🇬🇧" },
  { id: "netherlands", nameEn: "Netherlands", nameAr: "هولندا", descEn: "European Partner", descAr: "الشريك الأوروبي", country: "Netherlands", countryAr: "هولندا", x: 49, y: 30, flagEmoji: "🇳🇱" },
  { id: "germany", nameEn: "Germany", nameAr: "ألمانيا", descEn: "European Partner", descAr: "الشريك الأوروبي", country: "Germany", countryAr: "ألمانيا", x: 51, y: 31, flagEmoji: "🇩🇪" },
  { id: "france", nameEn: "France", nameAr: "فرنسا", descEn: "European Partner", descAr: "الشريك الأوروبي", country: "France", countryAr: "فرنسا", x: 48, y: 33, flagEmoji: "🇫🇷" },
  { id: "italy", nameEn: "Italy", nameAr: "إيطاليا", descEn: "European Partner", descAr: "الشريك الأوروبي", country: "Italy", countryAr: "إيطاليا", x: 52, y: 36, flagEmoji: "🇮🇹" },
  { id: "spain", nameEn: "Spain", nameAr: "إسبانيا", descEn: "European Partner", descAr: "الشريك الأوروبي", country: "Spain", countryAr: "إسبانيا", x: 45, y: 37, flagEmoji: "🇪🇸" },
  { id: "morocco", nameEn: "Morocco", nameAr: "المغرب", descEn: "North Africa Partner", descAr: "شريك شمال أفريقيا", country: "Morocco", countryAr: "المغرب", x: 46, y: 42, flagEmoji: "🇲🇦" },
  { id: "egypt", nameEn: "Port Said, Egypt", nameAr: "بورسعيد، مصر", descEn: "Headquarters", descAr: "المقر الرئيسي", country: "Egypt", countryAr: "مصر", x: 55, y: 43, isHQ: true, flagEmoji: "🇪🇬" },
  { id: "uae", nameEn: "United Arab Emirates", nameAr: "الإمارات العربية المتحدة", descEn: "Middle East Partner", descAr: "شريك الشرق الأوسط", country: "UAE", countryAr: "الإمارات", x: 61, y: 43, flagEmoji: "🇦🇪" },
  { id: "australia", nameEn: "Australia", nameAr: "أستراليا", descEn: "Oceania Partner", descAr: "شريك أوقيانوسيا", country: "Australia", countryAr: "أستراليا", x: 83, y: 73, flagEmoji: "🇦🇺" },
];

const connections = [
  { from: "egypt", to: "usa" },
  { from: "egypt", to: "uk" },
  { from: "egypt", to: "germany" },
  { from: "egypt", to: "uae" },
  { from: "egypt", to: "australia" },
];

interface CounterProps {
  end: number;
  duration?: number;
  isVisible: boolean;
  prefix?: string;
}

function Counter({ end, duration = 2000, isVisible, prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span>{prefix}{count}</span>;
}

interface LocationsMapSectionProps {
  locale: Locale;
}

export function LocationsMapSection({ locale }: LocationsMapSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [markersVisible, setMarkersVisible] = useState(false);
  const [linesVisible, setLinesVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const title = isRTL ? "شركاؤنا العالميون" : "Our Global Partners";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setMarkersVisible(true), 500);
          setTimeout(() => setLinesVisible(true), 1200);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x: x * 10, y: y * 10 });
  };

  const getLocationById = (id: string) => locations.find((l) => l.id === id);

  // Handle marker click (for mobile)
  const handleMarkerClick = (locationId: string) => {
    setActiveLocation(activeLocation === locationId ? null : locationId);
  };

  return (
    <section ref={sectionRef} className="py-12 lg:py-20 bg-gradient-to-b from-alabaster-grey via-slate-50 to-alabaster-grey overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-royal-azure/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-true-cobalt/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-royal-azure/10 rounded-full mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="w-2 h-2 bg-royal-azure rounded-full animate-pulse" />
            <span className={`text-sm font-medium text-royal-azure ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "شبكة عالمية" : "Global Network"}
            </span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-true-cobalt mb-4 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            <TypewriterTitle text={title} isVisible={isVisible} />
          </h2>
          <p className={`text-true-cobalt/60 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "نخدم عملاءنا عبر القارات، ونبني علاقات دائمة قائمة على الثقة والجودة." : "We proudly serve clients across continents, building lasting relationships based on trust and quality."}
          </p>
        </div>

        {/* Map Container - Shows on ALL screens */}
        <div
          ref={mapRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
          className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="relative w-full aspect-[1.5/1] sm:aspect-[2/1] max-w-6xl mx-auto">
            {/* World Map with parallax (desktop only) */}
            <div className="absolute inset-0 transition-transform duration-300 ease-out hidden md:block" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}>
              <Image src="/map.svg" alt="World Map" fill className="object-contain" style={{ filter: "brightness(0) saturate(100%) invert(16%) sepia(60%) saturate(2000%) hue-rotate(210deg) brightness(90%) contrast(95%)", opacity: 0.2 }} priority />
            </div>
            {/* Static map for mobile */}
            <div className="absolute inset-0 md:hidden">
              <Image src="/map.svg" alt="World Map" fill className="object-contain" style={{ filter: "brightness(0) saturate(100%) invert(16%) sepia(60%) saturate(2000%) hue-rotate(210deg) brightness(90%) contrast(95%)", opacity: 0.2 }} priority />
            </div>

            {/* Connection Lines SVG - Desktop only */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-5 hidden md:block" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a4aff" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#1a4aff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1a4aff" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {connections.map((conn, index) => {
                const from = getLocationById(conn.from);
                const to = getLocationById(conn.to);
                if (!from || !to) return null;
                const midX = (from.x + to.x) / 2;
                const midY = Math.min(from.y, to.y) - 10;
                return (
                  <path key={`${conn.from}-${conn.to}`} d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`} fill="none" stroke="url(#lineGradient)" strokeWidth="0.3" strokeDasharray="2 2"
                    className={`transition-all duration-1000 ${linesVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: `${index * 200}ms` }} />
                );
              })}
            </svg>

            {/* Location Markers - Clickable on mobile, hover on desktop */}
            {locations.map((location, index) => (
              <div key={location.id} 
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 ${markersVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                style={{ left: `${location.x}%`, top: `${location.y}%`, transitionDelay: `${index * 100}ms` }}
                onClick={() => handleMarkerClick(location.id)}
                onMouseEnter={() => window.innerWidth >= 768 && setActiveLocation(location.id)}
                onMouseLeave={() => window.innerWidth >= 768 && setActiveLocation(null)}
              >
                {/* Outer glow ring */}
                <span className={`absolute inset-0 rounded-full transition-all duration-500 ${activeLocation === location.id ? "w-12 h-12 sm:w-16 sm:h-16 -m-4 sm:-m-6 bg-royal-azure/20 blur-md" : "w-6 h-6 sm:w-8 sm:h-8 -m-1 sm:-m-2 bg-transparent"}`} />

                {/* Pulse rings for HQ */}
                {location.isHQ && (
                  <>
                    <span className="absolute w-8 h-8 sm:w-12 sm:h-12 -m-2 sm:-m-4 rounded-full border-2 border-royal-azure animate-ping opacity-20" style={{ animationDuration: "2s" }} />
                    <span className="absolute w-10 h-10 sm:w-16 sm:h-16 -m-3 sm:-m-6 rounded-full border border-royal-azure animate-ping opacity-10" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
                  </>
                )}

                {/* Marker - Larger touch target on mobile */}
                <div className={`relative cursor-pointer transition-all duration-300 ${activeLocation === location.id ? "scale-125 sm:scale-150 z-20" : "hover:scale-110 sm:hover:scale-125"}`}>
                  <svg viewBox="0 0 24 32" fill="none" 
                    className={`drop-shadow-lg transition-all duration-300 ${location.isHQ ? "w-7 h-9 sm:w-9 sm:h-11" : "w-5 h-7 sm:w-7 sm:h-9"}`}
                    style={{ filter: activeLocation === location.id ? "drop-shadow(0 0 12px rgba(26, 74, 255, 0.6))" : "drop-shadow(0 4px 6px rgba(26, 74, 255, 0.3))" }}>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z" fill="currentColor"
                      className={`transition-colors duration-300 ${location.isHQ ? "fill-royal-azure" : activeLocation === location.id ? "fill-royal-azure" : "fill-true-cobalt"}`} />
                    <circle cx="12" cy="11" r="5" fill="white" />
                    {location.isHQ && <circle cx="12" cy="11" r="2" fill="#1a4aff" />}
                  </svg>
                </div>

                {/* Tooltip - Positioned smartly based on location */}
                <div className={`absolute z-30 transition-all duration-300 ${activeLocation === location.id ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} ${
                  // Position tooltip based on marker location to avoid overflow
                  location.y < 40 ? "top-full mt-2" : "bottom-full mb-2"
                } ${
                  location.x < 30 ? "left-0 translate-x-0" : location.x > 70 ? "right-0 translate-x-0" : "left-1/2 -translate-x-1/2"
                }`}
                  style={{ transform: activeLocation === location.id ? undefined : "translateY(8px)" }}
                >
                  <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-royal-azure/10 overflow-hidden min-w-[140px] sm:min-w-[200px]">
                    {/* Header */}
                    <div className={`px-3 py-2 sm:px-4 sm:py-3 ${location.isHQ ? "bg-gradient-to-r from-royal-azure to-true-cobalt" : "bg-gradient-to-r from-true-cobalt to-royal-azure"}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg sm:text-xl">{location.flagEmoji}</span>
                        <p className={`text-xs sm:text-sm font-bold text-white truncate ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                          {isRTL ? location.nameAr : location.nameEn}
                        </p>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {location.isHQ && <span className="px-2 py-0.5 bg-royal-azure/10 text-royal-azure text-[10px] sm:text-xs font-semibold rounded-full">HQ</span>}
                        <p className={`text-[10px] sm:text-xs text-true-cobalt/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                          {isRTL ? location.descAr : location.descEn}
                        </p>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent ${
                      location.y < 40 ? "bottom-full border-b-[8px] border-b-white rotate-180" : "top-full border-t-[8px] border-t-white"
                    }`} style={{ display: location.x < 30 || location.x > 70 ? "none" : "block" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile hint */}
          <p className={`text-center text-xs text-true-cobalt/50 mt-4 md:hidden ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "اضغط على أي موقع لمعرفة المزيد" : "Tap any location to learn more"}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mt-8 lg:mt-16 max-w-5xl mx-auto">
          {/* Continents */}
          <div className={`group relative overflow-hidden flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 sm:p-5 lg:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 transition-all duration-500 shadow-sm hover:shadow-xl hover:border-royal-azure/30 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "800ms" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-royal-azure/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-royal-azure to-true-cobalt flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="relative text-center sm:text-left">
              <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-royal-azure leading-none">
                <Counter end={4} isVisible={markersVisible} prefix="+" />
              </p>
              <p className={`text-[10px] sm:text-sm lg:text-base text-true-cobalt font-medium mt-0.5 sm:mt-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "قارات" : "Continents"}
              </p>
            </div>
          </div>

          {/* Clients */}
          <div className={`group relative overflow-hidden flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 sm:p-5 lg:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 transition-all duration-500 shadow-sm hover:shadow-xl hover:border-royal-azure/30 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "950ms" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-royal-azure/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-royal-azure to-true-cobalt flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="relative text-center sm:text-left">
              <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-royal-azure leading-none">
                <Counter end={85} isVisible={markersVisible} prefix="+" />
              </p>
              <p className={`text-[10px] sm:text-sm lg:text-base text-true-cobalt font-medium mt-0.5 sm:mt-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "عملاء" : "Clients"}
              </p>
            </div>
          </div>

          {/* Countries */}
          <div className={`group relative overflow-hidden flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 sm:p-5 lg:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 transition-all duration-500 shadow-sm hover:shadow-xl hover:border-royal-azure/30 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "1100ms" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-royal-azure/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-royal-azure to-true-cobalt flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
            <div className="relative text-center sm:text-left">
              <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-royal-azure leading-none">
                <Counter end={10} isVisible={markersVisible} prefix="+" />
              </p>
              <p className={`text-[10px] sm:text-sm lg:text-base text-true-cobalt font-medium mt-0.5 sm:mt-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "دولة" : "Countries"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
