import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const PAYMENT_RATE = 0.6

async function main() {
  const members = await prisma.member.findMany()
  const now = new Date()

  console.log("---------------------------------Seeding Payment---------------------------------")
  for (let i = 0; i < members.length; i++) {
    const date = members[i].joinedDate

    // loop through each month
    while ((date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) || date < now) {

      let year = date.getFullYear()
      let month = date.getMonth()
      const startDateOfMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0)); // Start of the month in UTC
      const endDateOfMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)); // End of the month in UTC

      const attendance = await prisma.attendance.findFirst({
        where: {
          AND: {
            sessionDate: {
              lte: endDateOfMonth,
              gte: startDateOfMonth
            },
            attendeeId: members[i].id
          }
        },
      })

      if (attendance) {
        if (Math.random() < PAYMENT_RATE) {
          await prisma.payment.create({
            data: {
              year, month, memberId: members[i].id, state: 'paid'
            }
          })
        } else {
          await prisma.payment.create({
            data: {
              year, month, memberId: members[i].id, state: 'due'
            }
          })
        }
      } else {
        await prisma.payment.create({
          data: {
            year, month, memberId: members[i].id, state: 'na'
          }
        })
      }

      date.setMonth(date.getMonth() + 1)
      // console.log(members[i].fullName, date, date.getFullYear() < now.getFullYear())
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
