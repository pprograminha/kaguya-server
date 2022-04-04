import { ITrail } from '@modules/trails/domain/entities/itrail';
import { IUser } from '@modules/users/domain/entities/iuser';
import { IPlaylist } from './iplaylist';

interface IUserPlaylist {
  id: string;
  progress: number;
  user_id: string;
  trail_id: string;
  playlist_id: string;
  trail: ITrail;
  user: IUser;
  playlist: IPlaylist;
  created_at: Date;
  updated_at: Date;
}

export { IUserPlaylist };
