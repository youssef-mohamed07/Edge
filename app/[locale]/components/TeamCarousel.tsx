"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { TypewriterTitle } from "./TypewriterTitle";

interface TeamMember {
  name: string;
  role: string;
  image: string | null;
}

interface TeamCarouselProps {
  members: TeamMember[];
  isRTL: boolean;
  title: string;
  subtitle?: string;
}

export function TeamCarousel({
  members,
  isRTL,
  title,
  subtitle,
}: TeamCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeMember = members[activeIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
    <section ref={sectionRef} className="py-8 lg:py-10 bg-alabaster-grey overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center`}
        >
          {/* Text Content - Left side for RTL, Right side for LTR */}
          <div className={`${isRTL ? "text-right lg:order-1" : "lg:order-1"} transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${isRTL ? "translate-x-12" : "-translate-x-12"}`}`}>
            {subtitle && (
              <p
                className={`text-royal-azure font-semibold mb-3 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              >
                {subtitle}
              </p>
            )}
            <div className="mb-8">
              <TypewriterTitle
                text={title}
                isVisible={isVisible}
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-true-cobalt leading-tight ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              />
            </div>

            {/* Active Member Card with Image */}
            <div
              className={`inline-flex items-center gap-5 p-5 bg-white rounded-2xl shadow-lg border border-true-cobalt/5 transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
            >
              {/* Text */}
              <div className={isRTL ? "text-right" : ""}>
                <h3
                  className={`text-xl font-bold text-true-cobalt mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                >
                  {activeMember?.name}
                </h3>
                <p
                  className={`text-royal-azure font-medium text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                >
                  {activeMember?.role}
                </p>
              </div>
              {/* Member Image - always on right of text */}
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                {activeMember?.image ? (
                  <Image
                    src={activeMember.image}
                    alt={activeMember.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-true-cobalt to-royal-azure flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {activeMember?.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Dots */}
            <div
              className={`flex items-center gap-3 mt-8 ${isRTL ? "justify-end" : ""}`}
            >
              {members.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                    index === activeIndex
                      ? "w-8 min-w-[32px] max-w-[32px] bg-royal-azure"
                      : "w-2.5 min-w-[10px] max-w-[10px] bg-true-cobalt/20 hover:bg-true-cobalt/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Team Cards - Right side for RTL, Left side for LTR */}
          <div
            className={`flex items-center justify-center gap-3 md:gap-4 h-[360px] md:h-[470px] lg:order-2 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${isRTL ? "-translate-x-12" : "translate-x-12"}`}`}
            style={{
              flexDirection: isRTL ? "row" : "row",
            }}
          >
            {members.map((member, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="relative overflow-hidden shadow-lg rounded-2xl hover:shadow-2xl"
                  style={{
                    width: isActive ? "280px" : "85px",
                    height: isActive ? "450px" : "380px",
                    filter: isActive ? "none" : "grayscale(100%)",
                    transition: "width 0.4s ease, height 0.4s ease, filter 0.4s ease, box-shadow 0.3s ease",
                    zIndex: isActive ? 10 : 1,
                    borderRadius: isActive ? "24px" : "16px",
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Image */}
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500"
                      style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-true-cobalt to-royal-azure flex items-center justify-center">
                      <span
                        className="text-white font-bold transition-all duration-300"
                        style={{
                          fontSize: isActive ? "3.5rem" : "1.25rem",
                        }}
                      >
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      background: isActive
                        ? "linear-gradient(to top, rgba(18, 45, 139, 0.8), transparent, transparent)"
                        : "rgba(18, 45, 139, 0.3)",
                    }}
                  />

                  {/* Content - Only show on active */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-300"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(16px)",
                    }}
                  >
                    <h3
                      className={`text-base md:text-lg font-bold text-white mb-0.5 ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`text-white/70 text-xs ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}
                    >
                      {member.role}
                    </p>
                  </div>

                  {/* Vertical Name - Only show on inactive */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                    style={{
                      opacity: isActive ? 0 : 1,
                    }}
                  >
                    <p
                      className="text-white font-semibold text-[10px] md:text-xs tracking-wide whitespace-nowrap"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {member.name.split(" ")[0]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
