import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

interface OrderStatusBadgeProps {
  status: string
  className?: string
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          label: "Pending",
          variant: "secondary" as const,
          className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        }
      case "ADVANCE_VERIFIED":
        return {
          label: "Payment Verified",
          variant: "default" as const,
          className: "bg-green-100 text-green-800 hover:bg-green-200",
        }
      case "IN_PROGRESS":
        return {
          label: "In Progress",
          variant: "secondary" as const,
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        }
      case "READY":
        return {
          label: "Ready for Pickup",
          variant: "secondary" as const,
          className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        }
      case "COMPLETED":
        return {
          label: "Completed",
          variant: "default" as const,
          className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
        }
      case "CANCELLED":
        return {
          label: "Cancelled",
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 hover:bg-red-200",
        }
      default:
        return {
          label: status,
          variant: "secondary" as const,
          className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}
