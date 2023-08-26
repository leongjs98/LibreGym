import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("Deleting data")
  await prisma.payment.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.session.deleteMany()
  await prisma.member.deleteMany()
  await prisma.class.deleteMany()
}

main()
  .catch(e => {
    console.error(e.message)
  })
  .finally(async () => {
    console.log("Deletion completed...\nDisconnecting Prisma")
    await prisma.$disconnect()
  })
