import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import type { Session } from "next-auth"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, rating, comment } = body

    if (!orderId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid review data" }, { status: 400 })
    }

    // Check if order exists and belongs to user
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
        status: "COMPLETED"
      }
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found or not completed" }, { status: 404 })
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: { orderId }
    })

    if (existingReview) {
      return NextResponse.json({ error: "Review already exists for this order" }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        orderId,
        rating,
        comment
      },
      include: {
        order: true
      }
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 })
    }

    const review = await prisma.review.findUnique({
      where: { orderId },
      include: {
        order: true
      }
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error("Error fetching review:", error)
    return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 })
  }
}
