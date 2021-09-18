import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/IUserClassesRepository';
import { ICreateUserClassDTO } from '@modules/classes/dtos/ICreateUserClassDTO';
import { UserClass } from '@modules/classes/infra/typeorm/entities/UserClass';
import { getRepository, Repository } from 'typeorm';

class UserClassesRepository implements IUserClassesRepository {
  private ormRepository: Repository<IUserClass>;

  constructor() {
    this.ormRepository = getRepository(UserClass);
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
