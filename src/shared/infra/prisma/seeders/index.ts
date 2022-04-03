import { hashSync } from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '../connection';

const main = async () => {
  const roleId = crypto.randomUUID();
  const userRoleId = crypto.randomUUID();
  const userId = crypto.randomUUID();

  const data = {
    id: userId,
    name: process.env.ADMIN_NAME || '*****',
    email: process.env.ADMIN_ACCESS || '******@*****.****',
    password: hashSync(process.env.ADMIN_PASS || '*****'),
    username: process.env.ADMIN_USERNAME || '*****',
  };

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) return;

  await prisma.user.create({
    data,
  });

  await prisma.role.createMany({
    data: [
      {
        id: roleId,
        name: 'admin',
        permission: 0,
      },
      {
        id: crypto.randomUUID(),
        name: 'sub-admin',
        permission: 1,
      },
      {
        id: crypto.randomUUID(),
        name: 'default',
        permission: 2,
      },
    ],
  });

  await prisma.userRole.create({
    data: {
      id: userRoleId,
      role_id: roleId,
      user_id: userId,
    },
  });
};

main()
  .catch(error => console.error(error))
  .finally(() => console.log('Seeders up!'));
