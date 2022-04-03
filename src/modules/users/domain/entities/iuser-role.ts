import { IRole } from '@modules/roles/domain/entities/IRole';
import { IUser } from './iuser';

export interface IUserRole {
  id: string;
  user_id: string;
  role: IRole;
  user: IUser;
  role_id: string;
  created_at: Date;
  updated_at: Date;
}
