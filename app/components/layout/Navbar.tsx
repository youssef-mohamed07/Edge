"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CloseIcon, MenuIcon } from "../Icons";
import { useLanguage } from "@/app/context/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t, dir } = useLanguage();

  const mainLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/products", label: t("nav.products") },
    { href: "/services", label: t("nav.services") },
    { href: "/portfolio", label: t("nav.portfolio") },
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

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-[60]">
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
                    pathname === link.href
                      ? "bg-[#1A4AFF] text-white"
                      : "text-[#122D8B] hover:bg-[#122D8B]/5"
                  } ${dir === "rtl" ? "text-sm font-[var(--font-cairo)]" : "text-xs"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Link + Language Toggle - Right */}
          <div className={`hidden lg:flex items-center gap-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <Link
              href="/contact"
              className={`group relative w-[120px] text-center px-5 py-2 text-xs font-medium tracking-wide text-white border border-white/40 rounded-full overflow-hidden transition-all duration-300 hover:border-white hover:shadow-lg hover:shadow-white/10 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}
            >
              <span className="relative z-10">{t("nav.contact")}</span>
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            </Link>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className={language === "en" ? "text-white" : "text-white/50"}>EN</span>
              <span className="text-white/30">|</span>
              <span className={`${language === "ar" ? "text-white" : "text-white/50"} font-[var(--font-cairo)]`}>ع</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
              isOpen 
                ? "bg-white shadow-lg" 
                : "bg-white/10 backdrop-blur-sm"
            }`}
            aria-label="Toggle menu"
          >
            <span className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}>
              {isOpen ? (
                <CloseIcon className="w-5 h-5 text-[#122D8B]" />
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
          className="absolute inset-0 bg-[#122D8B]/95 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`relative h-full flex flex-col pt-6 px-6 transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-10"
        }`}>
          {/* Close Button Inside Menu */}
          <button
            onClick={() => setIsOpen(false)}
            className={`mb-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors ${dir === "rtl" ? "self-start" : "self-end"}`}
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
                  pathname === link.href
                    ? "bg-[#1A4AFF] text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                } ${dir === "rtl" ? "text-right font-[var(--font-cairo)]" : ""}`}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                  transform: isOpen ? "translateX(0)" : dir === "rtl" ? "translateX(20px)" : "translateX(-20px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`block px-5 py-4 text-lg font-medium rounded-xl transition-all duration-300 ${
                pathname === "/contact"
                  ? "bg-[#1A4AFF] text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              } ${dir === "rtl" ? "text-right font-[var(--font-cairo)]" : ""}`}
              style={{
                transitionDelay: isOpen ? `${mainLinks.length * 50}ms` : "0ms",
                transform: isOpen ? "translateX(0)" : dir === "rtl" ? "translateX(20px)" : "translateX(-20px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {t("nav.contact")}
            </Link>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto pb-10">
            {/* Language Toggle - Mobile */}
            <div 
              className={`flex items-center gap-4 mb-6 ${dir === "rtl" ? "flex-row-reverse" : ""}`}
              style={{
                transitionDelay: isOpen ? "300ms" : "0ms",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <button 
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${language === "en" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"}`}
              >
                <span>EN</span>
                <span className="text-white/30">English</span>
              </button>
              <button 
                onClick={() => setLanguage("ar")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors font-[var(--font-cairo)] ${language === "ar" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"}`}
              >
                <span>ع</span>
                <span>عربي</span>
              </button>
            </div>
            
            <div 
              className={`pt-6 border-t border-white/10 ${dir === "rtl" ? "text-right" : ""}`}
              style={{
                transitionDelay: isOpen ? "350ms" : "0ms",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p className={`text-white/40 text-sm mb-3 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>{t("nav.getInTouch")}</p>
              <a href="mailto:info@edgegarments.com" className="text-white/70 text-sm hover:text-white transition-colors">
                info@edgegarments.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
