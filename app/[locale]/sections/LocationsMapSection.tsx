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
}

const locations: Location[] = [
  {
    id: "usa",
    nameEn: "United States",
    nameAr: "الولايات المتحدة",
    descEn: "North America Partner",
    descAr: "شريك أمريكا الشمالية",
    country: "USA",
    countryAr: "أمريكا",
    x: 23,
    y: 43,
  },
  {
    id: "uk",
    nameEn: "United Kingdom",
    nameAr: "المملكة المتحدة",
    descEn: "European Partner",
    descAr: "الشريك الأوروبي",
    country: "UK",
    countryAr: "بريطانيا",
    x: 47,
    y: 29,
  },
  {
    id: "netherlands",
    nameEn: "Netherlands",
    nameAr: "هولندا",
    descEn: "European Partner",
    descAr: "الشريك الأوروبي",
    country: "Netherlands",
    countryAr: "هولندا",
    x: 49,
    y: 30,
  },
  {
    id: "germany",
    nameEn: "Germany",
    nameAr: "ألمانيا",
    descEn: "European Partner",
    descAr: "الشريك الأوروبي",
    country: "Germany",
    countryAr: "ألمانيا",
    x: 51,
    y: 31,
  },
  {
    id: "france",
    nameEn: "France",
    nameAr: "فرنسا",
    descEn: "European Partner",
    descAr: "الشريك الأوروبي",
    country: "France",
    countryAr: "فرنسا",
    x: 48,
    y: 33,
  },
  {
    id: "italy",
    nameEn: "Italy",
    nameAr: "إيطاليا",
    descEn: "European Partner",
    descAr: "الشريك الأوروبي",
    country: "Italy",
    countryAr: "إيطاليا",
    x: 52,
    y: 36,
  },
  {
    id: "spain",
    nameEn: "Spain",
    nameAr: "إسبانيا",
    descEn: "European Partner",
    descAr: "الشريك الأوروبي",
    country: "Spain",
    countryAr: "إسبانيا",
    x: 45,
    y: 37,
  },
  {
    id: "morocco",
    nameEn: "Morocco",
    nameAr: "المغرب",
    descEn: "North Africa Partner",
    descAr: "شريك شمال أفريقيا",
    country: "Morocco",
    countryAr: "المغرب",
    x: 46,
    y: 42,
  },
  {
    id: "egypt",
    nameEn: "Port Said, Egypt",
    nameAr: "بورسعيد، مصر",
    descEn: "Headquarters",
    descAr: "المقر الرئيسي",
    country: "Egypt",
    countryAr: "مصر",
    x: 55,
    y: 43,
    isHQ: true,
  },
  {
    id: "uae",
    nameEn: "United Arab Emirates",
    nameAr: "الإمارات العربية المتحدة",
    descEn: "Middle East Partner",
    descAr: "شريك الشرق الأوسط",
    country: "UAE",
    countryAr: "الإمارات",
    x: 61,
    y: 43,
  },
  {
    id: "australia",
    nameEn: "Australia",
    nameAr: "أستراليا",
    descEn: "Oceania Partner",
    descAr: "شريك أوقيانوسيا",
    country: "Australia",
    countryAr: "أستراليا",
    x: 83,
    y: 73,
  },
];

interface CounterProps {
  end: number;
  duration?: number;
  isVisible: boolean;
  prefix?: string;
}

function Counter({
  end,
  duration = 2000,
  isVisible,
  prefix = "",
}: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return (
    <span>
      {prefix}
      {count}
    </span>
  );
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

  const title = isRTL ? "شركاؤنا العالميون" : "Our Global Partners";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Delay markers animation
          setTimeout(() => setMarkersVisible(true), 500);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-8 lg:py-10 bg-alabaster-grey overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-true-cobalt mb-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            } ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
          >
            <TypewriterTitle text={title} isVisible={isVisible} />
          </h2>
          <p
            className={`text-true-cobalt/60 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            } ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
          >
            {isRTL
              ? "نخدم عملاءنا عبر القارات، ونبني علاقات دائمة قائمة على الثقة والجودة."
              : "We proudly serve clients across continents, building lasting relationships based on trust and quality."}
          </p>
        </div>

        {/* Map Container */}
        <div
          className={`relative transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto">
            {/* World Map SVG - Blue tinted */}
            <Image
              src="/map.svg"
              alt="World Map"
              fill
              className="object-contain"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(16%) sepia(60%) saturate(2000%) hue-rotate(210deg) brightness(90%) contrast(95%)",
                opacity: 0.25,
              }}
              priority
            />

            {/* Location Markers */}
            {locations.map((location, index) => (
              <div
                key={location.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 ${
                  markersVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                  transitionDelay: `${index * 150}ms`,
                }}
                onMouseEnter={() => setActiveLocation(location.id)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                {/* Pulse ring for HQ */}
                {location.isHQ && (
                  <span
                    className="absolute inset-0 w-12 h-12 -m-4 rounded-full border-2 border-royal-azure animate-ping opacity-30"
                    style={{ animationDuration: "2s" }}
                  />
                )}

                {/* Marker body - Pin shape like in the image */}
                <div
                  className={`relative cursor-pointer transition-all duration-300 ${
                    activeLocation === location.id
                      ? "scale-150"
                      : "hover:scale-125"
                  }`}
                >
                  {/* Pin SVG shape */}
                  <svg
                    width="24"
                    height="32"
                    viewBox="0 0 24 32"
                    fill="none"
                    className="drop-shadow-lg"
                    style={{ filter: "drop-shadow(0 4px 6px rgba(26, 74, 255, 0.4))" }}
                  >
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
                      fill="currentColor"
                      className="fill-true-cobalt"
                    />
                    <circle cx="12" cy="11" r="5" fill="white" />
                  </svg>
                </div>

                {/* Tooltip */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-4 px-4 py-2 bg-white rounded-xl shadow-xl border border-royal-azure/20 whitespace-nowrap transition-all duration-300 z-20 ${
                    activeLocation === location.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <p className={`text-sm font-bold text-true-cobalt ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? location.nameAr : location.nameEn}
                  </p>
                  <p className={`text-xs text-royal-azure ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? location.descAr : location.descEn}
                  </p>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12 max-w-5xl mx-auto`}>
          {/* Continents */}
          <div
            className={`flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 transition-all duration-200 shadow-sm hover:shadow-lg hover:border-royal-azure hover:scale-[1.02] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-royal-azure to-true-cobalt flex items-center justify-center flex-shrink-0">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p
                className={`text-3xl font-bold text-royal-azure leading-none`}
              >
                <Counter end={4} isVisible={markersVisible} prefix="+" />
              </p>
              <p
                className={`text-sm text-true-cobalt font-medium mt-1 ${
                  isRTL ? "font-[var(--font-cairo)]" : ""
                }`}
              >
                {isRTL ? "قارات" : "Continents"}
              </p>
            </div>
          </div>

          {/* Clients */}
          <div
            className={`flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 transition-all duration-200 shadow-sm hover:shadow-lg hover:border-royal-azure hover:scale-[1.02] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "950ms" }}
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-royal-azure to-true-cobalt flex items-center justify-center flex-shrink-0">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p
                className={`text-3xl font-bold text-royal-azure leading-none`}
              >
                <Counter end={85} isVisible={markersVisible} prefix="+" />
              </p>
              <p
                className={`text-sm text-true-cobalt font-medium mt-1 ${
                  isRTL ? "font-[var(--font-cairo)]" : ""
                }`}
              >
                {isRTL ? "عملاء" : "Clients"}
              </p>
            </div>
          </div>

          {/* Countries */}
          <div
            className={`flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 transition-all duration-200 shadow-sm hover:shadow-lg hover:border-royal-azure hover:scale-[1.02] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-royal-azure to-true-cobalt flex items-center justify-center flex-shrink-0">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
            </div>
            <div>
              <p
                className={`text-3xl font-bold text-royal-azure leading-none`}
              >
                <Counter end={10} isVisible={markersVisible} prefix="+" />
              </p>
              <p
                className={`text-sm text-true-cobalt font-medium mt-1 ${
                  isRTL ? "font-[var(--font-cairo)]" : ""
                }`}
              >
                {isRTL ? "دولة" : "Countries"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
