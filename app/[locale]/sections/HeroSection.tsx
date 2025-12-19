"use client";

import Link from "next/link";
import { useEffect, useState, useRef, Fragment } from "react";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

function AnimatedWord({
  word,
  index,
  isVisible,
}: {
  word: string;
  index: number;
  isVisible: boolean;
}) {
  return (
    <span
      className={`inline-block transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {word}&nbsp;
    </span>
  );
}

function RotatingWord({
  words,
  isVisible,
  index,
}: {
  words: string[];
  isVisible: boolean;
  index: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setDirection("up");

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setDirection("down");

        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, words.length]);

  return (
    <span
      className={`inline-block transition-all duration-700 align-baseline  ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <span className="relative inline-block overflow-hidden align-baseline">
        <span
          className="inline-block transition-all duration-300 ease-in-out bg-linear-to-r from-[#1A4AFF] via-[#4F7FFF] to-[#1A4AFF] bg-clip-text text-transparent"
          style={{
            transform: isAnimating
              ? direction === "up"
                ? "translateY(-100%)"
                : "translateY(0)"
              : "translateY(0)",
            opacity: isAnimating && direction === "up" ? 0 : 1,
            textShadow: "none",
            WebkitBackgroundClip: "text",
          }}
        >
          {words[currentIndex]}
        </span>
      </span>
      &nbsp;
    </span>
  );
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const titleWords = dict.hero.title.split(" ");
  const subtitleWords = dict.hero.subtitle.split(" ");

  // Words to rotate through for the "Quality" word
  const rotatingWords = isRTL
    ? ["عالية", "موثوقة", "دقيقة"]
    : ["Quality", "Reliability", "Trust"];

  // Find the index of "Quality" or equivalent word to replace with rotating animation
  const qualityWordIndex = titleWords.findIndex(
    (word) =>
      word.toLowerCase() === "quality" || word === "عالية" || word === "الجودة"
  );

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY * 0.4);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center text-center overflow-hidden"
      style={{ minHeight: "90vh" }}
    >
      {/* Background with Parallax */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 h-[130%]"
          style={{
            transform: `translateY(${scrollY}px)`,
            backgroundImage: `url('/hero-factory.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-[#122D8B]/55" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 pt-24 pb-20">
        {/* Accent Line */}
        <div
          className={`w-16 h-1 bg-[#1A4AFF] mb-8 mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        />

        <h1
          className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-normal mb-4 font-extrabold uppercase ${
            isRTL ? "font-(--font-cairo)" : ""
          }`}
          style={{
            fontFamily: isRTL
              ? "var(--font-cairo), sans-serif"
              : "'Manrope', sans-serif",
            textShadow: "0 4px 30px rgba(0,0,0,0.3)",
            letterSpacing: isRTL ? "0" : "0.02em",
          }}
        >
          {titleWords.map((word, index) => {
            if (index === qualityWordIndex) {
              return (
                <Fragment key={index}>
                  <br />
                  <RotatingWord
                    words={rotatingWords}
                    isVisible={isVisible}
                    index={index}
                  />
                </Fragment>
              );
            }
            return (
              <AnimatedWord
                key={index}
                word={word}
                index={index}
                isVisible={isVisible}
              />
            );
          })}
        </h1>

        <Link
          href={`/${locale}/contact`}
          className={`inline-flex items-center justify-center gap-2 px-10 py-4 text-sm font-semibold tracking-wide border-2 border-white text-white rounded-full ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${isRTL ? "font-(--font-cairo)" : ""}`}
          style={{
            transition: isVisible ? "all 0.3s ease" : "all 0.7s ease",
            transitionDelay: isVisible
              ? "0s"
              : `${(titleWords.length + subtitleWords.length) * 150 + 300}ms`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.color = "#122D8B";
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {dict.hero.cta}
        </Link>
      </div>
    </section>
  );
}
