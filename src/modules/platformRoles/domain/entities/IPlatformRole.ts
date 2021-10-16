import { IPlatformUserRole } from '@modules/users/domain/entities/IPlatformUserRole';

export interface IPlatformRole {
  id: string;
  role: string;
  platform_user_roles: IPlatformUserRole[];
  permission: number;
  created_at: Date;
  updated_at: Date;
}
