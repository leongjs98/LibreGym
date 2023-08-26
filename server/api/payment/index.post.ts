import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const data = await readBody(event)

  const memberId = data.memberId
  const year = data.year
  const month = data.month
  let date: Date | null = new Date(data.date)
  const state = data.state


  if (state !== 'paid')
    date = null

  try {
    console.log(memberId, year, month, date, state)
    const payment = await prisma.payment.upsert({
      where: {
        memberId_year_month: {
          memberId, year, month
        }
      },
      update: {
        date, state
      },
      create: {
        memberId, year, month, date, state
      }
    })
    return payment
  } catch (e) {
    throw e
  } finally {
    prisma.$disconnect()
  }
})
