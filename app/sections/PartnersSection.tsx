"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const partners = [
  { id: 1, name: "ZARA", color: "#000000" },
  { id: 2, name: "H&M", color: "#E50010" },
  { id: 3, name: "LEVI'S", color: "#C41230" },
  { id: 4, name: "NIKE", color: "#000000" },
  { id: 5, name: "ADIDAS", color: "#000000" },
  { id: 6, name: "UNIQLO", color: "#FF0000" },
  { id: 7, name: "GAP", color: "#000080" },
  { id: 8, name: "MANGO", color: "#000000" },
  { id: 9, name: "PRIMARK", color: "#0055A5" },
  { id: 10, name: "NEXT", color: "#000000" },
  { id: 11, name: "C&A", color: "#E30613" },
  { id: 12, name: "PULL&BEAR", color: "#000000" },
  { id: 13, name: "BERSHKA", color: "#000000" },
  { id: 14, name: "TOMMY", color: "#002D62" },
  { id: 15, name: "CK", color: "#000000" },
  { id: 16, name: "DIESEL", color: "#ED1C24" },
  { id: 17, name: "WRANGLER", color: "#003DA5" },
  { id: 18, name: "LEE", color: "#000000" },
  { id: 19, name: "GUESS", color: "#000000" },
  { id: 20, name: "PEPE JEANS", color: "#1C3664" },
];

export function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { dir } = useLanguage();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += dir === "rtl" ? -0.4 : 0.4;
      
      if (dir === "rtl") {
        if (scrollPosition <= -scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
      } else {
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
      }
      
      scrollContainer.scrollLeft = Math.abs(scrollPosition);
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [dir]);

  return (
    <section className="py-12 bg-white border-t border-b border-[#E5E7EB]">
      <div 
        ref={scrollRef}
        className={`flex gap-4 overflow-hidden items-center ${dir === "rtl" ? "flex-row-reverse" : ""}`}
        style={{ scrollBehavior: "auto" }}
      >
        {/* Duplicate partners for infinite scroll effect */}
        {[...partners, ...partners].map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            className="flex-shrink-0 px-8 py-5 bg-white rounded-2xl flex items-center justify-center border border-[#E5E7EB] hover:border-[#1A4AFF]/30 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            style={{ minWidth: "130px", height: "60px" }}
          >
            <span 
              className="font-semibold text-sm tracking-wide transition-all duration-300"
              style={{ 
                color: partner.color,
                fontFamily: "'Manrope', sans-serif"
              }}
            >
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
