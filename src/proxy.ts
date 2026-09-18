import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SITE_COOKIE = "phg_site";
const ADMIN_COOKIE = "phg_admin";

function isPublicAsset(pathname: string) {
  return (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname === "/favicon.ico"
  );
}

function isStudio(pathname: string) {
  return pathname === "/login" || pathname.startsWith("/dashboard");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!request.cookies.get(ADMIN_COOKIE)?.value) {
      const login = new URL("/login", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }

  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword || isPublicAsset(pathname) || pathname === "/enter") {
    return NextResponse.next();
  }

  if (isStudio(pathname)) {
    return NextResponse.next();
  }

  const unlocked = Boolean(request.cookies.get(SITE_COOKIE)?.value);
  if (pathname.startsWith("/api/media")) {
    if (unlocked || request.cookies.get(ADMIN_COOKIE)?.value) {
      return NextResponse.next();
    }
    return new NextResponse("Private", { status: 401 });
  }

  if (!unlocked) {
    const enter = new URL("/enter", request.url);
    if (pathname !== "/") enter.searchParams.set("from", pathname);
    return NextResponse.redirect(enter);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
