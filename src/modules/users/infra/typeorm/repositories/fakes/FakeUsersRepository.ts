import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUser } from '../../../../domain/entities/IUser';
import { IUsersRepository } from '../../../../domain/repositories/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, userData);

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find(findUser => findUser.email === email);
    return user;
  }

  async findById(id: string | number): Promise<IUser | undefined> {
    const user = this.users.find(findUser => findUser.id === id);
    return user;
  }
}
export { FakeUsersRepository };
