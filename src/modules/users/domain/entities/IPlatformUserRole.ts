import { IPlatformRole } from '@modules/platformRoles/domain/entities/IPlatformRole';
import { IUser } from './IUser';

export interface IPlatformUserRole {
  id: string;
  user_id: string;
  platform_role: IPlatformRole;
  user: IUser;
  platform_role_id: string;
  created_at: Date;
  updated_at: Date;
}
