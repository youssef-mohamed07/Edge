"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FabricInspectionIcon,
  CuttingIcon,
  SewingIcon,
  WashingIcon,
  EmbroideryIcon,
  PackagingIcon,
  RnDIcon,
  CustomDesignIcon,
  FabricSourcingIcon,
  DecorationIcon,
  DeliveryIcon,
  MarketingIcon,
} from "../../components/Icons";

const iconMap = {
  FabricInspectionIcon,
  CuttingIcon,
  SewingIcon,
  WashingIcon,
  EmbroideryIcon,
  PackagingIcon,
  RnDIcon,
  CustomDesignIcon,
  FabricSourcingIcon,
  DecorationIcon,
  DeliveryIcon,
  MarketingIcon,
};

export type IconName = keyof typeof iconMap;

interface ServiceStepProps {
  index: number;
  title: string;
  description: string;
  details: string[];
  image: string;
  iconName: IconName;
  isRTL: boolean;
}

export function AnimatedServiceStep({
  index,
  title,
  description,
  details,
  image,
  iconName,
  isRTL,
}: ServiceStepProps) {
  const Icon = iconMap[iconName];
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: "100ms" }}
    >
      {/* Content */}
      <div className={isEven ? "lg:order-1" : "lg:order-2"}>
        <div
          className={`text-[#B6C6E1] text-sm mb-4 font-bold uppercase tracking-wide transition-all duration-500 ${
            isRTL ? "text-right" : ""
          } ${isVisible ? "opacity-100 translate-x-0" : isRTL ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8"}`}
          style={{ transitionDelay: "200ms" }}
        >
          {isRTL
            ? `الخطوة ${String(index + 1).padStart(2, "0")}`
            : `STEP ${String(index + 1).padStart(2, "0")}`}
        </div>

        <div
          className={`flex items-center gap-4 mb-6 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-x-0" : isRTL ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <Icon className="w-16 h-16 text-true-cobalt" />
          <h2
            className={`text-2xl md:text-3xl text-true-cobalt font-bold ${
              isRTL ? "font-[var(--font-cairo)]" : ""
            }`}
          >
            {title}
          </h2>
        </div>

        <p
          className={`text-true-cobalt/70 text-lg mb-6 transition-all duration-500 ${
            isRTL ? "text-right font-[var(--font-cairo)]" : ""
          } ${isVisible ? "opacity-100 translate-x-0" : isRTL ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8"}`}
          style={{ transitionDelay: "400ms" }}
        >
          {description}
        </p>

        <ul className={`space-y-3 ${isRTL ? "text-right" : ""}`}>
          {details.map((detail, detailIndex) => (
            <li
              key={detail}
              className={`flex items-center gap-3 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-x-0" : isRTL ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: `${500 + detailIndex * 100}ms` }}
            >
              <div className="w-2 h-2 bg-royal-azure flex-shrink-0" />
              <span
                className={`text-true-cobalt/70 ${
                  isRTL ? "font-[var(--font-cairo)]" : ""
                }`}
              >
                {detail}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image */}
      <div
        className={`aspect-video bg-alabaster-grey relative overflow-hidden transition-all duration-700 ${
          isEven ? "lg:order-2" : "lg:order-1"
        } ${
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <Image src={image} alt={title} fill className="object-cover" />
        <div
          className={`absolute top-4 w-8 h-8 border-t-2 border-royal-azure transition-all duration-500 ${
            isRTL ? "right-4 border-r-2" : "left-4 border-l-2"
          } ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "600ms" }}
        />
        <div
          className={`absolute bottom-4 w-8 h-8 border-b-2 border-royal-azure transition-all duration-500 ${
            isRTL ? "left-4 border-l-2" : "right-4 border-r-2"
          } ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "700ms" }}
        />
      </div>
    </div>
  );
}
