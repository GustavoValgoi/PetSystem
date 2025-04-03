/*
  Warnings:

  - Added the required column `petshopId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `petshopId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_petshopId_fkey` FOREIGN KEY (`petshopId`) REFERENCES `Petshop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
