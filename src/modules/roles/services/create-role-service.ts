import { IRole } from '@modules/roles/domain/entities/irole';
import { CreateRoleRequestDTO } from '@modules/roles/dtos/create-role-request-dto';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IRolesRepository } from '../domain/repositories/roles-repository';

@injectable()
export class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    user_id_logged,
    role = 'default',
    permission = 2,
  }: CreateRoleRequestDTO): Promise<IRole> {
    const findUserLogged = await this.usersRepository.findById(user_id_logged, {
      user_roles: true,
    });

    if (!findUserLogged) {
      throw new AppError('User not logged to create new role', 5, 401);
    }

    const findRoleName = await this.rolesRepository.findByRoleName(role);

    if (findRoleName) {
      throw new AppError('The position with this name already exists', 23, 400);
    }

    const findRolePermission = await this.rolesRepository.findByPermission(
      permission,
    );

    if (findRolePermission) {
      throw new AppError(
        `The position ${permission} with this permission already exists`,
        24,
        400,
      );
    }

    const permissions = findUserLogged.user_roles.map(
      userRole => userRole.role.permission,
    );

    const greaterPermission = Math.min.apply(null, permissions);

    if (permission <= greaterPermission) {
      throw new AppError(
        'You cannot to create a role with permissions greater or equal to yours',
        116,
      );
    }

    const createRole = await this.rolesRepository.create({
      name: role,
      permission,
    });

    return createRole;
  }
}
