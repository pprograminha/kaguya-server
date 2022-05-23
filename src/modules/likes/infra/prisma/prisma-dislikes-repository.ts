import crypto from 'crypto';
import { IDislike } from '@modules/likes/domain/entities/idislike';
import { IDislikesRepository } from '@modules/likes/domain/repositories/dislikes-repository';
import { CreateDislikeDTO } from '@modules/likes/dtos/create-dislike-dto';
import { FindOneDislikeFromUserLesson } from '@modules/likes/dtos/find-one-dislike-from-user-lesson';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';

class PrismaDislikesRepository implements IDislikesRepository {
  async create({ lesson_id, user_id }: CreateDislikeDTO): Promise<IDislike> {
    const dislike = await prisma.disLike.create({
      data: {
        id: crypto.randomUUID(),
        lesson_id,
        user_id,
      },
    });

    return dislike as IDislike;
  }

  async createMany(datas: CreateDislikeDTO[]): Promise<void> {
    await prisma.disLike.createMany({
      data: datas.map(data => ({
        id: crypto.randomUUID(),
        ...data,
      })),
    });
  }

  async findById(dislike_id: string): AsyncMaybe<IDislike> {
    const dislike = await prisma.disLike.findUnique({
      where: {
        id: dislike_id,
      },
    });

    return dislike as IDislike;
  }

  async findAllDislikesFromLesson(lesson_id: string): Promise<IDislike[]> {
    const dislikes = await prisma.disLike.findMany({
      where: {
        lesson_id,
      },
    });

    return dislikes as IDislike[];
  }

  async findAllDislikesFromUser(user_id: string): Promise<IDislike[]> {
    const dislikes = await prisma.disLike.findMany({
      where: {
        user_id,
      },
    });

    return dislikes as IDislike[];
  }

  async findOneDislikeFromUserLesson(
    data: FindOneDislikeFromUserLesson,
  ): AsyncMaybe<IDislike> {
    const dislike = await prisma.disLike.findFirst({
      where: {
        user_id: data.user_id,
        lesson_id: data.lesson_id,
      },
    });

    return dislike as IDislike;
  }

  async save({ id: dislike_id, lesson_id, user_id }: IDislike): Promise<void> {
    await prisma.disLike.update({
      where: {
        id: dislike_id,
      },
      data: {
        lesson_id,
        user_id,
      },
    });
  }

  async destroyById(dislike_id: string): Promise<void> {
    await prisma.disLike.delete({
      where: {
        id: dislike_id,
      },
    });
  }
}

export { PrismaDislikesRepository };
