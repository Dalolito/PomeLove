/*
  Warnings:

  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - Added the required column `minPrice` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` DROP COLUMN `createdAt`,
    DROP COLUMN `description`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `minPrice` DOUBLE NOT NULL;
