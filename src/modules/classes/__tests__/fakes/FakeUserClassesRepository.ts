import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/IUserClassesRepository';
import { ICreateUserClassDTO } from '@modules/classes/dtos/ICreateUserClassDTO';
import { IFindAllUserClassesFromBlockDTO } from '@modules/classes/dtos/IFindAllUserClassesFromBlockDTO';
import { IFindOneDTO } from '@modules/classes/dtos/IFindOneDTO';
import { UserClass } from '@modules/classes/entities/UserClass';

class FakeUserClassesRepository implements IUserClassesRepository {
  private userClasses: IUserClass[] = [];

  async findOne({
    class_id,
    user_id,
  }: IFindOneDTO): Promise<IUserClass | undefined> {
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
  }: IFindAllUserClassesFromBlockDTO): Promise<IUserClass[]> {
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

  async create(data: ICreateUserClassDTO): Promise<IUserClass> {
    const userClass = new UserClass();

    Object.assign(userClass, data);

    this.userClasses.push(userClass);

    return userClass;
  }

  async findById(user_class_id: string): Promise<IUserClass | undefined> {
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

export { FakeUserClassesRepository };
