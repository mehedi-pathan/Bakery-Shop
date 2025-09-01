"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function CheckoutForm() {
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { state, dispatch } = useCart()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: state.items,
          customerName,
          customerPhone,
          note,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const order = await response.json()
      dispatch({ type: "CLEAR_CART" })
      router.push(`/order-success/${order.id}`)
    } catch (error) {
      console.error("Error creating order:", error)
      alert("Failed to place order. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerPhone">Phone Number *</Label>
            <Input
              id="customerPhone"
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Special Instructions (Optional)</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any special requests or instructions..."
              rows={3}
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-primary">${state.total.toFixed(2)}</span>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
