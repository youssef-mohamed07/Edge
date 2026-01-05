import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isValidLocale } from "./app/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // Files with extensions (images, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if accessing admin routes (but not login page)
  const isAdminRoute = locales.some(
    (locale) => pathname.startsWith(`/${locale}/admin`) && !pathname.includes("/admin/login")
  ) || (pathname.startsWith("/admin") && !pathname.includes("/admin/login"));

  if (isAdminRoute) {
    const authCookie = request.cookies.get("admin_auth");
    if (!authCookie || authCookie.value !== "authenticated") {
      // Get locale from path or use default
      const segments = pathname.split("/");
      const localeFromPath = segments[1];
      const locale = isValidLocale(localeFromPath) ? localeFromPath : defaultLocale;
      
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Check if the pathname already has a valid locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale from pathname and validate
    const segments = pathname.split("/");
    const localeFromPath = segments[1];
    
    if (isValidLocale(localeFromPath)) {
      return NextResponse.next();
    }
  }

  // Redirect to default locale if no locale in path
  // Detect preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  let detectedLocale = defaultLocale;

  // Simple language detection from Accept-Language header
  if (acceptLanguage.toLowerCase().includes("ar")) {
    detectedLocale = "ar";
  }

  // Build the new URL with locale prefix
  const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    // Match all paths except:
    // - API routes
    // - Static files
    // - Next.js internals
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
