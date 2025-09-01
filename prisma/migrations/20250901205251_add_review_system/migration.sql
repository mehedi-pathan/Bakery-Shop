-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_orderId_key" ON "public"."reviews"("orderId");

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
