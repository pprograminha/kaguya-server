import { IClass } from '@modules/classes/domain/entities/IClass';
import { IClassesRepository } from '@modules/classes/domain/repositories/IClassesRepository';
import { ICreateClassDTO } from '@modules/classes/dtos/ICreateClassDTO';
import { Class } from '@modules/classes/infra/typeorm/entities/Class';

class FakeClassesRepository implements IClassesRepository {
  private classes: IClass[] = [];

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

  async create(data: ICreateClassDTO): Promise<IClass> {
    const _class = new Class();

    Object.assign(_class, data);

    this.classes.push(_class);

    return _class;
  }

  async findById(class_id: string): Promise<IClass | undefined> {
    const classFinded = this.classes.find(_class => _class.id === class_id);

    return classFinded;
  }

  async destroyById(class_id: string): Promise<void> {
    const index = this.classes.findIndex(_class => _class.id === class_id);

    this.classes.splice(index, 1);
  }
}

export { FakeClassesRepository };