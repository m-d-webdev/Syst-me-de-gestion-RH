import { NextResponse } from "next/server";

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
const BYPASS_PREFIXES = ["/_next/", "/favicon.ico", "/api/auth/"];

/**
 * Retrieve and validate the auth token from the incoming request.
 * Supports both:
 *  - Cookie-based sessions  (e.g. NextAuth, custom JWTs stored in cookies)
 *  - Bearer tokens in the Authorization header (e.g. API clients)
 *
 * Replace the validation logic inside `isValidToken` with your real
 * verification (e.g. jose JWT verify, opaque-token DB look-up, etc.).
 */
function getToken(request) {
  // 1️⃣  Cookie-based session token (most common for web apps)
  const cookieToken =
    request.cookies.get("next-auth.session-token")?.value || // NextAuth (HTTP)
    request.cookies.get("__Secure-next-auth.session-token")?.value || // NextAuth (HTTPS)
    request.cookies.get("auth_token")?.value; // Custom cookie name

  if (cookieToken) return cookieToken;

  // 2️⃣  Authorization: Bearer <token>  (API / mobile clients)
  const authHeader = request.headers.get("authorization") ?? "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
}

/**
 * Validate the token.
 *
 * ⚠️  This is a STUB — replace with real verification:
 *
 *   JWT example (install jose):
 *     import { jwtVerify } from "jose";
 *     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
 *     await jwtVerify(token, secret);
 *
 *   NextAuth example:
 *     import { getToken } from "next-auth/jwt";
 *     const token = await getToken({ req: request });
 *     return !!token;
 */
async function isValidToken(token) {
  if (!token) return false;

  // TODO: swap this stub for real JWT / session verification
  // e.g.:
  // const { payload } = await jwtVerify(token, secret);
  // return !!payload?.sub;

  return token.length > 0; // <-- placeholder: truthy non-empty string
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
  const authenticated = await isValidToken(token);

  if (!authenticated) {
    // Redirect unauthenticated users to /login, preserving the original URL
    // so you can redirect them back after sign-in.
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 4. (Optional) Forward identity info to page/API via headers ────────────
  // Useful when you decode the JWT here and want to pass claims downstream
  // without re-verifying in every route handler.
  //
  // const response = NextResponse.next();
  // response.headers.set("x-user-id", payload.sub);
  // return response;

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