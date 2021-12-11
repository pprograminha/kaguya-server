import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { IUser } from '@modules/users/domain/entities/IUser';
import { IBlock } from './IBlock';

interface IUserBlock {
  id: string;
  user_id: string;
  playlist_progress_percentage: number;
  user_playlist_id: string;
  user_playlist: IUserPlaylist;
  user: IUser;
  playlist: IPlaylist;
  playlist_id: string;
  block_id: string;
  block: IBlock;
  created_at: Date;
  updated_at: Date;
}

export { IUserBlock };
