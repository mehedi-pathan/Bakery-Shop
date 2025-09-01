"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatedLogo } from "./animated-logo"
import { Button } from "./ui/button"
import { ShoppingCart, User, Menu, LogOut, Settings, User as UserIcon } from "lucide-react"
import { useState } from "react"
import { TopBar } from "./top-bar"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { state: cartState } = useCart()

  const isActive = (path: string) => pathname === path

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const getUserInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    if (email) {
      return email[0].toUpperCase()
    }
    return 'U'
  }

  const getUserDisplayName = (name?: string | null, email?: string | null) => {
    if (name) return name
    if (email) return email.split('@')[0]
    return 'User'
  }

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <AnimatedLogo />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  isActive("/") ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary",
                )}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  isActive("/menu")
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                Menu
              </Link>
              <Link
                href="/cart"
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  isActive("/cart")
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                Cart
              </Link>
              <Link
                href="/orders"
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  isActive("/orders")
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                Orders
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="relative">
                <Link href="/cart">
                  <ShoppingCart className="h-4 w-4" />
                  {cartState.items.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold"
                    >
                      {cartState.items.length}
                    </Badge>
                  )}
                </Link>
              </Button>
              
              {status === "loading" ? (
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
              ) : session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" alt={getUserDisplayName(session.user.name, session.user.email)} />
                        <AvatarFallback className="text-xs">
                          {getUserInitials(session.user.name, session.user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline text-sm font-medium">
                        {getUserDisplayName(session.user.name, session.user.email)}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {getUserDisplayName(session.user.name, session.user.email)}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    {(session.user as any).role === "ADMIN" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center">
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/signin">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={cn(
                    "text-sm font-medium transition-colors px-2 py-1 rounded",
                    isActive("/") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary",
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/menu"
                  className={cn(
                    "text-sm font-medium transition-colors px-2 py-1 rounded",
                    isActive("/menu") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary",
                  )}
                >
                  Menu
                </Link>
                <Link
                  href="/cart"
                  className={cn(
                    "text-sm font-medium transition-colors px-2 py-1 rounded flex items-center justify-between",
                    isActive("/cart") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary",
                  )}
                >
                  <span>Cart</span>
                  {cartState.items.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold"
                    >
                      {cartState.items.length}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/orders"
                  className={cn(
                    "text-sm font-medium transition-colors px-2 py-1 rounded",
                    isActive("/orders") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary",
                  )}
                >
                  Orders
                </Link>
                {status === "loading" ? (
                  <div className="flex justify-center pt-2">
                    <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                  </div>
                ) : session?.user ? (
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center space-x-3 px-2 py-2 bg-muted/50 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt={getUserDisplayName(session.user.name, session.user.email)} />
                        <AvatarFallback className="text-xs">
                          {getUserInitials(session.user.name, session.user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {getUserDisplayName(session.user.name, session.user.email)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                        <Link href="/orders">
                          <UserIcon className="h-4 w-4 mr-2" />
                          My Orders
                        </Link>
                      </Button>
                      {(session.user as any).role === "ADMIN" && (
                        <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                          <Link href="/admin">
                            <Settings className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </Link>
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleSignOut}
                        className="w-full justify-start text-destructive hover:text-destructive"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                      <Link href="/auth/signin">Login</Link>
                    </Button>
                    <Button size="sm" asChild className="flex-1 bg-gradient-to-r from-primary to-secondary">
                      <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
