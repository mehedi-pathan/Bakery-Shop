import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MessageCircle, Eye } from "lucide-react"
import { createWhatsAppUrl, WhatsAppMessages } from "@/lib/whatsapp"
import Link from "next/link"

async function getOrder(id: string) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/orders/${id}`, {
      cache: "no-store",
    })
    if (!response.ok) {
      throw new Error("Failed to fetch order")
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching order:", error)
    return null
  }
}

export default async function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const order = await getOrder(resolvedParams.id)

  if (!order) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-2">Order not found</h1>
            <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/menu">Back to Menu</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const whatsappUrl = createWhatsAppUrl(WhatsAppMessages.orderConfirmation(order.id))

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground">Your order has been received and is being processed.</p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Details</span>
                <Badge variant="secondary">#{order.id.slice(-8).toUpperCase()}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Customer:</p>
                  <p className="text-muted-foreground">{order.customerName}</p>
                </div>
                <div>
                  <p className="font-medium">Phone:</p>
                  <p className="text-muted-foreground">{order.customerPhone}</p>
                </div>
                <div>
                  <p className="font-medium">Status:</p>
                  <Badge variant="outline">{order.status.replace("_", " ")}</Badge>
                </div>
                <div>
                  <p className="font-medium">Total:</p>
                  <p className="text-lg font-bold text-primary">${Number(order.subtotal).toFixed(2)}</p>
                </div>
              </div>

              {order.note && (
                <div>
                  <p className="font-medium text-sm">Special Instructions:</p>
                  <p className="text-muted-foreground text-sm">{order.note}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="font-medium text-sm mb-2">Items:</p>
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} x{item.quantity}
                      </span>
                      <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800">Payment Instructions</CardTitle>
            </CardHeader>
            <CardContent className="text-orange-700">
              <p className="mb-4">
                <strong>Important:</strong> Please send 20-50% advance payment transaction ID via WhatsApp to confirm
                your order.
              </p>
              <p className="text-sm mb-4">
                Your order will be prepared only after payment confirmation. Pickup will be ready within 30 minutes of
                payment verification.
              </p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send Payment Details on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/orders">
                <Eye className="mr-2 h-4 w-4" />
                Track My Orders
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/menu">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
