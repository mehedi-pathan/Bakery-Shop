"use client"

import { AdminHeader } from "@/components/admin-header"
import { LazyProductManagement } from "@/components/lazy-components"

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <LazyProductManagement />
      </main>
    </div>
  )
}
