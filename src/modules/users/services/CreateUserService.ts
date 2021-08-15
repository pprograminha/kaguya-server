import { IPlatformRolesRepository } from '@modules/platformRoles/domain/repositories/IPlatformRolesRepository';
import { PlatformRole } from '@modules/platformRoles/infra/typeorm/entities/PlatformRole';
import { AppError } from '@shared/errors/AppError';
import { IUser } from '../domain/entities/IUser';
import { IPlatformUserRolesRepository } from '../domain/repositories/IPlatformUserRolesRepository';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { ICreateUserRequestDTO } from '../dtos/ICreateUserRequestDTO';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IResponse extends IUser {
  userRole: PlatformRole | undefined;
}

class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    private platformRolesRepository: IPlatformRolesRepository,
    private platformUserRolesRepository: IPlatformUserRolesRepository,
  ) {}

  async execute({
    email,
    name,
    role_name = 'default',
    password,
    admin_id,
  }: ICreateUserRequestDTO): Promise<IResponse> {
    const findUser = await this.usersRepository.findByEmail(email);
    const role = await this.platformRolesRepository.findByRoleName(role_name);

    if (findUser) {
      throw new AppError('User already exists');
    }

    if (!role) {
      throw new AppError('Role does not exist');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (admin_id) {
      const admin = await this.usersRepository.findById(admin_id, {
        platform_user_role: true,
      });

      if (!admin) throw new AppError('Admin does not exist');

      const permissions = admin.platformUserRoles.map(
        platformUserRole => platformUserRole.platformRole.permission,
      );

      const greaterPermission = Math.min.apply(null, permissions);

      if (greaterPermission <= role.permission) {
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

    await this.platformUserRolesRepository.addRoleToUser(user.id, role.id);

    return {
      ...user,
      userRole: role,
    };
  }
}

export { CreateUserService };
