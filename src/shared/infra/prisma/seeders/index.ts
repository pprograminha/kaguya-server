import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcryptjs';
import { prisma } from '../connection';

const main = async () => {
  const roleId = uuid();
  const userRoleId = uuid();
  const userId = uuid();

  await prisma.user.create({
    data: {
      id: userId,
      name: process.env.ADMIN_NAME || '*****',
      email: process.env.ADMIN_ACCESS || '******@*****.****',
      password: hashSync(process.env.ADMIN_PASS || '*****'),
      username: process.env.ADMIN_USERNAME || '*****',
    },
  });

  await prisma.role.createMany({
    data: [
      {
        id: roleId,
        name: 'admin',
        permission: 0,
      },
      {
        id: uuid(),
        name: 'sub-admin',
        permission: 1,
      },
      {
        id: uuid(),
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
  .finally(() => console.log('seeders up!'));
