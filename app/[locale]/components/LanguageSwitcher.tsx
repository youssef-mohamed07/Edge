"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "../../i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  variant?: "navbar" | "mobile" | "footer";
}

export function LanguageSwitcher({ currentLocale, variant = "navbar" }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Get the path without the locale prefix
  const getPathWithoutLocale = (): string => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments.shift();
    }
    return segments.length > 0 ? `/${segments.join("/")}` : "";
  };

  const pathWithoutLocale = getPathWithoutLocale();
  const getLocalizedHref = (locale: Locale): string => `/${locale}${pathWithoutLocale}`;
  const otherLocale = currentLocale === "en" ? "ar" : "en";

  // Navbar variant - compact toggle button
  if (variant === "navbar") {
    return (
      <Link
        href={getLocalizedHref(otherLocale)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 group"
      >
        <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        <span className={`text-xs font-medium text-white ${otherLocale === "ar" ? "font-[var(--font-cairo)]" : ""}`}>
          {otherLocale === "ar" ? "العربية" : "English"}
        </span>
      </Link>
    );
  }

  // Mobile variant - larger buttons for touch
  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-3">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={getLocalizedHref(locale)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              currentLocale === locale
                ? "bg-royal-azure text-white shadow-lg shadow-royal-azure/30"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
            }`}
          >
            <span className={locale === "ar" ? "font-[var(--font-cairo)]" : ""}>
              {locale === "ar" ? "العربية" : "English"}
            </span>
          </Link>
        ))}
      </div>
    );
  }

  // Footer variant - subtle with flags/icons
  if (variant === "footer") {
    return (
      <div className="flex items-center gap-2">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={getLocalizedHref(locale)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              currentLocale === locale
                ? "bg-white/15 text-white"
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="text-base">{locale === "ar" ? "🇪🇬" : "🇬🇧"}</span>
            <span className={locale === "ar" ? "font-[var(--font-cairo)]" : ""}>
              {locale === "ar" ? "العربية" : "EN"}
            </span>
          </Link>
        ))}
      </div>
    );
  }

  return null;
}
