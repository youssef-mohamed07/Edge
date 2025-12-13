"use client";

import { ArrowRightIcon } from "../components/Icons";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export function HeroSection() {
  const { t, dir } = useLanguage();
  
  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{
        minHeight: "90vh",
        backgroundImage: `
          linear-gradient(rgba(18, 45, 139, 0.5), rgba(18, 45, 139, 0.55)),
          url('/hero-factory.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-24 pb-20">
        {/* Accent Line */}
        <div className="w-16 h-1 bg-[#1A4AFF] mb-8 mx-auto" />

        <h1
          className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-8 font-extrabold uppercase ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}
          style={{ 
            fontFamily: dir === "rtl" ? "var(--font-cairo), sans-serif" : "'Manrope', sans-serif",
            textShadow: "0 4px 30px rgba(0,0,0,0.3)",
            letterSpacing: dir === "rtl" ? "0" : "0.02em"
          }}
        >
          {t("hero.title")}
        </h1>

        <p 
          className={`text-white/90 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
        >
          {t("hero.subtitle")}
        </p>

        <Link
          href="/products"
          className={`inline-flex items-center justify-center px-10 py-4 text-sm font-semibold tracking-wide text-white rounded-full transition-all duration-300 hover:scale-105 ${dir === "rtl" ? "flex-row-reverse font-[var(--font-cairo)]" : ""}`}
          style={{
            background: "linear-gradient(135deg, #1A4AFF 0%, #3D5AFE 100%)",
            boxShadow: "0 4px 25px rgba(26, 74, 255, 0.4)",
          }}
        >
          {t("hero.cta")}
          <ArrowRightIcon className={`w-5 h-5 ${dir === "rtl" ? "mr-2 rotate-180" : "ml-2"}`} />
        </Link>
      </div>
    </section>
  );
}
