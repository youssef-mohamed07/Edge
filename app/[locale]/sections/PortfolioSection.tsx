import Image from "next/image";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";

interface PortfolioSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function PortfolioSection({ locale, dict }: PortfolioSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const processSteps = [
    { id: 1, title: dict.portfolio.step1.title, description: dict.portfolio.step1.desc },
    { id: 2, title: dict.portfolio.step2.title, description: dict.portfolio.step2.desc },
    { id: 3, title: dict.portfolio.step3.title, description: dict.portfolio.step3.desc },
    { id: 4, title: dict.portfolio.step4.title, description: dict.portfolio.step4.desc },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white" dir={dir}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
              alt="Our Process"
              fill
              className="object-cover"
            />
          </div>

          {/* Process Steps */}
          <div className={`${isRTL ? "text-right" : ""} lg:order-1`}>
            <span className={`text-[#1A4AFF] text-sm font-semibold uppercase tracking-wider block mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "كيف نعمل" : "How We Work"}
            </span>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] mb-14 ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              {dict.portfolio.label}
            </h2>

            <div className="space-y-8">
              {processSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-start gap-5 flex-row"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#122D8B] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.id}
                  </div>
                  <div className="flex-1 text-start">
                    <h3 className={`text-lg font-bold text-[#122D8B] mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {step.title}
                    </h3>
                    <p className={`text-[#122D8B]/60 text-sm leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trusted By */}
        <div className="mt-20 text-center">
          <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {isRTL ? "موثوق من أكثر من 2,000 علامة تجارية حول العالم" : "Trusted by 2,000+ brands worldwide"}
          </h3>
        </div>
      </div>
    </section>
  );
}
