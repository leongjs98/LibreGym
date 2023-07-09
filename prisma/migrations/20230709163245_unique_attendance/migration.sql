/*
  Warnings:

  - A unique constraint covering the columns `[attendeeId,classId,date]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Attendance_attendeeId_classId_date_key` ON `Attendance`(`attendeeId`, `classId`, `date`);
