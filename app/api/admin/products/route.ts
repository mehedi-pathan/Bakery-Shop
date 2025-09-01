import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session as any).user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session as any).user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, price, category, image } = body

    if (!name || !price || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number.parseFloat(price),
        category,
        image,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
