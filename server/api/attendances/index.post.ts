import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const attendance: object = await readBody(event)
  const attendeeId: string = attendance["attendeeId"]
  const sessionId: string = attendance["sessionId"]
  const sessionDate: string = attendance["sessionDate"]

  try {
    const attendeeExist = await prisma.member.findUniqueOrThrow({ where: { id: attendeeId } })
    const sessAttendedExist = await prisma.session.findUniqueOrThrow({ where: { id: sessionId } })

    if(attendeeExist && sessAttendedExist) {
      const sessDateObj = new Date(sessionDate)
      const validDOW = sessDateObj.getDay() === sessAttendedExist.dayOfWeek

      if (validDOW) {
        const attendanceExist = await prisma.attendance.findFirst({
          where: {
            AND: [
              { attendeeId },
              { sessionId },
              { sessionDate: new Date(sessionDate) },
            ]
          }
        })

        if (attendanceExist) {
          throw createError({
            statusCode: 500,
            statusMessage: `Failed to create attendance. Attendance already exist.`
          })
        }

        const newAttendance = await prisma.attendance.create({
          data: {
            attendeeId,
            sessionId,
            sessionDate: new Date(sessionDate),
          }
        })

        console.log(`Created attendance for ${attendeeExist?.fullName} at ${sessAttendedExist?.name} (${attendance.sessionDate})`)
        return newAttendance
      }

      console.log(`Invalid date.`)
    }

    console.log("Member or class do not exist")

  } catch (e) {
    console.log(e)
    return e
  } finally {
    await prisma.$disconnect()
  }

})

// function calculateDateDifference(startDate: Date, endDate: Date): number {
//   // Set the time values of startDate and endDate to midnight (00:00:00.000)
//   startDate.setHours(0, 0, 0, 0)
//   endDate.setHours(0, 0, 0, 0);
//
//   const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
//
//   // Convert both dates to UTC to avoid issues with daylight saving time
//   const startUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
//   const endUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
//
//   // Calculate the difference in days
//   const daysDifference = Math.floor((endUTC - startUTC) / millisecondsPerDay);
//
//   return daysDifference;
// }
