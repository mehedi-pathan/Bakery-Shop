"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  status: string
  subtotal: number
  customerName: string
  customerPhone: string
  note: string | null
  txnId: string | null
  createdAt: string
  items: Array<{
    id: string
    quantity: number
    price: number
    product: { name: string }
  }>
}

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [txnId, setTxnId] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [orderId, setOrderId] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setOrderId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data)
        setTxnId(data.txnId || "")
        setStatus(data.status)
      }
    } catch (error) {
      console.error("Error fetching order:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyPayment = async () => {
    if (!txnId.trim()) {
      alert("Please enter a transaction ID")
      return
    }

    setSaving(true)
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "ADVANCE_VERIFIED",
          txnId: txnId.trim(),
        }),
      })

      if (response.ok) {
        const updatedOrder = await response.json()
        setOrder(updatedOrder)
        setStatus(updatedOrder.status)
        alert("Payment verified successfully!")
      }
    } catch (error) {
      console.error("Error verifying payment:", error)
      alert("Failed to verify payment")
    } finally {
      setSaving(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const updatedOrder = await response.json()
        setOrder(updatedOrder)
        setStatus(newStatus)
      }
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update status")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen">
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-2">Order not found</h1>
            <Button asChild>
              <Link href="/admin/orders">Back to Orders</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/admin/orders">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Order Management</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Order #{order.id.slice(-8).toUpperCase()}</span>
                    <OrderStatusBadge status={order.status} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Customer Information</h3>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Name:</span> {order.customerName}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> {order.customerPhone}
                        </p>
                        <p>
                          <span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Order Summary</h3>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Items:</span> {order.items.length}
                        </p>
                        <p>
                          <span className="font-medium">Total:</span>{" "}
                          <span className="text-lg font-bold text-primary">${Number(order.subtotal).toFixed(2)}</span>
                        </p>
                        {order.txnId && (
                          <p>
                            <span className="font-medium">Txn ID:</span> {order.txnId}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {order.note && (
                    <div className="mt-4 pt-4 border-t">
                      <h3 className="font-semibold mb-2">Special Instructions</h3>
                      <p className="text-sm text-muted-foreground">{order.note}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ${Number(item.price).toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Management Actions */}
            <div className="space-y-6">
              {/* Payment Verification */}
              {order.status === "PENDING" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Verify Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="txnId">Transaction ID</Label>
                      <Input
                        id="txnId"
                        value={txnId}
                        onChange={(e) => setTxnId(e.target.value)}
                        placeholder="Enter transaction ID"
                      />
                    </div>
                    <Button onClick={handleVerifyPayment} disabled={saving} className="w-full">
                      {saving ? <Save className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                      Verify Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Status Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Update Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Status</Label>
                    <OrderStatusBadge status={status} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Change Status</Label>
                    <Select value={status} onValueChange={handleStatusChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="ADVANCE_VERIFIED">Payment Verified</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="READY">Ready for Pickup</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Action Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {order.status === "PENDING" && (
                    <Button 
                      onClick={() => handleStatusChange("ADVANCE_VERIFIED")} 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={saving}
                    >
                      Accept Order
                    </Button>
                  )}
                  
                  {order.status === "ADVANCE_VERIFIED" && (
                    <Button 
                      onClick={() => handleStatusChange("IN_PROGRESS")} 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={saving}
                    >
                      Start Preparing
                    </Button>
                  )}
                  
                  {order.status === "IN_PROGRESS" && (
                    <Button 
                      onClick={() => handleStatusChange("READY")} 
                      className="w-full bg-yellow-600 hover:bg-yellow-700"
                      disabled={saving}
                    >
                      Mark Ready
                    </Button>
                  )}
                  
                  {order.status === "READY" && (
                    <Button 
                      onClick={() => handleStatusChange("COMPLETED")} 
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={saving}
                    >
                      Complete Order
                    </Button>
                  )}
                  
                  {order.status === "PENDING" && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        const whatsappMessage = `Order ID: ${order.id}%0AHi, please send advance payment (20-50%) to confirm your order.`
                        const whatsappUrl = `https://wa.me/01622839616?text=${whatsappMessage}`
                        window.open(whatsappUrl, '_blank')
                      }}
                      className="w-full"
                    >
                      Request Advance Payment
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
