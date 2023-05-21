import { IRolesRepository } from '@modules/roles/domain/repositories/roles-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IUser } from '../domain/entities/iuser';
import { IUserRolesRepository } from '../domain/repositories/user-roles-repository';
import { IUsersRepository } from '../domain/repositories/users-repository';
import { CreateUserRequestDTO } from '../dtos/create-user-request-dto';
import { IHashProvider } from '../providers/hash-provider/models/hash-provider';
import { ITokenProvider } from '../providers/token-provider/models/token-provider';

type CreateUserResponse = {
  token: string;
  user: IUser;
};

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

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  async execute({
    email,
    name,
    username,
    auth_id,
    avatar_url,
    email_verified,
    phone_number,
    role = 'default',
    password,
    creator_id,
  }: CreateUserRequestDTO): Promise<CreateUserResponse> {
    const checkUsernameAlreadyExists =
      await this.usersRepository.findByUsername(username);

    const roleFinded = await this.rolesRepository.findByRoleName(role);

    if (email) {
      const checkEmailAlreadyExists = await this.usersRepository.findByEmail(
        email,
      );
      if (checkEmailAlreadyExists) {
        throw new AppError('Unable to create user', 23, 400);
      }
    }

    if (checkUsernameAlreadyExists) {
      throw new AppError('Username entered already exists', 24, 400);
    }

    if (!roleFinded) {
      throw new AppError('Role does not exist', 12, 400);
    }

    let hashedPassword: string | undefined;

    if (password) {
      await this.hashProvider.generateHash(password);

      hashedPassword = password;
    }

    if (creator_id) {
      const creator = await this.usersRepository.findById(creator_id, {
        user_roles: true,
      });

      if (!creator) throw new AppError('Creator does not exist', 5, 401);

      const permissions = creator.user_roles.map(
        userRole => userRole.role.permission,
      );

      const greaterPermission = Math.min(...permissions);

      if (roleFinded.permission <= greaterPermission) {
        throw new AppError(
          'You cannot give one permission greater or equal to yours',
          116,
          403,
        );
      }
    }

    const userCreated = await this.usersRepository.create({
      email,
      name,
      auth_id,
      avatar_url,
      email_verified,
      phone_number,
      username,
      password: hashedPassword,
    });

    await this.userRolesRepository.addRoleToUser(userCreated.id, roleFinded.id);

    const token = this.tokenProvider.generate(userCreated);
    const user = (await this.usersRepository.findById(userCreated.id, {
      user_roles: true,
    })) as IUser;

    return {
      token,
      user,
    };
  }
}

export { CreateUserService };
