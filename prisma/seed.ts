import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { username: process.env.SEED_USER },
    update: {},
    create: {
      password: String(process.env.SEED_PASS),
      phone: String(process.env.SEED_PHONE),
      role: process.env.SEED_ROLE as Role,
      username: String(process.env.SEED_USER),
      email: String(process.env.SEED_EMAIL),
      name: String(process.env.SEED_NAME),
      active: Boolean(process.env.SEED_ACTIVE),
      isRoot: Boolean(process.env.SEED_ISROOT),
    },
  });
}
main()
  .then(async () => {
    console.log('Seed Ok!');
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
