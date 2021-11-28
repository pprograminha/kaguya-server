import { v4 as uuid } from 'uuid';
import { ITrail } from '@modules/trails/domain/entities/ITrail';
import {
  FiltersDTO,
  ITrailsRepository,
} from '@modules/trails/domain/repositories/ITrailsRepository';
import { ICreateTrailDTO } from '@modules/trails/dtos/ICreateTrailDTO';
import { prisma } from '@shared/infra/prisma/connection';

export class PrismaTrailsRepository implements ITrailsRepository {
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

  async findAllTrails(filters: FiltersDTO): Promise<ITrail[]> {
    const trails = await prisma.trail.findMany({
      include: {
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
      ...(filters
        ? {
            orderBy: [
              {
                created_at: filters.order,
              },
            ],
          }
        : {}),
      take: filters?.take,
      skip: filters?.skip,
    });

    return trails as unknown as ITrail[];
  }

  async create(data: ICreateTrailDTO): Promise<ITrail> {
    const trail = await prisma.trail.create({
      data: {
        id: uuid(),
        ...data,
      },
    });

    return trail as ITrail;
  }

  async findById(trail_id: string): Promise<ITrail | undefined> {
    const trail = await prisma.trail.findUnique({
      where: {
        id: trail_id,
      },
      include: {
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

    return (trail || undefined) as unknown as ITrail;
  }
}
