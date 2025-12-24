import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EDGE for Garments | Premium Denim & Garment Manufacturing",
  description: "Egyptian manufacturer specializing in high-quality denim and woven garments.",
  icons: {
    icon: [
      { url: "/logo-original.png", sizes: "any" },
      { url: "/logo-original.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-original.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo-original.png", sizes: "180x180" },
    ],
    shortcut: "/logo-original.png",
  },
};

// Root layout - minimal wrapper for redirect handling
// Actual layouts are in app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
