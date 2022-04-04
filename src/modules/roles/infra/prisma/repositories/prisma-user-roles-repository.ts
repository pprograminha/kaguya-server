import { IUserRole } from '@modules/users/domain/entities/iuser-role';
import { IUserRolesRepository } from '@modules/users/domain/repositories/user-roles-repository';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

export class PrismaUserRolesRepository implements IUserRolesRepository {
  async findByUserId(user_id: string): AsyncMaybe<IUserRole> {
    const userRole = await prisma.userRole.findFirst({
      where: {
        user_id,
      },
    });

    return userRole as IUserRole;
  }

  async findByRoleId(role_id: string): AsyncMaybe<IUserRole> {
    const userRole = await prisma.userRole.findFirst({
      where: {
        role_id,
      },
    });

    return userRole as IUserRole;
  }

  async addRoleToUser(user_id: string, role_id: string): Promise<IUserRole> {
    const userRole = await prisma.userRole.create({
      data: {
        id: crypto.randomUUID(),
        user_id,
        role_id,
      },
    });

    return userRole as IUserRole;
  }
}
