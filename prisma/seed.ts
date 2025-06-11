import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const emailAdmin = 'admin@example.com';
  const passwordAdmin = 'admin123';
  const hashedPassword = bcrypt.hashSync(passwordAdmin, 10);

  const adminExists = await prisma.user.findUnique({ where: { email: emailAdmin } });

  if (adminExists) {
    console.log('Usuário admin já existe.');
    return;
  }

  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: emailAdmin,
      password: hashedPassword,
      role: 'ADMIN', // ou 'admin', conforme seu schema
    },
  });

  console.log('Usuário admin criado:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
