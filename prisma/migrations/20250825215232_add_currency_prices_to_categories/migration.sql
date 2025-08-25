/*
  Warnings:

  - You are about to drop the column `minPrice` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `categories` DROP COLUMN `minPrice`,
    ADD COLUMN `minPriceCOP` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `minPriceUSD` DOUBLE NOT NULL DEFAULT 0;
