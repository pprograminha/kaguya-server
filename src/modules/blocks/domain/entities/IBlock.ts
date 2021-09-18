import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IUserBlock } from './IUserBlock';

interface IBlock {
  id: string;
  name: string;
  playlist: IPlaylist;
  playlist_id: string;
  created_at: Date;
  userBlocks: IUserBlock[];
  updated_at: Date;
}

export { IBlock };
