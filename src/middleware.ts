import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";

// Paths that should never be locale-prefixed.
const IGNORE = ["/admin", "/images", "/_next", "/favicon", "/api"];

function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") || "";
  // First language tag wins; Hebrew browsers land on Hebrew.
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  if (first.startsWith("he") || first.startsWith("iw")) return "he";
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (IGNORE.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Already has a supported locale prefix? Continue.
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Otherwise redirect to the detected locale, preserving the rest of the path.
  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except static files and the CMS.
  matcher: ["/((?!_next|admin|images|favicon.ico|.*\\..*).*)"],
};
