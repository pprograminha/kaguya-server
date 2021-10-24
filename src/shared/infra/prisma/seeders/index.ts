/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcryptjs';
import { prisma } from '../connection';

const main = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: process.env.ADMIN_ACCESS || '******@*****.****',
    },
  });

  if (user) return;

  const platformRoleId = uuid();
  const platformUserRoleId = uuid();
  const userId = uuid();

  await prisma.user.create({
    data: {
      id: userId,
      name: process.env.ADMIN_NAME || '*****',
      email: process.env.ADMIN_ACCESS || '******@*****.****',
      password: hashSync(process.env.ADMIN_PASS || '*****'),
      username: process.env.ADMIN_USER || '*****',
    },
  });

  await prisma.platformRole.createMany({
    data: [
      {
        id: platformRoleId,
        role: 'admin',
        permission: 0,
      },
      {
        id: uuid(),
        role: 'sub-admin',
        permission: 1,
      },
      {
        id: uuid(),
        role: 'default',
        permission: 2,
      },
    ],
  });

  await prisma.platformUserRole.create({
    data: {
      id: platformUserRoleId,
      platform_role_id: platformRoleId,
      user_id: userId,
    },
  });
};

main()
  .catch(error => console.error(error))
  .finally(() => console.log('seeders done here!'));
