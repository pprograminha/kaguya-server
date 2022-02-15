import { IUser } from '@modules/users/domain/entities/IUser';
import { ITrail } from './ITrail';

interface IUserTrail {
  id: string;
  user_id: string;
  trail_id: string;
  trail: ITrail;
  progress: number;
  user: IUser;
  created_at: Date;
  updated_at: Date;
}

export { IUserTrail };
