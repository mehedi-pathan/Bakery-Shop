import { Card, CardContent } from "./ui/card"
import { Clock, MapPin, CreditCard } from "lucide-react"

const promises = [
  {
    icon: Clock,
    title: "Made Fresh",
    description: "All items baked fresh daily with premium ingredients",
  },
  {
    icon: MapPin,
    title: "Pickup Only",
    description: "Quick and convenient pickup service within 30 minutes",
  },
  {
    icon: CreditCard,
    title: "Advance Payment Required",
    description: "Secure your order with advance payment via WhatsApp",
  },
]

export function CustomerPromise() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Our Promise to You</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            We're committed to delivering the highest quality bakery experience with every order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promises.map((promise) => (
            <Card key={promise.title} className="text-center border-0 shadow-none bg-transparent">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <promise.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{promise.title}</h3>
                <p className="text-muted-foreground">{promise.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
