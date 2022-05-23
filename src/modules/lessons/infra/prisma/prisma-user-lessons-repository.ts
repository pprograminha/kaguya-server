import { IUserLesson } from '@modules/lessons/domain/entities/iuser-lesson';
import { IUserLessonsRepository } from '@modules/lessons/domain/repositories/user-lessons-repository';
import { CreateUserLessonDTO } from '@modules/lessons/dtos/create-user-lesson-dto';
import { FindAllUserLessonsFromBlockDTO } from '@modules/lessons/dtos/find-all-user-lessons-from-block-dto';
import { FindOneDTO } from '@modules/lessons/dtos/find-one-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

class PrismaUserLessonsRepository implements IUserLessonsRepository {
  async findAllUserLessonsFromBlock({
    block_id,
    user_id,
  }: FindAllUserLessonsFromBlockDTO): Promise<IUserLesson[]> {
    const userLessons = await prisma.userLesson.findMany({
      where: {
        block_id,
        user_id,
      },
    });

    return userLessons as IUserLesson[];
  }

  async findOne({ user_id, lesson_id }: FindOneDTO): AsyncMaybe<IUserLesson> {
    const userLesson = await prisma.userLesson.findFirst({
      where: {
        user_id,
        lesson_id,
      },
    });

    return userLesson as IUserLesson;
  }

  async findAllUserLessons(user_id: string): Promise<IUserLesson[]> {
    const userLessons = await prisma.userLesson.findMany({
      where: {
        user_id,
      },
    });

    return userLessons as IUserLesson[];
  }

  async save({
    id,
    completed,
    block_id,
    lesson_id,
    user_id,
  }: IUserLesson): Promise<IUserLesson> {
    const userLesson = await prisma.userLesson.update({
      where: {
        id,
      },
      data: {
        completed,
        block_id,
        lesson_id,
        user_id,
      },
    });

    return userLesson as IUserLesson;
  }

  async create(data: CreateUserLessonDTO): Promise<IUserLesson> {
    const userLesson = await prisma.userLesson.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
      },
    });

    return userLesson as IUserLesson;
  }

  async findById(user_lesson_id: string): AsyncMaybe<IUserLesson> {
    const userLesson = await prisma.userLesson.findUnique({
      where: {
        id: user_lesson_id,
      },
    });

    return userLesson as IUserLesson;
  }

  async removeById(user_lesson_id: string): Promise<void> {
    await prisma.userLesson.delete({
      where: {
        id: user_lesson_id,
      },
    });
  }
}

export { PrismaUserLessonsRepository };
