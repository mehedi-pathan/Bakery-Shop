import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { redirect } from "next/navigation"
import type { Session } from "next-auth"

export async function requireAdmin() {
  const session = await getServerSession(authOptions) as Session | null

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/auth/signin")
  }

  return session
}
