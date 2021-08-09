import { IPlatformRolesRepository } from '../domain/repositories/IPlatformRolesRepository';
import { IPlatformRole } from '@modules/platformRoles/domain/entities/IPlatformRole';
import { ICreatePlatformRoleRequestDTO } from '@modules/platformRoles/dtos/ICreatePlatformRoleRequestDTO';
import { AppError } from '@shared/errors/AppError';
// import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

export class CreatePlatformRoleService {
  constructor(
    private rolesRepository: IPlatformRolesRepository,
    // private usersRepository: IUsersRepository,
  ) {}
  
  async execute({
    user_id_logged,
    role,
    permission
  }: ICreatePlatformRoleRequestDTO): Promise<IPlatformRole> {
    const findRoleName = await this.rolesRepository.findByRoleName(role);
    const findRolePermission = await this.rolesRepository.findByRolePermission(permission);
    // const findUserLogged = await this.usersRepository.findById(user_id_logged);

    if(findRoleName) {
      throw new AppError('O cargo com este nome já existe');
    };

    if(findRolePermission) {
      throw new AppError('O cargo com esta permissão já existe');
    };

    if(!role) {
      throw new AppError('Coloque o nome do cargo');
    };

    if(!permission) {
      throw new AppError('Coloque a hieraquia do cargo');
    }

    const createRole = await this.rolesRepository.create({
      role,
      permission,
    });

    return createRole;
  }
}