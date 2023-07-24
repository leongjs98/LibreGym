import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {

  try {
    const classes = await prisma.class.findMany({
      orderBy: { name: "asc" }
    })
    return classes
  } catch (err) {
    throw err
  } finally {
    await prisma.$disconnect()
  }
})
