-- AlterTable
ALTER TABLE `puppies` ADD COLUMN `description_en` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `description_es` VARCHAR(191) NOT NULL DEFAULT '';
