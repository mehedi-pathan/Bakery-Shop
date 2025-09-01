"use client"

import { X, Gift, Percent, Clock } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"

export function TopBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-center space-x-6 text-sm font-medium">
          <div className="flex items-center space-x-2 animate-pulse">
            <Gift className="w-4 h-4" />
            <span>🔥 Hot Deal: 20% OFF on Fresh Pastries!</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Percent className="w-4 h-4" />
            <span>Use Code: FRESH20</span>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Limited Time: Today Only!</span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-6 w-6 p-0"
        onClick={() => setIsVisible(false)}
      >
        <X className="w-3 h-3" />
      </Button>
    </div>
  )
}
