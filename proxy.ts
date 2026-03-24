// proxy.ts
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
export const runtime = 'nodejs'; // Force the proxy to use the full Node.js engine
export default withAuth(
  function middleware(request: any) { // Changed 'NextRequest' to 'any' here
    const token = request.nextauth?.token;
    const pathname = request.nextUrl.pathname;

    // If user is on login page and authenticated, redirect to dashboard/onboarding
    if (pathname === "/" && token) {
      const isOnboarded = (token as any).onboarded;
      const redirectUrl = isOnboarded ? "/dashboard" : "/onboarding";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Allow onboarding page for authenticated users
    if (pathname === "/onboarding" && token && (token as any).onboarded) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const pathname = req.nextUrl.pathname;
        if (pathname === "/") return true;
        if (["/dashboard", "/onboarding", "/parent"].includes(pathname)) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};