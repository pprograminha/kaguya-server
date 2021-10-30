import { v4 as uuid } from 'uuid';
import { IUser } from '@modules/users/domain/entities/IUser';
import {
  IRelationshipsDTO,
  IUsersRepository,
} from '@modules/users/domain/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { prisma } from '@shared/infra/prisma/connection';

class PrismaUsersRepository implements IUsersRepository {
  async findByUsername(
    username: string,
    relationship: IRelationshipsDTO,
  ): Promise<IUser | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      ...(relationship && relationship.user_roles
        ? {
            include: {
              user_roles: {
                include: {
                  role: true,
                },
              },
            },
          }
        : {}),
    });
    return user as IUser;
  }

  async findByEmail(
    email: string,
    relationship: IRelationshipsDTO,
  ): Promise<IUser | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      ...(relationship && relationship.user_roles
        ? {
            include: {
              user_roles: {
                include: {
                  role: true,
                },
              },
            },
          }
        : {}),
    });
    return user as IUser;
  }

  async findById(
    id: string | number,
    relationship: IRelationshipsDTO,
  ): Promise<IUser | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
      ...(relationship && relationship.user_roles
        ? {
            include: {
              user_roles: {
                include: {
                  role: true,
                },
              },
            },
          }
        : {}),
    });
    return user as IUser;
  }

  async create(userData: ICreateUserDTO): Promise<IUser> {
    const user = await prisma.user.create({
      data: {
        id: uuid(),
        ...userData,
      },
    });

    return user as IUser;
  }

  async save({
    id,
    avatar,
    email,
    enabled,
    username,
    name,
    password,
  }: IUser): Promise<IUser> {
    const userUpdated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar,
        email,
        enabled,
        username,
        name,
        password,
        updated_at: new Date(),
      },
    });
    return userUpdated as IUser;
  }

  async findAll(): Promise<IUser[]> {
    const users = await prisma.user.findMany({
      include: {
        user_roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return users as unknown as IUser[];
  }
}

export { PrismaUsersRepository };
