import { IPlatformUserRole } from '@modules/users/domain/entities/IPlatformUserRole';

export interface IPlatformRole {
  id: string;
  role: string;
  platformUserRoles: IPlatformUserRole[];
  permission: number;
  created_at: Date;
  updated_at: Date;
}
