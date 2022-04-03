import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { AsyncMaybe } from '@shared/types/app';
import { IRole } from '../entities/IRole';

interface IRolesRepository {
  create(data: ICreateRoleDTO): Promise<IRole>;
  findByRoleName(role: string): AsyncMaybe<IRole>;
  findById(role_id: string): AsyncMaybe<IRole>;
  findByPermission(permission: number): AsyncMaybe<IRole>;
  destroyById(role_id: string): Promise<void>;
  listAllRoles(): Promise<IRole[]>;
}
export { IRolesRepository };
