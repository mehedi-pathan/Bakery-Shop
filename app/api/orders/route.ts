import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import type { Session } from "next-auth"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    const body = await request.json()

    const { items, customerName, customerPhone, note } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 })
    }

    if (!customerName || !customerPhone) {
      return NextResponse.json({ error: "Customer name and phone are required" }, { status: 400 })
    }

    // Calculate subtotal
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id || "guest",
        subtotal,
        customerName,
        customerPhone,
        note: note || null,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!session && !userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session?.user?.id || userId || undefined,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        review: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
