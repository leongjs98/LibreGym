import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  try {
    const members = await prisma.member.findMany()
    return members
  } catch (e) {
    console.error(e)
    return e;
  }

  await prisma.$disconnect()
})
