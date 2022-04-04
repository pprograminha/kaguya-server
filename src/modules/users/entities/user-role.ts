import { IRole } from '@modules/roles/domain/entities/irole';
import { IUser } from '@modules/users/domain/entities/iuser';
import { IUserRole } from '@modules/users/domain/entities/iuser-role';
import crypto from 'crypto';

class UserRole implements IUserRole {
  id: string;

  user_id: string;

  role: IRole;

  user: IUser;

  role_id: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
export { UserRole };
