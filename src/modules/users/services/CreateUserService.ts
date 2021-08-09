import { IPlatformRolesRepository } from '@modules/platformRoles/domain/repositories/IPlatformRolesRepository';
import { PlatformRoles } from '@modules/platformRoles/infra/typeorm/entities/PlatformRoles';
import { AppError } from '@shared/errors/AppError';
import { IUser } from '../domain/entities/IUser';
import { IPlatformUserRolesRepository } from '../domain/repositories/IPlatformUserRolesRepository';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { ICreateUserRequestDTO } from '../dtos/ICreateUserRequestDTO';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IResponse {
  user: IUser;
  userRole: PlatformRoles | undefined;
}

class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    private rolesRepository: IPlatformRolesRepository,
    private platformUserRolesRepository : IPlatformUserRolesRepository,
  ) {}

  async execute({
    email,
    name,
    role_name = 'default',
    password,
    user_logged_id,
  }: ICreateUserRequestDTO): Promise<IResponse> {
    const findUser = await this.usersRepository.findByEmail(email);
    const role = await this.rolesRepository.findByRoleName(role_name);

    if (findUser) {
      throw new AppError('User already exists');
    }

    if(user_logged_id) {
      const findPlatformUserRoles = await this.platformUserRolesRepository.findByUserId(user_logged_id);

      if(!findPlatformUserRoles) {
        throw new AppError('Role to user logged does not exist');
      }
      const userLoggedRole = await this.rolesRepository.findByRoleId(findPlatformUserRoles?.role_id);
      
      if(userLoggedRole?.permission !== 0) {
        throw new AppError('Only owner users can create users');
      }
    }

    if(!role) {
      throw new AppError('Role does not exist');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email,
      name,
      username: `random${Date.now()}`,
      enabled: true,
      password: hashedPassword,
    });

    await this.platformUserRolesRepository.addRoleToUser(user.id, role.id);

    return {
      user,
      userRole: role
    };
  }
}

export { CreateUserService };
