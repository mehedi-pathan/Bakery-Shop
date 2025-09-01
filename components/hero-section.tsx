import { Button } from "./ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/beautiful-bakery-interior-with-fresh-bread-display.png" alt="Fresh Bakery Interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 via-amber-900/50 to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6 leading-tight">
              Fresh Bakery & Live Cooking <span className="text-yellow-300">in Front of You</span>
            </h1>
            <p className="text-xl text-orange-100 text-pretty mb-8 max-w-xl">
              Order now & pick up within 30 minutes. Experience the aroma of freshly baked goods, artisan pizzas, and
              delicious pastries made with love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg px-8 py-6 bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/menu">View Menu</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Call Now: 01622839616
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Today's Special</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🍞</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Fresh Sourdough Bread</h4>
                    <p className="text-orange-100 text-sm">Baked every 2 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🍕</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Wood-Fired Pizza</h4>
                    <p className="text-orange-100 text-sm">Made to order</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  )
}
