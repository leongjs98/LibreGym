import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    if (query["attendeeId"] && query["sessionId"] && query["sessionDate"]) {
      const attendeeId = query["attendeeId"].toString()
      const sessionId = query["sessionId"].toString()
      const sessionDate = new Date(query["sessionDate"].toString())
      const singleAttendance = await prisma.attendance.findUniqueOrThrow({
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
    } else if (query["classId"]) {
      // Get all sessions of a class
      const classId = query["classId"].toString()
      const sessions = await prisma.session.findMany({
        where: { classId },
      })

      let totalAttendees = 0
      for (let i = 0; i < sessions.length; i++) {
        const numAttendees = await prisma.attendance.count({
          where: { sessionId: sessions[i].id }
        })
        totalAttendees += numAttendees
        // avgMembersPerSession[i]['attendance'] = numAttendees
        // console.log(sessions[i].id)
      }

      const avgMembersPerSession: number = totalAttendees / sessions.length
      return avgMembersPerSession
    } else if (query['memberDemographic']) {

      if (query['memberDemographic'] == 'sex') {
        const femaleMember: number = await prisma.member.count({ where: { sex: 'female' } })
        const maleMember: number = await prisma.member.count({ where: { sex: 'male' } })

        return {
          female: femaleMember,
          male: maleMember
        }
      }

    }
    else {
      const classAttendance = await prisma.class.findMany({
        orderBy: { name: "asc" },
        select: { name: true, id: true }
      })

      for (let i = 0; i < classAttendance.length; i++) {
        const sessions = await prisma.session.findMany({
          where: { classId: classAttendance[i].id },
          select: { id: true }
        })

        classAttendance[i]['number'] = 0

        for (let j = 0; j < sessions.length; j++) {
          const attendances = await prisma.attendance.count({
            where: { sessionId: sessions[j]['id'] }
          })

          classAttendance[i]['number'] += attendances
        }
      }

      // Overall members attendance in each class
      return classAttendance
    }
  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }
})
