// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client

const prisma = new PrismaClient();

async function main() {
  // create two dummy articles

  const user1 = await prisma.user.upsert({
    where: { email: 'johndoe@gmail.com' },

    update: {},

    create: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'Abc123',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'lebowski@gmail.com' },

    update: {},

    create: {
      firstName: 'Big',
      lastName: 'Lebowski',
      email: 'lebowski@gmail.com',
      password: 'Abc123',
    },
  });
  const user3 = await prisma.user.upsert({
    where: { email: 'alexander@gmail.com' },

    update: {},

    create: {
      firstName: 'Alexander',
      lastName: 'Doe',
      email: 'alexander@gmail.com',
      password: 'Abc123',
    },
  });

  console.log({ user1, user2, user3 });
}

// execute the main function

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })

  .finally(async () => {
    // close Prisma Client at the end

    await prisma.$disconnect();
  });
