"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";
import { TypewriterTitle } from "../components/TypewriterTitle";

const partners = [
  { id: 1, name: "Partner 1", logo: "/assets/logos/1.png" },
  { id: 2, name: "Partner 2", logo: "/assets/logos/2.png" },
  { id: 3, name: "Partner 3", logo: "/assets/logos/3.png" },
  { id: 4, name: "Partner 4", logo: "/assets/logos/4.png" },
  { id: 5, name: "Partner 5", logo: "/assets/logos/5.png" },
  { id: 6, name: "Partner 6", logo: "/assets/logos/6.png" },
  { id: 7, name: "Partner 7", logo: "/assets/logos/7.png" },
  { id: 8, name: "Partner 8", logo: "/assets/logos/8.png" },
  { id: 9, name: "Partner 9", logo: "/assets/logos/9.png" },
  { id: 10, name: "Partner 10", logo: "/assets/logos/10.png" },
  { id: 11, name: "Partner 11", logo: "/assets/logos/11.png" },
];

// Calculate animation duration based on content width for consistent speed
// Logo card width (220px) + margin (20px) = 240px per logo
// 11 logos * 2 (half of 4 repeats) = 22 logos for half width
// Half width = 22 * 240 = 5280px
// Speed: 150px/second for smooth, consistent movement across all screens
const LOGO_WIDTH = 220;
const LOGO_MARGIN = 20;
const LOGO_COUNT = partners.length;
const HALF_WIDTH = LOGO_COUNT * 2 * (LOGO_WIDTH + LOGO_MARGIN);
const SPEED_PX_PER_SEC = 80;
const ANIMATION_DURATION = HALF_WIDTH / SPEED_PX_PER_SEC; // ~35 seconds

interface PartnersSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function PartnersSection({ locale }: PartnersSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const title = isRTL ? "موثوق عالمياً" : "Worldwide Trusted";

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

  return (
    <section ref={sectionRef} className="py-8 lg:py-10 bg-alabaster-grey overflow-hidden" dir="ltr">
      {/* Header */}
      <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-true-cobalt ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
          <TypewriterTitle text={title} isVisible={isVisible} />
        </h2>
      </div>

      {/* Infinite Logo Marquee */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-alabaster-grey to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-alabaster-grey to-transparent z-10 pointer-events-none" />
        
        <div className="overflow-hidden">
          <div 
            className="flex hover:[animation-play-state:paused]"
            style={{
              width: "max-content",
              animation: `marquee-ltr ${ANIMATION_DURATION}s linear infinite`,
            }}
          >
            {/* Repeat logos 4 times to fill screen completely */}
            {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
              <div 
                key={index}
                className="flex-shrink-0 bg-white rounded-2xl flex items-center justify-center p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                style={{ width: `${LOGO_WIDTH}px`, height: "120px", margin: `0 ${LOGO_MARGIN / 2}px` }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={180}
                  height={100}
                  className="object-contain max-h-[100px] w-auto transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
