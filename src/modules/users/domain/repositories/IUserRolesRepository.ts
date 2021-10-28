import { IUserRole } from '../entities/IUserRole';

export interface IUserRolesRepository {
  findByUserId(user_id: string): Promise<IUserRole | undefined>;
  findByRoleId(role_id: string): Promise<IUserRole | undefined>;
  addRoleToUser(user_id: string, role_id: string): Promise<IUserRole>;
}
