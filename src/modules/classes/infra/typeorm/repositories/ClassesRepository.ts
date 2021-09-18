import { IClass } from '@modules/classes/domain/entities/IClass';
import { IClassesRepository } from '@modules/classes/domain/repositories/IClassesRepository';
import { ICreateClassDTO } from '@modules/classes/dtos/ICreateClassDTO';
import { Class } from '@modules/classes/infra/typeorm/entities/Class';
import { getRepository, Repository } from 'typeorm';

class ClassesRepository implements IClassesRepository {
  private ormRepository: Repository<IClass>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  async save(_class: IClass): Promise<IClass> {
    const classSaved = this.ormRepository.save(_class);

    return classSaved;
  }

  async findAllClasses(): Promise<IClass[]> {
    const classes = this.ormRepository.find();

    return classes;
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
