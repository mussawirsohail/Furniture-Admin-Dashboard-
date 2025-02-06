import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simplified example. In a real-world application,
// you would implement proper authentication and authorization.
const isAdmin = (request: NextRequest) => {
  const authToken = request.cookies.get("auth_token")?.value
  return authToken === "admin_secret_token"
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!isAdmin(request)) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}

