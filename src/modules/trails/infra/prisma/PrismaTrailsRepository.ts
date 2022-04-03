import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { FindAllTrailsDTO } from '@modules/trails/dtos/FindAllTrailsDTO';
import { ICreateTrailDTO } from '@modules/trails/dtos/ICreateTrailDTO';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

export class PrismaTrailsRepository implements ITrailsRepository {
  async findByName(name: string): AsyncMaybe<ITrail> {
    const trail = await prisma.trail.findFirst({
      where: {
        name: {
          equals: name.replace(/-/g, ' '),
          mode: 'insensitive',
        },
      },
      include: {
        user_trails: true,
        _count: {
          select: {
            playlists: true,
            user_trails: true,
          },
        },
        playlists: {
          include: {
            blocks: {
              include: {
                classes: true,
                _count: {
                  select: {
                    classes: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return trail as unknown as ITrail;
  }

  async save({
    id: trail_id,
    avatar,
    description,
    name,
  }: ITrail): Promise<ITrail> {
    const trailUpdated = await prisma.trail.update({
      where: {
        id: trail_id,
      },
      data: {
        avatar,
        description,
        name,
      },
    });

    return trailUpdated as ITrail;
  }

  async destroyById(trail_id: string): Promise<void> {
    await prisma.trail.delete({
      where: {
        id: trail_id,
      },
    });
  }

  async findAllTrails(data: FindAllTrailsDTO): Promise<ITrail[]> {
    const trails = await prisma.trail.findMany({
      ...(data && data.except_user_id
        ? {
            where: {
              NOT: {
                user_trails: {
                  some: {
                    user_id: data.except_user_id,
                  },
                },
              },
            },
          }
        : {}),
      include: {
        _count: {
          select: {
            playlists: true,
            user_trails: true,
          },
        },
        user_trails: true,
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
      },
      ...(data && data.order
        ? {
            orderBy: [
              {
                created_at: data.order,
              },
            ],
          }
        : {}),
      take: data?.take,
      skip: data?.skip,
    });

    return trails as unknown as ITrail[];
  }

  async create(data: ICreateTrailDTO): Promise<ITrail> {
    const trail = await prisma.trail.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
      },
    });

    return trail as ITrail;
  }

  async findById(trail_id: string): AsyncMaybe<ITrail> {
    const trail = await prisma.trail.findUnique({
      where: {
        id: trail_id,
      },
      include: {
        user_trails: true,
        _count: {
          select: {
            playlists: true,
            user_trails: true,
          },
        },
        playlists: {
          include: {
            blocks: {
              include: {
                classes: true,
                _count: {
                  select: {
                    classes: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return trail as unknown as ITrail;
  }
}
