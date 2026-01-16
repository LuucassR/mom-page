/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `cotizaciones` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "cotizaciones" DROP CONSTRAINT "cotizaciones_userId_fkey";

-- AlterTable
ALTER TABLE "cotizaciones" ALTER COLUMN "es0km" SET DEFAULT false,
ALTER COLUMN "tieneGNC" SET DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "cotizaciones_userId_key" ON "cotizaciones"("userId");

-- AddForeignKey
ALTER TABLE "cotizaciones" ADD CONSTRAINT "cotizaciones_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
