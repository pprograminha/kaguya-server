import { ICreateUserClassDTO } from '@modules/classes/dtos/ICreateUserClassDTO';
import { IFindAllUserClassesFromBlockDTO } from '@modules/classes/dtos/IFindAllUserClassesFromBlockDTO';
import { IFindOneDTO } from '@modules/classes/dtos/IFindOneDTO';
import { IUserClass } from '../entities/IUserClass';

interface IUserClassesRepository {
  create(data: ICreateUserClassDTO): Promise<IUserClass>;
  findById(user_class_id: string): Promise<IUserClass | undefined>;
  findOne(data: IFindOneDTO): Promise<IUserClass | undefined>;
  findAllUserClasses(user_id: string): Promise<IUserClass[]>;
  findAllUserClassesFromBlock(
    data: IFindAllUserClassesFromBlockDTO,
  ): Promise<IUserClass[]>;
  save(_class: IUserClass): Promise<IUserClass>;
  removeById(user_class_id: string): Promise<void>;
}

export { IUserClassesRepository };
