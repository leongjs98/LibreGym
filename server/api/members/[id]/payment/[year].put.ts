import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  let yearStr = event.context.params?.year

  const data = await readBody(event)

  const existingMember = await prisma.member.findUnique({
    where: { id }
  })

  if (!existingMember) {
    throw createError({
      statusCode: 500,
      statusMessage: `Member with ID: ${id} does not exist`
    })
  }

  if (yearStr && id) {
    const year = parseInt(yearStr)

    const joinedDate = existingMember.joinedDate
    joinedDate.setDate(1)

    for (let i = 0; i < data.length; i++) {
      const paymentMonth = new Date()
      const month = data[i].month
      let date: Date | null = new Date(data[i].date)
      if (!data[i].date) {
        date = null
      }

      let state = data[i].state.toLowerCase()
      paymentMonth.setMonth(month)
      paymentMonth.setFullYear(year)
      paymentMonth.setDate(1)

      const invalidState = state != "paid" && state != "due" && state != "na"
      const validMonthToPayIn = paymentMonth >= joinedDate
      const validPaymentDate = !date ? true : date >= joinedDate

      if (validMonthToPayIn && validPaymentDate) {

        if (invalidState || !date) {
          state = 'na'
        }

        if (date) {
          state = 'paid'
        }

        // update or create
        await prisma.payment.upsert({
          where: {
            memberId_year_month: {
              memberId: id,
              year,
              month
            }
          },
          update: {
            date,
            state,
          },
          create: {
            memberId: id,
            year,
            month,
            date,
            state
          }
        })

      }


    }

    return `Successfully created/updated ${yearStr} payment history for ${existingMember.fullName}`
  }
})

