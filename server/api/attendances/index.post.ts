import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const attendance: object = await readBody(event)
  const attendeeId: string = attendance["attendeeId"]
  const sessionId: string = attendance["sessionId"]
  const sessionDate: string = attendance["sessionDate"]

  try {
    const attendee = await prisma.member.findUnique({ where: { id: attendeeId } })
    const sessAttended = await prisma.session.findUnique({ where: { id: sessionId } })

    if(attendee && sessAttended) {
      console.log(typeof(sessionDate), sessionDate)
      const sessDateObj = new Date(sessionDate)
      const validDOW = sessDateObj.getDay() === sessAttended.dayOfWeek
      // const dayDiff = calculateDateDifference(sessAttended.startDate, sessDateObj)
      // const dateMatchesIntervalDays = dayDiff % sessAttended?.intervalDays == 0 // Based on dow
      // const dateIsAfterClassStartDate = dayDiff >= 0

      // if (dateMatchesIntervalDays && dateIsAfterClassStartDate) {
      if (validDOW) {
        const newAttendance = await prisma.attendance.upsert({
          where: {
            attendeeId_sessionId_sessionDate: {
              attendeeId,
              sessionId,
              sessionDate: new Date(sessionDate),
            }
          },
          update: {},
          create: {
            attendeeId,
            sessionId,
            sessionDate: new Date(sessionDate),
          }
          // For insomnia JSON array
          // data: attendance[0]
        })

        console.log(`Created attendance for ${attendee?.fullName} at ${sessAttended?.name} (${attendance.sessionDate})`)
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
