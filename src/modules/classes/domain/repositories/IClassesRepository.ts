import { ICreateClassDTO } from '@modules/classes/dtos/ICreateClassDTO';
import { IClass } from '../entities/IClass';

interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<IClass>;
  save(_class: IClass): Promise<IClass>;
  findById(class_id: string): Promise<IClass | undefined>;
  destroyById(class_id: string): Promise<void>;
  findAllClasses(): Promise<IClass[]>;
}
export { IClassesRepository };
