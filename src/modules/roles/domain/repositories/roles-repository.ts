import { CreateRoleDTO } from '@modules/roles/dtos/create-role-dto';
import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
import { AsyncMaybe } from '@shared/types/app';
import { IRole } from '../entities/irole';

interface IRolesRepository {
  create(data: CreateRoleDTO): Promise<IRole>;
  findByRoleName(role: string): AsyncMaybe<IRole>;
  findById(role_id: string): AsyncMaybe<IRole>;
  findByPermission(permission: number): AsyncMaybe<IRole>;
  destroyById(role_id: string): Promise<void>;
  listAllRoles(data: FiltersDTO): Promise<IRole[]>;
}
export { IRolesRepository };
