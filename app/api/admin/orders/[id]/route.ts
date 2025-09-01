import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import type { Session } from "next-auth"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    const resolvedParams = await params


    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status, txnId } = body

    const updateData: any = {}

    if (status) {
      updateData.status = status
      if (status === "ADVANCE_VERIFIED") {
        updateData.verifiedAt = new Date()
      }
    }

    if (txnId !== undefined) {
      updateData.txnId = txnId
    }

    const order = await prisma.order.update({
      where: { id: resolvedParams.id },
      data: updateData,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        review: true,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
