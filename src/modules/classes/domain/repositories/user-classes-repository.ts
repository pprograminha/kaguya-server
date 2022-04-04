import { CreateUserClassDTO } from '@modules/classes/dtos/create-user-class-dto';
import { FindAllUserClassesFromBlockDTO } from '@modules/classes/dtos/find-all-user-classes-from-block-dto';
import { FindOneDTO } from '@modules/classes/dtos/find-one-dto';
import { AsyncMaybe } from '@shared/types/app';
import { IUserClass } from '../entities/iuser-class';

interface IUserClassesRepository {
  create(data: CreateUserClassDTO): Promise<IUserClass>;
  findById(user_class_id: string): AsyncMaybe<IUserClass>;
  findOne(data: FindOneDTO): AsyncMaybe<IUserClass>;
  findAllUserClasses(user_id: string): Promise<IUserClass[]>;
  findAllUserClassesFromBlock(
    data: FindAllUserClassesFromBlockDTO,
  ): Promise<IUserClass[]>;
  save(_class: IUserClass): Promise<IUserClass>;
  removeById(user_class_id: string): Promise<void>;
}

export { IUserClassesRepository };
