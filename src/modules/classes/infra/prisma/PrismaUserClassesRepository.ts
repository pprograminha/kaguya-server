import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/IUserClassesRepository';
import { ICreateUserClassDTO } from '@modules/classes/dtos/ICreateUserClassDTO';
import { IFindAllUserClassesFromBlockDTO } from '@modules/classes/dtos/IFindAllUserClassesFromBlockDTO';
import { IFindOneDTO } from '@modules/classes/dtos/IFindOneDTO';
import { prisma } from '@shared/infra/prisma/connection';
import { v4 as uuid } from 'uuid';

class PrismaUserClassesRepository implements IUserClassesRepository {
  async findAllUserClassesFromBlock({
    block_id,
    user_id,
  }: IFindAllUserClassesFromBlockDTO): Promise<IUserClass[]> {
    const userClasses = await prisma.userClass.findMany({
      where: {
        block_id,
        user_id,
      },
    });

    return userClasses as IUserClass[];
  }

  async findOne({
    user_id,
    class_id,
  }: IFindOneDTO): Promise<IUserClass | undefined> {
    const userClass = await prisma.userClass.findFirst({
      where: {
        user_id,
        class_id,
      },
    });

    return (userClass as IUserClass) || undefined;
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

  async create(data: ICreateUserClassDTO): Promise<IUserClass> {
    const userClass = await prisma.userClass.create({
      data: {
        id: uuid(),
        ...data,
      },
    });

    return userClass as IUserClass;
  }

  async findById(user_class_id: string): Promise<IUserClass | undefined> {
    const userClass = await prisma.userClass.findUnique({
      where: {
        id: user_class_id,
      },
    });

    return (userClass as IUserClass) || undefined;
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
