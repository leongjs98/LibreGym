import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const attendance: object = await readBody(event)
  const attendeeId: string = attendance["attendeeId"]
  const classId: string = attendance["classId"]
  const classDate: string = attendance["classDate"]

  let message: String = ''

  try {
    const attendee = await prisma.member.findUnique({ where: { id: attendeeId } })
    const classAttended = await prisma.class.findUnique({ where: { id: classId } })

    if(attendee && classAttended) {
      const classDateObject = new Date(classDate)
      const dayDiff = calculateDateDifference(classAttended.startDate, classDateObject)
      const dateMatchesIntervalDays = dayDiff % classAttended?.intervalDays == 0 // Based on dow
      const dateIsAfterClassStartDate = dayDiff >= 0

      if (dateMatchesIntervalDays && dateIsAfterClassStartDate) {
        const newAttendance = await prisma.attendance.upsert({
          where: {
            attendeeId_classId_classDate: {
              attendeeId: attendeeId,
              classId: classId,
              classDate: classDate,
            }
          },
          update: {},
          create: {
            attendeeId,
            classId,
            classDate,
          }
          // For insomnia JSON array
          // data: attendance[0]
        })

        message = `Created attendance for ${attendee?.fullName} at ${classAttended?.name} (${attendance.classDate})`
        return newAttendance
      }

      message = `Invalid date.`
    }

    message = "Member or class do not exist"

  } catch (e) {
    console.log(e)
    return e
  } finally {
    await prisma.$disconnect()
    // console.log(message)
  }

})

function calculateDateDifference(startDate: Date, endDate: Date): number {
  // Set the time values of startDate and endDate to midnight (00:00:00.000)
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0);

  const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  // Convert both dates to UTC to avoid issues with daylight saving time
  const startUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const endUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  // Calculate the difference in days
  const daysDifference = Math.floor((endUTC - startUTC) / millisecondsPerDay);

  return daysDifference;
}
