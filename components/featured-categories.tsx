import { Card, CardContent } from "./ui/card"
import Link from "next/link"

const categories = [
  {
    name: "Bakery",
    icon: "🥖",
    description: "Fresh bread, croissants & muffins",
    href: "/menu?category=Bakery",
  },
  {
    name: "Pizza",
    icon: "🍕",
    description: "Wood-fired artisan pizzas",
    href: "/menu?category=Pizza",
  },
  {
    name: "Pastry",
    icon: "🥐",
    description: "Delicate pastries & desserts",
    href: "/menu?category=Pastry",
  },
  {
    name: "Drinks",
    icon: "☕",
    description: "Coffee, juices & refreshments",
    href: "/menu?category=Drinks",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Our Specialties</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover our carefully crafted selection of fresh bakery items, made daily with the finest ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
