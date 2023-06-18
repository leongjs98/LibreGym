/*
  Warnings:

  - The values [FEMALE,MALE] on the enum `Member_sex` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Member` MODIFY `sex` ENUM('female', 'male') NOT NULL;
