import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse, NextRequest } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const segments = pathname.split("/");
  const locale = segments[1];

  const isValidLocale = (routing.locales as readonly string[]).includes(locale);
  type AppLocale = (typeof routing.locales)[number];

  const typedLocale: AppLocale = isValidLocale
    ? (locale as AppLocale)
    : routing.defaultLocale;

  if (!isValidLocale) {
    return NextResponse.redirect(
      new URL(`/${typedLocale}${pathname}`, req.url)
    );
  }

  const res = intlMiddleware(req);

  const clienteHash = req.cookies.get("cliente_hash")?.value;
  const isAuthenticated = Boolean(clienteHash);

  const isDashboard = pathname.startsWith(`/${locale}/dashboard`);
  const isLogin = pathname === `/${locale}/login`;
  const isRegister = pathname === `/${locale}/register`;
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  if (!isAuthenticated && (isDashboard || isHome)) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (isAuthenticated && (isLogin || isRegister || isHome)) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
