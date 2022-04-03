import { IClass } from '@modules/classes/domain/entities/iclass';
import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { IUserBlock } from './iuser-block';

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
