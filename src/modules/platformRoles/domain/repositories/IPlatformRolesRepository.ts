import { ICreatePlatformRoleDTO } from '@modules/platformRoles/dtos/ICreatePlatformRoleDTO';
import { IPlatformRole } from '../entities/IPlatformRole';

interface IPlatformRolesRepository {
  create(data: ICreatePlatformRoleDTO): Promise<IPlatformRole>;
  findByRoleName(role_name: string): Promise<IPlatformRole | undefined>;
  findByRoleId(role_id: string): Promise<IPlatformRole | undefined>;
  findByRolePermission(role_permission: number): Promise<IPlatformRole | undefined>;
}
export { IPlatformRolesRepository };