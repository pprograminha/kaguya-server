import { IUser } from '@modules/users/domain/entities/iuser';
import crypto from 'crypto';
import { ITrail } from '../domain/entities/ITrail';
import { IUserTrail } from '../domain/entities/iuser-trail';

class UserTrail implements IUserTrail {
  id: string;

  user_id: string;

  trail_id: string;

  trail: ITrail;

  progress: number;

  user: IUser;

  enabled: boolean;

  created_at: Date;

  updated_at: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
export { UserTrail };
