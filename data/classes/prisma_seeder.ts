import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const NUMBER_OF_CLASSES = 10;

type ClassName = "Strength & Conditioning" | "Gi BJJ" | "NoGi BJJ" | "Muay Thai"

class Class {
  name!: ClassName;
  startDate!: Date;
  startTime!: Date;
  endTime!: Date;
  intervalDays!: number;
  description!: string;
}

const classes: Class[] = [];

function createRandomClass(): Class {
  const randomTime = faker.date.between('2020-01-01T07:00:00.000Z', '2020-01-01T21:00:00.000Z')
  randomTime.setSeconds(0)
  const startTime = randomTime
  
  const classTimeInMinutes = faker.helpers.arrayElement([60, 90, 120])
  randomTime.setMinutes(randomTime.getMinutes() + classTimeInMinutes)
  const endTime = randomTime

  return {
    name: faker.helpers.arrayElement(["Strength & Conditioning", "Gi BJJ", "NoGi BJJ", "Muay Thai"]),
    startDate: faker.date.between('2023-07-03T07:00:00.000Z', '2023-07-09T07:00:00.000Z'),
    startTime,
    endTime,
    intervalDays: faker.helpers.arrayElement([0, 1, 2, 7, 28]),
    description: faker.lorem.sentences(1),
  };
}

for (let i = 0; i < NUMBER_OF_CLASSES; i++) {
  const singleClass = createRandomClass();
  classes.push(singleClass);
}

async function main() {
  await prisma.class.deleteMany()

  await prisma.class.createMany({
    data: classes
  })
}

main()
  .catch(e => {
    console.error(e.message)
  })
  .finally(async () => {
    console.log("Classes Seeding completed...\nDisconnecting Prisma")
    await prisma.$disconnect()
  })
