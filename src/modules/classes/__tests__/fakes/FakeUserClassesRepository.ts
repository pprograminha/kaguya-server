import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/IUserClassesRepository';
import { ICreateUserClassDTO } from '@modules/classes/dtos/ICreateUserClassDTO';
import { UserClass } from '@modules/classes/infra/typeorm/entities/UserClass';

class FakeUserClassesRepository implements IUserClassesRepository {
  private userClasses: IUserClass[] = [];

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
