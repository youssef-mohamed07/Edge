"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, Fragment } from "react";

interface Stat {
  number: string;
  label: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  isRTL: boolean;
  breadcrumbs?: { label: string; href?: string }[];
  stats?: Stat[];
  rotatingWords?: string[];
  rotatingWordIndex?: number;
}

// Parse number from string like "450,000" or "133"
function parseStatNumber(str: string): {
  value: number;
  suffix: string;
  hasComma: boolean;
} {
  const cleanStr = str.replace(/,/g, "");
  const match = cleanStr.match(/^(\d+)(.*)$/);
  if (match) {
    return {
      value: parseInt(match[1], 10),
      suffix: match[2] || "",
      hasComma: str.includes(","),
    };
  }
  return { value: 0, suffix: "", hasComma: false };
}

// Format number with commas
function formatNumber(num: number, hasComma: boolean): string {
  if (hasComma) {
    return num.toLocaleString("en-US");
  }
  return num.toString();
}

function AnimatedNumber({
  number,
  isVisible,
}: {
  number: string;
  isVisible: boolean;
}) {
  const { value, suffix, hasComma } = parseStatNumber(number);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setDisplayValue(0);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.min(Math.round(increment * step), value);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span>
      {formatNumber(displayValue, hasComma)}
      {suffix}
    </span>
  );
}

function RotatingWord({
  words,
  isVisible,
  index,
  isRTL,
}: {
  words: string[];
  isVisible: boolean;
  index: number;
  isRTL?: boolean;
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
      className={`inline-block transition-all duration-500 align-baseline ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <span className="relative inline-block overflow-hidden align-baseline">
        <span
          className="inline-block transition-all duration-300 ease-in-out text-white font-bold"
          style={{
            transform: isAnimating
              ? direction === "up"
                ? "translateY(-100%)"
                : "translateY(0)"
              : "translateY(0)",
            opacity: isAnimating && direction === "up" ? 0 : 1,
            fontFamily: isRTL ? "var(--font-cairo), sans-serif" : undefined,
          }}
        >
          {words[currentIndex]}
        </span>
      </span>
      &nbsp;
    </span>
  );
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
      className={`inline-block transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } `}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {word}&nbsp;
    </span>
  );
}

export function PageHero({
  title,
  subtitle,
  image,
  isRTL,
  breadcrumbs,
  stats,
  rotatingWords,
  rotatingWordIndex,
}: PageHeroProps) {
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isStatsInView, setIsStatsInView] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const titleWords = title.split(" ");
  const subtitleWords = subtitle ? subtitle.split(" ") : [];

  // Calculate total text animation duration
  const totalWords = titleWords.length + subtitleWords.length;
  const textAnimationDuration = 300 + totalWords * 60 + 500; // initial delay + words animation + buffer

  // Trigger text animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsTextVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Observe when stats section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Show stats only after text animation completes AND stats are in view
  useEffect(() => {
    if (isTextVisible && isStatsInView) {
      const timer = setTimeout(() => {
        setIsStatsVisible(true);
      }, textAnimationDuration - 300); // subtract initial delay since text is already visible
    }
  }, [isTextVisible, isStatsInView, textAnimationDuration]);

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
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Single Background Image for entire section with parallax */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 h-[130%]"
          style={{ transform: `translateY(${scrollY}px)` }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[#122D8B]/85" />
      </div>

      {/* Hero Content */}
      <div
        className={`relative z-10 ${
          stats ? "py-24 lg:py-36" : "py-28 lg:py-44"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            className={`max-w-4xl ${isRTL ? "mr-0 ml-auto text-right" : ""}`}
          >
            {/* Breadcrumb */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav
                className={`flex items-center gap-2 mb-6 text-sm transition-all duration-500 ${
                  isTextVisible ? "opacity-100" : "opacity-0"
                } ${isRTL ? "flex-row-reverse justify-end" : ""}`}
              >
                {breadcrumbs.map((crumb, index) => (
                  <span
                    key={index}
                    className={`flex items-center gap-2 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    {index > 0 && (
                      <svg
                        className={`w-4 h-4 text-white/50 ${
                          isRTL ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className={`text-white/70 hover:text-white transition-colors ${
                          isRTL ? "font-[var(--font-cairo)]" : ""
                        }`}
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={`text-white ${
                          isRTL ? "font-[var(--font-cairo)]" : ""
                        }`}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            <h1
              className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              {rotatingWords && rotatingWordIndex !== undefined ? (
                <>
                  {isRTL ? (
                    <>
                      {/* RTL: Static words first */}
                      <div className="leading-tight">
                        {titleWords.map((word, index) => {
                          if (index === rotatingWordIndex) return null;
                          return (
                            <AnimatedWord
                              key={index}
                              word={word}
                              index={index}
                              isVisible={isTextVisible}
                            />
                          );
                        })}
                      </div>
                      {/* RTL: Rotating word second */}
                      <div className="leading-tight">
                        <RotatingWord
                          words={rotatingWords}
                          isVisible={isTextVisible}
                          index={rotatingWordIndex}
                          isRTL={isRTL}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* LTR: Rotating word first */}
                      <div className="leading-tight">
                        <RotatingWord
                          words={rotatingWords}
                          isVisible={isTextVisible}
                          index={rotatingWordIndex}
                          isRTL={isRTL}
                        />
                      </div>
                      {/* LTR: Static words second */}
                      <div className="leading-tight">
                        {titleWords.map((word, index) => {
                          if (index === rotatingWordIndex) return null;
                          return (
                            <AnimatedWord
                              key={index}
                              word={word}
                              index={index}
                              isVisible={isTextVisible}
                            />
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="leading-tight">
                  {titleWords.map((word, index) => (
                    <AnimatedWord
                      key={index}
                      word={word}
                      index={index}
                      isVisible={isTextVisible}
                    />
                  ))}
                </div>
              )}
            </h1>

            {subtitle && (
              <p
                className={`text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl ${
                  isRTL ? "font-[var(--font-cairo)]" : ""
                }`}
              >
                {subtitleWords.map((word, index) => (
                  <AnimatedWord
                    key={index}
                    word={word}
                    index={index + titleWords.length}
                    isVisible={isTextVisible}
                  />
                ))}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section - Integrated seamlessly */}
      {stats && stats.length > 0 && (
        <div ref={statsRef} className="relative z-10 py-10 lg:py-14">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center transition-all duration-700 ${
                    isStatsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-4xl md:text-5xl text-white font-bold mb-2">
                    <AnimatedNumber
                      number={stat.number}
                      isVisible={isStatsVisible}
                    />
                  </div>
                  <div
                    className={`text-white/60 text-sm uppercase tracking-wide ${
                      isRTL ? "font-[var(--font-cairo)]" : ""
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
