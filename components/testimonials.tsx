import { Star } from "lucide-react"
import { Card, CardContent } from "./ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "The best bakery in town! Their croissants are absolutely divine and the staff is so friendly.",
    image: "/happy-customer-woman.png",
  },
  {
    name: "Mike Chen",
    rating: 5,
    comment: "I order from here every week. The pizza is amazing and the delivery is always on time!",
    image: "/satisfied-customer-man.png",
  },
  {
    name: "Emily Davis",
    rating: 5,
    comment: "Their custom cakes are works of art! Made my daughter's birthday extra special.",
    image: "/happy-mother-customer.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-br from-accent/10 via-secondary/5 to-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Don't just take our word for it - hear from our happy customers who love our fresh baked goods!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">"{testimonial.comment}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
