import Image from "next/image";
import Link from "next/link";

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
}

export function PageHero({ title, subtitle, image, isRTL, breadcrumbs, stats }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Content */}
      <div className={`relative ${stats ? "py-24 lg:py-36" : "py-28 lg:py-44"}`}>
        <div className="absolute inset-0">
          <Image src={image} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#122D8B]/95 via-[#122D8B]/80 to-[#122D8B]/60" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1A4AFF]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1A4AFF]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`max-w-4xl ${isRTL ? "mr-0 ml-auto text-right" : ""}`}>
            {/* Breadcrumb */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className={`flex items-center gap-2 mb-6 text-sm ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                {breadcrumbs.map((crumb, index) => (
                  <span key={index} className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    {index > 0 && (
                      <svg
                        className={`w-4 h-4 text-white/50 ${isRTL ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className={`text-white/70 hover:text-white transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={`text-white ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            <h1
              className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
            >
              {title}
            </h1>

            {subtitle && (
              <p className={`text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section - Integrated */}
      {stats && stats.length > 0 && (
        <div className="relative z-10 bg-[#122D8B] py-10 lg:py-14">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl text-white font-bold mb-2">{stat.number}</div>
                  <div className={`text-white/60 text-sm uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Wave - Only when no stats */}
      {!stats && (
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      )}
    </section>
  );
}
