import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import path from "node:path";
import { callbackify } from "node:util";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/api/logIn" ||
          pathname === "/api/register"
        ) {
          return true;
        }

        if (pathname.startsWith("/videos") || pathname === "/") {
          return true;
        }

        return !!token;
      },
    },
  }
);
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
