import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    const resolvedParams = await params

    if (!session || (session as any).user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, price, category, image, isActive } = body

    const product = await prisma.product.update({
      where: { id: resolvedParams.id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(price && { price: Number.parseFloat(price) }),
        ...(category && { category }),
        ...(image !== undefined && { image }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    const resolvedParams = await params

    if (!session || (session as any).user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.product.delete({
      where: { id: resolvedParams.id },
    })

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
