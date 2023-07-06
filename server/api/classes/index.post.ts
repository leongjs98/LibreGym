import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const classToCreate: object = await readBody(event)

  let message: String = ''

  try {
    const newClass = await prisma.class.create({
      // For insomnia JSON array
      // data: classToCreate[0]

      data: classToCreate
    })

    message = `New class, ${newClass.name} created`

    return newClass
  } catch (e) {
    message = e
    return e
  } finally {
    await prisma.$disconnect()
    console.log(message)
  }
})

