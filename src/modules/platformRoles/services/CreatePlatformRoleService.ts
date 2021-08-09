import { IPlatformRolesRepository } from '../domain/repositories/IPlatformRolesRepository';
import { IPlatformRole } from '@modules/platformRoles/domain/entities/IPlatformRole';
import { ICreatePlatformRoleRequestDTO } from '@modules/platformRoles/dtos/ICreatePlatformRoleRequestDTO';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

export class CreatePlatformRoleService {
  constructor(
    private rolesRepository: IPlatformRolesRepository,
    private usersRepository: IUsersRepository,
  ) {}
  
  async execute({
    user_id_logged,
    role,
    permission = 0
  }: ICreatePlatformRoleRequestDTO): Promise<IPlatformRole> {
    const findRoleName = await this.rolesRepository.findByRoleName(role);
    const findRolePermission = await this.rolesRepository.findByRolePermission(permission);
    const findUserLogged = await this.usersRepository.findById(user_id_logged);

    if(!findUserLogged) {
      throw new AppError('User not logged to create new platform role');
    };

    if(findRoleName) {
      throw new AppError('The position with this name already exists.');
    };

    if(findRolePermission) {
      throw new AppError(`The position ${permission} with this permission already exists.`);
    };

    if(!role) {
      throw new AppError('Put the name of the role');
    };

    if(typeof permission !== 'number' || !permission) {
      throw new AppError('Enter a number for the position hierarchy');
    };

    const createRole = await this.rolesRepository.create({
      role,
      permission,
    });

    return createRole;
  }
}