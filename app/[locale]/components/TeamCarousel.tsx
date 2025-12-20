"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string | null;
}

interface TeamCarouselProps {
  members: TeamMember[];
  isRTL: boolean;
  title: string;
  subtitle: string;
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
    <section ref={sectionRef} className="py-8 lg:py-10 bg-[#F8F9FB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center`}
        >
          {/* Text Content - Left side for RTL, Right side for LTR */}
          <div className={`${isRTL ? "text-right lg:order-1" : "lg:order-1"} transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${isRTL ? "translate-x-12" : "-translate-x-12"}`}`}>
            <p
              className={`text-[#1A4AFF] font-semibold mb-3 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
            >
              {subtitle}
            </p>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#122D8B] mb-6 leading-tight ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
            >
              {title}
            </h2>
            <p
              className={`text-[#122D8B]/60 text-lg mb-8 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
            >
              {isRTL
                ? "فريقنا من الخبراء المتخصصين يعملون معاً لتقديم أفضل المنتجات والخدمات لعملائنا."
                : "Our team of dedicated experts work together to deliver the best products and services to our clients."}
            </p>

            {/* Active Member Card with Image */}
            <div
              className={`inline-flex items-center gap-5 p-5 bg-white rounded-2xl shadow-lg border border-[#122D8B]/5 transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
            >
              {/* Text */}
              <div className={isRTL ? "text-right" : ""}>
                <h3
                  className={`text-xl font-bold text-[#122D8B] mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                >
                  {activeMember?.name}
                </h3>
                <p
                  className={`text-[#1A4AFF] font-medium text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
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
                  <div className="w-full h-full bg-gradient-to-br from-[#122D8B] to-[#1A4AFF] flex items-center justify-center">
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
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-[#1A4AFF]"
                      : "w-2.5 bg-[#122D8B]/20 hover:bg-[#122D8B]/40"
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
                  className="relative cursor-pointer overflow-hidden shadow-lg rounded-2xl hover:shadow-2xl"
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
                    <div className="absolute inset-0 bg-gradient-to-br from-[#122D8B] to-[#1A4AFF] flex items-center justify-center">
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
