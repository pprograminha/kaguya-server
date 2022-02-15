import { IClass } from '@modules/classes/domain/entities/IClass';
import { IClassesRepository } from '@modules/classes/domain/repositories/IClassesRepository';
import { ICreateClassDTO } from '@modules/classes/dtos/ICreateClassDTO';
import { IFindByNameDTO } from '@modules/classes/dtos/IFindByNameDTO';
import { Class } from '@modules/classes/infra/typeorm/entities/Class';
import { prisma } from '@shared/infra/prisma/connection';
import { getRepository, Repository } from 'typeorm';

class ClassesRepository implements IClassesRepository {
  private ormRepository: Repository<IClass>;

  constructor() {
    this.ormRepository = getRepository(Class);
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

  async save(_class: IClass): Promise<IClass> {
    const classSaved = this.ormRepository.save(_class);

    return classSaved;
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

  async create(data: ICreateClassDTO): Promise<IClass> {
    const _class = this.ormRepository.create(data);

    return this.ormRepository.save(_class);
  }

  async findById(class_id: string): Promise<IClass | undefined> {
    const classFinded = this.ormRepository.findOne({
      where: {
        id: class_id,
      },
    });

    return classFinded;
  }

  async destroyById(class_id: string): Promise<void> {
    await this.ormRepository.delete(class_id);
  }
}

export { ClassesRepository };
