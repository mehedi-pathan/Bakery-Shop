"use client"

import dynamic from 'next/dynamic'

// Lazy load WhatsApp float (not critical for initial render)
export const WhatsAppFloat = dynamic(() => import('./whatsapp-float').then(mod => ({ default: mod.WhatsAppFloat })), {
  loading: () => (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="w-14 h-14 bg-green-600 rounded-full animate-pulse" />
    </div>
  ),
  ssr: false
})

// Lazy load auth background (only needed on auth pages)
export const AuthBackground = dynamic(() => import('./auth-background').then(mod => ({ default: mod.AuthBackground })), {
  loading: () => null,
  ssr: false
})

// Lazy load heavy UI components that aren't immediately visible
export const LazyCartSummary = dynamic(() => import('./cart-summary').then(mod => ({ default: mod.CartSummary })), {
  loading: () => (
    <div className="w-80 h-64 bg-muted animate-pulse rounded-lg" />
  )
})

// Lazy load product management (admin only)
export const LazyProductManagement = dynamic(() => import('./product-management').then(mod => ({ default: mod.ProductManagement })), {
  loading: () => (
    <div className="space-y-4">
      <div className="h-12 bg-muted animate-pulse rounded-lg" />
      <div className="h-96 bg-muted animate-pulse rounded-lg" />
    </div>
  )
})
