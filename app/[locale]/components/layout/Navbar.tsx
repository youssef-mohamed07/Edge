"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CloseIcon, MenuIcon } from "../../../components/Icons";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { getDirection, type Locale } from "../../../i18n/config";
import type { Dictionary } from "../../../i18n/dictionaries";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

export function Navbar({ locale, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const mainLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/products`, label: dict.nav.products },
    { href: `/${locale}/production-process`, label: dict.nav.services },
    { href: `/${locale}/blog`, label: dict.nav.blog },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0 relative z-[60]">
            <Image
              src="/logo1.png"
              alt="EDGE for Garments"
              width={140}
              height={45}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Center Pill */}
          <div className="hidden lg:flex items-center">
            <div
              className="flex items-center gap-1 px-2 py-2 rounded-full border-2 border-white/30 bg-white"
              dir={dir}
            >
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 font-medium tracking-wide transition-all rounded-full ${
                    isActive(link.href)
                      ? "bg-royal-azure text-white"
                      : "text-true-cobalt hover:bg-true-cobalt/5"
                  } ${isRTL ? "text-sm font-[var(--font-cairo)]" : "text-xs"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Link + Language Toggle - Right */}
          <div className={`hidden lg:flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Link
              href={`/${locale}/contact`}
              className={`group relative w-[120px] text-center px-5 py-2 text-xs font-medium tracking-wide text-white border border-white/40 rounded-full overflow-hidden transition-all duration-300 hover:border-white hover:shadow-lg hover:shadow-white/10 ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              <span className="relative z-10">{dict.nav.contact}</span>
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={locale} variant="navbar" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
              isOpen ? "bg-white shadow-lg" : "bg-white/10 backdrop-blur-sm"
            }`}
            aria-label="Toggle menu"
          >
            <span className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}>
              {isOpen ? (
                <CloseIcon className="w-5 h-5 text-true-cobalt" />
              ) : (
                <MenuIcon className="w-5 h-5 text-white" />
              )}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation - Full Screen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[55] transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-true-cobalt/95 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`relative h-full flex flex-col pt-6 px-6 transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-10"
          }`}
        >
          {/* Close Button Inside Menu */}
          <button
            onClick={() => setIsOpen(false)}
            className={`mb-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors ${
              isRTL ? "self-start" : "self-end"
            }`}
            aria-label="Close menu"
          >
            <CloseIcon className="w-6 h-6 text-white" />
          </button>

          <div className="space-y-2">
            {mainLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-4 text-lg font-medium rounded-xl transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-royal-azure text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                } ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                  transform: isOpen ? "translateX(0)" : isRTL ? "translateX(20px)" : "translateX(-20px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/contact`}
              onClick={() => setIsOpen(false)}
              className={`block px-5 py-4 text-lg font-medium rounded-xl transition-all duration-300 ${
                pathname === `/${locale}/contact`
                  ? "bg-royal-azure text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              } ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}
              style={{
                transitionDelay: isOpen ? `${mainLinks.length * 50}ms` : "0ms",
                transform: isOpen ? "translateX(0)" : isRTL ? "translateX(20px)" : "translateX(-20px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {dict.nav.contact}
            </Link>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto pb-10">
            {/* Language Toggle - Mobile */}
            <div
              className={`mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
              style={{
                transitionDelay: isOpen ? "300ms" : "0ms",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <LanguageSwitcher currentLocale={locale} variant="mobile" />
            </div>

            <div
              className={`pt-6 border-t border-white/10 ${isRTL ? "text-right" : ""}`}
              style={{
                transitionDelay: isOpen ? "350ms" : "0ms",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p className={`text-white/40 text-sm mb-3 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {dict.nav.getInTouch}
              </p>
              <a
                href="mailto:info@edgegarments.com"
                className="text-white/70 text-sm hover:text-white transition-colors"
              >
                info@edgegarments.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
