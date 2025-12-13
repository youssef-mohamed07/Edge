"use client";

import { useLanguage } from "@/app/context/LanguageContext";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true, light = false }: SectionHeaderProps) {
  const { dir } = useLanguage();
  
  return (
    <div className={`mb-16 ${centered ? "text-center" : dir === "rtl" ? "text-right" : ""}`}>
      <div className={`w-12 h-1 bg-[#1A4AFF] mb-6 ${centered ? "mx-auto" : dir === "rtl" ? "mr-0 ml-auto" : ""}`} />
      <h2
        className={`text-3xl md:text-4xl mb-4 font-bold uppercase tracking-wide ${
          light ? "text-white" : "text-[#122D8B]"
        } ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}
        style={{ fontFamily: dir === "rtl" ? "var(--font-cairo), sans-serif" : "'Arial Black', 'Bebas Neue', sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl ${centered ? "mx-auto" : ""} ${light ? "text-white/70" : "text-[#122D8B]/70"} ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
