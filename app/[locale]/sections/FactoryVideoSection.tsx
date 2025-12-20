"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getDirection, type Locale } from "../../i18n/config";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface FactoryVideoSectionProps {
  locale: Locale;
}

export function FactoryVideoSection({ locale }: FactoryVideoSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const title = isRTL ? "زُر مصنعنا" : "Visit our factory";
  const videoId = "P2my3iEba4k";

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
    <section ref={sectionRef} className="py-8 lg:py-10 bg-[#D8DDE9]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            <TypewriterTitle text={title} isVisible={isVisible} />
          </h2>
        </div>

        {/* Video Container */}
        <div 
          className={`relative aspect-video rounded-3xl overflow-hidden transition-all duration-1000 delay-200 shadow-xl ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {!isPlaying ? (
            <>
              {/* YouTube Thumbnail */}
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Factory Tour Video"
                fill
                className="object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#122D8B]/30" />
              
              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#122D8B] rounded-full flex items-center justify-center shadow-2xl group-hover:bg-[#1A4AFF] group-hover:scale-110 transition-all duration-300">
                  <svg 
                    className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </>
          ) : (
            /* Video iframe */
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Factory Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
}
