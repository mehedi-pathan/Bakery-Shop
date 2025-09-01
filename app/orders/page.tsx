"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { Eye, Package } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  status: string
  subtotal: number
  customerName: string
  customerPhone: string
  createdAt: string
  items: Array<{
    id: string
    quantity: number
    price: number
    product: {
      name: string
    }
  }>
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin")
      return
    }

    fetchOrders()
  }, [session, status, router])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track your order status and history</p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">Start by ordering some delicious items from our menu!</p>
              <Button asChild>
                <Link href="/menu">Browse Menu</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">Order #{order.id.slice(-8).toUpperCase()}</h3>
                        <OrderStatusBadge status={order.status} />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Customer: {order.customerName}</p>
                        <p>Phone: {order.customerPhone}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Items: {order.items.length} item(s)</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      <p className="text-xl font-bold text-primary">${Number(order.subtotal).toFixed(2)}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/orders/${order.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
