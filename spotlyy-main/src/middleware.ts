import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getSession } from "./lib/authConfig";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  // 1. Run i18n middleware first
  const intlResponse = await intlMiddleware(req);
  // console.log(intlResponse);
  // If it created a redirect/rewrite, just return that
  if (intlResponse && !intlResponse.ok) {
    return intlResponse;
  }

  // 2. Then run your auth logic
  const session = await getSession();
  // console.log(session);
  // if (!session) {
  //   // e.g. redirect unauthenticated users
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // 3. Finally pass through (or reuse the intlResponse if valid)
  return intlResponse;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
