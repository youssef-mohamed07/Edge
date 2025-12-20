"use client";

import Link from "next/link";
import Image from "next/image";
import { PhoneIcon, EmailIcon, LocationIcon, WhatsAppIcon } from "../../../components/Icons";
import { getDirection, type Locale } from "../../../i18n/config";
import type { Dictionary } from "../../../i18n/dictionaries";
import { LanguageSwitcher } from "../LanguageSwitcher";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const quickLinks = isRTL
    ? [
        { href: `/${locale}`, label: "الرئيسية" },
        { href: `/${locale}/about`, label: "من نحن" },
        { href: `/${locale}/services`, label: "الخدمات" },
        { href: `/${locale}/products`, label: "المنتجات" },
        { href: `/${locale}/contact`, label: "تواصل معنا" },
      ]
    : [
        { href: `/${locale}`, label: "Home" },
        { href: `/${locale}/about`, label: "About Us" },
        { href: `/${locale}/services`, label: "Services" },
        { href: `/${locale}/products`, label: "Products" },
        { href: `/${locale}/contact`, label: "Contact" },
      ];

  const services = isRTL
    ? ["تصنيع الدنيم", "إنتاج الملابس", "مراقبة الجودة", "تصميم مخصص", "توريد الأقمشة"]
    : ["Denim Manufacturing", "Garment Production", "Quality Control", "Custom Design", "Fabric Sourcing"];

  return (
    <footer dir={dir}>
      {/* Main Footer Content */}
      <div style={{ backgroundColor: "#122D8B" }}>
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className={isRTL ? "text-right md:order-1" : ""}>
                <h3 className={`text-xl font-bold text-white mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {dict.footer.newsletter.title}
                </h3>
                <p className={`text-white/60 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {dict.footer.newsletter.subtitle}
                </p>
              </div>
              <form className={`flex gap-3 w-full md:w-auto ${isRTL ? "md:order-2" : ""}`}>
                <input
                  type="email"
                  placeholder={dict.footer.newsletter.placeholder}
                  className={`flex-1 md:w-72 px-5 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-full focus:outline-none focus:border-[#1A4AFF] transition-colors text-sm ${
                    isRTL ? "text-right font-[var(--font-cairo)]" : ""
                  }`}
                />
                <button
                  type="submit"
                  className={`px-6 py-3 bg-[#1A4AFF] text-white font-semibold rounded-full hover:bg-[#1A4AFF]/90 transition-colors text-sm whitespace-nowrap ${
                    isRTL ? "font-[var(--font-cairo)]" : ""
                  }`}
                >
                  {dict.footer.newsletter.button}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-10 ${isRTL ? "text-right" : ""}`}>
          {/* Brand Column */}
          <div>
            <Image
              src="/logo1.png"
              alt="EDGE for Garments"
              width={140}
              height={45}
              className={`h-12 w-auto mb-5 brightness-0 invert ${isRTL ? "ml-auto" : ""}`}
            />
            <p
              className={`text-white/60 text-sm leading-relaxed mb-5 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
            >
              {dict.footer.description}
            </p>
            <div className={`flex items-center gap-3 ${isRTL ? "justify-end" : ""}`}>
              <a
                href="https://wa.me/201222493500"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@edgeforgarments.com"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <EmailIcon className="w-4 h-4" />
              </a>
              <a
                href="tel:+201222493500"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <PhoneIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`text-white font-semibold text-sm uppercase tracking-wider mb-5 ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              {dict.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-white/50 hover:text-white transition-colors text-sm ${
                      isRTL ? "font-[var(--font-cairo)]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className={`text-white font-semibold text-sm uppercase tracking-wider mb-5 ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              {dict.footer.services}
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className={`text-white/50 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className={`text-white font-semibold text-sm uppercase tracking-wider mb-5 ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              {dict.footer.contactInfo}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <LocationIcon className="w-4 h-4 text-[#1A4AFF] flex-shrink-0 mt-1" />
                <span className={`text-white/50 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "المنطقة الحرة ببورسعيد" : "Port Said Free Zone"}
                  <br />
                  {isRTL ? "بورسعيد، مصر" : "Port Said, Egypt"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-4 h-4 text-[#1A4AFF] flex-shrink-0" />
                <a
                  href="tel:+201222493500"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                  dir="ltr"
                >
                  +20 122 249 3500
                </a>
              </li>
              <li className="flex items-center gap-3">
                <EmailIcon className="w-4 h-4 text-[#1A4AFF] flex-shrink-0" />
                <a
                  href="mailto:info@edgeforgarments.com"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                  dir="ltr"
                >
                  info@edgeforgarments.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
          <div
            className={`flex flex-col md:flex-row items-center justify-between gap-4 ${
              isRTL ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <p className={`text-white/40 text-xs ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                © {new Date().getFullYear()} EDGE for Garments. {dict.footer.rights}
              </p>
              <span className="text-white/20 hidden md:inline">|</span>
              <div className="flex items-center gap-2">
                {isRTL ? (
                  <>
                    <div className="bg-white rounded-md px-3 py-1.5">
                      <Image
                        src="/assets/logos/sedex-logo.png"
                        alt="SEDEX"
                        width={100}
                        height={40}
                        className="h-7 w-auto"
                      />
                    </div>
                    <span className="text-white/40 text-xs font-[var(--font-cairo)]">
                      معتمد من
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-white/40 text-xs">
                      Certified by
                    </span>
                    <div className="bg-white rounded-md px-3 py-1.5">
                      <Image
                        src="/assets/logos/sedex-logo.png"
                        alt="SEDEX"
                        width={100}
                        height={40}
                        className="h-7 w-auto"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={`flex items-center gap-5 ${isRTL ? "flex-row-reverse" : ""}`}>
              <LanguageSwitcher currentLocale={locale} variant="footer" />
              <span className="text-white/20">|</span>
              <Link
                href={`/${locale}/privacy`}
                className={`text-white/40 hover:text-white transition-colors text-xs ${
                  isRTL ? "font-[var(--font-cairo)]" : ""
                }`}
              >
                {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className={`text-white/40 hover:text-white transition-colors text-xs ${
                  isRTL ? "font-[var(--font-cairo)]" : ""
                }`}
              >
                {isRTL ? "شروط الخدمة" : "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
