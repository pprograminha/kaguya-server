import { IClass } from '@modules/classes/domain/entities/IClass';
import { IClassesRepository } from '@modules/classes/domain/repositories/IClassesRepository';
import { ICreateClassDTO } from '@modules/classes/dtos/ICreateClassDTO';
import { IFindByNameDTO } from '@modules/classes/dtos/IFindByNameDTO';
import { prisma } from '@shared/infra/prisma/connection';
import { v4 as uuid } from 'uuid';

class PrismaClassesRepository implements IClassesRepository {
  async create(data: ICreateClassDTO): Promise<IClass> {
    const _class = await prisma.class.create({
      data: {
        id: uuid(),
        ...data,
      },
    });

    return _class as IClass;
  }

  async save(_class: IClass): Promise<IClass> {
    const classUpdated = await prisma.class.update({
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

    return classUpdated as IClass;
  }

  async findById(class_id: string): Promise<IClass | undefined> {
    const _class = await prisma.class.findUnique({
      where: {
        id: class_id,
      },
    });

    return (_class as IClass | null) || undefined;
  }

  async findByName({
    name,
    block_id,
  }: IFindByNameDTO): Promise<IClass | undefined> {
    const classFinded = await prisma.class.findFirst({
      where: {
        name: {
          contains: name.replace(/-/g, ' '),
          mode: 'insensitive',
        },
        block_id,
      },
    });

    return (classFinded as IClass) || undefined;
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
