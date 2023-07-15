/*
  Warnings:

  - A unique constraint covering the columns `[attendeeId,classId,classDate]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Attendance_attendeeId_classId_classDate_key` ON `Attendance`(`attendeeId`, `classId`, `classDate`);
