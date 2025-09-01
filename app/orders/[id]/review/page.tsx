"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Star, Send } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Order {
  id: string
  status: string
  customerName: string
  items: Array<{
    product: { name: string }
    quantity: number
    price: number
  }>
  subtotal: number
  createdAt: string
}

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState<string>("")

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setOrderId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin")
      return
    }

    if (orderId) {
      fetchOrder()
    }
  }, [session, status, router, orderId])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.status !== "COMPLETED") {
          router.push(`/orders/${orderId}`)
          return
        }
        setOrder(data)
      } else {
        router.push("/orders")
      }
    } catch (error) {
      console.error("Error fetching order:", error)
      router.push("/orders")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!order) return

    setSubmitting(true)
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          rating,
          comment: comment.trim() || undefined,
        }),
      })

      if (response.ok) {
        toast.success("Review submitted successfully!")
        router.push(`/orders/${order.id}`)
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to submit review")
      }
    } catch (error) {
      toast.error("Error submitting review")
    } finally {
      setSubmitting(false)
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

  if (!session || !order) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link href={`/orders/${order.id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Order
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Write a Review</h1>
            <p className="text-muted-foreground mt-2">
              Share your experience with order #{order.id.slice(-8).toUpperCase()}
            </p>
          </div>

          {/* Order Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Order ID:</span>
                  <span className="text-muted-foreground">#{order.id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Customer:</span>
                  <span className="text-muted-foreground">{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Items:</span>
                  <span className="text-muted-foreground">{order.items.length} item(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-semibold text-primary">${Number(order.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span className="text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div className="space-y-3">
                  <Label>Rating</Label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-1 rounded-full transition-colors ${
                          star <= rating
                            ? "text-yellow-500 hover:text-yellow-600"
                            : "text-gray-300 hover:text-gray-400"
                        }`}
                      >
                        <Star className="h-8 w-8 fill-current" />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                </div>

                {/* Comment */}
                <div className="space-y-3">
                  <Label htmlFor="comment">Comment (Optional)</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this order..."
                    rows={4}
                    maxLength={500}
                  />
                  <p className="text-sm text-muted-foreground">
                    {comment.length}/500 characters
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Review
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
