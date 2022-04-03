import { IUser } from '@modules/users/domain/entities/iuser';
import { ITrail } from './ITrail';

interface IUserTrail {
  id: string;
  user_id: string;
  trail_id: string;
  trail: ITrail;
  progress: number;
  enabled: boolean;
  user: IUser;
  created_at: Date;
  updated_at: Date;
}

export { IUserTrail };
