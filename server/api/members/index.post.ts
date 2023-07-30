import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const member: object = await readBody(event)

  try {
    const newMember = await prisma.member.create({
      data: member
    })

    return newMember
  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }

})
