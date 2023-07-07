import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const classId = event.context.params.id
  const classToUpdate: object = await readBody(event)

  let message: String = ''

  try {
    const updatedClass = await prisma.class.update({
      where: {
        id: classId
      },
      // For insomnia JSON array
      // data: classToUpdate[0]

      data: classToUpdate
    })

    message = `${updatedClass.name} has been updated`
    return updatedClass
  } catch (e) {
    message = e
    return e
  } finally {
    await prisma.$disconnect()
    console.log(message)
  }
})


