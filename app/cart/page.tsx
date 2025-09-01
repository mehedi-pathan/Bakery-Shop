"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartItemComponent } from "@/components/cart-item"
import { CheckoutForm } from "@/components/checkout-form"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { state } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some delicious items from our menu to get started!</p>
            <Button asChild>
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Items ({state.items.length})</h2>
            {state.items.map((item, index) => (
              <CartItemComponent key={`${item.id}-${index}`} item={item} />
            ))}
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <CheckoutForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
