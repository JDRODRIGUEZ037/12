import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Querying Database...');
  
  const users = await prisma.user.findMany({
    include: {
      accounts: true,
    },
  });

  console.log('--- USERS & CONNECTED ACCOUNTS ---');
  console.dir(users, { depth: null });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
