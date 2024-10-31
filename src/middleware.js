import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "60 s"),
});

const RATE_LIMITED_PATHS = ["/api/auth/login", "/api/auth/signup"];
export async function middleware(request) {
  const authCookie = request.cookies.get("authCookie");

  const protectedRoutes = ["/login", "/signup", "/verify-account"];

  if (authCookie && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!authCookie && request.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const path = request.nextUrl.pathname;

  if (path.startsWith("/api/")) {
    if (
      RATE_LIMITED_PATHS.some((limitedPath) => path.startsWith(limitedPath))
    ) {
      const ip = request.ip ?? "127.0.0.1";

      const { success, reset } = await ratelimit.limit(ip);
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);

      if (!success) {
        return new NextResponse(
          JSON.stringify({
            message: `Too Many Requests: Retry Aftre ${retryAfter} second`,
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)",], // Exclude API routes and static files
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // Include all routes except Next.js static files
    "/api/:path*", // Include all API routes
  ],
};
