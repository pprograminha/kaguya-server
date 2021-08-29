import { IPlatformRolesRepository } from '@modules/platformRoles/domain/repositories/IPlatformRolesRepository';
import { PlatformRole } from '@modules/platformRoles/infra/typeorm/entities/PlatformRole';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/entities/IUser';
import { IPlatformUserRolesRepository } from '../domain/repositories/IPlatformUserRolesRepository';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { ICreateUserRequestDTO } from '../dtos/ICreateUserRequestDTO';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IResponse extends IUser {
  userRole: PlatformRole | undefined;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('PlatformRolesRepository')
    private platformRolesRepository: IPlatformRolesRepository,

    @inject('PlatformUserRolesRepository')
    private platformUserRolesRepository: IPlatformUserRolesRepository,
  ) {}

  async execute({
    email,
    name,
    role = 'default',
    password,
    creator_id,
  }: ICreateUserRequestDTO): Promise<IResponse> {
    const findUser = await this.usersRepository.findByEmail(email);
    const roleFinded = await this.platformRolesRepository.findByRoleName(role);

    if (findUser) {
      throw new AppError('User already exists');
    }

    if (!roleFinded) {
      throw new AppError('Role does not exist');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (creator_id) {
      const creator = await this.usersRepository.findById(creator_id, {
        platform_user_role: true,
      });

      if (!creator) throw new AppError('Creator does not exist', 401);

      const permissions = creator.platformUserRoles.map(
        platformUserRole => platformUserRole.platformRole.permission,
      );

      const greaterPermission = Math.min.apply(null, permissions);

      if (roleFinded.permission <= greaterPermission) {
        throw new AppError(
          'You cannot give one permission greater or equal to yours',
        );
      }
    }
    const user = await this.usersRepository.create({
      email,
      name,
      username: `random${Date.now()}`,
      password: hashedPassword,
    });

    await this.platformUserRolesRepository.addRoleToUser(
      user.id,
      roleFinded.id,
    );

    return {
      ...user,
      userRole: roleFinded,
    };
  }
}

export { CreateUserService };
