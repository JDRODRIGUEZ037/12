const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Fetching SocialAccount records...");
  const accounts = await prisma.socialAccount.findMany({
    include: { user: true }
  });
  console.log("Accounts found:", JSON.stringify(accounts, null, 2));
}

main()
  .catch(e => console.error("Error checking database:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
