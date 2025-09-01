"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import Link from "next/link"

interface Order {
  id: string
  status: string
  subtotal: number
  customerName: string
  customerPhone: string
  createdAt: string
  review?: {
    rating: number
    comment?: string
  } | null
  items: Array<{
    quantity: number
    product: { name: string }
  }>
}

const columns = [
  { id: "PENDING", title: "Pending", status: "PENDING" },
  { id: "ADVANCE_VERIFIED", title: "Payment Verified", status: "ADVANCE_VERIFIED" },
  { id: "IN_PROGRESS", title: "In Progress", status: "IN_PROGRESS" },
  { id: "READY", title: "Ready", status: "READY" },
  { id: "COMPLETED", title: "Completed", status: "COMPLETED" },
]

export function KanbanBoard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data.filter((order: Order) => order.status !== "CANCELLED"))
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getOrdersByStatus = (status: string) => {
    return orders.filter((order) => order.status === status)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {columns.map((column) => {
        const columnOrders = getOrdersByStatus(column.status)
        return (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">{column.title}</h3>
              <Badge variant="secondary">{columnOrders.length}</Badge>
            </div>

            <div className="space-y-3 min-h-[400px]">
              {columnOrders.map((order) => (
                <Link key={order.id} href={`/admin/orders/${order.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">#{order.id.slice(-8).toUpperCase()}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-xs">
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-muted-foreground">{order.customerPhone}</p>
                        <p className="text-muted-foreground">{order.items.length} item(s)</p>
                        <p className="font-semibold text-primary">${Number(order.subtotal).toFixed(2)}</p>
                        <p className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                        
                        {/* Review Display for Completed Orders */}
                        {order.status === "COMPLETED" && order.review && (
                          <div className="pt-2 border-t">
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= order.review!.rating
                                      ? "text-yellow-500 fill-current"
                                      : "text-gray-300"
                                  }`}
                                >
                                  <svg viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                  </svg>
                                </div>
                              ))}
                              <span className="text-xs text-muted-foreground ml-1">
                                ({order.review.rating}/5)
                              </span>
                            </div>
                            {order.review.comment && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                "{order.review.comment}"
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
