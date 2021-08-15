import { PlatformRole } from '@modules/platformRoles/infra/typeorm/entities/PlatformRole';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUser } from '../../../../domain/entities/IUser';
import { IUsersRepository } from '../../../../domain/repositories/IUsersRepository';
import { PlatformUserRole } from '../../entities/PlatformUserRole';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

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
    const platformUserRole = new PlatformUserRole();
    const platformRole = new PlatformRole();

    Object.assign(platformRole, {
      permission: 9999,
      role: 'xxxx',
    });

    Object.assign(user, userData);

    Object.assign(platformUserRole, {
      platform_role_id: platformRole.id,
      user_id: user.id,
      platformRole,
      user,
    });

    user.platformUserRoles = [platformUserRole];

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
