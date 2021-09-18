import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IUser } from '@modules/users/domain/entities/IUser';
import { IBlock } from './IBlock';

interface IUserBlock {
  id: string;
  block_percentage_completed: number;
  classes_completed: number;
  classes_amount: number;
  user_id: string;
  user: IUser;
  playlist: IPlaylist;
  playlist_id: string;
  block_id: string;
  block: IBlock;
  created_at: Date;
  updated_at: Date;
}

export { IUserBlock };
