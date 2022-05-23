import { ITrail } from '@modules/trails/domain/entities/itrail';
import { ITrailsRepository } from '@modules/trails/domain/repositories/trails-repository';
import { CreateTrailDTO } from '@modules/trails/dtos/create-trail-dto';
import { FindAllTrailsDTO } from '@modules/trails/dtos/find-all-trails-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

export class PrismaTrailsRepository implements ITrailsRepository {
  async findBySlug(slug: string): AsyncMaybe<ITrail> {
    const trail = await prisma.trail.findFirst({
      where: {
        slug,
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
                lessons: true,
                _count: {
                  select: {
                    lessons: true,
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

  async findByName(name: string): AsyncMaybe<ITrail> {
    const trail = await prisma.trail.findFirst({
      where: {
        name: {
          equals: name,
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
                lessons: true,
                _count: {
                  select: {
                    lessons: true,
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
                    AND: {
                      user_id: data.except_user_id,
                      enabled: true,
                    },
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
                    lessons: true,
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

  async create(data: CreateTrailDTO): Promise<ITrail> {
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
                lessons: true,
                _count: {
                  select: {
                    lessons: true,
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
