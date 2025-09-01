"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthBackground } from "@/components/auth-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { Loader2, Mail, Lock } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/orders")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      <AuthBackground />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0 animate-fade-in-up">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-coral-500 rounded-full flex items-center justify-center mb-4 animate-pulse-gentle">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-coral-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <p className="text-gray-600 mt-2">Sign in to your Fresh Bakery account</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg animate-shake">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <PasswordInput
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      className="pl-10 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <p className="font-semibold text-blue-800 text-sm mb-2">🔑 Admin Access</p>
                  <div className="text-xs space-y-1">
                    <p className="text-blue-700">
                      <span className="font-medium">Email:</span> admin@bakery.com
                    </p>
                    <p className="text-blue-700">
                      <span className="font-medium">Password:</span> admin123
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-coral-500 hover:from-orange-600 hover:to-coral-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center pt-4">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link
                    href="/auth/signup"
                    className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors duration-200"
                  >
                    Create Account
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
