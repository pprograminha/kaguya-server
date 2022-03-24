import { IUser } from '@modules/users/domain/entities/IUser';
import { v4 as uuid } from 'uuid';
import { ITrail } from '../domain/entities/ITrail';
import { IUserTrail } from '../domain/entities/IUserTrail';

class UserTrail implements IUserTrail {
  id: string;

  user_id: string;

  trail_id: string;

  trail: ITrail;

  progress: number;

  user: IUser;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { UserTrail };
