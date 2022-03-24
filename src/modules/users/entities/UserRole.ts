import { IRole } from '@modules/roles/domain/entities/IRole';
import { IUser } from '@modules/users/domain/entities/IUser';
import { IUserRole } from '@modules/users/domain/entities/IUserRole';
import { v4 as uuid } from 'uuid';

class UserRole implements IUserRole {
  id: string;

  user_id: string;

  role: IRole;

  user: IUser;

  role_id: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { UserRole };
