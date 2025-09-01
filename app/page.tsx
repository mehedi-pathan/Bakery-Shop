import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCategories } from "@/components/featured-categories"
import { ChefsShowcase } from "@/components/chefs-showcase"
import { SpecialOffers } from "@/components/special-offers"
import { CustomerSatisfaction } from "@/components/customer-satisfaction"
import { CustomerPromise } from "@/components/customer-promise"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/lazy-components"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <ChefsShowcase />
        <SpecialOffers />
        <CustomerSatisfaction />
        <CustomerPromise />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
