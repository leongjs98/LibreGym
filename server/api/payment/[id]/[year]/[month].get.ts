import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const memberId = event.context.params?.id
  let yearStr = event.context.params?.year
  let monthStr = event.context.params?.month

  try {
    if (memberId && yearStr && monthStr) {
      const year = parseInt(yearStr)
      const month = parseInt(monthStr)

      const payment = await prisma.payment.findFirst({
        where: {
          memberId,
          year,
          month
        }
      })

      return payment
    }
  } catch (e) {
    throw (e)
  } finally {
    await prisma.$disconnect()
  }
})
