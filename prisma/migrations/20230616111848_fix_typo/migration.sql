/*
  Warnings:

  - The values [TRIALS] on the enum `Member_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Member` MODIFY `status` ENUM('ENQUIRY', 'TRIAL', 'MEMBER') NOT NULL DEFAULT 'ENQUIRY';
