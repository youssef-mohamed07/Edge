import type { Metadata } from "next";
import { Manrope, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EDGE for Garments | Premium Denim & Garment Manufacturing",
  description: "Egyptian manufacturer specializing in high-quality denim and woven garments. Full production cycle from inspection to packaging. Serving local and international brands.",
  keywords: ["garment manufacturing", "denim", "Egypt", "Port Said", "woven garments", "workwear", "custom garments"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Script to set language direction before hydration to prevent flash
  const languageScript = `
    (function() {
      try {
        var lang = localStorage.getItem('language');
        if (lang === 'ar') {
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = 'ar';
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageScript }} />
      </head>
      <body
        className={`${manrope.variable} ${cairo.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
