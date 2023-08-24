// import { argv } from 'node:process';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const ATTENDANCE_RATE = 0.3

// argv.forEach((val, i) => {
//   console.log(val, typeof(val))
// })

async function main() {
  console.log("---------------------------------Deleting Attendance---------------------------------")
  prisma.attendance.deleteMany()

  const members = await prisma.member.findMany()
  const today = new Date()

  console.log("---------------------------------Creating Attedances---------------------------------")
  // one week
  // for (let i = 0; i < 7; i++) {
  //   // Get dates of the current week (Thought of this on my own, I am a genius)
  //   const sessionDate = new Date(today.setUTCHours((i - today.getUTCDay()) * 24, 0, 0, 0))
  //
  //   const dayOfWeek = sessionDate.getDay()
  //
  //   const sessions = await prisma.session.findMany({
  //     where: { dayOfWeek }
  //   })
  //
  //   for (let j = 0; j < sessions.length; j++) {
  //     const sessionId = sessions[j].id
  //
  //     for (let k = 0; k < members.length; k++) {
  //       const attendeeId = members[k].id
  //       if (Math.random() < 0.6) {
  //         const attendance = await prisma.attendance.create({
  //           data: {
  //             sessionDate,
  //             sessionId,
  //             attendeeId,
  //           }
  //         })
  //
  //         // console.log(`${members[k].fullName} attended ${sessionId} on ${sessionDate}`)
  //         // console.log(attendance)
  //       } else {
  //         // console.log('nope')
  //       }
  //     }
  //   }
  //
  // }

  for (let i = 0; i < members.length; i++) {
    const startDate = new Date(members[i].joinedDate)
    const nowDate = new Date()

    for (; startDate < nowDate; startDate.setDate(startDate.getDate() + 1)) {
      if (Math.random() < ATTENDANCE_RATE) {
        const dayOfWeek = startDate.getDay()

        const sessionAttended = await prisma.session.findFirst({
          where: {
            dayOfWeek,
          }
        })

        if (sessionAttended) {
          const sessionDate = startDate
          const sessionId = sessionAttended.id
          const attendeeId = members[i].id

          await prisma.attendance.create({
            data: {
              sessionDate,
              sessionId,
              attendeeId,
            }
          })
        }

      }
    }
  }
}

main()
  .catch((err) => {
    throw err
  })
  .finally(async () => {
    console.log("Classes Seeding completed...\nDisconnecting Prisma")
    await prisma.$disconnect()
  })
