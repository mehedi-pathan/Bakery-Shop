"use client"

import { useEffect, useState } from "react"

export function AuthBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Top floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full opacity-50 animate-float-delayed"></div>
      <div className="absolute top-32 left-1/3 w-12 h-12 bg-gradient-to-br from-coral-200 to-coral-300 rounded-full opacity-40 animate-float-slow"></div>

      {/* Bottom floating elements */}
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-orange-300 to-coral-300 rounded-full opacity-50 animate-float"></div>
      <div className="absolute bottom-20 left-20 w-18 h-18 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-40 animate-float-delayed"></div>
      <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-gradient-to-br from-coral-300 to-orange-300 rounded-full opacity-30 animate-float-slow"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-yellow-50/30"></div>
    </div>
  )
}
