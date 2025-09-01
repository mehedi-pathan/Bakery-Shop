import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"

export function CustomerSatisfaction() {
  return (
    <section className="py-16 bg-gradient-to-b from-yellow-50 to-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Happy Customers Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Making People <span className="text-yellow-500">Happy</span> Every Day
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Nothing brings us more joy than seeing the smiles on our customers' faces when they taste our fresh
            creations.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="overflow-hidden bg-white border-yellow-100 hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src="/happy-family-enjoying-fresh-bakery-items-together-.png" alt="Happy Family" className="w-full h-64 object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Family Moments</h3>
                <p className="text-gray-600">
                  Creating sweet memories with our freshly baked treats that bring families together around the table.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-white border-yellow-100 hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src="/satisfied-customers-enjoying-coffee-and-pastries-i.png" alt="Satisfied Customers" className="w-full h-64 object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Daily Delights</h3>
                <p className="text-gray-600">
                  Starting every morning right with our signature coffee and warm, flaky pastries that brighten your
                  day.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quality Promise Section */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Promise to You</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-orange-100">Only the finest ingredients make it into our kitchen</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Service</h3>
              <p className="text-orange-100">Fresh orders ready in 30 minutes or less</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Made with Love</h3>
              <p className="text-orange-100">Every item crafted with care and passion</p>
            </div>
          </div>
          <Button size="lg" className="bg-white text-orange-500 hover:bg-orange-50 text-lg px-8 py-6" asChild>
            <Link href="/menu">Order Now & Taste the Difference</Link>
          </Button>
        </div>

        {/* Community Love Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Loved by Our <span className="text-amber-500">Community</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
              <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
              <p className="text-gray-600 font-semibold">Happy Customers</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
              <div className="text-4xl font-bold text-yellow-500 mb-2">50+</div>
              <p className="text-gray-600 font-semibold">Fresh Items Daily</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
              <div className="text-4xl font-bold text-amber-500 mb-2">2</div>
              <p className="text-gray-600 font-semibold">Years of Excellence</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <p className="text-gray-600 font-semibold">WhatsApp Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
