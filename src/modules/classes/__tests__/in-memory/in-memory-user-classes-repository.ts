import { IUserClass } from '@modules/classes/domain/entities/iuser-class';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/user-classes-repository';
import { CreateUserClassDTO } from '@modules/classes/dtos/create-user-class-dto';
import { FindAllUserClassesFromBlockDTO } from '@modules/classes/dtos/find-all-user-classes-from-block-dto';
import { FindOneDTO } from '@modules/classes/dtos/find-one-dto';
import { UserClass } from '@modules/classes/entities/user-class';

import { AsyncMaybe } from '@shared/types/app';

class InMemoryUserClassesRepository implements IUserClassesRepository {
  private userClasses: IUserClass[] = [];

  async findOne({ class_id, user_id }: FindOneDTO): AsyncMaybe<IUserClass> {
    const userClassFinded = this.userClasses.find(
      userClass =>
        userClass.class_id === class_id && userClass.user_id === user_id,
    );

    return userClassFinded;
  }

  async findAllUserClasses(user_id: string): Promise<IUserClass[]> {
    return this.userClasses.filter(userClass => userClass.user_id === user_id);
  }

  async findAllUserClassesFromBlock({
    block_id,
    user_id,
  }: FindAllUserClassesFromBlockDTO): Promise<IUserClass[]> {
    return this.userClasses.filter(
      userClass =>
        userClass.block_id === block_id && userClass.user_id === user_id,
    );
  }

  async save(_class: IUserClass): Promise<IUserClass> {
    const index = this.userClasses.findIndex(
      findClass => findClass.id === _class.id,
    );

    this.userClasses[index] = _class;

    return _class;
  }

  async create(data: CreateUserClassDTO): Promise<IUserClass> {
    const userClass = new UserClass();

    Object.assign(userClass, data);

    this.userClasses.push(userClass);

    return userClass;
  }

  async findById(user_class_id: string): AsyncMaybe<IUserClass> {
    const userClassFinded = this.userClasses.find(
      userClass => userClass.id === user_class_id,
    );

    return userClassFinded;
  }

  async removeById(user_class_id: string): Promise<void> {
    const index = this.userClasses.findIndex(
      userClass => userClass.id === user_class_id,
    );

    this.userClasses.splice(index, 1);
  }
}

export { InMemoryUserClassesRepository };
