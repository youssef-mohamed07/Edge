"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface FactoryCapacitySectionProps {
  isRTL: boolean;
}

type TabKey = "cutting" | "sewing" | "laundry" | "finishing";

interface TabData {
  key: TabKey;
  label: { en: string; ar: string };
  icon: React.ReactNode;
  image: string;
  stats: Array<{
    value: string;
    label: { en: string; ar: string };
  }>;
}

const ScissorsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 md:w-9 md:h-9">
    <path d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
  </svg>
);

const SewingMachineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 md:w-9 md:h-9">
    <rect x="2" y="12" width="20" height="8" rx="1" />
    <path d="M6 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
    <circle cx="12" cy="16" r="2" />
    <path d="M12 6V3" />
    <path d="M9 3h6" />
  </svg>
);

const LaundryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 md:w-9 md:h-9">
    <rect x="3" y="2" width="18" height="20" rx="2" />
    <circle cx="12" cy="13" r="5" />
    <path d="M12 8v2M8 6h8" />
    <circle cx="7" cy="5" r="1" fill="currentColor" />
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 md:w-9 md:h-9">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
  </svg>
);

const tabsData: TabData[] = [
  {
    key: "cutting",
    label: { en: "CUTTING", ar: "القص" },
    icon: <ScissorsIcon />,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    stats: [
      { value: "8", label: { en: "Cutting tables", ar: "طاولات قص" } },
      { value: "8", label: { en: "Manual cutters", ar: "قصاصات يدوية" } },
      { value: "37", label: { en: "Employees", ar: "موظف" } },
      { value: "10,000", label: { en: "Garments daily capacity", ar: "قطعة يومياً" } },
    ],
  },
  {
    key: "sewing",
    label: { en: "SEWING", ar: "الخياطة" },
    icon: <SewingMachineIcon />,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
    stats: [
      { value: "8", label: { en: "Sewing lines", ar: "خطوط خياطة" } },
      { value: "8", label: { en: "Back pocket automats", ar: "ماكينات جيوب أوتوماتيك" } },
      { value: "836", label: { en: "Sewing operators", ar: "عامل خياطة" } },
      { value: "10,000", label: { en: "Daily sewing capacity", ar: "قطعة يومياً" } },
    ],
  },
  {
    key: "laundry",
    label: { en: "LAUNDRY", ar: "الغسيل" },
    icon: <LaundryIcon />,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    stats: [
      { value: "6", label: { en: "Washing machines", ar: "ماكينات غسيل" } },
      { value: "4", label: { en: "Dryers", ar: "مجففات" } },
      { value: "45", label: { en: "Operators", ar: "عامل" } },
      { value: "8,000", label: { en: "Daily washing capacity", ar: "قطعة يومياً" } },
    ],
  },
  {
    key: "finishing",
    label: { en: "FINISHING & PACKING", ar: "التشطيب والتغليف" },
    icon: <PackageIcon />,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    stats: [
      { value: "8", label: { en: "Packing lines", ar: "خطوط تغليف" } },
      { value: "280", label: { en: "Operators", ar: "عامل" } },
      { value: "10,000", label: { en: "Daily packing capacity", ar: "قطعة يومياً" } },
      { value: "100%", label: { en: "Quality inspection", ar: "فحص جودة" } },
    ],
  },
];

export function FactoryCapacitySection({ isRTL }: FactoryCapacitySectionProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("cutting");
  const [direction, setDirection] = useState<"left" | "right">("right");
  const contentRef = useRef<HTMLDivElement>(null);

  const activeData = tabsData.find((tab) => tab.key === activeTab)!;
  const currentIndex = tabsData.findIndex((t) => t.key === activeTab);

  const changeTab = (newTab: TabKey, dir?: "left" | "right") => {
    if (newTab !== activeTab) {
      const newIndex = tabsData.findIndex(t => t.key === newTab);
      setDirection(dir || (newIndex > currentIndex ? "right" : "left"));
      setActiveTab(newTab);
    }
  };

  const goToPrev = () => {
    const prevIndex = currentIndex === 0 ? tabsData.length - 1 : currentIndex - 1;
    changeTab(tabsData[prevIndex].key, "left");
  };

  const goToNext = () => {
    const nextIndex = currentIndex === tabsData.length - 1 ? 0 : currentIndex + 1;
    changeTab(tabsData[nextIndex].key, "right");
  };

  return (
    <section className="py-20 lg:py-28 bg-alabaster-grey overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-true-cobalt mb-5 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "طاقة المصنع" : "Factory Capacity"}
          </h2>
          <p className={`text-gray-600 text-lg max-w-2xl mx-auto ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL
              ? "نمتلك طاقة إنتاجية عالية مع أحدث المعدات والكوادر المدربة"
              : "High production capacity with state-of-the-art equipment and trained workforce"}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-14" dir={isRTL ? "rtl" : "ltr"}>
          <div className="relative inline-flex items-center bg-[#e9eef5] rounded-full py-8 px-10 md:px-14">
            {/* Connection Line - Behind circles, from center of first to center of last */}
            <div 
              className="absolute h-[2px] bg-gray-300 -mt-3"
              style={{
                top: '50%',
                left: 'calc(40px + 32px)',
                right: 'calc(40px + 32px)',
              }}
            />
            
            <div className="flex items-center gap-16 md:gap-24 lg:gap-32">
              {tabsData.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => changeTab(tab.key)}
                  className="flex flex-col items-center group relative z-10"
                >
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500 ease-out ${
                      activeTab === tab.key
                        ? "bg-true-cobalt text-white shadow-xl"
                        : "bg-white text-gray-400 hover:text-gray-500 shadow-sm"
                    }`}
                  >
                    {tab.icon}
                  </div>
                  <span
                    className={`mt-4 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-500 whitespace-nowrap ${
                      activeTab === tab.key ? "text-true-cobalt" : "text-gray-400"
                    } ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                  >
                    {isRTL ? tab.label.ar : tab.label.en}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="relative h-72 md:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg">
                {tabsData.map((tab) => (
                  <div
                    key={tab.key}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      activeTab === tab.key
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  >
                    <Image
                      src={tab.image}
                      alt={isRTL ? tab.label.ar : tab.label.en}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              
              {/* Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-[calc(100%+100px)] -left-[50px]">
                <button
                  onClick={goToPrev}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-true-cobalt hover:shadow-xl hover:scale-110 transition-all duration-300 active:scale-95"
                  aria-label="Previous"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-true-cobalt hover:shadow-xl hover:scale-110 transition-all duration-300 active:scale-95"
                  aria-label="Next"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                  </svg>
                </button>
              </div>

              {/* Step indicator */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {tabsData.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => changeTab(tab.key)}
                    className={`h-2 rounded-full transition-all duration-500 ease-out ${
                      activeTab === tab.key 
                        ? "bg-true-cobalt w-8" 
                        : "bg-gray-300 hover:bg-gray-400 w-2"
                    }`}
                    aria-label={isRTL ? tab.label.ar : tab.label.en}
                  />
                ))}
              </div>
            </div>

            {/* Text Content */}
            <div ref={contentRef} className={`relative ${isRTL ? "text-right" : ""}`}>
              {tabsData.map((tab, tabIndex) => (
                <div
                  key={tab.key}
                  className={`transition-all duration-500 ease-out ${
                    activeTab === tab.key
                      ? "opacity-100 translate-y-0 relative"
                      : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                  }`}
                >
                  {/* Category Title */}
                  <div className="mb-8">
                    <span className={`text-sm font-semibold text-true-cobalt/60 uppercase tracking-wider ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? `الخطوة ${tabIndex + 1} من ${tabsData.length}` : `Step ${tabIndex + 1} of ${tabsData.length}`}
                    </span>
                    <h3
                      className={`text-4xl md:text-5xl font-bold text-gray-900 mt-2 ${
                        isRTL ? "font-[var(--font-cairo)]" : ""
                      }`}
                    >
                      {isRTL ? tab.label.ar : tab.label.en}
                    </h3>
                  </div>

                  {/* Stats List */}
                  <div className="space-y-4">
                    {tab.stats.map((stat, index) => (
                      <div
                        key={stat.label.en}
                        className={`flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 ${isRTL ? "flex-row-reverse justify-end" : ""}`}
                        style={{
                          transitionDelay: activeTab === tab.key ? `${index * 75}ms` : "0ms"
                        }}
                      >
                        <span className={`text-3xl md:text-4xl font-bold text-true-cobalt ${isRTL ? "" : "min-w-[100px]"}`}>
                          {stat.value}
                        </span>
                        <span className={`text-gray-600 text-base md:text-lg ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                          {isRTL ? stat.label.ar : stat.label.en}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
