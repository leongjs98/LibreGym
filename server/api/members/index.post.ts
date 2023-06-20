import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const member: object = await readBody(event)

  let message: String = ''
  console.log("Create member API invoked")
  // console.log(member, typeof(member))

  try {
    const members = await prisma.member.create({
      // For insomnia JSON array
      // data: member[0]

      data: member
    })

    // const fullName = member[0].fullName
    // const sex = member[0].sex

    const fullName = member.fullName
    const sex = member.sex

    message = `New member, ${fullName} (${sex}) created`
  } catch (e) {
    console.error(e)
    message = `Failed to create new member, ${fullName} (${sex})\n${e}`
  } finally {
    await prisma.$disconnect()
    console.log(message)
    return message
  }

})
