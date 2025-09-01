import { requireAdmin } from "@/lib/admin-middleware"
import { AdminHeader } from "@/components/admin-header"
import { KanbanBoard } from "@/components/kanban-board"

export default async function AdminOrdersPage() {
  await requireAdmin()

  return (
    <div className="min-h-screen">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Order Management</h1>
          <p className="text-muted-foreground">Manage and track all customer orders</p>
        </div>

        <KanbanBoard />
      </main>
    </div>
  )
}
