import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    if (query["attendeeId"] && query["classId"] && query["classDate"]) {
      const attendeeId = query["attendeeId"]
      const classId = query["classId"]
      const classDate = new Date(query["classDate"])
      const singleAttendance = await prisma.attendance.findUnique({
        where: {
          attendeeId_classId_classDate: {
            attendeeId: attendeeId,
            classId: classId,
            classDate: classDate,
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
