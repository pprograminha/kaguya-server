import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { IUser } from '@modules/users/domain/entities/IUser';
import { IPlaylist } from './IPlaylist';

interface IUserPlaylist {
  id: string;
  playlist_percentage_completed: number;
  blocks_completed: number;
  blocks_amount: number;
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
