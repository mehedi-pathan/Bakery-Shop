import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Clock, Gift, Percent } from "lucide-react"
import Link from "next/link"

const offers = [
  {
    title: "Morning Special",
    description: "Fresh croissants and coffee combo",
    discount: "30% OFF",
    time: "6:00 AM - 10:00 AM",
    icon: Clock,
    color: "bg-gradient-to-r from-accent to-secondary",
  },
  {
    title: "Weekend Treat",
    description: "Buy 2 pizzas, get 1 pastry free",
    discount: "FREE PASTRY",
    time: "Saturday & Sunday",
    icon: Gift,
    color: "bg-gradient-to-r from-primary to-accent",
  },
  {
    title: "Bulk Order",
    description: "Orders above ৳1000 get special discount",
    discount: "15% OFF",
    time: "All Day",
    icon: Percent,
    color: "bg-gradient-to-r from-secondary to-primary",
  },
]

export function SpecialOffers() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Special Offers & Deals</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Don't miss out on our amazing deals! Fresh savings on fresh food.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => {
            const IconComponent = offer.icon
            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className={`h-2 ${offer.color}`}></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${offer.color} text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-bold">
                      {offer.discount}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-foreground">{offer.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{offer.description}</p>
                  <p className="text-xs text-primary font-medium mb-4">Valid: {offer.time}</p>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    <Link href="/menu">Order Now</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
