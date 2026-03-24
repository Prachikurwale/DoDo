import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export const middleware = withAuth(
  function middleware(request: NextRequest) {
    const token = request.nextauth.token;
    const pathname = request.nextUrl.pathname;

    // If user is on login page and authenticated, redirect to dashboard/onboarding
    if (pathname === "/" && token) {
      const isOnboarded = (token as any).onboarded;
      const redirectUrl = isOnboarded ? "/dashboard" : "/onboarding";
      return Response.redirect(new URL(redirectUrl, request.url));
    }

    // Allow onboarding page for authenticated users
    if (pathname === "/onboarding" && token && (token as any).onboarded) {
      return Response.redirect(new URL("/dashboard", request.url));
    }

    return;
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const pathname = req.nextUrl.pathname;

        // Login page is public
        if (pathname === "/") {
          return true;
        }

        // Protected routes require authentication
        if (pathname === "/dashboard" || pathname === "/onboarding" || pathname === "/parent") {
          return !!token;
        }

        // API routes are handled by individual route files
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
