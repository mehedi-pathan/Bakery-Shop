"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategorySidebar } from "@/components/category-sidebar"
import { ProductCard } from "@/components/product-card"
import { LazyCartSummary } from "@/components/lazy-components"
import { Input } from "@/components/ui/input"
import { Search, AlertCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  image: string | null
}

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory, searchQuery])

  const fetchProducts = async () => {
    try {
      setError(null)
      const response = await fetch("/api/products")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response. Database may not be initialized.")
      }

      const data = await response.json()

      if (data.error) {
        setError(data.message || data.error)
        setProducts([])
      } else if (Array.isArray(data)) {
        setProducts(data)
      } else if (data.products && Array.isArray(data.products)) {
        setProducts(data.products)
      } else {
        setProducts([])
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to load products"
      setError(errorMessage)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
  }

  const getProductCounts = () => {
    const counts: Record<string, number> = { "": products.length }
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1
    })
    return counts
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Our Menu</h1>

          {error && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error.includes("Database") || error.includes("initialized") ? (
                  <>
                    Database not initialized. Please run the database setup scripts to see products.{" "}
                    <a href="/api/health" className="text-primary hover:underline" target="_blank" rel="noreferrer">
                      Check database status
                    </a>
                  </>
                ) : (
                  error
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              productCounts={getProductCounts()}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {error
                    ? "Unable to load products. Please check database setup."
                    : "No products found matching your criteria."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <aside className="lg:w-80">
            <LazyCartSummary />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
