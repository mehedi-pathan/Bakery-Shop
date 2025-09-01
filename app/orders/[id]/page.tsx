import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { ArrowLeft, MessageCircle } from "lucide-react"
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

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

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
              <Link href="/orders">Back to Orders</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const whatsappMessage = `Order ID: ${order.id}%0AHi, I need help with my order.`
  const whatsappUrl = `https://wa.me/01622839616?text=${whatsappMessage}`

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/orders">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Order Details</h1>
          </div>

          {/* Order Header */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order #{order.id.slice(-8).toUpperCase()}</span>
                <OrderStatusBadge status={order.status} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {order.customerName}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {order.customerPhone}
                    </p>
                    <p>
                      <span className="font-medium">Order Date:</span>{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Status:</span> {order.status.replace("_", " ")}
                    </p>
                    <p>
                      <span className="font-medium">Total Amount:</span>{" "}
                      <span className="text-lg font-bold text-primary">${Number(order.subtotal).toFixed(2)}</span>
                    </p>
                    {order.txnId && (
                      <p>
                        <span className="font-medium">Transaction ID:</span> {order.txnId}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {order.note && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-2">Special Instructions</h3>
                  <p className="text-sm text-muted-foreground">{order.note}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
                    <div>
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${Number(item.price).toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4 border-t font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">${Number(order.subtotal).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Section */}
          {order.status === "COMPLETED" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Review</CardTitle>
              </CardHeader>
              <CardContent>
                {order.review ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`w-5 h-5 ${
                            star <= order.review.rating
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300"
                          }`}
                        >
                          <svg viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        </div>
                      ))}
                      <span className="text-sm text-muted-foreground">
                        ({order.review.rating}/5)
                      </span>
                    </div>
                    {order.review.comment && (
                      <p className="text-sm text-muted-foreground">
                        "{order.review.comment}"
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Reviewed on {new Date(order.review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-3">
                      Share your experience with this order
                    </p>
                    <Button asChild>
                      <Link href={`/orders/${order.id}/review`}>
                        Write a Review
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {order.status === "PENDING" && (
              <Button 
                asChild 
                className="flex-1 bg-orange-600 hover:bg-orange-700"
                onClick={() => {
                  const whatsappMessage = `Order ID: ${order.id}%0AHi, I have completed the advance payment. Please verify.`
                  const whatsappUrl = `https://wa.me/01622839616?text=${whatsappMessage}`
                  window.open(whatsappUrl, '_blank')
                }}
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Payment Done
                </a>
              </Button>
            )}
            
            {order.status === "COMPLETED" && !order.review && (
              <Button 
                asChild 
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                <Link href={`/orders/${order.id}/review`}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Write Review
                </Link>
              </Button>
            )}
            
            <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </a>
            </Button>
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/menu">Order Again</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
