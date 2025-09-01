"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatedLogo } from "./animated-logo"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"
import { LogOut, Package, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/admin" className="flex items-center">
            <AnimatedLogo />
            <span className="ml-2 text-sm font-medium text-muted-foreground">Admin</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/admin/orders"
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors",
                pathname.startsWith("/admin/orders") && "text-primary",
              )}
            >
              <ShoppingBag className="h-4 w-4 inline mr-2" />
              Orders
            </Link>
            <Link
              href="/admin/products"
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors",
                pathname.startsWith("/admin/products") && "text-primary",
              )}
            >
              <Package className="h-4 w-4 inline mr-2" />
              Products
            </Link>
          </nav>

          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
