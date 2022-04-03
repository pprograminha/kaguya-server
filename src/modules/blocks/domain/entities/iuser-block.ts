import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { IUser } from '@modules/users/domain/entities/iuser';
import { IBlock } from './iblock';

interface IUserBlock {
  id: string;
  user_id: string;
  progress: number;
  user: IUser;
  playlist: IPlaylist;
  playlist_id: string;
  block_id: string;
  block: IBlock;
  created_at: Date;
  updated_at: Date;
}

export { IUserBlock };
