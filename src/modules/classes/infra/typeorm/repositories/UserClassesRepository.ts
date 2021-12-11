import { IClass } from '@modules/classes/domain/entities/IClass';
import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/IUserClassesRepository';
import { FindUserClassesDTO } from '@modules/classes/dtos/FindUserClassesDTO';
import { ICreateUserClassDTO } from '@modules/classes/dtos/ICreateUserClassDTO';
import { UserClass } from '@modules/classes/infra/typeorm/entities/UserClass';
import { getRepository, Repository } from 'typeorm';

class UserClassesRepository implements IUserClassesRepository {
  private ormRepository: Repository<IUserClass>;

  constructor() {
    this.ormRepository = getRepository(UserClass);
  }

  findUserClass(data: FindUserClassesDTO): Promise<IUserClass | undefined> {
    throw new Error('Method not implemented.');
  }

  async save(_class: IUserClass): Promise<IUserClass> {
    throw new Error('Method not implemented.');
  }

  async create(data: ICreateUserClassDTO): Promise<IUserClass> {
    const userClass = this.ormRepository.create(data);

    return this.ormRepository.save(userClass);
  }

  async findById(user_class_id: string): Promise<IUserClass | undefined> {
    const userClass = this.ormRepository.findOne({
      where: {
        id: user_class_id,
      },
    });

    return userClass;
  }

  async removeById(user_class_id: string): Promise<void> {
    await this.ormRepository.delete(user_class_id);
  }
}

export { UserClassesRepository };
