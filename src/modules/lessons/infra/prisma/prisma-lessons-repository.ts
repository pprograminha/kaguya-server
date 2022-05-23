import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import {
  ILessonsRepository,
  RelationshipDTO,
} from '@modules/lessons/domain/repositories/lessons-repository';
import { CreateLessonDTO } from '@modules/lessons/dtos/create-lesson-dto';
import { FindAllLessonsFromBlockDTO } from '@modules/lessons/dtos/find-all-lessons-from-block-dto';
import { FindByNameDTO } from '@modules/lessons/dtos/find-by-name-dto';
import { FindBySlugDTO } from '@modules/lessons/dtos/find-by-slug-dto';
import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

class PrismaLessonsRepository implements ILessonsRepository {
  async findLessonWithMostViews(): AsyncMaybe<ILesson> {
    const lesson = await prisma.lesson.findFirst({
      orderBy: {
        views: {
          _count: 'desc',
        },
      },
    });

    return lesson as ILesson;
  }

  async findBySlug(
    { block_slug, slug }: FindBySlugDTO,
    relationship?: RelationshipDTO,
  ): AsyncMaybe<ILesson> {
    const findedLesson = await prisma.lesson.findFirst({
      where: {
        slug,
        block: {
          slug: block_slug,
        },
      },
      ...(relationship && Object.keys(relationship > 0) && relationship._count
        ? {
            include: {
              _count: {
                select: {
                  dislikes: !!relationship._count.dislikes,
                  likes: !!relationship._count.likes,
                  views: !!relationship._count.views,
                },
              },
            },
          }
        : {}),
    });

    return findedLesson as ILesson;
  }

  async create(data: CreateLessonDTO): Promise<ILesson> {
    const createdLesson = await prisma.lesson.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
      },
    });

    return createdLesson as ILesson;
  }

  async save(_lesson: ILesson): Promise<ILesson> {
    const updatedLesson = await prisma.lesson.update({
      where: {
        id: _lesson.id,
      },
      data: {
        description: _lesson.description,
        name: _lesson.name,
        link: _lesson.link,
        updated_at: new Date(),
      },
    });

    return updatedLesson as ILesson;
  }

  async findById(
    lesson_id: string,
    relationship: RelationshipDTO,
  ): AsyncMaybe<ILesson> {
    const findedLesson = await prisma.lesson.findUnique({
      where: {
        id: lesson_id,
      },
      ...(relationship && Object.keys(relationship > 0) && relationship._count
        ? {
            include: {
              _count: {
                select: {
                  dislikes: !!relationship._count.dislikes,
                  likes: !!relationship._count.likes,
                  views: !!relationship._count.views,
                },
              },
            },
          }
        : {}),
    });

    return findedLesson as ILesson;
  }

  async findByName(
    { name, block_name }: FindByNameDTO,
    relationship?: RelationshipDTO,
  ): AsyncMaybe<ILesson> {
    const findedLesson = await prisma.lesson.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        block: {
          name: {
            equals: block_name,
            mode: 'insensitive',
          },
        },
      },
      ...(relationship && Object.keys(relationship > 0) && relationship._count
        ? {
            include: {
              _count: {
                select: {
                  dislikes: !!relationship._count.dislikes,
                  likes: !!relationship._count.likes,
                  views: !!relationship._count.views,
                },
              },
            },
          }
        : {}),
    });

    return findedLesson as ILesson;
  }

  async destroyById(lesson_id: string): Promise<void> {
    await prisma.lesson.delete({
      where: {
        id: lesson_id,
      },
    });
  }

  async findAllLessons(data?: FiltersDTO): Promise<ILesson[]> {
    const lessons = await prisma.lesson.findMany({
      include: {
        user_lessons: {
          select: {
            user_id: true,
            lesson_id: true,
            completed: true,
          },
        },
      },
      ...(data && data.order
        ? {
            orderBy: {
              created_at: data.order,
            },
          }
        : {}),
      skip: data?.skip,
      take: data?.take,
    });

    return lessons as ILesson[];
  }

  async findAllLessonsFromBlock({
    block_id,
    order,
    skip,
    take,
  }: FindAllLessonsFromBlockDTO): Promise<ILesson[]> {
    const lessons = await prisma.lesson.findMany({
      where: {
        block_id,
      },
      include: {
        user_lessons: {
          select: {
            user_id: true,
            lesson_id: true,
            completed: true,
          },
        },
      },
      ...(order
        ? {
            orderBy: {
              created_at: order,
            },
          }
        : {}),
      skip,
      take,
    });

    return lessons as ILesson[];
  }
}
export { PrismaLessonsRepository };
