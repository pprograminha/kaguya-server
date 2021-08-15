import { IPlatformRole } from '@modules/platformRoles/domain/entities/IPlatformRole';
import { ICreatePlatformRoleRequestDTO } from '@modules/platformRoles/dtos/ICreatePlatformRoleRequestDTO';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IPlatformUserRolesRepository } from '@modules/users/domain/repositories/IPlatformUserRolesRepository';
import { IPlatformRolesRepository } from '../domain/repositories/IPlatformRolesRepository';

export class CreatePlatformRoleService {
  constructor(
    private platformRolesRepository: IPlatformRolesRepository,
    private usersRepository: IUsersRepository,
    private platformUserRolesRepository: IPlatformUserRolesRepository,
  ) {}

  async execute({
    user_id_logged,
    role,
    permission = 0,
  }: ICreatePlatformRoleRequestDTO): Promise<IPlatformRole> {
    const findRoleName = await this.platformRolesRepository.findByRoleName(
      role,
    );

    if (findRoleName) {
      throw new AppError('The position with this name already exists.');
    }

    const findRolePermission =
      await this.platformRolesRepository.findByRolePermission(permission);

    if (findRolePermission) {
      throw new AppError(
        `The position ${permission} with this permission already exists.`,
      );
    }

    const findUserLogged = await this.usersRepository.findById(user_id_logged);

    if (!findUserLogged) {
      throw new AppError('User not logged to create new platform role');
    }

    const findPlatformUserRoles =
      await this.platformUserRolesRepository.findByUserId(user_id_logged);

    if (!findPlatformUserRoles) {
      throw new AppError('Role to user logged does not exist');
    }

    const userLoggedRole = await this.platformRolesRepository.findByRoleId(
      findPlatformUserRoles.platform_role_id,
    );

    if (!userLoggedRole) {
      throw new AppError('User role does not exist');
    }

    if (
      permission <= userLoggedRole.permission ||
      userLoggedRole.role === role
    ) {
      throw new AppError(
        'You cannot to create a role with permissions greater or equal to yours',
      );
    }

    if (!role) {
      throw new AppError('Put the name of the role');
    }

    if (typeof permission !== 'number' || !permission) {
      throw new AppError('Enter a number for the position hierarchy');
    }

    const createRole = await this.platformRolesRepository.create({
      role,
      permission,
    });

    return createRole;
  }
}
