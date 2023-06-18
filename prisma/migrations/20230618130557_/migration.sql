-- AlterTable
ALTER TABLE `Class` MODIFY `startTime` DATE NOT NULL,
    MODIFY `endTime` DATE NOT NULL;

-- AlterTable
ALTER TABLE `Member` MODIFY `birthday` DATE NOT NULL,
    MODIFY `joinedDate` DATE NOT NULL,
    MODIFY `contractEndDate` DATE NULL;
