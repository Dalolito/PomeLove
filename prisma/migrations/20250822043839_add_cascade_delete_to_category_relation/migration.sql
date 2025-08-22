-- DropForeignKey
ALTER TABLE `puppies` DROP FOREIGN KEY `puppies_categoryId_fkey`;

-- DropIndex
DROP INDEX `puppies_categoryId_fkey` ON `puppies`;

-- AddForeignKey
ALTER TABLE `puppies` ADD CONSTRAINT `puppies_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
