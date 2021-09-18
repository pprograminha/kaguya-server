import { IPlatformRole } from '@modules/platformRoles/domain/entities/IPlatformRole';
import { ICreatePlatformRoleRequestDTO } from '@modules/platformRoles/dtos/ICreatePlatformRoleRequestDTO';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPlatformRolesRepository } from '../domain/repositories/IPlatformRolesRepository';

@injectable()
export class CreatePlatformRoleService {
  constructor(
    @inject('PlatformRolesRepository')
    private platformRolesRepository: IPlatformRolesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    user_id_logged,
    role = 'default',
    permission = 2,
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

    const findUserLogged = await this.usersRepository.findById(user_id_logged, {
      platform_user_role: true,
    });

    if (!findUserLogged) {
      throw new AppError('User not logged to create new platform role');
    }

    const permissions = findUserLogged.platformUserRoles.map(
      platformUserRole => platformUserRole.platformRole.permission,
    );

    const greaterPermission = Math.min.apply(null, permissions);

    if (permission <= greaterPermission) {
      throw new AppError(
        'You cannot to create a role with permissions greater or equal to yours',
      );
    }

    const createRole = await this.platformRolesRepository.create({
      role,
      permission,
    });

    return createRole;
  }
}
