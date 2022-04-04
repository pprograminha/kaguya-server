import { IClass } from '@modules/classes/domain/entities/iclass';
import { IClassesRepository } from '@modules/classes/domain/repositories/classes-repository';
import { CreateClassDTO } from '@modules/classes/dtos/create-class-dto';
import { FindAllClassesFromBlockDTO } from '@modules/classes/dtos/find-all-classes-from-block-dto';
import { FindByNameDTO } from '@modules/classes/dtos/find-by-name-dto';
import { Class } from '@modules/classes/entities/class';
import { AsyncMaybe } from '@shared/types/app';

class InMemoryClassesRepository implements IClassesRepository {
  private classes: IClass[] = [];

  async findAllClassesFromBlock({
    block_id,
  }: FindAllClassesFromBlockDTO): Promise<IClass[]> {
    const classes = this.classes.filter(_class => _class.block_id === block_id);

    return classes;
  }

  async findByName({ name }: FindByNameDTO): AsyncMaybe<IClass> {
    const classFinded = this.classes.find(_class => _class.name === name);

    return classFinded;
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
