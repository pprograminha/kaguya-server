import { IUserRole } from '@modules/users/domain/entities/IUserRole';

export interface IRole {
  id: string;
  name: string;
  user_roles: IUserRole[];
  permission: number;
  created_at: Date;
  updated_at: Date;
}
