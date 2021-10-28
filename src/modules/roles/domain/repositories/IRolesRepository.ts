import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { IRole } from '../entities/IRole';

interface IRolesRepository {
  create(data: ICreateRoleDTO): Promise<IRole>;
  findByRoleName(role: string): Promise<IRole | undefined>;
  findByRoleId(role_id: string): Promise<IRole | undefined>;
  findByRolePermission(role_permission: number): Promise<IRole | undefined>;

  listAllRoles(): Promise<IRole[]>;
}
export { IRolesRepository };
