/*
  Warnings:

  - A unique constraint covering the columns `[memberId,year,month]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Payment_year_month_memberId_key` ON `Payment`;

-- CreateIndex
CREATE UNIQUE INDEX `Payment_memberId_year_month_key` ON `Payment`(`memberId`, `year`, `month`);
