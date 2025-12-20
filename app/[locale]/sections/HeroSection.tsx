"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

function TypewriterText({
  text,
  isVisible,
  delay = 0,
  className = "",
}: {
  text: string;
  isVisible: boolean;
  delay?: number;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const startDelay = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 80);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [isVisible, text, delay]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
}

function RotatingWord({
  words,
  isVisible,
  delay = 0,
}: {
  words: string[];
  isVisible: boolean;
  delay?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const startDelay = setTimeout(() => setStartAnimation(true), delay);
    return () => clearTimeout(startDelay);
  }, [isVisible, delay]);

  useEffect(() => {
    if (!startAnimation) return;

    const currentWord = words[currentIndex];

    if (!isDeleting) {
      // Typing
      if (displayedText.length < currentWord.length) {
        setIsTyping(true);
        const timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, wait then start deleting
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting
      if (displayedText.length > 0) {
        setIsTyping(true);
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, [startAnimation, displayedText, isDeleting, currentIndex, words]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="bg-gradient-to-r from-[#1A4AFF] via-[#4F7FFF] to-[#1A4AFF] bg-clip-text text-transparent">
      {displayedText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity text-[#1A4AFF]`}>|</span>
    </span>
  );
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const subtitleWords = dict.hero.subtitle.split(" ");

  // Words to rotate through
  const rotatingWords = isRTL
    ? ["الجودة", "الموثوقية", "الثقة"]
    : ["Quality", "Reliability", "Trust"];

  // Static title parts
  const titlePart1 = isRTL ? "صناعة الملابس" : "CRAFTING";
  const titlePart2 = isRTL ? "بـ" : "GARMENTS WITH";

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
          <TypewriterText text={titlePart1} isVisible={isVisible} delay={500} />
          <br />
          <TypewriterText text={titlePart2} isVisible={isVisible} delay={1500} />
          <br />
          <RotatingWord words={rotatingWords} isVisible={isVisible} delay={2500} />
        </h1>

        <Link
          href={`/${locale}/contact`}
          className={`inline-flex items-center justify-center gap-2 px-10 py-4 text-sm font-semibold tracking-wide border-2 border-white text-white rounded-full transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${isRTL ? "font-(--font-cairo)" : ""}`}
          style={{
            transitionDelay: isVisible ? "0s" : "3500ms",
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
