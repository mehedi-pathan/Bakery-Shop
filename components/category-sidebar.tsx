"use client"

import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

const categories = [
  { name: "All", value: "" },
  { name: "Bakery", value: "Bakery" },
  { name: "Pastry", value: "Pastry" },
  { name: "Burger", value: "Burger" },
  { name: "Pizza", value: "Pizza" },
  { name: "Drinks", value: "Drinks" },
  { name: "Others", value: "Others" },
]

interface CategorySidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  productCounts?: Record<string, number>
}

export function CategorySidebar({ selectedCategory, onCategoryChange, productCounts = {} }: CategorySidebarProps) {
  return (
    <div className="w-full lg:w-64 space-y-2">
      <h3 className="font-semibold text-lg mb-4">Categories</h3>
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? "default" : "ghost"}
          className={cn(
            "w-full justify-between text-left h-auto py-3 px-4",
            selectedCategory === category.value && "bg-primary text-primary-foreground",
          )}
          onClick={() => onCategoryChange(category.value)}
        >
          <span>{category.name}</span>
          {productCounts[category.value] !== undefined && (
            <Badge variant="secondary" className="ml-2">
              {productCounts[category.value]}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  )
}
