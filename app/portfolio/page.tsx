"use client";

import Image from "next/image";
import { Navbar, Footer, Chatbot } from "../components/layout";
import { useLanguage } from "../context/LanguageContext";

export default function PortfolioPage() {
  const { language, dir } = useLanguage();
  const isRTL = dir === "rtl";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header with Background Image */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
            alt="Portfolio Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#122D8B]/85" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`max-w-3xl ${isRTL ? "mr-0 ml-auto text-right" : ""}`}>
            <div className={`w-16 h-1 bg-[#1A4AFF] mb-8 ${isRTL ? "mr-0 ml-auto" : ""}`} />
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl text-white font-bold uppercase tracking-wide mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
            >
              {isRTL ? "أعمالنا" : "Our Portfolio"}
            </h1>
            <p className={`text-white/80 text-lg lg:text-xl leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL 
                ? "معرض لأعمالنا ومنتجاتنا المميزة. قريباً سنعرض المزيد من المشاريع."
                : "A showcase of our work and premium products. More projects coming soon."}
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-32 lg:py-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-8 border-2 border-[#D8DDE9] flex items-center justify-center">
              <svg className="w-12 h-12 text-[#122D8B]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2
              className={`text-3xl md:text-4xl text-[#122D8B] font-bold uppercase tracking-wide mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
            >
              {isRTL ? "قريباً" : "Coming Soon"}
            </h2>
            <p className={`text-[#122D8B]/60 text-lg max-w-md mx-auto ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL 
                ? "نعمل حالياً على تجميع معرض أعمالنا. تواصل معنا لمعرفة المزيد عن مشاريعنا السابقة."
                : "We're currently preparing our portfolio gallery. Contact us to learn more about our previous projects."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  );
}
