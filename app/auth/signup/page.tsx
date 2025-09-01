"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthBackground } from "@/components/auth-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { Loader2, CheckCircle, User, Mail, Phone, Lock } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const isFormValid = () => {
    return (
      name.trim().length >= 2 &&
      email.trim().length > 0 &&
      email.includes("@") &&
      phone.trim().length >= 10 &&
      password.length >= 6
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to create account")
      }

      setIsSuccess(true)

      setTimeout(() => {
        router.push("/orders")
      }, 2500)
    } catch (error: any) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen relative">
        <AuthBackground />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0 animate-fade-in-up">
              <CardContent className="pt-12 pb-8">
                <div className="text-center space-y-6">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Welcome to Fresh Bakery! 🎉
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Your account has been created successfully.
                      <br />
                      Redirecting you to your dashboard...
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-coral-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
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
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-coral-600 bg-clip-text text-transparent">
                Join Fresh Bakery
              </CardTitle>
              <p className="text-gray-600 mt-2">Create your account to start ordering</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg animate-shake">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your full name"
                      className={`pl-10 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-200 ${
                        name.trim().length >= 2 ? "border-green-300 bg-green-50/30" : ""
                      }`}
                    />
                  </div>
                  {name.trim().length > 0 && name.trim().length < 2 && (
                    <p className="text-xs text-red-500 animate-fade-in">Name must be at least 2 characters</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address *
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
                      className={`pl-10 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-200 ${
                        email.includes("@") && email.trim().length > 0 ? "border-green-300 bg-green-50/30" : ""
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="Enter your phone number"
                      className={`pl-10 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-200 ${
                        phone.trim().length >= 10 ? "border-green-300 bg-green-50/30" : ""
                      }`}
                    />
                  </div>
                  {phone.trim().length > 0 && phone.trim().length < 10 && (
                    <p className="text-xs text-red-500 animate-fade-in">Phone number must be at least 10 digits</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <PasswordInput
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Create a password"
                      minLength={6}
                      className={`pl-10 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-200 ${
                        password.length >= 6 ? "border-green-300 bg-green-50/30" : ""
                      }`}
                    />
                  </div>
                  {password.length > 0 && password.length < 6 && (
                    <p className="text-xs text-red-500 animate-fade-in">Password must be at least 6 characters</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-coral-500 hover:from-orange-600 hover:to-coral-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isLoading || !isFormValid()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                {!isFormValid() && (
                  <p className="text-xs text-center text-gray-500 animate-fade-in">
                    Please fill out all required fields correctly to continue
                  </p>
                )}

                <div className="text-center pt-4">
                  <span className="text-gray-600">Already have an account? </span>
                  <Link
                    href="/auth/signin"
                    className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors duration-200"
                  >
                    Sign In
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
