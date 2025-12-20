"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getDirection, type Locale } from "../../i18n/config";

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
    id: "egypt",
    nameEn: "Port Said, Egypt",
    nameAr: "بورسعيد، مصر",
    descEn: "Headquarters",
    descAr: "المقر الرئيسي",
    country: "Egypt",
    countryAr: "مصر",
    // Port Said - northeast Egypt on Mediterranean
    x: 55.3,
    y: 43.5,
    isHQ: true,
  },
  {
    id: "france",
    nameEn: "Paris, France",
    nameAr: "باريس، فرنسا",
    descEn: "European Partner",
    descAr: "الشريك الأوروبي",
    country: "France",
    countryAr: "فرنسا",
    // Paris - northern France
    x: 47.5,
    y: 33,
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
      className="py-8 lg:py-10 bg-[#F8F9FB] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] mb-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            } ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
          >
            {isRTL ? "شركاؤنا العالميون" : "Our Global Partners"}
          </h2>
          <p
            className={`text-[#122D8B]/60 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
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
                  transitionDelay: `${index * 300}ms`,
                }}
                onMouseEnter={() => setActiveLocation(location.id)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                {/* Outer pulse ring */}
                <span
                  className="absolute inset-0 w-16 h-16 -m-5 rounded-full border-2 border-[#1A4AFF] animate-ping opacity-30"
                  style={{ animationDuration: "2s" }}
                />

                {/* Middle pulse ring */}
                <span
                  className="absolute inset-0 w-12 h-12 -m-3 rounded-full bg-[#1A4AFF] animate-ping opacity-20"
                  style={{ animationDuration: "1.5s", animationDelay: "0.5s" }}
                />

                {/* Marker body */}
                <div
                  className={`relative cursor-pointer transition-all duration-300 ${
                    activeLocation === location.id
                      ? "scale-150"
                      : "hover:scale-125"
                  }`}
                >
                  {/* Pin shape */}
                  <div
                    className="w-6 h-6 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br from-[#1A4AFF] to-[#122D8B]"
                    style={{ boxShadow: "0 4px 15px rgba(26, 74, 255, 0.5)" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  {/* Pin tail */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-[#122D8B]"
                    style={{ marginTop: "-3px" }}
                  />
                </div>

                {/* Tooltip - Statistics Card */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-8 px-6 py-4 bg-white rounded-2xl shadow-xl border border-[#1A4AFF]/20 whitespace-nowrap transition-all duration-300 z-20 ${
                    activeLocation === location.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="flex gap-6">
                    {/* Continents */}
                    <div
                      className={`text-center ${
                        isRTL ? "font-[var(--font-cairo)]" : ""
                      }`}
                    >
                      <p className="text-2xl font-bold text-[#1A4AFF]">
                        <Counter
                          end={4}
                          isVisible={activeLocation === location.id}
                          prefix="+"
                        />
                      </p>
                      <p className="text-xs text-[#122D8B] font-medium">
                        {isRTL ? "قارات" : "Continents"}
                      </p>
                    </div>
                    {/* Clients */}
                    <div
                      className={`text-center ${
                        isRTL ? "font-[var(--font-cairo)]" : ""
                      }`}
                    >
                      <p className="text-2xl font-bold text-[#1A4AFF]">
                        <Counter
                          end={85}
                          isVisible={activeLocation === location.id}
                          prefix="+"
                        />
                      </p>
                      <p className="text-xs text-[#122D8B] font-medium">
                        {isRTL ? "عملاء" : "Clients"}
                      </p>
                    </div>
                    {/* Countries */}
                    <div
                      className={`text-center ${
                        isRTL ? "font-[var(--font-cairo)]" : ""
                      }`}
                    >
                      <p className="text-2xl font-bold text-[#1A4AFF]">
                        <Counter
                          end={30}
                          isVisible={activeLocation === location.id}
                          prefix="+"
                        />
                      </p>
                      <p className="text-xs text-[#122D8B] font-medium">
                        {isRTL ? "دولة" : "Countries"}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white" />
                </div>
              </div>
            ))}

            {/* Connection line with animation */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-5"
              preserveAspectRatio="none"
            >
              {/* Glow effect */}
              <line
                x1={`${locations[0].x}%`}
                y1={`${locations[0].y}%`}
                x2={`${locations[1].x}%`}
                y2={`${locations[1].y}%`}
                stroke="#1A4AFF"
                strokeWidth="6"
                strokeLinecap="round"
                className={`transition-all duration-1000 blur-sm ${
                  markersVisible ? "opacity-30" : "opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              />
              {/* Main line */}
              <line
                x1={`${locations[0].x}%`}
                y1={`${locations[0].y}%`}
                x2={`${locations[1].x}%`}
                y2={`${locations[1].y}%`}
                stroke="#1A4AFF"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                strokeLinecap="round"
                className={`transition-all duration-1000 ${
                  markersVisible ? "opacity-70" : "opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              />
            </svg>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12 max-w-5xl mx-auto`}>
          {/* Continents */}
          <div
            className={`flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 transition-all duration-200 shadow-sm hover:shadow-lg hover:border-[#1A4AFF] hover:scale-[1.02] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1A4AFF] to-[#122D8B] flex items-center justify-center flex-shrink-0">
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
                className={`text-3xl font-bold text-[#1A4AFF] leading-none`}
              >
                <Counter end={4} isVisible={markersVisible} prefix="+" />
              </p>
              <p
                className={`text-sm text-[#122D8B] font-medium mt-1 ${
                  isRTL ? "font-[var(--font-cairo)]" : ""
                }`}
              >
                {isRTL ? "قارات" : "Continents"}
              </p>
            </div>
          </div>

          {/* Clients */}
          <div
            className={`flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 transition-all duration-200 shadow-sm hover:shadow-lg hover:border-[#1A4AFF] hover:scale-[1.02] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "950ms" }}
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1A4AFF] to-[#122D8B] flex items-center justify-center flex-shrink-0">
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
                className={`text-3xl font-bold text-[#1A4AFF] leading-none`}
              >
                <Counter end={85} isVisible={markersVisible} prefix="+" />
              </p>
              <p
                className={`text-sm text-[#122D8B] font-medium mt-1 ${
                  isRTL ? "font-[var(--font-cairo)]" : ""
                }`}
              >
                {isRTL ? "عملاء" : "Clients"}
              </p>
            </div>
          </div>

          {/* Countries */}
          <div
            className={`flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 transition-all duration-200 shadow-sm hover:shadow-lg hover:border-[#1A4AFF] hover:scale-[1.02] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1A4AFF] to-[#122D8B] flex items-center justify-center flex-shrink-0">
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
                className={`text-3xl font-bold text-[#1A4AFF] leading-none`}
              >
                <Counter end={30} isVisible={markersVisible} prefix="+" />
              </p>
              <p
                className={`text-sm text-[#122D8B] font-medium mt-1 ${
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
