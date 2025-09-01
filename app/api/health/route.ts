import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`

    // Check if tables exist
    const tableCheck = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'products', 'orders', 'order_items')
    `

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      tables: tableCheck,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Database health check failed:", error)

    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
