import crypto from 'crypto';
import { prisma } from '@shared/infra/prisma/connection';
import { ILikesRepository } from '@modules/likes/domain/repositories/likes-repository';
import { ILike } from '@modules/likes/domain/entities/ilike';
import { CreateLikeDTO } from '@modules/likes/dtos/create-like-dto';
import { FindOneLikeFromUserLesson } from '@modules/likes/dtos/find-one-like-from-user-lesson';
import { AsyncMaybe } from '@shared/types/app';

class PrismaLikesRepository implements ILikesRepository {
  async create({ lesson_id, user_id }: CreateLikeDTO): Promise<ILike> {
    const like = await prisma.like.create({
      data: {
        id: crypto.randomUUID(),
        lesson_id,
        user_id,
      },
    });

    return like as ILike;
  }

  async createMany(datas: CreateLikeDTO[]): Promise<void> {
    await prisma.like.createMany({
      data: datas.map(data => ({
        id: crypto.randomUUID(),
        ...data,
      })),
    });
  }

  async findById(like_id: string): AsyncMaybe<ILike> {
    const like = await prisma.like.findUnique({
      where: {
        id: like_id,
      },
    });

    return like as ILike;
  }

  async findAllLikesFromLesson(lesson_id: string): Promise<ILike[]> {
    const likes = await prisma.like.findMany({
      where: {
        lesson_id,
      },
    });

    return likes as ILike[];
  }

  async findAllLikesFromUser(user_id: string): Promise<ILike[]> {
    const likes = await prisma.like.findMany({
      where: {
        user_id,
      },
    });

    return likes as ILike[];
  }

  async findOneLikeFromUserLesson(
    data: FindOneLikeFromUserLesson,
  ): AsyncMaybe<ILike> {
    const like = await prisma.like.findFirst({
      where: {
        user_id: data.user_id,
        lesson_id: data.lesson_id,
      },
    });

    return like as ILike;
  }

  async save({ id: like_id, lesson_id, user_id }: ILike): Promise<void> {
    await prisma.like.update({
      where: {
        id: like_id,
      },
      data: {
        lesson_id,
        user_id,
      },
    });
  }

  async destroyById(like_id: string): Promise<void> {
    await prisma.like.delete({
      where: {
        id: like_id,
      },
    });
  }
}

export { PrismaLikesRepository };
