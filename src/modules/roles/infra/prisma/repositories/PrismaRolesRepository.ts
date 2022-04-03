import { IRole } from '@modules/roles/domain/entities/IRole';
import { IRolesRepository } from '@modules/roles/domain/repositories/IRolesRepository';
import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

export class PrismaRolesRepository implements IRolesRepository {
  async destroyById(role_id: string): Promise<void> {
    await prisma.role.delete({
      where: {
        id: role_id,
      },
    });
  }

  async create(data: ICreateRoleDTO): Promise<IRole> {
    const role = await prisma.role.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
      },
    });
    return role as IRole;
  }

  async findByRoleName(name: string): AsyncMaybe<IRole> {
    const role = await prisma.role.findUnique({
      where: {
        name,
      },
    });

    return role as IRole;
  }

  async findByPermission(permission: number): AsyncMaybe<IRole> {
    const role = await prisma.role.findUnique({
      where: {
        permission,
      },
    });

    return role as IRole;
  }

  async findById(role_id: string): AsyncMaybe<IRole> {
    const role = await prisma.role.findUnique({
      where: {
        id: role_id,
      },
    });

    return role as IRole;
  }

  async listAllRoles(): Promise<IRole[]> {
    const roles = await prisma.role.findMany({
      orderBy: {
        permission: 'asc',
      },
    });

    return roles as IRole[];
  }
}
