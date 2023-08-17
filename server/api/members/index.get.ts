import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    if (query['IDs']) {

      const memberIDsArr = query['IDs'].toString().split(",");

      const memberIDs = memberIDsArr.map((item) => {
        return { id: item };
      })

      const members = await prisma.member.findMany({
        where: {
          OR: memberIDs
        },
      })

      return members

    } else if (query['sessionDate'] && query['sessionId']) {
      let sessDateStr = query['sessionDate'].toString()
      if (sessDateStr.includes('/')) {
        sessDateStr = sessDateStr.replace(/\//g, '-')
      }
      const sessionDate = new Date(sessDateStr)
      const sessionId = query['sessionId'].toString()

      const attedanceIDs = await prisma.attendance.findMany({
        where: {
          sessionDate,
          sessionId,
        },
        select: {
          attendeeId: true
        }
      })

      let memberIDsArr: string[] = []

      for (let i = 0; i < attedanceIDs.length; i++) {
        memberIDsArr.push(attedanceIDs[i].attendeeId)
      }

      const memberIDs = memberIDsArr.map((item) => {
        return { id: item };
      })

      if (query["exclude"] == "true") {
        const nonAttendees = await prisma.member.findMany({
          where: {
            NOT: {
              OR: memberIDs
            }
          },
        })

        return nonAttendees 

      } else {
        const attendees = await prisma.member.findMany({
          where: {
            OR: memberIDs
          },
        })

        return attendees
      }

    } else {
      const allMembers = await prisma.member.findMany()
      return allMembers 
    }
  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }
})
