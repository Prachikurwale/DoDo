 
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: any) {  
    const token = req.nextauth?.token;
    const pathname = req.nextUrl.pathname;

    if (pathname === "/" && token) {
      return NextResponse.redirect(new URL(token.onboarded ? "/dashboard" : "/onboarding", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};