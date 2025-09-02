"use client"

import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  image: string | null
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart() // Change this line to use addToCart instead of dispatch

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image || undefined,
      })
    }
    setQuantity(1)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image || `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">{product.category}</Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{product.name}</h3>
          {product.description && <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>}
          <p className="text-xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-3">
        <div className="flex items-center justify-center space-x-3 w-full">
          <Button variant="outline" size="sm" onClick={decrementQuantity} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-medium min-w-[2rem] text-center">{quantity}</span>
          <Button variant="outline" size="sm" onClick={incrementQuantity}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
