import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  
  try {
    const member = await prisma.member.findUnique({
      where: { id: id }
    })
    return member
  } catch (e) {
    return e
  } finally {
    await prisma.$disconnect()
  }
})
