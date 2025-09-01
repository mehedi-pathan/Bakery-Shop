import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CartProvider } from "@/lib/cart-context"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Fresh Bakery Shop - Order Online",
  description: "Fresh bakery goods, pizza, pastries & drinks. Order now & pick up within 30 minutes!",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <CartProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </CartProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
