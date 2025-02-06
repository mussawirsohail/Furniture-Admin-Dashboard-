import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body

  const correctUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME ||"musha5"
  const correctPassword = process.env.ADMIN_PASSWORD ||"12345"

  if (username === correctUsername && password === correctPassword) {
    // In a real application, you'd want to use a more secure method to generate and store tokens
    const response = NextResponse.json({ success: true })
    response.cookies.set("auth_token", "admin_secret_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    })
    return response
  } else {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}

