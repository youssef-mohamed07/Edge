"use client";

import Link from "next/link";
import Image from "next/image";
import { PhoneIcon, EmailIcon, LocationIcon, WhatsAppIcon } from "../Icons";
import { useLanguage } from "@/app/context/LanguageContext";

export function Footer() {
  const { t, dir } = useLanguage();

  const quickLinks = dir === "rtl" 
    ? [
        { href: "/", label: "الرئيسية" },
        { href: "/about", label: "من نحن" },
        { href: "/services", label: "الخدمات" },
        { href: "/products", label: "المنتجات" },
        { href: "/contact", label: "تواصل معنا" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/services", label: "Services" },
        { href: "/products", label: "Products" },
        { href: "/contact", label: "Contact" },
      ];

  const services = dir === "rtl"
    ? [
        "تصنيع الدنيم",
        "إنتاج الملابس",
        "مراقبة الجودة",
        "تصميم مخصص",
        "توريد الأقمشة",
      ]
    : [
        "Denim Manufacturing",
        "Garment Production",
        "Quality Control",
        "Custom Design",
        "Fabric Sourcing",
      ];

  return (
    <footer style={{ backgroundColor: "#122D8B" }} dir={dir}>
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${dir === "rtl" ? "md:flex-row-reverse" : ""}`}>
            <div className={dir === "rtl" ? "text-right" : ""}>
              <h3 className={`text-xl font-bold text-white mb-2 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                {t("footer.newsletter.title")}
              </h3>
              <p className={`text-white/60 text-sm ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                {t("footer.newsletter.subtitle")}
              </p>
            </div>
            <form className={`flex gap-3 w-full md:w-auto ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className={`flex-1 md:w-72 px-5 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-full focus:outline-none focus:border-[#1A4AFF] transition-colors text-sm ${dir === "rtl" ? "text-right font-[var(--font-cairo)]" : ""}`}
              />
              <button
                type="submit"
                className={`px-6 py-3 bg-[#1A4AFF] text-white font-semibold rounded-full hover:bg-[#1A4AFF]/90 transition-colors text-sm whitespace-nowrap ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}
              >
                {t("footer.newsletter.button")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-10 ${dir === "rtl" ? "text-right" : ""}`}>
          {/* Brand Column */}
          <div>
            <Image
              src="/logo1.png"
              alt="EDGE for Garments"
              width={140}
              height={45}
              className={`h-12 w-auto mb-5 brightness-0 invert ${dir === "rtl" ? "ml-auto" : ""}`}
            />
            <p className={`text-white/60 text-sm leading-relaxed mb-5 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
              {t("footer.description")}
            </p>
            <div className={`flex items-center gap-3 ${dir === "rtl" ? "justify-end" : ""}`}>
              <a
                href="https://wa.me/20xxxxxxxxxx"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@edgegarments.com"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <EmailIcon className="w-4 h-4" />
              </a>
              <a
                href="tel:+20xxxxxxxxxx"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <PhoneIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-white font-semibold text-sm uppercase tracking-wider mb-5 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-white/50 hover:text-white transition-colors text-sm ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={`text-white font-semibold text-sm uppercase tracking-wider mb-5 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
              {t("footer.services")}
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className={`text-white/50 text-sm ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-white font-semibold text-sm uppercase tracking-wider mb-5 ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
              {t("footer.contactInfo")}
            </h4>
            <ul className="space-y-4">
              <li className={`flex items-start gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <LocationIcon className="w-4 h-4 text-[#1A4AFF] flex-shrink-0 mt-1" />
                <span className={`text-white/50 text-sm ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                  {dir === "rtl" ? "المنطقة الحرة ببورسعيد" : "Port Said Free Zone"}<br />
                  {dir === "rtl" ? "بورسعيد، مصر" : "Port Said, Egypt"}
                </span>
              </li>
              <li className={`flex items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <PhoneIcon className="w-4 h-4 text-[#1A4AFF] flex-shrink-0" />
                <a href="tel:+20xxxxxxxxxx" className="text-white/50 hover:text-white text-sm transition-colors" dir="ltr">
                  +20 xxx xxx xxxx
                </a>
              </li>
              <li className={`flex items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <EmailIcon className="w-4 h-4 text-[#1A4AFF] flex-shrink-0" />
                <a href="mailto:info@edgegarments.com" className="text-white/50 hover:text-white text-sm transition-colors" dir="ltr">
                  info@edgegarments.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-3 ${dir === "rtl" ? "md:flex-row-reverse" : ""}`}>
            <p className={`text-white/40 text-xs ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
              © {new Date().getFullYear()} EDGE for Garments. {t("footer.rights")}
            </p>
            <div className={`flex items-center gap-5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <Link href="/privacy" className={`text-white/40 hover:text-white transition-colors text-xs ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                {dir === "rtl" ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
              <Link href="/terms" className={`text-white/40 hover:text-white transition-colors text-xs ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                {dir === "rtl" ? "شروط الخدمة" : "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
