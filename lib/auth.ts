import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./db"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials")
            return null
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) {
            console.log("User not found:", credentials.email)
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            console.log("Invalid password for user:", credentials.email)
            return null
          }

          console.log("User authenticated successfully:", user.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("NextAuth authorize error:", error)

          if (error instanceof Error) {
            if (
              error.message.includes('relation "User" does not exist') ||
              error.message.includes("Database not initialized")
            ) {
              console.log("⚠️ Database not set up. Please run: scripts/create-bakery-schema.sql")
              return null
            }
          }

          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
