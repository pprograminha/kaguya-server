import { IUserClass } from '@modules/classes/domain/entities/iuser-class';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/iuser-classes-repository';
import { CreateUserClassDTO } from '@modules/classes/dtos/create-user-class-dto';
import { FindAllUserClassesFromBlockDTO } from '@modules/classes/dtos/find-all-user-classes-from-block-dto';
import { FindOneDTO } from '@modules/classes/dtos/find-one-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

class PrismaUserClassesRepository implements IUserClassesRepository {
  async findAllUserClassesFromBlock({
    block_id,
    user_id,
  }: FindAllUserClassesFromBlockDTO): Promise<IUserClass[]> {
    const userClasses = await prisma.userClass.findMany({
      where: {
        block_id,
        user_id,
      },
    });

    return userClasses as IUserClass[];
  }

  async findOne({ user_id, class_id }: FindOneDTO): AsyncMaybe<IUserClass> {
    const userClass = await prisma.userClass.findFirst({
      where: {
        user_id,
        class_id,
      },
    });

    return userClass as IUserClass;
  }

  async findAllUserClasses(user_id: string): Promise<IUserClass[]> {
    const userClasses = await prisma.userClass.findMany({
      where: {
        user_id,
      },
    });

    return userClasses as IUserClass[];
  }

  async save({
    id,
    completed,
    block_id,
    class_id,
    user_id,
  }: IUserClass): Promise<IUserClass> {
    const userClass = await prisma.userClass.update({
      where: {
        id,
      },
      data: {
        completed,
        block_id,
        class_id,
        user_id,
      },
    });

    return userClass as IUserClass;
  }

  async create(data: CreateUserClassDTO): Promise<IUserClass> {
    const userClass = await prisma.userClass.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
      },
    });

    return userClass as IUserClass;
  }

  async findById(user_class_id: string): AsyncMaybe<IUserClass> {
    const userClass = await prisma.userClass.findUnique({
      where: {
        id: user_class_id,
      },
    });

    return userClass as IUserClass;
  }

  async removeById(user_class_id: string): Promise<void> {
    await prisma.userClass.delete({
      where: {
        id: user_class_id,
      },
    });
  }
}

export { PrismaUserClassesRepository };
