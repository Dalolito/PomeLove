/*
  Warnings:

  - You are about to drop the column `fileName` on the `puppy_media` table. All the data in the column will be lost.
  - You are about to drop the column `fileSize` on the `puppy_media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `puppies` ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `puppy_media` DROP COLUMN `fileName`,
    DROP COLUMN `fileSize`;
