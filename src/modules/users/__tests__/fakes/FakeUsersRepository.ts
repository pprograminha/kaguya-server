import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUser } from '../../domain/entities/IUser';
import { IUsersRepository } from '../../domain/repositories/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  async findByUsername(username: string): Promise<IUser | undefined> {
    const userFinded = this.users.find(user => user.username === username);

    return userFinded;
  }

  async findAll(): Promise<IUser[]> {
    return this.users;
  }

  async save(user: IUser): Promise<IUser> {
    const indexFinded = this.users.findIndex(
      userFind => userFind.id === user.id,
    );

    if (indexFinded === -1) return user;

    this.users[indexFinded] = user;

    return user;
  }

  async create(userData: ICreateUserDTO): Promise<IUser> {
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
