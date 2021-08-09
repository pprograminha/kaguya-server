import { IPlatformUserRolesRepository } from '@modules/users/domain/repositories/IPlatformUserRolesRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IPlatformRole } from '../domain/entities/IPlatformRole';
import { IPlatformRolesRepository } from '../domain/repositories/IPlatformRolesRepository';

export class ListAllPlatformRolesService {
  constructor(
    private rolesRepository: IPlatformRolesRepository,
    private usersRepository: IUsersRepository,
    private platformUserRolesRepository : IPlatformUserRolesRepository,
  ) {}

  async execute(
    user_id_logged: string
  ): Promise<IPlatformRole[] | undefined> {
    const userLogged = await this.usersRepository.findById(user_id_logged);
    
    if(!userLogged) {
      throw new AppError('User not logged');
    }

    const userRole = await this.platformUserRolesRepository.findByUserId(userLogged.id);

    if(!userRole) {
      throw new AppError('User role does not exist');
    }

    const role = await this.rolesRepository.findByRoleId(userRole?.role_id);
    
    if(role?.permission !== 0) {
      throw new AppError('Only owner users can list all roles');
    }

    const allRoles = await this.rolesRepository.listAllRoles();

    return allRoles;
  }
}