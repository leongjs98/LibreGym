/*
  Warnings:

  - The values [noAttendance] on the enum `Payment_state` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Payment` MODIFY `state` ENUM('paid', 'due', 'na') NOT NULL;
