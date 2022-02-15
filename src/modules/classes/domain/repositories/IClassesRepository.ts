import { ICreateClassDTO } from '@modules/classes/dtos/ICreateClassDTO';
import { IFindByNameDTO } from '@modules/classes/dtos/IFindByNameDTO';
import { IClass } from '../entities/IClass';

interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<IClass>;
  save(_class: IClass): Promise<IClass>;
  findById(class_id: string): Promise<IClass | undefined>;
  findByName(data: IFindByNameDTO): Promise<IClass | undefined>;
  destroyById(class_id: string): Promise<void>;
  findAllClasses(): Promise<IClass[]>;
  findAllClassesFromBlock(block_id: string): Promise<IClass[]>;
}
export { IClassesRepository };
