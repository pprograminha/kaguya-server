import { IRole } from '@modules/roles/domain/entities/irole';
import { IRolesRepository } from '@modules/roles/domain/repositories/roles-repository';
import { CreateRoleDTO } from '@modules/roles/dtos/create-role-dto';
import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
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

  async create(data: CreateRoleDTO): Promise<IRole> {
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

  async listAllRoles(data?: FiltersDTO): Promise<IRole[]> {
    const roles = await prisma.role.findMany({
      orderBy: {
        ...(data && data.order
          ? { created_at: data.order }
          : {
              permission: 'asc',
            }),
      },
      skip: data?.skip,
      take: data?.take,
    });

    return roles as IRole[];
  }
}
