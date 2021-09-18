import { ICreateUserClassDTO } from '@modules/classes/dtos/ICreateUserClassDTO';
import { IUserClass } from '../entities/IUserClass';

interface IUserClassesRepository {
  create(data: ICreateUserClassDTO): Promise<IUserClass>;
  findById(user_class_id: string): Promise<IUserClass | undefined>;
  removeById(user_class_id: string): Promise<void>;
}

export { IUserClassesRepository };
