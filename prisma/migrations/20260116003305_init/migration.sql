/*
  Warnings:

  - You are about to drop the column `securetype` on the `Cotizacion` table. All the data in the column will be lost.
  - You are about to drop the column `tipoSeguroPersonalizado` on the `Cotizacion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cotizacion" DROP COLUMN "securetype",
DROP COLUMN "tipoSeguroPersonalizado";
