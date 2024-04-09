import useSession from "@/hooks/useSession";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { url } = request;
  const session = await useSession();

  if (session.user) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", url));
    }
  } else {
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", url));
    }
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard",
    "/partners/:path"
  ],
};