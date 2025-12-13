"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { dir } = useLanguage();

  const contactOptions = [
    {
      id: "whatsapp",
      label: dir === "rtl" ? "واتساب" : "WhatsApp",
      subtitle: dir === "rtl" ? "رد سريع" : "Quick response",
      href: "https://wa.me/201234567890",
      color: "#25D366",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      id: "messenger",
      label: dir === "rtl" ? "ماسنجر" : "Messenger",
      subtitle: dir === "rtl" ? "تواصل عبر فيسبوك" : "Chat on Facebook",
      href: "https://m.me/edgegarments",
      color: "#0084FF",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
        </svg>
      ),
    },
    {
      id: "instagram",
      label: dir === "rtl" ? "إنستجرام" : "Instagram",
      subtitle: dir === "rtl" ? "تابعنا وراسلنا" : "Follow & DM us",
      href: "https://instagram.com/edgegarments",
      color: "#E4405F",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
    },
    {
      id: "email",
      label: dir === "rtl" ? "البريد الإلكتروني" : "Email",
      subtitle: dir === "rtl" ? "راسلنا مباشرة" : "Send us an email",
      href: "mailto:info@edgegarments.com",
      color: "#122D8B",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`fixed bottom-6 ${dir === "rtl" ? "left-6" : "right-6"} z-50`}>
      {/* Contact Options Panel */}
      <div
        className={`absolute bottom-20 ${dir === "rtl" ? "left-0" : "right-0"} transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div 
          className="bg-white rounded-2xl overflow-hidden w-[280px]"
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#122D8B] to-[#1A4AFF] px-5 py-4">
            <h3 className={`text-white font-bold text-base ${dir === "rtl" ? "text-right font-[var(--font-cairo)]" : ""}`}>
              {dir === "rtl" ? "تواصل معنا" : "Contact Us"}
            </h3>
            <p className={`text-white/70 text-sm mt-1 ${dir === "rtl" ? "text-right font-[var(--font-cairo)]" : ""}`}>
              {dir === "rtl" ? "اختر طريقة التواصل المفضلة" : "Choose your preferred way"}
            </p>
          </div>

          {/* Options */}
          <div className="p-3 space-y-2">
            {contactOptions.map((option, index) => (
              <a
                key={option.id}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group ${dir === "rtl" ? "flex-row-reverse" : ""}`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110"
                  style={{ backgroundColor: option.color }}
                >
                  {option.icon}
                </div>
                <div className={`flex-1 ${dir === "rtl" ? "text-right" : ""}`}>
                  <p className={`font-semibold text-[#122D8B] text-sm ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                    {option.label}
                  </p>
                  <p className={`text-slate-500 text-xs ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                    {option.subtitle}
                  </p>
                </div>
                <svg 
                  className={`w-5 h-5 text-slate-300 group-hover:text-[#1A4AFF] transition-all ${dir === "rtl" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
            <p className={`text-slate-400 text-xs text-center ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
              {dir === "rtl" ? "متاحون على مدار الساعة" : "Available 24/7"}
            </p>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? "bg-slate-800 rotate-0" 
            : "bg-gradient-to-r from-[#1A4AFF] to-[#122D8B] hover:scale-110"
        }`}
        style={{
          boxShadow: isOpen 
            ? "0 8px 24px rgba(0, 0, 0, 0.3)" 
            : "0 8px 24px rgba(26, 74, 255, 0.4)",
        }}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
      >
        <div className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          {isOpen ? (
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
