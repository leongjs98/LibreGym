import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    if (query["attendeeId"] && query["sessionId"] && query["sessionDate"]) {
      const attendeeId = query["attendeeId"].toString()
      const sessionId = query["sessionId"].toString()
      const sessionDate = new Date(query["sessionDate"].toString())
      const singleAttendance = await prisma.attendance.findUnique({
        where: {
          attendeeId_sessionId_sessionDate: {
            attendeeId,
            sessionId,
            sessionDate,
          }
        },
        select: {
          id: true
        }
      })
      return singleAttendance?.id
    } else {
      const allAttedances = await prisma.attendance.findMany()
      return allAttedances
    }
  } catch (e) {
    console.log(e)
    return e
  } finally {
    await prisma.$disconnect()
  }
})
