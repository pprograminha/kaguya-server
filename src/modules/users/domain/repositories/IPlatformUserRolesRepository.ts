import { IPlatformUserRole } from '../entities/IPlatformUserRole';

export interface IPlatformUserRolesRepository {
  findByUserId(user_id: string): Promise<IPlatformUserRole | undefined>;
  findByRoleId(
    platform_role_id: string,
  ): Promise<IPlatformUserRole | undefined>;
  addRoleToUser(
    user_id: string,
    platform_role_id: string,
  ): Promise<IPlatformUserRole>;
}
