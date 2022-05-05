import { IUserTrail } from '@modules/trails/domain/entities/iuser-trail';
import {
  IUserTrailsRepository,
  UserTrailsRelationshipDTO,
} from '@modules/trails/domain/repositories/user-trails-repository';
import { FindAllUserTrailsDTO } from '@modules/trails/dtos/find-all-user-trails-dto';
import { CreateUserTrailDTO } from '@modules/trails/dtos/create-user-trail-dto';
import { FindUserTrailDTO } from '@modules/trails/dtos/find-user-trail-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

class PrismaUserTrailsRepository implements IUserTrailsRepository {
  async create(data: CreateUserTrailDTO): Promise<IUserTrail> {
    const userTrail = await prisma.userTrail.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
      },
    });

    return userTrail as IUserTrail;
  }

  async save(userTrail: IUserTrail): Promise<IUserTrail> {
    const userTrailUpdated = await prisma.userTrail.update({
      where: {
        id: userTrail.id,
      },
      data: {
        enabled: userTrail.enabled,
        progress: userTrail.progress,
        updated_at: new Date(),
      },
    });

    return userTrailUpdated as IUserTrail;
  }

  async findById(
    user_trail_id: string,
    relationship: UserTrailsRelationshipDTO,
  ): AsyncMaybe<IUserTrail> {
    const userTrail = await prisma.userTrail.findUnique({
      where: {
        id: user_trail_id,
      },
      ...(relationship && relationship.called_in_user_trail
        ? {
            include: {
              trail: {
                include: {
                  playlists: {
                    include: {
                      blocks: {
                        include: {
                          _count: {
                            select: {
                              classes: true,
                            },
                          },
                        },
                      },
                    },
                  },
                  _count: {
                    select: {
                      user_trails: true,
                      playlists: true,
                    },
                  },
                },
              },
            },
          }
        : {}),
    });

    return userTrail as IUserTrail | null;
  }

  async findUserTrail({
    trail_id,
    user_id,
  }: FindUserTrailDTO): AsyncMaybe<IUserTrail> {
    const userTrail = await prisma.userTrail.findFirst({
      where: {
        trail_id,
        user_id,
      },
      include: {
        trail: true,
      },
    });

    return userTrail as IUserTrail | null;
  }

  async removeById(user_trail_id: string): Promise<void> {
    await prisma.userTrail.delete({
      where: {
        id: user_trail_id,
      },
    });
  }

  async findAllUserTrails({
    user_id,
    order,
    skip,
    take,
  }: FindAllUserTrailsDTO): Promise<IUserTrail[]> {
    const userTrails = await prisma.userTrail.findMany({
      where: {
        user_id,
      },
      include: {
        trail: {
          include: {
            playlists: {
              include: {
                blocks: {
                  include: {
                    _count: {
                      select: {
                        classes: true,
                      },
                    },
                  },
                },
              },
            },
            _count: {
              select: {
                user_trails: true,
                playlists: true,
              },
            },
          },
        },
      },
      take,
      skip,
      ...(order
        ? {
            orderBy: {
              created_at: order,
            },
          }
        : {}),
    });

    return userTrails as unknown as IUserTrail[];
  }
}
export { PrismaUserTrailsRepository };
