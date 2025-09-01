let PrismaClient: any
let prisma: any

try {
  const PrismaModule = require("@prisma/client")
  PrismaClient = PrismaModule.PrismaClient

  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined
  }

  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      errorFormat: "pretty",
    })

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

  console.log("🔄 Prisma client initialized successfully")
} catch (error) {
  console.error("❌ Prisma client initialization failed:", error)
  console.log("⚠️ Database may not be set up. Please run the database setup scripts.")

  // Create a mock prisma client that returns empty results
  prisma = {
    user: {
      findUnique: () => Promise.resolve(null),
      findMany: () => Promise.resolve([]),
      create: () => Promise.reject(new Error("Database not initialized")),
      update: () => Promise.reject(new Error("Database not initialized")),
      delete: () => Promise.reject(new Error("Database not initialized")),
    },
    product: {
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve(null),
      create: () => Promise.reject(new Error("Database not initialized")),
      update: () => Promise.reject(new Error("Database not initialized")),
      delete: () => Promise.reject(new Error("Database not initialized")),
    },
    order: {
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve(null),
      create: () => Promise.reject(new Error("Database not initialized")),
      update: () => Promise.reject(new Error("Database not initialized")),
      delete: () => Promise.reject(new Error("Database not initialized")),
    },
    orderItem: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.reject(new Error("Database not initialized")),
    },
    $connect: () => Promise.resolve(),
    $disconnect: () => Promise.resolve(),
  }
}

export { prisma }
