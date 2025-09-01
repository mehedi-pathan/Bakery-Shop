import { NextResponse } from "next/server"

export async function GET(request: Request, context: any) {
  try {
    const NextAuth = (await import("next-auth")).default
    const { authOptions } = await import("@/lib/auth")
    console.log("NextAuth", NextAuth)

    const handler = NextAuth(authOptions as any)
    return handler(request, context)
  } catch (error) {
    console.error("NextAuth GET error:", error)

    return NextResponse.json(
      {
        error: "Authentication service unavailable",
        message: "Database may not be initialized. Please run setup scripts.",
      },
      { status: 503 },
    )
  }
}

export async function POST(request: Request, context: any) {
  try {
    const NextAuth = (await import("next-auth")).default
    const { authOptions } = await import("@/lib/auth")

    const handler = NextAuth(authOptions )
    return handler(request, context)
  } catch (error) {
    console.error("NextAuth POST error:", error)

    return NextResponse.json(
      {
        error: "Authentication service unavailable",
        message: "Database may not be initialized. Please run setup scripts.",
      },
      { status: 503 },
    )
  }
}