import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { prisma } = await import("@/lib/db")

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(category && { category }),
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)

    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    if (
      errorMessage.includes("relation") ||
      errorMessage.includes("table") ||
      errorMessage.includes("does not exist")
    ) {
      console.log("⚠️ Database tables don't exist yet. Please run database setup scripts.")
      return NextResponse.json(
        {
          error: "Database not initialized",
          message: "Please run database setup scripts",
          products: [],
        },
        { status: 503 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to fetch products",
        message: errorMessage,
        products: [],
      },
      { status: 500 },
    )
  }
}
