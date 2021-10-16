import { IClass } from '@modules/classes/domain/entities/IClass';
import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IUserBlock } from './IUserBlock';

interface IBlock {
  id: string;
  name: string;
  playlist: IPlaylist;
  classes: IClass[];
  user_blocks: IUserBlock[];
  playlist_id: string;
  created_at: Date;
  updated_at: Date;
}

export { IBlock };
