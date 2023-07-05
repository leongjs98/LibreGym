import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    const members = await prisma.member.findMany()
    return members
  } catch (e) {
    return e
  } finally {
    await prisma.$disconnect()
  }
})
