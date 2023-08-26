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

      const attendeeIds = await prisma.attendance.findMany({
        where: {
          sessionDate,
          sessionId,
        },
        select: {
          attendeeId: true
        }
      })

      const allMembers = await prisma.member.findMany()

      for (let i = 0; i < allMembers.length; i++) {
        const member = allMembers[i]

        for (let j = 0; j < attendeeIds.length; j++) {
          const attendeeId = attendeeIds[j].attendeeId

          if (member.id == attendeeId) {
            allMembers[i].attended = true
            break
          } else {
            allMembers[i].attended = false
          }
        }
      }

      return allMembers

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
