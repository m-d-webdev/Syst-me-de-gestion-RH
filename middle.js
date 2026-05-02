import { NextResponse } from "next/server";
import { AUTH } from "./api/Employers/Auth";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
let jwtSecretKeyPromise;

/**
 * List of public routes that do NOT require authentication.
 * Add any paths here that should be accessible without a session.
 */
const PUBLIC_ROUTES = [
  "/login",
];

/**
 * Static asset prefixes and Next.js internals to always skip.
 */
const BYPASS_PREFIXES = ["/_next/", "/favicon.ico"];

/**
 * Retrieve and validate the auth token from the incoming request.
 * Supports both:
 *  - Cookie-based sessions  (e.g. NextAuth, custom JWTs stored in cookies)
 *  - Bearer tokens in the Authorization header (e.g. API clients)
 */
function getToken(request) {
  // 1️⃣  Cookie-based session token (most common for web apps)
  const cookieToken =
    request.cookies.get("next-auth.session-token")?.value || // NextAuth (HTTP)
    request.cookies.get("__Secure-next-auth.session-token")?.value || // NextAuth (HTTPS)
    request.cookies.get("token")?.value; // Custom cookie name

  if (cookieToken) return cookieToken;

  // 2️⃣  Authorization: Bearer <token>  (API / mobile clients)
  const authHeader = request.headers.get("authorization") ?? "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
}


async function isValidToken(token) {
  if (!token) return false;

  const res = await AUTH()
  if (res.authed == true) {
    return true
  }
  return false

}

/**
 * Next.js Middleware — runs on the Edge Runtime before every matched request.
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ── 1. Skip Next.js internals & static assets ──────────────────────────────
  if (BYPASS_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // ── 2. Allow public routes through without a token ─────────────────────────
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // ── 3. Check for a valid auth token ────────────────────────────────────────
  const token = getToken(request);
  console.log({ ___token: token });

  const authenticated = await isValidToken(token);

  if (!authenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Route matcher — tells Next.js which paths this middleware applies to.
 *
 * The negative lookaheads exclude:
 *   • /_next/static  (build output)
 *   • /_next/image   (image optimisation)
 *   • /favicon.ico
 *   • Any file with an extension (images, fonts, etc.)
 *
 * Adjust the pattern to suit your app structure.
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
