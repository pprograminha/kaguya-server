import { IClass } from '@modules/classes/domain/entities/iclass';
import {
  IClassesRepository,
  RelationshipDTO,
} from '@modules/classes/domain/repositories/iclasses-repository';
import { CreateClassDTO } from '@modules/classes/dtos/create-class-dto';
import { FindByNameDTO } from '@modules/classes/dtos/find-by-name-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

class PrismaClassesRepository implements IClassesRepository {
  async create(data: CreateClassDTO): Promise<IClass> {
    const createdClass = await prisma.class.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
      },
    });

    return createdClass as IClass;
  }

  async save(_class: IClass): Promise<IClass> {
    const updatedClass = await prisma.class.update({
      where: {
        id: _class.id,
      },
      data: {
        description: _class.description,
        name: _class.name,
        link: _class.link,
        updated_at: new Date(),
      },
    });

    return updatedClass as IClass;
  }

  async findById(
    class_id: string,
    relationship: RelationshipDTO,
  ): AsyncMaybe<IClass> {
    const findedClass = await prisma.class.findUnique({
      where: {
        id: class_id,
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

    return findedClass as IClass;
  }

  async findByName(
    { name, block_id }: FindByNameDTO,
    relationship?: RelationshipDTO,
  ): AsyncMaybe<IClass> {
    const findedClass = await prisma.class.findFirst({
      where: {
        name: {
          contains: name.replace(/-/g, ' '),
          mode: 'insensitive',
        },
        block_id,
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

    return findedClass as IClass;
  }

  async destroyById(class_id: string): Promise<void> {
    await prisma.class.delete({
      where: {
        id: class_id,
      },
    });
  }

  async findAllClasses(): Promise<IClass[]> {
    const classes = await prisma.class.findMany({
      include: {
        user_classes: {
          select: {
            user_id: true,
            class_id: true,
            completed: true,
          },
        },
      },
    });

    return classes as IClass[];
  }

  async findAllClassesFromBlock(block_id: string): Promise<IClass[]> {
    const classes = await prisma.class.findMany({
      where: {
        block_id,
      },
      include: {
        user_classes: {
          select: {
            user_id: true,
            class_id: true,
            completed: true,
          },
        },
      },
    });

    return classes as IClass[];
  }
}
export { PrismaClassesRepository };
