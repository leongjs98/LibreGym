import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const member: object = await readBody(event)

  let message: String = ''

  try {
    const members = await prisma.member.create({
      data: member[0]
    })

    const fullName = member[0].fullName
    const sex = member[0].sex
    message = `New member, ${fullName} (${sex}) created`
  } catch (e) {
    console.error(e)
    message = `Failed to create new member, ${fullName} (${sex})\n${e}`
  } finally {
    await prisma.$disconnect()
    return message
  }

})
