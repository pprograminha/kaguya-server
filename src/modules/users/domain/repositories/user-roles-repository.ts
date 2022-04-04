import { AsyncMaybe } from '@shared/types/app';
import { IUserRole } from '../entities/iuser-role';

export interface IUserRolesRepository {
  findByUserId(user_id: string): AsyncMaybe<IUserRole>;
  findByRoleId(role_id: string): AsyncMaybe<IUserRole>;
  addRoleToUser(user_id: string, role_id: string): Promise<IUserRole>;
}
