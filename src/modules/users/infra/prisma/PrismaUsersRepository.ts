import { v4 as uuid } from 'uuid';
import { IUser } from '@modules/users/domain/entities/IUser';
import {
  FindAllUsersAssociatedWithTheTrailDTO,
  FindAllUsersAssociatedWithTheBlockDTO,
  IRelationshipsDTO,
  IUsersRepository,
  FindAllUsersAssociatedWithThePlaylistDTO,
} from '@modules/users/domain/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { prisma } from '@shared/infra/prisma/connection';
import { FiltersDTO } from '@modules/trails/domain/repositories/ITrailsRepository';

class PrismaUsersRepository implements IUsersRepository {
  async findAllUsersAssociatedWithThePlaylist({
    playlist_id,
    order,
    skip,
    take,
  }: FindAllUsersAssociatedWithThePlaylistDTO): Promise<IUser[]> {
    const users = await prisma.user.findMany({
      where: {
        user_playlists: {
          some: {
            playlist_id,
          },
        },
        enabled: true,
      },
      ...(order
        ? {
            orderBy: [
              {
                created_at: order,
              },
            ],
          }
        : {}),
      skip,
      take,
    });

    return users as IUser[];
  }

  async findAllUsersAssociatedWithTheBlock({
    block_id,
    order,
    skip,
    take,
  }: FindAllUsersAssociatedWithTheBlockDTO): Promise<IUser[]> {
    const users = await prisma.user.findMany({
      where: {
        user_blocks: {
          some: {
            block_id,
          },
        },
        enabled: true,
      },
      ...(order
        ? {
            orderBy: [
              {
                created_at: order,
              },
            ],
          }
        : {}),
      skip,
      take,
    });

    return users as IUser[];
  }

  async findAllUsersAssociatedWithTheTrail({
    trail_id,
    order,
    skip,
    take,
  }: FindAllUsersAssociatedWithTheTrailDTO): Promise<IUser[]> {
    const users = await prisma.user.findMany({
      where: {
        user_trails: {
          some: {
            trail_id,
          },
        },
        enabled: true,
      },
      ...(order
        ? {
            orderBy: [
              {
                created_at: order,
              },
            ],
          }
        : {}),
      skip,
      take,
    });

    return users as IUser[];
  }

  async findByUsername(
    username: string,
    relationship: IRelationshipsDTO,
  ): Promise<IUser | undefined> {
    const user = await prisma.user.findFirst({
      where: {
        username,
        enabled: true,
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
    return (user || undefined) as IUser;
  }

  async findByEmail(
    email: string,
    relationship: IRelationshipsDTO,
  ): Promise<IUser | undefined> {
    const user = await prisma.user.findFirst({
      where: {
        email,
        enabled: true,
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
    return (user || undefined) as IUser;
  }

  async findById(
    id: string | number,
    relationship: IRelationshipsDTO,
  ): Promise<IUser | undefined> {
    const user = await prisma.user.findFirst({
      where: {
        id: String(id),
        enabled: true,
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
    return (user || undefined) as IUser;
  }

  async create({
    email,
    name,
    password,
    username,
  }: ICreateUserDTO): Promise<IUser> {
    const user = await prisma.user.create({
      data: {
        id: uuid(),
        email,
        name,
        password,
        username,
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

  async findAll({ order, skip, take }: FiltersDTO): Promise<IUser[]> {
    const users = await prisma.user.findMany({
      include: {
        user_roles: {
          include: {
            role: true,
          },
        },
      },
      where: {
        enabled: true,
      },
      ...(order
        ? {
            orderBy: [
              {
                created_at: order,
              },
            ],
          }
        : {}),
      skip,
      take,
    });

    return users as IUser[];
  }
}

export { PrismaUsersRepository };
