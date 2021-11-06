import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { IRole } from '../entities/IRole';

interface IRolesRepository {
  create(data: ICreateRoleDTO): Promise<IRole>;
  findByRoleName(role: string): Promise<IRole | undefined>;
  findById(role_id: string): Promise<IRole | undefined>;
  findByPermission(permission: number): Promise<IRole | undefined>;
  destroyById(role_id: string): Promise<void>;
  listAllRoles(): Promise<IRole[]>;
}
export { IRolesRepository };
