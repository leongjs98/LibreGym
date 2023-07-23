import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {

  try {

    const modSessions: Object[] = []
    const classNameId: { [id: string]: {
      name: string,
      description: string|null,
      instructor: string|null,
    }} = {}

    const classes = await prisma.class.findMany()

    for (let i = 0; i < classes.length; i++) {
      classNameId[classes[i].id] = { 
        "name": classes[i].name,
        "description": classes[i].description,
        "instructor": classes[i].instructor
      }
    }

    const sessions = await prisma.session.findMany({
      orderBy: { startTime: "asc" }
    })

    for (let i = 0; i < sessions.length; i++) {
      const tmpSession: object = sessions[i]
      tmpSession["name"] = classNameId[sessions[i]["classId"]].name
      tmpSession["description"] = classNameId[sessions[i]["classId"]].description
      tmpSession["instructor"] = classNameId[sessions[i]["classId"]].instructor
      
      modSessions.push(tmpSession)
    }

    return modSessions

  } catch (err) {
    throw err
  } finally {
    await prisma.$disconnect()
  }
})
