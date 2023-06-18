import { faker } from '@faker-js/faker';
import type { SexType } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const NUMBER_OF_MEMBERS = 20;

type Status = 'enquiry' | 'trial' | 'member';
type Belt = 'white' | 'blue' | 'purple' | 'brown' | 'black';

class Member {
  // avatar!: string;
  birthday!: Date;
  fullName!: string;
  sex!: SexType;
  email!: string;
  phoneNumber!: string;
  homeAddress!: string;
  status!: Status;
  belt!: Belt;
  stripe!: number;
  joinedDate!: Date;
  contractEndDate!: Date;
  signedWaiver!: boolean;
  medicalIssues!: string;
  notes!: string;
}

const members: Member[] = [];

function createRandomUser(): Member {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName();
  const fullName = `${firstName} ${lastName}`
  const email = faker.internet.email(firstName, lastName);
  const birthday = faker.date.birthdate({ min: 18, max: 60, mode: 'age' })
  const joinedDate = faker.date.past(10)
  const contractEndDate = faker.date.future(1)

  return {
    birthday,
    email,
    phoneNumber: faker.phone.number('+601#-#######'),
    fullName,
    sex,
    status: faker.helpers.arrayElement(['enquiry', 'trial', 'member']),
    belt: faker.helpers.arrayElement(['white', 'blue', 'purple', 'brown', 'black']),
    stripe: faker.datatype.number({ min: 0, max: 4 }),
    joinedDate,
    contractEndDate,
    medicalIssues: faker.lorem.sentences(1),
    homeAddress: faker.address.streetAddress(true),
    signedWaiver: faker.datatype.boolean(),
    notes: faker.lorem.sentences(1),
  };
}

for (let i = 0; i < NUMBER_OF_MEMBERS; i++) {
  const member = createRandomUser();
  members.push(member);
}

async function main() {
  await prisma.member.deleteMany()

  await prisma.member.createMany({
    data: members
  })
}

main()
  .catch(e => {
    console.error(e.message)
  })
  .finally(async () => {
    console.log("Seeding completed...\nDisconnecting Prisma")
    await prisma.$disconnect()
  })
