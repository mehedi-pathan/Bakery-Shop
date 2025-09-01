"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

export function CartSummary() {
  const { state } = useCart()

  if (state.items.length === 0) {
    return null
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Cart Summary
          <Badge variant="secondary">{state.items.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {state.items.slice(0, 3).map((item) => (
            <div key={`${item.id}-${Math.random()}`} className="flex justify-between text-sm">
              <span className="truncate">
                {item.name} x{item.quantity}
              </span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          {state.items.length > 3 && (
            <p className="text-sm text-muted-foreground">+{state.items.length - 3} more items</p>
          )}
        </div>

        <div className="border-t pt-2">
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span className="text-primary">${state.total.toFixed(2)}</span>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link href="/cart">View Cart & Checkout</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
