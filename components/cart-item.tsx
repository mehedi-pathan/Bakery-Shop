"use client"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart, type CartItem } from "@/lib/cart-context"
import Image from "next/image"

interface CartItemProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemProps) {
  const { dispatch } = useCart()

  const updateQuantity = (newQuantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, quantity: newQuantity },
    })
  }

  const removeItem = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item.id,
    })
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
            <Image
              src={item.image || `/placeholder.svg?height=64&width=64&text=${encodeURIComponent(item.name)}`}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[2rem] text-center">{item.quantity}</span>
            <Button variant="outline" size="sm" onClick={() => updateQuantity(item.quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-right">
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            <Button variant="ghost" size="sm" onClick={removeItem} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
