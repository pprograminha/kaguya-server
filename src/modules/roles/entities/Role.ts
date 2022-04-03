import { IRole } from '@modules/roles/domain/entities/IRole';
import { IUserRole } from '@modules/users/domain/entities/iuser-role';
import crypto from 'crypto';

export class Role implements IRole {
  id: string;

  name: string;

  permission: number;

  user_roles: IUserRole[];

  created_at: Date;

  updated_at: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
