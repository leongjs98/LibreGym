import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  console.log(query)

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

    } else if (query['classDate'] && query['classId']) {
      let classDateString = query['classDate'].toString()
      if (classDateString.includes('/')) {
        // console.log("date includes /")
        classDateString = classDateString.replace(/\//g, '-')
      }
      const classDate = new Date(classDateString)
      const classId = query['classId'].toString()

      // console.log(classDateString, classDate, classId)

      const attedanceIDs = await prisma.attendance.findMany({
        where: {
          classDate,
          classId
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

        console.log(nonAttendees.length)
        return nonAttendees 

      } else {
        const attendees = await prisma.member.findMany({
          where: {
            OR: memberIDs
          },
        })

        console.log(attendees.length)
        return attendees
      }

    } else {
      const allMembers = await prisma.member.findMany()
      return allMembers 
    }
  } catch (e) {
    return e
  } finally {
    await prisma.$disconnect()
  }
})
