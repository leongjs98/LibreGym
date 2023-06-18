/*
  Warnings:

  - The values [FEMALE,MALE] on the enum `Member_sex` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `status` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.
  - You are about to alter the column `belt` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `Member` MODIFY `sex` ENUM('female', 'male') NOT NULL,
    MODIFY `status` ENUM('enquiry', 'trial', 'member') NOT NULL DEFAULT 'enquiry',
    MODIFY `belt` ENUM('white', 'blue', 'purple', 'brown', 'black') NOT NULL DEFAULT 'white';
