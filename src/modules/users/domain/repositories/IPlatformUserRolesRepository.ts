import { IPlatformUserRoles } from '../entities/IPlatformUserRoles';

export interface IPlatformUserRolesRepository {
  findByUserId(user_id: string): Promise<IPlatformUserRoles | undefined>;
  findByRoleId(role_id: string): Promise<IPlatformUserRoles | undefined>;
  addRoleToUser(user_id: string, role_id: string): Promise<IPlatformUserRoles>;
}