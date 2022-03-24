import { IRole } from '@modules/roles/domain/entities/IRole';
import { IUserRole } from '@modules/users/domain/entities/IUserRole';
import { v4 as uuid } from 'uuid';

export class Role implements IRole {
  id: string;

  name: string;

  permission: number;

  user_roles: IUserRole[];

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
