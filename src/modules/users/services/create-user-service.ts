import { IRolesRepository } from '@modules/roles/domain/repositories/roles-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IUser } from '../domain/entities/iuser';
import { IUserRolesRepository } from '../domain/repositories/user-roles-repository';
import { IUsersRepository } from '../domain/repositories/users-repository';
import { CreateUserRequestDTO } from '../dtos/create-user-request-dto';
import { IHashProvider } from '../providers/hash-provider/models/hash-provider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('UserRolesRepository')
    private userRolesRepository: IUserRolesRepository,
  ) {}

  async execute({
    email,
    name,
    username,
    role = 'default',
    password,
    creator_id,
  }: CreateUserRequestDTO): Promise<IUser> {
    const checkEmailAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );

    const checkUsernameAlreadyExists =
      await this.usersRepository.findByUsername(username);

    const roleFinded = await this.rolesRepository.findByRoleName(role);

    if (checkEmailAlreadyExists) {
      throw new AppError('Unable to create user', 403);
    }

    if (checkUsernameAlreadyExists) {
      throw new AppError('Username entered already exists', 403);
    }

    if (!roleFinded) {
      throw new AppError('Role does not exist', 403);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (creator_id) {
      const creator = await this.usersRepository.findById(creator_id, {
        user_roles: true,
      });

      if (!creator) throw new AppError('Creator does not exist', 401);

      const permissions = creator.user_roles.map(
        userRole => userRole.role.permission,
      );

      const greaterPermission = Math.min(...permissions);

      if (roleFinded.permission <= greaterPermission) {
        throw new AppError(
          'You cannot give one permission greater or equal to yours',
          403,
        );
      }
    }

    const userCreated = await this.usersRepository.create({
      email,
      name,
      username,
      password: hashedPassword,
    });

    await this.userRolesRepository.addRoleToUser(userCreated.id, roleFinded.id);

    const user = await this.usersRepository.findById(userCreated.id, {
      user_roles: true,
    });

    return user as IUser;
  }
}

export { CreateUserService };
