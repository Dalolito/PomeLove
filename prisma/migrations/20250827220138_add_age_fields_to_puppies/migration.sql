-- AlterTable
ALTER TABLE `puppies` ADD COLUMN `ageMonths` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `ageYears` INTEGER NOT NULL DEFAULT 0,
    MODIFY `birthDate` DATETIME(3) NULL;

-- Migrate existing data from birthDate to age fields
UPDATE `puppies` 
SET 
  `ageYears` = FLOOR(TIMESTAMPDIFF(MONTH, `birthDate`, NOW()) / 12),
  `ageMonths` = TIMESTAMPDIFF(MONTH, `birthDate`, NOW()) % 12
WHERE `birthDate` IS NOT NULL;
