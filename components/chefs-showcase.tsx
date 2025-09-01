import { Card, CardContent } from "./ui/card"

export function ChefsShowcase() {
  const chefs = [
    {
      title: "Master Baker at Work",
      description:
        "Watch our skilled bakers craft artisan breads and pastries with traditional techniques passed down through generations.",
      image: "/professional-baker-kneading-dough-in-modern-bakery.png",
      highlight: "Fresh bread every 2 hours",
    },
    {
      title: "Pizza Perfection",
      description:
        "Our pizza chefs hand-stretch every dough and top with the finest ingredients before sliding into our wood-fired oven.",
      image: "/chef-making-pizza-with-fresh-ingredients-in-wood-f.png",
      highlight: "Wood-fired authentic taste",
    },
    {
      title: "Fresh Juice Bar",
      description:
        "Experience the vibrant colors and fresh flavors as our team prepares your favorite juices and smoothies right before your eyes.",
      image: "/cheerful-staff-making-fresh-fruit-juice-and-smooth.png",
      highlight: "100% fresh fruits daily",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Chefs in <span className="text-orange-500">Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the artistry and passion behind every dish as our talented chefs create culinary magic right
            before your eyes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-orange-100"
            >
              <div className="relative">
                <img src={chef.image || "/placeholder.svg"} alt={chef.title} className="w-full h-64 object-cover" />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {chef.highlight}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{chef.title}</h3>
                <p className="text-gray-600 leading-relaxed">{chef.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
