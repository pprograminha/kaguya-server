import { IUserRole } from '@modules/users/domain/entities/IUserRole';
import { IUserRolesRepository } from '@modules/users/domain/repositories/IUserRolesRepository';
import { prisma } from '@shared/infra/prisma/connection';
import { v4 as uuid } from 'uuid';

export class PrismaUserRolesRepository implements IUserRolesRepository {
  async findByUserId(user_id: string): Promise<IUserRole | undefined> {
    const userRole = await prisma.userRole.findFirst({
      where: {
        user_id,
      },
    });

    return (userRole as IUserRole | null) || undefined;
  }

  async findByRoleId(role_id: string): Promise<IUserRole | undefined> {
    const userRole = await prisma.userRole.findFirst({
      where: {
        role_id,
      },
    });

    return (userRole as IUserRole | null) || undefined;
  }

  async addRoleToUser(user_id: string, role_id: string): Promise<IUserRole> {
    const userRole = await prisma.userRole.create({
      data: {
        id: uuid(),
        user_id,
        role_id,
      },
    });

    return userRole as IUserRole;
  }
}
