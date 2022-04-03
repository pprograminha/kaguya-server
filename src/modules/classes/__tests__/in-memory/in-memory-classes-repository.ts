import { IClass } from '@modules/classes/domain/entities/iclass';
import { IClassesRepository } from '@modules/classes/domain/repositories/iclasses-repository';
import { CreateClassDTO } from '@modules/classes/dtos/create-class-dto';
import { FindByNameDTO } from '@modules/classes/dtos/find-by-name-dto';
import { Class } from '@modules/classes/entities/class';
import { AsyncMaybe } from '@shared/types/app';

class InMemoryClassesRepository implements IClassesRepository {
  private classes: IClass[] = [];

  async findByName({ block_id, name }: FindByNameDTO): AsyncMaybe<IClass> {
    const classFinded = this.classes.find(
      _class => _class.name === name && _class.block_id === block_id,
    );

    return classFinded;
  }

  async findAllClassesFromBlock(block_id: string): Promise<IClass[]> {
    return this.classes.filter(_class => _class.block_id === block_id);
  }

  async save(_class: IClass): Promise<IClass> {
    const index = this.classes.findIndex(
      findClass => findClass.id === _class.id,
    );

    this.classes[index] = _class;

    return _class;
  }

  async findAllClasses(): Promise<IClass[]> {
    return this.classes;
  }

  async create(data: CreateClassDTO): Promise<IClass> {
    const _class = new Class();

    Object.assign(_class, data);

    this.classes.push(_class);

    return _class;
  }

  async findById(class_id: string): AsyncMaybe<IClass> {
    const classFinded = this.classes.find(_class => _class.id === class_id);

    return classFinded;
  }

  async destroyById(class_id: string): Promise<void> {
    const index = this.classes.findIndex(_class => _class.id === class_id);

    this.classes.splice(index, 1);
  }
}

export { InMemoryClassesRepository };
