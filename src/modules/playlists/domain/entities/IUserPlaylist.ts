import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { IUserTrail } from '@modules/trails/domain/entities/IUserTrail';
import { IUser } from '@modules/users/domain/entities/IUser';
import { IPlaylist } from './IPlaylist';

interface IUserPlaylist {
  id: string;
  playlist_progress_percentage: number;
  user_id: string;
  user_trail_id: string;
  user_trail: IUserTrail;
  trail_id: string;
  playlist_id: string;
  trail: ITrail;
  user: IUser;
  playlist: IPlaylist;
  created_at: Date;
  updated_at: Date;
}

export { IUserPlaylist };
