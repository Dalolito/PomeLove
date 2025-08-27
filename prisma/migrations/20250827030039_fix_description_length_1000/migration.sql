/*
  Warnings:

  - You are about to alter the column `gender` on the `puppies` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `mediaType` on the `puppy_media` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `categories` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `puppies` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `fatherImage` VARCHAR(500) NULL,
    MODIFY `motherImage` VARCHAR(500) NULL,
    MODIFY `gender` VARCHAR(10) NOT NULL DEFAULT 'male',
    MODIFY `description_en` VARCHAR(1000) NOT NULL,
    MODIFY `description_es` VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE `puppy_media` MODIFY `mediaUrl` VARCHAR(500) NOT NULL,
    MODIFY `mediaType` VARCHAR(50) NOT NULL;
