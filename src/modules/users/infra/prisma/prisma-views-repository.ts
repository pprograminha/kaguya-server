import crypto from 'crypto';
import { prisma } from '@shared/infra/prisma/connection';
import { IView } from '@modules/classes/domain/entities/iview';
import { IViewsRepository } from '@modules/classes/domain/repositories/views-repository';
import { CreateViewDTO } from '@modules/users/dtos/create-view-dto';
import { FindOneViewFromUserClassDTO } from '@modules/users/dtos/find-one-view-from-user-class-dto';
import { AsyncMaybe } from '@shared/types/app';

class PrismaViewsRepository implements IViewsRepository {
  async create({ class_id, user_id }: CreateViewDTO): Promise<IView> {
    const view = await prisma.view.create({
      data: {
        id: crypto.randomUUID(),
        class_id,
        user_id,
      },
    });

    return view as IView;
  }

  async createMany(datas: CreateViewDTO[]): Promise<void> {
    await prisma.view.createMany({
      data: datas.map(data => ({
        id: crypto.randomUUID(),
        ...data,
      })),
    });
  }

  async findById(view_id: string): AsyncMaybe<IView> {
    const view = await prisma.view.findUnique({
      where: {
        id: view_id,
      },
    });

    return view as IView;
  }

  async findAllViewsFromClass(class_id: string): Promise<IView[]> {
    const views = await prisma.view.findMany({
      where: {
        class_id,
      },
    });

    return views as IView[];
  }

  async findAllViewsFromUser(user_id: string): Promise<IView[]> {
    const views = await prisma.view.findMany({
      where: {
        user_id,
      },
    });

    return views as IView[];
  }

  async findOneViewFromUserClass(
    data: FindOneViewFromUserClassDTO,
  ): AsyncMaybe<IView> {
    const view = await prisma.view.findFirst({
      where: {
        user_id: data.user_id,
        class_id: data.class_id,
      },
    });

    return view as IView;
  }

  async save({ id: view_id, class_id, user_id }: IView): Promise<void> {
    await prisma.view.update({
      where: {
        id: view_id,
      },
      data: {
        class_id,
        user_id,
      },
    });
  }

  async destroyById(view_id: string): Promise<void> {
    await prisma.view.delete({
      where: {
        id: view_id,
      },
    });
  }
}

export { PrismaViewsRepository };
